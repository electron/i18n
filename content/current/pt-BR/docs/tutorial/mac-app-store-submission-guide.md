# Guia para Mac App Store

Desde a v0.34.0, Electron permite o envio de aplicativos empacotados para a Mac App Store (MAS). Este guia fornece informações sobre como enviar seu aplicativo e as limitações da compilação do MAS.

**Nota:** Enviar um aplicativo para Mac App Store requer a inscrição no [Apple Developer Program](https://developer.apple.com/support/compare-memberships/), que custa dinheiro.

## Como enviar seu aplicativo

As etapas a seguir apresentam uma maneira simples de enviar seu app para Mac App Store. No entanto, esses passos não garantem que seu aplicativo seja aprovado pela Apple; você ainda precisa ler o [envio do seu aplicativo](https://developer.apple.com/library/mac/documentation/IDEs/Conceptual/AppDistributionGuide/SubmittingYourApp/SubmittingYourApp.html) da Apple sobre como atender os requisitos da Mac App Store.

### Obter certificado

Para enviar seu aplicativo para a Mac App Store, primeiro você deve obter um certificado da Apple. Você pode seguir esses [guias existentes](https://github.com/nwjs/nw.js/wiki/Mac-App-Store-%28MAS%29-Submission-Guideline#first-steps) na web.

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
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
  <dict>
    <key>com.apple.security.app-sandbox</key>
    <true/>
    <key>com.apple.security.inherit</key>
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
APP="SeuApp"
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

codesign -s "$APP_KEY" -f --entitlements "$CHILD_PLIST" "$FRAMEWORKS_PATH/Electron Framework.framework/Versions/A/Electron Framework"
codesign -s "$APP_KEY" -f --entitlements "$CHILD_PLIST" "$FRAMEWORKS_PATH/Electron Framework.framework/Versions/A/Libraries/libffmpeg.dylib"
codesign -s "$APP_KEY" -f --entitlements "$CHILD_PLIST" "$FRAMEWORKS_PATH/Electron Framework.framework/Versions/A/Libraries/libnode.dylib"
codesign -s "$APP_KEY" -f --entitlements "$CHILD_PLIST" "$FRAMEWORKS_PATH/Electron Framework.framework"
codesign -s "$APP_KEY" -f --entitlements "$CHILD_PLIST" "$FRAMEWORKS_PATH/$APP Helper.app/Contents/MacOS/$APP Helper"
codesign -s "$APP_KEY" -f --entitlements "$CHILD_PLIST" "$FRAMEWORKS_PATH/$APP Helper.app/"
codesign -s "$APP_KEY" -f --entitlements "$LOGINHELPER_PLIST" "$APP_PATH/Contents/Library/LoginItems/$APP Login Helper.app/Contents/MacOS/$APP Login Helper"
codesign -s "$APP_KEY" -f --entitlements "$LOGINHELPER_PLIST" "$APP_PATH/Contents/Library/LoginItems/$APP Login Helper.app/"
codesign -s "$APP_KEY" -f --entitlements "$CHILD_PLIST" "$APP_PATH/Contents/MacOS/$APP"
codesign -s "$APP_KEY" -f --entitlements "$PARENT_PLIST" "$APP_PATH"

productbuild --component "$APP_PATH" /Applications --sign "$INSTALLER_KEY" "$RESULT_PATH"
```

Se você for novo no macOS da sandboxing, você também deve ler A [Ativando o App Sandbox](https://developer.apple.com/library/ios/documentation/Miscellaneous/Reference/EntitlementKeyReference/Chapters/EnablingAppSandbox.html) para ter uma ideia básica, então adicione chaves para as permissões necessárias ao seu aplicativo para os ficheiros titulares.

Além de assinar manualmente seu aplicativo, você também pode optar por usar o módulo [electron-osx-sign](https://github.com/electron-userland/electron-osx-sign) para fazer o trabalho.

#### Assinar Módulos Nativos

Módulos nativos utilizados no seu aplicativo também precisam ser assinados. Se estiver usando o electron-osx-sign, certifique-se de incluir o caminho para os binários compilados na lista de argumentos :

```sh
electron-osx-sign YourApp.app YourApp.app/Contents/Resources/app/node_modules/nativemodule/build/release/nativemodule
```

Também note que módulos nativos podem ter produzidos arquivos intermediários que não devem ser incluídos (já que eles também precisariam ser assinados). Se você usar [electron-packager](https://github.com/electron/electron-packager) antes da versão 8.1.0, adicione `--ignore=.+\.o$` para a etapa de compilação para ignorar esses arquivos. Versões 8.1.0 e mais tarde ignoram esses arquivos por padrão.

### Envie seu aplicativo

Após assinar seu aplicativo, você pode usar o Carregador de Aplicativos para enviá-lo para o iTunes Conectar-se para processamento, certifica-se de que você [criou um registro](https://developer.apple.com/library/ios/documentation/LanguagesUtilities/Conceptual/iTunesConnect_Guide/Chapters/CreatingiTunesConnectRecord.html) antes de fazer o upload.

### Envie seu aplicativo para análise

Após estes passos, você pode [enviar seu aplicativo para análise](https://developer.apple.com/library/ios/documentation/LanguagesUtilities/Conceptual/iTunesConnect_Guide/Chapters/SubmittingTheApp.html).

## Limitações de compilação do MAS

A fim de satisfazer todos os requisitos para sandboxing de aplicativos, os seguintes módulos foram desativados na compilação MAS:

* `crashReporter`
* `autoUpdater`

e os seguintes comportamentos foram alterados:

* Captura de vídeo pode não funcionar para algumas máquinas.
* Certos recursos de acessibilidade podem não funcionar.
* Os aplicativos não estarão cientes das alterações de DNS.

Além disso, devido ao uso de sandbox de aplicativos, os recursos que podem ser acessados por a aplicação são estritamente limitados; você pode ler o [App Sandboxing](https://developer.apple.com/app-sandboxing/) para obter mais informações.

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

Consulte a [Habilitar a documentação](https://developer.apple.com/library/ios/documentation/Miscellaneous/Reference/EntitlementKeyReference/Chapters/EnablingAppSandbox.html#//apple_ref/doc/uid/TP40011195-CH4-SW9) de acesso à rede para mais detalhes .

#### dialog.showOpenDialog

```xml
<key>com.apple.security.files.user-selected.read-only</key>
<true/>
```

Veja a [Habilitando a documentação de Acesso de Arquivos Selecionados por Usuário](https://developer.apple.com/library/mac/documentation/Miscellaneous/Reference/EntitlementKeyReference/Chapters/EnablingAppSandbox.html#//apple_ref/doc/uid/TP40011195-CH4-SW6) para mais detalhes.

#### dialog.showSaveDialog

```xml
<key>com.apple.security.files.user-selected.read-write</key>
<true/>
```

Veja a [Habilitando a documentação de Acesso de Arquivos Selecionados por Usuário](https://developer.apple.com/library/mac/documentation/Miscellaneous/Reference/EntitlementKeyReference/Chapters/EnablingAppSandbox.html#//apple_ref/doc/uid/TP40011195-CH4-SW6) para mais detalhes.

## Algoritmos criptográficos usados pelo Electron

Dependendo dos países em que você esteja liberando seu aplicativo, você pode ser obrigado a fornecer informações sobre os algoritmos criptográficos usados em seu software. Veja a [documentação de conformidade com a criptografia](https://help.apple.com/app-store-connect/#/devc3f64248f) para mais informações.

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
* EC - [SEC 1](https://www.secg.org/sec1-v2.pdf)
* IDEA - Livro "No Design e Segurança das Cifras de Bloco" por X. Lai
* MD2 - [RFC 1319](https://tools.ietf.org/html/rfc1319)
* MD4 - [RFC 6150](https://tools.ietf.org/html/rfc6150)
* MD5 - [RFC 1321](https://tools.ietf.org/html/rfc1321)
* MDC2 - [ISO/IEC 10118-2](https://wiki.openssl.org/index.php/Manual:Mdc2(3))
* RC2 - [RFC 2268](https://tools.ietf.org/html/rfc2268)
* RC4 - [RFC 4345](https://tools.ietf.org/html/rfc4345)
* RC5 - https://people.csail.mit.edu/rivest/Rivest-rc5rev.pdf
* RIPEMD - [ISO/IEC 10118-3](https://webstore.ansi.org/RecordDetail.aspx?sku=ISO%2FIEC%2010118-3:2004)
