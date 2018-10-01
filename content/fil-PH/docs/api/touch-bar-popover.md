## Klase: TouchBarPopover

> Gumawa ng isang popover sa touch bar para sa mga aplikasyon ng katutubong macOS

Process: [Main](../tutorial/application-architecture.md#main-and-renderer-processes)

### `bagong TouchBarPopover(pagpipilian)` *Pangeksperimento*

* `options` Bagay 
  * `label` Pisi (opsyonal) - Popover na pindutan ng teksto.
  * `icon` [NativeImage](native-image.md) (opsyonal) - Popover button icon.
  * `mga aytem` [TouchBar](touch-bar.md) (opsyonal) - Mga item na ipapakita sa popover.
  * `showCloseButton` Boolean (opsyonal) - `tunay` magdispley ng isang pindutan para pindutan na pangsara malapit sa kaliwa ng popover, `mali` upang hindi ito ipakita. Default ay `Totoo`.

### Katangian ng pagkakataon

Ang sumusunod na mga katangian ay makukuha sa mga kaganapan ng `TouchBarPopover`:

#### `touchBarPopover.label`

Isang `String` kumakatawan sa popover ng kasalukuyang pindutan ng salita. Kung babaguhin ang halaga nito ay agad mauupdate ang label na nasa touch bar.

#### `touchBarPopover.icon`

Isang `NativeImage` kumakatawan sa popover ng kasalukuyang pindutan na icon. Kung babaguhin ang halaga nito ay agad mauupdate ang label na nasa touch bar.