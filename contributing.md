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

👉 **Do not translate the content directly in this repository!**

Electron's localization effort uses [Crowdin], an awesome platform for 
collaborative translation. Changes on Crowdin are  automatically turned into 
pull requests on this GitHub repository.

To get started, visit 
**[crowdin.com/project/electron](https://crowdin.com/project/electron)** 
and log in with your GitHub account.

## Developing `electron-i18n`

The rest of this document describes how this repo is structured, how
it syncs with Crowdin, and how to make technical changes.

**If you're just here to translate, you probably don't need to read this.**

### Environment Setup

To fetch the latest docs, you need a GitHub token. Visit
github.com/settings/tokens/new](https://github.com/settings/tokens/new)
to create one. No special scopes needed.

```sh
cp .env.example .env
```

Then edit `.env` and add your token. 

```sh
npm run build
```

### Source Content

Electron's documentation and website are authored in English.

The source content in this repo is collected from a few places:

- Markdown files from the [electron](https://github.com/electron/electron/tree/master/docs) repo.
- YAML files from the [electron.atom.io](https://github.com/electron/electron.atom.io/tree/gh-pages/_data/) repo
- Electron's [structured API docs](https://electron.atom.io/blog/2016/09/27/api-docs-json-schema).

Here's the directory structure:

```
content
└── en
    ├── api
    ├── docs
    └── website
```

### Translated Content

[The Crowdin project](https://crowdin.com/project/electron) is configured to automatically **pull** the latest English content out of this repo and **push** the translated content back into this repo.

Translations are added under a directory named after the locale. The _contents_ of these files differ by language, but the _directory structure and filenames_ for each locale is always identical.

```
content
├── en
│   ├── api
│   ├── docs
│   └── website
├── es
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