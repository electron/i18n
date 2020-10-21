---
title: 'Electron Internals&#58; Używanie węzła jako biblioteki'
author: zcbenz
date: '2016-08-08'
---

To jest drugi post w bieżącej serii opisującej wewnętrzne Electron. Sprawdź [pierwszy post](https://electronjs.org/blog/2016/07/28/electron-internals-node-integration) o integracji pętli zdarzeń jeśli jeszcze tego nie zrobiłeś.

Większość osób używa [węzła](https://nodejs.org) do aplikacji po stronie serwera. ale ze względu na bogaty zestaw API i kwitnącą społeczność Node, jest on również świetnie przydatny do osadzonej biblioteki. Ten post wyjaśnia, w jaki sposób węzeł jest używany jako biblioteka w Electron.

---

## Zbuduj system

Zarówno węzeł, jak i Electron używają [`GYP`](https://gyp.gsrc.io) jako swoich systemów budowy. Jeśli chcesz osadzić węzeł wewnątrz aplikacji, musisz użyć go również jako systemu budowy.

Nowy do `GYP`? Przeczytaj [ten poradnik](https://gyp.gsrc.io/docs/UserDocumentation.md) , zanim przejdziesz dalej do tego wpisu.

## Flagi węzła

Węzeł [`. yp`](https://github.com/nodejs/node/blob/v6.3.1/node.gyp) plik w katalogu kodu źródłowego Node opisuje, jak zbudowany jest węzeł wraz z mnóstwem [`GYP`](https://gyp.gsrc.io) zmienne kontrolujące które części węzła są włączone i czy otworzyć niektóre konfiguracje.

Aby zmienić flagi budowy, musisz ustawić zmienne w pliku `.gypi` twojego projektu. Skrypt `konfiguracja` w węźle może wygenerować dla Ciebie wspólne konfiguracje, na przykład uruchamianie `. konfiguracja --shared` wygeneruje `config.gypi` ze zmiennymi instruującymi węzeł do budowy jako wspólną bibliotekę.

Electron nie używa skryptu `konfiguracja` , ponieważ ma własne skrypty budowy. Konfiguracje dla węzła są zdefiniowane w pliku [`common.gypi`](https://github.com/electron/electron/blob/master/common.gypi) w katalogu kodów źródłowych Electrona.

## Połącz węzeł z Electronem

W Electronie, Węzeł jest połączony jako wspólna biblioteka, ustawiając zmienną `GYP` `node_shared` na `true`, więc typ budowy węzła zostanie zmieniony z `pliku wykonywalnego` na `shared_library`, a kod źródłowy zawierający `główny węzeł` punkt wejścia nie zostanie skompilowany.

Ponieważ Electron używa biblioteki V8 dostarczonej z Chromium, biblioteka V8 zawarta w kodzie źródłowym węzła nie jest używana. Dokonuje się tego poprzez ustawienie `node_use_v8_platform` i `node_use_bundled_v8` na `false`.

## Wspólna biblioteka lub biblioteka statyczna

Podczas łączenia z Node, istnieją dwie opcje: możesz zbudować Node jako statyczną bibliotekę i umieścić go w ostatecznym pliku wykonywalnym, lub możesz zbudować go jako wspólną bibliotekę i wysłać ją obok ostatecznego pliku wykonywalnego.

W Electron węzeł był od dawna budowany jako biblioteka statyczna. Dzięki temu kompilacja stała się prosta, włączyła najlepsze optymalizacje kompilatorów i pozwoliła Electron na dystrybucję bez dodatkowego pliku `node.dll`.

Zmieniło się to jednak po przełączeniu Chrome na [BoringSSL](https://boringssl.googlesource.com/boringssl). BoringSSL to fork [OpenSSL](https://www.openssl.org) , który usuwa kilka nieużywanych interfejsów API i zmienia wiele istniejących interfejsów. Ponieważ węzeł nadal korzysta z OpenSSL, kompilator wygenerowałby wiele błędów łączenia z powodu sprzecznych symboli jeśli są ze sobą połączone.

Electron nie mógł użyć BoringSSL w Noda lub użyć OpenSSL w Chromium, więc jedyną opcją było przełączenie na budowę węzła jako wspólnej biblioteki, i [ukryj symbole BoringSSL i OpenSSL](https://github.com/electron/electron/blob/v1.3.2/common.gypi#L209-L218) w elementach każdego z nich.

Zmiana ta przyniosła pewne pozytywne działania niepożądane. Przed tym zmień nie można zmienić nazwy pliku wykonywalnego Electron w systemie Windows, jeśli używasz natywnych modułów, ponieważ nazwa pliku wykonywalnego była kodowana w bibliotece importu. After Node was built as a shared library, this limitation was gone because all native modules were linked to `node.dll`, whose name didn't need to be changed.

## Obsługa modułów natywnych

[natywne moduły](https://nodejs.org/api/addons.html) w węźle poprzez zdefiniowanie funkcji wpisu węzła do załadowania, a następnie wyszukiwanie symboli V8 i libuva z Node. To jest trochę problemów dla osadników, ponieważ domyślnie symbole V8 i libuv są ukryte podczas budowy węzła jako biblioteki i natywnych modułów nie będą wczytywane , ponieważ nie mogą znaleźć symboli.

Więc aby moduły natywne działały, symbole V8 i libuv były eksponowane w Electron. Dla V8 jest to zrobione przez [wymuszanie wszystkich symboli w pliku konfiguracyjnym Chromium'a](https://github.com/electron/libchromiumcontent/blob/v51.0.2704.61/chromiumcontent/chromiumcontent.gypi#L104-L122). Dla libuva jest osiągany przez [ustawienie definicji `BUILDING_UV_SHARED=1`](https://github.com/electron/electron/blob/v1.3.2/common.gypi#L219-L228).

## Uruchamianie węzła w aplikacji

Po całej pracy budowania i łączenia z węzłem, ostatnim krokiem jest uruchomienie węzła w Twojej aplikacji.

Węzeł nie zapewnia wielu publicznych API do osadzania się w innych aplikacjach. Zazwyczaj możesz zadzwonić do [`węzła::Start` i `węzła::init`](https://github.com/nodejs/node/blob/v6.3.1/src/node.h#L187-L191) aby rozpocząć nową instancję węzła. Jeśli jednak budujesz skomplikowaną aplikację opartą na Node, musisz używać API takich jak `węzeł::CreateEnvironment` , aby dokładnie kontrolować każdy krok.

W Electronie, węzeł jest uruchamiany w dwóch trybach: trybie autonomicznym, który działa w głównym procesie, który jest podobny do oficjalnych binarów węzłów i trybu osadzonego , który wprowadza Node API na strony internetowe. Szczegóły tego zostaną wyjaśnione w przyszłym wpisie.

