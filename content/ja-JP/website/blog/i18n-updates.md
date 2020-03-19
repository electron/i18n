---
title: "国際化アップデート"
author: vanessayuenn
date: '2018-06-20'
---

新しく国際化された Electron ウェブサイトの [立ち上げ](https://electronjs.org/blog/new-website) 以来、英語圏以外の開発者が Electron の開発知識をさらに利用しやすいように取り組んでいます。

そこで、エキサイティングな国際化 (i18n) アップデートを紹介しましょう!

---

## 🌐 言語切替

翻訳ドキュメントの読者の多くは、原文の英語ドキュメントも相互参照することが多いというのはご存知ですか? 古かったり不正確だったりする訳文を避けるために、英語ドキュメントを習熟しているのです。これは国際化されたドキュメントに鳴らされる警笛の一つです。

<figure>
  <img class="screenshot" src="https://user-images.githubusercontent.com/6842965/35578586-cae629e2-05e4-11e8-9431-0278f8c2b39f.gif" alt="Language toggle on Electron documentation">
</figure>

英語ドキュメントへの相互参照を容易にするため、Electron ドキュメントの文章を英語とウェブサイトの表示言語との間でシームレスに切り替えられる機能を追加しました。 ウェブサイトで英語以外のロケールを選択すれば、言語切替が表示されます。

## ⚡️ 訳文ページへのクイックアクセス

<figure>
  <img class="screenshot" src="https://user-images.githubusercontent.com/6842965/36511386-c32e31fc-1766-11e8-8484-7466be6a5eb0.png" alt="New Electron documentation footer in Japanese">
  <figcaption>Electron ドキュメントのフッターが日本語になっている</figcaption>
</figure>

ドキュメントを読んでいて、誤植や誤訳に気がつきましたか? もう Crowdin にログインしたり、ロケールを選択したり、修正したいファイルを見つけたりする必要はありません。 代わりに、ドキュメントの一番下までスクロールし、上記の [このドキュメントを改善する] をクリックするだけです。 Voila! You are brought straight to the Crowdin translation page. Now apply your translation magic!

## 📈 Some Statistics

Ever since we have publicized the Electron documentation i18n effort, we have seen _huge_ growth in translation contributions from Electron community members from all around the world. To date, we have **1,719,029 strings translated, from 1,066 community translators, and in 25 languages**.

<figure>
  <a href="https://crowdin.com/project/electron/">
    <img class="screenshot" src="https://user-images.githubusercontent.com/6842965/41649826-ca26037c-747c-11e8-9594-5ce12d2978e2.png" alt="Translation Forecast provided by Crowdin">
    <figcaption>Translation Forecast provided by Crowdin</figcaption>
  </a>
</figure>

Here is a fun graph showing the approximate amount of time needed to translate the project into each language if the existing tempo (based on the project activity during the last 14 days at the time of writing) is preserved.

## 📃 Translator Survey

We would like to give a huge ❤️ thank you ❤️ to everyone who has contributed their time to help improving Electron! In order to properly acknowledge the hard work of our translator community, we have created a survey to collect some information (namely the mapping between their Crowdin and Github usernames) about our translators.

If you are one of our incredible translators, please take a few minutes to fill this out: https://goo.gl/forms/b46sjdcHmlpV0GKT2.

## 🙌 Node's Internationalization Effort

Because of the success of Electron's i18n initiative, Node.js decided to model [their revamped i18n effort](https://github.com/nodejs/i18n) after the pattern we use as well! 🎉 The [Node.js i18n initiative](https://github.com/nodejs/i18n) has now been launched and gained great momentum, but you can stil read about the early proposal and reasoning behind it [here](https://medium.com/the-node-js-collection/internationalizing-node-js-fe7761798b0a).

## 🔦 Contributing Guide

If you're interested in joining our effort to make Electron more international friendly, we have a handy-dandy [contributing guide](https://github.com/electron/i18n/blob/master/contributing.md) to help you get started. Happy internationalizing! 📚
