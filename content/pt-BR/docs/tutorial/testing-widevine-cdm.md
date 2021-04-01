# Testando Widevine CCDM

No Electron você pode usar a biblioteca Widevine CDM inclusa no navegador Chrome.

Módulos de descriptografia de conteúdo Widevine (CDMs) são como os serviços de streaming protegem conteúdo usando vídeo HTML5 para navegadores da web sem depender de um plugin NPAPI como Flash ou Silverlight. Widevine support is an alternative solution for streaming services that currently rely on Silverlight for playback of DRM-protected video content. Isso permitirá que sites mostrem conteúdo de vídeo protegido por DRM no Firefox sem o uso de plugins NPAPI. O Widevine CDM é executado num sandbox de código aberto que oferece melhor segurança de usuário do que os plugins NPAPI.

#### Nota sobre VMP

As of [`Electron v1.8.0 (Chrome v59)`](https://electronjs.org/releases#1.8.1), the below steps are may only be some of the necessary steps to enable Widevine; any app on or after that version intending to use the Widevine CDM may need to be signed using a license obtained from [Widevine](https://www.widevine.com/) itself.

Por [Widevine](https://www.widevine.com/):

> Chrome 59 (e posterior) inclui suporte para Caminho de Mídia Verificada (VMP). O VMP fornece um método para verificar a autenticidade de uma plataforma do dispositivo. Para as implantações do navegador , isto irá fornecer um sinal adicional para determinar se uma implementação baseada no navegador é confiável e segura.
> 
> O guia de integração de proxy foi atualizado com informações sobre o VMP e como emitir licenças.
> 
> O Widevine recomenda nossas integrações com navegadores (fornecedores e aplicativos baseados no navegador) adicionam suporte à VMP.

Para ativar a reprodução de vídeo com esta nova restrição, [castLabs](https://castlabs.com/open-source/downstream/) criou um [fork](https://github.com/castlabs/electron-releases) que implementou as mudanças necessárias para permitir que o Widevine seja jogado em uma aplicação Electron se tiver obtido as licenças necessárias de widevine.

## Obtendo a biblioteca

Abra `chrome://components/` no navegador Chrome, encontre `Módulo de descriptografia de conteúdo Widevine` e certifique-se de que está atualizado então você pode encontrar os arquivos de biblioteca a partir do diretório do aplicativo.

### No Windows

O arquivo de biblioteca `widevinecdm.dll` estará abaixo de `Arquivos de programas(x86)/Google/Chrome/Application/CHROME_VERSION/WidevineCdm/_platform_especific/win_(x86├x64)/` diretório.

### No macOS

O arquivo de biblioteca `libwidevinecdm.dylib` estará sob `/Applications/Google Chrome.app/Contents/Versions/CHROME_VERSION/Google Chrome Framework.framework/Versions/A/Libraries/WidevineCdm/_platform_specific/mac_(x86➤ x64)/` diretório.

**Nota:** Certifique-se de que a versão do chrome usada pelo Electron é maior ou igual ao valor `min_chrome_version` do componente do Chrome widevine cdm. O valor pode ser encontrado no `manifest.json` abaixo do diretório `WidevineCdm`.

## Usando a biblioteca

Depois de obter os arquivos da biblioteca, você deve passar o caminho para o arquivo com a opção `--widevine-cdm-path` linha de comando, e a versão da biblioteca com o interruptor `--widevine-cdm-version`. A linha de comando deve ser passada antes do `evento pronto` do módulo `aplicação` ser emitido.

Exemplo de código:

```javascript
const { app, BrowserWindow } = require('electron')

// Você tem que passar o diretório que contém a biblioteca widevine aqui, é
// * `libwidevinecdm. ylib` no macOS,
// * `widevinecdm.dll` no Windows.
app.commandLine.appendSwitch('widevine-cdm-path', '/path/to/widevine_library')
// A versão do plugin pode ser obtida a partir da página `chrome://components` no Chrome.
app.commandLine.appendSwitch('widevine-cdm-version', '1.4.8.866')

let win = null
app.whenReady().then(() => {
  win = new BrowserWindow()
  win.show()
})
```

## Verificando suporte Widevine CDM

Para verificar se o widevinine funciona, você pode usar as seguintes maneiras:

* Abra https://shaka-player-demo.appspot.com/ e carregar um manifesto que usa `Widevine`.
* Abra http://www.dash-player.com/demo/drm-test-area/, verifique se a página diz `bitdash usa Widevine no seu navegador`, e então reproduza o vídeo.
