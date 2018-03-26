# Glossário

Esta página define alguns termos usados frequentemente no desenvolvimento com Electron.

### ASAR

ASAR significa formato de arquivo Atom Shell (em inglês, Atom Shell Archive Format). Um arquivo de [asar](https://github.com/electron/asar) é um simples `tar` formato que juntas os arquivos para um único arquivo. Electron pode ler arquivos arbitrários sem descompactar o arquivo inteiro.

O formato ASAR foi criado principalmente para melhorar o desempenho no Windows...

### Brightray

Brightray [foi](https://github.com/electron-archive/brightray) uma biblioteca estática que tornava o uso do [libchromiumcontent](#libchromiumcontent) mais fácil. Isso é agora obsoleta e foi incorporada na base de código do Electron.

### CRT

A C Run-time (CRT) biblioteca é a parte padrão de C++ que incorpora a biblioteca padrão ISO C99. As bibliotecas do Visual C++ que implementam o CRT apoiar o desenvolvimento de código nativo e misto de código nativo e gerenciado e código gerenciado puro para desenvolvimento .NET.

### DMG

Uma imagem de disco da Apple é um formato de embalagem usado pelo macOS. DMG arquivos são componentes usados para distribuir um aplicativo "instaladores". [electron-builder](https://github.com/electron-userland/electron-builder) suporta `mg` como destino de compilação.

### IME

Editor de Método de Entrada. Um programa que permite os usuários inserir caracteres e símbolos não encontrados no seu teclado. Por exemplo, isso permite que usuários com teclado Latinos teclados troque as entradas de caracteres para Chinês, Japonês e Koreano.

### IPC

IPC significa comunicação entre processos. Electron usa IPC para enviar mensagens JSON serializadas entre os processos [main](#main-process) e [renderer](#renderer-process) processes.

### libchromiumcontent

Uma biblioteca compartilhada que inclui o [Chromium Content module](https://www.chromium.org/developers/content-module) e todas as suas dependências (exemplo: Blink, [V8](#v8) e etc.). Também conhecido como "libcc".

- [github.com/electron/libchromiumcontent](https://github.com/electron/libchromiumcontent)

### main process

O processo principal, normalmente fica em um arquivo chamando `main.js`, é o ponto de entrada para cada app em Electron. Isso controla a vida do app, de aberto para fechado. Isso também é gerencia elementos nativos, como o Menu, Barra de Menus, Dock, Bandeja e etc. O processo principal é resposável por criar cada novo processo rederizado no app. Todo o Node API está cronstruído.

O arquivo de processo principal de toda aplicação é especificado na propriedade `main` dentro do arquivo `package.json`. É desta maneira que o `electron .` sabe qual arquivo executar ao iniciar.

No Chromium, este processo é referido assim como o "Processo do Browser". Ele é renomeado no Electron para evitar confusões com os processos de renderizações.

Consulte também: [processo](#process), [processo de processador](#renderer-process)

### MAS

Acronym for Apple's Mac App Store. For details on submitting your app to the MAS, see the [Mac App Store Submission Guide](tutorial/mac-app-store-submission-guide.md).

### native modules

Native modules (also called [addons](https://nodejs.org/api/addons.html) in Node.js) are modules written in C or C++ that can be loaded into Node.js or Electron using the require() function, and used just as if they were an ordinary Node.js module. They are used primarily to provide an interface between JavaScript running in Node.js and C/C++ libraries.

Native Node modules are supported by Electron, but since Electron is very likely to use a different V8 version from the Node binary installed in your system, you have to manually specify the location of Electron’s headers when building native modules.

See also [Using Native Node Modules](tutorial/using-native-node-modules.md).

### NSIS

Nullsoft Scriptable Install System is a script-driven Installer authoring tool for Microsoft Windows. It is released under a combination of free software licenses, and is a widely-used alternative to commercial proprietary products like InstallShield. [electron-builder](https://github.com/electron-userland/electron-builder) supports NSIS as a build target.

### OSR

OSR (Off-screen rendering) can be used for loading heavy page in background and then displaying it after (it will be much faster). It allows you to render page without showing it on screen.

### process

A process is an instance of a computer program that is being executed. Electron apps that make use of the [main](#main-process) and one or many [renderer](#renderer-process) process are actually running several programs simultaneously.

In Node.js and Electron, each running process has a `process` object. This object is a global that provides information about, and control over, the current process. As a global, it is always available to applications without using require().

Consulte também: [processo principal](#main-process), [processo de processador](#renderer-process)

### renderer process

The renderer process is a browser window in your app. Unlike the main process, there can be multiple of these and each is run in a separate process. They can also be hidden.

Em navegadores normais, as páginas web geralmente executam em um ambiente de área restrita e não têm a permissão de acessar recursos nativos. Usuários do Electron, por outro lado, têm o poder de usar as APIs do Node.js em páginas web, permitindo interações de baixo nível com o sistema operacional.

See also: [process](#process), [main process](#main-process)

### Squirrel

Squirrel is an open-source framework that enables Electron apps to update automatically as new versions are released. See the [autoUpdater](api/auto-updater.md) API for info about getting started with Squirrel.

### userland

This term originated in the Unix community, where "userland" or "userspace" referred to programs that run outside of the operating system kernel. More recently, the term has been popularized in the Node and npm community to distinguish between the features available in "Node core" versus packages published to the npm registry by the much larger "user" community.

Like Node, Electron is focused on having a small set of APIs that provide all the necessary primitives for developing multi-platform desktop applications. This design philosophy allows Electron to remain a flexible tool without being overly prescriptive about how it should be used. Userland enables users to create and share tools that provide additional functionality on top of what is available in "core".

### V8

V8 is Google's open source JavaScript engine. It is written in C++ and is used in Google Chrome. V8 can run standalone, or can be embedded into any C++ application.

Electron builds V8 as part of Chromium and then points Node to that V8 when building it.

V8's version numbers always correspond to those of Google Chrome. Chrome 59 includes V8 5.9, Chrome 58 includes V8 5.8, etc.

- [developers.google.com/v8](https://developers.google.com/v8)
- [nodejs.org/api/v8.html](https://nodejs.org/api/v8.html)
- [docs/development/v8-development.md](development/v8-development.md)

### webview

`webview` tags are used to embed 'guest' content (such as external web pages) in your Electron app. They are similar to `iframe`s, but differ in that each webview runs in a separate process. It doesn't have the same permissions as your web page and all interactions between your app and embedded content will be asynchronous. This keeps your app safe from the embedded content.