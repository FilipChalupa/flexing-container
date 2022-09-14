# Flexing container [![npm](https://img.shields.io/npm/v/flexing-container.svg)](https://www.npmjs.com/package/flexing-container) ![npm type definitions](https://img.shields.io/npm/types/flexing-container.svg)

## Installation

```bash
npm install flexing-container
```

## How to use

You can get inspired by [Example here](src/stories/Example.tsx) and [Storybook demo here](https://flexing-container.netlify.app/).

```jsx
import { FlexingContainer } from 'flexing-container'

const MyComponent = () => {
	// …

	return (
		<FlexingContainer
			wrap={({ children }) => <div className="box">{children}</div>}
		>
			{items[activeItemIndex]}
		</FlexingContainer>
	)
}
```

Don't forget to import styles from `flexing-container/dist/index.css`.

## Development

Run `npm start` and `npm run storybook` parallelly.
