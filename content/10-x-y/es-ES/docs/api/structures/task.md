# Objeto Task

* `program` String - Ruta del programa a ejecutar, generalmente debe especificar ` process.execPath ` que abre el programa actual.
* `arguments` String - El argumento de la linea de comandos cuando el `program` es ejecutado.
* `title` String - La cadena que se mostrará en JumpList.
* `description` String - Descripción de la tarea.
* `iconPath` String - El camino absoluto a un ícono a ser mostrado en una JumpList, que puede ser un archivo de recurso arbitrario que contiene un ícono. Usualmente usted puede especificar el `process.execPath` para motrar el ícono del programa.
* `iconIndex` Number - El índice del ícono en el archivo del ícono. Si un archivo de icono consta de dos o más íconos, establezca este valor para identificar el ícono. Si un archivo de icono consta de un ícono, este valor es 0.
* `workingDirectory` String (optional) - The working directory. Default is empty.
