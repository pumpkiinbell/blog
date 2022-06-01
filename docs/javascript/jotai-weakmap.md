# jotai, weakmap

jotai 는 recoil 의 atomic 컨셉을 근간으로 만들어진 상태 관리 툴이기 때문에 흔히 recoil 과 비교되어지곤 합니다.

jotai 와 비교해 [여러 차이점](https://jotai.org/docs/basics/comparison#how-is-jotai-different-from-recoil?)이 있지만, 그 중 큰 차이점으로 보여지는 것은 메모리 관리라고 생각합니다.

이번 글에선 jotai 가 어떤 방식으로 메모리 관리를 하는지 간략히 서술해보도록 하겠습니다.

## Map, WeakMap

jotai 의 메모리 관리 방식을 파악하기 위해선 WeakMap 에 대한 숙지가 필요합니다.

WeakMap 은 JS 의 자료구조 중 하나로, Map 의 한계점을 극복하기 위해 등장하였습니다.

[**_Map_**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)

Map Object 는 흔히 우리가 객체를 구성할 때 사용하는 [Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) 와 흡사하지만, Map 은 `key / value` pair 의 [빈번한 추가 및 삭제](https://www.measurethat.net/Benchmarks/Show/11290/4/map-vs-object-real-world-performance#latest_results_block)에 보다 최적화되어 있습니다. key, value 등을 반환할 수 있는 method 와 삽입 순서를 보장해 줄 수 있다는 장점도 있습니다.

Map 의 key, value 는 JS 의 어떤 타입이든 사용할 수 있습니다.

[**_WeakMap_**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap)

WeakMap Object 도 Map 처럼 `key / value` pair 를 받아 collection 을 구성합니다.

그러나 WeakMap 은 key 로 무조건 object 를 사용해야 합니다.

또 Map 과 달리 keys, values 를 반환할 수 있는 메서드가 없습니다.

**_Map vs WeakMap_**

Map 은 값이 추가될 때, 내부적으로 `keys, values` 를 위한 두 개의 array 로 구성되어집니다.

만약 Map 에서 특정 key 에 대한 값을 조회하고자 할 때, 다음과 같은 순서로 동작합니다.

1. `keys` 를 들고 있는 배열에서 해당 key 가 존재하는지 확인하고, 있다면 key 의 `index` 를 반환합니다.
2. 해당 index 로 `values` 를 들고 있는 배열의 index 를 조회합니다.

이는 필연적으로 다음과 같은 문제점이 발생합니다.

1. key 를 lookup 하는 과정에서 필연적으로 `O(n)` 의 시간 복잡도가 발생합니다.
2. Map 에선 `keys, values` 를 구성하는 배열 때문에 key, value 에 대한 참조가 유지되어 집니다.
   즉, 해당 key, value 가 코드 내에서 사용되지 않음에도 계속해서 참조가 유지되며 이 때문에 garbage collecting 이 되지 않습니다.

WeakMap 은 이 한계점을 방지하기 위해 key 를 object 로 받으며, key 를 참조하는 것이 아무것도 없다면 memory 와 weakmap 에서 삭제됩니다.

## weakmap in jotai

<img src="https://user-images.githubusercontent.com/490574/114873392-32a48f00-9e36-11eb-8834-5269242a6c5c.png" alt="jotai weakmap" />

jotai 는 atom config 를 키 값으로, atom value 를 value 로 pair 를 구성하며, 해당 pair 를 Weakmap 으로 관리하게 됩니다.

[코드를 보면](https://jotai.org/docs/guides/core-internals) 다음과 같습니다.

**_atom_**

```js
// atom function returns a config object which contains initial value
export const atom = (initialValue) => ({ init: initialValue });

// we need to keep track of the state of the atom.
// we are using weakmap to avoid memory leaks
const atomStateMap = new WeakMap();
const getAtomState = (atom) => {
  let atomState = atomStateMap.get(atom);
  if (!atomState) {
    atomState = { value: atom.init, listeners: new Set() };
    atomStateMap.set(atom, atomState);
  }
  return atomState;
};
```

atom 은 인자로 넣어준 값을 들고 있는 immutable 한 object 입니다.

jotai 는 `WeakMap` 에 해당 atom 을 키로, atom value 를 값으로 넣어주게 됩니다.

**_useAtom_**

```js
// useAtom hook returns a tuple of the current value
// and a function to update the atom's value
export const useAtom = (atom) => {
  const atomState = getAtomState(atom);
  const [value, setValue] = useState(atomState.value);
  useEffect(() => {
    const callback = () => setValue(atomState.value);

    // same atom can be used at multiple components, so we need to
    // keep listening for atom's state change till component is mounted.
    atomState.listeners.add(callback);
    callback();
    return () => atomState.listeners.delete(callback);
  }, [atomState]);

  const setAtom = (nextValue) => {
    atomState.value = nextValue;

    // let all the subscribed components know that the atom's state has changed
    atomState.listeners.forEach((l) => l());
  };

  return [value, setAtom];
};
```

useAtom 은 atom 을 받아 WeakMap 에서 값을 가져오고, 이를
