# Contributing to electron-i18n

🇨🇳 🇹🇼 🇧🇷 🇪🇸 🇰🇷 🇯🇵 🇷🇺 🇫🇷 🇹🇭 🇳🇱 🇹🇷 🇮🇩 🇺🇦 🇨🇿 🇮🇹

💚 First off, thanks for taking the time to contribute! 💚

Anyone is welcome to join in the effort, regardless of technical experience or 
familiarity with the Electron project.

This project adheres to the Contributor Covenant [code of conduct](code_of_conduct.md).
By participating, you are expected to uphold this code. Please report unacceptable
behavior to electron@github.com.

The following is a set of guidelines for contributing to Electron's localization
effort. These are just guidelines, not rules, so use your best judgment and 
feel free to propose changes to this document in a pull request.

## Translating

Here are some guidelines to keep in mind as a translator:

- Don't open pull requests to translate Electron; instead, do all translations on  [Crowdin](https://crowdin.com/project/electron).
- Do not translate JavaScript keywords like `String`, `Event`, `Array`, `Class`, etc.
- Do not translate Electron classes, method names, event names, etc.
- If you find an error in the source English docs, open a pull request on the [electron/electron](https://github.com/electron/electron/tree/main/docs) repository.
- If you've been working as a translator and want to have more influence over the approved translations in your language, let us know and we'll make you a proofreader.

Electron's localization effort uses Crowdin, an awesome platform for 
collaborative translation. Changes on Crowdin are  automatically turned into 
pull requests on this GitHub repository.

To get started, visit 
**[crowdin.com/project/electron](https://crowdin.com/project/electron)** 
and log in with your GitHub account.

## Proofreading

If you're using a platform like Utopian.io and would like to be promoted to 
proofreader status on the Electron project, please translate 1,000 words or 
more before applying. When contacting us, please include a link to your existing translations on the project.

## Glossaries

There are two different "glossaries" in the Electron world:

### 1. [The Electron Glossary](https://github.com/electron/electron/blob/main/docs/glossary.md)

The Electron Glossary is a **hand-written** markdown file. It defines terms 
that are common in Electron development, like "ASAR", "IPC", "V8", etc. 
To add entries to it, open a pull request on the electron/electron repository.

### 2. [The Crowdin Glossary](https://support.crowdin.com/glossary/) 

The Crowdin Glossary is **programatically generated**. It defines terms to give 
translators context when translating in the Crowdin UI, and to help avoid 
translations of strings like `Array` and `win.open()` that should remain in 
their original "English" form. It includes entries for JavaScript builtins, 
Electron API names, method names, event names, etc. To modify this glossary,
see [script/upload-crowdin-glossary.js](script/upload-crowdin-glossary.js)

## Developing `electron-i18n`

The rest of this document describes how this repo is structured, how
it syncs with Crowdin, how to make technical changes, and how to configure the proofreader role properly.

**If you're just here to translate, you probably don't need to read this.**

### Environment Setup

To fetch the latest docs, you need a GitHub token. Visit
https://github.com/settings/tokens/new
to create one. No special scopes needed.

```sh
cp .env.example .env
```

Then edit `.env` and add your token. 

```sh
npm run build
```

### Adding or Removing Languages

To modify the list of supported languages:

1. Visit https://crowdin.com/project/electron/settings#translations
1. Click the [Target Languages] button.
1. Choose your language(s) you wish to add (or remove):

![CrowdIn Language UI]("https://user-images.githubusercontent.com/2289/34370816-40f085bc-ea7c-11e7-9700-8d346d61113f.png")

Afterwards, when `npm build is run`, the language list in the README will be updated and
the `content` folder will be cleaned up to remove any stale languages.

**N.B.** When modifying the language list, tests may fail both in this repository and on
[electron/electronjs.org](https://github.com/electron/electronjs.org). Please modify any
tests that previously relied on removed languages or that counted the number of available
localizations.

### Source Content

Electron's documentation and website are authored in English.

The source content in this repo is collected from a few places:

- Markdown files from the [electron](https://github.com/electron/electron/tree/main/docs) repo.
- YAML files from the [electronjs.org](https://github.com/electron/electronjs.org/blob/master/data/locale.yml) repo
- Electron's [structured API docs](https://electronjs.org/blog/api-docs-json-schema).

Here's the directory structure:

```
content
└── en-US
    ├── api
    ├── docs
    └── website
```

### Translated Content

[The Crowdin project](https://crowdin.com/project/electron) is configured to automatically **pull** the latest English content out of this repo and **push** the translated content back into this repo.

Translations are added under a directory named after the locale. The _contents_ of these files differ by language, but the _directory structure and filenames_ for each locale is always identical.

```
content
├── en-US
│   ├── api
│   ├── docs
│   └── website
├── es-ES
│   ├── api
│   ├── docs
│   └── website
├── pt-BR
│   ├── api
│   ├── docs
│   └── website
└── zh-TW
    ├── api
    ├── docs
    └── website
```

To get a sense of how content is transformed, see [crowdin.yml](crowdin.yml)

[Crowdin]: https://crowdin.com/project/electron

### Limited Proofreader Role

There are two options to configure the proofreader role on Crowdin.
(You can change the role of translators in Translators tab on the project setting)

![setup_proofreader](https://user-images.githubusercontent.com/8563047/38530907-43aad2b6-3ca8-11e8-8827-a3be4229d0dd.gif)

- General proofreader: translate, approve strings for all languages.  
- The proofreader for languages: give a proofreader role for specific language. 

When you choose *Proofreader* on the setting for the specific user, it will show up as the proofreader on the project role. On the other hand, limited proofreader role will appear as the translator on the screen. To set up a proofreader role for specific language, you need to select **P** on the setting screen(P – Proofreader, T – Translator). You can see more info about the project role on crowdin: https://support.crowdin.com/modifying-project-participants-roles/

Generally, a proofreader can handle only one language. So, we recommend limited proofreader role per language.
