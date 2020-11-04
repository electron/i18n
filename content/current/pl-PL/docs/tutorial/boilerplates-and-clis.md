# Standardowe teksty i CLI

Opracowanie Electrona jest niedostępne - nie ma "jednego prawdziwego sposobu" do opracowania, budowania, pakietu lub wydania aplikacji Electron. Dodatkowe funkcje dla Electron, zarówno dla czasu budowy, jak i uruchomienia, można zazwyczaj znaleźć na [npm](https://www.npmjs.com/search?q=electron) w pojedynczych pakietach, umożliwienie deweloperom tworzenia aplikacji i tworzenia potrzebnego im potoku.

Ten poziom modułowości i rozszerzalności gwarantuje, że wszyscy deweloperzy pracujący z Electronem, zarówno duży, jak i mały rozmiar zespołu, nigdy nie są ograniczone w tym, co mogą lub nie mogą zrobić w dowolnym czasie podczas swojego cyklu rozwoju. dla wielu deweloperów, jedno z narzędzi, które są napędzane przez społeczność lub polecenie może znacznie ułatwić kompilację, paczkę i uwolnij aplikację .

## Teskt standardowy vs CLI

Płyta kotłowa to tylko punkt startowy - płótno - z którego budujesz swoją aplikację. Zwykle przybierają formę repozytorium, które możesz sklonować i dostosować do treści Twojego serca.

Z drugiej strony narzędzie wiersza poleceń nadal wspiera cię przez cały czas opracowywania i wydawania . Są one bardziej pomocne i pomocne, ale wymuszają wytyczne dotyczące tego, jak twój kod powinien być skonstruowany i zbudowany. *Szczególnie dla początkujących, użycie narzędzia wiersza poleceń może być pomocne*.

## electron-forge

"Kompletne narzędzie do budowania nowoczesnych aplikacji Electron". Electron Forge łączy istniejące (i dobrze utrzymywane) narzędzia do tworzenia Electrona w spójny pakiet, tak aby każdy mógł przejść bezpośrednio do Electrona .

Forge jest wyposażony w [gotowy do użycia szablon](https://electronforge.io/templates) za pomocą Webpack jako pakietu. Zawiera przykładową konfigurację pisma i zawiera dwa pliki konfiguracyjne umożliwiające łatwe dostosowanie. Używa tych samych podstawowych modułów używanych przez większą społeczność Electron (jak [`electron-packer`](https://github.com/electron/electron-packager)) – zmian dokonanych przez opiekunów Electron (takich jak Slack) z korzyścią dla użytkowników Forge, także:

Więcej informacji i dokumentacji można znaleźć na [electronforge.io](https://electronforge.io/).

## electron-builder

„Kompletne rozwiązanie pakietu i stworzenie gotowej do dystrybucji aplikacji Electron” skupiającej się na zintegrowanym doświadczeniu. [`electron-builder`](https://github.com/electron-userland/electron-builder) dodaje pojedynczą zależność skoncentrowaną na prostotze i zarządza wszystkimi dalszymi wymaganiami wewnętrznie.

`electron-Builder` zastępuje funkcje i moduły używane przez opiekunów Electrona (takich jak auto-updater) własnymi funkcjami. Są one na ogół bardziej zintegrowane, ale będą miały mniej wspólnego z popularnymi aplikacjami Electron takimi jak Atom, Visual Studio Code lub Slack.

Więcej informacji i dokumentacji znajdziesz w [repozytorium](https://github.com/electron-userland/electron-builder).

## electron-react-boilerplate

Jeśli nie chcesz żadnych narzędzi, ale tylko solidna płyta kotłowa do zbudowania, CT Lin's [`electron-react-boilerplate`](https://github.com/chentsulin/electron-react-boilerplate) może być wart wyglądu. Jest całkiem popularne w społeczności i używa `electron-builder` wewnętrznie.

## Inne narzędzia i teksty standardowe

Lista ["Awesome Electron"](https://github.com/sindresorhus/awesome-electron#boilerplates) zawiera więcej narzędzi i płyt kotła do wyboru. Jeśli znajdziesz długość listy zastraszyć, nie zapomnij że dodawanie narzędzi jest słusznym podejściem.
