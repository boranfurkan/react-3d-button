# React 3D Button

A beautiful, customizable 3D button component for React with Next.js support, multiple themes, and easy CSS variable customization.

[![npm version](https://badge.fury.io/js/react-3d-button.svg)](https://www.npmjs.com/package/react-3d-button)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

**[📚 Live Demo & Documentation →](https://react-3d-button-demo.vercel.app/)**

## ✨ Features

- 🎨 **Multiple Pre-built Themes** - Ocean, Sunset, Forest, Pirate, Neon, and Default
- 🎭 **Easy Customization** - Override CSS variables for complete control
- 📱 **Mobile Optimized** - Enhanced touch support with fixed mobile interaction issues
- ⚡ **Next.js Compatible** - Works seamlessly with Next.js 13+ and App Router
- 🎯 **TypeScript Support** - Full TypeScript definitions included
- 🎪 **Rich Interactions** - 3D press effects, ripple animations, hover states
- ♿ **Accessible** - Proper ARIA attributes and keyboard navigation
- 📦 **Tree-shakeable** - ESM and CJS builds for optimal bundle size
- 🎨 **Multiple Button Types** - Primary, Secondary, Tertiary, Success, Error, Warning, Info, Anchor, Danger

## 📦 Installation

```bash
npm install react-3d-button
# or
yarn add react-3d-button
# or
pnpm add react-3d-button
```

## 🚀 Quick Start

### Basic Usage

```tsx
import { Button3D } from 'react-3d-button';
import 'react-3d-button/styles';

function App() {
  return (
    <Button3D type="primary" onPress={() => console.log('Pressed!')}>
      Click Me!
    </Button3D>
  );
}
```

### With Next.js

```tsx
'use client';

import { Button3D } from 'react-3d-button';
import 'react-3d-button/styles';

export default function MyComponent() {
  return (
    <Button3D type="primary" onPress={() => alert('Hello!')}>
      Press Me
    </Button3D>
  );
}
```

## 🎨 Using Themes

### Import a Pre-built Theme

```tsx
import { Button3D } from 'react-3d-button';
import 'react-3d-button/styles';
import 'react-3d-button/themes/ocean.css'; // Ocean theme
```

### Available Themes

- `themes/ocean.css` - Cool blues and teals
- `themes/sunset.css` - Warm oranges and purples
- `themes/forest.css` - Earthy greens and browns
- `themes/pirate.css` - Rich browns and tans (inspired by pirate aesthetics)
- `themes/neon.css` - Vibrant neon colors

### Create a Custom Theme

Override CSS variables to create your own theme:

```css
/* custom-theme.css */
.aws-btn {
  /* Primary button colors */
  --button-primary-color: #your-color;
  --button-primary-color-dark: #darker-shade;
  --button-primary-color-light: #text-color;
  --button-primary-color-hover: #hover-color;

  /* 3D effect customization */
  --button-raise-level: 6px; /* Height of the 3D effect */
  --button-hover-pressure: 3; /* Intensity of hover tilt */

  /* Border radius */
  --button-default-border-radius: 8px;

  /* Typography */
  --button-font-family: 'Your Font', sans-serif;
  --button-font-weight: 700;

  /* And many more... see full list below */
}
```

## 📖 API Reference

### Button3DProps

| Prop             | Type                                                                                                            | Default     | Description                          |
| ---------------- | --------------------------------------------------------------------------------------------------------------- | ----------- | ------------------------------------ |
| `type`           | `'primary' \| 'secondary' \| 'tertiary' \| 'success' \| 'error' \| 'warning' \| 'info' \| 'anchor' \| 'danger'` | `'primary'` | Button variant                       |
| `size`           | `'small' \| 'medium' \| 'large' \| string`                                                                      | `undefined` | Button size                          |
| `disabled`       | `boolean`                                                                                                       | `false`     | Disable the button                   |
| `active`         | `boolean`                                                                                                       | `false`     | Keep button in pressed state         |
| `visible`        | `boolean`                                                                                                       | `true`      | Control button visibility            |
| `ripple`         | `boolean`                                                                                                       | `false`     | Enable ripple effect on press        |
| `moveEvents`     | `boolean`                                                                                                       | `true`      | Enable 3D tilt on mouse move         |
| `href`           | `string`                                                                                                        | `undefined` | Render as anchor tag with href       |
| `onPress`        | `(event) => void`                                                                                               | `undefined` | Callback when button is pressed      |
| `onPressed`      | `(event) => void`                                                                                               | `undefined` | Callback when press animation starts |
| `onReleased`     | `(element) => void`                                                                                             | `undefined` | Callback when button is released     |
| `onMouseDown`    | `(event) => void`                                                                                               | `undefined` | Mouse down event handler             |
| `onMouseUp`      | `(event) => void`                                                                                               | `undefined` | Mouse up event handler               |
| `before`         | `ReactNode`                                                                                                     | `undefined` | Content before children (e.g., icon) |
| `after`          | `ReactNode`                                                                                                     | `undefined` | Content after children (e.g., icon)  |
| `between`        | `boolean`                                                                                                       | `false`     | Space between before/after content   |
| `className`      | `string`                                                                                                        | `undefined` | Additional CSS classes               |
| `style`          | `CSSProperties`                                                                                                 | `undefined` | Inline styles                        |
| `placeholder`    | `boolean`                                                                                                       | `true`      | Show placeholder when no children    |
| `containerProps` | `HTMLAttributes`                                                                                                | `{}`        | Props passed to container element    |
| `cssModule`      | `any`                                                                                                           | `undefined` | CSS module object for scoped styles  |

## 🎯 Examples

### Button Types

```tsx
<Button3D type="primary">Primary</Button3D>
<Button3D type="secondary">Secondary</Button3D>
<Button3D type="tertiary">Tertiary</Button3D>
<Button3D type="success">Success</Button3D>
<Button3D type="error">Error</Button3D>
<Button3D type="warning">Warning</Button3D>
<Button3D type="info">Info</Button3D>
<Button3D type="danger">Danger</Button3D>
```

### Button Sizes

```tsx
<Button3D size="small">Small</Button3D>
<Button3D size="medium">Medium</Button3D>
<Button3D size="large">Large</Button3D>
```

### With Icons

```tsx
import { ArrowRight, Download } from 'lucide-react';

<Button3D
  type="primary"
  before={<Download size={16} />}
>
  Download
</Button3D>

<Button3D
  type="primary"
  after={<ArrowRight size={16} />}
>
  Next
</Button3D>
```

### As Link

```tsx
<Button3D href="https://example.com" type="primary">
  Visit Website
</Button3D>
```

### With Ripple Effect

```tsx
<Button3D type="primary" ripple={true} onPress={() => console.log('Pressed!')}>
  Click for Ripple
</Button3D>
```

### Active/Pressed State

```tsx
const [isActive, setIsActive] = useState(false);

<Button3D
  type="primary"
  active={isActive}
  onPress={() => setIsActive(!isActive)}
>
  Toggle Active
</Button3D>;
```

## 🎨 CSS Variables Reference

### Dimensions

```css
--button-default-height: 48px;
--button-default-font-size: 14px;
--button-default-border-radius: 6px;
--button-horizontal-padding: 20px;
```

### 3D Effect

```css
--button-raise-level: 5px; /* Height of 3D effect */
--button-pressed-level: 0px; /* Depth when pressed */
--button-hover-pressure: 2; /* Hover tilt intensity */
--transform-speed: 0.185s; /* Animation speed */
```

### Typography

```css
--button-font-family: inherit;
--button-font-weight: 600;
--button-letter-spacing: 0px;
```

### Colors (Per Button Type)

For each button type (primary, secondary, success, error, warning, info, anchor, danger, tertiary), you can customize:

```css
--button-{type}-color: /* Main color */
--button-{type}-color-dark: /* Shadow/pressed color */
--button-{type}-color-light: /* Text color */
--button-{type}-color-hover: /* Hover state color */
--button-{type}-border: /* Border style */
```

## 🙏 Credits

This component is built on top of the excellent [react-awesome-button](https://github.com/rcaferati/react-awesome-button) library by [@rcaferati](https://github.com/rcaferati).

### Improvements Made

- ✅ **Next.js Compatibility** - Fixed issues with Next.js 13+ App Router and SSR
- ✅ **Mobile Touch Support** - Resolved touch event handling issues on mobile devices
- ✅ **More Button Variants** - Added tertiary, success, error, warning, and info types
- ✅ **Enhanced Theme System** - Easy-to-use CSS variable system for customization
- ✅ **TypeScript Improvements** - Better type definitions and prop validation
- ✅ **Performance Optimizations** - Improved rendering and event handling

## 📄 License

MIT © Furkan Boran

Original react-awesome-button: MIT © [@rcaferati](https://github.com/rcaferati)

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 🌟 Show Your Support

Give a ⭐️ if this project helped you!

## 📮 Contact

- GitHub: [@boranfurkan](https://github.com/boranfurkan)
- Live Demo: [https://react-3d-button-demo.vercel.app/](https://react-3d-button-demo.vercel.app/)

---

Made with ❤️ and inspired by react-awesome-button
