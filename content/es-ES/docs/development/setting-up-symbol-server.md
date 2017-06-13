# Configuración de servidor de símbolos en el depurador

Símbolos de depuración permitan tener más sesiones de depuración. Tienen información acerca de las funciones contenidas en archivos ejecutables y librerías dinámicas y proporcionar información para obtener pilas de llamadas limpias. Un servidor de símbolos permite al depurador que carga los símbolos correctos, binarios y fuentes automáticamente sin obligar a los usuarios descargar archivos grandes de depuración. Las funciones de servidor como símbolo server</a> deMicrosoft así la documentación que puede ser útil.</p> 

Tenga en cuenta que debido a estructuras electrón lanzados pesadamente se optimizan, depuración no siempre es fácil. El depurador no será capaz de mostrarte el contenido de todas las variables y la ruta de ejecución puede parecer extraña debido a la inclusión, cola de llamadas y otras optimizaciones del compilador. La única solución es construir una estructura local unoptimized.

La URL del servidor símbolo oficial para el electrón es https://electron-symbols.githubapp.com. No se puede visitar este enlace directamente, usted debe añadir a la ruta de símbolo de la herramienta de depuración. En los siguientes ejemplos, un directorio de caché local se utiliza para evitar traer repetidamente el PDB desde el servidor. Reemplace `c:\code\symbols` con un directorio de caché adecuado en su máquina.

## Utilizando el servidor de símbolos en Windbg

La ruta de símbolo de Windbg está configurada con un valor de cadena delimitada por caracteres de asterisco. Para utilizar sólo el servidor de símbolos de electrónica, agregue la siguiente entrada a la ruta de símbolo (**Note:** puede reemplazar `c:\code\symbols` con cualquier directorio escribible en su computadora, si usted prefiere una ubicación diferente para símbolos descargados):

    SRV * c:\code\symbols\* https://electron-symbols.githubapp.com
    

Establecer esta cadena como `_NT_SYMBOL_PATH` en el medio ambiente, utilizando los menús de Windbg, o escribiendo el comando `.sympath`. Si desea obtener símbolos desde el servidor de símbolos de Microsoft, así, debe listar que primero:

    SRV * c:\code\symbols\* http://msdl.microsoft.com/download/symbols; SRV * c:\code\symbols\* https://electron-symbols.githubapp.com
    

## Utilizando el servidor de símbolos de Visual Studio

<img src='https://mdn.mozillademos.org/files/733/symbol-server-vc8express-menu.jpg' /> <img src='https://mdn.mozillademos.org/files/2497/2005_options.gif' />

## Solución de problemas: Símbolos no cargará

Escriba los comandos siguientes en Windbg para imprimir por qué no se carga de símbolos:

    >! sym > ruidosos .reload /f electron.exe