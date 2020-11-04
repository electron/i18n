# Aktualizace aplikací

Existuje několik způsobů, jak aktualizovat Electron aplikaci. The easiest and officially supported one is taking advantage of the built-in [Squirrel](https://github.com/Squirrel) framework and Electron's [autoUpdater](../api/auto-updater.md) module.

## Používá se `update.electronjs.org`

Tým Electronu udržuje [update.electronjs.org](https://github.com/electron/update.electronjs.org), bezplatnou a open-source webovou službu, kterou mohou Electron aplikace používat pro vlastní aktualizaci. Služba je určena pro elektronové aplikace, které splňují tato kritéria:

- Aplikace běží na macOS nebo Windows
- Aplikace má veřejný GitHub repositář
- Builds are published to GitHub Releases
- Buildy jsou podepsány kódem

Nejjednodušší způsob, jak tuto službu používat, je instalace [update-electron-app](https://github.com/electron/update-electron-app), modulu Node.js přednastaveného pro použití s update.electronjs.org.

Instalovat modul:

```sh
npm nainstalovat update-electron-app
```

Vypněte aktualizátor z hlavního souboru vašeho procesu:

```js
vyžadováno ('update-electron-app')()
```

Ve výchozím nastavení bude tento modul kontrolovat aktualizace při spuštění aplikace a poté každých deset minut. Po nalezení aktualizace bude automaticky stažena na pozadí. Po dokončení stahování se zobrazí dialogové okno, které umožní uživateli restartovat aplikaci.

Pokud potřebujete přizpůsobit svou konfiguraci, můžete [předat možnosti `update-electron-app`](https://github.com/electron/update-electron-app) nebo [použít službu aktualizací přímo](https://github.com/electron/update.electronjs.org).

## Publikování aktualizačního serveru

Pokud vytváříte soukromou Electron aplikaci, nebo pokud nepublikujete vydání GitHub Releases, může být nutné spustit vlastní aktualizační server.

V závislosti na vašich potřebách si můžete vybrat:

- [Hazel](https://github.com/zeit/hazel) – aktualizace serveru pro soukromé nebo open-source aplikace, které mohou být nasazeny zdarma [Teď](https://zeit.co/now). Táhne z [GitHub Releases](https://help.github.com/articles/creating-releases/) a využívá sílu GitHubu CDN.
- [Nuts](https://github.com/GitbookIO/nuts) – také používá [GitHub Releases](https://help.github.com/articles/creating-releases/), ale aplikuje aktualizace na disku a podporuje soukromé repozitáře.
- [electron-release-server](https://github.com/ArekSredzki/electron-release-server) – poskytuje nástěnku pro zpracování vydání a nevyžaduje vydání pro původ na GitHubu.
- [Nucleus](https://github.com/atlassian/nucleus) – kompletní aktualizační server pro Electron aplikace spravovaný Atlassianem. Podporuje více aplikací a kanálů; používá statické úložiště souborů k vytěžování nákladů na server.

## Provádění aktualizací ve vaší aplikaci

Jakmile vložíte aktualizační server, pokračujte v importu požadovaných modulů do vašeho kódu. Následující kód se může u různých serverů lišit, ale funguje jako při použití [Hazel](https://github.com/zeit/hazel).

**Důležité:** Ujistěte se, že níže uvedený kód bude spuštěn pouze v vaší zabalené aplikaci, a nikoli ve vývoji. Můžete použít [electron-is-dev](https://github.com/sindresorhus/electron-is-dev) ke kontrole životního prostředí.

```javascript
const { app, autoUpdater, dialog } = vyžadováno ('electron')
```

Dále vytvořte URL aktualizačního serveru a řekněte [autoUpdater](../api/auto-updater.md) o tom:

```javascript
const server = 'https://your-deployment-url.com'
const url = `${server}/update/${process.platform}/${app.getVersion()}`

autoUpdater.setFeedURL({ url })
```

Jako poslední krok se podívejte na aktualizace. Níže uvedený příklad zkontroluje každou minutu:

```javascript
setInterval(() => {
  autoUpdater.checkForUpdates()
}, 60000)
```

Jakmile je vaše aplikace [zabalena](../tutorial/application-distribution.md), obdrží aktualizaci každé nové [vydání GitHub](https://help.github.com/articles/creating-releases/) , které jste publikovali.

## Aplikování aktualizací

Nyní jste nakonfigurovali základní aktualizační mechanismus pro vaši aplikaci, je třeba zajistit, aby byl uživatel upozorněn, až bude aktualizován. Tohoto lze dosáhnout pomocí autoUpdater API [událostí](../api/auto-updater.md#events):

```javascript
autoUpdater.on('update-downloaded', (event, releaseNotes, releaseName) => {
  const dialogOpts = {
    type: 'info',
    buttons: ['Restart', 'Later'],
    title: 'Application Update',
    message: process.platform === 'win32' ? releaseNotes : releaseName,
    detail: 'Byla stažena nová verze. Restartujte aplikaci pro použití aktualizací.'
  }

  dialog.showMessageBox(dialogové opce).then(((returnValue) => {
    pokud (returnValue.response === 0) autoUpdater.quitAndInstall()
  })
})
```

Také se ujistěte, že chyby jsou zpracovávány [](../api/auto-updater.md#event-error). Zde je příklad pro logování do `bodu`:

```javascript
autoUpdater.on('error', message => {
  console.error('Při aktualizaci aplikace došlo k chybě')
  console.error(message)
})
```

## Ruční zpracování aktualizací

Protože požadavky automatické aktualizace nejsou pod vaší přímou kontrolou, můžete najít obtížně zvládnutelné situace (např. pokud je aktualizační server za autentizací). Pole `url` podporuje soubory, což znamená, že s jistým úsilím můžete předejít aspektu serveru-komunikace v procesu. [Zde je příklad, jak by to mohlo fungovat](https://github.com/electron/electron/issues/5020#issuecomment-477636990).
