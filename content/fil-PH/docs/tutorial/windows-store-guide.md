# Gabay sa Windows Store

Sa Windows 10, ang lumang win32 executable ay mayroong bagong kapatid: Ang Universal Windows Platform. Ang bagong format ng `.appx` ay hindi lamang pinapagana ang mga bagong malalakas na API gaya ng Cortana at Push Notifications, ngunit sa pamamagitan ng Windows Store, pinapapayak nito ang pag-install at pag-update.

Ang Microsoft[ay bumuo ng isang kagamitan na kumukalap ng Electron apps bilang`.appx`pakete](https://github.com/catalystcode/electron-windows-store)na tumulutong sa mga developers na magamit ang ilang magagandang bagay na makikita sa bagong modelong aplikasyon. Ang gabay na ito ay nagpapaliwanag kung paano ito gagamitin - anu-ano ang mga kakayahan at limitaston ng pakete ng Electron AppX.

## Background at Mga Kinakailangan

Ang Windows 10 "Anniversary Update" ay kayang paganahin ang win32`.exe`binaries sa pamamagitan ng paglunsad nito ng sabay sa virtualized filesystem at registry. Sila ay kapwa nalikha sa panahon ng pagtitipon sa pamamagitan ng pagpapagana ng app at installer sa loob ng Windows Container, ito ay nagbibigay pahintulot sa Windows para eksaktong matukoy kung aling pagbabago sa operating system ang nagawa sa oras ng pag-iinstall. Ang pagpapares ng maipapatupad sa isang virtual filesystem at isang virtual registry ay nagbibigay pahintulot sa Windows upang paganahin ang pag-install at pagtanggal sa pamamagitan ng isang klik.

Bukod pa rito, ang exe ay inilulunsad sa loob ng appx model - ibig sabihin ay magagamit nito ang maraming API na naroroon sa Universal Windows Platform. To gain even more capabilities, an Electron app can pair up with an invisible UWP background task launched together with the `exe` - sort of launched as a sidekick to run tasks in the background, receive push notifications, or to communicate with other UWP applications.

To compile any existing Electron app, ensure that you have the following requirements:

* Windows 10 with Anniversary Update (released August 2nd, 2016)
* The Windows 10 SDK, [downloadable here](https://developer.microsoft.com/en-us/windows/downloads/windows-10-sdk)
* At least Node 4 (to check, run `node -v`)

Then, go and install the `electron-windows-store` CLI:

```sh
npm install -g electron-windows-store
```

## Unang hakbang: Package ng Iyong Application sa Electron

Package the application using [electron-packager](https://github.com/electron-userland/electron-packager) (or a similar tool). Make sure to remove `node_modules` that you don't need in your final application, since any module you don't actually need will increase your application's size.

Ang output ay dapat magmukhang halos katulad nito:

```text
├── Ghost.exe
├── LICENSE
├── content_resources_200_percent.pak
├── content_shell.pak
├── d3dcompiler_47.dll
├── ffmpeg.dll
├── icudtl.dat
├── libEGL.dll
├── libGLESv2.dll
├── locales
│   ├── am.pak
│   ├── ar.pak
│   ├── [...]
├── natives_blob.bin
├── node.dll
├── resources
│   ├── app
│   └── atom.asar
├── snapshot_blob.bin
├── squirrel.exe
└── ui_resources_200_percent.pak
```

## Step 2: Running electron-windows-store

From an elevated PowerShell (run it "as Administrator"), run `electron-windows-store` with the required parameters, passing both the input and output directories, the app's name and version, and confirmation that `node_modules` should be flattened.

```powershell
electron-windows-store `
    --input-directory C:\myelectronapp `
    --output-directory C:\output\myelectronapp `
    --flatten true `
    --package-version 1.0.0.0 `
    --package-name myelectronapp
```

Once executed, the tool goes to work: It accepts your Electron app as an input, flattening the `node_modules`. Then, it archives your application as `app.zip`. Using an installer and a Windows Container, the tool creates an "expanded" AppX package - including the Windows Application Manifest (`AppXManifest.xml`) as well as the virtual file system and the virtual registry inside your output folder.

Once the expanded AppX files are created, the tool uses the Windows App Packager (`MakeAppx.exe`) to create a single-file AppX package from those files on disk. Finally, the tool can be used to create a trusted certificate on your computer to sign the new AppX package. With the signed AppX package, the CLI can also automatically install the package on your machine.

## Step 3: Using the AppX Package

Upang patakbuhin ang iyong pakete, kakailanganin ng iyong mga user ang Windows 10 na may tinatawag na "Anniversary Update" - mga detalye sa kung paano i-update ang Windows ay matatagpuan [here](https://blogs.windows.com/windowsexperience/2016/08/02/how-to-get-the-windows-10-anniversary-update).

Sa pagsalungat sa mga tradisyunal na apps ng UWP, ang mga naka-package na apps ay kasalukuyang kailangang sumailalim sa isang manual verification process, kung saan maaari mong ilapat ang [here](https://developer.microsoft.com/en-us/windows/projects/campaigns/desktop-bridge). In the meantime, all users will be able to install your package by double-clicking it, so a submission to the store might not be necessary if you're looking for an easier installation method. Sa mga pinamamahalaang kapaligiran (usually enterprises), ang `Add-AppxPackage` [PowerShell Cmdlet can be used to install it in an automated fashion](https://technet.microsoft.com/en-us/library/hh856048.aspx).

Ang isa pang mahalagang limitasyon ay ang pinagsama-samang pakete ng AppX ay naglalaman pa rin ng isang win32 executable - at samakatuwid ay hindi tatakbo sa Xbox, HoloLens, o Phones.

## Optional: Magdagdag ng Mga Tampok ng UWP gamit ang BackgroundTask

Maaari mong ipares ang iyong Electron app sa isang hindi nakikitang UWP na gawain sa background na ay nakakakuha upang lubos na gamitin ang mga tampok ng Windows 10 - tulad ng mga push notification, Pagsasama ng Cortana, o mga live na tile.

Upang tingnan kung paano ang isang app ng Electron na gumagamit ng isang gawain sa background upang magpadala ng tustadong tinapay mga abiso at mga live na tile, [check Out the Microsoft-provided sample](https://github.com/felixrieseberg/electron-uwp-background).

## Optional: I-convert gamit ang Virtualization ng Lalagyan

Upang makabuo ng pakete ng AppX, ginagamit ng `electron-windows-store`CLI ang isang template na dapat gumana para sa karamihan ng mga apps sa Electron. Gayunpaman, kung gumagamit ka ng custom installer, o dapat kang makaranas ng anumang problema sa nabuong pakete, ikaw maaaring magtangkang lumikha ng isang pakete gamit ang compilation sa isang Windows Container - in na mode, ang CLI ay mag-i-install at magpatakbo ng iyong aplikasyon sa blangko ng Windows Container upang matukoy kung anong pagbabago ang eksaktong ginagawa ng iyong aplikasyon sa pagpapatakbo sistema.

Bago patakbuhin ang CLI sa unang pagkakataon, kakailanganin mong i-setup ang "Windows Desktop App Converter ". Kakailanganin ito ng ilang minuto, ngunit huwag mag-alala - kailangan mo lang gawin ito nang isang beses. I-download at Desktop App Converter mula sa [here](https://docs.microsoft.com/en-us/windows/uwp/porting/desktop-to-uwp-run-desktop-app-converter). Makakatanggap ka ng dalawang mga file: `DesktopAppConverter.zip` and `BaseImage-14316.wim`.

1. Hindi na zip `DesktopAppConverter.zip`. Mula sa isang nakataas PowerShell (binuksan gamit ang "run as administrator", tiyaking pinapayagan kami ng patakaran sa pagpapatupad ng iyong system patakbuhin ang lahat ng bagay na nais naming patakbuhin sa pamamagitan ng pagtawag `Set-ExecutionPolicy bypass`.
2. Pagkatapos, patakbuhin ang pag-install ng Desktop App Converter, na ipinapasa ang lokasyon ng Windows base Image (downloaded as `BaseImage-14316.wim`), sa pamamagitan ng pagtawag `.\DesktopAppConverter.ps1-Setup -BaseImage .\BaseImage-14316.wim`.
3. Kung pinapatakbo ka ng command sa itaas para sa isang reboot, mangyaring i-restart ang iyong machine at patakbuhin ang command sa itaas pagkatapos ng isang matagumpay na restart.

Sa sandaling naka-install ang pag-install, maaari kang magpatuloy sa pag-ipon ng iyong app sa Electron.