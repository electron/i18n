---
title: Electron 1.0
author: jlord
date: '2016-05-11'
---

過去2年間、Electron は HTML、CSS、JavaScript を使用したクロスプラットフォームのデスクトップアプリケーション開発を支援してきました。 私たちのフレームワークと、それを作成したコミュニティで大きな節目を共にできるということで興奮しています。 Electron 1.0 のリリースは [electronjs.org](https://electronjs.org) からご覧いただけます。

---

![Electron 1.0](https://cloud.githubusercontent.com/assets/378023/15007352/315f5eea-1213-11e6-984e-21f5dab31267.png)

Electron 1.0 は、API の安定性と成熟度における大きな節目です。 このリリースでは Windows、Mac、Linux 上で真にネイティブに近い動作のアプリを構築できます。 新しいドキュメント、新しいツール、新しい Electron API 概略アプリにより、Electron アプリの構築がこれまで以上に簡単になりました。

初めての Electron アプリを素早く構築するには [クイックスタートガイド](https://electronjs.org/docs/tutorial/quick-start) を参照してください。

Electron で次に何を作るのか、楽しみにしています。

## Electron's Path

私たちは 2 年と少し前に [Atom](https://atom.io) を立ち上げた時に Electron をリリースしました。 当初 Atom Shell という名前だった Electron は、Atom のために構築したフレームワークでした。 当時の Atom は Electron が提供する特色と機能性のきっかけを生み、Atom の初期リリースを後押ししていました。

いま Electron を突き動かしているのは、[メール](https://nylas.com)、[チャット](https://slack.com)、[Git アプリ](https://www.gitkraken.com) から、[SQL 分析ツール](https://www.wagonhq.com)、[torrent クライアント](https://webtorrent.io/desktop)、[ロボット](https://www.jibo.com) まで、あらゆる開発者や企業のコミュニティの成長です。

この 2 年間、企業とオープンソースプロジェクトの両方で、アプリケーション基盤として Electron が採用されています。 この 1 年間で、Electron は 120 万回以上ダウンロードされています。 素晴らしい Electron アプリを [こちらでご紹介](https://electronjs.org/apps) します。あなたのアプリがまだない場合は追加しましょう。

![Electron downloads](https://cloud.githubusercontent.com/assets/378023/15037731/af7e87e0-12d8-11e6-94e2-117c360d0ac9.png)

## Electron API Demos

Along with the 1.0 release, we're releasing a new app to help you explore the Electron APIs and learn more about how to make your Electron app feel native. The [Electron API Demos](https://github.com/electron/electron-api-demos) app contains code snippets to help you get your app started and tips on effectively using the Electron APIs.

[![Electron API Demos](https://cloud.githubusercontent.com/assets/378023/15138216/590acba4-16c9-11e6-863c-bdb0d3ef3eaa.png)](https://github.com/electron/electron-api-demos)

## Devtron

We've also added a new extension to help you debug your Electron apps. [Devtron](https://electronjs.org/devtron) is an open-source extension to the [Chrome Developer Tools](https://developer.chrome.com/devtools) designed to help you inspect, debug, and troubleshoot your Electron app.

[![Devtron](https://cloud.githubusercontent.com/assets/378023/15138217/590c8b06-16c9-11e6-8af6-ef96299e85bc.png)](https://electronjs.org/devtron)

### Features

  * **Require graph** that helps you visualize your app's internal and external library dependencies in both the main and renderer processes
  * **IPC monitor** that tracks and displays the messages sent and received between the processes in your app
  * **Event inspector** that shows you the events and listeners that are registered in your app on the core Electron APIs such as the window, app, and processes
  * **App Linter** that checks your apps for common mistakes and missing functionality

## Spectron

Finally, we're releasing a new version of [Spectron](https://electronjs.org/spectron), the integration testing framework for Electron apps.

[![Spectron](https://cloud.githubusercontent.com/assets/378023/15138218/590d50c2-16c9-11e6-9b54-2d73729fe189.png)](https://electronjs.org/spectron)

Spectron 3.0 has comprehensive support for the entire Electron API allowing you to more quickly write tests that verify your application's behavior in various scenarios and environments. Spectron is based on [ChromeDriver](https://sites.google.com/a/chromium.org/chromedriver) and [WebDriverIO](http://webdriver.io) so it also has full APIs for page navigation, user input, and JavaScript execution.

## コミュニティ

Electron 1.0 is the result of a community effort by hundreds of developers. Outside of the core framework, there have been hundreds of libraries and tools released to make building, packaging, and deploying Electron apps easier.

There is now a new [community](https://electronjs.org/community) page that lists many of the awesome Electron tools, apps, libraries, and frameworks being developed. You can also check out the [Electron](https://github.com/electron) and [Electron Userland](https://github.com/electron-userland) organizations to see some of these fantastic projects.

New to Electron? Watch the Electron 1.0 intro video:

<div class="video"><iframe src="https://www.youtube.com/embed/8YP_nOCO-4Q?rel=0" frameborder="0" allowfullscreen></iframe></div>



