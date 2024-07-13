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
