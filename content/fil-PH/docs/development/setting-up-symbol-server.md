# Pagse-set Up Simbolo ng Server sa Debugger

Ang mga simbolo ng debug ay nagpapahintulot sa iyo na magkaroon ng mas mabuti na mga sesyon ng pag-debug. Mayroon silang impormasyon tungkol sa mga function na nakapaloob sa mga executable at dynamic na aklatan at nagbibigay sa iyo ng impormasyon upang makakuha ng malinis na tawag sa stack. Binibigyang-daan ng Server ng Simbolo ang debugger upang i-load ang tamang mga simbolo, mga binary at mapagkukunan nang awtomatiko nang hindi pinipilit ang mga gumagamit na mag-download ng mga malalaking debugging file. Tulad ng mga pag-andar ng server [Microsoft simbolo ng server](https://support.microsoft.com/kb/311503) kaya ang Dokumentasyon doon ay maaaring maging kapaki-pakinabang.

Tandaan na dahil inilabas ang elektron at gumawa ng mabigat na mag-optimista, ang debugging ay hindi laging madali. Ang debugger ay hindi maipapakita sa iyo ang nilalaman ng lahat Ang mga variable at landas ng pagpapatupad ay maaaring mukhang kakaiba dahil sa inlining, buntot tawag, at iba pang mga pag-optimize ng compiler. Ang tanging workaround ay upang bumuo ng isang hindi mag-optimista na lokal na pagtatayo.

Ang opisyal na simbolo ng server URL para sa Elektron ay https://elektron-simbolo.githubapp.com. You cannot visit this URL directly, you must add it to the symbol path of your debugging tool. In the examples below, a local cache directory is used to avoid repeatedly fetching the PDB from the server. Replace `c:\code\symbols` with an appropriate cache directory on your machine.

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