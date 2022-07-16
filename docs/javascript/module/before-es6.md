---
title: ES6 이전의 Module System
description: ''
---

## Pre Module

> _1990년대 중반 ~ 2000년대 초반_

dfdf

## DIY Module

ES6 이전엔 IIFE 로 변수의 전역 공간으로서의 노출을 막을 수 있었습니다.

```js
var module = {};
function require(fileName) {
  return module[fileName] == null ? undefined : module[fileName];
}

module['counter.js'] = (function () {
  var count = 0;

  return function counter() {
    return {
      addCount() {
        count = count + 1;
      },
      minusCount() {
        count = count - 1;
      },
      getCount() {
        return count;
      },
    };
  };
})();

var counter = require('counter.js')();
counter.addCount();
counter.addCount();
counter.minusCount();
console.log(counter.getCount()); // 1
```

## CommonJS

Node.js 진영에서 자주 사용하는 모듈 시스템입니다.

CommonJS 모듈은 서버와 동기적으로 파일들을 불러오는 목적으로 디자인 되었습니다.

Node 에서 파일들은 파일 시스템에 존재하므로, 웹에서 네트워크를 통해 가져오게 되는 파일에 비해 비교적 빠르게 파일들을 가져올 수 있습니다. 이 때문에 굳이 여러 개의 파일을 하나의 파일로 번들링 할 필요가 없었습니다.

CommonJS format 은 아래와 같은 특징을 가지고 있습니다.

- 하나의 파일은 하나의 모듈을 지닐 수 있습니다.
- 동기적으로 파일들을 가져오는 특성 상 정적 분석이 가능합니다.
- [순환 의존성을 지원합니다.](https://blog.outsider.ne.kr/1283)

## Asynchronous Module Definition (AMD)

브라우저 진영에서 자주 사용하던 모듈 시스템입니다.

CommonJS 모듈은 하나의 파일이 하나의 모듈을 지니기 때문에 비교적 느린 네트워크 환경에 있는 브라우저 환경에서는 적합하지 않았습니다. AMD format 은 여러 스크립트 들을 하나의 파일로 만들어 주기 때문에 브라우저 환경에 보다 적합합니다.

AMD format 은 다음과 같은 특징을 가집니다.

- 여러 개의 모듈을 하나의 파일로 만들어줍니다.
- 동적으로 모듈을 가져올 수 있습니다.

```js
var MyModule = require("MyModule");

// module
define(["dependencies", ...], function(){
    return MyModule;
})

// import 할 때
require(["dependencies", ...], function(MyModules, ...){
    // do stuff here
});
```

## Further Readings

- [JavaScript Modules Past & Presents](https://www.youtube.com/watch?v=GQ96b_u7rGc&t=2325s)
- [Exploring ES6](https://exploringjs.com/es6/ch_modules.html#static-module-structure)
- [Why AMD](https://requirejs.org/docs/whyamd.html)
