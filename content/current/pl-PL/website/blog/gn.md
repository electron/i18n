---
title: "Używanie GN do budowania Electron"
author: nornagon
date: '2018-09-05'
---

Electron używa teraz GN do budowy siebie. Oto dlaczego.

---

# GYP i GN

Kiedy Electron został po raz pierwszy opublikowany w 2013 r., konfiguracja kompilacji Chromium została zapisana z [GYP](https://gyp.gsrc.io/), skrót dla "Generate your Projects".

W 2014 r. projekt Chromium wprowadził nowe narzędzie konfiguracyjne budowy o nazwie [GN](https://gn.googlesource.com/gn/) (skrót dla "Generate [Ninja](https://ninja-build.org/)") Pliki kompilacji Chromium zostały przeniesione do GN i GYP zostały usunięte z kodu źródłowego.

Electron zachował historycznie separację między głównym [kodem Electron](https://github.com/electron/electron) i [libchromiumcontent](https://github.com/electron/libchromiumcontent), część Electrona, która zawiera podmoduł "zawartość" Chromium. Electron działał przy użyciu GYP, podczas gdy libchrom – jako podzbiór chromu – przełączył się na GN, gdy Chromium zrobił.

Podobnie jak narzędzia, które nie są dość siatkowe, istniały tarcia między dwoma systemami budowy. Utrzymanie kompatybilności było podatne na błędy, z flagi kompilatora i `#definiuje` , które musiały być starannie trzymane w synchronizacji pomiędzy Chromium, Node, V8 i Electronem.

Aby temu zaradzić, zespół Electron pracuje nad przeniesieniem wszystkiego do GN. Dzisiaj [zobowiązuje się](https://github.com/electron/electron/pull/14097) , aby usunąć ostatni z kodu GYP z Electron został wyładowany u kapitana.

# Co to oznacza dla ciebie

Jeśli przyczyniasz się do samego Electrona, proces sprawdzania i budowania Electrona od `mistrza` lub 4. .0 jest bardzo różny niż w 3.0.0 i wcześniej. Zobacz [Instrukcje budowy GN](https://github.com/electron/electron/blob/master/docs/development/build-instructions-gn.md) , aby uzyskać szczegóły.

Jeśli tworzysz aplikację z Electron, możesz zauważyć kilka drobnych zmian w nowym Electronie 4. .0-noc; ale bardziej niż prawdopodobna zmiana systemu budowy Electron będzie dla ciebie całkowicie przejrzysta.

# Co to oznacza dla Electron

GN jest [szybszy](https://chromium.googlesource.com/chromium/src/tools/gn/+/48062805e19b4697c5fbd926dc649c78b6aaa138/README.md) niż GYP, a jego pliki są bardziej czytelne i utrzymywalne. Ponadto mamy nadzieję, że użycie pojedynczego systemu konfiguracji kompilacji zmniejszy pracę wymaganą do uaktualnienia Electron do nowych wersji Chromium.

 * Pomogło to już w rozwoju Electron 4.0.0, ponieważ Chromium 67 usunął obsługę MSVC i przełączył się na budowę z Clang na Windows. Dzięki budowie GN odziedziczymy wszystkie kompilatory z Chromium bezpośrednio, dzięki czemu stworzyliśmy Clang na Windows za darmo!

 * Ułatwiło również Electronowi korzystanie z [BoringSSL](https://boringssl.googlesource.com/boringssl/) w jednolitej budowie w Electronie, Chrom i węzeł -- coś, co było [problematyczne przed](https://electronjs.org/blog/electron-internals-using-node-as-a-library#shared-library-or-static-library).
