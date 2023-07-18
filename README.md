# ReactJS

## Library not a framework

- **Library** are like pieces of furniture that add style and function to an already constructed house
- **Frameworks**, on the other hand, are a template you use to build the house itself.

## Features

- JSX (Javascript XML)
- Components (pure functions)
  - state
  - props
- Virtual DOM
  - changes happens virtually before replacing actual DOM (lightweight)

## Boilerplate

- Framework
  - NextJS ([create-next-app](https://nextjs.org/docs/pages/api-reference/create-next-app))

# Learn as you code

## Prerequisites

Create a boilerplate using [create-next-app](https://nextjs.org/docs/pages/api-reference/create-next-app)

## Exercise 1 - Pages

### Pages

1. Create a `pages` folder under `src`
2. Create an `index.tsx` file under `src/pages` with this content:
   ```javascript
   export default function Home() {
     return (
       <div>
         <h1>Home</h1>
       </div>
     );
   }
   ```
   - `pages`` folder servers as routing for NextJS
   - `index.tsx` always serves as the displayed page in the route
   - it's important to **ALWAYS** use `export default` in page components (otherwise NextJS will not see it as a page)
3. Create another folder inside `pages` named `twist` and another `index.tsx` under `src/pages/twist` with content:
   ```javascript
   export default function Twist() {
     return (
       <div>
         <h1>Twist</h1>
       </div>
     );
   }
   ```
4. In your browser, navigate to `localhost:3000/twist`
5. Create another file inside `src/pages/twist` named `resources.tsx` with content:
   ```javascript
   export default function Resources() {
     return (
       <div>
         <h1>Resources</h1>
       </div>
     );
   }
   ```

# Routing in NextJS is very simple, right? 😃

### Links

#### NextJS has an exported component `Link`

1. In `src/pages`, create a file named `_app.tsx`

   - `_app.tsx` serves as the root file for all pages, anything displayed here will be displayed in all pages

   ```javascript
   import { AppProps } from "next/app";
   import Link from "next/link";

   export default function App({ Component }: AppProps) {
     return (
       <div>
         <div style={{ display: "flex", gap: "12px" }}>
           <Link href="/">Home</Link>
           <Link href="/twist">Twist</Link>
           <Link href="/resources">Resources</Link>
         </div>
         <Component />
       </div>
     );
   }
   ```

   - `<Component />` is the component page rendered in each route (e.g. `src/pages/twist.tsx`)

2. Try clicking the links at the top of your webpage to see how it works

## Exercise 2 - Components

1. Create a `components` folder inside `src`
2. Create a file named `button.tsx` inside `src/components` with content:
   ```javascript
   export const Button = () => {
     return <button>Click me</button>;
   };
   ```
3. Import the `Button` component in your homepage and place it below the `Hello`
   - components can be
     - self-closed
       - `<Button />`
     - paired
       - `<Button></Button>`
   - check if it is rendered in your homepage
   - NextJS handles **aliased imports**
     - `@/components/whatever`

## Exercise 3 - State and Props

1. In your Home page file(`src/pages/index.tsx`), create a state to count the number of times a button is clicked
   - place it above the `return` statement
   ```javascript
   const [clicks, setClicks] = useState(0);
   ```
   - don't forget to import `useState`
2. Go to `src/components/button.tsx`, and declare your `props` type (used to be [PropTypes](https://legacy.reactjs.org/docs/typechecking-with-proptypes.html) in base ReactJS)
   ```javascript
   type ButtonProps = {
     onClick: () => void,
   };
   ```
3. Add the type declaration to your component params and deconstruct your `props`:
   - you should see an **intellisense** for your `onClick` method when you click <kbd>CTRL</kbd> + <kbd>Space</kbd> in your keyboard
   ```javascript
   export const Button = ({ onClick }: ButtonProps) => {
   ```
4. Assign the `onClick` prop to your button's `onClick` event listener prop:

   ```javascript
   return <button onClick={onClick}>Click me</button>;
   ```

5. Go back to `src/pages/index.tsx` and assign the `setClicks` method to your button's `onClick` prop, and show the `clicks` state above the button

   ```javascript
    <p>Clicks: {clicks}</p>
    <Button onClick={() => setClicks(clicks + 1)} />
   ```

6. Click the `Click Me` button a couple of times and see how the count reacts

## 4. Advanced state management

state can be handled in many ways:

- useState
- useContext
- useReducer
- Redux
- etc.

In this example, we're going to explore where to best place the state and which state management tool to use best

### useContext

- used to expose state in a given context
- solution for `prop drilling`

  - passing state from component to component until you reach the component where you want to use that state
  - example: passing the `count` prop in this manner
    - \_app.tsx
    - ```javascript
      const [count] = useState();
      return <Component count={count}>
      ```
    - index.tsx
    - ```javascript
      const Home = ({ count }) => (
        <Header count={count}>
      )
      ```
    - header.tsx
    - ```javascript
      const Header = ({ count }) => (
        <Content count={count}>
      )
      ```
    - content.tsx
    - ```javascript
      const Content = ({ count }) => <p>{count}</p>;
      ```
  - instead, we can just do this:

    - \_app.tsx
    - ```javascript
      export const CountContext = createContext(0);

      function App() {
        const [count] = useState();

        return (
          <CountContext.Provider value={clicks}>
            <div>
              <h1>Home</h1>
              <p>Clicks: {clicks}</p>
              <Button onClick={() => setClicks(clicks + 1)} />
            </div>
          </CountContext.Provider>
        );
      }
      ```

    - content.tsx
    - ```javascript
      import { CountContext } from "@/pages";
      const Content = () => {
        const count = useContext(CountContext);
        return <p>{count}</p>;
      };
      ```

# Note that everything inside a Context Provider is affected by the state change

### useReducer is a clone of [Redux](https://redux.js.org/)

- state
- action
  - type
  - payload

## 5. Custom hooks

- used to promote logic and state reusability
- hooks are basically `components` that returns whatever you want

example:
in `src/hooks/useCount.tsx`

```javascript
import { useState } from "react";

export const useCount = ({ defaultCount = 0 }: { defaultCount?: number }) => {
  const [count, setCount] = useState(defaultCount);

  return { count, setCount };
};
```

in `src/pages/index.tsx`,
instead of declaring:

```javascript
const { clicks, setClicks } = useCount({ defaultCount: 1 });
```

we can import the `useCount` hook instead

```javascript
import { useCount } from "@/hooks/useCount";

export default function HOME() {
  const { clicks, setClicks } = useCount({ defaultCount: 1 });
```

## 6. Choosing your UI library

Frameworks I've used:

- [Material UI](https://mui.com/)
  - probably the most famous UI library
- [Chakra-UI](https://chakra-ui.com/getting-started)
  - simple and has a [TailwindCSS](https://tailwindcss.com/) like way of adding styles
- [TailwindCSS](https://tailwindcss.com/)
  - used to just add classNames of predefined CSS attributes

Things to consider when choosing your UI library

- Mobile-friendly
- Accessibility
  - aria-roles
  - aria-labels
  - important when unit testing
- Support

## 7. [Axios](https://axios-http.com/docs/intro)

- HTTP client for node and browser

> Create only 1 axios instance for consistency and just import the created axios instance

```javascript
const api = axios.create({
  baseURL: "localhost:3000/api",
});
```

## 8. Testing

- [Cypress](https://www.cypress.io/)
  - more versatile
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
  - for unit testing
