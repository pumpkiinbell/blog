---
date: 2022-07-10T17:42
authors: pumpkiinbell
---

# useState 의 초기 값에 함수를 넣으면 어떻게 될까?

**TL;DR**

useState 초기 값으로 함수를 넣으면 컴포넌트 초기 렌더링 될 때만 해당 함수를 호출하여 사용하고, re-render 시에는 이를 사용하지 않는다.

<!--truncate-->

## 시작

함수형 컴포넌트를 즐겨 사용하는 React 유저라면 필연적으로 useState 를 자주 사용하고 있을 것입니다.

우리는 상태의 초기값을 위해 useState 의 인자로 값을 넣어줍니다.

```tsx
const [state, setState] = useState(1);
```

useState 의 인자에는 number, string, array, object 어떤 것이든 값을 넣어 상태의 초기값을 할당해줄 수 있습니다.

그러나, 함수도 초기 값으로 할당할 수 있다는 점을 알고 계셨나요?

```tsx
/*
 * Returns a stateful value, and a function to update it.
 */
function useState<S>(initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>>];
```

React 의 타입 정의를 보면 useState 는 위와 같이 정의되어 있습니다.

initialState 는 General 한 타입인 S와, 반환 타입이 S인 callback 함수를 인자로 받을 수 있습니다.

따라서, 아래 문장은 아무란 문법적 오류도 일어나지 않습니다!!

```tsx
const [state, setState] = useState(() => 1);
```

왜 React 팀은 초기 값으로 함수를 받을 수 있게 했을까요?

어떤 문제를 해결하기 위해 이렇게 만들었을까요?

## 초기값을 함수로 넣는 것의 의의

초기값의 역할을 한번 생각해보죠.

초기값은 처음 컴포넌트를 렌더링 할 때 단 한번만 필요합니다.

예를 들어, 다음과 같은 케이스를 생각해보죠.

```tsx
export default function App() {
  const [state, setState] = useState(1);

  return (
    <div className="App">
      <button onClick={() => setState((prev) => prev + 1)}>button</button>
      <p>count: {state}</p>
    </div>
  );
}
```

useState 는 처음 호출되었을 때 초기값 1을 사용하고, 이후 `re-render` 되는 경우 다시 사용하지 않습니다.

그러나, 초기 값을 위해 연산 비용이 큰 함수를 사용한다면 어떨까요?

```tsx
export default function App() {
  const [state, setState] = useState(반환값을_위해_5초가_걸리는_함수());

  return (
    <div className="App">
      <button onClick={() => setState((prev) => prev + 1)}>button</button>
      <p>count: {state}</p>
    </div>
  );
}
```

App 컴포넌트가 처음 렌더링 될 때 useState 는 초기값을 필요로 하고, 동기적으로 이 값을 기다리고 렌더링 될 것입니다.

이 때, 버튼을 클릭하면 어떻게 될까요?

<iframe src="https://codesandbox.io/embed/usestate-initial-value-as-function-1-5pormp?fontsize=14&hidenavigation=1&theme=dark"
  width="100%"
  height="300"
  title="UseState Initial Value as Function-2"
  allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  />

App 컴포넌트는 상태가 바뀌었으므로 `re-render` 될 것입니다.

`re-render` 되며 useState 내부의 함수를 다시 호출하고 useState 는 초기값을 사용하지 않음에도 이 함수의 연산이 끝날 때까지 기다리게 됩니다.

이 때, 초기 값으로 함수를 넣어줬을 때의 함수를 넣어주면 어떻게 될까요?

```tsx
export default function App() {
  const [state, setState] = useState(() => {
    return 반환값을_위해_5초가_걸리는_함수();
  });

  return (
    <div className="App">
      <button onClick={() => setState((prev) => prev + 1)}>button</button>
      <p>count: {state}</p>
    </div>
  );
}
```

처음 컴포넌트가 렌더링될 때 useState는 초기 값으로 필요하므로 전달된 콜백 함수를 호출합니다.

그러나 이전 케이스와 달리, `re-render` 가 되면 초기 값을 필요로 하지 않으므로 이 함수를 호출하지 않습니다!

아래 버튼을 눌러보시면 이전 버튼과 달리 UI blocking 이 사라진 모습을 확인할 수 있습니다.

<iframe src="https://codesandbox.io/embed/usestate-initial-value-as-function-2-vmpbg7?fontsize=14&hidenavigation=1&theme=dark"
  width="100%"
  height="300"
  title="UseState Initial Value as Function-2"
  allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  />

## 정리

위와 같은 방법을 `useState lazy initialization` 이라고 합니다.

useState 가 처음 호출될 때 바로 초기화를 위한 작업을 하는 것이 아니라, useState 가 초기 값이 필요한지 여부를 파악하고 초기화를 lazy 하게 하는 것이죠.

그렇게 흔한 케이스는 아니지만, 이 lazy initialization 을 사용하여 컴포넌트 최적화를 할 수 있습니다.

조금 더 실용적인 케이스로 초기 값으로 LocalStorage 에서 값을 가져올 경우, 위 방법을 사용하여 `re-render` 시 File I/O 비용을 줄일 수 있습니다.

## 참고

- [Lazy initial state](https://reactjs.org/docs/hooks-reference.html#lazy-initial-state)
- [When to use useState initial value as function?](https://stackoverflow.com/questions/60120261/when-to-use-usestate-initial-value-as-function)
- [useState lazy initialization and function updates](https://kentcdodds.com/blog/use-state-lazy-initialization-and-function-updates)
