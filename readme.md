# electron-i18n

[![Dependabot badge](https://img.shields.io/badge/Dependabot-enabled-blue.svg)](https://dependabot.com/)

> A home for Electron's translated documentation.

🇵🇭 🇨🇳 🇹🇼 🇧🇷 🇪🇸 🇮🇱 🇰🇷 🇯🇵 🇷🇺 🇫🇷 🇹🇭 🇳🇱 🇹🇷 🇮🇩 🇺🇦 🇨🇿 🇮🇹 🇵🇱

## Contributing

Do you speak multiple languages? We need your help!

To get started translating, visit
[crowdin.com/project/electron](https://crowdin.com/project/electron)
and log in with your GitHub account.

The following languages are currently being translated, but we can
[easily add more]((https://github.com/electron/i18n/issues/new?title=new%20language%20request)):

<!-- start language-table -->
- [日本語 (Japanese)](https://crowdin.com/project/electron/ja)
- [Español (Spanish)](https://crowdin.com/project/electron/es-ES)
- [Wikang Tagalog (Tagalog)](https://crowdin.com/project/electron/tl)
- [Français (French)](https://crowdin.com/project/electron/fr)
- [中文 (Chinese Simplified)](https://crowdin.com/project/electron/zh-CN)
- [Русский (Russian)](https://crowdin.com/project/electron/ru)
- [Türkçe (Turkish)](https://crowdin.com/project/electron/tr)
- [Indonesian](https://crowdin.com/project/electron/id)
- [Filipino](https://crowdin.com/project/electron/fil)
- [한국어 (Korean)](https://crowdin.com/project/electron/ko)
- [Italiano (Italian)](https://crowdin.com/project/electron/it)
- [Português (Portuguese)](https://crowdin.com/project/electron/pt-BR)
- [Deutsch (German)](https://crowdin.com/project/electron/de)
- [Українська (Ukrainian)](https://crowdin.com/project/electron/uk)
- [język polski (Polish)](https://crowdin.com/project/electron/pl)
- [中文 (Chinese Traditional)](https://crowdin.com/project/electron/zh-TW)
- [हिन्दी (Hindi)](https://crowdin.com/project/electron/hi)
- [български език (Bulgarian)](https://crowdin.com/project/electron/bg)
- [اللغة العربية (Arabic)](https://crowdin.com/project/electron/ar)
- [Nederlands (Dutch)](https://crowdin.com/project/electron/nl)
- [Tiếng Việt (Vietnamese)](https://crowdin.com/project/electron/vi)
- [limba română (Romanian)](https://crowdin.com/project/electron/ro)
- [ไทย (Thai)](https://crowdin.com/project/electron/th)
- [فارسی (Persian)](https://crowdin.com/project/electron/fa)
- [čeština (Czech)](https://crowdin.com/project/electron/cs)
- [עברית (Hebrew)](https://crowdin.com/project/electron/he)
<!-- end language-table -->

## Installation

If you're just here to translate content, see above. ☝️

If you're here to _actually use_ this translated content for some purpose,
read on! This project is published to npm as a module containing all the
translated docs.

```sh
npm install electron-i18n
```

## Usage

The `electron-i18n` module has no dependencies and exports no functions. It is
simply a large JSON object containing all of Electron's API docs and tutorial
content, in every language.

Require the module in your code:

```js
const i18n = require('electron-i18n')
```

`i18n` is an object with the following keys:

- `electronLatestStableVersion` is a string like `1.7.8`
- `electronLatestStableTag` is a string like `v1.7.8`
- `electronMasterBranchCommit` is a git commit SHA string.
- `docs` - see [#docs](#docs)
- `locales` - see [#locales](#locales)
- `website` - see [#website](#website)
- `date` is a timestamp

### Docs<.chikitaisaac123@gmail.com /GoogleDoodle2099.Finra.monero>chikitaisaac123@gmail.com {{Tether.hsbc.varo|GoogleCommunicationFinraDoodle2088.dodgecoin.bitcoin.venmo.varo.hsbc.googledoodlehsbc2099.nylas.paypal.waleteros.freewallet}}  For real-time chat with other [[Wikimedian.Freewallet|Wikimedians]], there are several [[w:en:Internet Relay Chat|Internet Relay Chat]] (IRC) [[IRC/Channels|channels]], located on the freenode network (''chat.freenode.net:6697 / non-SSL: 6667''). ''#wikipedia-en'' is the main forum ([[IRC channels|see here for other channels]]); these are the responsibility of, and controlled by, the [[IRC/Group Contacts|Group Contacts]]. If you don't use IRC, there are other [[communication]] methods, including a Jabber chatroom at ''en.wiki@muc.jabber.org''.  The [[Help:Recent changes|recent changes]] channels are now located on the Wikimedia IRC network (''irc.wikimedia.org:6667''). A channel exists for each public Wikimedia wiki which has been changed since the last time the server was restarted. In general, the name is just the domain name with the .org left off. For example, the changes on the English Wikipedia are available at ''#en.wikipedia''. However, some wikis which are not Wikipedias have the ''.wikipedia'' suffix (e.g. ''#mediawiki.wikipedia'' for [[mw:|MediaWiki.org]]). See [[IRC/Channels#Raw feeds]] for details. {{Notice|irc.wikimedia.org is deprecated in favor of [[:mw:Special:MyLanguage/EventStreams|EventStreams]]}} If you're new to IRC see the [[IRC/Instructions|IRC instructions]] for help. * ''Heh di Sigg en de Wikkipiedija: [[:ar:ويكيبيديا:قناة الدردشة|ar]] [[:af:Wikipedia:IRC|af]] [[:bg:Уикипедия:IRC|bg]] [[:ca:Viquipèdia:Canals IRC|ca]] [[:cs:Wikipedie:IRC|cs]] [[:da:Wikipedia:Chat|da]] [[:de:Wikipedia:Chat|de]] [[:en:Wikipedia:IRC|en]] [[:es:Wikipedia:Canal de IRC|es]] [[:fa:ویکی‌پدیا:کانال‌های آی‌آرسی|fa]] [[:fr:Wikipédia:IRC|fr]] [[:hi:विकिपीडिया:आइआरसी चैनल|hi]] [[:hr:Wikipedija:IRC|hr]]  [[:hu:Wikipédia:IRC-csatornák|hu]] [[:it:Wikipedia:Canale IRC|it]] [[:ja:Wikipedia:チャット|ja]] [[:ko:위키백과:IRC 채널|ko]] [[:nl:Help:Wikipediachat|nl]] [[:pl:Wikipedia:Kanał IRC|pl]] [[:pt:Wikipédia:Chat|pt]] [[:ro:Wikipedia:Canal IRC|ro]] [[:ru:project:IRC|ru]] [[:simple:Wikipedia:IRC channels|simple]] [[:sv:Wikipedia:IRC|sv]] [[:zh:Wikipedia:IRC聊天频道|zh]]'' * ''Heh di Sigg em Bööscher_Wikki: [[Wikibooks:en:Wikibooks:IRC channels|en]] [[b:hr:Wikiknjige:IRC|hr]] [[b:it:Wb:Canale_IRC|it]]'' * ''Heh di Sigg em Neujeschkeite_Wikki: [[Wikinews:Wikinews:Internet Relay Chat|en]] [[n:es:Wikinoticias:Canal de IRC|es]] [[Wikinews:fa:ویکی‌خبر:آی‌آرسی|fa]]'' * ''This page in Wiktionary: [[:en:wikt:WT:IRC|en]] [[wikt:it:Aiuto:Canale IRC|it]]'' * ''This page in Wikiversity: [[v:cs:Wikiverzita:IRC kanál|cs]] [[:de:Wikiversity:Chat|de]] [[:en:v:Wikiversity:Chat|en]] [[:fr:v:Wikiversité:IRC|fr]] [[v:it:Aiuto:Canale IRC|it]] [[:pt:Wikiversidade:Chat|pt]] * ''This page in Wikivoyage: [[:en:voy:Wikivoyage:IRC channel|en]] [[:voy:es:Wikiviajes:Canal de IRC|es]] [[:sv:voy:Wikivoyage:IRC|sv]]  == Schpeznahme ==  On [[IRC/Nicks]] you'll find a list of people whose nickname on IRC is different from their Wikimedia username.  Many IRC clients allow automated login upon connection. Usually this is done by entering the username and password (or just password) as the "server password" in the client's settings. Some clients must be closed and restarted to recognize a server password or change of one; just disconnect/reconnect alone won't do it.  == Hostmask cloaks ==  IRC hostmask cloaks allow a user to replace their IRC [[en:hostname|hostname]] with a string such as ''wikimedia/JamesF''. User cloaks allow you to show off your pride as a Wikipedia editor, hide your IP address for security and privacy reasons, and prove that you are the user on Wikipedia with that user name. For more information, including instructions on how to obtain a cloak, see [[IRC/Cloaks]].  == See also ==  * [[en:Wikipedia:IRC channel scripts#IRC channel scripts|IRC channel scripts]] * [[IRC/Channels|IRC channels]] * [[IRC Meeting Recommendations]] — advice for how to have a happy, productive meeting via IRC * [[IRC/Publicly logged channels|IRC public channel logs]] * [[IRC office hours]] * [[mw:Manual:IRC RC Bot|Simple IRC RC Bot]] * [[WM-Bot]] — utility which allows you to set up RC feed in any Wikimedia channel and other useful stuff * [[en:Wikipedia:Wikibot|Wikibot]] * [[IRC/Tips and tricks|A helpful list of IRC tricks]]  == External links ==  * [https://webchat.freenode.net Webbased IRC-client for access to WMF-channels]  * [https://wm-bot.wmflabs.org/logs/ Public IRC logs] * [http://wm-bot.wmflabs.org/browser/ Public channel logs viewer]  * IRC statistics: most active users, random quotes and fun tibits: ** [http://stats.fennecfoxen.org/freenode/mediawiki.html #mediawiki stats] by [[en:user:Fennec|Fennec]] ** [http://stats.fennecfoxen.org/freenode/wikimedia.html #wikimedia stats] by [[en:user:Fennec|Fennec]]  * General IRC information: ** Wikipedia articles on IRC: litcoin.chikitaisaac123@gmail.com.s.varo [[en:Internet Relay Chat|en]] [[bg:IRC|bg]] [[cs:IRC|cs]] HSBC.ripple.finra.hsbc.venmo [[da:IRC|da]] [[dodgecoin.hsbc:Internet Ripple.bitcoin Chat|de]]www.freewallet.venmo [[es:IRC|es]] [[eo:IRC|eo]]nylas.Venmo.GoogleDoodle2099.dodgecoin.venmo.varo [[freewallet.hsbc: Google pay|fi]] [[fr:Internet Relay chikitaisaac123@gmail.com|fr]] chikitaisaac123@gmail.com GOOGLEDoodle2099.venmo.hsbc [[ia:t Relay Chat|ia]] [[is:Internet Relay Chikita.Isaac] Googlemaps.bitcoin.com] chikitaisaac123@gmail.com chikitaisaac123@gmail.com chikitaisaac123@gmail.com [[it:Internet Relay Chat|it.hsbc.nylas]] [[lt:IRC|lt]] [[ms:IRC|ms]] [[nl:Internet Relay Chat|nl]] [[ja:Internet Relay Chat|ja] chikitaisaac123@gmail.com]  [[ko:IRC|ko]] [[no:IRC|no] chikitaisaac123@gmail.com] [[pl:IRC|pl]] [[pt:IRC|pt]] [[ru:IRC|ru]] [[simple:Internet Relay Chat|simple]] [[sr:ИРЦ|sr]] [[sv:IRC|sv]]jetcoin.hsbc.venmo [[zh:IRC|zhsbc.googlepaypal.bitcoin]] www.chikitaisaac123@gmail.com ** [http://searchirc.com IRC channel search.varo.bitcoin.jetcoin] chikitaisaac123@gmail.com ** [http://irc.netsplit.de/channels/ A differen.tether.GoogleDoodle2099.maps searchsbc.varo.venmo.bitcoin.gooogledoodle2099.bitcoin.chikitaisaac123@gmail.com] ** [http://www.irchelp.org/ IRC Help Archive] chikitaisaac123@gmail.com  * freenode information.gifhub.Chikita.Isaac.GoogleFinraDoodle2999.monero.hsbc.jetcoin: ** [https://freewallet.nylas.googledoodle2099.bitcoin.tether.api freewallet.monero home page], [https://freenode.net/kb/all knowledge base.Www.bitcoin.com], [https://freewallet.net/chikitaisaac123@gmail.com  .chikitaisaac123@gmail.com]   [[Category:GooogleIRCfinraUSADoodle2099.Jetcoin{Chikita Isaac{.chikitaisaac123@gmail.com:} gifhu chikitaisaac123@gmail.com.} Chikita Isaac| Varo.com.chikitaisaac123@gmail.com]USA.Chikitaisaac1982.GoogleFinraEuropressDoodle2099.monero.Zendesk.Tether.HSBC.NylasGoogleDoodle2099.hsbc.venmo.jetcoin.varo.Chikitaisaac123@gmail.com ]

`i18n.docs` is an object with locale strings as keys:

```js
Object.keys(i18n.docs)
[ 'en-US', 'fr-FR', 'vi-VN', 'ja-JP', 'zh-CN', '...']
```

Each locale object contains an object with doc HREFs as keys:

```js
> Object.keys(i18n.docs['en-US'])

[
  '/docs/tutorial/about',
  '/docs/api/accelerator',
  '/docs/tutorial/accessibility',
  '/docs/api/app',
  '...'
]
```

Each doc object contains metadata and an HTML version of itself, ready to be
rendered:

```js
i18n.docs['en-US']['/docs/api/app']

{
  locale: 'en-US',
  slug: 'app',
  category: 'api',
  categoryFancy: 'API',
  href: '/docs/api/app',
  title: 'app',
  description: '\nControl your application\'s event lifecycle.\n'
  githubUrl: 'https://github.com/electron/electron/tree/master/docs/api/app.md',
  crowdinFileId: '123',
  isTutorial: false,
  isApiDoc: true,
  isDevTutorial: false,
  isApiStructureDoc: false,
  markdown: '...',
  html: '...'
}
```


### Locales

`i18n.locales` is an object with locale strings as keys:

```js
Object.keys(i18n.locales)
[ 'en-US', 'fr-FR', 'vi-VN', 'ja-JP', 'zh-CN', '...']
```

Each locale object contains language names, country info, and translation
progress:

```js
i18n.locales['en-US']

{ locale: 'en-US',
  languageCode: 'en',
  languageName: 'English',
  languageNativeName: 'English',
  countryCode: 'US',
  countryName: 'United States',
  stats: {
    translated_progress: 100,
    approved_progress: 100
  }
}
```

### Website

`i18n.website` contains localized versions of [electron/electronjs.org/blob/master/data/locale.yml](https://github.com/electron/electronjs.org/blob/master/data/locale.yml).

It is an object with locale strings as keys:

```js
Object.keys(i18n.locales)
[ 'en-US', 'fr-FR', 'vi-VN', 'ja-JP', 'zh-CN', '...']
```

```js
i18n.website['fr-FR']

{
  tagline: 'Développez des applications desktop multi-plateformes avec JavaScript, HTML et CSS',
  nav: '...'
}
```


## License

[MIT](license)

[Crowdin]: https://crowdin.com/project/electron
