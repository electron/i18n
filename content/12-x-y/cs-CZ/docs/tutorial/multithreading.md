# Vícenásobné čtení

With [Web Workers][web-workers], it is possible to run JavaScript in OS-level threads.

## Vícezávitové uzly

Je možné použít uzel. s funkce ve webových pracovnících Electronu, udělat tak, aby volba `nodeIntegrationInWorker` měla být nastavena na `true` v `webPreferences`.

```javascript
const win = new BrowserWindow({
  webPreferences: {
    nodeIntegrationInWorker: true
  }
})
```

`nodeIntegrationInWorker` může být použit nezávisle na `nodeIntegration`, ale `sandbox` nesmí být nastaven na `true`.

## Dostupná API

Všechny vestavěné moduly Node.js jsou podporovány ve webových pracovnících, a `asar` archivy lze stále číst pomocí Node.js API. Žádný z vestavěných modulů Electronu však nemůže být použit v prostředí více závitů.

## Nativní Node.js moduly

Jakýkoliv nativní modul Node.js může být načten přímo ve webových pracovnících, ale je důrazně doporučeno tak neučinit. Většina stávajících nativních modulů byla napsána za předpokladu, že prostředí s jedním závitem bude používáno ve Web Workers povede k pádům a poškození paměti.

Všimněte si, že i v případě nativního uzlu. s modul je bezpečný vlákna, stále není bezpečný načíst jej ve webovém Workeru, protože `proces. funkce lopen` není vlákno bezpečná.

Jediný způsob, jak pro tuto chvíli bezpečně načíst nativní modul. ujistěte se, že se aplikace nenačte žádné nativní moduly po spuštění webových pracovníků.

```javascript
process.dlopen = () => {
  hodit novou chybu ('Load native modul není bezpečný')
}
Spolupracovník = nový Worker('script.js')
```

[web-workers]: https://developer.mozilla.org/en/docs/Web/API/Web_Workers_API/Using_web_workers
