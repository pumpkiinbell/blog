# Map, Weakmap

## Map

`Map` 객체는 key-value 쌍을 들고 있고 key 들의 원본 삽입 순서를 기억합니다.

key 나 value 로 어떤 값이든 사용할 수 있습니다. 이 값은 primitive, reference value 를 모두 포함합니다.

Map object 는 삽입 순서대로 들어온 모든 요소들을 순회합니다.

`for ... of` loop 를 사용하게 되면 순회에 대하여 `[key, value]` 형태의 배열을 반환합니다.

### Key Equality

- 키 동등성은 `sameValueZero` 알고리즘에 근거합니다.
  - 즉, -0, 0 은 동등합니다.
- `NaN !== NaN` 이지만 키로서 사용하게 되면 동일하게 판단합니다. 다른 모든 값들은 `===` 연산자의 표현식에 따라 동등성을 판단합니다.
- ECMAScript 명세에 따라 -0, 0 은 동일하게 판단합니다.

### Objects vs Maps

`Object` 는 `Map` 과 비슷합니다.

둘다 키 값들을 value 로 설정할 수 있고, value 들을 가져올 수 있고, key 를 삭제할 수 있고, key 에 저장되어 있는 값에 대해 탐색을 할 수도 있습니다. 이러한 이유로, 역사적으로 `Object` 가 `Map` 대신 사용되어져 왔습니다.

그러나 몇 가지 경우에 `Map` 이 선호되어지는 중요한 차이점이 있습니다.

**_Accidental Keys (우연적으로 들어올 수 있는 키)_**

- Map 은 기본적으로 키를 가지고 있지 않습니다. Map 은 단지 삽입한 값에 대해서만 가지고 있습니다.

- `Object` 는 prototype 을 가지고 있기 때문에 키 선언에 주의를 하지 않는다면 `default key ` 들와 충돌할 수 있습니다. `Object.create(null)` 을 호출하여 디폴트 키가 없도록 할 수 있지만, 흔히 사용되어지는 방식은 아닙니다.

**_Key Types_**

- `Map` 의 키는 어떠한 값이 될 수 있습니다. 함수, 객체, 어떠한 primitive value 도 가능합니다.
- `Object` 의 키는 `String` 이거나 `Symbol` 이어야 합니다.

**_Key Order_**

- `Map` 안에 있는 키들은 단순한 방식으로 순서가 잡혀있습니다.
  `Map` object 는 entry 삽입의 순서대로 entries, keys, 그리고 values 를 순회합니다.

- 현재는 일반 `Object` 의 키들의 순서가 있지만, 이는 일관된 케이스가 아니며 순서는 복잡합니다.
  즉, 프로퍼티 순서에 의존하는 것은 최선의 방식이 아닙니다.

  ES2015 에 own property 에 대한 order 가 처음 정의되었으며 ES2020 에 되어서야 상속되는 프로퍼티들 또한 순서를 정의하게 되었습니다. `OrdinaryOwnPropertyKeys` 나 `EnumerateObjectProperties` 동작을 참조하면 됩니다.

  그러나 object 의 모든 프로퍼티들을 순회하는 메카니즘은 없습니다.
  object 의 여러 메커니즘들은 프로퍼티의 다른 부분집합들을 포함합니다.
  for-in 은 열거 가능한 string key 만 포함하며, Object.keys 는 모든 프로퍼티 중 own, enumerable, string-key 들만 포함하게 됩니다.

  `Object.getOwnPropertyNames` 는 non-enumerable 한 프로퍼티를 가질 수 있지만 own, string-key 들만 포함하게 되며, `Object.getOwnPropertySymbols` 는 Symbol 키들만 포함하게 됩니다.

**_Size_**

- Map 은 `size` property 를 통해 쉽게 크기를 알 수 있다.
- `Object` 는 아이템 개수를 수동으로 계산해야 한다.

**_Iteration_**

- Map 은 iterable 하기 때문에 직접 순회할 수 있다.
- `Object` 는 iteration protocol 을 구성하고 있지 않기 때문에 object 는 그 자체로 `for...of` 구문을 직접 사용하여 순회할 수 없다.
  - 객체는 `Object.keys, entries` 를 사용하여 iterable 한 동작을 할 수 있다.
  - `for...in` 구문은 객체의 enumrable 한 속성들을 순회하게 한다.

**_Performance_**

- 빈번한 `key-value` 쌍의 추가, 제거가 발생하는 시나리오에서 더 성능이 우수하다.
- `key-value` 쌍의 빈번한 추가, 제거에 최적화 되어있지 않다.

**_Serialization and parsing_**

- serialization 이나 parsing 을 위한 자체적인 지원이 없다.
  - 그러나 `JSON.stringify` 의 replacer 인자나 `JSON.parse` 의 reviver 인자를 사용하여 자체 serialization, parsing 로직을 구성할 수 있다.
- Object 는 JSON.stringify 를 사용하여 Object 를 JSON 으로 serialization 할 수 있다.
  JSON.parse 를 사용하여 JSON 을 object 로 만들 수도 있다.

### Setting object properties

Map object 를 위해 객체 property 를 세팅하는 것은 혼동이 생길 수 있다.

다음과 같은 케이스에서 `Map` 은 정상적으로 동작하지 않는다.

```js
const map = new Map();

map['test'] = 1;
map['test2'] = 2;

console.log(map); // => Map(0) {test: 1, test2: 2, size: 0}

map.has('test');
map.delete('test');

console.log(map);
```

위 케이스에서 property 에 할당하는 방식을 사용해도 문제는 없으나, `Map` 데이터 구조와 상호작용하지 않는다.

위의 케이스를 보면, size 가 0임을 알 수 있다. 또한, has, delete 같은 메서드도 정상적으로 동작하지 않는다.

올바른 사용방법은 `set(key, value)` 를 사용하는 것이다.

```js
const map = new Map();

map.set('test', 1);
map.set('test2', 2);

console.log(map);

console.log(map.has('test')); // true!

map.delete('test');

console.log(map);
```

## WeakMap

WeakMap 은 key 들이 반드시 object 여야 하는 `key/value` 쌍의 collection 으로, value 들은 모든 임의의 JS 타입이며 value 들의 키들은 강한 참조를 만들어내지 않는다.

즉, WeakMap 에서 키로서 `object` 가 존재하는 것은 해당 object 가 garbage collecting 되는 것을 막을 수 없다.

일단 key 로서 사용된 object 가 collection 에 포함이 된다면 그것과 일치하는 value 들은 garbage collecting 대상이 된다.

`WeakMap` 을 사용하면 value 가 key 를 참조하지 않더라도 key object 가 collecting 되지 않도록 데이터를 object 에 연결할수 있다.
그러나 `WeakMap` 은 key 의 생명 주기를 관찰하지 않는데, 이는 `enumeration` 을 허용하지 않는 이유이다.
만약, `WeakMap` 이 key list 를 얻는 메서드를 제공한다면 key list 는 garbage collection 상태에 의존하게 될 것이고, 이는 비 결정적이게 된다.

만약 key list 를 원한다면 `WeakMap` 대신 `Map` 을 사용하는게 낫다.

### _Why WeakMap?_

-
