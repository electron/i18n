# Objeto ThumbarButton

* `icon` [NativeImage](../native-image.md) - El icono mostrado en miniatura.
* `click` Function
* `tooltip` String (opcional): el texto de la información sobre el botón.
* `flags` String[] (opcional) - Controla los estados y comportamientos específicos del botón. Por defecto, es `['enabled']`.

Los `flags` es una matriz que puede incluir siguientes `String`s:

* `enabled` - El botón está activo y disponible para el usuario.
* `disabled` - El botón está deshabilitado. Está presente, pero tiene un estado visual indicando que no responderá a la acción del usuario.
* `dismissonclick` - Cuando se hace clic en el botón, la ventana de miniatura se cierra de inmediato.
* `nobackground` - No dibuja un borde del botón, usa solo la imagen.
* `hidden` - El botón no es mostrado al usuario.
* `noninteractive` - El botón está habilitado pero no es interactivo; no se dibuja el estado del botón pulsado. Este valor está destinado a instancias donde el botón se utiliza en una notificación.
