# Objeto JumpListItem

* `type` String (optional) - One of the following:
  * `tarea` - Una tarea lanzará una aplicación con un argumento específico.
  * `separador` - Puede ser usado para separar items en la categoría estándar `Tarea`.
  * `file` - Un link de un archivo abrirá uno usando la aplicación que creó el salto de lista, para que esto funciona la aplicación debe estar registrada como controlador del tipo de archivo (A pesar de que no tiene que ser el controlador por defecto).
* `ruta` cadena (opcional) - ruta que tiene el archivo para ser abierto, debe ser configurado solo si `tipo` es `archivo`.
* `programa` Cadena (opcional) - ruta del programa para ejecutarse, usualmente usted especificará el `process.execPath` que abrirá el programa en curso. Debe ser configurado solamente si `tipo` es `tarea`.
* ``String (optional)-La linea de comandos dice quando `el programa`es ejecutado. Debe solamente ser puesto si `el tipo`estarea</code>.
* </code>titulo</0>String (optional)-El texto que debe ser mostrado por el elemento en la JumpList. Debe ser instalado solamente si `tipo`es una tarea</code>.
* `description` String (opcional) - Descripción de la task (mostrada en una descripción emergente). Debe ser instalado solamente si `tipo`es una tarea</code>.
* `iconPath` Cadena (opcional) - La ruta total a un ícono a ser mostrado en la lista, que puede ser un archivo arbitrario que contenga un ícono (e.g. `.ico`, `.exe`, `.dll`). Puede especificar `process.execPath` Para mostrar el ícono del programa.
* `iconIndex` Numero (opcional) - El serial del ícono en el archivo de recursos. Si un archivo de recursos contiene múltiples íconos este valor puede ser utilizado para especificar el índice basado en cero que debe ser mostrado en esta tarea. Si un archivo de recurso contiene solamente un ícono, este debe ser puesto en cero.
* `Directoriodetrabajo`String (optional)-El directorio de trabajo. Por defecto está vació.
