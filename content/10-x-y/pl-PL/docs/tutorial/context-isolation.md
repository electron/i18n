# Izolacja kontekstu

## Co to jest?

Izolacja kontekstowa jest funkcją, która gwarantuje, że zarówno twoje `wstępne ładowanie` skryptów i wewnętrzna logika Electronu będzie działać w odrębnym kontekście niż strona wczytywana w [`zawartości webContents`](../api/web-contents.md).  Jest to ważne ze względu na bezpieczeństwo, ponieważ pomaga uniemożliwić stronie dostęp do wnętrza Electron lub potężnym API Twojego skryptu ładunkowego ma dostęp.

Oznacza to, że obiekt `okno` , do którego masz dostęp skrypt wczytywania, jest w rzeczywistości obiektem **innym** niż strona internetowa miałaby dostęp.  Na przykład, jeśli ustawisz `window.hello = 'wave'` w swoim skrypcie wstępnego ładowania i izolacji kontekstowej jest włączone `okno. ello` będzie niezdefiniowane, jeśli strona próbuje uzyskać do niego dostęp.

Każda aplikacja powinna mieć włączoną izolację kontekstową, a z Electron 12 będzie domyślnie włączona.

## Jak to włączyć?

Z Electron 12 będzie domyślnie włączony. Dla niższych wersji jest to opcja w opcji `webPreferencje` podczas konstruowania `nowej przeglądarki`'.

```javascript
const mainWindow = new BrowserWindow({
  webPreferences: {
    contextIsolation: true
  }
})
```

## Migracja

> Używałem do dostarczania API z mojego skryptu wstępnego przy użyciu `window.X = apiObject` teraz?

Udostępnianie API z twojego skryptu wstępnego załadowania na załadowaną stronę internetową jest powszechnym zastosowaniem i istnieje dedykowany moduł w Electronie, który pomoże Ci to w bezbolesny sposób.

**Przed: Z wyłączoną izolacją kontekstową**

```javascript
window.myAPI = {
  doAThing: () => {}
}
```

**Po: Z włączoną izolacją kontekstową**

```javascript
const { contextBridge } = require('electron')

contextBridge.exposeInMainWorld('myAPI', {
  doAThing: () => {}
})
```

Moduł [`contextBridge`](../api/context-bridge.md) może być użyty do **bezpiecznie** ujawnia API z izolowanego kontekstu, w którym działa skrypt wstępnego ładowania w kontekście, w którym działa witryna. API będzie również dostępne na stronie `window.myAPI` tak samo jak wcześniej.

Powinieneś przeczytać dokumentację `contextBridge` podaną powyżej, aby w pełni zrozumieć jej ograniczenia.  Na przykład nie możesz wysyłać niestandardowych prototypów lub symboli nad mostkiem.

## Kwestie bezpieczeństwa

Po prostu włączenie `izolacji kontekstu` i użycie `contextBridge` nie oznacza automatycznie, że wszystko, co robisz jest bezpieczne.  Na przykład ten kod jest **niebezpieczny**.

```javascript
// ❌ Błędny kod
contextBridge.exposeInMainWorld('myAPI', {
  send: ipcRenderer.send
})
```

Bezpośrednio ujawnia potężne API bez filtrowania argumentów. Pozwoliłoby to każdej stronie na wysyłanie arbitralnych wiadomości IPC, których nie chcesz być. Prawidłowym sposobem ujawnienia interfejsów API opartych na IPC byłoby dostarczenie jednej metody na wiadomość IPC.

```javascript
// ✅ Dobry kod
contextBridge.exposeInMainWorld('myAPI', {
  loadPreferences: () => ipcRenderer.invoke('load-prefs')
})
```

