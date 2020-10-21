---
title: Przerwanie wsparcia dla 32-bitowego Linuxa
author: felixrieseberg
date: '2019-03-04'
---

Zespół Electron przerwie obsługę 32-bitowego Linux (ia32 / i386) zaczynając od Electron v4.0. Ostatnia wersja Electrona, która obsługuje 32-bitowe instalacje Linux to Electron v3.1, który otrzyma wsparcie do czasu wydania Electron v6. Obsługa dla 64-bitowych systemów Linux i `armv7l` będzie kontynuowana bez zmian.

---

## Czego dokładnie Electron już nie obsługuje?

Być może widzisz opisy "64-bit" i "32-bit" jako naklejki na komputerze lub opcje pobierania oprogramowania. Termin ten stosuje się do opisu konkretnej architektury komputera. Większość komputerów wyprodukowanych w latach dziewięćdziesiątych i na początku XXI wieku wykonano z procesorami opartymi na architekturze 32-bitowej, podczas gdy większość komputerów wyprodukowanych później opierała się na nowszej i potężniejszej architekturze 64-bitowej. Nintendo 64 (zdobyć? a PlayStation 2 był pierwszym powszechnie dostępnym urządzeniem konsumpcyjnym posiadającym nową architekturę, komputery sprzedawane po 2010 r. zawierały prawie wyłącznie procesory 64-bitowe. W rezultacie kurczy się wsparcie: Google przestało udostępniać Chrome na 32-bitowy Linux w marcu 2016 r., Kanoniczna przestała dostarczać 32-bitowych obrazów na pulpicie w 2017 r. i porzuciła obsługę 32-bitową razem z Ubuntu 18.10. Arch Linux, podstawowy system operacyjny i inne znaczące rozkład systemu Linux już zrzuciły wsparcie dla architektury procesora starzeń.

Do tej pory Electron dostarczał i wspierał kompilacje, które działają na starszej 32-bitowej architekturze. Począwszy od wersji v4.0, zespół Electron nie będzie już w stanie zapewnić binarnym ani wsparcia dla 32-bitowego Linuxa.

Electron zawsze był dynamicznym projektem open source i nadal wspieramy i zachęcamy twórców zainteresowanych budowaniem Electron dla egzotycznych architektur.

## Co to oznacza dla programistów?

Jeśli obecnie nie dostarczasz 32-bitowych rozkładów aplikacji dla Linux, nie jest wymagane żadne działanie.

Projekty, które wysyłają 32-bitowe aplikacje Linux Electron będą musiały zdecydować, jak kontynuować. 32-bitowy Linux będzie obsługiwany przez Electron 3 [do](https://electronjs.org/docs/tutorial/support#supported-versions) wydania Electron 6, co daje trochę czasu na podjęcie decyzji i planów.

## Co to oznacza dla użytkowników?

Jeśli jesteś użytkownikiem systemu Linux i nie wiesz, czy używasz systemu opartego na 64-bitach, prawdopodobnie działasz na 64-bitowej architekturze. Aby upewnić się, że możesz uruchomić polecenia `lscpu` lub `uname -m` w swoim terminalu. Każdy z nich wydrukuje Twoją obecną architekturę.

Jeśli używasz Linux w 32-bitowym procesorze, prawdopodobnie napotkałeś już trudności ze znalezieniem niedawno wydanego oprogramowania dla Twojego systemu operacyjnego. Zespół Electron dołącza do innych wybitnych członków społeczności Linux, zalecając ulepszenie do architektury opartej na 64-bitach.
