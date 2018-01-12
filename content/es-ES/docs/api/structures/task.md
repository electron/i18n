# Objeto Task

* `program` String - Ruta del programa a ejecutar, generalmente debe especificar ` process.execPath ` que abre el programa actual.
* `arguments` String - El argumento de la linea de comandos cuando el `program` es ejecutado.
* `title` String - La cadena que se mostrará en JumpList.
* `description` String - Descripción de la tarea.
* `Ruta de ícono` Cadena - El camino absoluto a un ícono a ser mostrado en una JumpList, que puede ser un archivo de recurso arbitrario que contiene un ícono. Usualmente usted puede especificar el `process.execPath` para motrar el ícono del programa.
* `iconIndex` Number - The icon index in the icon file. If an icon file consists of two or more icons, set this value to identify the icon. If an icon file consists of one icon, this value is 0.