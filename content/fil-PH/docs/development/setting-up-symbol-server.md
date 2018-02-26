# Pagtatakda ng Simbolong Server sa Debugger

Debug symbols allow you to have better debugging sessions. Mayroon silang impormasyon tungkol sa mga function na nakapaloob sa mga executable at dynamic na aklatan at nagbibigay sa iyo ng impormasyon upang makakuha ng malinis na tawag sa stack. Binibigyang-daan ng Server ng Simbolo ang debugger upang i-load ang tamang mga simbolo, mga binary at mapagkukunan nang awtomatiko nang hindi pinipilit ang mga gumagamit na mag-download ng mga malalaking debugging file. Tulad ng mga pag-andar ng server [Microsoft simbolo ng server](https://support.microsoft.com/kb/311503) kaya ang Dokumentasyon doon ay maaaring maging kapaki-pakinabang.

Tandaan na dahil inilabas ang elektron at gumawa ng mabigat na mag-optimista, ang debugging ay hindi laging madali. Ang debugger ay hindi maipapakita sa iyo ang nilalaman ng lahat Ang mga variable at landas ng pagpapatupad ay maaaring mukhang kakaiba dahil sa inlining, buntot tawag, at iba pang mga pag-optimize ng compiler. Ang tanging workaround ay upang bumuo ng isang hindi mag-optimista na lokal na pagtatayo.

Ang opisyal na simbolo ng server URL para sa Elektron ay https://elektron-simbolo.githubapp.com. Hindi mo direktang binisita ang URL na ito, dapat mong idagdag ito sa landas ng simbolo na iyong debugging tool. Sa mga halimbawa sa ibaba, ginagamit ang isang lokal na direktoryo ng cache upang maiwasan paulit-ulit na pagkuha ng PDB mula sa server. Palitan ang ` c:\code \ simbolo ` sa isang angkop na direktoryo ng cache sa iyong makina.

## Gamit ang Simbolo ng Server sa Windbg

Ang simbolo ng Windbg ay landas na isinaayos na may string na halaga upang nililimitahan ng asterisk ang mga character. Upang magamit lamang ang server na simbolo ng Electron, idagdag ang sumusunod na entry sa iyong daan na simbolo (**Tandaan:**maaari mong palitan` c:\code\mga simbolo` sa anumang writable direktoryo sa iyong computer, kung gusto mo ng ibang lokasyon para ma-download Ang mga simbolo):

```powershell
SRV*c:\ code\mga simbolo\*https://electron-mga simbolo.githubapp.com
```

Itakda ang string na ito bilang `_NT_SYMBOL_PATH ` sa kapaligiran, gamit ang mga Windbg menu, o sa pamamagitan ng pag-type`sympath` utos. Kung nais mong makakuha ng mga simbolo mula sa Microsoft's simbolo ng server pati na rin, dapat mong ilista ang unang:

```powershell
SRV*c:\code\ mga simbolo\*https://msdl.microsoft.com/download/mga simbolo;SRV* c:\code\mga simbolo\*https://elektron-symbols.githubapp.com
```

## Gamit ang simbolo ng server sa Visual Studio

<img src='https://mdn.mozillademos.org/files/733/symbol-server-vc8express-menu.jpg' /> <img src='https://mdn.mozillademos.org/files/2497/2005_options.gif' />

## Pag-troubleshoot: Ang mga simbolo ay hindi mai-load

I-type ang sumusunod na mga utos sa Windbg upang i-print kung bakit hindi naglo-load ang mga simbolo:

```powershell
> ! sym maingay
> .reload / f elektron.exe
```