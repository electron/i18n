# Objeto Task

* `program` String - Ruta del programa a ejecutar, generalmente debe especificar `process.execPath` que abre el programa actual.
* `arguments` String - Los argumentos de la línea de comandos cuando `program` es ejecutado.
* `title` String - La cadena que se mostrará en JumpList.
* `description` String - Descripción de la tarea.
* `iconPath` String - El camino absoluto a un ícono a ser mostrado en una JumpList, que puede ser un archivo de recurso arbitrario que contiene un icono. Por lo general puede especificar el `process.execPath` para motrar el icono del programa.
* `iconIndex` Number - El índice del icono en el archivo del iconos. Si un archivo de iconos consta de dos o más iconos, establezca este valor para identificar el icono. Si un archivo de icono consta de un icono, este valor es 0.
* `workingDirectory` String (optional) - El directorio de trabajo. Por defecto es vacío.
