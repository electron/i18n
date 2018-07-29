# Objeto ShortcutDetails

* `target` String - El objetivo a lanzar desde este acceso directo.
* `cwd` Cadena (opcional) - Ruta del directorio de trabajo. Por defecto está vacía.
* `args` Cadena (opcional) - Los argumentos que serán pasados al `target` cuando se envíe desde este acceso directo. Por defecto está vacío.
* `description` Cadena (opcional) - La descripción del acceso directo. Por defecto está vacío.
* `icon` Cadena (opcional) - La ruta del icono, puede ser un archivo con extensión DLL o EXE. `icon` y `iconIndex` tienen que ser configurados juntos. Por defecto está vacío y utiliza el icono del target.
* `iconIndex` Número (opcional) - El índice ID del icono cuando `icon` proviene de un archivo DLL o EXE. Por defecto es 0.
* `appUserModelId` Cadena (opcional) - La identificación modelo de la aplicación del usuario. Por defecto está vacia.