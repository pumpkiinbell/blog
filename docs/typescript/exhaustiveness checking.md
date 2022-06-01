# exhaustiveness checking



## 시작



`exhaustiveness` 는 `철저함, 완전함` 이라는 뜻을 가지고 있습니다.

즉, `exhaustiveness checking` 은 모든 케이스에 대해 완전하게 검사한다는 의미를 가집니다.

어떤 대상을 완전하게 검사한다는 것일까요?



```ts
// types.ts

export type Animal = '개' | '고양이' | '토끼';

// touchAnimal.ts

import { Animal } from "./types";

const touchAnimal = (target: Animal) => {
    switch(target){
        case '개':
            return '개를 쓰다듬자...';
        case '고양이':
            return '고양이를 쓰다듬자...';
      	case '토끼':
            return '토끼를 쓰다듬자...';
        default:
            throw new Error('동물을 쓰다듬을 수 없어요...');
    }
}
```

위 코드를 예로 들어 봅시다.

`Animal` 이라는 타입을 정의하였고 타입마다 특정 값을 반환하는 로직입니다.

크게 문제 있어 보이는 코드는 아닙니다.



하지만, 만약 `Animal` 이 변동될 수 있다면 어떨까요?

```diff
// types.ts

- export type Animal = '개' | '고양이' | '토끼';
+ export type Animal = '개' | '고양이' | '토끼' | '호랑이';

// touchAnimal.ts

import { Animal } from "./types";

const touchAnimal = (target: Animal) => {
    switch(target){
        case '개':
            return '개를 쓰다듬자...';
        case '고양이':
            return '고양이를 쓰다듬자...';
      	case '토끼':
            return '토끼를 쓰다듬자...';
        default:
            throw new Error('동물을 쓰다듬을 수 없어요...');
    }
}
```

서버에서 `호랑이` 라는 타입을 `Animal` 에 추가하였습니다.

이 경우, `호랑이` 라는 값에 대한 분기문 처리가 되어있지 않으므로 Error 가 `throw` 될 것입니다. 

**문제는, 현재는 해당 에러를 런타임에서 잡을 수 있다는 점입니다!!**



우리가 TypeScript 를 사용하는 목적은 엄격한 타입 검사를 하여 런타임에서 발생할 수 있는 오류를 컴파일 단에서 잡아내는 것인데, 위의 케이스에서는 이 목적을 달성하기 어렵습니다. 

어떻게 하면 좋을까요?



## Exhaustiveness Checking



답은 `Exhaustiveness Checking` 입니다!

서두에도 말했다시피, `Exhaustiveness` 는 완전함, 철저함 이라는 뜻을 가집니다.



```ts
// types.ts

export type Animal = '개' | '고양이' | '토끼' | '호랑이';

// touchAnimal.ts

import { Animal } from "./types";

const touchAnimal = (target: Animal) => {
    switch(target){
        case '개':
            return '개를 쓰다듬자...';
        case '고양이':
            return '고양이를 쓰다듬자...';
      	case '토끼':
            return '토끼를 쓰다듬자...';
        default:
						exhaustiveCheck(target); // ERROR!!
        		// Argument of type 'string' is not assignable to parameter of type 'never'.
    }
}

const exhaustiveCheck = (param: never) => {
    throw new Error('동물을 쓰다듬을 수 없어요...');
}
```



아까와는 달리, `default` 로 `exhaustiveCheck` 함수를 호출합니다.

`exhaustiveCheck` 는 인자로 `never` 타입을 갖는데요, never 타입은 never 타입을 제외한 어떤 타입도 할당할 수 없기 때문에 `target` 이 `never` 타입이 아닌 타입으로 추론될 경우 에러를 출력하게 됩니다.



이 에러를 해결하려면 `철저하게 (exhaustive) ` 모든 케이스에 대해 분기 처리를 해줘야 합니다.

```ts
type Animal = '개' | '고양이' | '토끼' | '호랑이';

const touchAnimal = (target: Animal) => {
    switch(target){
        case '개':
            return '개를 쓰다듬자...';
        case '고양이':
            return '고양이를 쓰다듬자...';
      	case '토끼':
            return '토끼를 쓰다듬자...';
        case '호랑이':
            return '호랑이를 만나면 도망가자...';
        default:
            exhaustiveCheck(target); // OK!!
    }
}

const exhaustiveCheck = (param: never): never => {
    throw new Error('동물을 쓰다듬을 수 없어요...');
}
```



exhaustiveCheck 의 형태는 어떤 형태이든 상관없습니다. 

포인트는 `default` 로 들어오는 값을 `never` 타입에 할당 가능한지 체크해주면 됩니다.

```ts
type Animal = '개' | '고양이' | '토끼' | '호랑이';

const touchAnimal = (target: Animal) => {
    switch(target){
        case '개':
            return '개를 쓰다듬자...';
        case '고양이':
            return '고양이를 쓰다듬자...';
      	case '토끼':
            return '토끼를 쓰다듬자...';
        default:
            const _target: never = target; // ERROR!!
    }
}
```

이러한 방식으로 `exhaustiveness check` 를 할 경우, 예상치 못한 런타임 에러를 미연에 방지할 수 있게 됩니다.



### Reference

- [TypeScript Documentation: Narrowing - Exhaustiveness checking](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#exhaustiveness-checking)

- [Exhaustive Type Checking with TypeScript!](https://dev.to/babak/exhaustive-type-checking-with-typescript-4l3f)





