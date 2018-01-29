# Configuración del servidor de símbolos en el depurador

Los símbolos de depuración le permiten tener mejores sesiones de depuración. Ellos tienen información acerca de las funciones contenidas en ejecutables y bibliotecas dinámicas y le proporciona información para obtener pilas de llamadas limpias. Un servidor de símbolos permite al depurador cargar los símbolos, binarios y fuentes correctas automáticamente sin obligar a los usuarios a descargar grandes archivos de depuración. The server functions like [Microsoft's symbol server](https://support.microsoft.com/kb/311503) so the documentation there can be useful.

Tenga en cuenta que debido a que las compilaciones de Electron liberadas están muy optimizadas, la depuración no siempre es fácil. El depurador no podrá mostrarle el contenido de todas las variables y la ruta de ejecución puede parecer extraña debido a la alineación, las llamadas de cola y otras optimizaciones del compilador. La única solución es compilar una versión local no optimizada.

The official symbol server URL for Electron is https://electron-symbols.githubapp.com. No puede visitar esta URL directamente, debe agregarla a la ruta del símbolo de su herramienta de depuración. In the examples below, a local cache directory is used to avoid repeatedly fetching the PDB from the server. Replace `c:\code\symbols` with an appropriate cache directory on your machine.

## Using the Symbol Server in Windbg

The Windbg symbol path is configured with a string value delimited with asterisk characters. To use only the Electron symbol server, add the following entry to your symbol path (**Note:** you can replace `c:\code\symbols` with any writable directory on your computer, if you'd prefer a different location for downloaded symbols):

```powershell
SRV*c:\code\symbols\*https://electron-symbols.githubapp.com
```

Set this string as `_NT_SYMBOL_PATH` in the environment, using the Windbg menus, or by typing the `.sympath` command. If you would like to get symbols from Microsoft's symbol server as well, you should list that first:

```powershell
SRV*c:\code\symbols\*https://msdl.microsoft.com/download/symbols;SRV*c:\code\symbols\*https://electron-symbols.githubapp.com
```

## Using the symbol server in Visual Studio

<img src='https://mdn.mozillademos.org/files/733/symbol-server-vc8express-menu.jpg' /> <img src='https://mdn.mozillademos.org/files/2497/2005_options.gif' />

## Troubleshooting: Symbols will not load

Type the following commands in Windbg to print why symbols are not loading:

```powershell
> !sym noisy
> .reload /f electron.exe
```