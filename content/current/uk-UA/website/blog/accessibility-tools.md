---
title: Інструменти для спец. можливостей
author: молодший
date: '2016-08-23'
---

Створення доступу до доступних програм дуже важливе, і ми з радістю представляємо нові функціональні можливості [Devtron](https://electronjs.org/devtron) та [Spectron](https://electronjs.org/spectron) , що дає розробникам можливість покращити їх додаткам для всіх.

---

Проблеми з доступністю для Electron додатків схожі на ті веб-сайти, тому що вони в кінцевому рахунку HTML. За допомогою застосунків Electron, однак, ви не можете використовувати онлайн-ресурси для контролю доступності тому що ваш додаток не має URL для вказівника.

Ці нові функції надають ці інструменти аудиту для програми Electron. Ви можете вибрати перевірку ваших тестів за допомогою Spectron або використовувати їх в інструментах DevTools з Devtron. Читайте на огляд інструментів або отримайте нашу [доступну документацію](https://electronjs.org/docs/tutorial/accessibility/) для отримання додаткової інформації.

### Spectron

При тестуванні специфікації фреймворку ви можете тепер перевіряти кожне вікно і тег `<webview>` у вашому додатку. Наприклад:

```javascript
app.client.auditAccessibility().then(function (audit) {
  if (audit.failed) {
    console.error(audit.message)
  }
})
```

Ви можете прочитати більше про цю функцію в документації [Spectron's](https://github.com/electron/spectron#accessibility-testing).

### Devtron

У Devtron є нова вкладка доступності, яка дозволить вам перевіряти сторінку у програмі, сортувати і фільтрувати результати.

![Скріншот розробника](https://cloud.githubusercontent.com/assets/1305617/17156618/9f9bcd72-533f-11e6-880d-389115f40a2a.png)

Обидва ці інструменти використовують [бібліотеку розробника](https://github.com/GoogleChrome/accessibility-developer-tools) з набору розробників </a> за допомогою Google для Chrome. Ви можете дізнатися більше про правила аудиту доступності, які використовує ця бібліотека на [вікі репозиторію](https://github.com/GoogleChrome/accessibility-developer-tools/wiki/Audit-Rules).

Якщо ви знаєте про інші чудові інструменти для доступності для Electron, додайте їх до [документації](https://electronjs.org/docs/tutorial/accessibility/) за допомогою pull request.

