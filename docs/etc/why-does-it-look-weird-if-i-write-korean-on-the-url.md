# URL 에 한글을 쓰면 왜 이상하게 나올까?

프론트엔드 개발자라면 HTTP 요청을 하거나, 상태를 URL 로 관리할 때 종종 %로 점철된 URL path 를 본 적이 있을겁니다.

항상 그러려니 하고 넘어가다가 문득 왜 이렇게 되는지 궁금해 관련 정보를 조사하게 되었습니다.

## Percent Encoding (URL Encoding)

Percent-encoding 은 URI 내부에서 ASCII 문자만을 사용하여 URI 데이터를 인코딩하는 방법입니다.

이는 ASCII 이외의 문자는 URI 에서 사용할 수 없음을 의미합니다.

### Reserved, Unreserved Character

조금 더 깊게 들어가보겠습니다.

Percent Encoding 의 글자는 Reserved, Unreserved Character 로 구분됩니다.

![image](https://i.stack.imgur.com/bHZf3.png)

Reserved Character 는 특별한 의미를 지닌 문자들입니다.

예를 들어, Reserved Character 인 `/` 는 구분자의 역할을 하며, `?` 는 뒤의 단어들이 query parameter 의 역할을 할 수 있도록 해줍니다.

Unreserved Character 는 의미를 지니지 않은 문자들입니다. 이 문자들은 따로 인코딩되지 않고 literal 하게 사용합니다.

Reserved, Unreserved Character 이외의 다른 모든 문자들은 UTF-8 에 따라 바이트로 변환하고, 이 값을 **%**가 접두어인 **hex 값으로** 로 인코딩해야 합니다. 즉, percent encoding 되어야 합니다.

## Unicode

그렇다면 UTF-8 은 무엇일까요? 이를 설명하기 위해서는 Unicode 를 먼저 설명해야 합니다.

컴퓨터에서 문자를 표현하기 위해선 가장 먼저 문자 집합을 정의해야 합니다. 문자 집합은 표현해야 할 문자를 정의하고, 순서를 지정한 것입니다. 예를 들어, 영어의 A-Z 를 각 1부터 26 까지 할당하는 식입니다.

유니코드는 세계적으로 사용하는 모든 문자 집합들을 하나로 모은 것입니다.

[다음 코드 차트](https://en.wikipedia.org/wiki/Template:Unicode_chart_Hangul_Syllables)를 보면, 한글은 **가 - 힣** 이 **U+AC00 ~ U+D7A3** 으로 정의되어 있습니다.

## UTF-8

UTF-8 은 Unicode Code Point 를 bit 로 변환해주는 인코딩 방식입니다.

즉, 앞서 언급한 **U+AC00 ~ U+D7A3** 를 bit 로 변환해주는 것입니다.

UTF-8 인코딩 방식은 다음과 같습니다.

![utf-8](https://ducmanhphan.github.io/img/Unicode/utf8-encoding-table.png)

Code Point 가 U+0000 ~ U+007F 인 경우, bit 수가 7개 이하이므로 1Byte 로 인코딩 됩니다.

한글은 **U+AC00 ~ U+D7A3** 의 범위를 가지므로, 3개의 Byte 로 인코딩됩니다.

## ''한글''을 UTF-8 으로

그럼 구체적인 예를 들어 봅시다.

'한글' 이라는 단어를 URL 에 사용하기 위해선 **Reserved, Unreserved Character** 가 아니기 때문에 utf-8 로 인코딩되어져야 합니다.

**한**은 유니코드로 **U+D55C**, 글은 유니코드로 **U+AE00** 입니다.

각각 이진수로 변환하면 다음과 같습니다.

```
한(U+D55C): 1101 0101 0101 1100

글(U+AE00): 1010 1110 0000 0000
```

두 코드 포인트 모두 16비트를 차지하므로 **1110**xxxx **10**xxxxxx **10**xxxxxx 로 치환해주어야 합니다.

xxxx 에 각 비트를 넣어주면, 다음과 같습니다.

```
한(U+D55C): 11101101 10010101 10011100

글(U+AE00): 11101010 10111000 10000000
```

이를 hex 값으로 변환하면 한은 **ED 95 9C** 이며, 글은 **EA B8 80** 입니다.

이를 URL 에선 percent 가 선행되어져야 하므로 한은 **%ED%95%9C**, 글은 **%EA%B8%80** 으로 인코딩됩니다.

console 창을 열고 encodeURI 을 호출하면 같은 결과가 나옵니다.

```js
encodeURI('한글'); // => '%ED%95%9C%EA%B8%80'
```

## 참고

- [Percent Encoding](https://en.wikipedia.org/wiki/Percent-encoding)
- [UTF-8](https://en.wikipedia.org/wiki/UTF-8)
- [한글 인코딩의 이해 1편: 한글 인코딩의 역사와 유니코드](https://d2.naver.com/helloworld/19187)
