# Notificări (Windows, Linux, macOS)

Toate cele trei sisteme de operare oferă mijloace pentru ca aplicațiile să trimită notificări utilizatorului. Electron permite în mod convenabil dezvoltatorilor să trimită notificări cu [HTML5 Notification API](https://notifications.spec.whatwg.org/), folosind API-urile native de notificare ale sistemului de operare care rulează în prezent pentru a le afișa.

**Note:** Since this is an HTML5 API it is only available in the renderer process. Dacă doriţi să afişaţi notificări în procesul principal, vă rugăm să verificaţi modulul [Notificări](../api/notification.md).

```javascript
const myNotification = new Notification('Title', {
  body: 'Lorem Ipsum Dolor Sit Amet'
})

myNotification.onclick = () => {
  console.log('Notificare clicked')
}
```

În timp ce codul și experiența utilizatorului în sistemele de operare sunt similare, există diferențe subtile.

## Ferestre
* On Windows 10, a shortcut to your app with an [Application User Model ID][app-user-model-id] must be installed to the Start Menu. Acest lucru poate fi suprapus în timpul dezvoltării, așa că adăugarea `node_modules\electron\dist\electron.exe` în Meniul Start face și trucul. Navigați la fișierul din Explorer, click dreapta și 'Fixează pentru a Porni Meniul'. Apoi va trebui să adăugați linia `app.setAppUserModelId(process.execPath)` la procesul principal pentru a vedea notificările.
* On Windows 8.1 and Windows 8, a shortcut to your app with an [Application User Model ID][app-user-model-id] must be installed to the Start screen. Cu toate acestea, rețineți că nu trebuie să fie fixat pe ecranul de pornire.
* În Windows 7, notificările funcționează printr-o implementare personalizată care în mod vizual seamănă cu cea nativă pe sisteme mai noi.

Electron încearcă să automatizeze munca din jurul ID-ului Modelului Utilizatorului Aplicației. When Electron is used together with the installation and update framework Squirrel, [shortcuts will automatically be set correctly][squirrel-events]. În plus, Electron va detecta că Squirrel a fost utilizat și va apela automat `app.setAppUserModelId()` cu valoarea corectă. During development, you may have to call [`app.setAppUserModelId()`][set-app-user-model-id] yourself.

Mai mult, în Windows 8, lungimea maximă pentru corpul de notificare este de 250 de caractere , cu echipa Windows care recomandă păstrarea notificărilor până la 200 de caractere. Acestea fiind spuse, că limitarea a fost eliminată în Windows 10, echipa Windows cerând să fie rezonabilă. Încercarea de a trimite sume gigantice de text către API (mii de caractere) poate duce la instabilitate.

### Notificări avansate

Versiunile ulterioare de Windows permit notificări avansate, cu șabloane personalizate, imagini și alte elemente flexibile. Pentru a trimite aceste notificări (fie de la procesul principal fie de la procesul de redare), utilizaţi modulul userland [electron-windows-notifications](https://github.com/felixrieseberg/electron-windows-notifications), care folosește suplimente native Node pentru a trimite `ToastNotification` și `Obiecte TileNotification`.

În timp ce notificările inclusiv butoanele funcționează cu `notificările electrono-windows-notificări`, manipularea răspunsurilor necesită utilizarea [`notificărilor de electron-windows-interactive-`](https://github.com/felixrieseberg/electron-windows-interactive-notifications), care ajută la înregistrarea componentelor necesare COM și apelarea aplicației dvs. Electron cu datele utilizatorului introdus.

### Ore liniştite / Mod Prezentare

Pentru a detecta dacă aveţi sau nu permisiunea de a trimite o notificare, utilizaţi modulul userland [starea de notificare electronică](https://github.com/felixrieseberg/electron-notification-state).

Acest lucru vă permite să determinați înainte dacă Windows va arunca sau nu silențios notificarea.

## macOS

Notificările sunt directe pe macOS, dar ar trebui să fiţi la curent cu [Recomandările interfeţei umane a aplicaţiei privind notificările](https://developer.apple.com/macos/human-interface-guidelines/system-capabilities/notifications/).

Țineți cont că notificările sunt limitate la 256 octeți în dimensiune și vor fi trunchiate dacă depășiți această limită.

### Notificări avansate

Versiunile ulterioare ale macOS permit notificări cu un câmp de intrare, permițând utilizatorului să răspundă rapid la o notificare. Pentru a trimite notificări cu un câmp de intrare, utilizaţi modulul userland [node-mac-notifier](https://github.com/CharlieHess/node-mac-notifier).

### Nu deranjați / Stare sesiune

Pentru a detecta dacă aveţi sau nu permisiunea de a trimite o notificare, utilizaţi modulul userland [starea de notificare electronică](https://github.com/felixrieseberg/electron-notification-state).

Acest lucru vă va permite să detectați înainte dacă notificarea va fi sau nu afișată.

## Linux

Notifications are sent using `libnotify` which can show notifications on any desktop environment that follows [Desktop Notifications Specification][notification-spec], including Cinnamon, Enlightenment, Unity, GNOME, KDE.

[notification-spec]: https://developer.gnome.org/notification-spec/
[app-user-model-id]: https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx
[set-app-user-model-id]: ../api/app.md#appsetappusermodelidid-windows
[squirrel-events]: https://github.com/electron/windows-installer/blob/master/README.md#handling-squirrel-events
