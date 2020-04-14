# Речник

Тази страница определя общата терминология, която често се използва в разработването с Електрон.

### ASAR

ASAR е абревиатура от Atom Shell Archive Format или ядрен формат за архивиране. [asar](https://github.com/electron/asar) е прост, подобен на `tar` формат за архиви, който съдържа файлове в един единствен файл. Електрон може да чете произволни файлове от него без разопаковане на целия файл.

The ASAR format was created primarily to improve performance on Windows... TODO

### CRT

Библиотеката за изпълнение на C код (CRT) е част от стандартната C++ библиотека, която включва ISO C99 стандартната библиотека. Visual C ++ библиотеките, които поддържат CRT роден код за разработка или смесен роден, управляем код и чисто управляем код за .NET програмиране.

### DMG

Диск изображение за Apple е опаковачен формат, използван от macOS. DMG файловете са често използвани за разпространение на "инсталаторни" приложения. [електрон-builder](https://github.com/electron-userland/electron-builder) поддържа `dmg` като изграждаща цел.

### IME

Редактор за въвеждане на метод (Input Method Editor). Програма, която позволява на потребителите да вкарват букви и символи, които не са част от тяхната клавиатура. Например, това позволява на потребителите на латинска клавиатура да въвеждат китайски, японски, корейски и индийски символи.

### IDL

Interface description language. Write function signatures and data types in a format that can be used to generate interfaces in Java, C++, JavaScript, etc.

### IPC

IPC stands for Inter-Process Communication. Electron uses IPC to send serialized JSON messages between the [main](#main-process) and [renderer](#renderer-process) processes.

### libchromiumcontent

Споделена Библиотека, която включва [Chromium Content module](https://www.chromium.org/developers/content-module) и всички негови зависимости (например, Blink, [V8](#v8), и т.н.). Наричана също "libcc".

- [github.com/electron/libchromiumcontent](https://github.com/electron/libchromiumcontent)

### основен процес

Основният процес, обикновено е файл с име `main.js`, като той е входната точка за всяко Електрон приложение. Той контролира "живота" на приложението, от отваряне до затваряне. Той също така управлява родни за устройството елементи като меню, лента с менюта, док, табла/Tray и др. Основният процес е отговорен за създаването на всеки нов процес на рендиране в приложението. Пълният Node API е вграден.

Every app's main process file is specified in the `main` property in `package.json`. This is how `electron .` knows what file to execute at startup.

In Chromium, this process is referred to as the "browser process". It is renamed in Electron to avoid confusion with renderer processes.

Виж още: [процес](#process), [рендериращ процес](#renderer-process)

### MAS

Acronym for Apple's Mac App Store. For details on submitting your app to the MAS, see the [Mac App Store Submission Guide](tutorial/mac-app-store-submission-guide.md).

### Mojo

An IPC system for communicating intra- or inter-process, and that's important because Chrome is keen on being able to split its work into separate processes or not, depending on memory pressures etc.

See https://chromium.googlesource.com/chromium/src/+/master/mojo/README.md

### родния модули

Native modules (also called [addons](https://nodejs.org/api/addons.html) in Node.js) are modules written in C or C++ that can be loaded into Node.js or Electron using the require() function, and used as if they were an ordinary Node.js module. Те се използват главно за осигурява интерфейс между JavaScript код в Node.js и C/C ++ библиотеки.

Родните Node модули се поддържат от Eлектрон, но тъй като Eлектрон е много вероятно да използва различна V8 версия от бинарната Node инсталация във вашата система, вие трябва ръчно да укажете местоположението на Електрон в заглавието при изграждането на родните модули.

Виж също [Използват родния Node модули](tutorial/using-native-node-modules.md).

### NSIS

Nullsoft система за инсталационни скриптове е скрипт задвижващ авторски инструмент за инсталация при Microsoft Windows. Той е създаден от комбинация на лицензи за свободен софтуер и е широко използвана алтернатива на търговски патентовани продукти като InstallShield. [electron-builder](https://github.com/electron-userland/electron-builder) поддържа NSIS като изграждаща цел.

### OSR

OSR (Off-screen rendering) can be used for loading heavy page in background and then displaying it after (it will be much faster). It allows you to render page without showing it on screen.

### процес

Процесът е инстанция на компютърна програма, която се изпълнява. Електрон приложенията, които използват [main](#main-process) и един или много [renderer](#renderer-process) процеси всъщност изпълняват няколко програми едновременно.

В Node.js и Електрон всеки работещ процес е обект от `process`. Този обект е глобален, като предоставя информация и контрол над, текущия процес. Тъй като е глобален, той винаги е достъпен за приложенията без да използвате require().

Виж още: [process](#main-process), [render process](#renderer-process)

### рендериращ/изобразяващ процес

The renderer process is a browser window in your app. Unlike the main process, there can be multiple of these and each is run in a separate process. They can also be hidden.

В нормални браузъри, уеб страниците обикновено работят в изолирана/sandboxed околна среда и не им е разрешен достъп до локални ресурси. Потребителите на Електрон обаче имат възможността да използват Node.js API функции в уеб страниците, което им позволява да си взаимодействат с по-долните слоеве на операционната система.

Виж още: [process](#process), [render process](#main-process)

### Squirrel

Squirrel е системна рамка с отворен код, която позволява на Електрон приложенията да се обновяват автоматично, когато има издадени нови версии. Виж [autoUpdater](api/auto-updater.md) API за повече информация как да започнем работа с Squirrel.

### потребителска страна

Терминът идват от Unix обяността, където "userland" или "userspace" се отнасят за програми, които се изпълняват извън сърцевината на операционната система. В последно време, терминът бива популяризиран в Node и npm общностите, за да покаже разликата между същностните функции на Node и пакетираните функции публикувани в npm регистъра от много по-голямата потребителска общност, от там и термина "потребителска страна".

Като Node така и Електрон е фокусиран върху малък набор от интерфейси, които осигуряват всички необходими примитиви за разработване на десктоп/настолни приложения за множество платформи. Тази дизайн философия позволява Електрон да остане гъвкав инструмент без да бъде прекалено ограничителен за това как трябва да се използва. Потребителската страна дава възможност на потребителите да създават и споделят инструменти, които осигуряват допълнителна функционалност, която липсва в "ядро" на Електрон.

### V8

V8 is Google's open source JavaScript engine. It is written in C++ and is used in Google Chrome. V8 can run standalone, or can be embedded into any C++ application.

Електрон изгражда V8 като част от Chromium и след това насочва Node към този V8 при изграждането му.

V8's version numbers always correspond to those of Google Chrome. Chrome 59 includes V8 5.9, Chrome 58 includes V8 5.8, etc.

- [developers.google.com/v8](https://developers.google.com/v8)
- [nodejs.org/api/v8.html](https://nodejs.org/api/v8.html)
- [docs/development/v8-development.md](development/v8-development.md)

### уеб изглед

`WebView` етикетите се използват за вграждане на "гостуващо" съдържание (като например външни уеб страници) във вашето Електрон приложение. Те са подобни на `iframe`, но се различават по това че всяко webview (уеб изглед) се изпълнява в отделен процес. Не разполага със същите разрешения като вашата уеб страница и всички взаимодействия между приложението и вградено съдържание ще бъде асинхронно. Това поддържа вашето приложение в безопасност от вградените съдържания.
