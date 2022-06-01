# TypeScript 4.6



![Announcing TypeScript 4.6 Beta - TypeScript](https://devblogs.microsoft.com/typescript/wp-content/uploads/sites/11/2018/08/typescriptfeature.png)



이 문서는 Microsoft 의 [Announcing Typescript 4.6](https://devblogs.microsoft.com/typescript/announcing-typescript-4-6/) 문서를 번역 및 요약한 문서이며 원활한 설명을 위해 원글에 작성되어 있지 않은 의역이 들어가 있습니다. 이 과정에서 의도치 않게 문맥을 해쳤을 가능성이 있으니, 보다 정확한 정보를 원하시는 경우 [공식 문서](https://devblogs.microsoft.com/typescript/announcing-typescript-4-6/)를 참고해주시면 감사하겠습니다.



## 개요

- [Allowing Code in Constructors Before `super()`](#Allowing Code in Constructors Before `super()`)
- [Control Flow Analysis for Destructured Discriminated Unions](#Control Flow Analysis for Destructured Discriminated Unions)
- [Improved Recursion Depth Checks](#Improved Recursion Depth Checks)
- [Indexed Access Inference Improvements](Indexed Access Inference Improvements)
- [Control Flow Analysis for Dependent Parameters](#Control Flow Analysis for Dependent Parameters)
- [`--target` es2022](#`--target` es2022)
- [Removed Unnecessary Arguments in `react-jsx`](#Removed Unnecessary Arguments in `react-jsx`)
- [JSDoc Name Suggestions](#JSDoc Name Suggestions)
- [More Syntax and Binding Errors in JavaScript](#More Syntax and Binding Errors in JavaScript)
- [TypeScript Trace Analyzer](#TypeScript Trace Analyzer)
- [Breaking Changes](#Breaking Changes)
  - [Object Rests Drop Unspreadable Members from Generic Objects](#Object Rests Drop Unspreadable Members from Generic Objects)
  - [JavaScript Files Always Receive Grammar and Binding Errors](#JavaScript Files Always Receive Grammar and Binding Errors)






## Allowing Code in Constructors Before `super()`

> *`constructor` 내부에서 `super()` 호출 이전에 Code 작성을 일부 허용합니다.*



JavaScript Class 에서는 `this` 키워드가 사용되기 이전에 `super` 키워드로 호출하는 것이 필수입니다.

TypeScript 에서는 이 규칙을 준수하기 위해서 클래스 내에 property initializer (아래 예시의 `someProperty = true`) 가 있으면 `super()` 로 호출되기 전 작성된 모든 코드를 error 로 취급하였습니다.

```ts
class Base {
    // ...
}

class Derived extends Base {
    someProperty = true;

    constructor() {      
      	console.log('Is This Error??'); // Error!!
      	// A 'super' call must be the first statement in the constructor when a class 		 	
	      // contains initialized properties, parameter properties, or private identifiers.

        super();
    }    
}
```

이러한 동작 방식은 `this` 가 참조되기 전에 `super()` 가 호출되었는지 검사하기에 비용이 적게 드는 효율적인 동작 방식이었지만, 많은 유효한 코드를 에러로 취급하기도 하였습니다.



**Typescript 4.6 에선 `super()` 호출 이전에 코드 작성을 허용하는 방식으로 좀 더 규칙을 느슨하게 적용하였습니다.**

```ts
class Base {
    // ...
}

class Derived extends Base {
    someProperty = true;

    constructor() {      
      	console.log('Is This Error??'); // OK!

        super();
    }    
}
```



그러나 동시에, `super()` 가 `this` 참조 이전에 최상단에서 호출해야 한다는 규칙은 여전히 보장하고 있습니다.

```ts
class Base {
    // ...
}

class Derived extends Base {
    someProperty = true;

    constructor() {      
	    this.someProperty = false; // Error!
      // A 'super' call must be the first statement in the constructor to refer to 'super' 				
      // or 'this' when a derived class contains initialized properties, parameter 		 					  
      // properties, or private identifiers.
        
      super();
    }
}
```







## Control Flow Analysis for Destructured Discriminated Unions

> *Discriminated Union이 구조 분해 할당 경우의 제어 흐름 분석 기능이 개선되었습니다.*



TypeScript 는 [Discriminating Union](https://www.typescriptlang.org/docs/handbook/unions-and-intersections.html#discriminating-unions) 인 경우, 구별할 수 있는 property **(tag)** 를 통해 type 을 좁힐 수 있습니다.

예를 들어, 다음과 같은 코드가 있다고 가정해 보면,

```ts
type Action =
    | { kind: "NumberContents", payload: number }
    | { kind: "StringContents", payload: string };

function processAction(action: Action) {
    if (action.kind === "NumberContents") {
        // `action.payload` is a number here.
        let num = action.payload * 2
        // ...
    }
    else if (action.kind === "StringContents") {
        // `action.payload` is a string here.
        const str = action.payload.trim();
        // ...
    }
}
```

`action.kind` 의 조건에 맞게 분기하여 타입을 좁힐 수 있습니다.



그러나, `action` 을 destructure 할 경우, 완전히 독립적으로 할당된 식별자로 생각하기 때문에 타입을 좁힐 수 없었습니다.

```ts
type Action =
    | { kind: "NumberContents", payload: number }
    | { kind: "StringContents", payload: string };

function processAction(action: Action) {
    const { kind, payload } = action;
    if (kind === "NumberContents") {
        let num = payload * 2 // ERROR!! 
        // The left-hand side of an arithmetic operation must be of type 'any', 'number', 
        // 'bigint' or an enum type
    }
    else if (kind === "StringContents") {
        const str = payload.trim(); // ERROR!!
        // Property 'trim' does not exist on type 'string | number'.
        // Property 'trim' does not exist on type 'number'.
    }
}
```



**TS 4.6 에선 이를 destructure 할 경우에도 타입을 좁힐 수 있게 합니다.**

```ts
type Action =
    | { kind: "NumberContents", payload: number }
    | { kind: "StringContents", payload: string };

function processAction(action: Action) {
    const { kind, payload } = action;
    if (kind === "NumberContents") {
        let num = payload * 2 // OK!!
    }
    else if (kind === "StringContents") {
        const str = payload.trim(); // OK!!
    }
}
```



이제 Typescript 는 객체나 매개변수를 destructure 할 때, destructure 되는 대상이 `discriminated union` 인지 검사를 하게 됩니다.

만약 맞다면, Typescript 는 다른 변수 값에 따라 타입을 좁힐 수 있습니다.





## Improved Recursion Depth Checks

> *재귀 Depth Check 기능이 개선되었습니다.*



TypeScript 는 구조적 타이핑 체계를 가지며 동시에 generic 을 지원하기 때문에 생기는 흥미로운 `challenge` 가 있습니다.



구조적 타이핑 시스템에서, object type 은 object 가 가지고 있는 member 에 근거해 양립될 수 있습니다.

```ts
interface Source {
    prop: string;
}

interface Target {
    prop: number;
}

function check(source: Source, target: Target) {
    target = source; // ERROR!!
    // Type 'Source' is not assignable to type 'Target'.
    //   Types of property 'prop' are incompatible.
    //     Type 'string' is not assignable to type 'number'.
}
```

`Source` 와 `Target` 타입이 양립할 수 있는지에 대한 여부는, `property` 가 할당 가능한지에 대한 여부에 의해 결정됩니다.

이 경우엔 `prop` 이며, `number` 는 `string` 에 할당될 수 없으므로 에러가 터집니다.



이 개념을 `generic` 으로 들고 오면 문제가 복잡해집니다. 예를 들어 봅시다.

```ts
interface Source<T> {
    prop: Source<Source<T>>;
}

interface Target<T> {
    prop: Target<Target<T>>;
}

function check(source: Source<string>, target: Target<number>) {
    target = source;
}
```

 `Source<string>` 은 `Target<number>` 에 할당될 수 있을까요?

이 문제에 답하기 위해서, TypeScript 는 `prop` 의 타입들이 양립가능한지 검증해야 합니다.

이는 또 다른 문제를 가져오게 되는데요, 바로 `Source<Source<string>>` 이 `Target<Target<number>>` 에 할당 가능한지에 대한 문제입니다.

또, 이에 대한 답을 하기 위해 TypeScript 는 `Source<Source<string>>` 의 `prop` 과 `Target<Target<number>>` 의 `prop` 타입이 할당 가능한지 확인해야 합니다.

즉, 확인해야 할 타입은 무한히 확장됩니다.



TypeScript 는 여기에 약간의 `heuristic` 을 두었는데요. 

만약 타입이 특정한 depth check 를 만나서 무한히 확장되어야 할 경우, 이 타입이 양립 가능하다고 생각하는 것입니다.

이는 일반적으로 괜찮은 방법이지만, 해당 `heuristic` 으로 잡을 수 없는 몇 가지 오류가 있었습니다.

```ts
interface Foo<T> {
    prop: T;
}

declare let x: Foo<Foo<Foo<Foo<Foo<Foo<string>>>>>>;
declare let y: Foo<Foo<Foo<Foo<Foo<string>>>>>;

x = y; // 4.5.3 버전 이전에서는 문제가 없습니다.
			 //	그러나 이젠 error 로 검출됩니다.
```

우리는 위 예에서 `x, y` 는 결국 `Foo<string>` 과 `string` 을 비교하게 되므로 서로 양립할 수 없단 것을 확인할 수 있습니다. 

그러나 이전 버전에서 이 케이스는 `heuristic` 에 의해 에러로 검출되지 않았습니다.

heuristic 이 의미하는 것은 앞선 예시와 같이 깊이 nesting 되는 타입으로부터 발생되는 케이스를 의미하는 것이었지, 

우리 스스로 타이핑한 타입에 대한 케이스를 의미하는 것이 아니었습니다.



**TypeScript 4.6 부턴 해당 케이스가 에러임을 검증할 수 있습니다.**

추가적으로, 더 이상 명시적으로 작성된 타입으로부터 `false-positive` 한 지에 대해 신경쓰지 않기 때문에, 무한히 확장되는 타입에 대해 훨씬 더 빨리 결론지을 수 있습니다.

이로 인해 `redux-immutable, react-lazylog, yup` 과 같은 라이브러리에서 `check-time` 이 50% 정도 경감된 것을 확인할 수 있었습니다.

이 특징은 TypeScript 4.5.3 에서 cherry-pick 되었으므로 이미 확인했을 수도 있지만, TypeScript 4.6 에서 주목할만한 특징 중 하나입니다.



## Indexed Access Inference Improvements

> *Index 접근 추론 기능이 개선되었습니다.*



**Typescript 4.6 버전부터 [mapped object type](https://www.typescriptlang.org/docs/handbook/advanced-types.html#mapped-types) 으로 바로 인덱싱을 하는 [indexed access type](https://www.typescriptlang.org/docs/handbook/2/indexed-access-types.html) 일 경우,** **보다 정확하게 추론할 수 있게 되었습니다.**

```ts
interface TypeMap {
    "number": number;
    "string": string;
    "boolean": boolean;
}

type UnionRecord<P extends keyof TypeMap> = { [K in P]:
    {
        kind: K;
        v: TypeMap[K];
        f: (p: TypeMap[K]) => void;
    }
}[P];
```

위 코드는 `TypeMap` 의 key 들을 `map` 하며 만들어진 `object type` 을 `P`로 `indexing` 하는 타입입니다.



```ts
interface TypeMap {
    "number": number;
    "string": string;
    "boolean": boolean;
}

type UnionRecord<P extends keyof TypeMap> = { [K in P]:
    {
        kind: K;
        v: TypeMap[K];
        f: (p: TypeMap[K]) => void;
    }
}[P];

function processRecord<K extends keyof TypeMap>(record: UnionRecord<K>) {
    record.f(record.v);
}

processRecord({
    kind: "string",
    v: "hello!",
    f: val => {
        console.log(val.toUpperCase()); // ERROR!!
        // Property 'toUpperCase' does not exist on type 'string | number | boolean'.
        // Property 'toUpperCase' does not exist on type 'number'.
    }
})
```

`processRecord` 에서 인자를 kind 의 `'string'` 값에 따라 `UnionRecord<'string'>` 로 추론되어져 `f` 의 `val` 이 `string` 으로 추론되어야 하지만, 의도와는 달리 `string | number | boolean` 으로 추론되고 있습니다.



이를 해결하기 위해선 다음과 같이 `type assertion` 을 해줘야 했습니다.

```ts
processRecord({
    kind: "string",
    v: "hello!",
    f: val => {
        console.log(val.toUpperCase()); // OK!
    }
} as UnionRecord<'string'>)
```



**Typescript 4.6 부터는 `mapped object type` 을 `indexing` 하는 추론 기능이 개선되었습니다.** 

따라서 위와 같은 타입 단언 없이도 정상적으로 동작합니다.

```ts
interface TypeMap {
    "number": number;
    "string": string;
    "boolean": boolean;
}

type UnionRecord<P extends keyof TypeMap> = { [K in P]:
    {
        kind: K;
        v: TypeMap[K];
        f: (p: TypeMap[K]) => void;
    }
}[P];

function processRecord<K extends keyof TypeMap>(record: UnionRecord<K>) {
    record.f(record.v);
}

processRecord({
    kind: "string",
    v: "hello!",
    f: val => {
        console.log(val.toUpperCase()); // OK!
    }
})
```





 

## Control Flow Analysis for Dependent Parameters

> *의존적인 Parameter 에 대한 제어 흐름 분석 기능이 개선되었습니다.*



다음과 같이 매개변수로 `tuple` 의 `discriminated union` 타입으로 가지는 함수 시그니처가 있다고 가정해보면,

```ts
type Func = (...args: ["a", number] | ["b", string]) => void;

const f1: Func = (kind, payload) => {
    if (kind === "a") {
        payload.toFixed();  // ERROR!!
      	//	Property 'toFixed' does not exist on type 'string | number'.
			 	// 	Property 'toFixed' does not exist on type 'string'.
    }
    if (kind === "b") {
        payload.toUpperCase();  // ERROR!!
      	//	Property 'toUpperCase' does not exist on type 'string | number'.
  			//	Property 'toUpperCase' does not exist on type 'number'.      
    }
};
```

이전 버전에서는 서로 `kind, payload` 같이 parameter 들이 서로 의존하고 있음에도 불구하고 타입이 제대로 추론되지 않았습니다.



Typescript 4.6 버전에서는 문제 없이 추론할 수 있습니다,

```ts
type Func = (...args: ["a", number] | ["b", string]) => void;

const f1: Func = (kind, payload) => {
    if (kind === "a") {
        payload.toFixed();  		// 'payload' 는 'number' 타입으로 추론됩니다. 
    }
    if (kind === "b") {
        payload.toUpperCase();  // 'payload' 는'string' 타입으로 추론됩니다.
    }
};
```





## `--target` es2022

> *tsconfig 의 `--target` option 이 `es2022` 을 지원합니다.*

 

**Typescript 4.6 버전 부터 tsconfig 의 `--target` option 값으로 `es2022` 를 사용할 수 있습니다.**



해당 옵션으로 설정할 경우, 다음과 같은 기능들을 지원합니다.

- *Class Field 들이 이제 보존되어 질 수 있는 안정적인 output target 을 가지게 됩니다.*

- *[Array.prototype.at()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/at)*
- *[Object.hasOwn()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwn)*
- *[new Error 의 `cause` option](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/Error#rethrowing_an_error_with_a_cause)*



이러한 설정은 `--target` 세팅이나 `--lib ES2022` 를 설정하는 방식으로 사용할 수 있습니다.





## Removed Unnecessary Arguments in `react-jsx`

> *`react-jsx` 에서 불필요한 인자를 제거합니다.*



이전 버전에선 `tsconfing` 내부의 `jsx` option 에  `react-jsx` 모드로 컴파일 할 경우, 마지막 argument 로 `void 0` 이 함께 담기며 컴파일되었습니다.



예를 들어, 다음과 같은 코드는 다음과 같이 컴파일 됐습니다.

```ts
export const el = () => (
    <div>foo</div>
);
```

```ts
// Compiled like this...

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.el = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const el = () => ((0, jsx_runtime_1.jsx)("div", { children: "foo" }, void 0));
exports.el = el;
```

이 마지막 `void 0` 은 `emit mode` 에서 불필요합니다.



**Typescript 4.6 부터는 bundle size 를 개선시키기 위해 이를 제거합니다.**

```diff
- export const el = _jsx("div", { children: "foo" }, void 0);
+ export const el = _jsx("div", { children: "foo" });
```





## JSDoc Name Suggestions

> *JSDoc Name 제안 기능이 추가되었습니다.*



JSDoc 에서는 `@param` tag 를 사용하여 `parameter` 에 대한 설명을 작성할 수 있습니다.

```ts
/**
 * @param x The first operand
 * @param y The second operand
 */
function add(x, y) {
    return x + y;
}
```

그러나, x, y 가 a, b 로 네이밍이 수정될 경우 주석도 함께 수정되지 않습니다.



**Typescript 4.6 버전부터는 function 과 JSDoc 주석이 일치하지 않을 경우, `Suggestion` 을 통해 정보를 줍니다.**

![Suggestion diagnostics being shown in the editor for parameter names in JSDoc comments that don't match an actual parameter name.](https://devblogs.microsoft.com/typescript/wp-content/uploads/sites/11/2022/02/jsdoc-comment-suggestions-4-6.png)

다음과 같이 JSDoc 내부에 밑줄이 생기며 위와 같은 에러를 확인할 수 있게 됩니다.





## More Syntax and Binding Errors in JavaScript

> *Javascript 내부에서 더 많은 Syntax, Binding 에러를 검출할 수 있습니다.*



**Typescript 4.6 부터는 JS 파일 내부의 `syntax, binding` 에러 set 을 확장됩니다.**

이제는 Visual Studio Code 같은 에디터 내에 JS file 을 열거나 TS compiler 를 통해 JS code 를 실행 시킬 경우, `checkJS` 나 `//@ts-check` 와 같은 주석 없이도 에러를 만듭니다.



예를 들어, 다음과 같이 JS 파일 내부에서 같은 scope 내에 두 개의 `const` 로 선언된 식별자가 있을 경우, 해당 선언에 대해 에러를 표시합니다.

```js
const foo = 1234;
//    ~~~
// error: Cannot redeclare block-scoped variable 'foo'.

// ...

const foo = 5678;
//    ~~~
// error: Cannot redeclare block-scoped variable 'foo'.
```



다음과 같이 `modifier` 가 잘못 사용될 경우에도 에러를 내게 됩니다.

```js
function container() {
    export function foo() {
//  ~~~~~~
// error: Modifiers cannot appear here.

    }
}
```

물론 해당 에러는 `//@ts-nocheck` 주석을 통해 없앨 수 있습니다. 

그러나 중점적으로 봐야할 것은 이젠 JS workflow 에 해당 코드가 정상적으로 동작하는지 보다 더 이른 피드백을 줄 수 있다는 점입니다.

해당 기능은 Visual Stuidio Code 내에서 [TypeScript and JavaScript Nightly Extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-typescript-next) 을 설치하여 시험해볼 수 있습니다.





## TypeScript Trace Analyzer

> *Typescript Trace Analyzer 가 release 되었습니다.*



때때로, 다른 타입에 비해 연산 비용이 꽤 많이 드는 타입을 만날 수 있습니다.

TypeScript 는 이러한 타입을 식별하는데 도움을 주기 위해 [`--generateTrace` flag](https://www.typescriptlang.org/docs/handbook/compiler-options.html#compiler-options) 를 제공하고 있습니다.

이 `--generateTrace` 에 의해 만들어지는 정보는 꽤 유용하지만, `trace visualizer` 를 읽는 데 꽤 어려움이 들 수 있습니다.

![Type checking call stack](https://raw.githubusercontent.com/wiki/Microsoft/TypeScript/images/tracingTypes.png)



이젠 이러한 정보들을 더 쉽게 볼 수 있는 `view` 를 제공하는 [@typescript/analyze-trace](https://github.com/microsoft/typescript-analyze-trace) 가 출시되었습니다.

모든 사람들이 `analyze-trace` 를 필요로 할거라 생각하진 않지만, [Typescript 성능 문제](https://github.com/microsoft/TypeScript/wiki/Performance) 를 만나게 되는 팀들에게 유용할 것이라 생각합니다.





## Breaking Changes

### Object Rests Drop Unspreadable Members from Generic Objects

> *Generic Objects 에서 Object Rest 표현식이 spreadable 하지 않은 멤버들을 drop 합니다.*



**TypeScript 4.6 부터는 generic objects 에서 spread 할 수 없는 멤버들은 rest 표현식에서 drop 됩니다.**

다음과 같은 예를 보면,

```ts
class Thing {
    someProperty = 42;

    someMethod() {
        // ...
    }
}

function foo<T extends Thing>(x: T) {
    let { someProperty, ...rest } = x;

    // Used to work, is now an error!
    // Property 'someMethod' does not exist on type 'Omit'.
    rest.someMethod();
}
```

기존에 타입스크립트에서 rest 는 `Omit<T, 'someProperty'>` 로 추론되었습니다.

**Typescript 4.6 에서는 rest 는 `Omit<T, 'someProperty' | 'someMethod'>` 로 추론됩니다.**



이는 `this` 키워드로부터 destructure 되는 경우에도 적용됩니다.

`this` 를 rest parameter 를 사용하여 desturcture 하게 되면 이제는 spread 할 수 없거나 `non-public` 멤버를 drop 하게 됩니다.

```ts
class Thing {
    someProperty = 42;

    someMethod() {
        // ...
    }

    someOtherMethod() {
        let { someProperty, ...rest } = this;

        // Used to work, is now an error!
        // Property 'someMethod' does not exist on type 'Omit'.
        rest.someMethod();
    }
}
```





### JavaScript Files Always Receive Grammar and Binding Errors

> *JavaScript 파일에서 문법적인 에러나 Binding Error 를 검출합니다.*



이전에는 JavaScript 에서 TypeScript syntax 를 사용하는 것은 에러로 취급하였지만, JavaScript 의 대부분의 문법적인 에러는 무시했습니다.

**TypeScript 4.6 부터는 JavaScript 문법과 binding error 가 날 경우, 에러를 보여주게 됩니다.**



예를 들면 중복 선언, 부정확한 modifier 사용 등이 있습니다.

이는 일반적으로 Visual Studio Code 에서 확인할 수 있지만, TypeScript compiler 를 통해 JavaScript code 를 실행시킬 경우에도 일어나게 됩니다.

이러한 에러는 `//@ts-nocheck` 주석을 파일 상단에 두어서 제거할 수 있습니다.

