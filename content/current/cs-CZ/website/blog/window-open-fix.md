---
title: Oprava zranitelnosti prohlížeče Window.open()
author: ckerr
date: '2019-02-03'
---

Byla nalezena zranitelnost kódu, která umožňuje znovu povolit uzel v podřízených oknech.

---

Otevření prohlížeče View s `sandboxem: true` nebo `nativeWindowOpen: true` a `nodeIntegration: false` má za následek webContents where `window. pero` lze volat a nově otevřené dětské okno bude mít povoleno `nodeIntegraci`. Tato zranitelnost ovlivňuje všechny podporované verze Electronu.

## Zmírnění

Zveřejnili jsme nové verze Electronu, které obsahují opravy pro tuto zranitelnost: [`. .17`](https://github.com/electron/electron/releases/tag/v2.0.17), [`3.0. 5`](https://github.com/electron/electron/releases/tag/v3.0.15), [`3.1.3`](https://github.com/electron/electron/releases/tag/v3.1.3), [`4. .4`](https://github.com/electron/electron/releases/tag/v4.0.4)a [` 5.0.0-beta.2`](https://github.com/electron/electron/releases/tag/v5.0.0-beta.2) Doporučujeme všem vývojářům Electronu, aby okamžitě aktualizovali své aplikace na nejnovější stabilní verzi.

Pokud z nějakého důvodu nemůžete aktualizovat verzi Electronu, můžete tento problém zmírnit vypnutím podřazeného webového obsahu:

```javascript
view.webContents.on('-add-new-contents', e => e.preventDefault());
```

## Další informace

Tato zranitelnost byla zjištěna a odpovědně oznámena projektu Electron [PalmerAL](https://github.com/PalmerAL).

Chcete-li se dozvědět více o osvědčených postupech pro zabezpečení Vašich Electron aplikací, podívejte se na náš [bezpečnostní návod](https://electronjs.org/docs/tutorial/security).

Pokud chcete nahlásit zranitelnost v Electronu, napište email security@electronjs.org.
