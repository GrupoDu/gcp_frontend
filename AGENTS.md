## Project Overview

This project have as objective to help manage employee's production, offering a dashboard to track and manage goals, tasks, and performance.

## Stack

- NextJS
- Typescript
- Axios
- ESLint

## Development Rules

- Avoid `any` type.
- Use `const` function in non-page components.
- Avoid logic inside element return.
- Readable code is priority.
- Maintainable code is priority.
- Separate functions by responsibility.
- Page components must be server component.
- If the component has more than 2 props, create a `type` to use, and use destructuring inside de function, e.g: `const { value1, value2 } = props`.
- For every function created (component or normal function) put a JSDoc with params and a little description. If it uses props, ref the props type in JSDoc.

## Behavior

- If you have any recommendation or idea, explain WHY you are recommending and what will be implemented. Await for confirmation or rejection.
- After every code edit, explain what was implemented and changed.
- Be straightforward in your explanations.
