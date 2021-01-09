---
title: Nowa kadencja wydania Electrona
author: sofianguy
date: '2019-05-13'
---

🎉 Electron przenosi się do wydania nowej, stabilnej wersji co 12 tygodni! 🎉

---

## ⚡ Wow to szybko! Ale dlaczego?

Po prostu Chromium nie zatrzymuje wysyłki, więc Electron również nie zwolni się.

Chrom uwalnia spójny schemat [tygodnia](https://www.chromium.org/developers/calendar). Aby dostarczyć najnowsze wersje Chromium w Electronie, nasz harmonogram musi śledzić ich wersje. Więcej informacji o cyklu uwalniania Chromium można znaleźć [tutaj](https://chromium.googlesource.com/chromium/src/+/master/docs/process/release_cycle.md).

## 🚀 Dlaczego co 12 tygodni?

Co 6 tygodni, nowe wydanie Chromium pojawia się z nowymi funkcjami, poprawkami błędów / poprawkami zabezpieczeń i poprawkami V8. Użytkownicy Electron byli głośni i jasni, jeśli chodzi o chęć wprowadzenia tych zmian w odpowiednim czasie, więc dostosowaliśmy nasze stabilne daty wydania tak, aby odpowiadały każdej innej stabilnej wersji Chromium. Najpierw Electron v6.0. będzie zawierać M76 i jest zaplanowane do stabilnego wydania [30 lipca, 2019](https://electronjs.org/docs/tutorial/electron-timelines#600-release-schedule), ten sam dzień wydania co [Chromium M76](https://www.chromestatus.com/features/schedule).

## :build: Co to oznacza dla mnie i mojej aplikacji Electron?

Będziesz mieć dostęp do nowych funkcji Chromium i V8 oraz poprawek szybciej niż wcześniej. Co ważne, wiesz również _kiedy_ pojawią się nowe zmiany, więc będziesz w stanie zaplanować z lepszymi informacjami niż dotychczas.

Zespół Electron [będzie nadal wspierał](https://electronjs.org/docs/tutorial/support#supported-versions) najnowsze trzy główne wersje. Na przykład, gdy [v6.0.0 stanie się stabilny 30 lipca 2019](https://electronjs.org/docs/tutorial/electron-timelines#600-release-schedule), będziemy wspierać v6.x, v5.x i v4.x, podczas gdy v3.x osiągnie End-Of-Life.

## 💬 Program Feedbacku Aplikacji

Rozważ dołączenie do naszego [programu informacyjnego aplikacji](https://electronjs.org/blog/app-feedback-program) , aby pomóc nam przetestować nasze wersje beta i stabilizację. Projekty, które uczestniczą w tym programie testują Electrona betas na swoich aplikacjach; i w zamian za nowe błędy, które znajdą są priorytetowe dla stabilnego wydania.

## 📝 Krótka historia wydań Electron

Decyzje dotyczące stabilnych wydań przed v3.0.0 nie były zgodne z harmonogramem. Dodaliśmy wewnętrzne harmonogramy do projektu z v3.0.0 i v4.0.0. Wcześniej w tym roku postanowiliśmy opublikować naszą stabilną datę wydania po raz pierwszy dla [Electron v5.0.0](https://electronjs.org/blog/electron-5-0-timeline). Ogłaszanie naszych stabilnych dat wydania zostało ogólnie pozytywnie odebrane i jesteśmy podekscytowani, że będziemy nadal robić to dla przyszłych wydań.

In order to better streamline these upgrade-related efforts, our [Upgrades](https://github.com/electron/governance/tree/master/wg-upgrades) and [Releases](https://github.com/electron/governance/tree/master/wg-releases) Working Groups were created within our [Governance](https://electronjs.org/blog/governance) system. Pozwoliły nam one lepiej traktować priorytetowo i delegować te prace, które - jak mamy nadzieję - staną się bardziej widoczne przy każdym kolejnym wydaniu.

Oto gdzie nasza nowa kadencja pozwoli nam porównać kadencję Chromium:
<img alt="wykres linii porównujący Electron z wersjami Chromium" src="https://user-images.githubusercontent.com/2138661/57543187-86340700-7308-11e9-9745-a9371bb29275.png" />

📨 Jeśli masz pytania, napisz do nas pod adresem [info@electronjs.org](mailto:info@electronjs.org).
