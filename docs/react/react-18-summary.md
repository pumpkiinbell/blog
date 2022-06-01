# React 18 주요 변경점

- https://reactjs.org/blog/2022/03/29/react-v18.html
- https://github.com/facebook/react/releases/tag/v18.0.0
- https://github.com/reactwg/react-18/discussions/19#discussioncomment-795686



### [useId](https://reactjs.org/docs/hooks-reference.html#useid)

- SSR-safe unique ID generator 입니다.
- Accessible form 을 만들 때 씁니다. 
  - 보통 접근성 있는 form 을 만들기 위하여 htmlFor, input id 를 조합해서 쓰는데요.
  - 이를 위해 `nanoid` 를 쓰거나 `Math.random()` 으로 랜덤한 id 를 종종 만드는데, 이와 같은 id 는 SSR 의 경우 각각 다른 id 를 사용하게 됩니다.
  - useId 는 unique ID 를 만들어주며 동시에 SSR-safe 하게 만들어줍니다.



### [Transitions](https://reactjs.org/docs/hooks-reference.html#usetransition)

- 이제 render 에 대한 비동기 관리를 할 수 있습니다.
  - 이전 React 17 버전에서는 state 에 대한 처리는 비동기적으로 관리 되었지만 (batching), rendering 에 대한 관리는 동기적으로 처리되었습니다.
  - 이 때문에 값비싼 rendering 작업이 앞에 있는 경우, 즉각적인 rendering 이 일어나야 하는 작업이 지연되는 현상이 벌어졌습니다.
  - React 18 버전에서는 이를 `startTransition(useTransition)` 으로 관리할 수 있습니다.

- 예를 들어, Input 을 타이핑할 때 자동 완성 추천 기능이 있다고 상상해봅시다.

  - 우리는 Input 에 대한 타이핑 결과를 즉각적으로 보고자 하지만 (urgent updates), 자동 완성 추천은 즉각적으로 보여줄 필요는 없습니다. (transition updates)

    

### [Improved Automatic Batching](https://reactjs.org/blog/2022/03/29/react-v18.html#new-feature-automatic-batching)

- React 는 효율적인 상태 관리를 위해 다양한 전략을 취합니다.
  - 그 중 하나가 Batching 인데, 여러 번의 setState 가 호출되었음에도 React 가 이를 비동기적으로 처리하여 한 번의 상태 변화만 일어나도록 처리해주는 것입니다.
- 17 버전까지는 Batching 기능은 React event handler 내부에서만 사용할 수 있었습니다.
  - 예를 들어, Promise, setTimeout 내부에서는 batching 이 일어나지 않았습니다.
  - 18 버전부터는 이에 대한 지원이 Promise, setTimeout, native event handler 로 확대되었습니다.



### [Suspense](https://reactjs.org/blog/2022/03/29/react-v18.html#suspense-in-data-frameworks)

- 다양한 프레임워크들에 Suspense 기능이 추가되었습니다.
- 아직은 프레임워크의 Suspense 지원이 완벽하지는 않지만, 
  React 팀에서는 Suspense 를 data layer, routing, SSR 까지 확장시켜 loading 과 관련된 코드를 줄이고자 하는 계획에 있습니다. ([render-as-you-fetch](https://17.reactjs.org/docs/concurrent-mode-suspense.html#approach-3-render-as-you-fetch-using-suspense))



### [`<Offscreen>`](https://reactjs.org/blog/2022/03/29/react-v18.html#what-is-concurrent-react)

- 현재 추가된 컴포넌트는 아니지만, 추후 Minor 버전에 나올 예정인 컴포넌트입니다.
- Offscreen 은 컴포넌트를 사용하기 전 [pre-render](https://github.com/reactwg/react-18/discussions/19#discussioncomment-795686) 하여 사용할 수 있는 컴포넌트입니다.





### 주요 이슈

- 많은 상태 관리 라이브러리에서 [Concurrent feature 를 켰을 때 문제가](https://github.com/dai-shi/will-this-react-global-state-work-in-concurrent-rendering#results) 생기고 있습니다.
  - 빠르게 클릭할 경우, 상태 변화와 렌더링이 정확히 일치하지 않는 문제가 있습니다.
  - 이는 React API (Context API, setState) 를 사용하여 배포된 패키지와, 자체적인 subscribe, observer 기능을 구현하여 배포된 패키지의 차이입니다.
- unmount 된 컴포넌트에 setState 를 하는 경우, 발생하던 warning 메시지가 제거되었습니다.
  - **No warning about `setState` on unmounted components:** Previously, React warned about memory leaks when you call `setState` on an unmounted component. This warning was added for subscriptions, but people primarily run into it in scenarios where setting state is fine, and workarounds make the code worse. We've [removed](https://github.com/facebook/react/pull/22114) this warning.

