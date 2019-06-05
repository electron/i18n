# About Electron

[Electron](https://electronjs.org) is an open source library developed by GitHub for building cross-platform desktop applications with HTML, CSS, and JavaScript. Electron Chromium और Node.js को एक रनटाइम में जोड़कर काम करता है। Apps को Mac, Windows और Linux के लिए पैक किया जा सकता है।

इलेक्ट्रॉन की शुरुआत 2013 में हुई थी, जिस पर  एटम </ 0>, GitHub का हैक करने योग्य टेक्स्ट एडिटर बनाया गया था। दोनों को 2014 के वसंत में लॉन्च किया गया था।</p> 

यह तब से एक लोकप्रिय टूल बन गया है जिसका उपयोग ओपन सोर्स डेवलपर्स, स्टार्टअप और स्थापित कंपनियों द्वारा किया जाता है।  देखें कि इलेक्ट्रॉन पर कौन निर्माण कर रहा है </ 0>।</p> 

</a>इलेक्ट्रॉन के योगदानकर्ताओं और रिलीज़ के बारे में और जानने के लिए पढ़ें या इलेक्ट्रॉन के साथ  क्विक स्टार्ट गाइड </ 0> में निर्माण शुरू करें।</p> 

## कोर टीम और योगदानकर्ता

इलेक्ट्रॉन को GitHub में एक टीम के साथ-साथ समुदाय से  सक्रिय योगदानकर्ताओं </ 0> के एक समूह द्वारा मदद की जाती है। कुछ योगदानकर्ता व्यक्ति हैं, कुछ बड़ी कंपनियों में काम करते हैं जो इलेक्ट्रॉन पर काम कर रहे हैं। हम रखवाले के रूप में परियोजना में लगातार योगदानकर्ताओं को जोड़ने के लिए खुश हैं। इलेक्ट्रॉन के लिए योगदान  के बारे में और पढ़ें </ 0>।</p> 

## रिलीज़स

[Electron releases](https://github.com/electron/electron/releases) frequently. We release when there are significant bug fixes, new APIs or are updating versions of Chromium or Node.js.

### Updating Dependencies

Electron's version of Chromium is usually updated within one or two weeks after a new stable Chromium version is released, depending on the effort involved in the upgrade.

When a new version of Node.js is released, Electron usually waits about a month before upgrading in order to bring in a more stable version.

In Electron, Node.js and Chromium share a single V8 instance—usually the version that Chromium is using. Most of the time this *just works* but sometimes it means patching Node.js.

### संस्करण

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