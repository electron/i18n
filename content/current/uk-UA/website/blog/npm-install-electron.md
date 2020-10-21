---
title: npm install electron
author: zeke
date: '2016-08-16'
---

Починаючи з версії Electron 1.3.1, ви можете `npm встановити електрон --save-dev` до встановити останню заплановану версію Electron у вашому додатку.

---

![npm install electron](https://cloud.githubusercontent.com/assets/378023/17259327/3e3196be-55cb-11e6-8156-525e9c45e66e.png)

## Рекомендований бінарний Electron

Якщо ви раніше колись працювали над застосунком Electron, то ймовірно ви стикаєтеся з `електричними попередньо збудованими` npm пакетом. Цей пакет є незамінною частиною майже кожного проекту Electron. When installed, it detects your operating system and downloads a prebuilt binary that is compiled to work on your system's architecture.

## Нова назва

Процес установки Electron часто був спотикальним блоком для нових розробників. Many brave people tried to get started developing an Electron by app by running `npm install electron` instead of `npm install electron-prebuilt`, only to discover (often after much confusion) that it was not the `electron` they were looking for.

Це було тому, що вже був існуючий `електронний` проект на npm, створений до існування проекту GitHub. To help make Electron development easier and more intuitive for new developers, we reached out to the owner of the existing `electron` npm package to ask if he'd be willing to let us use the name. На щастя, він був фанам нашого проекту і погодився допомогти нам змінити ім'я .

## Попередні життя на

Починаючи з версії 1.3.1, ми почали публікувати [`електро`](https://www.npmjs.com/package/electron) і `електрон` пакети до npm в тандемі. Ці два пакети ідентичні. Ми вирішили продовжити публікацію пакету під обома іменами на деякий час, так що не зручно тисяч розробників, які наразі використовують `electron-prebuilt` у своїх проектах. We recommend updating your `package.json` files to use the  new `electron` dependency, but we will continue releasing new versions of `electron-prebuilt` until the end of 2016.

The [electron-userland/electron-prebuilt](https://github.com/electron-userland/electron-prebuilt) repository will remain the canonical home of the `electron` npm package.

## Дуже дякую

Ми ведемо особливу подяку [@mafintosh](https://github.com/mafintosh), [@maxogden](https://github.com/maxogden), і багато інших [учасників](https://github.com/electron-userland/electron-prebuilt/graphs/contributors) для створення та утримання `електронів`, і при невтомному обслуговуванні на JavaScript, Node. , і спільноти Electron.

І завдяки [@logicalparadox](https://github.com/logicalparadox) з можливістю взяти до уваги `пакет` на npm.

## Оновлення ваших проектів

Ми співпрацювали з спільнотою для оновлення популярних пакетів, на які впливають в цій зміні. Пакунки типу [electron-packager](https://github.com/electron-userland/electron-packager), [electron-rebuild](https://github.com/electron/electron-rebuild), і [конструктор електронів](https://github.com/electron-userland/electron-builder) вже оновлено для роботи з новим ім'ям при продовженні підтримки старої назви.

If you encounter any problems installing this new package, please let us know by opening an issue on the [electron-userland/electron-prebuilt](https://github.com/electron-userland/electron-prebuilt/issues) repository.

Щодо будь-яких проблем з Electron, будь ласка, використовуйте [електрон / електрон](https://github.com/electron/electron/issues) репозиторій.

