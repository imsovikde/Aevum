# Aevum

A Firefox/Chrome browser extension that transforms every new tab into a contemplative visualization of time — a living grid and precision chronometer reflecting the passage of your life.

## Features

- **Life Grid**: Displays your life as a dynamic grid of dots, where each dot represents a week, month, or year
- **Precision Chronometer**: Shows time remaining (or elapsed age) based on your date of birth and life expectancy
- **Customizable Settings**:
  - Date of birth and life expectancy
  - Dot size and shape (square/circle)
  - Timer font size and styling
  - Timer precision (years to milliseconds)
  - Transparent timer background option
  - Multiple curated themes (Dark, Ivory, Midnight, Cyber, Forest, Sunset, Monochrome)
  - TV-style transition animations when switching themes

## Installation

### Firefox
1. Open `about:debugging#/runtime/this-firefox`
2. Click "Load Temporary Add-on"
3. Select `manifest.json` from this directory

### Chrome
1. Open `chrome://extensions`
2. Enable "Developer mode"
3. Click "Load unpacked"
4. Select this directory

## Build Instructions

### 1. Requirements
- **Operating System**: Windows, macOS, or Linux
- **Environment**: Node.js (v20.0.0 or higher) and npm
- **Dependencies**: `typescript` (installed via package.json)

### 2. Setup
Open a terminal in the project root directory and install dependencies:
```bash
npm install
```

### 3. Build Script
Compile the TypeScript code to JavaScript. This generates `script.js` in the root directory.
```bash
npm run build
```

### 4. Create Package
To create the final zip for upload:
1. Ensure icons are generated (requires `imagemagick` or manual creation, or use provided `icons/` folder).
2. Zip the following files: `manifest.json`, `newtab.html`, `styles.css`, `script.js`, and the `icons/` folder.

```bash
zip -r aevum.zip manifest.json newtab.html styles.css script.js icons/
```