# Pagtatakda ng Simbolong Server sa Debugger

Ang mga debug na simbolo ay nagpapahintulot sa iyo na magkaroon ng mas mabuting mga sesyon ng pag-debug. Mayroon silang impormasyon tungkol sa mga function na nakapaloob sa mga mapapagana at dinamikong mga library at nagbibigay sa iyo ng impormasyon upang makakuha ng malinis na mga stack pantawag. Binibigyang-daan ng Simbolong Server ang debugger upang i-load ang tamang mga simbolo, mga binary at mapagkukunan nang awtomatiko nang hindi pinipilit ang mga gumagamit na mag-download ng mga malalaking debugging file. Gumagana ang server katulad sa [simbolong server ng Microsoft](https://support.microsoft.com/kb/311503) kaya ang dokumentasyon doon ay maaaring maging kapaki-pakinabang.

Tandaan na dahil ang inilathalang mga build ng Electron ay lubos na na-optimize, ang debugging ay hindi palaging madali. Ang debugger ay hindi kayang ipapakita sa iyo ang nilalaman ng lahat ng mga variable at landas ng pagpapatupad ay maaaring mukhang kakaiba dahil sa inlining, hulihang tawag, at iba pang mga pag-optimize ng compiler. Ang tanging workaround ay upang bumuo ng isang hindi na-optimize na lokal na build.

Ang opisyal na simbolong server na URL para sa Electron ay https://electron-symbols.githubapp.com. Hindi mo direktang mabisita ang URL na ito, dapat mong idagdag ito sa landas ng simbolo ng iyong kagamitan sa pag-debug. Sa mga halimbawa sa ibaba, ginagamit ang isang lokal na direktoryo ng cache upang maiwasan ang paulit-ulit na pagkuha ng PDB mula sa server. Palitan ang ` c:\code\symbols` ng isang angkop na direktoryo ng cache sa iyong makina.

## Pagamit ng Simbolong Server sa Windbg

Ang simbolong landas ng Windbg ay na-configure gamit ang halaga ng string na nalimitahan ng mga asterisk na karakter. Upang magamit lamang ang simbolong server ng Electron, idagdag ang sumusunod na entry sa iyong simbolong landas (**Tandaan:**maaari mong palitan` c:\code\symbols` sa anumang masusulatang direktoryo sa iyong kompyuter, kung gusto mo ng ibang lokasyon para na-download na mga simbolo):

```powershell
SRV*c:\code\symbols\*https://electron-symbols.githubapp.com
```

Itakda ang string na ito bilang `_NT_SYMBOL_PATH ` sa kapaligiran, gamit ang mga Windbg na menu, o sa pamamagitan ng pag-type ng `sympath` na utos. Kung nais mong makakuha ng mga simbolo mula sa simbolong server ng Microsoft, dapat mong ilista muna ito:

```powershell
SRV*c:\code\symbols\*https://msdl.microsoft.com/download/symbols;SRV*c:\code\symbols\*https://electron-symbols.githubapp.com
```

## Paggamit ng simbolong server sa Visual Studio

<img src='https://mdn.mozillademos.org/files/733/symbol-server-vc8express-menu.jpg' />
<img src='https://mdn.mozillademos.org/files/2497/2005_options.gif' />

## Pag-troubleshoot: Ang mga simbolo ay hindi mai-load

I-type ang sumusunod na mga utos sa Windbg upang i-print kung bakit hindi naglo-load ang mga simbolo:

```powershell
> !sym noisy
> .reload /f electron.exe
```
