## Klase: TouchBarPopover

> Gumawa ng isang popover sa touch bar para sa mga aplikasyon ng katutubong macOS

Proseso: [Pangunahing](../tutorial/application-architecture.md#main-and-renderer-processes)

### `bagong TouchBarPopover(pagpipilian)` _Pangeksperimento_

* `options` Object
  * `label` Pisi (opsyonal) - Popover na pindutan ng teksto.
  * `icon` [NativeImage](native-image.md) (opsyonal) - Popover button icon.
  * `mga aytem` [TouchBar](touch-bar.md) (opsyonal) - Mga item na ipapakita sa popover.
  * `showCloseButton` Boolean (optional) - `true` to display a close button on the left of the popover, `false` to not show it. Ang Default ay `true`.

### Katangian ng pagkakataon

Ang sumusunod na mga katangian ay makukuha sa mga kaganapan ng `TouchBarPopover`:

#### `touchBarPopover.label`

A `String` representing the popover's current button text. Changing this value immediately updates the popover in the touch bar.

#### `touchBarPopover.icon`

A `NativeImage` representing the popover's current button icon. Changing this value immediately updates the popover in the touch bar.
