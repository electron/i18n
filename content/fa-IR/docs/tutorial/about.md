# درباره الکترون

[Electron](https://electronjs.org) is an open source library developed by GitHub for building cross-platform desktop applications with HTML, CSS, and JavaScript. Electron accomplishes this by combining [Chromium](https://www.chromium.org/Home) and [Node.js](https://nodejs.org) into a single runtime and apps can be packaged for Mac, Windows, and Linux.

Electron began in 2013 as the framework on which [Atom](https://atom.io), GitHub's hackable text editor, would be built. The two were open sourced in the Spring of 2014.

It has since become a popular tool used by open source developers, startups, and established companies. [See who is building on Electron](https://electronjs.org/apps).

Read on to learn more about the contributors and releases of Electron or get started building with Electron in the [Quick Start Guide](quick-start.md).

## Core Team and Contributors

Electron is maintained by a team at GitHub as well as a group of [active contributors](https://github.com/electron/electron/graphs/contributors) from the community. Some of the contributors are individuals and some work at larger companies who are developing on Electron. We're happy to add frequent contributors to the project as maintainers. Read more about [contributing to Electron](https://github.com/electron/electron/blob/master/CONTRIBUTING.md).

## نسخه‌ها

[Electron releases](https://github.com/electron/electron/releases) frequently. We release when there are significant bug fixes, new APIs or are updating versions of Chromium or Node.js.

### Updating Dependencies

Electron's version of Chromium is usually updated within one or two weeks after a new stable Chromium version is released, depending on the effort involved in the upgrade.

When a new version of Node.js is released, Electron usually waits about a month before upgrading in order to bring in a more stable version.

In Electron, Node.js and Chromium share a single V8 instance—usually the version that Chromium is using. Most of the time this *just works* but sometimes it means patching Node.js.

### Versioning

As of version 2.0 Electron [follows `semver`](https://semver.org). For most applications, and using any recent version of npm, running `$ npm install electron` will do the right thing.

The version update process is detailed explicitly in our [Versioning Doc](electron-versioning.md).

### LTS

Long term support of older versions of Electron does not currently exist. If your current version of Electron works for you, you can stay on it for as long as you'd like. If you want to make use of new features as they come in you should upgrade to a newer version.

A major update came with version `v1.0.0`. If you're not yet using this version, you should [read more about the `v1.0.0` changes](https://electronjs.org/blog/electron-1-0).

## فلسفه اصلی

In order to keep Electron small (file size) and sustainable (the spread of dependencies and APIs) the project limits the scope of the core project.

For instance, Electron uses Chromium's rendering library rather than all of Chromium. This makes it easier to upgrade Chromium but also means some browser features found in Google Chrome do not exist in Electron.

New features added to Electron should primarily be native APIs. If a feature can be its own Node.js module, it probably should be. See the [Electron tools built by the community](https://electronjs.org/community).

## تاریخچه

در زیر نقطه عطفی در تاریخچه الکترون را مشاهده می‌کنید.

| :calendar:           | :tada:                                                                                                       |
| -------------------- | ------------------------------------------------------------------------------------------------------------ |
| **۲۲ فروردین ۱۳۹۲**  | [اتم شل آغاز شده است](https://github.com/electron/electron/commit/6ef8875b1e93787fa9759f602e7880f28e8e6b45). |
| **۱۶ اردیبهشت ۱۳۹۳** | [اتم شل متن باز شد](https://blog.atom.io/2014/05/06/atom-is-now-open-source.html).                           |
| **۲۸ فروردین ۱۳۹۴**  | [اتم شل به الکترون تغییر نام داد](https://github.com/electron/electron/pull/1389).                           |
| **اردیبهشت ۱۳۹۵**    | [الکترون نسخه `1.0.0` را منتشر کرد](https://electronjs.org/blog/electron-1-0).                               |
| **۲۲ اردیبهشت ۱۳۹۵** | [برنامه‌های الکترون سازگار با مک اپ استور](mac-app-store-submission-guide.md).                               |
| **مرداد ۱۳۹۵**       | [فروشگاه ویندوز از برنامه‌های الکترون پشتیبانی می‌کند](windows-store-guide.md).                              |