# Objeto ShortcutDetails

* `target` String - El objetivo a lanzar desde este acceso directo.
* `cwd` String (opcional) - El directorio de trabajo. Por defecto es vacío.
* `args` String (opcional) - Los argumentos a ser aplicados al `target` cuando se lanza desde este acceso directo. Por defecto es vacío.
* `description` String (opcional) - La descripción del acceso directo. Por defecto es vacío.
* `icon` String (opcional) - La ruta al icono, pude ser a un DLL o EXE. `icon` y `iconIndex` tienen que ser establecidos juntos. Por defecto es vacío, el cual usa el icono del objetivo.
* `iconIndex` Number (opcional) - El ID de recurso del icono cuando `icon` es un DLL o un EXE. Por defecto es 0.
* `appUserModelId` String (opcional) - El ID del User Model de la aplicación. Por defecto es vacío.
* `toastActivatorClsid` String (optional) - The Application Toast Activator CLSID. Needed for participating in Action Center.
