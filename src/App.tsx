import React from "react";

const greet = (name: string): string => {
  return `Hello, ${name}!`;
};

const App = () => {
  // greet의 parameter는 string 타입을 요구하지만, number 타입을 argument로 전달한다.
  // 이는 typescript 규칙 상으로 에러이지만 컴파일이 가능하다.
  // 이유: @babel/preset-typescript는 컴파일 시 타입 검사를 하지 않기 때문
  const result = greet(123);
  console.log(result);

  return <>Hello World</>;
};

export default App;
