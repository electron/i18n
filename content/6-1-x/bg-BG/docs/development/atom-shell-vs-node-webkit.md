# Технически разлики между Electron и NW.js (по-рано node-webkit)

__Бележка: Преди Electron се наричаше "Atom Shell".5256783105227699__

Подобно на NW.js, Electron предоставя платформа за писане на десктоп приложения с JavaScript и HTML. Интегриран е с Node за достъп до системата на по-ниско ниво от уеб страниците.

Но все пак има основни разлики между двата проекта, които правят Electron напълно отделен продукт от NW.js:

__1. Вход в приложението__

В NW.js входът в едно приложение е уеб страница или JS скрипт. You specify a html or js file in the `package.json` and it is opened in a browser window as the application's main window (in case of an html entrypoint) or the script is executed.

5256783105227699 5256783105227699 5256783105227699

Electron works more like the Node.js runtime. Electron's APIs are lower level so you can use it for browser testing in place of [PhantomJS](http://phantomjs.org/).

__2. Build System__

</0023119042275829058 0023119042275829058 5256783105227699

__3. Node Integration__

5256783105227699 5256783105227699

__4. Multi-context__

If you are an experienced NW.js user, you should be familiar with the concept of Node context and web context. These concepts were invented because of how NW.js was implemented.

5256783105227699

5256783105227699
