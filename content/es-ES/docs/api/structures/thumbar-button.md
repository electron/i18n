# Objeto ThumbarButton

* `icon`[NativeImage](../native-image.md) - El icono mostrado en miniatura.
* `click` Función
* `tooltip` String (opcional): el texto de la información sobre el botón.
* `flags` String[] (opcional) - Controle estados específicos y comportamientos del botón. Por defecto, es `['enabled']`.

Los `flags` es una matriz que puede incluir siguientes `String`s:

* `enabled` - El botón está activo y disponible para el usuario.
* `disabled` - El botón está deshabilitado. Está presente, pero tiene un estado visual que indica que no responderá a la acción del usuario.
* `dismissonclick` - When the button is clicked, the thumbnail window closes immediately.
* `nobackground` - Do not draw a button border, use only the image.
* `hidden` - The button is not shown to the user.
* `noninteractive` - The button is enabled but not interactive; no pressed button state is drawn. This value is intended for instances where the button is used in a notification.