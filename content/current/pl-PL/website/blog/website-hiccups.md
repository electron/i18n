---
title: Hiccups strony internetowej
author: zeke
date: '2018-02-12'
---

W zeszłym tygodniu strona [electronjs.org](https://electronjs.org) miała kilka minut przestoju. Gdybyś ucierpiał z powodu tych krótkich przerw w pracy, przepraszamy za niedogodności. Po pewnym czasie badania zdiagnozowaliśmy przyczynę główną i wdrożyliśmy [naprawę](https://github.com/electron/electronjs.org/pull/1076).

---

Aby zapobiec tego rodzaju przestojom w przyszłości, włączyliśmy [alerty progowe Heroku](https://devcenter.heroku.com/articles/metrics#threshold-alerting) w naszej aplikacji. Za każdym razem, gdy nasz serwer zbiera nieudane żądania lub powolne odpowiedzi przekraczające określony próg, nasz zespół zostanie powiadomiony, abyśmy mogli szybko rozwiązać problem.

## Dokumenty offline w każdym języku

Następnym razem, gdy tworzysz aplikację Electron na samolocie lub w subterraneańskim sklepie z kawiarnią możesz mieć kopię dokumentów do odwołania w trybie offline. Na szczęście dokumenty Electrona są dostępne jako pliki Markdown w ponad 20 językach.

```sh
git clone https://github.com/electron/electron-i18n
ls electron-i18n/content
```

## Dokumenty offline z interfejsem graficznym

[devdocs. o/electron](https://devdocs.io/electron/) jest poręczną stroną internetową, która przechowuje dokumentację do użytku offline, nie tylko dla Electrona, ale wielu innych projektów, takich jak JavaScript, TypeScript, Node. , React, Angular i wiele innych. I oczywiście jest również aplikacja Electrona. Sprawdź [devdocs-app](https://electronjs.org/apps/devdocs-app) na stronie Electron.

[![](https://user-images.githubusercontent.com/8784712/27121730-11676ba8-511b-11e7-8c01-00444ee8501a.png)](https://electronjs.org/apps/devdocs-app)

Jeśli lubisz zainstalować aplikacje bez użycia myszy lub trackpad, podaj [Electron Forge](https://electronforge.io/) `zainstaluj` polecenie:

```sh
npx electron-forge install egoist/devdocs-app
```