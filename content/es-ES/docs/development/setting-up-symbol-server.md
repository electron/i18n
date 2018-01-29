# Configuración del servidor de símbolos en el depurador

Los símbolos de depuración le permiten tener mejores sesiones de depuración. Ellos tienen información acerca de las funciones contenidas en ejecutables y bibliotecas dinámicas y le proporciona información para obtener pilas de llamadas limpias. Un servidor de símbolos permite al depurador cargar los símbolos, binarios y fuentes correctas automáticamente sin obligar a los usuarios a descargar grandes archivos de depuración. The server functions like [Microsoft's symbol server](https://support.microsoft.com/kb/311503) so the documentation there can be useful.

Tenga en cuenta que debido a que las compilaciones de Electron liberadas están muy optimizadas, la depuración no siempre es fácil. El depurador no podrá mostrarle el contenido de todas las variables y la ruta de ejecución puede parecer extraña debido a la alineación, las llamadas de cola y otras optimizaciones del compilador. La única solución es compilar una versión local no optimizada.

The official symbol server URL for Electron is https://electron-symbols.githubapp.com. No puede visitar esta URL directamente, debe agregarla a la ruta del símbolo de su herramienta de depuración. En los ejemplos a continuación, se usa un directorio de caché local para evitar obtener repetidamente el PDB desde el servidor. Replace `c:\code\symbols` with an appropriate cache directory on your machine.

## Using the Symbol Server in Windbg

La ruta del símbolo de Windbg se configura con un valor de cadena delimitado con caracteres de asterisco. To use only the Electron symbol server, add the following entry to your symbol path (**Note:** you can replace `c:\code\symbols` with any writable directory on your computer, if you'd prefer a different location for downloaded symbols):

```powershell
SRV*c:\code\symbols\*https://electron-symbols.githubapp.com
```

Set this string as `_NT_SYMBOL_PATH` in the environment, using the Windbg menus, or by typing the `.sympath` command. Si también desea obtener símbolos de el servidor de símbolos de Microsoft, debería enumerarlos primero:

```powershell
SRV*c:\code\symbols\*https://msdl.microsoft.com/download/symbols;SRV*c:\code\symbols\*https://electron-symbols.githubapp.com
```

## Usando el servidor de símbolos en Visual Studio

<img src='https://mdn.mozillademos.org/files/733/symbol-server-vc8express-menu.jpg' /> <img src='https://mdn.mozillademos.org/files/2497/2005_options.gif' />

## Solución de problemas: los símbolos no se cargarán

Escriba los siguientes comandos en Windbg para imprimir por qué los símbolos no se están cargando:

```powershell
> !sym noisy
> .reload /f electron.exe
```