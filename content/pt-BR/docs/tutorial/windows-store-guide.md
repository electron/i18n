# Guia para Windows Store

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

```sh
npm install -g electron-windows-store
```

## Etapa 1: Empacotar sua aplicação Electron

Empacote a aplicação utilizando [electron-packager](https://github.com/electron-userland/electron-packager) (ou uma ferramenta similar). Make sure to remove `node_modules` that you don't need in your final application, since any module you don't actually need will increase your application's size.

A saída deve ser algo mais ou menos assim:

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
```

## Etapa 2: Executando o electron-windows-store

Abra o PowerShell em modo de administrador e execute `electron-windows-store` com os parâmetros necessários, informando tanto o diretório de origem quanto o diretório de destino, o nome da aplicação, sua versão e a confirmação de que os `node_modules` devem estar achatados.

```powershell
electron-windows-store `
    --input-directory C:\myelectronapp `
    --output-directory C:\output\myelectronapp `
    --flatten true `
    --package-version 1.0.0.0 `
    --package-name myelectronapp
```

Assim que executada, a ferramenta faz seu trabalho: Ela aceita sua aplicação Electron como entrada, achatando os `node_modules`. Então, ela empacota sua aplicação como `app.zip`. Utilizando um instalador e um container Windows, a ferramenta cria um pacote AppX "expandido" - incluindo o Manifesto de Aplicação Windows (`AppXManifest.xml`), assim como o sistema de arquivos e sistema de registros virtual dentro da pasta de destino.

Assim que os arquivos AppX expandidos são criados, a ferramente utiliza o Windows App Packager (`MakeAppx.exe`) para criar um arquivo AppX único baseado em aqueles arquivos no disco. Finalmente, a ferramenta pode ser utilizada para criar um certificado confiável em seu computador para assinar a nova aplicação AppX. Com a aplicação AppX assinada, o CLI pode também instalar automaticamente a mesma em sua máquina.

## Etapa 3: Utilizando a aplicação AppX

Para conseguir executar sua aplicação, seus usuários precisarão do Windows 10 com sua então chamada "Atualização de Aniversário" - detalhes em como atualizar o Windows podem ser encontrados [aqui](https://blogs.windows.com/windowsexperience/2016/08/02/how-to-get-the-windows-10-anniversary-update).

Ao contrário de aplicações UWP tradicionais, aplicações empacotadas deverão seguir um processo de verificação manual, em qual você pode se increver [aqui](https://developer.microsoft.com/en-us/windows/projects/campaigns/desktop-bridge). In the meantime, all users will be able to install your package by double-clicking it, so a submission to the store might not be necessary if you're looking for an easier installation method. Em ambientes gerenciados (geralmente empresas) o `Add-AppxPackage`, que é um [Cmdlet do PowerShell, pode ser utilizado para instalá-lo de uma forma automatizada](https://technet.microsoft.com/en-us/library/hh856048.aspx).

Outra limitação importante é que a aplicação AppX compilada contém um executável win32 - e, portanto, não pode ser executado no Xbox, Hololens ou smartphones.

## Opcional: Adicionar recursos UWP utilizando uma BackgroundTask

Você pode parear sua aplicação Electron com um processo UWP em segundo plano, esta, pode fazer pleno uso dos recursos do Windows 10 - como notificações em push, Cortana ou Live Tiles.

Para verificar como uma aplicação Electron utiliza um processo em segundo plano para enviar notificações e Live Tiles, [confira a amostra fornecida pela própria Microsoft](https://github.com/felixrieseberg/electron-uwp-background).

## Opcional: Converter utilizando virtualização de Container

Para gerar a aplicação AppX, o `electron-windows-store` CLI utiliza um template que deve funcionar para a maioria das aplicações Electron. De qualquer maneira, se você estiver utilizando um instalador customizado ou você tiver algum problema com o pacote gerado, você pode tentar criar um pacote utilizando compilação com um Container Windows. Neste modo, o CLI irá instalar e rodar sua aplicação em um Container Windows cru para determinar quais modificações sua aplicação sua aplicação esta fazendo no sistema operacional.

Antes de executar o CLI pela primeira vez, você deverá configurar o "Windows Desktop App Converter". Isso deverá levar alguns minutos, mas não se preocupe - você só terá de fazer isso uma vez. Faça o Download do Desktop App Converter [aqui](https://docs.microsoft.com/en-us/windows/uwp/porting/desktop-to-uwp-run-desktop-app-converter). Você receberá dois arquivos: `DesktopAppConverter.zip` e `BaseImage-14316.wim`.

1. Descompacte `DesktopAppConverter.zip`. De um PowerShell com poderes administrativos (aberto com "executar como Administrador", certifique-se de que a política de execução do seu sistema nos permita executar tudo que temos a intenção chamando `Set-ExecutionPolicybypass`.
2. Então, execute a instação do Desktop App Converter, passando a localização da Windows Base Image (baixada como `BaseImage-14316.wim`), chamando `.\DesktopAppConverter.ps1-Setup-BaseImage.\BaseImage-14316.wim`.
3. Se, ao executar o comando acima, seja requisitado reiniciar o computador, reinicie e execute o comando novamente após o computador reiniciar.

Assim que instalação estiver bem sucedida, você pode seguir e compilar sua aplicação Electron.