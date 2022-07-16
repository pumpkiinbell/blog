---
title: Object Property 속성
description: ''
tags:
  - object
  - javascript
  - writable
  - configurable
  - enumerable
  - for in
  - for of
  - Object.defineProperty
---

JS 에서 Object 는 Property 의 집합입니다.

property 는 `writable, configurable, enumerable` 이라는 세 가지 속성을 가집니다.

이 세 가지 속성에 따라 같은 value 를 가진 property 도 미묘하게 동작이 달라집니다.

property 의 접근 여부를 결정할 수도 있고, 수정 여부를 결정할 수도 있습니다.

해당 문서에서는 이 속성들에 대해 알아보고, 관련한 키워드들에 대해서도 살펴봅니다.

<br />

## Object.defineProperty()

해당 속성들을 살펴보기에 앞서, [Object.defineProperty()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty) 라는 메서드에 대해 알아보겠습니다.

해당 메서드는 만들어진 object 에 새로운 property 를 추가하거나, 이미 존재하는 property 의 속성을 바꾸는 메서드입니다.

```js
Object.defineProperty(obj, prop, descriptor);
```

다음과 같이 3가지 인자를 받게 되며,

첫 번째 인자인 obj 는 대상이 되는 객체, 두 번째 prop 은 property name, 마지막 descriptor 는 property 의 속성들을 정의하는 인자입니다.

마지막 인자는 여러 속성들을 받을 수 있는데, 이 인자를 통해 우리가 알아보고자 하는 writable, configurable, enumerable 를 설정할 수 있습니다.

다음과 같은 방식으로 사용합니다.

```js
const obj = {};
Object.defineProperty(obj, 'key', {
  value: 'nationality',
  writable: true,
  configurable: true,
  enumerable: true,
}); // => { key: 'nationality' };
```

<br />

## writable, configurable, enumerable

각 속성의 특징은 아래와 같습니다.

### writable

writable 은 해당 property 의 value 가 수정될 수 있는지 결정합니다.

해당 값이 false 이면 value 를 수정할 수 없습니다.

Object.defineProperty() 에서 기본값은 false 입니다.

### configurable

configurable 은 해당 property 의 descriptor 가 수정될 수 있는지 결정합니다.

해당 값이 true 이면 property 의 writable, enumerable 속성들을 수정할 수 있습니다.

Object.defineProperty() 에서 기본값은 false 입니다.

### enumerable

enumrable 은 해당 프로퍼티가 열거 가능한지 결정합니다.

해당 값이 false 이면 객체의 property 들을 enumeration (열거) 하는 동안 해당 프로퍼티는 노출되지 않습니다.

Object.defineProperty() 에서 기본값은 false 입니다.

<br />

## enumerable 과 관련된 statement, method

### for ... in

[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of#difference_between_for...of_and_for...in) 을 보면 다음과 같이 설명하고 있습니다.

> _The [`for...in`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in) statement iterates over the [enumerable properties](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Enumerability_and_ownership_of_properties) of an object._

즉, property 중 enumerable 값이 true 인 property 를 순회하는 구문입니다.

:::caution
**이 말은, for ... in 구문은 enumerable 이 false 이거나, Symbol 이 키 값인 property 는 순회하지 않는다는 것입니다.**
:::

`for ... in` 은 prototype 도 enumerable 한 property 일 경우 순회하기 때문에 의도한 결과를 만들지 못할 수 있습니다.

한편, Array 도 Object 를 상속받기 때문에 `for ... in` 을 사용할 수 있지만, 배열의 index 순서가 아닌 JS 엔진에 따라 iterate 하는 대상이 결정되기 때문에 일관성 있는 결과를 만들어내지 못할 수 있습니다.
배열을 순회하며 일관성 있는 결과를 얻기 위해선 `for ... of` 나 `Array.prototype.map()` 등의 메서드를 사용해야 합니다.

### Object.keys(), Object.values(), Object.entries()

> _The **`Object.keys()`** method returns an array of a given object's own enumerable property **names**, iterated in the same order that a normal loop would._

Object keys, values, entries 를 Object 를 순회하며 key, value, [key, value] tuple 을 배열로 반환하는 메서드들입니다.

주의할 점은, 해당 메서드들이 enumerable 한 property 들만 순회한다는 점입니다.
만약 enumerable 하지 않은 key 도 필요한 경우, [Object.getOwnPropertyNames()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyNames) 같은 메서드들을 사용해야 합니다.

<br />

## {} vs Object.create

JS 에서 객체를 생성하는 방법은 다음 3가지가 있습니다.

- 객체 리터럴 문법 ({}),
- new 연산자를 사용하여 생성자 함수를 호출하는 방법 (new Object())
- Object.create()

앞선 두 방식과 달리 `Object.create()` 로 객체를 만들게 될 경우 **property 의 enumerable 속성이 false 가 됩니다.**

```js
const obj = Object.create({ a: 1, b: 2 });

Object.entries(obj); // => []
```

다음과 같이 Object.create 로 만들어진 객체는 enumerable 하지 않기 때문에,

entries 로 호출하면 빈 배열을 받게 됩니다.

따라서 다음과 같이 수정해줘야 합니다.

```js
// 1
const obj2 = Object.create(
  { a: 1 },
  {
    b: { value: 2, enumerable: true },
  },
);

// 2
const obj3 = Object.create({ a: 1, b: 2 });
Object.defineProperty(obj3, 'b', { value: 2, enumerable: true });
```

enumerable 은 false 이지만, configurable 이 true 이기 때문에 2번 방식과 같이 수정할 수도 있습니다.

<br />

## Further Readings

- [Object.defineProperty()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)
- [for...of](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of#difference_between_for...of_and_for...in)
