'use client';

import {
  classToModules,
  createRippleEffect,
  getClassName,
  setCssEndEvent,
  toggleMoveClasses,
} from './helpers';
import * as React from 'react';

const ROOTELM = 'aws-btn';
const IS_WINDOW = typeof window !== 'undefined';
const IS_TOUCH =
  (IS_WINDOW && 'ontouchstart' in window) ||
  (IS_WINDOW && navigator.maxTouchPoints > 0);

const Anchor = React.forwardRef<
  HTMLAnchorElement,
  React.AnchorHTMLAttributes<HTMLAnchorElement>
>((props, ref) => <a ref={ref} {...props} />);
Anchor.displayName = 'Anchor';

const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>((props, ref) => <button ref={ref} {...props} />);
Button.displayName = 'Button';

/**
 * Available button size options.
 * - `xs` - Extra small (24px height, 10px font)
 * - `sm` - Small (32px height, 12px font)
 * - `md` - Medium (40px height, 14px font) - Default
 * - `lg` - Large (48px height, 16px font)
 * - `xl` - Extra large (56px height, 18px font)
 * - `2xl` - 2X Large (64px height, 20px font)
 *
 * Legacy sizes (`small`, `medium`, `large`) are still supported for backwards compatibility.
 */
export type ButtonSize =
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl'
  | 'small'
  | 'medium'
  | 'large';

/**
 * Available button type/variant options for styling.
 */
export type ButtonType =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'success'
  | 'error'
  | 'warning'
  | 'info'
  | 'anchor'
  | 'danger';

/**
 * Available border radius options.
 * - `none` - No border radius (0px)
 * - `sm` - Small radius (4px)
 * - `md` - Medium radius (6px) - Default
 * - `lg` - Large radius (12px)
 * - `xl` - Extra large radius (16px)
 * - `full` - Fully rounded (9999px, pill shape)
 */
export type ButtonRounded = 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';

/**
 * Props for the Button3D component.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Button3D type="primary" size="md">Click me</Button3D>
 *
 * // With loading state
 * <Button3D loading loadingText="Saving...">Save</Button3D>
 *
 * // Full width button
 * <Button3D fullWidth type="success">Submit</Button3D>
 *
 * // Toggle button
 * <Button3D toggle defaultActive={false} onChange={(active) => console.log(active)}>
 *   Toggle me
 * </Button3D>
 * ```
 */
export type Button3DProps = {
  /**
   * Controls the active/pressed state of the button externally.
   * When provided, the button becomes a controlled component.
   * Use with `onChange` to handle state updates.
   * @default undefined
   */
  active?: boolean;

  /**
   * Content to render after the main children (e.g., an icon on the right side).
   * @example <Button3D after={<ChevronRight />}>Next</Button3D>
   * @default null
   */
  after?: React.ReactNode;

  /**
   * Content to render before the main children (e.g., an icon on the left side).
   * @example <Button3D before={<SearchIcon />}>Search</Button3D>
   * @default null
   */
  before?: React.ReactNode;

  /**
   * When true, uses `justify-content: space-between` for content alignment.
   * Useful when you have both `before` and `after` content.
   * @default false
   */
  between?: boolean;

  /**
   * The main content/label of the button.
   * @example <Button3D>Click me</Button3D>
   */
  children?: React.ReactNode;

  /**
   * Additional CSS class names to apply to the button.
   * Multiple classes can be provided as a space-separated string.
   * @example "my-custom-class another-class"
   * @default null
   */
  className?: string;

  /**
   * Additional HTML attributes to pass to the container element.
   * Useful for adding data attributes, aria attributes, etc.
   * @example { 'data-testid': 'submit-btn', 'aria-label': 'Submit form' }
   * @default {}
   */
  containerProps?: React.HTMLAttributes<HTMLElement>;

  /**
   * CSS Modules object for scoped styling.
   * Pass the imported CSS module to enable class name transformation.
   * @example cssModule={styles}
   * @default null
   */
  cssModule?: Record<string, string>;

  /**
   * Initial active state for uncontrolled toggle buttons.
   * Only used when `toggle` is true and `active` prop is not provided.
   * @default false
   */
  defaultActive?: boolean;

  /**
   * When true, the button is disabled and cannot be interacted with.
   * Applies disabled styling and prevents click events.
   * @default false
   */
  disabled?: boolean;

  /**
   * Custom element type to render the button as.
   * Useful for rendering as a different HTML element or a custom component (e.g., Next.js Link).
   * @example element={Link}
   * @default null (renders as <button> or <a> if href is provided)
   */
  element?: React.ElementType;

  /**
   * Extra content to render inside the button wrapper, outside the main content area.
   * Useful for badges, indicators, or other overlay elements.
   * @default null
   */
  extra?: React.ReactNode;

  /**
   * Makes the button span the full width of its container.
   * @default false
   */
  fullWidth?: boolean;

  /**
   * URL to navigate to. When provided, the button renders as an anchor element.
   * @example href="/dashboard"
   * @default null
   */
  href?: string;

  /**
   * When true, removes horizontal padding and makes the button square.
   * Useful for icon-only buttons.
   * @default false
   */
  iconOnly?: boolean;

  /**
   * When true, shows a loading spinner and disables interaction.
   * The button content is replaced with a spinner or `loadingText` if provided.
   * @default false
   */
  loading?: boolean;

  /**
   * Text to display when the button is in loading state.
   * If not provided, a spinner animation is shown.
   * @example "Saving..."
   * @default undefined
   */
  loadingText?: string;

  /**
   * When true, enables mouse move tracking for enhanced 3D hover effects.
   * The button tilts based on cursor position.
   * @default true
   */
  moveEvents?: boolean;

  /**
   * Callback fired when the toggle state changes.
   * Only called when `toggle` is true.
   * @param active - The new active state
   * @example onChange={(active) => setIsToggled(active)}
   * @default null
   */
  onChange?: (active: boolean) => void;

  /**
   * Callback fired on mouse/touch down events.
   * @param event - The mouse or touch event
   * @default null
   */
  onMouseDown?: (event: React.MouseEvent | React.TouchEvent) => void;

  /**
   * Callback fired on mouse/touch up events.
   * @param event - The mouse or touch event
   * @default null
   */
  onMouseUp?: (event: React.MouseEvent | React.TouchEvent) => void;

  /**
   * Callback fired when the button is clicked/pressed.
   * Similar to onClick but fires at the appropriate time in the animation sequence.
   * @param event - The mouse or touch event
   * @default null
   */
  onPress?: (event: React.MouseEvent | React.TouchEvent) => void;

  /**
   * Callback fired when the button press animation starts (button goes down).
   * @param event - The mouse or touch event
   * @default null
   */
  onPressed?: (event: React.MouseEvent | React.TouchEvent) => void;

  /**
   * Callback fired when the button release animation completes.
   * @param element - The button container element
   * @default null
   */
  onReleased?: (element: HTMLElement) => void;

  /**
   * When true and no children are provided, shows a placeholder animation.
   * Useful for loading states or skeleton screens.
   * @default true
   */
  placeholder?: boolean;

  /**
   * When true, shows a ripple effect animation on click.
   * @default false
   */
  ripple?: boolean;

  /**
   * Root CSS class name prefix for the button.
   * Used for custom theming or when avoiding class name conflicts.
   * @default 'aws-btn'
   */
  rootElement?: string;

  /**
   * Controls the border radius of the button.
   * - `none` - No border radius (0px)
   * - `sm` - Small radius (4px)
   * - `md` - Medium radius (6px) - Default
   * - `lg` - Large radius (12px)
   * - `xl` - Extra large radius (16px)
   * - `full` - Fully rounded (9999px, pill shape)
   * @default 'md'
   */
  rounded?: ButtonRounded;

  /**
   * The size of the button.
   * - `xs` - Extra small (24px height, 10px font)
   * - `sm` - Small (32px height, 12px font)
   * - `md` - Medium (40px height, 14px font) - Default
   * - `lg` - Large (48px height, 16px font)
   * - `xl` - Extra large (56px height, 18px font)
   * - `2xl` - 2X Large (64px height, 20px font)
   *
   * Legacy sizes (`small`, `medium`, `large`) are still supported.
   * @default 'md'
   */
  size?: ButtonSize;

  /**
   * Inline styles to apply to the button element.
   * @example style={{ marginTop: '1rem' }}
   * @default {}
   */
  style?: React.CSSProperties;

  /**
   * When true, the button acts as a toggle switch.
   * Clicking alternates between active and inactive states.
   * Use with `defaultActive` (uncontrolled) or `active` + `onChange` (controlled).
   * @default false
   */
  toggle?: boolean;

  /**
   * The visual style variant of the button.
   * @default 'primary'
   */
  type?: ButtonType;

  /**
   * When true, the button is visible and interactive.
   * When false, the button is hidden with opacity 0.
   * @default true
   */
  visible?: boolean;
};

const Button3D = ({
  active: activeProp,
  after = null,
  before = null,
  between = false,
  children = null,
  className,
  containerProps = {},
  cssModule,
  defaultActive = false,
  disabled = false,
  element,
  extra = null,
  fullWidth = false,
  href,
  iconOnly = false,
  loading = false,
  loadingText,
  moveEvents = true,
  onChange,
  onMouseDown,
  onMouseUp,
  onPress,
  onPressed,
  onReleased,
  placeholder = true,
  ripple = false,
  rootElement = ROOTELM,
  rounded,
  size = 'md',
  style = {},
  toggle = false,
  type = 'primary',
  visible = true,
}: Button3DProps) => {
  // Determine if component is controlled or uncontrolled
  const isControlled = activeProp !== undefined;
  const initialActive = isControlled ? activeProp : defaultActive;

  const [pressPosition, setPressPosition] = React.useState<string | null>(
    toggle && initialActive ? `${rootElement}--active` : null
  );
  const [internalActive, setInternalActive] = React.useState(defaultActive);

  const active = isControlled ? activeProp : internalActive;
  const button = React.useRef<HTMLElement | null>(null);
  const content = React.useRef<HTMLElement | null>(null);
  const container = React.useRef<HTMLElement | null>(null);
  const child = React.useRef<HTMLElement | null>(null);
  const over = React.useRef(false);
  const pressed = React.useRef(toggle && initialActive ? 2 : 0);
  const timer = React.useRef<NodeJS.Timeout | null>(null);
  const touchScreen = React.useRef(0);
  const RenderComponent: React.ElementType =
    element || (href ? Anchor : Button);

  // Button is effectively disabled when loading
  const isEffectivelyDisabled = disabled || loading;

  const extraProps: Record<string, unknown> = {};
  if (href) {
    extraProps.href = href;
  }

  const isDisabled = React.useMemo(() => {
    if (placeholder === true && !children && !loading) {
      return true;
    }
    return isEffectivelyDisabled;
  }, [placeholder, children, isEffectivelyDisabled, loading]);

  // Map legacy size values to new size values
  const normalizedSize = React.useMemo(() => {
    const legacySizeMap: Record<string, ButtonSize> = {
      small: 'sm',
      medium: 'md',
      large: 'lg',
    };
    return legacySizeMap[size as string] || size;
  }, [size]);

  React.useEffect(() => {
    if (button?.current) {
      container.current = button.current.parentNode as HTMLElement;
    }

    return () => {
      if (timer?.current) {
        clearTimeout(timer.current);
      }
    };
  }, []);

  // Initialize pressed state when active changes (for toggle mode with defaultActive)
  React.useEffect(() => {
    if (toggle && active) {
      pressed.current = 2;
      setPressPosition(`${rootElement}--active`);
    } else if (toggle && !active) {
      pressed.current = 0;
      setPressPosition(null);
    }
  }, [active, toggle, rootElement]);

  const getRootClassName = React.useMemo(() => {
    const classList = [
      rootElement,
      type && `${rootElement}--${type}`,
      normalizedSize && `${rootElement}--${normalizedSize}`,
      visible && `${rootElement}--visible`,
      between && `${rootElement}--between`,
      fullWidth && `${rootElement}--full-width`,
      iconOnly && `${rootElement}--icon-only`,
      loading && `${rootElement}--loading`,
      rounded && `${rootElement}--rounded-${rounded}`,
      (placeholder && !children && !loading && `${rootElement}--placeholder`) ||
        null,
    ].filter(Boolean);

    if (isDisabled === true) {
      classList.push(`${rootElement}--disabled`);
    }
    if (pressPosition) {
      classList.push(pressPosition);
    }
    if (className) {
      classList.push(...className.split(' '));
    }
    if (cssModule && cssModule['aws-btn']) {
      const result = classToModules(classList as string[], cssModule);
      return result;
    }

    const result = classList.join(' ').trim().replace(/[\s]+/gi, ' ');

    return result;
  }, [
    rootElement,
    type,
    normalizedSize,
    visible,
    between,
    fullWidth,
    iconOnly,
    loading,
    rounded,
    placeholder,
    children,
    isDisabled,
    pressPosition,
    className,
    cssModule,
  ]);

  const clearPressCallback = React.useCallback(() => {
    if (pressed.current !== 1) {
      pressed.current = 0;
    }
    onReleased && container.current && onReleased(container.current);
  }, [onReleased]);

  const clearPress = React.useCallback(
    ({
      force = false,
      leave = false,
    }: { force?: boolean; leave?: boolean } = {}) => {
      toggleMoveClasses({
        element: container.current,
        root: rootElement,
        cssModule,
      });

      if (leave === true && pressed.current === 0) {
        return;
      }

      let nextPressPosition =
        active && !force ? `${rootElement}--active` : null;

      if (content?.current) {
        setCssEndEvent(content.current, 'transition', {
          tolerance: 1,
        }).then(() => {
          if (nextPressPosition === null && pressPosition?.match(/active/gim)) {
            clearPressCallback();
          }
        });
      }

      setPressPosition(nextPressPosition);
    },
    [active, rootElement, cssModule, pressPosition, clearPressCallback]
  );

  const createRipple = React.useCallback(
    (event: React.MouseEvent | React.TouchEvent) => {
      if (button.current && content.current) {
        createRippleEffect({
          event,
          button: button.current,
          content: content.current,
          className: getClassName(`${rootElement}__bubble`, cssModule),
        });
      }
    },
    [rootElement, cssModule]
  );

  React.useEffect(() => {
    const handleGlobalRelease = (event: MouseEvent) => {
      if (pressed.current === 1 && button.current) {
        const rect = button.current.getBoundingClientRect();
        const isOutside =
          event.clientX < rect.left ||
          event.clientX > rect.right ||
          event.clientY < rect.top ||
          event.clientY > rect.bottom;

        if (isOutside) {
          pressed.current = 0;
          clearPress({ force: true });
        }
      }
    };

    if (IS_WINDOW && !IS_TOUCH) {
      window.addEventListener('mouseup', handleGlobalRelease);
      return () => {
        window.removeEventListener('mouseup', handleGlobalRelease);
      };
    }
  }, [clearPress]);

  const pressIn = React.useCallback(
    (event: React.MouseEvent | React.TouchEvent) => {
      // In toggle mode, allow pressing even if already pressed (pressed.current === 2)
      if (isDisabled === true) {
        return;
      }
      // In non-toggle mode, don't allow pressing if already in active state
      if (!toggle && pressed.current === 2) {
        return;
      }
      pressed.current = 1;
      if (content.current) {
        setCssEndEvent(content.current, 'transition', {
          tolerance: 1,
        }).then(() => {
          onPressed && onPressed(event);
        });
      }
      setPressPosition(`${rootElement}--active`);
    },
    [isDisabled, toggle, rootElement, onPressed]
  );

  const handleAction = React.useCallback(
    (event: React.MouseEvent | React.TouchEvent) => {
      const element = container.current;
      if (!element) {
        return;
      }

      // Handle toggle behavior
      if (toggle) {
        const newActiveState = !active;
        if (!isControlled) {
          setInternalActive(newActiveState);
        }
        onChange && onChange(newActiveState);
      }

      onPress && onPress(event);
    },
    [onPress, toggle, active, isControlled, onChange]
  );

  const pressOut = React.useCallback(
    (event: React.MouseEvent | React.TouchEvent) => {
      const currentPressState = pressed.current;

      if (isDisabled === true || currentPressState !== 1) {
        return;
      }

      if (timer.current) {
        clearTimeout(timer.current);
      }

      if (ripple === true) {
        createRipple(event);
      }

      if (IS_WINDOW && button.current) {
        const eventTrigger = new Event('btn-press');
        button.current.dispatchEvent(eventTrigger);
      }

      handleAction(event);

      // In toggle mode, determine the new active state after the toggle
      if (toggle) {
        const willBeActive = !active;
        if (willBeActive) {
          // Will be active - keep pressed
          pressed.current = 2;
        } else {
          // Will be inactive - force immediate release regardless of hover state
          pressed.current = 0;
          clearPress({ force: true });
        }
        return;
      }

      // Non-toggle mode: standard behavior
      if (active === true) {
        pressed.current = 2;
        return;
      }

      pressed.current = 0;
      clearPress();
    },
    [isDisabled, ripple, active, toggle, createRipple, handleAction, clearPress]
  );

  const getMoveEvents = React.useCallback(() => {
    const events: any = {
      onClick: (event: React.MouseEvent) => {
        if (isDisabled) {
          event.preventDefault();
          event.stopPropagation();
          return;
        }
        if (IS_TOUCH && pressed.current === 0) {
          handleAction(event);
        }
      },
    };

    if (IS_TOUCH) {
      events.onTouchStart = (event: React.TouchEvent) => {
        if (isDisabled) {
          event.preventDefault();
          return;
        }
        onMouseDown && onMouseDown(event);
        touchScreen.current = event?.changedTouches?.[0]?.clientY;
        pressIn(event);
      };
      events.onTouchEnd = (event: React.TouchEvent) => {
        if (isDisabled) {
          event.preventDefault();
          return;
        }
        onMouseUp && onMouseUp(event);
        const diff =
          touchScreen.current && event?.changedTouches?.[0]?.clientY
            ? Math.abs(touchScreen.current - event.changedTouches[0].clientY)
            : 0;
        if (button.current && diff > button.current.offsetHeight * 1.5) {
          clearPress({ force: true });
          return;
        }
        pressOut(event);
      };
      return events;
    }

    events.onMouseLeave = () => {
      over.current = false;

      if (pressed.current === 1) {
        return;
      }

      if (
        pressPosition &&
        pressPosition.match(/active/gim) &&
        pressed.current === 0
      ) {
        clearPress({ force: true });
        return;
      }

      if (active === true && pressed.current !== 2) {
        clearPress({ force: true });
        return;
      }

      clearPress({ leave: true });
    };

    events.onMouseDown = (event: React.MouseEvent) => {
      onMouseDown && onMouseDown(event);
      if (event?.nativeEvent?.button !== 0) {
        return;
      }
      pressIn(event);
    };

    events.onMouseUp = (event: React.MouseEvent) => {
      onMouseUp && onMouseUp(event);
      if (isDisabled === true) {
        event.preventDefault();
        return;
      }
      pressOut(event);
    };

    if (moveEvents === true) {
      events.onMouseMove = (event: React.MouseEvent) => {
        if (isDisabled === true) {
          return;
        }
        over.current = true;
        const buttonElement = button.current;
        if (!buttonElement) return;

        const { left } = buttonElement.getBoundingClientRect();
        const width = buttonElement.offsetWidth;
        const state =
          event.pageX < left + width * 0.3
            ? 'left'
            : event.pageX > left + width * 0.65
            ? 'right'
            : 'middle';

        toggleMoveClasses({
          element: container.current,
          root: rootElement,
          cssModule,
          state,
        });
      };
      return events;
    }

    events.onMouseEnter = () => {
      over.current = true;
      toggleMoveClasses({
        element: container.current,
        root: rootElement,
        cssModule,
        state: 'middle',
      });
    };

    return events;
  }, [
    href,
    isDisabled,
    onMouseDown,
    onMouseUp,
    pressIn,
    pressOut,
    active,
    clearPress,
    moveEvents,
    rootElement,
    cssModule,
    handleAction,
    pressPosition,
  ]);

  // Loading spinner component
  const LoadingSpinner = () => (
    <span className={getClassName(`${rootElement}__spinner`, cssModule)}>
      <svg
        className={getClassName(`${rootElement}__spinner-icon`, cssModule)}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          strokeDasharray="31.4 31.4"
        />
      </svg>
    </span>
  );

  // Determine button content based on loading state
  const buttonContent = loading ? (
    <>
      <LoadingSpinner />
      {loadingText && <span>{loadingText}</span>}
    </>
  ) : (
    <>
      {before}
      <span ref={child}>{children}</span>
      {after}
    </>
  );

  return (
    <RenderComponent
      style={style}
      className={getRootClassName}
      role="button"
      ref={container}
      aria-disabled={isDisabled}
      aria-busy={loading}
      {...containerProps}
      {...extraProps}
      {...getMoveEvents()}
    >
      <span
        ref={button}
        className={getClassName(`${rootElement}__wrapper`, cssModule)}
      >
        <span
          ref={content}
          className={getClassName(`${rootElement}__content`, cssModule)}
        >
          {buttonContent}
        </span>
        {extra}
      </span>
    </RenderComponent>
  );
};

export default Button3D;
export { Button3D };
