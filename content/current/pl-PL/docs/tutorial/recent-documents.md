# Ostatnie dokumenty (Windows & macOS)

## Przegląd

Windows i macOS umożliwiają dostęp do listy ostatnich dokumentów, którą można otworzyć za pomocą JumpList lub dock menu, odpowiednio od używanego systemu.

__JumpList:__

![Ostatnie pliki JumpList](https://cloud.githubusercontent.com/assets/2289/23446924/11a27b98-fdfc-11e6-8485-cc3b1e86b80a.png)

__Dock menu:__

![macOS Dock Menu](https://cloud.githubusercontent.com/assets/639601/5069610/2aa80758-6e97-11e4-8cfb-c1a414a10774.png)

Aby dodać plik do najnowszych dokumentów, musisz użyć API [app.addRecentDocument](../api/app.md#appaddrecentdocumentpath-macos-windows).

## Przykład

### Dodaj element do najnowszych dokumentów

Zaczynając od działającej aplikacji z [Poradnika szybkiego startu](quick-start.md), dodaj następujące linie do pliku `main.js`:

```javascript
const { app } = require('electron')

app.addRecentDocument('/Users/USERNAME/Desktop/work.type')
```

Po uruchomieniu aplikacji Electron, kliknij prawym przyciskiem myszy na ikonę aplikacji. Powinieneś zobaczyć element, który właśnie dodałeś. W tym przewodniku przedmiotem jest plik Markdown znajdujący się w katalogu głównym projektu:

![Ostatni dokument](../images/recent-documents.png)

### Wyczyść listę najnowszych dokumentów

Aby wyczyścić listę ostatnich dokumentów, musisz użyć [app.clearRecentDocuments](../api/app.md#appclearrecentdocuments-macos-windows) API w pliku `main.js`:

```javascript
const { app } = require('electron')

app.clearRecentDocuments()
```

## Dodatkowe informacje

### Windows Notes

Aby korzystać z tej funkcji w systemie Windows, aplikacja musi być zarejestrowana jako obsługa pliku typu dokumentu, w przeciwnym razie plik nie pojawi się na JumpList nawet po dodaniu go. Możesz znaleźć wszystko, po zarejestrowaniu swojej aplikacji w [Rejestracja Aplikacji](https://msdn.microsoft.com/en-us/library/cc144104(VS.85).aspx).

Kiedy użytkownik kliknie na plik z JumpList, nowa instancja twojej aplikacji wystartuje ze ścieżki pliku dodanej jako argument w wierszu polecenia.

### macOS Notes

#### Dodaj listę ostatnich dokumentów do menu aplikacji

Możesz dodać pozycje menu, aby uzyskać dostęp i wyczyścić najnowsze dokumenty dodając następujący kod do szablonu menu:

```json
{
  "submenu":[
    {
      "label":"Open Recent",
      "role":"recentdocuments",
      "submenu":[
        {
          "label":"Clear Recent",
          "role":"clearrecentdocuments"
        }
      ]
    }
  ]
}
```

![pozycja menu najnowszych dokumentów macOS](https://user-images.githubusercontent.com/3168941/33003655-ea601c3a-cd70-11e7-97fa-7c062149cfb1.png)

Gdy żądany jest plik z listy ostatnich dokumentów (dock menu), emitowany jest event `open-file` z modułu `app`.
