---
title: Новий реліз Electron Cadence
author: софіангі
date: '2019-05-13'
---

🎉 Electron рухається до випуску нової мажорної стабільної версії кожні 12 тижнів! 🎉

---

## ⚡ Вау, це швидко! Але чому?

Простіше кажучи, Chromium не зупинить доставку, тож Electron також не сповільниться.

Chromium релізи на послідовний 6-тижневий [розклад](https://www.chromium.org/developers/calendar). Для доставки найновіших версій Chromium у Electron, нашому графіку необхідно відстежувати своє. More information around Chromium's release cycle can be found [here](https://chromium.googlesource.com/chromium/src/+/master/docs/process/release_cycle.md).

## 🚀 Чому кожні 12 тижнів?

Кожні 6 тижнів новий випуск Chromium виходить з новими функціями, виправленнями вад / виправленнями безпеки та покращеннями V8. Користувачі електронного листа були гучно і чітко пов'язано з тим, що до цих змін вчасно, таким чином, ми налаштували наші дати стабільного випуску відповідно до релізу стійкості Chromium. Up first, Electron v6.0.0 will include M76 and is scheduled for stable release on [July 30, 2019](https://electronjs.org/docs/tutorial/electron-timelines#600-release-schedule), the same release day as [Chromium M76](https://www.chromestatus.com/features/schedule).

## 🚧 Що означає для мене та мій додаток Electron?

У вас буде доступ до нових функцій Chromium і V8 і фіксації швидше, ніж раніше. Важливо, що ви також будете знати _коли_ ці нові зміни наступають, щоб ви могли планувати кращу інформацію, ніж раніше.

Команда Electron [продовжуватиме підтримувати](https://electronjs.org/docs/tutorial/support#supported-versions) останні три основні версії. Наприклад, коли [v6.0.0 стане стабільним 30 липня 2019 року](https://electronjs.org/docs/tutorial/electron-timelines#600-release-schedule), ми підтримаємо v6.x, v5.x, та v4.x, в той час як v3.x досягне життя End-Of-.

## 💬 Програма зворотнього зв’язку

Будь ласка, приєднайтеся до нашого [Програма зворотного зв’язку](https://electronjs.org/blog/app-feedback-program) щоб допомогти нам із тестуванням наших бета-релізів та стабілізації. Проекти, які беруть участь у цій програмі перевіряють бета-версію Electron у своїх додатках; і взамін, нові помилки, які вони виявили, пріоритетні для стабільної релізи.

## 📝 Коротка історія релізів Electron

Рішення навколо стабільних релізів до версії v3.0.0 не дотримувались розкладу. Ми додали внутрішні розклад до проекту з v3.0.0 та v4.0.0. На початку цього року ми вперше оприлюднили нашу стабільну дату видачі за [Electron v5.0.0](https://electronjs.org/blog/electron-5-0-timeline). Оголошення наших стабільних дат було позитивно отриманим, і ми з радістю радимо продовжувати це робити для майбутніх релізів.

Для того, щоб краще впорядкувати ці зусилля, пов'язані з оновленням, наші [Покращення](https://github.com/electron/governance/tree/master/wg-upgrades) та [Релізи](https://github.com/electron/governance/tree/master/wg-releases) Робочі групи були створені в системі [Уряду](https://electronjs.org/blog/governance). Вони дозволили нам краще надавати нам пріоритети та делегувати цю роботу, що, як ми сподіваємося, стане більш очевидним з кожним наступним звільненням.

Ось тут наша нова каденція допоможе нам порівняно з кадрум Chromium:
<img alt="лінійний графік Electron проти версій Chromium" src="https://user-images.githubusercontent.com/2138661/57543187-86340700-7308-11e9-9745-a9371bb29275.png" />

📨 Якщо у вас є питання, будь ласка, напишіть нам на [info@electronjs.org](mailto:info@electronjs.org).
