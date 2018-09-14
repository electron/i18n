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

### IDL

Linguagem de descrição da interface. Escreva assinaturas de funções e tipos de dados em um formato que pode ser usado para gerar interfaces em Java, C++, JavaScript, etc.

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

Acrônimo para Mac App Store da Apple. Para obter detalhes sobre a apresentação de seu aplicativo para o MAS, consulte o [Guia de submissão do Mac App Store](tutorial/mac-app-store-submission-guide.md).

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

OSR (processamento fora da tela) pode ser usado para carregar página pesada no fundo e em seguida, exibi-la depois (será muito mais rápido). Ele permite que você renderize a página sem mostrá-lo na tela.

### process

Um processo é uma instância de um programa de computador que está sendo executado. Apps de Electron que fazem usam do [main](#main-process) e um ou vários processo de [renderer](#renderer-process) estão executando vários programas simultaneamente.

Em Node.js e Electron, cada processo em execução tem um objeto de `process`. Este objeto é um global que fornece informações sobre e controle sobre, o atual processo. Como um global, é sempre disponível para aplicações sem o uso de require().

Consulte também: [processo principal](#main-process), [processo de processador](#renderer-process)

### renderer process

O processo do processador é uma janela de navegador em seu aplicativo. Ao contrário do processo principal, pode haver múltiplos destes e cada um são executados em um processo separado. Eles também podem ser ocultados.

Em navegadores normais, as páginas web geralmente executam em um ambiente de área restrita e não têm a permissão de acessar recursos nativos. Usuários do Electron, por outro lado, têm o poder de usar as APIs do Node.js em páginas web, permitindo interações de baixo nível com o sistema operacional.

Consulte também: [process](#process), [main process](#main-process)

### Squirrel

Squirrel é um framework de código aberto que permite que aplicativos de elétron atualizar automaticamente como novas versões são lançadas. Consulte o [autoUpdater](api/auto-updater.md) API para obter informações sobre como começar com o Squirrel.

### userland

Este termo originou-se da comunidade Unix, onde "userland" ou "userspace" refere-se a programas que são executados fora da kernel do sistema operacional. Mais recentemente, o termo foi popularizado na comunidade Node e Npm para distinguir entre os recursos disponíveis em "Node core" de pacotes publicado no registro do Npm pela maior comunidade "user" (Usuários).

Como Node, o Electron é focado em ter um pequeno conjunto de APIs que fornecem todos os primitivos necessários para o desenvolvimento de aplicativos de multi-plataformas desktop. Esta filosofia do projeto permite que o Electron permaneça uma ferramenta flexível sem ser excesivamente prescritiva sobre como deve ser usado. Userland permite que os usuários criar e compartilhar ferramentas que fornecem funcionalidade adicional em cima do que é disponível no "Núcleo".

### V8

V8 é o motor de JavaScript Open Source do Google. Ele está escrito em C++ e é usado no Google Chrome. V8 pode executar de modo autônomo, ou pode ser incorporado em qualquer aplicativo C++.

Electron forma o V8 como parte do Chromium e em seguida, aponta o Node ao V8 quando construindo.

Os números de versão V8 sempre correspondem aos do Google Chrome. Chrome 59 inclui V8 5.9, cromo 58 inclui V8 5.8 e etc.

- [developers.google.com/v8](https://developers.google.com/v8)
- [nodejs.org/api/v8.html](https://nodejs.org/api/v8.html)
- [docs/development/v8-development.md](development/v8-development.md)

### webview

`webview` são tags são usadas para incorporar conteúdo 'convidado' (como páginas de web externas) seu aplicativo de Electron. Eles são semelhantes a `iframe`s, mas diferem em que cada WebView é executado em um processo separado. Ele não tem a mesma permissões como sua página web e todas as interações entre seu aplicativo e conteúdo incorporado será assíncrono. Isso mantém seu aplicativo seguro do conteúdo incorporado.