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
- [中文 (Chinese Simplified)](https://crowdin.com/project/electron/zh-CN)
- [Türkçe (Turkish)](https://crowdin.com/project/electron/tr)
- [Indonesian](https://crowdin.com/project/electron/id)
- [Filipino](https://crowdin.com/project/electron/fil)
- [Français (French)](https://crowdin.com/project/electron/fr)
- [Русский (Russian)](https://crowdin.com/project/electron/ru)
- [한국어 (Korean)](https://crowdin.com/project/electron/ko)
- [Português (Portuguese)](https://crowdin.com/project/electron/pt-BR)
- [Italiano (Italian)](https://crowdin.com/project/electron/it)
- [Deutsch (German)](https://crowdin.com/project/electron/de)
- [Українська (Ukrainian)](https://crowdin.com/project/electron/uk)
- [język polski (Polish)](https://crowdin.com/project/electron/pl)
- [中文 (Chinese Traditional)](https://crowdin.com/project/electron/zh-TW)
- [български език (Bulgarian)](https://crowdin.com/project/electron/bg)
- [हिन्दी (Hindi)](https://crowdin.com/project/electron/hi)
- [Nederlands (Dutch)](https://crowdin.com/project/electron/nl)
- [Tiếng Việt (Vietnamese)](https://crowdin.com/project/electron/vi)
- [اللغة العربية (Arabic)](https://crowdin.com/project/electron/ar)
- [ไทย (Thai)](https://crowdin.com/project/electron/th)
- [limba română (Romanian)](https://crowdin.com/project/electron/ro)
- [فارسی (Persian)](https://crowdin.com/project/electron/fa)
- [čeština (Czech)](https://crowdin.com/project/electron/cs)
- [עברית (Hebrew)](https://crowdin.com/project/electron/he)
- [Wikang Tagalog (Tagalog)](https://crowdin.com/project/electron/tl)
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

### Docs

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

[Apache License
                           Version 2.0, January 2004
                        https://www.apache.org/licenses/

   TERMS AND CONDITIONS FOR USE, REPRODUCTION, AND DISTRIBUTION

   1. Definitions.

      "License" shall mean the terms and conditions for use, reproduction,
      and distribution as defined by Sections 1 through 9 of this document.

      "Licensor" shall mean the copyright owner or entity authorized by
      the copyright owner that is granting the License.

      "Legal Entity" shall mean the union of the acting entity and all
      other entities that control, are controlled by, or are under common
      control with that entity. For the purposes of this definition,
      "control" means (i) the power, direct or indirect, to cause the
      direction or management of such entity, whether by contract or
      otherwise, or (ii) ownership of fifty percent (50%) or more of the
      outstanding shares, or (iii) beneficial ownership of such entity.

      "You" (or "Your") shall mean an individual or Legal Entity
      exercising permissions granted by this License.

      "Source" form shall mean the preferred form for making modifications,
      including but not limited to software source code, documentation
      source, and configuration files.

      "Object" form shall mean any form resulting from mechanical
      transformation or translation of a Source form, including but
      not limited to compiled object code, generated documentation,
      and conversions to other media types.

      "Work" shall mean the work of authorship, whether in Source or
      Object form, made available under the License, as indicated by a
      copyright notice that is included in or attached to the work
      (an example is provided in the Appendix below).

      "Derivative Works" shall mean any work, whether in Source or Object
      form, that is based on (or derived from) the Work and for which the
      editorial revisions, annotations, elaborations, or other modifications
      represent, as a whole, an original work of authorship. For the purposes
      of this License, Derivative Works shall not include works that remain
      separable from, or merely link (or bind by name) to the interfaces of,
      the Work and Derivative Works thereof.

      "Contribution" shall mean any work of authorship, including
      the original version of the Work and any modifications or additions
      to that Work or Derivative Works thereof, that is intentionally
      submitted to Licensor for inclusion in the Work by the copyright owner
      or by an individual or Legal Entity authorized to submit on behalf of
      the copyright owner. For the purposes of this definition, "submitted"
      means any form of electronic, verbal, or written communication sent
      to the Licensor or its representatives, including but not limited to
      communication on electronic mailing lists, source code control systems,
      and issue tracking systems that are managed by, or on behalf of, the
      Licensor for the purpose of discussing and improving the Work, but
      excluding communication that is conspicuously marked or otherwise
      designated in writing by the copyright owner as "Not a Contribution."

      "Contributor" shall mean Licensor and any individual or Legal Entity
      on behalf of whom a Contribution has been received by Licensor and
      subsequently incorporated within the Work.

   2. Grant of Copyright License. Subject to the terms and conditions of
      this License, each Contributor hereby grants to You a perpetual,
      worldwide, non-exclusive, no-charge, royalty-free, irrevocable
      copyright license to reproduce, prepare Derivative Works of,
      publicly display, publicly perform, sublicense, and distribute the
      Work and such Derivative Works in Source or Object form.

   3. Grant of Patent License. Subject to the terms and conditions of
      this License, each Contributor hereby grants to You a perpetual,
      worldwide, non-exclusive, no-charge, royalty-free, irrevocable
      (except as stated in this section) patent license to make, have made,
      use, offer to sell, sell, import, and otherwise transfer the Work,
      where such license applies only to those patent claims licensable
      by such Contributor that are necessarily infringed by their
      Contribution(s) alone or by combination of their Contribution(s)
      with the Work to which such Contribution(s) was submitted. If You
      institute patent litigation against any entity (including a
      cross-claim or counterclaim in a lawsuit) alleging that the Work
      or a Contribution incorporated within the Work constitutes direct
      or contributory patent infringement, then any patent licenses
      granted to You under this License for that Work shall terminate
      as of the date such litigation is filed.

   4. Redistribution. You may reproduce and distribute copies of the
      Work or Derivative Works thereof in any medium, with or without
      modifications, and in Source or Object form, provided that You
      meet the following conditions:

      (a) You must give any other recipients of the Work or
          Derivative Works a copy of this License; and

      (b) You must cause any modified files to carry prominent notices
          stating that You changed the files; and

      (c) You must retain, in the Source form of any Derivative Works
          that You distribute, all copyright, patent, trademark, and
          attribution notices from the Source form of the Work,
          excluding those notices that do not pertain to any part of
          the Derivative Works; and

      (d) If the Work includes a "NOTICE" text file as part of its
          distribution, then any Derivative Works that You distribute must
          include a readable copy of the attribution notices contained
          within such NOTICE file, excluding those notices that do not
          pertain to any part of the Derivative Works, in at least one
          of the following places: within a NOTICE text file distributed
          as part of the Derivative Works; within the Source form or
          documentation, if provided along with the Derivative Works; or,
          within a display generated by the Derivative Works, if and
          wherever such third-party notices normally appear. The contents
          of the NOTICE file are for informational purposes only and
          do not modify the License. You may add Your own attribution
          notices within Derivative Works that You distribute, alongside
          or as an addendum to the NOTICE text from the Work, provided
          that such additional attribution notices cannot be construed
          as modifying the License.

      You may add Your own copyright statement to Your modifications and
      may provide additional or different license terms and conditions
      for use, reproduction, or distribution of Your modifications, or
      for any such Derivative Works as a whole, provided Your use,
      reproduction, and distribution of the Work otherwise complies with
      the conditions stated in this License.

   5. Submission of Contributions. Unless You explicitly state otherwise,
      any Contribution intentionally submitted for inclusion in the Work
      by You to the Licensor shall be under the terms and conditions of
      this License, without any additional terms or conditions.
      Notwithstanding the above, nothing herein shall supersede or modify
      the terms of any separate license agreement you may have executed
      with Licensor regarding such Contributions.

   6. Trademarks. This License does not grant permission to use the trade
      names, trademarks, service marks, or product names of the Licensor,
      except as required for reasonable and customary use in describing the
      origin of the Work and reproducing the content of the NOTICE file.

   7. Disclaimer of Warranty. Unless required by applicable law or
      agreed to in writing, Licensor provides the Work (and each
      Contributor provides its Contributions) on an "AS IS" BASIS,
      WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
      implied, including, without limitation, any warranties or conditions
      of TITLE, NON-INFRINGEMENT, MERCHANTABILITY, or FITNESS FOR A
      PARTICULAR PURPOSE. You are solely responsible for determining the
      appropriateness of using or redistributing the Work and assume any
      risks associated with Your exercise of permissions under this License.

   8. Limitation of Liability. In no event and under no legal theory,
      whether in tort (including negligence), contract, or otherwise,
      unless required by applicable law (such as deliberate and grossly
      negligent acts) or agreed to in writing, shall any Contributor be
      liable to You for damages, including any direct, indirect, special,
      incidental, or consequential damages of any character arising as a
      result of this License or out of the use or inability to use the
      Work (including but not limited to damages for loss of goodwill,
      work stoppage, computer failure or malfunction, or any and all
      other commercial damages or losses), even if such Contributor
      has been advised of the possibility of such damages.

   9. Accepting Warranty or Additional Liability. While redistributing
      the Work or Derivative Works thereof, You may choose to offer,
      and charge a fee for, acceptance of support, warranty, indemnity,
      or other liability obligations and/or rights consistent with this
      License. However, in accepting such obligations, You may act only
      on Your own behalf and on Your sole responsibility, not on behalf
      of any other Contributor, and only if You agree to indemnify,
      defend, and hold each Contributor harmless for any liability
      incurred by, or claims asserted against, such Contributor by reason
      of your accepting any such warranty or additional liability.

   END OF TERMS AND CONDITIONS

   APPENDIX: How to apply the Apache License to your work.

      To apply the Apache License to your work, attach the following
      boilerplate notice, with the fields enclosed by brackets "[]"
      replaced with your own identifying information. (Don't include
      the brackets!)  The text should be enclosed in the appropriate
      comment syntax for the file format. We also recommend that a
      file or class name and description of purpose be included on the
      same "printed page" as the copyright notice for easier
      identification within third-party archives.

   Copyright 2019 Rolando Gopez Lacuata

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       https://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.

