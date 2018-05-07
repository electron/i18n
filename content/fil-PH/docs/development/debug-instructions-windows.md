# Paghanap at Pag-aayos ng Problema sa Windows (Debugging)

Kung ikaw ay nakararanas ng mga pag-crash o may nagaganap na di tama sa Electron at naniniwala ka na ito'y hindi sanhi ng iyong JavaScript na aplikasyon, sa halip ang problema ay nasa Electron mismo, ang pagde-debug ay posibleng maging medyo nakakalito, lalo na sa mga tagabuo na hindi gumagamit ng native/C++ na pagde-debug. However, using Visual Studio, GitHub's hosted Electron Symbol Server, and the Electron source code, you can enable step-through debugging with breakpoints inside Electron's source code.

## Mga Kinakailangan

* **Ang debug na gawa ng Electron**: Kadalasan, ang pinakamadaling paraan ay buuin ito mag-isa sa pamamagitan ng mga gamit at mga pangunahing kailangan na nasa [build instructions para sa Windows](build-instructions-windows.md). While you can attach to and debug Electron as you can download it directly, you will find that it is heavily optimized, making debugging substantially more difficult: The debugger will not be able to show you the content of all variables and the execution path can seem strange because of inlining, tail calls, and other compiler optimizations.

* **Ang Visual Studio gamit ang C++ Tools**: Ang free community editions ng Visual Studio 2013 at Visual studio 2015 ay parehong gumagana. Kapag in-install ang [configure Visual Studio to use GitHub's Electron Symbol server](setting-up-symbol-server.md). Ito ay hahayaang gumana ang Visual studio upang maunawaang mabuti kung ano ang nangyayari sa loob ng Electron at mas mapapadali nito ang pagpapakita ng mga variable sa paraan na mas mauunawaan ng mga tao.

* **ProcMon**: Ang [free SysInternals tool](https://technet.microsoft.com/en-us/sysinternals/processmonitor.aspx) ay hinayaan na siyasatin ang processes parameters, file handles at registry operations.

## Pagkakabit at Pagde-debug sa Electron

Sa pagsisimula ng debugging session, buksan ang PowerShell/CMD at paganahin ang debug na gawa ng Electron gamit ang application upang magbukas ito bilang parameter.

```powershell
$ ./out/D/electron.exe ~/my-electron-app/
```

### Pagtatakda ng mga Breakpoint

Buksan ang Visual Studio. Ang Electron ay di gawa gamit ang Visual Studio kung kaya naman ito ay di naglalaman ng project file - ganoon pa man, ikaw ay maaaring magbukas ng source code files bilang "As File", ibig sabihin ang Visual Studio ay magbubukas lamang gamit ang kanyang sarili. Maaari ka pa ring magtakda ng mga breakpoint - ang Visual Studio ay kusang hahanap ng source code na tutugma sa code running ayon sa attached process at break nito.

Ang mga may kaugnayang mga code file ay matatagpuan sa `./atom/` pati na rin sa Brightray na matatagpuan sa `./brightray/browser` at `./brightray/common`.

### Pagkakabit (Attaching)

Maaari mong ikabit ang Visual Studio debugger sa running process sa lokal o remote computer. Matapos paganahin ang process, pindutin ang Debug / Attach to Process (o pindutin ang `CTRL+ALT+P`) para mabuksan ang "Attach to Process" na dialog box. Maaaring kakayahang ito para ma-debug ang mga apps na gumagana sa lokal o remote computer, pagsabay-sabaying i-debug ang lahat na nagpo-proseso.

Kung ang Electron ay gumagana sa ilalim ng iba't-ibang user account, piliin ang check box na `Show processes from all users`. Nakadepende sa dami ng BrowserWindows ang nakabukas na app, makikita mo ang karamihan sa mga nagpo-proseso. Ang karaniwang one-window app ay magreresulta sa Visual Studio na nagpapakita ng dalawang entry na `Electron.exe` - isa para sa main process at isa para sa renderer process. Sa kasalukuyan, walang ibang paraan upang malaman ang pagkakaiba dahil mga pangalan lang ang ibinibigay sa listahan.

### Alin sa mga proseso ang dapat ikabit?

Maipapalabas ang code sa loob ng main process ( ito ay ang code na matatagpuan o sa kalaunan ay mapapagana gamit ang file ng main JavaScript) tulad ng code na tinatawag na gamit ang remote (`require('electron').remote`) na gagana sa loob ng main process habang ang isang code naman ay gagana sa loob ng renderer process.

Ito ay maaaring ikabit sa karamihan ng programs kapag isinasagawa ang debugging, ngunit para sa anumang oras, isang program lang ang maaaring gumana sa debugger. Maaaring itakda ang program na gumagana sa toolbar na `Debug Location` o ang `Processes window`.

## Pagmasdan ang Proseso Gamit ang ProcMon

Kung ang Visual Studio ang pinakamagandang gamitin upang siyasatin ang code paths, ang ProcMon naman ang pinakamagandang gamitin upang maobserbahan ang lahat ginagawa ng iyong application gamit ang operating system - ito ay kumukuha ng File, Registry, Network, Process at Profiling details ng processes. Ito ay sinusubukang mag-log **all** ng mga nangyayari at maaaring ito ay maging hindi madali, ngunit kung pag-aaralan ng mabuti kung ano at paano ang iyong application ay gumagana sa operating system, ito ay maaaring maging mahalagang pinagkukunan.

Para sa panimula ng pundasyon ng ProcMon at advanced debugging features nito, puntahan at tingnan ang [this video tutorial](https://channel9.msdn.com/shows/defrag-tools/defrag-tools-4-process-monitor) na gawa ng Microsoft.