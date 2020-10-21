# Oznámení (Windows, Linux, macOS)

Všechny tři operační systémy poskytují prostředky pro zasílání oznámení uživateli. Electron conveniently allows developers to send notifications with the [HTML5 Notification API](https://notifications.spec.whatwg.org/), using the currently running operating system's native notification APIs to display it.

**Note:** Since this is an HTML5 API it is only available in the renderer process. Pokud chcete zobrazit oznámení v hlavním procesu, podívejte se prosím na modul Oznámení [](../api/notification.md).

```javascript
const myNotification = nové oznámení ('Title', {
  body: 'Lorem Ipsum Dolor Sit Amet'
})

myNotification.onclick = () => {
  console.log('Kliknutí na oznámení')
}
```

Přestože jsou kódy a uživatelská zkušenost mezi operačními systémy podobná, existují jemné rozdíly.

## Windows
* On Windows 10, a shortcut to your app with an [Application User Model ID][app-user-model-id] must be installed to the Start Menu. Toto může být přepsáno během vývoje, takže přidejte `node_modules\electron\dist\electron.exe` do vašeho Start Menu také trik. Přejděte do souboru v Průzkumníku, klepněte pravým tlačítkem myši a "Připnout pro spuštění menu". Potom budete muset přidat řádek `app.setAppUserModelId(process.execPath)` do vašeho hlavního procesu, abyste mohli vidět oznámení.
* On Windows 8.1 and Windows 8, a shortcut to your app with an [Application User Model ID][app-user-model-id] must be installed to the Start screen. Všimněte si však, že nemusí být připnut na úvodní obrazovku.
* V systému Windows 7 fungují notifikace prostřednictvím vlastní implementace, která vizuálně připomíná nativní na novějších systémech.

Electron se pokouší automatizovat práci kolem ID uživatelského modelu aplikace. When Electron is used together with the installation and update framework Squirrel, [shortcuts will automatically be set correctly][squirrel-events]. Kromě toho Electron zjistí, že byla použita veverka a automaticky zavolá `app.setAppModelId()` se správnou hodnotou. During development, you may have to call [`app.setAppUserModelId()`][set-app-user-model-id] yourself.

V systému Windows 8 je navíc maximální délka těla oznámení 250 znaků, s týmem Windows, který doporučuje, aby oznámení byla uchovávána až 200 znaků. Toto omezení bylo odstraněno v systému Windows 10 a tým Windows požádal vývojáře, aby byli rozumní. Pokus o zaslání obrovského množství textu API (tisíce znaků) může vést k nestabilitě.

### Rozšířená oznámení

Pozdější verze systému Windows umožňují pokročilé oznámení, s vlastními šablonami, obrázky a další flexibilní prvky. Chcete-li odeslat tato oznámení (buď z hlavního procesu, nebo z procesu renderování), použijte uživatelský modul [elektronická oznámení](https://github.com/felixrieseberg/electron-windows-notifications). který používá doplňky nativního uzlu k odesílání `ToastNotification` a `objektů TileNotification`.

Zatímco oznámení včetně tlačítek fungují s `elektronickými okny`, zpracování odpovědí vyžaduje použití [`elektronických oken s-interaktivních`](https://github.com/felixrieseberg/electron-windows-interactive-notifications), které pomáhá s registrací požadovaných komponent COM a voláním na vaši Electron aplikaci s zadanými uživatelskými daty.

### Režim Tichých hodin / prezentace

Chcete-li zjistit, zda máte povoleno posílat oznámení, použijte uživatelský modul [elektronický stav oznámení](https://github.com/felixrieseberg/electron-notification-state).

To vám umožní určit dopředu, zda Windows tiše vyhodí oznámení pryč.

## macOS

Oznámení jsou přímočará na macOS, ale měli byste si být vědomi [Pokyny pro lidská rozhraní společnosti Apple týkající se oznámení](https://developer.apple.com/macos/human-interface-guidelines/system-capabilities/notifications/).

Upozorňujeme, že oznámení mají velikost 256 bajtů a pokud překročíte tento limit, budou zkrácena .

### Rozšířená oznámení

Pozdější verze macOS umožňují oznámení se vstupním polem, což uživateli umožňuje rychle odpovědět na oznámení. Chcete-li odesílat oznámení se vstupním polem, použijte uživatelský modul [node-mac-notifier](https://github.com/CharlieHess/node-mac-notifier).

### Nerušit / Stav relace

Chcete-li zjistit, zda máte povoleno posílat oznámení, použijte uživatelský modul [elektronický stav oznámení](https://github.com/felixrieseberg/electron-notification-state).

To vám umožní zjistit dopředu, zda budou či nebudou oznámení zobrazena.

## Linux

Notifications are sent using `libnotify` which can show notifications on any desktop environment that follows [Desktop Notifications Specification][notification-spec], including Cinnamon, Enlightenment, Unity, GNOME, KDE.

[notification-spec]: https://developer.gnome.org/notification-spec/
[app-user-model-id]: https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx
[set-app-user-model-id]: ../api/app.md#appsetappusermodelidid-windows
[squirrel-events]: https://github.com/electron/windows-installer/blob/master/README.md#handling-squirrel-events
