# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.3.0] - 2024-12-26

### Added

- **Granular sizing system** - 6 new size options: `xs` (24px), `sm` (32px), `md` (40px), `lg` (48px), `xl` (56px), `2xl` (64px)
- **Border radius variants** - New `rounded` prop with options: `none`, `sm`, `md`, `lg`, `xl`, `full` (pill shape)
- **Full width support** - New `fullWidth` prop to make buttons span container width
- **Loading state** - New `loading` and `loadingText` props with built-in spinner animation
- **Icon-only buttons** - New `iconOnly` prop for square buttons perfect for icons
- **Comprehensive TypeScript JSDoc** - All props now have detailed JSDoc documentation with examples
- **Type exports** - New exported types: `ButtonSize`, `ButtonType`, `ButtonRounded`
- **ARIA attributes** - Added `aria-disabled` and `aria-busy` for better accessibility

### Changed

- Default button size changed from 48px to 40px (`md` size) for better proportions
- Improved TypeScript types - removed `| null` from optional props for better IDE autocompletion
- `className` prop now correctly typed as `string` instead of `string | null`
- Legacy sizes (`small`, `medium`, `large`) are still supported and mapped to new sizes

### Fixed

- IDE autocompletion now works correctly for `className` and other string props

## [1.2.0] - 2024-12-13

### Added

- **Global theme variants** - New `.global.css` files for all themes that apply globally when imported
  - `themes/ocean.global.css`
  - `themes/sunset.global.css`
  - `themes/forest.global.css`
  - `themes/pirate.global.css`
  - `themes/neon.global.css`
- `THEME_GUIDE.md` - Comprehensive guide explaining both global and scoped theme usage

### Fixed

- Theme import confusion - themes now work as expected when imported globally using `.global.css` variants
- Clarified theme usage in README with both global and scoped approaches

### Changed

- Updated documentation to explain the difference between global and scoped theme imports
- Enhanced theme table in README with both import options

## [1.0.0] - 2024-12-02

### Added

- Initial release of React 3D Button
- Button3D component with 3D press effects
- 9 button type variants (primary, secondary, tertiary, success, error, warning, info, anchor, danger)
- 5 pre-built themes (ocean, sunset, forest, pirate, neon)
- CSS variable system for easy customization
- Full TypeScript support
- Next.js 13+ App Router compatibility
- Mobile touch event support
- Ripple effect animation
- Hover tilt effects
- Size variants (small, medium, large)
- Icon support (before/after)
- Disabled state
- Active/pressed state
- Link/anchor functionality
- Comprehensive documentation
- Usage examples for React and Next.js

### Fixed

- Mobile touch event handling issues present in original react-awesome-button
- Next.js SSR compatibility issues
- Event handling race conditions

### Credits

- Built on top of [react-awesome-button](https://github.com/rcaferati/react-awesome-button) by [@rcaferati](https://github.com/rcaferati)

## [1.1.0] - 2024-12-03

### Added

- **Toggle Mode** - New toggle/switch functionality for persistent pressed states
  - `toggle` prop to enable toggle mode
  - `defaultActive` prop for uncontrolled toggle state
  - `onChange` callback for toggle state changes
  - Controlled and uncontrolled mode support
  - Smooth animations without flash on initial render
  - Works seamlessly with all button variants and themes

### Fixed

- SVG icon color inheritance - Icons now properly inherit text color using `currentColor`
- Initial render flash for buttons with `defaultActive={true}` - Now initializes in correct state immediately
- Icon fill color issues across different button types

### Improved

- Better SVG/icon support with proper color inheritance
- Enhanced TypeScript types for toggle props
- Updated documentation with toggle examples
- Added comprehensive toggle demo page

## [Unreleased]

### Planned Features

- More pre-built themes
- Animation customization options
- Keyboard navigation improvements
- Dark mode support
- More size variants
- Loading state built-in
- Icon-only button variant
- Button group component

---

[1.0.0]: https://github.com/YOUR_USERNAME/react-3d-button/releases/tag/v1.0.0
