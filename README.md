# React 3D Button

A beautiful, customizable 3D button component for React with Next.js support, toggle mode, multiple themes, and easy CSS variable customization.

[![npm version](https://badge.fury.io/js/react-3d-button.svg)](https://www.npmjs.com/package/react-3d-button)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

**[📚 Live Demo & Documentation →](https://react-3d-button-demo.vercel.app/)**

## ✨ Features

- 🎨 **Multiple Pre-built Themes** - Ocean, Sunset, Forest, Pirate, Neon, and Default
- 📐 **Granular Sizing** - 6 size options (xs, sm, md, lg, xl, 2xl) plus legacy support
- 🔘 **Border Radius Variants** - From sharp corners to pill-shaped buttons
- 📏 **Full Width Support** - Buttons that span their container
- ⏳ **Loading States** - Built-in spinner with optional loading text
- 🎭 **Easy Customization** - Override CSS variables for complete control
- 📱 **Mobile Optimized** - Enhanced touch support with fixed mobile interaction issues
- ⚡ **Next.js Compatible** - Works seamlessly with Next.js 13+ and App Router
- 🎯 **TypeScript Support** - Full TypeScript definitions with comprehensive JSDoc
- 🎪 **Rich Interactions** - 3D press effects, ripple animations, hover states
- 🔘 **Toggle Mode** - Built-in toggle/switch functionality with smooth animations
- ♿ **Accessible** - Proper ARIA attributes and keyboard navigation
- 📦 **Tree-shakeable** - ESM and CJS builds for optimal bundle size (~24KB)
- 🎨 **9 Button Variants** - Primary, Secondary, Tertiary, Success, Error, Warning, Info, Anchor, Danger
- 🔄 **Zero Dependencies** - No runtime dependencies, pure React component

## 🎯 Use Cases

Perfect for:

- ✅ Landing pages and marketing sites
- ✅ SaaS dashboards and admin panels
- ✅ E-commerce checkout flows
- ✅ Gaming and entertainment apps
- ✅ Form submissions and CTAs
- ✅ Mobile-first web applications

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

React 3D Button supports two ways to apply themes: **global** (affects all buttons) or **scoped** (affects specific sections).

### Option 1: Global Theme (Recommended for Single-Theme Apps)

Apply a theme globally to all buttons in your app by importing the `.global.css` variant:

```tsx
import { Button3D } from 'react-3d-button';
import 'react-3d-button/styles';
import 'react-3d-button/themes/pirate.global.css'; // ⚡ Applies to ALL buttons

function App() {
  return (
    <>
      <Button3D type="primary">Pirate Button</Button3D>
      <Button3D type="success">Also Pirate</Button3D>
    </>
  );
}
```

### Option 2: Scoped Theme (For Multi-Theme Apps)

Apply themes to specific sections by wrapping buttons in a theme class:

```tsx
import { Button3D } from 'react-3d-button';
import 'react-3d-button/styles';
import 'react-3d-button/themes/ocean.css'; // Scoped theme
import 'react-3d-button/themes/sunset.css'; // Another scoped theme

function App() {
  return (
    <>
      <div className="theme-ocean">
        <Button3D type="primary">Ocean Button</Button3D>
      </div>

      <div className="theme-sunset">
        <Button3D type="primary">Sunset Button</Button3D>
      </div>
    </>
  );
}
```

### Available Themes

| Theme  | Global Import                              | Scoped Import                       | Description                                            |
| ------ | ------------------------------------------ | ----------------------------------- | ------------------------------------------------------ |
| Ocean  | `react-3d-button/themes/ocean.global.css`  | `react-3d-button/themes/ocean.css`  | Cool blues and teals - perfect for marine or tech apps |
| Sunset | `react-3d-button/themes/sunset.global.css` | `react-3d-button/themes/sunset.css` | Warm oranges and purples - energetic and vibrant       |
| Forest | `react-3d-button/themes/forest.global.css` | `react-3d-button/themes/forest.css` | Earthy greens and browns - natural and calming         |
| Pirate | `react-3d-button/themes/pirate.global.css` | `react-3d-button/themes/pirate.css` | Rich browns and tans - adventurous theme               |
| Neon   | `react-3d-button/themes/neon.global.css`   | `react-3d-button/themes/neon.css`   | Vibrant neon colors - bold and modern                  |

**[👀 Preview all themes live →](https://react-3d-button-demo.vercel.app/themes)**

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

| Prop             | Type                                                                                                            | Default     | Description                                                |
| ---------------- | --------------------------------------------------------------------------------------------------------------- | ----------- | ---------------------------------------------------------- |
| `type`           | `'primary' \| 'secondary' \| 'tertiary' \| 'success' \| 'error' \| 'warning' \| 'info' \| 'anchor' \| 'danger'` | `'primary'` | Button variant                                             |
| `size`           | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl'`                                                                 | `'md'`      | Button size (legacy: `small`, `medium`, `large` also work) |
| `rounded`        | `'none' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'`                                                              | `'md'`      | Border radius variant                                      |
| `fullWidth`      | `boolean`                                                                                                       | `false`     | Make button span full container width                      |
| `iconOnly`       | `boolean`                                                                                                       | `false`     | Square button with no padding (for icons)                  |
| `loading`        | `boolean`                                                                                                       | `false`     | Show loading spinner and disable interaction               |
| `loadingText`    | `string`                                                                                                        | `undefined` | Text to show alongside spinner when loading                |
| `disabled`       | `boolean`                                                                                                       | `false`     | Disable the button                                         |
| `active`         | `boolean`                                                                                                       | `undefined` | Keep button in pressed state (controlled mode for toggles) |
| `defaultActive`  | `boolean`                                                                                                       | `false`     | Initial active state (uncontrolled mode for toggles)       |
| `toggle`         | `boolean`                                                                                                       | `false`     | Enable toggle mode for persistent pressed states           |
| `onChange`       | `(active: boolean) => void`                                                                                     | `undefined` | Callback when toggle state changes                         |
| `visible`        | `boolean`                                                                                                       | `true`      | Control button visibility                                  |
| `ripple`         | `boolean`                                                                                                       | `false`     | Enable ripple effect on press                              |
| `moveEvents`     | `boolean`                                                                                                       | `true`      | Enable 3D tilt on mouse move                               |
| `href`           | `string`                                                                                                        | `undefined` | Render as anchor tag with href                             |
| `element`        | `React.ElementType`                                                                                             | `undefined` | Custom element type (e.g., Next.js Link)                   |
| `onPress`        | `(event) => void`                                                                                               | `undefined` | Callback when button is pressed                            |
| `onPressed`      | `(event) => void`                                                                                               | `undefined` | Callback when press animation starts                       |
| `onReleased`     | `(element) => void`                                                                                             | `undefined` | Callback when button is released                           |
| `onMouseDown`    | `(event) => void`                                                                                               | `undefined` | Mouse down event handler                                   |
| `onMouseUp`      | `(event) => void`                                                                                               | `undefined` | Mouse up event handler                                     |
| `before`         | `ReactNode`                                                                                                     | `undefined` | Content before children (e.g., icon)                       |
| `after`          | `ReactNode`                                                                                                     | `undefined` | Content after children (e.g., icon)                        |
| `between`        | `boolean`                                                                                                       | `false`     | Space between before/after content                         |
| `className`      | `string`                                                                                                        | `undefined` | Additional CSS classes                                     |
| `style`          | `CSSProperties`                                                                                                 | `undefined` | Inline styles                                              |
| `placeholder`    | `boolean`                                                                                                       | `true`      | Show placeholder when no children                          |
| `containerProps` | `HTMLAttributes`                                                                                                | `{}`        | Props passed to container element                          |
| `cssModule`      | `Record<string, string>`                                                                                        | `undefined` | CSS module object for scoped styles                        |
| `rootElement`    | `string`                                                                                                        | `'aws-btn'` | Root CSS class prefix for custom theming                   |
| `extra`          | `ReactNode`                                                                                                     | `undefined` | Extra content inside wrapper (badges, etc.)                |

### Type Exports

```tsx
import type {
  Button3DProps,
  ButtonSize,
  ButtonType,
  ButtonRounded,
} from 'react-3d-button';

type ButtonSize =
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl'
  | 'small'
  | 'medium'
  | 'large';
type ButtonType =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'success'
  | 'error'
  | 'warning'
  | 'info'
  | 'anchor'
  | 'danger';
type ButtonRounded = 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
```

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
// New granular sizes (recommended)
<Button3D size="xs">Extra Small</Button3D>   // 24px height
<Button3D size="sm">Small</Button3D>          // 32px height
<Button3D size="md">Medium</Button3D>         // 40px height (default)
<Button3D size="lg">Large</Button3D>          // 48px height
<Button3D size="xl">Extra Large</Button3D>    // 56px height
<Button3D size="2xl">2X Large</Button3D>      // 64px height

// Legacy sizes (still supported for backwards compatibility)
<Button3D size="small">Small</Button3D>
<Button3D size="medium">Medium</Button3D>
<Button3D size="large">Large</Button3D>
```

### Border Radius Variants

```tsx
<Button3D rounded="none">No Radius</Button3D>    // 0px
<Button3D rounded="sm">Small</Button3D>          // 4px
<Button3D rounded="md">Medium</Button3D>         // 6px (default)
<Button3D rounded="lg">Large</Button3D>          // 12px
<Button3D rounded="xl">Extra Large</Button3D>    // 16px
<Button3D rounded="full">Pill Shape</Button3D>   // 9999px
```

### Full Width Button

```tsx
<Button3D fullWidth type="primary">
  Full Width Submit
</Button3D>
```

### Loading State

```tsx
// Simple loading spinner
<Button3D loading>Submit</Button3D>

// Loading with text
<Button3D loading loadingText="Saving...">Save</Button3D>

// Dynamic loading state
const [isLoading, setIsLoading] = useState(false);

<Button3D
  loading={isLoading}
  loadingText="Processing..."
  onPress={async () => {
    setIsLoading(true);
    await submitForm();
    setIsLoading(false);
  }}
>
  Submit
</Button3D>
```

### Icon Only Buttons

```tsx
<Button3D iconOnly size="md">
  <PlusIcon />
</Button3D>

// Circular icon button
<Button3D iconOnly rounded="full" type="success">
  <CheckIcon />
</Button3D>
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

### Toggle Mode

Transform buttons into interactive toggle switches with persistent pressed states:

```tsx
// Uncontrolled toggle (manages its own state)
<Button3D
  type="success"
  toggle
  defaultActive={false}
  onChange={(active) => console.log('Toggle state:', active)}
>
  Click to Toggle
</Button3D>

// Controlled toggle (you manage the state)
const [isEnabled, setIsEnabled] = useState(false);

<Button3D
  type="primary"
  toggle
  active={isEnabled}
  onChange={setIsEnabled}
>
  {isEnabled ? '✓ Enabled' : 'Disabled'}
</Button3D>

// Toggle with icons (Lucide React example)
import { Check, Circle } from 'lucide-react';

const [notifications, setNotifications] = useState(true);

<Button3D
  type="success"
  toggle
  active={notifications}
  onChange={setNotifications}
>
  {notifications ? <><Check size={16} /> ON</> : <><Circle size={16} /> OFF</>}
</Button3D>

// Settings panel example
<Button3D
  type={darkMode ? 'primary' : 'secondary'}
  toggle
  active={darkMode}
  onChange={setDarkMode}
  size="small"
>
  {darkMode ? '🌙 Dark' : '☀️ Light'}
</Button3D>
```

**[🔘 View toggle examples →](https://react-3d-button-demo.vercel.app/toggle)**

## 🎨 CSS Variables Reference

### Dimensions & Layout

```css
--button-default-height: 40px; /* Base height (md size) */
--button-default-font-size: 14px;
--button-default-line-height: 20px;
--button-default-border-radius: 6px;
--button-horizontal-padding: 18px;
```

### Size-Specific Variables

Each size overrides the base dimensions:

```css
/* xs: 24px height */
/* sm: 32px height */
/* md: 40px height (default) */
/* lg: 48px height */
/* xl: 56px height */
/* 2xl: 64px height */
```

### 3D Effect & Animation

```css
--button-raise-level: 5px; /* Height of 3D effect */
--button-pressed-level: 0px; /* Depth when pressed */
--button-hover-pressure: 2; /* Hover tilt intensity (1-4) */
--transform-speed: 0.185s; /* Animation speed */
--button-transition-duration: 0.3s; /* General transitions */
```

### Typography

```css
--button-font-family: inherit;
--button-font-weight: 600;
--button-letter-spacing: 0px;
--button-text-transform: none; /* or 'uppercase' */
```

### Ripple Effect

```css
--button-ripple-color: rgba(255, 255, 255, 0.4);
--button-ripple-duration: 600ms;
```

### Colors (Per Button Type)

For each button type (`primary`, `secondary`, `tertiary`, `success`, `error`, `warning`, `info`, `anchor`, `danger`), you can customize:

```css
/* Replace {type} with: primary, secondary, etc. */
--button-{type}-color: #hex;          /* Main background color */
--button-{type}-color-dark: #hex;     /* 3D shadow/pressed color (darker shade) */
--button-{type}-color-light: #hex;    /* Text and icon color */
--button-{type}-color-hover: #hex;    /* Background on hover */
--button-{type}-border: none;         /* Border style (e.g., '1px solid #hex') */
```

**Example - Custom Primary Button:**

```css
.aws-btn {
  --button-primary-color: #10b981; /* Green background */
  --button-primary-color-dark: #059669; /* Darker green shadow */
  --button-primary-color-light: #ffffff; /* White text */
  --button-primary-color-hover: #0d9668; /* Hover state */
  --button-raise-level: 8px; /* More pronounced 3D */
}
```

### Complete Variable List

For a complete list of all available CSS variables, check the [source styles.css](https://github.com/boranfurkan/react-3d-button/blob/main/src/styles.css) or try the [interactive customizer](https://react-3d-button-demo.vercel.app/themes) on the demo site.

## 🛠️ Troubleshooting

### Styles Not Loading

Make sure to import the base styles:

```tsx
import 'react-3d-button/styles';
```

### Button Not Showing Up

Ensure you've wrapped your Next.js component with `'use client'` directive:

```tsx
'use client';

import { Button3D } from 'react-3d-button';
```

### TypeScript Errors

If you encounter type errors with the `style` prop when using CSS variables:

```tsx
<div style={{ '--button-primary-color': '#ff0000' } as React.CSSProperties}>
  <Button3D type="primary">Custom Color</Button3D>
</div>
```

### Theme Not Applying

Themes use CSS cascade, so import order matters:

```tsx
// ✅ Correct order
import 'react-3d-button/styles'; // Base styles first
import 'react-3d-button/themes/ocean.css'; // Theme second

// ❌ Wrong order
import 'react-3d-button/themes/ocean.css';
import 'react-3d-button/styles'; // This will override the theme
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
- ✅ **Scoped Themes** - Support for applying different themes to different sections

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
