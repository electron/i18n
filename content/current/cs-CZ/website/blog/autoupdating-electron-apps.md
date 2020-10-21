---
title: Snadná automatická aktualizace pro Open-Source aplikace
author: zeke
date: '2018-05-01'
---

Dnes vydáváme zdarma, open-source, hostováno [aktualizuje webservice](https://github.com/electron/update.electronjs.org) a společník [npm balíček](https://github.com/electron/update-electron-app) , který umožňuje snadné automatické aktualizace pro open-source Electron aplikace. Toto je krok směrem k tomu, aby vývojáři aplikací přemýšleli méně o nasazení a více o vývoji vysoce kvalitních zkušeností pro své uživatele.

---

<figure>
  <a href="https://github.com/electron/update-electron-app" style="display: block; text-align: center;">
    <img class="screenshot" src="https://user-images.githubusercontent.com/2289/39480716-e9990910-4d1d-11e8-8901-9549c6ff6050.png" alt="Snímek obrazovky aktualizace">
    <figcaption>Nový modul aktualizací v akci</figcaption>
  </a>
</figure>

## Usnadnění života

Electron has an [autoUpdater](https://electronjs.org/docs/tutorial/updates) API that gives apps the ability to consume metadata from a remote endpoint to check for updates, download them in the background, and install them automatically.

Povolení těchto aktualizací bylo těžkopádným krokem v procesu nasazení pro mnoho vývojářů Electronů, protože vyžaduje nasazení webového serveru a jeho údržbu, aby sloužil metadatům historie aplikací.

Dnes oznamujeme nové řešení pro automatické aktualizace aplikací. Pokud je vaše Electron ve veřejném úložišti GitHub a používáte GitHub verze ke zveřejnění sestavení, Tuto službu můžete použít k doručování nepřetržitých aktualizací aplikací vašim uživatelům.

## Použití nového modulu

Pro minimalizaci konfigurace na vaší straně jsme vytvořili [update-electron-app](https://github.com/electron/update-electron-app) modul npm, který integruje s novou [update.electronjs.org](https://github.com/electron/update.electronjs.org) webslužbou.

Instalovat modul:

```sh
npm nainstalovat update-electron-app
```

Zavolejte to odkudkoliv v [hlavním procesu vaší aplikace](https://electronjs.org/docs/glossary#main-process):

```js
vyžadováno ('update-electron-app')()
```

To je ono! Modul zkontroluje aktualizace při spuštění aplikace, poté každých deset minut. Když je nalezena aktualizace, automaticky se stáhne na pozadí a zobrazí se dialogové okno, když je aktualizace připravena.

## Migrovat existující aplikace

Aplikace, které již používají Electron's autoUpdater API, mohou tuto službu používat také. Chcete-li tak učinit, můžete [přizpůsobit `update-electron-app`](https://github.com/electron/update-electron-app) modul nebo [integrovat přímo s update.electronjs.org](https://github.com/electron/update.electronjs.org).

## Alternativní řešení

Pokud používáte [electron-builder](https://github.com/electron-userland/electron-builder) pro balíček vaší aplikace, můžete použít její vestavěnou aktualizaci. Podrobnosti naleznete v [electron.build/auto-update](https://www.electron.build/auto-update).

Pokud je vaše aplikace soukromá, možná budete muset spustit vlastní aktualizační server. K tomu existuje řada open-source nástrojů, včetně Zeit [Hazel](https://github.com/zeit/hazel) a Atlassian [Nucleus](https://github.com/atlassian/nucleus). Pro více informací si přečtěte [nasazení Aktualizačního serveru](https://electronjs.org/docs/tutorial/updates#deploying-an-update-server).

## Děkujeme

Díky [Julian Ruber](http://juliangruber.com/) za pomoc při navrhování a budování této jednoduché a škálovatelné webové služby. Díky lidu na [Zeit](https://zeit.co) za otevřený zdroj [Hazel](https://github.com/zeit/hazel) , ze kterého jsme se inspirovali návrhem. Děkujeme [Samuel Attard](https://www.samuelattard.com/) za hodnocení kódu. Díky komunitě Electron za pomoc při testování této služby.

🌲 Tady je stále zelená budoucnost Electronových aplikací!