# Objeto ThumbarButton

* `icon`[NativeImage](../native-image.md) - El icono mostrado en miniatura.
* `click` Función
* `tooltip` String (opcional): el texto de la información sobre el botón.
* `flags` String[] (optional) - Control specific states and behaviors of the button. By default, it is `['enabled']`.

Los `flags` es una matriz que puede incluir siguientes `String`s:

* `enabled` - El botón está activo y disponible para el usuario.
* `disabled` - The button is disabled. It is present, but has a visual state indicating it will not respond to user action.
* `dismissonclick` - Cuando se hace clic en el botón, la ventana de miniatura se cierra de inmediato.
* `nobackground` - No dibuja un borde del botón, usa solo la imagen.
* `hidden` - El botón no es mostrado al usuario.
* `noninteractive` - The button is enabled but not interactive; no pressed button state is drawn. This value is intended for instances where the button is used in a notification.
