## Klase: TouchBarPopover

> Gumawa ng isang popover sa touch bar para sa mga aplikasyon ng katutubong macOS

Proseso: [Pangunahing](../tutorial/application-architecture.md#main-and-renderer-processes)

### `new TouchBarPopover(options)` _Experimental_

* `options` Object
  * `label` Pisi (opsyonal) - Popover na pindutan ng teksto.
  * `icon` [NativeImage](native-image.md) (opsyonal) - Popover button icon.
  * `items` [TouchBar](touch-bar.md) - Items to display in the popover.
  * `showCloseButton` Boolean (optional) - `true` to display a close button on the left of the popover, `false` to not show it. Ng default ay `tama`.

### Katangian ng pagkakataon

Ang sumusunod na mga katangian ay makukuha sa mga kaganapan ng `TouchBarPopover`:

#### `touchBarPopover.label`

A `String` representing the popover's current button text. Changing this value immediately updates the popover in the touch bar.

#### `touchBarPopover.icon`

A `NativeImage` representing the popover's current button icon. Changing this value immediately updates the popover in the touch bar.
