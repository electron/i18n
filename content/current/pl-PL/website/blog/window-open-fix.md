---
title: Przeglądarka window.open() Korekta wrażliwości
author: ckerr
date: '2019-02-03'
---

Odkryto podatność kodu, która pozwala na ponowne włączenie węzła w oknach podrzędnych.

---

Otwieranie BrowserView z `sandbox: true` lub `nativeWindowOpen: true` i `nodeIntegration: false` skutkuje oknem webContents where `. pisak` może być wywołany, a nowo otwarte okno podrzędne będzie miało włączoną `nodeIntegration`. Ta wrażliwość dotyczy wszystkich obsługiwanych wersji Electron.

## Łagodzenie skutków

Opublikowaliśmy nowe wersje Electrona, które zawierają poprawki dla tej podatności: [`. .17`](https://github.com/electron/electron/releases/tag/v2.0.17), [`3.0. 5`](https://github.com/electron/electron/releases/tag/v3.0.15), [`3.1.3`](https://github.com/electron/electron/releases/tag/v3.1.3) [`4. .4`](https://github.com/electron/electron/releases/tag/v4.0.4)i [` 5.0.0-beta.2`](https://github.com/electron/electron/releases/tag/v5.0.0-beta.2) Zachęcamy wszystkich programistów Electron do natychmiastowej aktualizacji ich aplikacji do najnowszej stabilnej wersji.

Jeśli z jakiegoś powodu nie możesz zaktualizować swojej wersji Electron, możesz złagodzić ten problem wyłączając wszystkie podrzędne treści:

```javascript
view.webContents.on('-add-new-contents', e => e.preventDefault());
```

## Inne informacje

Ta wrażliwość została znaleziona i zgłoszona odpowiedzialnie projektowi Electron przez [PalmerAL](https://github.com/PalmerAL).

Aby dowiedzieć się więcej o najlepszych praktykach, aby zachować bezpieczeństwo aplikacji Electron, zobacz nasz [samouczek dotyczący bezpieczeństwa](https://electronjs.org/docs/tutorial/security).

Jeśli chcesz zgłosić lukę w Electron, napisz na adres e-mail@electronjs.org.
