# Podepsání kódu

Podpis kódu je bezpečnostní technologie, kterou používáte k potvrzení, že jste vytvořili aplikaci .

Na macOS systém umí detekovat jakékoliv změny aplikace, ať už je změna spuštěna omylem nebo škodlivým kódem.

V systému Windows systém přiřadí úroveň důvěry vašemu kódu k podepisování certifikátu , který pokud nemáte, nebo pokud je vaše důvěryhodnost nízká, způsobí bezpečnostní dialogová okna, která se budou zobrazovat při používání vaší aplikace.  Trust level buduje v průběhu času, takže je lepší začít podepisovat kód co nejdříve.

I když je možné distribuovat nepodepsané aplikace, není to doporučeno. Windows i macOS ve výchozím nastavení zabrání stahování nebo spuštění nepodepsaných aplikací. Počínaje macOS Catalina (verze 10.15), musí uživatelé procházet několika manuálními kroky k otevření nepodepsaných aplikací.

![macOS Catalina Gatekeeper varování: Aplikaci nelze otevřít, protože
vývojář nelze ověřit](../images/gatekeeper.png)

Jak vidíte, uživatelé dostávají dvě možnosti: přesuňte aplikaci přímo do koše nebo zrušte její spuštění. Nechcete, aby uživatelé viděli tento dialog.

Pokud budujete Electron aplikaci, kterou hodláte balit a distribuovat, měla by být označena kódem.

# Podepisuji & notarizuji macOS sestavení

Správná příprava macOS aplikací pro vydání vyžaduje dva kroky: Zaprvé, aplikace musí být označena kódem. Pak musí být aplikace nahrána do Apple pro proces nazvaný "notarizace", kde automatizované systémy dále ověří, že vaše aplikace nedělá nic, aby ohrozila její uživatele.

Chcete-li spustit proces, ujistěte se, že splníte požadavky pro podepsání a notarizaci vaší aplikace:

1. Zaregistrujte se do [programu vývojáře Apple](https://developer.apple.com/programs/) (vyžaduje roční poplatek)
2. Stáhnout a nainstalovat [Xcode](https://developer.apple.com/xcode) - to vyžaduje počítač s macOS
3. Vygenerovat, stahovat a nainstalovat [podpisové certifikáty](https://github.com/electron/electron-osx-sign/wiki/1.-Getting-Started#certificates)

Electronův ekosystém upřednostňuje konfiguraci a svobodu, takže existuje více způsobů, jak podepsat vaši aplikaci a notarizovat.

## `elektronová kovárna`

Pokud používáte Electronův oblíbený nástroj pro sestavení, vyžaduje vaše aplikace podpis a notarizaci několik doplňků k vaší konfiguraci. [Forge](https://electronforge.io) je kolekce oficiálních nástrojů Electronu pomocí [`elektronického balíku`], [`elektronická osx-značka`] a [`elektronická`] pod háčkem.

Podívejme se na příklad konfigurace se všemi požadovanými poli. Ne všechny z nich jsou povinné: nástroje budou dostatečně chytré, aby automaticky našly vhodnou `identitu`, Například doporučujeme, abyste byli explicitní.

```json
{
  "name": "my-app",
  "version": "0.0. ",
  "config": {
    "forge": {
      "packagerConfig": {
        "osxSign": {
          "identity": "Export ID Application: Felix Rieseberg (LT94ZKYDCJ)",
          "ztížené runtime": true,
          "nároky": "nároky. list",
          "entitlements-inherit": "entitlements. list,
          "signature-flags": "library"
        },
        "osxNotarize": {
          "appleId": "felix@felix. un",
          "appleIdPassword": "my-apple-id-heslo",
        }
      }
    }
  }
}
```

`plist` soubor, na který se zde odkazuje, potřebuje následující oprávnění pro macOS, pro zajištění bezpečnostních mechanismů Apple, že vaše aplikace dělá tyto věci bez ohledu na újmu:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www. pple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
  <dict>
    <key>com.apple.security.cs. llow-jit</key>
    <true/>
    <key>com.apple.security.cs. llow-unsigned-executable-memory</key>
    <true/>
    <key>com. pple.security.cs.debugger</key>
    <true/>
  </dict>
</plist>
```

Chcete-li vše vidět v akci, podívejte se na zdrojový kód Electron Fiddle, [zejména jeho `elektronická forge` konfigurace soubor](https://github.com/electron/fiddle/blob/master/forge.config.js).

Pokud plánujete přístup k mikrofonu nebo kameře ve vaší aplikaci pomocí API, budete muset přidat následující oprávnění:

```xml
<key>com.apple.security.device.audio-input</key>
<true/>
<key>com.apple.security.device.camera</key>
<true/>
```

Pokud nejsou přítomny v nárocích vaší aplikace, když se dovoláváte, například:

```js
const { systemPreferences } = require('electron')

konst mikrofon = systemPreferences.askForMediaAccess('mikrofon')
```

Vaše aplikace se může zhroutit. Více informací a oprávnění naleznete v části Přístup ke zdrojům v [Tvrzený běh](https://developer.apple.com/documentation/security/hardened_runtime).

## `elektronický stavitel`

Electron Builder přichází s vlastním řešením pro podepsání vaší žádosti. naleznete [jeho dokumentaci zde](https://www.electron.build/code-signing).

## `elektronický balík`

Pokud nepoužíváte integrovaný vývojový plynovod jako Forge nebo Builder, pravděpodobně používáte [`elektronický balík`], která obsahuje [`elektronický osx-znak`] a [`elektronicko-notarize`].

Pokud používáte API Packageru, můžete použít [v konfiguraci, že obě značky a notarizuje vaši aplikaci](https://electron.github.io/electron-packager/master/interfaces/electronpackager.options.html).

```js
const packager = require('electron-packager')

packager({
  dir: '/path/to/my/app',
  osxSign: {
    identita: 'Application of Developer ID: Felix Rieseberg (LT94ZKYDCJ)',
    'zestátněný pracovní čas': true,
    oprávnění: 'nároky. list,
    'entitlements-inherit': 'entitlements. list',
    'signature-flags': 'library'
  },
  osxNotarize: {
    appleId: 'felix@felix. un',
    appleIdPassword: 'my-apple-id-password'
  }
})
```

`plist` soubor, na který se zde odkazuje, potřebuje následující oprávnění pro macOS, pro zajištění bezpečnostních mechanismů Apple, že vaše aplikace dělá tyto věci bez ohledu na újmu:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www. pple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
  <dict>
    <key>com.apple.security.cs. llow-jit</key>
    <true/>
    <key>com.apple.security.cs. llow-unsigned-executable-memory</key>
    <true/>
    <key>com. pple.security.cs.debugger</key>
    <true/>
  </dict>
</plist>
```

## Mac App Store

Viz [Mac App Store Guide](mac-app-store-submission-guide.md).

# Podepisování sestavení Windows

Před podpisem Windows sestavení musíte udělat následující:

1. Získejte podepsaný certifikát kódu Windows Authenticode (vyžaduje roční poplatek)
2. Nainstalujte Visual Studio pro získání podepisovacího nástroje (stačí bezplatná [komunita Edition](https://visualstudio.microsoft.com/vs/community/))

Můžete získat certifikát s podpisem kódu od mnoha prodejců. Ceny se liší, takže může mít cenu za váš čas nakupovat. Mezi populární prodejce patří:

* [digikert](https://www.digicert.com/code-signing/microsoft-authenticode.htm)
* [Comodo](https://www.comodo.com/landing/ssl-certificate/authenticode-signature/)
* [GoDaddy](https://au.godaddy.com/web-security/code-signing-certificate)
* Mimo jiné prosím nakupujte a najděte si, co vyhovuje vašim potřebám, Google je Váš přítel 😄

Existuje řada nástrojů pro podepsání vaší zabalené aplikace:

* [`elektronický instalátor`] vygeneruje instalační program pro okna a podepíše jej pro
* [`elektronická forge`] může podepisovat instalátory, které generuje prostřednictvím cílů Squirrel.Windows nebo MSI.
* [`elektronický stavitel`] může podepsat některé cíle svých oken

## Windows Store

Viz [Průvodce Windows Store](windows-store-guide.md).
