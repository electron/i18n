# Glossário

Esta página define alguns termos usados frequentemente no desenvolvimento com Electron.

### ASAR

ASAR significa formato de arquivo Atom Shell (em inglês, Atom Shell Archive Format). Um arquivo de [asar](https://github.com/electron/asar) é um simples `tar` formato que juntas os arquivos para um único arquivo. Electron pode ler arquivos arbitrários sem descompactar o arquivo inteiro.

The ASAR format was created primarily to improve performance on Windows... TODO

### CRT

A C Run-time (CRT) biblioteca é a parte padrão de C++ que incorpora a biblioteca padrão ISO C99. As bibliotecas do Visual C++ que implementam o CRT apoiar o desenvolvimento de código nativo e misto de código nativo e gerenciado e código gerenciado puro para desenvolvimento .NET.

### DMG

Uma imagem de disco da Apple é um formato de embalagem usado pelo macOS. DMG arquivos são componentes usados para distribuir um aplicativo "instaladores". [electron-builder](https://github.com/electron-userland/electron-builder) suporta `mg` como destino de compilação.

### IME

Editor de Método de Entrada. Um programa que permite os usuários inserir caracteres e símbolos não encontrados no seu teclado. Por exemplo, isso permite que usuários com teclado Latinos teclados troque as entradas de caracteres para Chinês, Japonês e Koreano.

### IDL

Interface description language. Write function signatures and data types in a format that can be used to generate interfaces in Java, C++, JavaScript, etc.

### IPC

IPC stands for Inter-Process Communication. Electron uses IPC to send serialized JSON messages between the [main](#main-process) and [renderer](#renderer-process) processes.

### libchromiumcontent

Uma biblioteca compartilhada que inclui o [Chromium Content module](https://www.chromium.org/developers/content-module) e todas as suas dependências (exemplo: Blink, [V8](#v8) e etc.). Também conhecido como "libcc".

- [github.com/electron/libchromiumcontent](https://github.com/electron/libchromiumcontent)

### main process

O processo principal, normalmente fica em um arquivo chamando `main.js`, é o ponto de entrada para cada app em Electron. Isso controla a vida do app, de aberto para fechado. Isso também é gerencia elementos nativos, como o Menu, Barra de Menus, Dock, Bandeja e etc. O processo principal é responsável por criar cada novo processo renderizado no app. Todo está construído em cima do Node API.

Every app's main process file is specified in the `main` property in `package.json`. This is how `electron .` knows what file to execute at startup.

In Chromium, this process is referred to as the "browser process". It is renamed in Electron to avoid confusion with renderer processes.

Consulte também: [processo](#process), [processo de processador](#renderer-process)

### MAS

Acronym for Apple's Mac App Store. For details on submitting your app to the MAS, see the [Mac App Store Submission Guide](tutorial/mac-app-store-submission-guide.md).

### Mojo

Um sistema IPC para a comunicação intra- ou inter-process (Entre Processos), e isso é importante porque o Chrome está interessado em ser capaz de dividir seu trabalho em processos separados ou de não dependência das pressões de memória, etc.

Veja https://chromium.googlesource.com/chromium/src/+/master/mojo/README.md

### native modules

Módulos nativos (também chamados [addons](https://nodejs.org/api/addons.html) em Node.Js) são módulos escritos em C ou C++ que pode ser carregado em Node.js ou Electron usando a função require() e fazer o uso de modo como se fossem um módulo comum de Node.js. Eles são usados principalmente para fornecer uma interface entre o JavaScript em execução em bibliotecas de Node.js e C/C++.

Os módulos nativos do Node são suportados pelo Electron, mas considerando que o Electron provavelmente irá utilizar uma versão do V8 dos binários do Node instalados no seu sistema, você deve especificar manualmente a localização dos headers do Electron quando for copilar módulos nativos.

Consulte também [Usando Módulos Nativos de Node](tutorial/using-native-node-modules.md).

### NSIS

Nullsoft Scriptable Install System é um instalador de scripts, ferramenta de autoria para Microsoft Windows. Ele é lançado sob uma combinação de licenças de software livre e é uma alternativa amplamente utilizada para produtos proprietários comerciais como o InstallShield. [electron-builder](https://github.com/electron-userland/electron-builder) suporta mg como destino de compilação.

### OSR

OSR (Off-screen rendering) can be used for loading heavy page in background and then displaying it after (it will be much faster). It allows you to render page without showing it on screen.

### process

Um processo é uma instância de um programa de computador que está sendo executado. Apps de Electron que fazem usam do [main](#main-process) e um ou vários processo de [renderer](#renderer-process) estão executando vários programas simultaneamente.

Em Node.js e Electron, cada processo em execução tem um objeto de `process`. Este objeto é um global que fornece informações sobre e controle sobre, o atual processo. Como um global, é sempre disponível para aplicações sem o uso de require().

Consulte também: [processo principal](#main-process), [processo de processador](#renderer-process)

### renderer process

The renderer process is a browser window in your app. Unlike the main process, there can be multiple of these and each is run in a separate process. They can also be hidden.

Em navegadores normais, as páginas web geralmente executam em um ambiente de área restrita e não têm a permissão de acessar recursos nativos. Usuários do Electron, por outro lado, têm o poder de usar as APIs do Node.js em páginas web, permitindo interações de baixo nível com o sistema operacional.

Consulte também: [process](#process), [main process](#main-process)

### Squirrel

Squirrel é um framework de código aberto que permite que aplicativos de elétron atualizar automaticamente como novas versões são lançadas. Consulte o [autoUpdater](api/auto-updater.md) API para obter informações sobre como começar com o Squirrel.

### userland

Este termo originou-se da comunidade Unix, onde "userland" ou "userspace" refere-se a programas que são executados fora da kernel do sistema operacional. Mais recentemente, o termo foi popularizado na comunidade Node e npm para distinguir entre os recursos disponíveis em "Node core" de pacotes publicados no registro do npm pela maior comunidade "usuários".

Como Node, o Electron é focado em ter um pequeno conjunto de APIs que fornecem todos os primitivos necessários para o desenvolvimento de aplicativos de multi-plataformas desktop. Esta filosofia do projeto permite que o Electron permaneça uma ferramenta flexível sem ser excessivamente prescritiva sobre como deve ser usado. Userland permite que os usuários criar e compartilhar ferramentas que fornecem funcionalidade adicional em cima do que é disponível no "Núcleo".

### V8

V8 is Google's open source JavaScript engine. It is written in C++ and is used in Google Chrome. V8 can run standalone, or can be embedded into any C++ application.

Electron forma o V8 como parte do Chromium e em seguida, aponta o Node ao V8 quando construindo.

V8's version numbers always correspond to those of Google Chrome. Chrome 59 includes V8 5.9, Chrome 58 includes V8 5.8, etc.

- [developers.google.com/v8](https://developers.google.com/v8)
- [nodejs.org/api/v8.html](https://nodejs.org/api/v8.html)
- [docs/development/v8-development.md](development/v8-development.md)

### webview

`webview` são tags são usadas para incorporar conteúdo 'convidado' (como páginas de web externas) seu aplicativo de Electron. Eles são semelhantes a `iframe`s, mas diferem em que cada WebView é executado em um processo separado. Ele não tem a mesma permissões como sua página web e todas as interações entre seu aplicativo e conteúdo incorporado será assíncrono. Isso mantém seu aplicativo seguro do conteúdo incorporado.
