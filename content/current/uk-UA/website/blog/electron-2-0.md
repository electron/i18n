---
title: Electron 2.0.0
author: ckerr
date: '2018-05-02'
---

Після більш ніж чотирьох місяців розробки восьми бета-релізів і по всьому світу тестування з проіндексованих відкатів програм та випуску Electron 2. .0 тепер доступно з [electronjs.org](https://electronjs.org/).

---

## Процес релізу

Починаючи з 2.0.0, релізи Electron будуть використовувати [семантичну версію](https://electronjs.org/blog/electron-2-semantic-boogaloo). Це означає, що основна версія буде набагато частіше оновлюватися і зазвичай буде головними оновленнями до Chromium. Патч-релізи повинні бути стабільнішими, оскільки вони будуть містити тільки високі пріоритетні виправлення.

Електрон 2.0.0 також представляє покращення того, як Electron стабілізовано перед великою версією. Кілька великих масштабних додатків Electron включили ставку 2.0.0 у проіндексованих виплатах, надавши найкращий зворотній зв'язок Electron, який коли-небудь мав для бета-серії.

## Зміни / Нові можливості

 * Основні частини інструментарію Electron, включаючи Chrome 61, Node 8.9.3, V8 6.534.41, GTK+ 3 на Linux, оновлена орфографічна перевірка і Squirrel.
 * [Покупки через додаток](https://electronjs.org/blog/in-app-purchases) тепер підтримуються на MacOS. [#11292](https://github.com/electron/electron/pull/11292)
 * Новий API для завантаження файлів. [#11565](https://github.com/electron/electron/pull/11565)
 * Новий API, щоб увімкнути чи вимкнути вікно. [#11832](https://github.com/electron/electron/pull/11832)
 * New API app.setLocale(). [#11469](https://github.com/electron/electron/pull/11469)
 * Нова підтримка логування повідомлень IPC. [#11880](https://github.com/electron/electron/pull/11880)
 * Нові події в меню. [#11754](https://github.com/electron/electron/pull/11754)
 * Додайте `подію` до Монітора. [#11417](https://github.com/electron/electron/pull/11417)
 * Додати `спорідненість` варіант збору декількох BrowserWindows в один процес. [#11501](https://github.com/electron/electron/pull/11501)
 * Додати можливість для збереженого діалогового вікна до списку доступних розширень. [#11873](https://github.com/electron/electron/pull/11873)
 * Підтримка додаткових сповіщень [#11647](https://github.com/electron/electron/pull/11647)
 * Можливість встановити заголовок кнопки закриття macOS сповіщення. [#11654](https://github.com/electron/electron/pull/11654)
 * Додати умовну для menu.popup(window, callback)
 * Збільшення пам'яті на елементи панелі дотику. [#12527](https://github.com/electron/electron/pull/12527)
 * Удосконалено рекомендацію щодо контролю безпеки.
 * Додати App-Scoped Security видимі закладки. [#11711](https://github.com/electron/electron/pull/11711)
 * Додає можливість встановлювати довільні аргументи в процесі рендера. [#11850](https://github.com/electron/electron/pull/11850)
 * Додати вид аксесуара для вибору формату. [#11873](https://github.com/electron/electron/pull/11873)
 * Виправлено помилку мережі делегування умов гонорак. [#12053](https://github.com/electron/electron/pull/12053)
 * Кинути підтримку для `mips64el` арки на Linux. Electron потребує ланцюжок інструментів C+14, який був не доступний для цього арки під час випуску. Ми сподіваємося повторно додати підтримку в майбутньому.

## Зміни в API

 * Видалено [застарілий API](https://github.com/electron/electron/blob/v2.0.0-beta.8/docs/tutorial/planned-breaking-changes.md), у тому числі:
   * Змінено підпис `menu.popup`. [#11968](https://github.com/electron/electron/pull/11968)
   * Видалено застарілий `crashReporter.setExtraParameter` [#11972](https://github.com/electron/electron/pull/11972)
   * Видалено застарілі `webContents.setZoomLevelLimits` та `webFrame.setZoomLevelLimits`. [#11974](https://github.com/electron/electron/pull/11974)
   * Видалено застарілі методи `обміну`. [#11973](https://github.com/electron/electron/pull/11973)
   * Прибрана підтримка булевих параметрів для параметра `tray.setHighlightMode`. [#11981](https://github.com/electron/electron/pull/11981)

## Виправлення помилок

 * Змінено, щоб переконатися, що `webContents.isOffscreen()` завжди доступний. [#12531](https://github.com/electron/electron/pull/12531)
 * Виправлено `BrowserWindow.getFocusedWindow()` , коли DevTools вимкнуто і фокусовано. [#12554](https://github.com/electron/electron/pull/12554)
 * Виправлено помилкове завантаження у візуалізованому пісочнику, якщо шлях до завантаження містить спеціальні символи. [#12643](https://github.com/electron/electron/pull/12643)
 * Виправляти типові значення allowRunningInsecureContent як окрему документацію. [#12629](https://github.com/electron/electron/pull/12629)
 * Фіксована прозорість на нативному зображенні. [#12683](https://github.com/electron/electron/pull/12683)
 * Виправлена проблема з `Menu.buildFromTemplate`. [#12703](https://github.com/electron/electron/pull/12703)
 * Варіанти спливаючих вікон із підтвердженням меню є об'єктами. [#12330](https://github.com/electron/electron/pull/12330)
 * Видалено умову гонки між створенням нового процесу та випуском контексту. [#12361](https://github.com/electron/electron/pull/12361)
 * Оновити перетягувальні регіони під час зміни BrowserView. [#12370](https://github.com/electron/electron/pull/12370)
 * Виправлено функцію перемикання ключів греблі при фокусі. [#12235](https://github.com/electron/electron/pull/12235)
 * Виправлено помилкові попередження на переглядах. [#12236](https://github.com/electron/electron/pull/12236)
 * Виправлено помилку з опцій 'show' в батьківських вікнах. [#122444](https://github.com/electron/electron/pull/122444)
 * Переконайтеся, що `getLastCrashReport()` насправді є останнім звітом про аварію. [#12255](https://github.com/electron/electron/pull/12255)
 * Виправлено потребу в шлясі передачі мережі. [#12287](https://github.com/electron/electron/pull/12287)
 * Виправлено проблему контекстного меню натискання на зворотний виклик. [#12170](https://github.com/electron/electron/pull/12170)
 * Закріплена позиція спливаючого меню. [#12181](https://github.com/electron/electron/pull/12181)
 * Поліпшене очищення циклу libuv . [#11465](https://github.com/electron/electron/pull/11465)
 * Виправлено `hexColorDWORDToRGBA` з прозорими кольорами. [#11557](https://github.com/electron/electron/pull/11557)
 * Виправлено уособлення null poinerence за допомогою getWebPreferences api. [#12245](https://github.com/electron/electron/pull/12245)
 * Виправлено циклічне посилання в меню делегата. [#11967](https://github.com/electron/electron/pull/11967)
 * Виправлено фільтрування протоколу net.request. [#11657](https://github.com/electron/electron/pull/11657)
 * WebFrame.setVisualZoomLevelLimits тепер встановлює обмеження масштабування користувацьких агентів [#12510](https://github.com/electron/electron/pull/12510)
 * Встановити відповідні значення за замовчуванням для опцій веб-перегляду. [#12292](https://github.com/electron/electron/pull/12292)
 * Поліпшена підтримка вібрації. [#12157](https://github.com/electron/electron/pull/12157) [#12171](https://github.com/electron/electron/pull/12171) [#11886](https://github.com/electron/electron/pull/11886)
 * Виправлено помилку таймера в режимі singleton.
 * Виправлено несправний виробничий кеш в NotifierSupportsActions()
 * Використання апаратних ролей MenuItem сумісних з камельсями випадками. [#11532](https://github.com/electron/electron/pull/11532)
 * Покращене оновлення панелі керування. [#11812](https://github.com/electron/electron/pull/11812), [#11761](https://github.com/electron/electron/pull/11761).
 * Видалено додаткові роздільники меню. [#11827](https://github.com/electron/electron/pull/11827)
 * Виправлено помилку обрання Bluetooth. Закриває [#11399](https://github.com/electron/electron/pull/11399).
 * Фіксовано позначку елемента меню на повноекранному режимі. [#11633](https://github.com/electron/electron/pull/11633)
 * Покращене приховування підказки при вимкненому вікні. [#11644](https://github.com/electron/electron/pull/11644)
 * Перенесений застарілий метод веб-перегляду. [#11798](https://github.com/electron/electron/pull/11798)
 * Виправлено закриття вікна з відкритого веб-переглядача. [#11799](https://github.com/electron/electron/pull/11799)
 * Виправлено помилку обрання Bluetooth. [#11492](https://github.com/electron/electron/pull/11492)
 * Оновлено для використання планувальника завдань для app.getFileIcon API. [#11595](https://github.com/electron/electron/pull/11595)
 * Змінено на стріляння `в консольному повідомленні` навіть при рендерингу в автономному режимі. [#11921](https://github.com/electron/electron/pull/11921)
 * Виправлено завантаження з користувацьких протоколів за допомогою `WebContents.downloadURL`. [#11804](https://github.com/electron/electron/pull/11804)
 * Виправлені прозорі вікна, що втрачають прозорість, коли відбивають. [#11956](https://github.com/electron/electron/pull/11956)
 * Фіксовані програми Electron скасовуються перезавантаження або вимкнено. [#11625](https://github.com/electron/electron/pull/11625)

### macOS
 * Фіксований витік подій при повторному використанні елементу тачпару. [#12624](https://github.com/electron/electron/pull/12624)
 * Виправлено системну підсвічування в темному режимі. [#12398](https://github.com/electron/electron/pull/12398)
 * Виправлено головне блокування в асинхронному діалозі. [#12407](https://github.com/electron/electron/pull/12407)
 * Виправлено `setTitle` в лотку. [#12356](https://github.com/electron/electron/pull/12356)
 * Виправлено помилку при налаштуванні меню док. [#12087](https://github.com/electron/electron/pull/12087)

### Linux
 * Кращі сповіщення Linux робочого столу. [#12229](https://github.com/electron/electron/pull/12229) [#12216](https://github.com/electron/electron/pull/12216) [#11965](https://github.com/electron/electron/pull/11965) [#11980](https://github.com/electron/electron/pull/11980)
 * Краща підтримка тем GTK+ для меню. [#12331](https://github.com/electron/electron/pull/12331)
 * Вийдіть вірно на linux. [#12139](https://github.com/electron/electron/pull/12139)
 * Використовувати ім'я програми в якості підказки по іконці по іконці за замовчуванням. [#12393](https://github.com/electron/electron/pull/12393)

### Windows
 * Додано підтримку Visual Studio 2017 [#11656](https://github.com/electron/electron/pull/11656)
 * Фіксований передавання виключень із системного обробника аварій. [#12259](https://github.com/electron/electron/pull/12259)
 * Виправлено функцію автоматичного приховання спливаючих точок. [#11644](https://github.com/electron/electron/pull/11644)
 * Виправлено помилку, `робочий стіл Capturer` для відображення правильного екрану. [#11664](https://github.com/electron/electron/pull/11664)
 * Фіксовано `вимкнути Апаратне прискорення` з прозорістю. [#11704](https://github.com/electron/electron/pull/11704)

# Що далі

Команда Electron ретельно працює для підтримки нових версій Chromium, Node, та v8. Очікуйте версії 3.0.0-beta.1 найближчим часом!
