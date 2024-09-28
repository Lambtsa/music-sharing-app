---
title: Unit testing for Audiolinx
author: Tom Lamb
date: 13/09/2024
---

## Vitest & React Testing Library
This document descripts the configuration Vitest with React Testing Library and good practices about testing. 

### Install @testing-library/react
```
$ pnpm add --save-dev @testing-library/react
```


### Install Vitest and jsdom 
- We're using jsdom here as the test environment
```
$ pnpm add --save-dev vitest jsdom
```

- Optionally install vitest-dom to add handy assertions to Vitest. 
```
$ pnpm add vitest-dom
```

- Import vitest-dom at within the vitest setup file setupTest.ts

```
$ import 'vitest-dom/extend-expect'
```

- we can activate it in the vitest.config.js
```
test: {
    environment: 'jsdom',
    include: ['**/*.test.tsx', '**/*.spec.tsx'],
    globals: true,
    setupFiles: './setupTest.ts',
  },
```
### Command lines

- run all unit tests and see coverage for each folder

```
pnpm test
```

- run all unit tests faster without coverage

```
pnpm test:fast
```

- run only a test file and run again as soon as there is a change on test file

```
pnpm test:watch ComponentName
```

- run all unit tests and see the result through a graphical interface

```
pnpm test:ui
```

### Good practices

Some basics rules about unit testing: 

- Testing only one concern: unit tests should be isolated tests

- In the same idea, we should avoid multiple acts

- And avoid using complex logic & test shouldn't duplicate implementation logic

- Ideally we should write tests before code  --> Test Driven Development (TDD)


#### Data-testid attribute

- we need to add an attribute:

```
data-testid
```

- for all components (component-component-name):

```typescript

```
- and for all screens (screen-screen-name):

```Typescript
  
  ```
#### Coverage

We must have a test coverage on new code of at least 80%. Coverage rat is measured by Sonar Cloud. 

#### Unit testing examples

##### Test with mock API

All API call and unit tests are in the src/services section. 
Here we test the fact that an error is thrown (of type Internal Server Error) :

```typescript

  ```

The API response is mocked in the folder apiHandlers.ts :
```typescript

```


##### Test with BFF (Back For Front)

All bff and unit tests are in the src/app/api section. We need to mock getToken function before. We test that bff return 401 when user is not authenticated and we test that bff should return a list of data with the right format : 

```typescript

```

The BFF response is mocked in the folder bffHandlers.ts :

```typescript

```

#### Architecture and naming

- Each tested file has a test file at the same level

- Each test file has the same name as the file tested with .spec.tsx at the end

```typescript

```

- .txs means that theses files are TypeScript files 

- in "describe" we need to add the component/function name tested

- in "test" we need to describe each unit test

```typescript

```