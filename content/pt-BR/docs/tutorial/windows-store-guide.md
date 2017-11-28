# Guia para a Windows Store

Com o Windows 10, o bom e velho executável win32 ganhou uma nova irmã: A Plataforma Universal do Windows. O novo formato `.appx` não apenas disponibiliza várias APIs poderosas como Cortana e Notificações Push, mas através da Windows Store, também simplifica a instalação e atualização das aplicações.

A Microsoft [desenvolveu uma ferramenta que compila aplicações Electron em formato `.appx`](https://github.com/catalystcode/electron-windows-store), possibilitando que desenvolvedores utilizem algumas das facilidades no novo modelo de aplicação. Este modelo explica como utilizá-lo e quais as capacidades e limitações de uma aplicação Electron AppX.

## Contexto e Requisitos

A "Atualização de Aniversário" do Windows 10 é capaz de rodar binários win32 `.exe` os executando juntamente com um sistema de arquivos e de registros virtualizados. Ambos são criados durante a compilação ao executar a aplicação e o instalador dentro de um Container Windows, permitindo que o Windows identifique exatamente quais modificações ao sistema operacional são realizadas durante a instalação. Parear o executável com um sistema de arquivos e de registros virtualizados permite com que o Windows habilite a instalação e desinstalação de um clique.

Adicionalmente, o exe é executado dentro do modelo appx, ou seja, ele pode utilizar muitas das APIs disponívels para a Plataforma Universal do Windows. Para ganhar ainda mais recursos, uma aplicação Electron pode parear com um processo em segundo plano da UWP (Plataforma Universal do Windows), que é executado juntamente com o `exe`, ou seja, uma espécie de ajudante para rodar processos em segundo plano, receber notificações push ou para se comunicar com outras aplicações UWP.

Para compilar qualquer aplicação Electron já existente, certifique-se de que você está de acordo com os seguintes requisitos:

* Atualização de Aniversário do Windows 10 (lançada em 2 de agosto de 2016)
* SDK do Windows 10, [disponível para download aqui](https://developer.microsoft.com/en-us/windows/downloads/windows-10-sdk)
* Pelo menos Node na versão 4 (para verificar, execute o comando `node -v`)

Então, instale o `electron-windows-store` CLI:

    npm install -g electron-windows-store
    

## Etapa 1: Empacotar sua aplicação Electron

Empacote a aplicação utilizando [electron-packager](https://github.com/electron-userland/electron-packager) (ou uma ferramenta similar). Certifique-se de remover `node_modules` que você não precisa em sua aplicação final, sendo que qualquer módulo que você realmente não precisar vai apenas aumentar o tamanho de sua aplicação.

A saída deve ser algo mais ou menos assim:

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
    │   ├── am.pak
    │   ├── ar.pak
    │   ├── [...]
    ├── natives_blob.bin
    ├── node.dll
    ├── resources
    │   ├── app
    │   └── atom.asar
    ├── snapshot_blob.bin
    ├── squirrel.exe
    └── ui_resources_200_percent.pak
    

## Etapa 2: Executando o electron-windows-store

Abra o PowerShell em modo de administrador e execute `electron-windows-store` com os parâmetros necessários, informando tanto o diretório de origem quanto o diretório de destino, o nome da aplicação, sua versão e a confirmação de que os `node_modules` devem estar achatados.

    electron-windows-store `
        --input-directory C:\myelectronapp `
        --output-directory C:\output\myelectronapp `
        --flatten true `
        --package-version 1.0.0.0 `
        --package-name myelectronapp
    

Assim que executada, a ferramenta faz seu trabalho: Ela aceita sua aplicação Electron como entrada, achatando os `node_modules`. Então, ela empacota sua aplicação como `app.zip`. Utilizando um instalador e um container Windows, a ferramenta cria um pacote AppX "expandido" - incluindo o Manifesto de Aplicação Windows (`AppXManifest.xml`), assim como o sistema de arquivos e sistema de registros virtual dentro da pasta de destino.

Assim que os arquivos AppX expandidos são criados, a ferramente utiliza o Windows App Packager (`MakeAppx.exe`) para criar um arquivo AppX único baseado em aqueles arquivos no disco. Finalmente, a ferramenta pode ser utilizada para criar um certificado confiável em seu computador para assinar a nova aplicação AppX. Com a aplicação AppX assinada, o CLI pode também instalar automaticamente a mesma em sua máquina.

## Etapa 3: Utilizando a aplicação AppX

In order to run your package, your users will need Windows 10 with the so-called "Anniversary Update" - details on how to update Windows can be found [here](https://blogs.windows.com/windowsexperience/2016/08/02/how-to-get-the-windows-10-anniversary-update).

In opposition to traditional UWP apps, packaged apps currently need to undergo a manual verification process, for which you can apply [here](https://developer.microsoft.com/en-us/windows/projects/campaigns/desktop-bridge). In the meantime, all users will be able to just install your package by double-clicking it, so a submission to the store might not be necessary if you're simply looking for an easier installation method. In managed environments (usually enterprises), the `Add-AppxPackage` [PowerShell Cmdlet can be used to install it in an automated fashion](https://technet.microsoft.com/en-us/library/hh856048.aspx).

Another important limitation is that the compiled AppX package still contains a win32 executable - and will therefore not run on Xbox, HoloLens, or Phones.

## Optional: Add UWP Features using a BackgroundTask

You can pair your Electron app up with an invisible UWP background task that gets to make full use of Windows 10 features - like push notifications, Cortana integration, or live tiles.

To check out how an Electron app that uses a background task to send toast notifications and live tiles, [check out the Microsoft-provided sample](https://github.com/felixrieseberg/electron-uwp-background).

## Optional: Convert using Container Virtualization

To generate the AppX package, the `electron-windows-store` CLI uses a template that should work for most Electron apps. However, if you are using a custom installer, or should you experience any trouble with the generated package, you can attempt to create a package using compilation with a Windows Container - in that mode, the CLI will install and run your application in blank Windows Container to determine what modifications your application is exactly doing to the operating system.

Before running the CLI for the first time, you will have to setup the "Windows Desktop App Converter". This will take a few minutes, but don't worry - you only have to do this once. Download and Desktop App Converter from [here](https://www.microsoft.com/en-us/download/details.aspx?id=51691). You will receive two files: `DesktopAppConverter.zip` and `BaseImage-14316.wim`.

1. Unzip `DesktopAppConverter.zip`. From an elevated PowerShell (opened with "run as Administrator", ensure that your systems execution policy allows us to run everything we intend to run by calling `Set-ExecutionPolicy bypass`.
2. Then, run the installation of the Desktop App Converter, passing in the location of the Windows base Image (downloaded as `BaseImage-14316.wim`), by calling `.\DesktopAppConverter.ps1 -Setup -BaseImage .\BaseImage-14316.wim`.
3. If running the above command prompts you for a reboot, please restart your machine and run the above command again after a successful restart.

Once installation succeeded, you can move on to compiling your Electron app.