# Suspense

Suspense 는 데이터를 포함한 어떤 것이든 fetching 중 기다리는 작업을 선언적으로 작성할 수 있게 해줍니다.

### 동작

```jsx
const resource = fetchProfileData();

function ProfilePage() {
  return (
    <Suspense fallback={<h1>Loading profile...</h1>}>
      <ProfileDetails />
      <Suspense fallback={<h1>Loading posts...</h1>}>
        <ProfileTimeline />
      </Suspense>
    </Suspense>
  );
}

function ProfileDetails() {
  // Try to read user info, although it might not have loaded yet
  const user = resource.user.read();
  return <h1>{user.name}</h1>;
}

function ProfileTimeline() {
  // Try to read posts, although they might not have loaded yet
  const posts = resource.posts.read();
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.text}</li>
      ))}
    </ul>
  );
}
```

위의 예에선 ProfileDetails 를 render 하려고 시도하지만, data fetch 가 아직 안되어 있으므로 suspend 됩니다.

React 는 이를 skip 하고 트리 내의 다른 컴포넌트를 렌더링 하기 위해 시도합니다.

렌더링 할게 없지만 `suspended: true` 인 컴포넌트가 있는 경우, 가장 가까운 `fallback` 을 보여줍니다.

### 원리

```jsx
export function fetchProfileData(userId) {
  let userPromise = fetchUser(userId);
  let postsPromise = fetchPosts(userId);
  return {
    userId,
    user: wrapPromise(userPromise),
    posts: wrapPromise(postsPromise),
  };
}

// Suspense integrations like Relay implement
// a contract like this to integrate with React.
// Real implementations can be significantly more complex.
// Don't copy-paste this into your project!
function wrapPromise(promise) {
  let status = 'pending';
  let result;
  let suspender = promise.then(
    (r) => {
      status = 'success';
      result = r;
    },
    (e) => {
      status = 'error';
      result = e;
    },
  );
  return {
    read() {
      if (status === 'pending') {
        throw suspender;
      } else if (status === 'error') {
        throw result;
      } else if (status === 'success') {
        return result;
      }
    },
  };
}
```

- Suspense mode 일 경우, [Promise 를 throw 합니다](https://www.bennadel.com/blog/4210-you-can-throw-anything-in-javascript-and-other-async-await-considerations.htm).
- 이후 success 일 경우 data 를 반환합니다.

### [sequence of approache](https://reactjs.org/docs/concurrent-mode-suspense.html#traditional-approaches-vs-suspense)

- **Fetch-on-render (for example, `fetch` in `useEffect`):**
  - render 할 때 fetch 합니다.
  - 각 컴포넌트가 data fetching 을 trigger 합니다.
- **Fetch-then-render (for example, Relay without Suspense):**
  - 가능한 빠르게 다음 화면의 모든 data fetching 을 합니다.
  - data 가 준비되면, 화면에 렌더링을 합니다.
  - data 가 도착할 때 까지 아무것도 할 수 없다.
- **Render-as-you-fetch (for example, Relay with Suspense):**
  - 가능한 빠르게 다음 화면의 모든 data fetching 을 합니다.
  - 즉시 새로운 화면을 렌더링합니다. (network response 전에)
  - data 가 streaming 되는 동안 React 는 모든 데이터가 준비될 때 까지 component rendering 을 재시도합니다.

### fetch-on-render

```jsx
useEffect(() => {
  fetchSomething();
}, []);
```

컴포넌트가 렌더링 될 때 까지 fetching 을 하지 않습니다.

이는 [waterfall 문제](https://reactjs.org/docs/concurrent-mode-suspense.html#approach-1-fetch-on-render-not-using-suspense)로 이어질 수 있습니다.

이는 product 가 커지며 문제가 될 수 있습니다.

### fetch-then-render

```jsx
function fetchProfileData() {
  return Promise.all([fetchUser(), fetchPosts()]).then(([user, posts]) => {
    return { user, posts };
  });
}
```

[코드](https://reactjs.org/docs/concurrent-mode-suspense.html#approach-2-fetch-then-render-not-using-suspense)

컴포넌트 렌더링 이전에 fetching 을 시도하고, Promise 가 settled 되면 데이터를 세팅하고 렌더링하는 방법입니다.

waterfall 문제는 해결하였지만, 모든 데이터가 fetching 된 이후에 렌더링 할 수 있습니다.

즉, 다른 데이터가 먼저 fetching 되더라도 이를 렌더링 시킬수가 없습니다.

Promise.all 을 제거하고 각각 다른 Promise 를 wait 하는 방법도 있지만, 이 접근법은 관리하는 비동기가 더 많아질수록 복잡해집니다.

### render-as-you-fetch

이전 접근법들은 다음과 같은 순서로 동작했습니다.

1. fetching 시작
2. fetching 끝
3. 렌더링 시작

Suspense 를 사용하면 다음과 같이 변합니다.

1. fetching 시작
2. **렌더링 시작**
3. **fetching 끝**

즉, 서버 response 를 기다리지 않고 렌더링을 시작할 수 있게 됩니다.

이는 waterfall 문제도 해결할 수 있고, rendering 이 안되서 사용자 경험을 저해하던 문제도 해결할 수 있습니다.

### [Suspense and Race Conditions](https://reactjs.org/docs/concurrent-mode-suspense.html#suspense-and-race-conditions)

만약, 비동기 요청을 엄청 빠르게 요청한다고 합시다.

기존 방식의 경우, 서버의 response 속도보다 더 빠르게 요청할 경우 상태들을 덮어쓸 가능성이 있습니다.

이 문제는 cleanup function 이나 stale request 를 ignore 하거나 cancel 하는 방식으로 해결할 수 있으나, 코드가 복잡해집니다.

Suspense 는 기존 방식과 달리 서버의 response 를 기다려서 state 를 할당하지 않습니다.

만약 데이터가 더 streaming 될 경우, content 를 fill in 하는 방식입니다.

즉, Suspense 는 반환되는 시간을 염두하지 않고 즉시 state 를 set 하고 더 많은 데이터가 들어올 경우 주입하는 구조이므로, 이를 해결할 수 있습니다.

### Handling Errors

Suspense 는 error 가 throw 되면 이를 error boundary 로 catch 합니다.

## React Query

react query 에선 `suspense: true` 를 옵션에 추가하여 suspense mode 를 사용할 수 있습니다

suspense mode 를 사용하면 `status, error` 필드가 필요 없어지며,

pending 일 경우 Promise 를 throw 하고 error 일 경우 error 객체를 throw 합니다.

mutation 의 경우에도 실패할 경우 error 가 return 되는 것이 아닌 throw 됩니다. 이를 막기 위해선 `useErrorBoundary: false` 를 추가하면 됩니다.

---

suspense 나 useErrorBoundaries 를 사용할 경우, error 가 발생했을 때 reset 할 것임을 알려야 합니다.

`QueryErrorResetBoundary` , `useQueryErrorResetBoundary` hook 을 사용해 reset 을 react-error-boundary onReset prop 으로 넘기면 됩니다.

---

### Fetch-on-render vs Render-as-you-fetch

React query suspense mode 는 fetch-on-render 의 케이스에 적합합니다.

만약, render-as-you-fetch 를 원할 경우 다음과 같은 솔루션이 있습니다.

- [Prefetching on routing callback](https://react-query.tanstack.com/guides/prefetching)
- [ui event to start loading query before they mounted](https://reactjs.org/docs/concurrent-mode-suspense.html#start-fetching-early)
- before start importing or mounting their parent components

### References

- [Suspense for Data Fetching](https://reactjs.org/docs/concurrent-mode-suspense.html#for-library-authors)

- [You Can throw() Anything In JavaScript](https://www.bennadel.com/blog/4210-you-can-throw-anything-in-javascript-and-other-async-await-considerations.htm)
