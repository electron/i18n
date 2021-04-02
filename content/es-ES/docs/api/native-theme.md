# nativeTheme

> Lee y respondo a los cambios en el tema de color nativo de Chromium.

Proceso: [Main](../glossary.md#main-process)

## Eventos

El módulo nativo `nativeTheme` emite los siguientes eventos:

### Evento: "updated"

Emitido cuando algo en el NativeTheme subyacente ha cambiado. Esto normalmente significa que le valor de `shouldUseDarkColors`, `shouldUseHighContrastColors` o `shouldUseInvertedColorScheme` ha cambiado. Tendrás que comprobarlos para determinar cual ha cambiado.

## Propiedades

El módulo `nativeTheme` tiene las siguientes propiedades:

### `nativeTheme.shouldUseDarkColors` _SoloLectura_

Un `Boolean` para si el OS / Chromium actualmente tiene un modo oscuro activado o está siendo instruido para mostrar una UI de estilo oscuro.  Si quieres modificar este valor debes utilizar `themeSource` acontinuación.

### `nativeTheme.themeSource`

Una propiedad `String` que puede ser `system`, `light` o `dark`.  Se usa para reemplazar y sustituir el valor que Chromium eligió usar internamente.

Estableciendo esta propiedad a `system` eliminará la sobreescritura y todo será restablecido a los valores predeterminados del sistema operativo.  Por defecto `themeSource` es `system`.

Estableciendo esta propiedad a `dark` tendrá los siguientes efectos:

* `nativeTheme.shouldUseDarkColors` será `true` cuando se accede
* Cualquier IU de electrones se renderiza en Linux y Windows, incluidos los menús contextuales, DevTools, etc., usarán la interfaz de usuario oscura.
* Cualquier interfaz de usuario que el sistema operativo represente en macOS, incluidos los menús, los marcos de ventana, etc., usará la interfaz de usuario oscura.
* La consulta CSS [`prefers-color-scheme`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme) coincidirá con el modo `dark`.
* El evento `updated` será emitido

Estableciendo esta propiedad a `light` tendrá los siguientes efectos:

* `nativeTheme.shouldUseDarkColors` será `false` cuando se acceda
* Cualquier IU de electrones se renderiza en Linux y Windows, incluidos los menús contextuales, DevTools, etc., usarán la interfaz de usuario de luz.
* Cualquier interfaz de usuario que el sistema operativo represente en macOS, incluidos los menús, los marcos de ventana, etc., usará la interfaz de usuario de luz.
* La consulta CSS [`prefers-color-scheme`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme) coincidirá con el modo `light`.
* El evento `updated` será emitido

El uso de esta propiedad debe alinearse con una máquina de estado clásica de "modo oscuro" en su aplicación, donde el usuario tiene tres opciones.

* `Follow OS` --> `themeSource = 'system'`
* `Dark Mode` --> `themeSource = 'dark'`
* `Light Mode` --> `themeSource = 'light'`

Su aplicación debe usar siempre `shouldUseDarkColors` para determinar que CSS aplicar.

### `nativeTheme.shouldUseHighContrastColors` _macOS_ _Windows_ _SoloLectura_

Una `Boolean` para si el sistema operativo/cromo actualmente tiene habilitado el modo de alto contraste o se le indica que muestre una interfaz de usuario de alto contraste.

### `nativeTheme.shouldUseInvertedColorScheme` _macOS_ _Windows_ _SoloLectura_

Una `Boolean` para si el sistema operativo/cromo actualmente tiene un esquema de color invertido o se le indica que use un esquema de color invertido.
