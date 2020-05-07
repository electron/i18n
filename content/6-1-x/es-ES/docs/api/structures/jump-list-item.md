# Objeto JumpListItem

* `type` String (opcional) - Uno de los siguientes:
  * `tarea` - Una tarea lanzará una aplicación con un argumento específico.
  * `separador` - Puede ser usado para separar items en la categoría estándar `Tarea`.
  * `file` - Un link de un archivo abrirá uno usando la aplicación que creó el salto de lista, para que esto funciona la aplicación debe estar registrada como controlador del tipo de archivo (A pesar de que no tiene que ser el controlador por defecto).
* `ruta` cadena (opcional) - ruta que tiene el archivo para ser abierto, debe ser configurado solo si `tipo` es `archivo`.
* `programa` Cadena (opcional) - ruta del programa para ejecutarse, usualmente usted especificará el `process.execPath` que abrirá el programa en curso. Debe ser configurado solamente si `tipo` es `tarea`.
* `args` String (opcional) - Argumentos de linea de comando cuando `program` es ejecutado. Solo debería ser configurado si `type` es `task`.
* `title` String (opcional) - El texto a ser mostrado por el elemento en la Jump List. Sólo se debería establecer si `type` es `task`.
* `description` String (opcional) - Descripción de la task (mostrada en una descripción emergente). Sólo se debería establecerse si `type` es `task`.
* `iconPath` Cadena (opcional) - La ruta total a un ícono a ser mostrado en la lista, que puede ser un archivo arbitrario que contenga un ícono (e.g. `.ico`, `.exe`, `.dll`). Puede especificar `process.execPath` Para mostrar el ícono del programa.
* `iconIndex` Numero (opcional) - El serial del ícono en el archivo de recursos. Si un archivo de recursos contiene múltiples íconos este valor puede ser utilizado para especificar el índice basado en cero que debe ser mostrado en esta tarea. Si un archivo de recurso contiene solamente un ícono, este debe ser puesto en cero.
* `workingDirectory` String (opcional) - El directorio de trabajo. Por defecto está vació.
