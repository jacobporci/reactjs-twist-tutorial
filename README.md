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

### Exercise 2 - Components

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

### Exercise 3 - State and Props

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
