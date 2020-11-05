---
title: Obsługa Krzemu Apple
author: MarshallOfSound
date: '2020-10-15'
---

Sprzęt Apple Silicon zostanie wydany w tym roku, Jak wygląda ścieżka, aby aplikacja Electron działała na nowym urządzeniu?

---

Z wydaniem Electron 11.0.0-beta. , Zespół Electron jest teraz wysyłką wersji Electrona, która działa na nowym urządzeniu Apple Silicon, który Apple planuje wysyłać w późniejszym terminie tego roku. Możesz pobrać najnowszą wersję beta z `npm install electron@beta` lub pobrać ją bezpośrednio z naszej [wersji](https://electronjs.org/releases/stable).

## Jak to działa?

Od Electron 11 będziemy wysyłać oddzielne wersje Electron dla Intel Macs i Apple Silicon Mac. Przed tą zmianą wysyłaliśmy już dwa artefakty: `darwin-x64` i `mas-x64`, przy użyciu aplikacji Mac App Store. Wysyłamy teraz kolejne dwie artefakty, `darwin-arm64` i `mas-arm64`, które są odpowiednikami Krzemu Apple dla wyżej wymienionych artefaktów.

## Co muszę zrobić?

Musisz dostarczyć dwie wersje swojej aplikacji: jedną dla x64 (Intel Mac) i jedną dla arm64 (Apple Silicon). Dobra wiadomość jest taka, że [`electron-packer`](https://github.com/electron/electron-packager/), [`electron-rebuild`](https://github.com/electron/electron-rebuild/) i [`electron-forge`](https://github.com/electron-userland/electron-forge/) już wspiera architekturę `arm64`. Tak długo, jak używasz najnowszych wersji tych pakietów, twoja aplikacja powinna działać bezbłędnie po zaktualizowaniu docelowej architektury do `arm64`.

W przyszłości wydamy pakiet, który pozwala Ci "scalić" aplikacje `arm64` i `x64` do jednego uniwersalnego binarnego, ale warto zauważyć, że ten plik binarny byłby _ogromny_ i prawdopodobnie nie jest idealny do wysyłki do użytkowników.

## Potencjalne problemy

### Moduły natywne

Ponieważ atakujesz nową architekturę, musisz zaktualizować kilka zależności, które mogą powodować problemy z budową. Minimalna wersja niektórych zależności znajduje się poniżej dla Twojego odniesienia.

| Zależność           | Wymagana wersja |
| ------------------- | --------------- |
| XCode               | `>=12.2.0`   |
| `node-gyp`          | `>=7.1.0`    |
| `electron-rebuild`  | `>=1.12.0`   |
| `electron-packager` | `>=15.1.0`   |

W wyniku tych wymagań wersji zależności, być może będziesz musiał naprawić/zaktualizować niektóre natywne moduły.  Jedną z uwag jest to, że aktualizacja Xcode wprowadzi nową wersję SDK macOS, co może spowodować niepowodzenia budowlane dla twoich natywnych modułów.


## Jak to sprawdzić?

Obecnie aplikacje Apple Silicon działają tylko na sprzęcie Apple Silicon, który nie jest dostępny na rynku w momencie pisania tego wpisu na blogu. Jeśli masz [Zestaw Transition Programista](https://developer.apple.com/programs/universal/), możesz przetestować swoją aplikację. W przeciwnym razie będziesz musiał poczekać na wydanie produkcyjnego sprzętu Apple Krzemowy, aby przetestować, czy aplikacja działa.

## Co z Rosetta 2?

Rosetta 2 jest najnowszą iteracją ich [Rosetta](https://en.wikipedia.org/wiki/Rosetta_(software)) , który pozwala na uruchamianie aplikacji x64 Intel na ich nowym urządzeniu arm64 Apple Silicon. Chociaż wierzymy, że x64 Electron Aplikacje będą działać w ramach Rosetta 2, istnieją pewne ważne rzeczy do zauważenia (i powody, dla których powinieneś wysłać natywny plik binarny arm64).

* Wydajność Twojej aplikacji zostanie znacznie osłabiona. Electron / V8 używa kompilacji [JIT](https://en.wikipedia.org/wiki/Just-in-time_compilation) dla JavaScript, i z powodu działania Rosetta, skuteczne działanie JIT dwa razy (raz w V8 i raz w Rosetta).
* Stracisz korzyści z nowej technologii w Apple Silicon, takiej jak zwiększony rozmiar strony pamięci.
* Czy wspomnieliśmy, że wydajność będzie **znacząco** zdegradowana?
