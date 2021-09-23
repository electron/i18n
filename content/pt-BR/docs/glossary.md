# Glossário

Esta página define alguns termos usados frequentemente no desenvolvimento com Electron.

### ASAR

ASAR significa formato de arquivo Atom Shell (em inglês, Atom Shell Archive Format). Um arquivo de [asar][] é um simples `tar` formato que juntas os arquivos para um único arquivo. Electron pode ler arquivos arbitrários sem descompactar o arquivo inteiro.

The ASAR format was created primarily to improve performance on Windows when reading large quantities of small files (e.g. when loading your app's JavaScript dependency tree from `node_modules`).

### code signing

Code signing is a process where an app developer digitally signs their code to ensure that it hasn't been tampered with after packaging. Both Windows and macOS implement their own version of code signing. As a desktop app developer, it's important that you sign your code if you plan on distributing it to the general public.

For more information, read the [Code Signing][] tutorial.

### context isolation

Context isolation is a security measure in Electron that ensures that your preload script cannot leak privileged Electron or Node.js APIs to the web contents in your renderer process. With context isolation enabled, the only way to expose APIs from your preload script is through the `contextBridge` API.

For more information, read the [Context Isolation][] tutorial.

See also: [preload script](#preload-script), [renderer process](#renderer-process)

### CRT

The C Runtime Library (CRT) is the part of the C++ Standard Library that incorporates the ISO C99 standard library. As bibliotecas do Visual C++ que implementam o CRT apoiar o desenvolvimento de código nativo e misto de código nativo e gerenciado e código gerenciado puro para desenvolvimento .NET.

### DMG

Uma imagem de disco da Apple é um formato de embalagem usado pelo macOS. DMG arquivos são componentes usados para distribuir um aplicativo "instaladores".

### IME

Editor de Método de Entrada. Um programa que permite os usuários inserir caracteres e símbolos não encontrados no seu teclado. Por exemplo, isso permite que usuários com teclado Latinos teclados troque as entradas de caracteres para Chinês, Japonês e Koreano.

### IDL

Interface description language. Write function signatures and data types in a format that can be used to generate interfaces in Java, C++, JavaScript, etc.

### IPC

IPC stands for inter-process communication. Electron uses IPC to send serialized JSON messages between the main and renderer processes.

consulte também: [processo principal](#main-process), [processo de processador](#renderer-process)

### main process

The main process, commonly a file named `main.js`, is the entry point to every Electron app. It controls the life of the app, from open to close. Isso também é gerencia elementos nativos, como o Menu, Barra de Menus, Dock, Bandeja e etc. The main process is responsible for creating each new renderer process in the app. The full Node API is built in.

Every app's main process file is specified in the `main` property in `package.json`. This is how `electron .` knows what file to execute at startup.

In Chromium, this process is referred to as the "browser process". It is renamed in Electron to avoid confusion with renderer processes.

Consulte também: [processo](#process), [processo de processador](#renderer-process)

### MAS

Acronym for Apple's Mac App Store. For details on submitting your app to the MAS, see the [Mac App Store Submission Guide][].

### Mojo

An IPC system for communicating intra- or inter-process, and that's important because Chrome is keen on being able to split its work into separate processes or not, depending on memory pressures etc.

Veja https://chromium.googlesource.com/chromium/src/+/master/mojo/README.md

See also: [IPC](#ipc)

### MSI

On Windows, MSI packages are used by the Windows Installer (also known as Microsoft Installer) service to install and configure applications.

More information can be found in [Microsoft's documentation][msi].

### native modules

Módulos nativos (também chamados [addons][] em Node.Js) são módulos escritos em C ou C++ que pode ser carregado em Node.js ou Electron usando a função require() e fazer o uso de modo como se fossem um módulo comum de Node.js. Eles são usados principalmente para fornecer uma interface entre o JavaScript em execução em bibliotecas de Node.js e C/C++.

Os módulos nativos do Node são suportados pelo Electron, mas considerando que o Electron provavelmente irá utilizar uma versão do V8 dos binários do Node instalados no seu sistema, você deve especificar manualmente a localização dos headers do Electron quando for copilar módulos nativos.

For more information, read the [Native Node Modules] tutorial.

### notarization

Notarization is a macOS-specific process where a developer can send a code-signed app to Apple servers to get verified for malicious components through an automated service.

See also: [code signing](#code-signing)

### OSR

OSR (offscreen rendering) can be used for loading heavy page in background and then displaying it after (it will be much faster). It allows you to render page without showing it on screen.

For more information, read the [Offscreen Rendering][][osr] tutorial.

### preload script

Preload scripts contain code that executes in a renderer process before its web contents begin loading. These scripts run within the renderer context, but are granted more privileges by having access to Node.js APIs.

See also: [renderer process](#renderer-process), [context isolation](#context-isolation)

### process

Um processo é uma instância de um programa de computador que está sendo executado. Apps de Electron que fazem usam do [main][] e um ou vários processo de [renderer][] estão executando vários programas simultaneamente.

Em Node.js e Electron, cada processo em execução tem um objeto de `process`. Este objeto é um global que fornece informações sobre e controle sobre, o atual processo. Como um global, é sempre disponível para aplicações sem o uso de require().

Consulte também: [processo principal](#main-process), [processo de processador](#renderer-process)

### renderer process

The renderer process is a browser window in your app. Unlike the main process, there can be multiple of these and each is run in a separate process. They can also be hidden.

Consulte também: [process](#process), [main process](#main-process)

### sandbox

The sandbox is a security feature inherited from Chromium that restricts your renderer processes to a limited set of permissions.

For more information, read the [Process Sandboxing][] tutorial.

See also: [process](#process)

### Squirrel

Squirrel é um framework de código aberto que permite que aplicativos de elétron atualizar automaticamente como novas versões são lançadas. Consulte o [autoUpdater][] API para obter informações sobre como começar com o Squirrel.

### userland

Este termo originou-se da comunidade Unix, onde "userland" ou "userspace" refere-se a programas que são executados fora da kernel do sistema operacional. Mais recentemente, o termo foi popularizado na comunidade Node e npm para distinguir entre os recursos disponíveis em "Node core" de pacotes publicados no registro do npm pela maior comunidade "usuários".

Como Node, o Electron é focado em ter um pequeno conjunto de APIs que fornecem todos os primitivos necessários para o desenvolvimento de aplicativos de multi-plataformas desktop. Esta filosofia do projeto permite que o Electron permaneça uma ferramenta flexível sem ser excessivamente prescritiva sobre como deve ser usado. Userland permite que os usuários criar e compartilhar ferramentas que fornecem funcionalidade adicional em cima do que é disponível no "Núcleo".

### V8

V8 is Google's open source JavaScript engine. It is written in C++ and is used in Google Chrome. V8 can run standalone, or can be embedded into any C++ application.

Electron forma o V8 como parte do Chromium e em seguida, aponta o Node ao V8 quando construindo.

V8's version numbers always correspond to those of Google Chrome. Chrome 59 includes V8 5.9, Chrome 58 includes V8 5.8, etc.

- [v8.dev](https://v8.dev/)
- [nodejs.org/api/v8.html](https://nodejs.org/api/v8.html)
- [docs/development/v8-development.md](development/v8-development.md)

### webview

`webview` tags are used to embed 'guest' content (such as external web pages) in your Electron app. They are similar to `iframe`s, but differ in that each webview runs in a separate process. Ele não tem a mesma permissões como sua página web e todas as interações entre seu aplicativo e conteúdo incorporado será assíncrono. Isso mantém seu aplicativo seguro do conteúdo incorporado.

[addons]: https://nodejs.org/api/addons.html
[asar]: https://github.com/electron/asar
[autoUpdater]: api/auto-updater.md
[Code Signing]: tutorial/code-signing.md
[Context Isolation]: tutorial/context-isolation.md
[Mac App Store Submission Guide]: tutorial/mac-app-store-submission-guide.md
[main]: #main-process
[msi]: https://docs.microsoft.com/en-us/windows/win32/msi/windows-installer-portal
[Offscreen Rendering]: tutorial/offscreen-rendering.md
[Process Sandboxing]: tutorial/sandbox.md
[renderer]: #renderer-process
