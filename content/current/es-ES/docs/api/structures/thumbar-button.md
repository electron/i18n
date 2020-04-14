# Objeto ThumbarButton

* `icon`[NativeImage](../native-image.md) - El icono mostrado en miniatura.
* `click` Función
* `tooltip` String (opcional): el texto de la información sobre el botón.
* `flags` String[] (opcional) - Controle estados específicos y comportamientos del botón. Por defecto, es `['enabled']`.

Los `flags` es una matriz que puede incluir siguientes `String`s:

* `enabled` - El botón está activo y disponible para el usuario.
* `disabled` - El botón está deshabilitado. Está presente, pero tiene un estado visual que indica que no responderá a la acción del usuario.
* `dismissonclick` - Cuando se hace clic en el botón, la ventana de miniatura se cierra de inmediato.
* `nobackground` - No dibuja un borde del botón, usa solo la imagen.
* `hidden` - El botón no es mostrado al usuario.
* `noninteractive` - El botón está habilitado pero no es interactivo; no se dibuja un estado de botón presionado. Este valor está destinado a instancias donde el botón se usa en una notificación.