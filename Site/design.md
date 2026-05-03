# Visual Design Tokens

## Color Palette
- **Void (Background):** `#070707`
- **Surface Base:** `rgba(12, 12, 12, 0.7)`
- **Surface Hover:** `rgba(255, 255, 255, 0.04)`
- **Border Base:** `rgba(255, 255, 255, 0.08)`
- **Text Primary:** `#ededed`
- **Text Secondary:** `#888888`
- **Text Inverse:** `#070707`
- **Accent Base:** `#e0e0e0`
- **Accent Bright:** `#ffffff`
- **Unit Future:** `#1a1a1a`
- **Unit Past:** `#ffffff`
- **Pulse Base:** `rgba(255, 255, 255, 0.8)`
- **Pulse Glow:** `rgba(255, 255, 255, 0.25)`

## Shadow & Glow Tokens
- **Glow Soft:** `0 0 10px rgba(255, 255, 255, 0.25)`
- **Glow Strong:** `0 0 20px rgba(255, 255, 255, 0.4)`
- **Shadow Large:** `0 30px 60px rgba(0, 0, 0, 0.8)`
- **Shadow Extra Large:** `0 40px 100px rgba(0, 0, 0, 0.8)`

## Easing Functions
- **Smooth Easing:** `cubic-bezier(0.16, 1, 0.3, 1)`
- **Snappy Easing:** `cubic-bezier(0.86, 0, 0.07, 1)`

# Typography Rules

- **Typeface:** `Inter`, with fallbacks to `-apple-system`, `BlinkMacSystemFont`, `sans-serif`.
- **Font Weights:** `300` (Light), `400` (Regular), `500` (Medium), `600` (Semi-bold).
- **Anti-Aliasing:** Enforced globally via `-webkit-font-smoothing: antialiased` and `-moz-osx-font-smoothing: grayscale`.
- **Numerals:** Tabular lining enforced on numeric data using `font-variant-numeric: tabular-nums` and `font-feature-settings: "tnum"`.
- **Tracking (Letter Spacing):** Extensive use of tracking adjustments. Small uppercase elements utilize tracking between `0.08em` and `0.25em`. Large display typography utilizes negative tracking up to `-0.05em`.

# Visual Style Rules

- **Base Radius:** Primary interactive elements utilize tight border radii of `2px` or `4px`. Secondary large containers utilize `8px`.
- **Glassmorphism:** Achieved via `rgba()` surface colors paired with backdrop filters: `blur(24px) saturate(150%)`.
- **Global Texture:** A persistent, non-interactive overlay utilizing an SVG `<feTurbulence>` fractal noise filter (`baseFrequency: 0.9`, `numOctaves: 4`, `stitchTiles: stitch`). The overlay is applied at `0.03` opacity with a background size of `200px 200px` and pointer events disabled.
- **Global Cursor:** System cursor overridden entirely to `crosshair`.

# Animations & Interactions

## Keyframe Sequences

### `fadeUp`
Cascading entrance animation applied to text and container elements.
- **0%:** `opacity: 0`, `transform: translateY(16px)`
- **100%:** `opacity: 1`, `transform: translateY(0)`
- **Parameters:** Execution duration of `0.6s` utilizing the Smooth Easing function. Elements are triggered sequentially using staggered delays (`0.2s`, `0.4s`, `0.8s`, `1.0s`, `1.2s`).

### `scrollDown`
Vertical looping motion applied to a standard `2px` by `8px` indicator dot.
- **0%:** `top: -8px`, `opacity: 1`
- **80%:** `top: 40px`, `opacity: 0`
- **100%:** `top: -8px`, `opacity: 0`
- **Parameters:** Execution duration of `1.6s` utilizing `ease-in-out` easing. Infinitely looping.

### `livePulse`
Radial emission effect applied to a `6px` circular active indicator.
- **0%, 100%:** `opacity: 0.6`, `box-shadow: 0 0 6px rgba(34, 197, 94, 0.4), 0 0 14px rgba(34, 197, 94, 0.2)`
- **50%:** `opacity: 1`, `box-shadow: 0 0 12px rgba(34, 197, 94, 0.8), 0 0 28px rgba(34, 197, 94, 0.4)`
- **Parameters:** Execution duration of `2s` utilizing `ease-in-out` easing. Infinitely looping.

### `pulse-current`
Expansion and illumination effect applied to active timeline dots.
- **0%, 100%:** `transform: scale(1)`, `box-shadow: 0 0 8px rgba(255, 255, 255, 0.3), 0 0 16px rgba(255, 255, 255, 0.1)`
- **50%:** `transform: scale(1.3)`, `box-shadow: 0 0 16px rgba(255, 255, 255, 0.6), 0 0 32px rgba(255, 255, 255, 0.3)`
- **Parameters:** Execution duration of `2.5s` utilizing Smooth Easing. Infinitely looping.

### `cursorBlink`
Standard binary opacity toggle.
- **0%, 49%:** `opacity: 1`
- **50%, 100%:** `opacity: 0`

## Interaction States

### Primary Action Triggers
- **Base State:** Background color Accent Base (`#e0e0e0`), text color Text Inverse (`#070707`).
- **Hover State:** Background shifts to Accent Bright (`#ffffff`), translates Y axis by `-1px`, emits a shadow of `0 0 30px rgba(255, 255, 255, 0.25)`.
- **Active State:** Translates Y axis back to `0`. Transition duration resets to `0.08s`.
- **Transition Rule:** Applies Smooth Easing over `0.2s` for all properties except active state override.

### Secondary Action Triggers
- **Base State:** Transparent background, `1px` border at `rgba(255, 255, 255, 0.12)`, text color Text Secondary (`#888888`).
- **Hover State:** Border shifts to `rgba(255, 255, 255, 0.3)`, text shifts to Text Primary (`#ededed`), box shadow expands to `0 0 10px rgba(255, 255, 255, 0.08)` (for support buttons).
- **Transition Rule:** Linear ease over `0.2s`.

### Container Cards
- **Base State:** Background Surface Base, border at `rgba(255, 255, 255, 0.07)`, incorporates a static inner radial gradient (`rgba(255, 255, 255, 0.03)` at `0%` fading to `transparent` at `60%`) anchored to top-left.
- **Hover State:** Translates Y axis by `-2px` using Smooth Easing over `0.2s`. Border color shifts to `rgba(255, 255, 255, 0.15)` using linear ease over `0.2s`.

### Timeline Links
- **Base State:** Underlined via an `::after` pseudo-element with `width: 0`, `height: 1px`, and background of Text Primary.
- **Hover State:** Text shifts to Text Primary. Pseudo-element line expands to `width: 100%` originating from left-to-right.
- **Transition Rule:** Color transition linear over `0.3s`. Line width expansion linear over `0.2s`.

### Navigation Pill
- **Dynamic Transforms:** Width, `border-radius`, and background color utilize Smooth Easing over `0.6s`.
- **Secondary Transforms:** Height, `border-color`, box-shadow, padding, top offset, and backdrop filter utilize Smooth Easing over `0.5s` and `0.6s`.
- **Performance Strategy:** Transforms strictly enforced using `will-change: width, border-radius, background`.

### Unit Grid
- **Hover State:** Translates scale by `1.08`. Z-index forcibly promoted to `2`.
- **Transition Rule:** Scale and box-shadow shift utilizing Smooth Easing over `0.15s`.
- **Performance Strategy:** Strict hardware acceleration enforced via `will-change: transform`.

## Multi-Stage State Sequences

### Breathing Cadence
A multi-stage, continuous state machine applied to a circular element.
1. **Inhale Phase:** Element scales from `1.0` to `1.5`. Border color shifts to `rgba(255, 255, 255, 0.35)`. Background shifts to `rgba(255, 255, 255, 0.05)`. Emits shadow of `0 0 40px rgba(255, 255, 255, 0.08)`. Triggers via Smooth Easing executing over exactly `4s`.
2. **Hold Phase:** Element maintains scale at `1.5`. Border color dims to `rgba(255, 255, 255, 0.25)`. Transitions linearly over `0.3s`.
3. **Exhale Phase:** Element scale collapses back to `1.0`. Border color shifts to `rgba(255, 255, 255, 0.12)`. Background dims to `rgba(255, 255, 255, 0.02)`. Triggers via Smooth Easing executing over exactly `8s`.
