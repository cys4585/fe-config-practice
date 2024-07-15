**팀 프로젝트를 시작할 때 환경설정을 급히 해놓긴 했지만, 제대로 이해하지 못한 것 같아서 차근차근 하나씩 설정을 해보면서 이해하는 것이 목표다.
react, typescript를 활용한 웹 앱을 개발하기 위한 프로젝트 환경설정을 한다.**

# 1. react 앱 빌드 환결 설정

1. 패키지 매니저 초기화
   - `npm init -y`
2. 필요한 패키지 설치
   - 웹팩: javascript 애플리케이션을 위한 정적 모듈 번들러이다. 프로젝트 내부적으로 필요한 모듈들을 매핑하고 하나(이상)의 번들을 생성한다.
   - `npm install -D webpack webpack-cli`
   - `npm i -D html-webpack-plugin`
     - 번들링된 js 파일을 import는 하는 html 파일을 만들어주는 플러그인이다.
   - `npm install react react-dom`
   - `npm install -D babel-loader @babel/core @babel/preset-react`
     - react에서 사용하는 jsx 문법은 브라우저가 이해할 수 없는 문법이다. jsx 문법은 javaScript 코드로 변환되어야 한다. babel의 @babel/preset-react가 jsx 코드를 브라우저가 이해할 수 있는 JavaScript 코드로 변환해준다. 그리고 그 babel을 webpack에서 load한다.
3. 환경 설정
   1. [웹팩 설정](./webpack.config.js)
   2. [바벨 설정](babel.config.json)
4. 코드 작성
   - index.html, index.jsx, App.jsx
5. 빌드
   - [npm run build](./package.json)

# 2. typescript 환경 설정 (babel)

1. 필요한 패키지 설치
   - `npm install -D typescript @babel/preset-typescript @types/react @types/react-dom`
2. 설정 수정
   1. [웹팩 설정](./webpack.config.js)
      - entry file
      - resolve.extensions
      - babel-loader
   2. [바벨 설정](./babel.config.json)
      - preset-typescript
3. 파일 확장자 및 코드 수정
   - index.tsx, App.tsx

babel + babel/preset-typescript으로 설정하면 컴파일 시 타입 검사를 하지 않는다. 그로인해 컴파일 속도가 빠르다는 장점과 실수(타입 오류를 잡지 못하고 컴파일)를 할 수 있다는 단점이 있다.

- [예시](./src/App.tsx)

# 3. typescript 환경 설정 (tsc)

컴파일타임에 타입 오류를 잡기 위해 typescript compiler가 필요하다.

```typescript
const greet = (name: string): string => {
  return `Hello, ${name}!`;
};

// greet의 parameter는 string 타입을 요구하지만, number 타입을 argument로 전달한다.
// 이는 typescript 규칙 상으로 에러이지만 컴파일이 가능하다.
// 이유: @babel/preset-typescript는 컴파일 시 타입 검사를 하지 않기 때문
// webpack에 ts-loader를 추가하면 컴파일 시 타입 검사를 수행한다.
const result = greet(123);
```

1. 필요한 패키지 설치
   - `npm install -D ts-loader`
2. 설정 수정
   1. [웹팩 설정](./webpack.config.js)
      - module.rules는 뒤에서부터 적용된다.
        - babel-loader와 ts-loader를 함께 쓰는 경우, ts --(ts-loader)--> js --(babel-loader)--> js with polyfill 의 과정을 거치기 위함으로, ts-loader를 뒤에 둬야 한다.
   2. [TS 설정](./tsconfig.json)
      - "moduleResolution": "Bundler"
        - 모듈을 해석하는 방법을 결정하는 flag
        - TS에게 코드가 번들러(webpack)에 의해 번들로 제공되므로 규칙을 완화하도록 한다.
   3. [바벨 설정](babel.config.json)
      - "@babel/preset-typescript"
        - ts-loader와 함께 쓰면, babel 입장에선 ts 파일을 만날 일이 없기 때문에 삭제
      - ["@babel/preset-react"]
        - { "runtime": "auto matic" }: JSX 코드가 자동으로 변환되어 React를 명시적으로 import할 필요가 없다.

babel-loader와 ts-loader를 함께 쓰는 경우 역할이 겹치는 부분이 많기 때문인지 딱 떨어지는 정석적인 설정의 정답은 없는 것 같다.
기본적인 타입 체킹과 js로의 트랜스 파일링은 ts-loader가, 구형 브라우저를 위한 polyfill은 babel-loader가 담당하도록 설정했다.
