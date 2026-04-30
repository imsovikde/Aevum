---
colors:
  primary:
    900: "#070707"
    800: "#0a0a0a"
    700: "#0c0c0c"
    600: "#1a1a1a"
    500: "#888888"
    400: "#e0e0e0"
    300: "#ededed"
    200: "#ffffff"
  background: "#070707"
  surface: "rgba(12, 12, 12, 0.7)"
  surface-hover: "rgba(255, 255, 255, 0.04)"
  text:
    primary: "#ededed"
    secondary: "#888888"
    inverse: "#070707"
  border: "rgba(255, 255, 255, 0.08)"
  accent:
    base: "#e0e0e0"
    hover: "#ffffff"
  status:
    future: "#1a1a1a"
    past: "#ffffff"
    pulse: "rgba(255, 255, 255, 0.8)"
    pulse-glow: "rgba(255, 255, 255, 0.25)"
typography:
  font-family:
    base: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
  font-size:
    xs: "0.65rem"
    sm: "0.85rem"
    md: "0.95rem"
    lg: "1.1rem"
    timer: "6rem"
  font-weight:
    light: 300
    regular: 400
    medium: 500
    semibold: 600
  letter-spacing:
    tight: "-0.05em"
    normal: "0em"
    wide: "0.15em"
    widest: "0.2em"
spacing:
  1: "4px"
  2: "8px"
  3: "12px"
  4: "16px"
  5: "20px"
  6: "24px"
  8: "32px"
  10: "40px"
  12: "48px"
  timer-gap: "2.5rem"
  panel-padding: "3rem 4.5rem"
elevation:
  shadow-sm: "0 2px 5px rgba(0,0,0,0.2)"
  shadow-md: "0 2px 8px rgba(0,0,0,0.8)"
  shadow-lg: "0 30px 60px rgba(0,0,0,0.8)"
  shadow-xl: "0 40px 100px rgba(0,0,0,0.8)"
  glow-soft: "0 0 10px rgba(255, 255, 255, 0.25)"
  glow-strong: "0 0 20px rgba(255, 255, 255, 0.4)"
radii:
  sm: "2px"
  md: "4px"
  lg: "8px"
  xl: "11px"
  2xl: "24px"
  full: "50%"
motion:
  easing:
    base: "ease"
    smooth: "cubic-bezier(0.16, 1, 0.3, 1)"
    snappy: "cubic-bezier(0.86, 0, 0.07, 1)"
  duration:
    fast: "0.2s"
    normal: "0.3s"
    slow: "0.4s"
    very-slow: "0.5s"
    epic: "0.8s"
---

# Aevum Design System

## The Psychology of Aevum
Aevum is a visceral confrontation with mortality. It is not merely a counter; it is a psychological mirror reflecting the finite nature of existence. The design must invoke a sense of profound urgency, deep reflection, and ultimately, an addiction to maximizing one's remaining time. 

By utilizing the void-like darkness as our canvas, we strip away the noise of everyday life. The stark contrast of the glowing, living moments against the dark expanse of unlived and spent time creates a subconscious tension—a constant, quiet reminder that the clock is ticking.

## Visual Identity & Aesthetics

### The Void (Background)
The deepest black (`#070707`) acts as the boundless void of time. It is not flat; it is the enveloping expanse within which a life is framed. It demands focus. By reducing visual clutter to zero, the user's attention is forcefully drawn to the only thing that matters: their time.

### The Spark of Life (Contrast)
White (`#ffffff`) and off-white tones represent the sharp, undeniable reality of the present moment and the illuminated past. The stark contrast between the darkness and the stark white creates a psychological "anchor," compelling the user's eyes—and thoughts—to dwell on the progress of their life. 

### Typography: Clinical Yet Poignant
The typography relies on Inter, a clean, highly legible neo-grotesque font. The massive, tabular numbers of the timer (6rem, tight tracking) weigh heavily on the screen. They are unfeeling, relentless, and precise. The labels, spread out with wide tracking, whisper beneath the heavy numbers, offering a subtle, almost ethereal context.

### Motion and Interaction: The Pulse of Existence
Interactions in Aevum are not just functional; they represent the heartbeat of the user. 
- **The Pulse:** The current time unit breathes with a rhythmic, continuous pulse—a physical manifestation of the present moment slipping away. It uses a custom cubic-bezier curve to mimic the organic expansion and contraction of a heartbeat.
- **Glassmorphism:** Overlays and panels use deep background blurring. This creates depth without solid walls, suggesting that while the settings or current views are in focus, the vast, blurred reality of the grid remains ever-present behind it.
- **Fluidity:** Transitions are smooth but deliberate (`cubic-bezier(0.16, 1, 0.3, 1)`), reflecting the continuous, unstoppable flow of time.

## Design Intent

### 1. The Grid of Life
The grid visualization is the core of Aevum. Each cell represents a unit of time.
- **Future (Unlived):** Dark gray (`#1a1a1a`). It's there, but it's dim, uncertain, and unearned.
- **Past (Lived):** Stark white (`#ffffff`). It is set in stone, illuminated, and cannot be changed.
- **Present (Living):** The current cell is actively animated. It pulses and glows, visually demanding action and awareness. It bridges the dark future and the bright past.

### 2. Deep Immersion
We use a subtle noise overlay (grain) at `3%` opacity. This microscopic imperfection breaks the digital perfection of the screen, making the experience feel raw, cinematic, and slightly analog—like film grain on a documentary of the user's own life.

### 3. Addiction Through Accountability
Aevum is designed to be addictive not through dopamine-driven infinite scrolling, but through **existential accountability**. The sheer weight of seeing one's life visually quantified—and animated in real-time—creates a powerful psychological hook. The user returns to Aevum not for entertainment, but for grounding. It is their reality check.

### 4. Elegance in the Abyss
Despite its heavy subject matter, the design remains premium and sophisticated. The use of strict padding (`3rem 4.5rem`), delicate borders (`rgba(255, 255, 255, 0.08)`), and deep shadows (`0 30px 60px rgba(0, 0, 0, 0.8)`) ensures that Aevum feels like a high-end artifact, a luxury timepiece for the soul.
