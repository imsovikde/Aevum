# Aevum Project Details

## Overview
**Aevum** is a Firefox and Chrome browser extension that replaces the default "New Tab" page with a contemplative, real-time visualization of life's temporal passage. It renders a dynamic grid representing the user's total life expectancy alongside a high-precision chronometer that counts down remaining time (or counts up elapsed age).

## Core Features
1. **Life Grid**: 
   - A visual grid of dots where each dot represents a specific temporal unit of life (weeks, months, or years).
   - Past units are colored/faded according to elapsed time.
   - The current unit features a pulsing animation and a progressive "fill" state based on the current progress through that unit.
   - Future units are represented as empty/untouched boxes.

2. **Precision Chronometer**:
   - A real-time timer positioned over the grid displaying time remaining (or age) in Years, Months, Days, Hours, Minutes, Seconds, and Milliseconds.

3. **Highly Customizable Settings**:
   - **Date of Birth**: Sets the origin point (YYYY-MM-DD).
   - **Life Expectancy**: Target lifespan in years (default: 80).
   - **Granularity Threshold**: Adjusts the scale/size of the grid dots.
   - **Scale Factor**: Adjusts the font size of the central timer.
   - **Atmospheric Overlay**: Toggles the background blur/opacity of the timer container.
   - **Stark Typography**: Toggles bold formatting for the timer text.
   - **Inverse Chronology (Age)**: Toggles between a countdown to death or a count-up of the user's current age.
   - **Sub-Day Precision**: Allows the user to hide smaller time units (can stop at Hours, Minutes, Seconds, or Milliseconds).
   - **Structure Flow (Shape)**: Changes the grid units between rigid (Squares) and organic (Circles).
   - **Temporal Node (Unit Precision)**: Determines what each dot on the grid represents (Weeks, Months, or Years).
   - **Atmosphere (Theme)**: Multiple color schemes including Dark (default), Ivory, Midnight, Cyber, Forest, Sunset, and Monochrome. Includes a TV-style transition animation when switching themes.

## Architecture and Codebase
The project is built with vanilla web technologies, avoiding heavy frameworks to ensure maximum performance and minimal overhead.

### File Structure
- **`manifest.json`**: Manifest V3 configuration file for browser extensions. Sets `newtab.html` as the override for the browser's new tab page. Includes permissions for local `storage`.
- **`newtab.html`**: The main HTML document. It contains:
  - The `#grid-container` for the visual life grid.
  - The `#overlay-container` and `#timer-display` for the chronometer.
  - The `#settings-panel` which holds all the user configuration inputs.
- **`styles.css`**: Contains all styling, CSS variables for theming, and CSS animations. Key features include:
  - CSS custom properties (`:root`) for easy theme switching.
  - `@keyframes pulse-border` for the current life unit's glow effect.
  - TV-turn-on/off style animations for theme transitions.
- **`src/script.ts`** (Compiles to `script.js`): The core logic of the application, written in TypeScript. Key responsibilities include:
  - **State Management**: Handling `Settings` interfaces and defaults, reading from and writing to browser local storage (`chrome.storage.local` or `browser.storage.local`).
  - **Grid Mathematics**: Calculating grid dimensions, aspect ratios, and the exact number of past/current/future units based on the user's date of birth and selected temporal node.
  - **Realtime Engine**: Utilizing `requestAnimationFrame` for a highly performant, buttery-smooth loop that updates the timer and the current unit's fill progress.
  - **UI Binding**: Syncing the internal state with the DOM inputs and listening for user changes.

## Build and Deployment
- **Dependencies**: Node.js, npm, and `typescript`.
- **Build Command**: Running `npm run build` (or `npx tsc` directly) compiles the `src/script.ts` file into the root `script.js` file.
- **Packaging**: The extension is packaged by zipping `manifest.json`, `newtab.html`, `styles.css`, `script.js`, and the `icons/` directory.
- **Installation**: Can be loaded as an unpacked extension in Chrome (`chrome://extensions`) or a temporary add-on in Firefox (`about:debugging`).

## Mathematics and Logic Highlights
- The grid rendering logic dynamically calculates the optimal number of columns and rows to perfectly fit the screen's aspect ratio without stretching the dots.
- Date calculations (leap years, varying days in months) are handled natively via JavaScript's `Date` object to ensure the timer and grid remain completely accurate over decades.
- The `current-unit` uses a CSS `linear-gradient` trick where the `--fill-progress` custom property is updated every frame by the JS engine to visually fill up the box as time passes in the current week/month/year.

## Philosophy and Psychology
The core philosophy of **Aevum** revolves around the psychological concept of *memento mori* (remember that you must die). By translating the abstract concept of an entire human lifespan into a visceral, instantly comprehensible visual grid, the project serves as a profound motivational tool. 

Rather than inducing paralysis or dread, Aevum leverages behavioral psychology to trigger "time scarcity"—a cognitive state that sharpens focus, strips away trivial distractions, and compels the user to act meaningfully in the present. Watching the precise, relentless progression of the millisecond chronometer alongside the steady consumption of life's "blocks" creates a powerful feedback loop. This UI explicitly targets the user's intrinsic drive, converting the passive browsing experience into an active, constant reminder of life's finite nature, ultimately cultivating deep focus, intention, and an "addictive" drive toward personal fulfillment and productivity.
