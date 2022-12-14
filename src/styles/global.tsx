import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    font-family: 'Noto Sans', sans-serif;
    font-size: 16px;
    margin: 0;
    padding: 0;
    border: 0;
    outline: 0;
    font-size: 100%;
    vertical-align: baseline;
    background: transparent;
  }
  body {
    line-height: 1;
    background-color: rgba(255, 249, 244);
  }
  article,aside,details,figcaption,figure,
  footer,header,hgroup,menu,nav,section { 
    display: block;
  }

  ul {
    list-style: none;
  }

  a {
    margin: 0;
    padding: 0;
    font-size: 100%;
    vertical-align: baseline;
    background: transparent;
    cursor: pointer;
  }

  button {
    background-color: transparent; 
    color: inherit; 
    border-width: 0; 
    padding: 0; 
    cursor: pointer;
  }
  
  html,
  body,
  #__next {
    width: 100%;
    min-height: 100vh;
  }

  #__next {
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;
