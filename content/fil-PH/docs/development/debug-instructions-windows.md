# Paghanap at Pag-aayos ng Problema sa Windows (Debugging)

Kung ikaw ay nakararanas ng pagbagsak o may nagaganap na di tama sa Electron at alam mo na ito'y di sanhi hindi ng JavaScript application, sa halip ang problema ay nasa mismong Electron, ang pagtatama ng mali (debugging) ay medyo nakakalito lalo na sa mga naglilinang nito na hindi gumagamit ng native/C++ upang mahanap o maitama ang mga mali nito (debugging). Ganoon pa man, gamit ang Visual Studio, GitHub's hosted Electron Symbol Server at ang source code ng Electron, ay napapadali upang masiguro na maisasagawa ang mga mali na makikita (debugging) sa loob ng source code ng Electron.

## Mga kinakailangan

* **Ang debug na gawa ng Electron**: Kadalasan, ang pinakamadaling paraan ay buuin ito mag-isa sa pamamagitan ng mga gamit at mga pangunahing kailangan na nasa [build instructions para sa Windows](build-instructions-windows.md). Kapag ang Electron ay tuwirang kinuha (download), ito ay madaling maikakabit at matutukoy ang problema (debug), at ito'y siguradong gagana nang higit na mas maayos. Ginagawa nitong mas mahirap ang paghahanap at pag-aayos ng mga problema (debugging): Ang debugger ay hindi kayang ipakita ang lahat ng laman ng variable at mapapansin ang execution path ay maaaring maging kakaiba dahil sa inlining, tail calls at iba pang compiler optimizations.

* **Ang Visual Studio gamit ang C++ Tools**: Ang free community editions ng Visual Studio 2013 at Visual studio 2015 ay parehong gumagana. Kapag in-install ang [configure Visual Studio to use GitHub's Electron Symbol server](setting-up-symbol-server.md). Ito ay hahayaang gumana ang Visual studio upang maunawaang mabuti kung ano ang nangyayari sa loob ng Electron at mas mapapadali nito ang pagpapakita ng mga variable sa paraan na mas mauunawaan ng mga tao.

* **ProcMon**: Ang [free SysInternals tool](https://technet.microsoft.com/en-us/sysinternals/processmonitor.aspx) ay hinayaan na siyasatin ang processes parameters, file handles at registry operations.

## Pagkakabit at Pagde-debug sa Electron

Sa pagsisimula ng debugging session, buksan ang PowerShell/CMD at paganahin ang debug na gawa ng Electron gamit ang application upang magbukas ito bilang parameter.

```powershell
$ ./out/D/electron.exe ~/my-electron-app/
```

### Pagtatakda ng mga Breakpoint

Buksan ang Visual Studio. Ang Electron ay di gawa gamit ang Visual Studio kung kaya naman ito ay di naglalaman ng project file - ganoon pa man, ikaw ay maaaring magbukas ng source code files bilang "As File", ibig sabihin ang Visual Studio ay magbubukas lamang gamit ang kanyang sarili. Maaari ka pa ring magtakda ng mga breakpoint - ang Visual Studio ay kusang hahanap ng source code na tutugma sa code running ayon sa attached process at break nito.

Ang mga mahahalagang code file ay matatagpuan sa `./atom/` tulad ng Brightray na matatagpuan sa `./brightray/browser` at `./brightray/common`. Kung ikaw ay harcore, maaaring mo ring direktang i-debug si Chromium na matatagpuan sa `chromium_src`.

### Pagkakabit (Attaching)

Maaari mong ikabit ang Visual Studio debugger sa running process sa lokal o remote computer. Matapos paganahin ang process, pindutin ang Debug / Attach to Process (o pindutin ang `CTRL+ALT+P`) para mabuksan ang "Attach to Process" na dialog box. Maaaring gumamit ng capability para ma-debug ang mga apps na gumagana sa lokal o remote computer, sabay-sabaying i-debug ang lahat na nagpo-proseso.

Kung ang Electron ay gumagana sa ilalim ng iba't-ibang user account, piliin ang check box na `Show processes from all users`. Nakadepende sa dami ng BrowserWindows ang nakabukas na app, makikita mo na marami ang magpo-proseso. Ang karaniwang one-window app ay magreresulta sa Visual Studio na nagpapakita ng dalawang entry na `Electron.exe` - isa para sa main process at isa para sa renderer process. Sa kasalukuyan, walang ibang paraan upang malaman ang pagkakaiba dahil mga pangalan lang ang ibinibigay sa listahan.

### Alin sa mga proseso ang dapat ikabit?

Code executed within the main process (that is, code found in or eventually run by your main JavaScript file) as well as code called using the remote (`require('electron').remote`) will run inside the main process, while other code will execute inside its respective renderer process.

You can be attached to multiple programs when you are debugging, but only one program is active in the debugger at any time. You can set the active program in the `Debug Location` toolbar or the `Processes window`.

## Using ProcMon to Observe a Process

While Visual Studio is fantastic for inspecting specific code paths, ProcMon's strength is really in observing everything your application is doing with the operating system - it captures File, Registry, Network, Process, and Profiling details of processes. It attempts to log **all** events occurring and can be quite overwhelming, but if you seek to understand what and how your application is doing to the operating system, it can be a valuable resource.

For an introduction to ProcMon's basic and advanced debugging features, go check out [this video tutorial](https://channel9.msdn.com/shows/defrag-tools/defrag-tools-4-process-monitor) provided by Microsoft.