# אודות Electron

[Electron](https://electronjs.org) היננה ספריה עם קוד פתוח לבניית תוכנות למחשב בפלטפורמות שונות עם קוד HTML, CSS, ו-Javascript מאת GitHub. Electron מצליחה לעשות זאת באמצעות שילוב של [Chromium](https://www.chromium.org/Home) עם [Node.js](https://nodejs.org) כתוכנה אחת והתוכנות יכולות להיארז לשימוש במחשבי Mac, חלונות ולינוקס.

Electron began in 2013 as the framework on which [Atom](https://atom.io), GitHub's hackable text editor, would be built. The two were open sourced in the Spring of 2014.

It has since become a popular tool used by open source developers, startups, and established companies. [See who is building on Electron](https://electronjs.org/apps).

המשיכו לקרוא כדי ללמוד עוד על התורמים לקוד ועל הוצאות לאור של Electron או שאתם יכולים להתחיל לבנות תוכנות עם Electron ב-[מדריך למתחילים](quick-start.md).

## צוות הליבה ותורמים

Electron משומר על ידי צוות ב-GitHub וגם על ידי קבוצה של [תורמים פעילים](https://github.com/electron/electron/graphs/contributors) מהקהילה. חלק מהתורמים הם אנשים שעובדים בחברות גדולות שמתבססות על Electron. אנו שמחים מאוד להוסיף תכנתים שתורמים לעיתים קרובות לפרוייקט כמשמרים. קראו עוד על [איך תורמים ל-Electron](https://github.com/electron/electron/blob/master/CONTRIBUTING.md).

## הפצות

[Electron releases](https://github.com/electron/electron/releases) frequently. We release when there are significant bug fixes, new APIs or are updating versions of Chromium or Node.js.

### עדכון חבילות

גרסת Electron לChromium בדרך כלל מתעדכנת תוך שבוע או שבועיים מרגע שחרור גרסה חדשה יציבה, תלוי בכמות המאמץ הנדרשת לשדרוג.

כשיוצאת גרסה יציבה חדשה של Node.js, בדרך כלל Electron מחכה שבוע לפני שהוא מעדכן כדי לוודא יציבות.

In Electron, Node.js and Chromium share a single V8 instance—usually the version that Chromium is using. Most of the time this _just works_ but sometimes it means patching Node.js.


### Versioning

As of version 2.0 Electron [follows `semver`](https://semver.org). For most applications, and using any recent version of npm, running `$ npm install electron` will do the right thing.

The version update process is detailed explicitly in our [Versioning Doc](electron-versioning.md).

### LTS

Long term support of older versions of Electron does not currently exist. If your current version of Electron works for you, you can stay on it for as long as you'd like. If you want to make use of new features as they come in you should upgrade to a newer version.

A major update came with version `v1.0.0`. If you're not yet using this version, you should [read more about the `v1.0.0` changes](https://electronjs.org/blog/electron-1-0).

## Core Philosophy

In order to keep Electron small (file size) and sustainable (the spread of dependencies and APIs) the project limits the scope of the core project.

For instance, Electron uses Chromium's rendering library rather than all of Chromium. This makes it easier to upgrade Chromium but also means some browser features found in Google Chrome do not exist in Electron.

New features added to Electron should primarily be native APIs. If a feature can be its own Node.js module, it probably should be. See the [Electron tools built by the community](https://electronjs.org/community).

## History

Below are milestones in Electron's history.

| :calendar:      | :tada:                                                                                                         |
| --------------- | -------------------------------------------------------------------------------------------------------------- |
| **April 2013**  | [Atom Shell is started](https://github.com/electron/electron/commit/6ef8875b1e93787fa9759f602e7880f28e8e6b45). |
| **May 2014**    | [Atom Shell is open sourced](https://blog.atom.io/2014/05/06/atom-is-now-open-source.html).                    |
| **April 2015**  | [Atom Shell is re-named Electron](https://github.com/electron/electron/pull/1389).                             |
| **May 2016**    | [Electron releases `v1.0.0`](https://electronjs.org/blog/electron-1-0).                                        |
| **May 2016**    | [Electron apps compatible with Mac App Store](mac-app-store-submission-guide.md).                              |
| **August 2016** | [Windows Store support for Electron apps](windows-store-guide.md).                                             |
