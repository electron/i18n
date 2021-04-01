---
title: Простые образцы Electron
author: zeke
date: '2017-01-19'
---

Недавно у нас был хакатон в кабинете GitHub для членов [Академии Hackbright](https://hackbrightacademy.com), школа кодирования для женщин, основанная в Сан-Франциско. Чтобы помочь участникам начать работу над своими проектами, наши собственные [Кевин Савицки](https://github.com/kevinsawicki) создали несколько образцов приложений Electron.

---

Если вы новичок в разработке Electron или еще не попробовали его, примеры приложений отлично начинаются. Они маленькие, легко читаемые, и код сильно комментируется, чтобы объяснить, как все работает.

Чтобы начать, клонируйте репозиторий:

```sh
git clone https://github.com/electron/simple-samples
```

Чтобы запустить любое из перечисленных ниже приложений, перейдите в каталог приложения, установите зависимости, а затем запустите:

```sh
cd activity-monitor
npm install
npm start
```

## Монитор активности

Показывает тестовую диаграмму системы ЦП, пользователя и времени простоя.

[![Скриншот](https://cloud.githubusercontent.com/assets/671378/20894933/3882a328-bacc-11e6-865b-4bc1c5ac7ec7.png)](https://github.com/kevinsawicki/electron-samples/tree/master/activity-monitor)

## Хэш

Показывает хэш-значения введенного текста с помощью различных алгоритмов.

[![скриншот](https://cloud.githubusercontent.com/assets/671378/21204178/de96fa12-c20a-11e6-8e94-f5b16e676eee.png)](https://github.com/kevinsawicki/electron-samples/tree/master/hash)

## Зеркало

Воспроизведение видео камеры компьютера с максимальным размером, как видно в зеркало. Включает дополнительный эффект радужного фильтра, который использует анимацию CSS.

## Цены

Показывает текущую цену на нефть, золота и серебра с использованием Yahoo Finance API.

[![скриншот](https://cloud.githubusercontent.com/assets/671378/21198004/6e7a3798-c1f2-11e6-8228-495de90b7797.png)](https://github.com/kevinsawicki/electron-samples/tree/master/prices)

## URL

Загружает URL, передаваемый командной строкой в окне.

## Другие ресурсы

Мы надеемся, что эти приложения помогут вам начать использовать Electron. Вот несколько других ресурсов для обучения:

- [Электрон-быстрый старт](https://github.com/electron/electron-quick-start): Минимальная котельная пластина приложения Electron.
- [Electron API Demos](https://github.com/electron/electron-api-demos): Интерактивное приложение, демонстрирующее основные функции Electron API
- [electronjs.org/docs/all](https://electronjs.org/docs/all/): Вся документация Electron вместе на одной странице поиска.
- [hokein/electron-sample-apps](https://github.com/hokein/electron-sample-apps): Другая коллекция образцов приложений для Electron, скомпилированных сопровождающим Electron [Haojian Wu](https://github.com/hokein).
- [awesome-electron](https://github.com/sindresorhus/awesome-electron) - репозиторий GitHub, который собирает новейшие и лучшие учебники, связанные с Electron, книги, видео и т. д.