---
title: 'Projekt tygodnia: WordPress Desktop'
author:
  - mkaz
  - johngodley
  - zeke
date: '2017-02-28'
---

W tym tygodniu dotarliśmy do ludzi w [Automattic](https://automattic.com/) , aby porozmawiać o [Pulpicie WordPress](https://apps.wordpress.com/desktop/), klienta open-source do zarządzania zawartością WordPress.

---

[![Aplikacje WordPress](https://cloud.githubusercontent.com/assets/2289/23391881/ea54d52e-fd2c-11e6-86ec-98fe466d5c5c.gif)](https://apps.wordpress.com/desktop/)

## Wszyscy wiedzą o WordPress, ale co to jest komputer WordPress?

[WordPress. Aplikacja om desktopowa](https://apps.wordpress.com/desktop/) zapewnia płynne i międzyplatformowe doświadczenie, które pozwala skupić się na treści i projekcie bez zakładek przeglądarki, aby rozpraszać Cię - lub aby twoje strony były na boku, ale dostępne. W połączeniu z obsługą przeglądarki i aplikacją mobilną możesz zbudować swoją stronę gdziekolwiek, w jakikolwiek sposób, który pomoże Ci wykonać swoją pracę.

## Dlaczego warto zbudować aplikację desktopową do zarządzania stronami WordPress? Nie można tego wszystkiego oprzeć na Internecie?

W rzeczywistości używa dokładnie tej samej technologii, którą otrzymujesz podczas odwiedzania [WordPress.com](https://wordpress.com) w przeglądarce. Jednak wszystko jest lokalnie hostowane, więc ma minimalny czas ładowania. Z korzyścią dla natywnych funkcji, takich jak bycie w Twoim doku, powiadomienia itp., naprawdę możesz skupić się na swoich stronach WordPress i blogu.

## Dlaczego zdecydowałeś się budować pulpit WordPress na Electron?

Pod koniec 2015 roku przebudowaliśmy znaczną część WordPress.com w formie [Calypso](https://github.com/automattic/wp-calypso), nowoczesnej aplikacji JavaScript open source z użyciem React. Zaczęliśmy przyglądać się Electronowi i wraz z pewnymi zmianami w Calypso mogliśmy uruchomić go lokalnie. Było to miarodajne doświadczenie i sądziliśmy, że jego dalszy rozwój jest bardzo cenny.

Mieliśmy kilka zespołów pracujących nad Calypso. Stworzenie pełnoprawnego wieloplatformowego klienta GUI, który pasuje do tego przy użyciu tradycyjnych technologii komputerowych, wymagałoby większej pracy. Używając Electrona, mały zespół liczący 2-4 z nas był w stanie wykorzystać wysiłki drugiego zespołu i zbudować aplikację desktopową w ciągu kilku miesięcy.

## Jakie wyzwania stoją przed Tobą podczas budowy komputera WordPress?

Otrzymaliśmy bardzo szybką wstępną wersję aplikacji, ale dostrojenie, aby zachować się optymalnie jako aplikacja desktopowa zajęło dużo więcej czasu. Jednym z wielkich wyzwań związanych z aplikacją jest to, że faktycznie używasz kopii Calypso na swoim własnym komputerze - jest to interfejs użytkownika oparty wyłącznie na API. W ten sposób zaangażowano wiele prac pomostowych, a zmiany zostały wprowadzone z powrotem do samego Calypso.

Ponadto wiele wysiłku poświęcono na zapakowanie aplikacji na różne platformy - oferujemy Windows, wersje macOS i Linux - i istnieją wystarczające różnice, aby uczynić ten trudny.

W tym czasie Electron był stosunkowo nowy i ciągle poruszaliśmy kwestie, które zostały wkrótce rozwiązane (czasami tego samego dnia!)

## W jakich obszarach należy ulepszyć Electron?

Electron zapewnia już większość tego, czego potrzebujemy dla aplikacji komputerowej, i jest szybko rozwijany od czasu rozpoczęcia korzystania z niej. Niemniej jednak w aplikacji komputerowej uwzględniono pewne obszary, które są uznawane za oczywiste, Takie jak sprawdzanie pisowni i odkrycie/zastąpienie, które są trudniejsze do replikacji przy użyciu Electron jako.

Cieszymy się również widzieć niektóre z nowszych technologii Chrome również w Electron. Jesteśmy szczególnie zainteresowani eksperymentami z WebVR.

## Jakie są twoje ulubione rzeczy o Electron?

Głównym powodem, dla którego wybraliśmy Electron, i jest to największa siła, jest bardzo aktywna i otwarta społeczność. Automattic zawsze wierzył w open source. Jest to jeden z naszych podstawowych tenetów, oraz projekt i społeczność Electron podąża za wieloma podstawowymi przekonaniami co do tego, że są bardzo otwarte i pozytywne.

## Co będzie następne na pulpicie WordPress?

Doskonała rzecz o naszym modelu polega na tym, że aplikacja desktopowa korzysta z każdej nowej funkcji Calypso - istnieją ciągłe ulepszenia. Mamy nadzieję, że możemy dodać do aplikacji dodatkowe funkcje, takie jak obsługa offline, które naprawdę przeniosłyby aplikację na natywne terytorium i lepsze powiadomienia systemowe.

## Czy są jakieś zespoły w Automattic pracujące nad innymi aplikacjami Electron?

Tak, po naszych wysiłkach w aplikacji komputerowej, zespół Simplenote postanowił użyć Electrona do budowania aplikacji desktopowych dla Windows i Linux (natywny klient Mac już istnieje). [Aplikacja Simplenote Electron](https://github.com/Automattic/simplenote-electron) jest również otwartym źródłem i dostępna na Githubie.

Mamy również zbliżającą się integrację Raspberry Pi, która korzysta z Electron.

Jeśli którakolwiek z tych informacji brzmi interesująco, to [chcielibyśmy usłyszeć od Ciebie](https://automattic.com/work-with-us/)!

## Jakiekolwiek wskazówki dla Electrona, które mogą być przydatne dla innych programistów?

Proces wysyłania podpisanego oprogramowania komputerowego jest dla nas stosunkowo nowy, zwłaszcza dla Windows. napisaliśmy artykuł dla [Code Signing a Windows App](https://mkaz.blog/code/code-signing-a-windows-application/) , który zawiera ten proces, a kilka przeszkód, które przebyliśmy, aby to zrobić.

