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

export type Button3DProps = {
  active?: boolean;
  after?: React.ReactNode;
  before?: React.ReactNode;
  between?: boolean;
  children?: React.ReactNode;
  className?: string | null;
  containerProps?: React.HTMLAttributes<HTMLElement>;
  cssModule?: Record<string, string> | null;
  defaultActive?: boolean;
  disabled?: boolean;
  element?: React.ElementType | null;
  extra?: React.ReactNode;
  href?: string | null;
  moveEvents?: boolean;
  onChange?: ((active: boolean) => void) | null;
  onMouseDown?: ((event: React.MouseEvent | React.TouchEvent) => void) | null;
  onMouseUp?: ((event: React.MouseEvent | React.TouchEvent) => void) | null;
  onPress?: ((event: React.MouseEvent | React.TouchEvent) => void) | null;
  onPressed?: ((event: React.MouseEvent | React.TouchEvent) => void) | null;
  onReleased?: ((element: HTMLElement) => void) | null;
  placeholder?: boolean;
  ripple?: boolean;
  rootElement?: string;
  size?: 'small' | 'medium' | 'large' | string | null;
  style?: React.CSSProperties;
  toggle?: boolean;
  type?:
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'success'
    | 'error'
    | 'warning'
    | 'info'
    | 'anchor'
    | 'danger';
  visible?: boolean;
};

const Button3D = ({
  active: activeProp,
  after = null,
  before = null,
  between = false,
  children = null,
  className = null,
  containerProps = {},
  cssModule = null,
  defaultActive = false,
  disabled = false,
  element = null,
  extra = null,
  href = null,
  moveEvents = true,
  onChange = null,
  onMouseDown = null,
  onMouseUp = null,
  onPress = null,
  onPressed = null,
  onReleased = null,
  placeholder = true,
  ripple = false,
  rootElement = ROOTELM,
  size = null,
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
  const RenderComponent: any = element || (href ? Anchor : Button);

  const extraProps: any = {};
  if (href) {
    extraProps.href = href;
  }

  const isDisabled = React.useMemo(() => {
    if (placeholder === true && !children) {
      return true;
    }
    return disabled;
  }, [placeholder, children, disabled]);

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
      size && `${rootElement}--${size}`,
      visible && `${rootElement}--visible`,
      between && `${rootElement}--between`,
      (placeholder && !children && `${rootElement}--placeholder`) || null,
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
    size,
    visible,
    between,
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

  return (
    <RenderComponent
      style={style}
      className={getRootClassName}
      role="button"
      ref={container}
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
          {before}
          <span ref={child}>{children}</span>
          {after}
        </span>
        {extra}
      </span>
    </RenderComponent>
  );
};

export default Button3D;
export { Button3D };
