# Objeto ShortcutDetails

* `target` String - El objetivo a lanzar desde este acceso directo.
* `cwd` Cadena (opcional) - Ruta del directorio de trabajo. Por defecto está vacía.
* `args` Cadena (opcional) - Los argumentos que serán pasados al `target` cuando se envíe desde este acceso directo. Por defecto está vacío.
* `description` Cadena (opcional) - La descripción del acceso directo. Por defecto está vacío.
* `icon` Cadena (opcional) - La ruta al ícono, puede ser un DLL o un EXE. `icon` y `iconIndex` tienen que ser configurados juntos. Está vacío por defecto, el cual usa la trayectoria del ícono.
* `iconIndex` Número (opcional) - El recurso de identificación del ícono cuando `icon` es un DLL o EXE. Es 0 por defecto.
* `appUserModelId` Cadena (opcional) - La identificación modelo de la aplicación del usuario. Vacío por defecto.