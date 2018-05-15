## Class: TouchBar

> Create TouchBar layouts for native macOS applications

Process: [Main](../tutorial/quick-start.md#main-process)

### `new TouchBar(options)` *Experimental*

* `options` ऑब्जेक्ट 
  * `items` ([TouchBarButton](touch-bar-button.md) | [TouchBarColorPicker](touch-bar-color-picker.md) | [TouchBarGroup](touch-bar-group.md) | [TouchBarLabel](touch-bar-label.md) | [TouchBarPopover](touch-bar-popover.md) | [TouchBarScrubber](touch-bar-scrubber.md) | [TouchBarSegmentedControl](touch-bar-segmented-control.md) | [TouchBarSlider](touch-bar-slider.md) | [TouchBarSpacer](touch-bar-spacer.md))[]
  * `escapeItem` ([TouchBarButton](touch-bar-button.md) | [TouchBarColorPicker](touch-bar-color-picker.md) | [TouchBarGroup](touch-bar-group.md) | [TouchBarLabel](touch-bar-label.md) | [TouchBarPopover](touch-bar-popover.md) | [TouchBarScrubber](touch-bar-scrubber.md) | [TouchBarSegmentedControl](touch-bar-segmented-control.md) | [TouchBarSlider](touch-bar-slider.md) | [TouchBarSpacer](touch-bar-spacer.md) | null) (optional)

Creates a new touch bar with the specified items. Use `BrowserWindow.setTouchBar` to add the `TouchBar` to a window.

**Note:** The TouchBar API is currently experimental and may change or be removed in future Electron releases.

**Tip:** If you don't have a MacBook with Touch Bar, you can use [Touch Bar Simulator](https://github.com/sindresorhus/touch-bar-simulator) to test Touch Bar usage in your app.

### Instance Properties

The following properties are available on instances of `TouchBar`:

#### `touchBar.escapeItem`

A `TouchBarItem` that will replace the "esc" button on the touch bar when set. Setting to `null` restores the default "esc" button. Changing this value immediately updates the escape item in the touch bar.

## Examples

Below is an example of a simple slot machine touch bar game with a button and some labels.

```javascript
const {app, BrowserWindow, TouchBar} = require('electron')

const {TouchBarLabel, TouchBarButton, TouchBarSpacer} = TouchBar

let spinning = false

// Reel labels
const reel1 = new TouchBarLabel()
const reel2 = new TouchBarLabel()
const reel3 = new TouchBarLabel()

// Spin result label
const result = new TouchBarLabel()

// Spin button
const spin = new TouchBarButton({
  label: '
```

### Running the above example

To run the example above, you'll need to (assuming you've got a terminal open in the directory you want to run the example):

1. Save the above file to your computer as `touchbar.js`
2. Install Electron via `npm install electron`
3. Run the example inside Electron: `./node_modules/.bin/electron touchbar.js`

You should then see a new Electron window and the app running in your touch bar (or touch bar emulator).