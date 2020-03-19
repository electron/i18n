---
title: '今週のプロジェクト: Ghost'
author:
  - felixrieseberg
  - zeke
date: '2017-02-14'
---

今週、[Slack](https://slack.com/) のデスクトップエンジニアであり、[Ghost](https://ghost.org/) 出版プラットフォームの Electron クライアントである [Ghost Desktop](https://ghost.org/downloads/) のメンテナー [Felix Rieseberg](https://felixrieseberg.com/) と談話しました。

---

<div class="pt-5">
  <img src="https://cloud.githubusercontent.com/assets/2289/22913898/7396b0de-f222-11e6-8e5d-147a7ced37a9.png" alt="Ghost Desktop Screenshot"> 
</div>

## Ghost とは何ですか?

Ghost は、モダンなオンライン出版物を作成し稼働するための、完全にオープンソースの改造可能なプラットフォームです。 Zappos から Sky News まで、ブログ、雑誌、ジャーナリストを支えています。

## 他の出版プラットフォームとの違いは何ですか?

Ghost は、プロ向け出版物作成だけに特化した新しいプラットフォームを作成する Kickstarter キャンペーンが非常に成功した後の、2013 年 4 月に設立されました。 私たちの使命は、世界中の独立したジャーナリストや作家のために最高のオープンソースツールを作成し、オンラインメディアの未来に真の衝撃を与えることです。 シンプルで、より焦点を絞ったエクスペリエンスを提供します。このエディタは、可能な限り最高の執筆体験を提供することだけを目的に設計しました。

従来の WordPress と比較すると、シンプルで合理化されたエクスペリエンスを提供しています。セットアップとメンテナンスが簡単で、すべての大事な機能が付属しており、劇的に高速です。 他のオンラインプラットフォームと比べても、Ghost はライターがコンテンツの完全な所有権と制御を得ることで完全なカスタマイズができ、執筆者は出版物を中心としたビジネス構築ができます。

## Ghost は営利団体ですか?

これは私たちにおいて大事なところです。Ghost は独立した非営利組織です。 言論の自由は重要であるという信念の下、モダンなジャーナリズムとブログのための出版ツールを構築します。 当ソフトウェアは [自由なオープンソースライセンス](https://github.com/TryGhost/Ghost) でリリースされており、当社のビジネスモデルは [完全に透明](https://blog.ghost.org/year-3/)です。当社の法的構造では、収益の 100% が Ghost の改善に再投資されます。

## Ghost デスクトップとは何ですか?

Ghost デスクトップなら、ライターは複数のブログを一度に管理でき、執筆に集中できます。 一般的な執筆ショートカットのような単純なものでも、ブラウザでは実現できませんがデスクトップアプリならできます。他のアプリケーションが [ディープリンク経由のブログ](https://github.com/tryghost/ghost-desktop/blob/master/docs/deeplinks.md) と直接通信できるようにします。

## ジャーナリズム版 Ghost とは何ですか?

This year we're very excited to be dedicating our entire 10 person full-time Ghost team to helping grow three independent publications, along with $45,000 in resources toward their efforts. We're calling it [Ghost for Journalism](https://ghost.org/journalism/).

We've been building Ghost as the web's next great platform for independent publishers for about three and half years now, and we've now reached a really interesting inflection point. We started this journey to create a simple, well designed blogging platform which could be used by just about anyone. That was always going to be step one.

Long term, we want Ghost to be an incredible platform for the world's best journalism, and that means we need to build features to attract exactly those people. This year we're making a very conscious decision to focus on just that.

## Why did you choose to build Ghost Desktop on Electron?

Ghost uses JavaScript and Node.js on both the backend and frontend, so being able to utilize the same technology and skillset enables our team to move faster, build more, and ultimately deliver a better experience. In addition, being able to share more than 95% of code between the macOS, Windows, and Linux version of the app allows us to focus on building a great core user experience, without having to maintain one code base for each platform.

## What are some challenges you've faced while building Ghost Desktop?

Spellchecking is likely still one of the most difficult services offered - we could easily utilize one of the many online services, but correctly spellchecking text in multiple languages while guarding the privacy and autonomy of our users is not an easy task.

## In what areas should Electron be improved?

We would love to see Electron bring the operating system's native spellchecking capabilities to their apps. We're dreaming about a world in which an `<input>` field receives the same services as a `NSTextView`, but we are also intimately aware how difficult that is.

## What are your favorite things about Electron?

JavaScript is famous for being a vast ecosystem, involving countless tools and frameworks - but the convenience it affords us is hard to overstate. Building an app with Electron is only _slightly_ harder than building a web app, which is an amazing  feat.

## Is Ghost done? If not, what's coming next?

Ghost Desktop is also an ongoing project - we're pretty far from being done. We have been talking for a while about bringing a full offline mode to our users, and we're getting fairly close. Other notable work areas are the extension and integration with other text editing apps (like Word or Atom), ultimately allowing people to write posts using their favorite tools. In general, once we've shipped the offline mode feature, we're looking for deeper integration with the operating system. If that sounds interesting to you, [join us](https://github.com/tryghost/ghost-desktop)!

## What are some of your favorite Electron apps?

I'm a big fan of [Kap](https://getkap.co/), [Felony](https://github.com/henryboldi/felony), and [Visual Studio Code](https://code.visualstudio.com).

👻

