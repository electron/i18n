# Guia para Mac App Store

Desde a v0.34.0, Electron permite o envio de aplicativos empacotados para a Mac App Store (MAS). Este guia fornece informações sobre como enviar seu aplicativo e as limitações da compilação do MAS.

**Nota:** Enviar um aplicativo para a Mac App Store requer a inscrição no programa [da Apple Developer][developer-program], que custa dinheiro.

## Como enviar seu aplicativo

As etapas a seguir apresentam uma maneira simples de enviar seu app para Mac App Store. No entanto, essas etapas não garantem que seu aplicativo será aprovado pela Apple; você ainda precisa ler o guia de</a> de
da Apple sobre como atender aos requisitos da Mac App Store.</p> 



### Obter certificado

Para enviar seu aplicativo para a Mac App Store, primeiro você deve obter um certificado da Apple. Você pode seguir esses guias [existentes][nwjs-guide] na web.



### Obter ID da equipe

Antes de assinar o seu aplicativo, você precisa conhecer o ID da equipe da sua conta. Para localizar seu ID da equipe, entre no [Apple Developer Center](https://developer.apple.com/account/), e clique em 'Membro' na barra lateral. Sua ID da equipe aparece na seção Informações da Adesão abaixo do nome da equipe.



### Assine seu aplicativo

Após terminar o trabalho de preparação, você pode empacotar seu aplicativo seguindo [Distribuição de Aplicação](application-distribution.md), , e, em seguida, prossiga para assinar o seu aplicativo.

Primeiro, você precisa adicionar uma chave</code> ElectronTeamID `para as informações do seu aplicativo <code>. lista`, que tem sua ID de equipe como seu valor:



```xml
<plist version="1.0">
<dict>
  ...
  <key>ElectronTeamID</key>
  <string>TEAM_ID</string>
</dict>
</plist>
```


Depois, você precisa preparar três ficheiros com direitos.

`child.plist`:



```xml
<?xml version="1.0" codificação="UTF-8"?>
<! DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
  <dict>
    <key>com.apple.security.app-sandbox</key>
    <true/>
    <key>com.apple.security.herdar</key>
    <true/>
  </dict>
</plist>
```


`pai.plist`:



```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-/Apple//DTD PLIST 1.0///EN" "http://www. pple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
  <dict>
    <key>com.apple.security. pp-sandbox</key>
    <true/>
    <key>com.apple.security. pplication-groups</key>
    <array>
      <string>TEAM_ID. our.bundle.id</string>
    </array>
  </dict>
</plist>
```


`loginhelper.plist`:



```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-/Apple//DTD PLIST 1.0///EN" "http://www.apple.com/DTDs/PropertyList-1.0. td">
<plist version="1.0">
  <dict>
    <key>com.apple.security. sandbox de pp-box</key>
    <true/>
  </dict>
</plist>
```


Você precisa substituir `TEAM_ID` pelo seu ID de equipe, e substituir `your.bundle.id` pelo Pacote de ID do seu aplicativo.

E então assine seu aplicativo com o seguinte script:



```sh
#!/bin/bash

# Nome do seu aplicativo.
APP="YourApp"
# O caminho do seu aplicativo para assinar.
APP_PATH="/path/to/YourApp.app"
# O caminho para o local que você deseja colocar o pacote assinado.
RESULT_PATH="~/Desktop/$APP.pkg"
# O nome dos certificados que você solicitou.
APP_KEY="Aplicativo para Desenvolvedor Mac de terceiros: Nome da Empresa (APPIDENTITY)"
INSTALLER_KEY="Instalador de Desenvolvedor de Terceiros do Mac: Nome da Empresa (APPIDENTITY)"
# O caminho dos seus arquivos de plano.
CHILD_PLIST="/path/to/child.plist"
PARENT_PLIST="/path/to/parent.plist"
LOGINHELPER_PLIST="/path/to/loginhelper.plist"

FRAMEWORKS_PATH="$APP_PATH/Contents/Frameworks"

codesign -s "$APP_KEY" -f --direitos "$CHILD_PLIST"$FRAMEWORKS_PATH/Electron Framework.framework/Versions/A/Electron Framework"
codesign -s "$APP_KEY" -f - direitos "$CHILD_PLIST"$FRAMEWORKS_PATH/Electron Framework.framework/Versions/A/Libraryes/libffmpeg.dylib"
codesign -s "$APP_KEY" -f --entitlements "$CHILD_PLIST"$FRAMEWORKS_PATH/Electron Framework.framework/Versions/A/Libraryes/libnode.dylib"
codesign -s "$APP_KEY" -f --entitlements "$CHILD_PLIST"$FRAMEWORKS_PATH/Electron Framework.framework"
codesign -s "$APP_KEY" -f - entitlements "$CHILD_PLIST"$FRAMEWORKS_PATH/$APP Helper.app/Contents/MacOS/$APP Helper"
codinome -s "$APP_KEY" -f - direitos "$CHILD_PLIST"$FRAMEWORKS_PATH/$APP Helper.app/"
códigos de código - s "$APP_KEY" -f - direitos "$LOGINHELPER_PLIST"$APP_PATH/Contents/Library/LoginItems/$APP Login Helper.app/Contents/MacOS/$APP Login Ajuda
"codesign -s "$APP_KEY" -f --entitlements "$LOGINHELPER_PLIST"$APP_PATH/Contents/Library/LoginItems/$APP Login Helper.app/"
codesign -s "$APP_KEY" -f - direitos "$CHILD_PLIST"$APP_PATH/ Contents /MacOS/$APP"
codesign -s "$APP_KEY" -f - direitos "$PARENT_PLIST" "$APP_PATH"

productbuild --component "$APP_PATH" /Applications - signe "$INSTALLER_KEY"$RESULT_PATH"
```


Se você é novo no sandboxing de aplicativos sob o macOS, você também deve ler através de [Apple habilitando o aplicativo Sandbox][enable-app-sandbox] ter uma ideia básica, então adicionar chaves para as permissões necessárias pelo seu aplicativo aos arquivos de direitos.

Além de assinar manualmente seu aplicativo, você também pode optar por usar o módulo</a> de sinal de elétron-osx para fazer o trabalho.</p> 



#### Assinar Módulos Nativos

Módulos nativos utilizados no seu aplicativo também precisam ser assinados. Se estiver usando o electron-osx-sign, certifique-se de incluir o caminho para os binários compilados na lista de argumentos :



```sh
electron-osx-sign YourApp.app YourApp.app/Contents/Resources/app/node_modules/nativemodule/build/release/nativemodule
```


Também note que módulos nativos podem ter produzidos arquivos intermediários que não devem ser incluídos (já que eles também precisariam ser assinados). Se você usar [][electron-packager] de pacotes eletrônicos antes da versão 8.1.0, adicione `--ignore=.+\.o$` ao seu passo de compilação para ignorar esses arquivos. Versões 8.1.0 e mais tarde ignoram esses arquivos por padrão.



### Envie seu aplicativo

Depois de assinar seu aplicativo, você pode usar o Application Loader para carregá-lo no iTunes Connect para processamento, certificando-se de que você [criou um][create-record] de registro antes de fazer o upload.



### Envie seu aplicativo para análise

Após essas etapas, você pode [enviar seu aplicativo para revisão][submit-for-review].



## Limitações de compilação do MAS

A fim de satisfazer todos os requisitos para sandboxing de aplicativos, os seguintes módulos foram desativados na compilação MAS:

* `crashReporter`
* `autoUpdater`

e os seguintes comportamentos foram alterados:

* Captura de vídeo pode não funcionar para algumas máquinas.
* Certos recursos de acessibilidade podem não funcionar.
* Os aplicativos não estarão cientes das alterações de DNS.

Além disso, devido ao uso do sandboxing de aplicativos, os recursos que podem ser acessados por aplicativo são estritamente limitados; você pode ler [app Sandboxing][app-sandboxing] para mais informações.



### Título adicional

Dependendo de quais Electron APIs seu aplicativo usa, você pode precisar adicionar titularidades aos seus pais `. liste` arquivo para poder usar essas APIs da compilação da App Store do seu aplicativo.



#### Acesso à rede

Permitir conexões de rede de saída para permitir que seu aplicativo conecte-se a um servidor:



```xml
<key>com.apple.security.network.client</key>
<true/>
```


Permitir conexões de rede recebidas para permitir que seu aplicativo abra uma rede escutando soquete:



```xml
<key>com.apple.security.network.server</key>
<true/>
```


Consulte a documentação [Habilitando o acesso à rede][network-access] para obter mais detalhes .



#### dialog.showOpenDialog



```xml
<key>com.apple.security.files.user-selected.read-only</key>
<true/>
```


Consulte a [habilitando a documentação de acesso ao arquivo selecionada pelo usuário][user-selected] para mais detalhes.



#### dialog.showSaveDialog



```xml
<key>com.apple.security.files.user-selected.read-write</key>
<true/>
```


Consulte a [habilitando a documentação de acesso ao arquivo selecionada pelo usuário][user-selected] para mais detalhes.



## Algoritmos criptográficos usados pelo Electron

Dependendo dos países em que você esteja liberando seu aplicativo, você pode ser obrigado a fornecer informações sobre os algoritmos criptográficos usados em seu software. Consulte os [documentos de conformidade de exportação de criptografia][export-compliance] para mais informações.

O Electron usa os seguintes algoritmos criptográficos:

* AES - [NIST SP 800-38A](https://csrc.nist.gov/publications/nistpubs/800-38a/sp800-38a.pdf), [NIST SP 800-38D](https://csrc.nist.gov/publications/nistpubs/800-38D/SP-800-38D.pdf), [RFC 3394](https://www.ietf.org/rfc/rfc3394.txt)
* HMAC - [FIPS 198-1](https://csrc.nist.gov/publications/fips/fips198-1/FIPS-198-1_final.pdf)
* ECDSA - ANS X9.62–2005
* ECDH - ANS X9.63–2001
* HKDF - [NIST SP 800-56C](https://csrc.nist.gov/publications/nistpubs/800-56C/SP-800-56C.pdf)
* PBKDF2 - [RFC 2898](https://tools.ietf.org/html/rfc2898)
* RSA - [RFC 3447](https://www.ietf.org/rfc/rfc3447)
* SHA - [FIPS 180-4](https://csrc.nist.gov/publications/fips/fips180-4/fips-180-4.pdf)
* Blowfish - https://www.schneier.com/cryptography/blowfish/
* LINGOTAMENTO - [RFC 2144](https://tools.ietf.org/html/rfc2144), [RFC 2612](https://tools.ietf.org/html/rfc2612)
* DES - [FIPS 46-3](https://csrc.nist.gov/publications/fips/fips46-3/fips46-3.pdf)
* DH - [RFC 2631](https://tools.ietf.org/html/rfc2631)
* DSA - [ANSI X9.30](https://webstore.ansi.org/RecordDetail.aspx?sku=ANSI+X9.30-1%3A1997)
* CE - [SEC 1](https://www.secg.org/sec1-v2.pdf)
* IDEA - Livro "No Design e Segurança das Cifras de Bloco" por X. Lai
* MD2 - [RFC 1319](https://tools.ietf.org/html/rfc1319)
* MD4 - [RFC 6150](https://tools.ietf.org/html/rfc6150)
* MD5 - [RFC 1321](https://tools.ietf.org/html/rfc1321)
* MDC2 - [ISO/IEC 10118-2](https://wiki.openssl.org/index.php/Manual:Mdc2(3))
* RC2 - [RFC 2268](https://tools.ietf.org/html/rfc2268)
* RC4 - [RFC 4345](https://tools.ietf.org/html/rfc4345)
* RC5 - https://people.csail.mit.edu/rivest/Rivest-rc5rev.pdf
* RIPEMD - [ISO/IEC 10118-3](https://webstore.ansi.org/RecordDetail.aspx?sku=ISO%2FIEC%2010118-3:2004)

[developer-program]: https://developer.apple.com/support/compare-memberships/
[nwjs-guide]: https://github.com/nwjs/nw.js/wiki/Mac-App-Store-%28MAS%29-Submission-Guideline#first-steps
[enable-app-sandbox]: https://developer.apple.com/library/ios/documentation/Miscellaneous/Reference/EntitlementKeyReference/Chapters/EnablingAppSandbox.html
[create-record]: https://developer.apple.com/library/ios/documentation/LanguagesUtilities/Conceptual/iTunesConnect_Guide/Chapters/CreatingiTunesConnectRecord.html
[electron-packager]: https://github.com/electron/electron-packager
[electron-packager]: https://github.com/electron/electron-packager
[submit-for-review]: https://developer.apple.com/library/ios/documentation/LanguagesUtilities/Conceptual/iTunesConnect_Guide/Chapters/SubmittingTheApp.html
[app-sandboxing]: https://developer.apple.com/app-sandboxing/
[export-compliance]: https://help.apple.com/app-store-connect/#/devc3f64248f
[user-selected]: https://developer.apple.com/library/mac/documentation/Miscellaneous/Reference/EntitlementKeyReference/Chapters/EnablingAppSandbox.html#//apple_ref/doc/uid/TP40011195-CH4-SW6
[network-access]: https://developer.apple.com/library/ios/documentation/Miscellaneous/Reference/EntitlementKeyReference/Chapters/EnablingAppSandbox.html#//apple_ref/doc/uid/TP40011195-CH4-SW9
