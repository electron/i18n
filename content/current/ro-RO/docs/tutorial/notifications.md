# Notificări (Windows, Linux, macOS)

## Overview

Toate cele trei sisteme de operare oferă mijloace pentru ca aplicațiile să trimită notificări utilizatorului. Tehnica de afişare a notificărilor este diferită pentru procesele Principal şi Redare.

Pentru procesul de Renderer, Electron permite în mod convenabil dezvoltatorilor să trimită notificări cu [HTML5 Notification API](https://notifications.spec.whatwg.org/), folosind API-urile native de notificare ale sistemului de operare care rulează în prezent pentru a le afișa.

Pentru a afișa notificări în procesul principal, trebuie să utilizați modulul [Notificare](../api/notification.md).

## Exemplu

### Arată notificări în procesul de redare

Presupunând că aveți o aplicație Electron funcțională din [Ghidul de pornire rapidă](quick-start.md), adaugă următoarea linie la indexul `. Eticheta tml` înaintea tag-ului de închidere `</body>`:

```html
<script src="renderer.js"></script>
```

şi adăugaţi fişierul `renderer.js`:

```js
const myNotification = new Notification('Title', {
  body: 'Notification from the Renderer process'
})

myNotification.onclick = () => {
  console.log('Notificare clicked')
}
```

După lansarea aplicației Electron, ar trebui să vedeți notificarea:

![Notificare în procesul de redare](../images/notification-renderer.png)

Dacă deschideți Consola și apoi faceți clic pe notificare, vei vedea mesajul care a fost generat după activarea evenimentului `onclick`:

![Mesaj click pentru notificare](../images/message-notification-renderer.png)

### Arată notificări în procesul principal

Începând cu o aplicație de lucru din [Ghidul de pornire rapidă](quick-start.md), actualizați fișierul `main.js` cu următoarele linii:

```js
const { Notification } = require('electron')

function showNotification () {
  const notification = {
    title: 'Basic Notification',
    body: 'Notification from the Main process'
  }
  new Notification(notification).show()
}

app.whenReady().then(createWindow).then(createWindow).then(showNotification)
```

După lansarea aplicației Electron, ar trebui să vedeți notificarea:

![Notificare în procesul principal](../images/notification-main.png)

## Informaţii suplimentare

În timp ce codul și experiența utilizatorului în sistemele de operare sunt similare, există diferențe subtile.

### Ferestre

* Pe Windows 10, o scurtătură către aplicația ta cu [Aplicația Model ID](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx) trebuie instalată în Meniul Pornire. Acest lucru poate fi suprapus în timpul dezvoltării, așa că adăugarea `node_modules\electron\dist\electron.exe` la Meniul Start face și truc. Navigați la fișierul din Explorer, click dreapta și 'Fixează pentru a Porni Meniul'. Apoi va trebui să adăugați linia `app.setAppUserModelId(process.execPath)` la procesul principal pentru a vedea notificările.
* Pe Windows 8. și Windows 8, o scurtătură către aplicația ta cu [un utilizator al aplicației Modelul ID](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx) trebuie instalat pe ecranul de pornire. Cu toate acestea, rețineți că nu trebuie să fie fixat pe ecranul de pornire.
* În Windows 7, notificările funcționează printr-o implementare personalizată care în mod vizual seamănă cu cea nativă pe sisteme mai noi.

Electron încearcă să automatizeze munca din jurul ID-ului Modelului Utilizatorului Aplicației. Când Electron este folosit împreună cu instalarea și actualizarea framework Squirrel, [scurtăturile vor fi setate automat](https://github.com/electron/windows-installer/blob/master/README.md#handling-squirrel-events). În plus, Electron va detecta că Squirrel a fost utilizat și va apela automat `app.setAppUserModelId()` cu valoarea corectă. În timpul dezvoltării, este posibil să aveți pentru a apela [`app.setAppUserModelId()`](../api/app.md#appsetappusermodelidid-windows) chiar dvs.

Mai mult, în Windows 8, lungimea maximă pentru corpul de notificare este de 250 de caractere , cu echipa Windows care recomandă păstrarea notificărilor până la 200 de caractere. Acestea fiind spuse, că limitarea a fost eliminată în Windows 10, echipa Windows cerând să fie rezonabilă. Încercarea de a trimite sume gigantice de text către API (mii de caractere) poate duce la instabilitate.

#### Notificări avansate

Versiunile ulterioare de Windows permit notificări avansate, cu șabloane personalizate, imagini și alte elemente flexibile. Pentru a trimite aceste notificări (fie de la procesul principal fie de la procesul de redare), utilizaţi modulul userland [electron-windows-notifications](https://github.com/felixrieseberg/electron-windows-notifications), care folosește suplimente native Node pentru a trimite `ToastNotification` și `Obiecte TileNotification`.

În timp ce notificările inclusiv butoanele funcționează cu `notificările electrono-windows-notificări`, manipularea răspunsurilor necesită utilizarea [`e-windows-interactive-notifications`](https://github.com/felixrieseberg/electron-windows-interactive-notifications), care vă ajută să înregistrați componentele necesare COM și să apelați aplicația dvs Electron cu datele utilizatorului introdus.

#### Ore liniştite / Mod Prezentare

Pentru a detecta dacă aveți sau nu permisiunea de a trimite o notificare, utilizați modulul userland [(modul de notificare electronică)](https://github.com/felixrieseberg/electron-notification-state).

Acest lucru vă permite să determinați înainte de timp dacă Windows va arunca silențios notificarea.

### macOS

Notificările sunt directe pe macOS, dar ar trebui să fiţi la curent cu [Recomandările interfeţei umane a aplicaţiei privind notificările](https://developer.apple.com/macos/human-interface-guidelines/system-capabilities/notifications/).

Țineți cont că notificările sunt limitate la 256 octeți în dimensiune și vor fi trunchiate dacă depășiți această limită.

#### Notificări avansate

Versiunile ulterioare ale macOS permit notificări cu un câmp de intrare, permițând utilizatorului să răspundă rapid la o notificare. Pentru a trimite notificări cu un câmp de intrare, utilizaţi modulul userland [node-mac-notifier](https://github.com/CharlieHess/node-mac-notifier).

#### Nu deranjați / Stare sesiune

Pentru a detecta dacă aveţi sau nu permisiunea de a trimite o notificare, utilizaţi modulul userland [starea de notificare electronică](https://github.com/felixrieseberg/electron-notification-state).

Acest lucru vă va permite să detectați înainte dacă notificarea va fi sau nu afișată.

### Linux

Notificările sunt trimise folosind `libnotify` care poate afișa notificări pe orice desktop mediu care urmează [Notificări desktop Specificații](https://developer.gnome.org/notification-spec/), inclusiv Cinnamon, Iluminism, Unitate, GNOME, KDE.
