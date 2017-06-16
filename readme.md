# electron-i18n

> A home for Electron's translated documentation.

🇨🇳 🇹🇼 🇧🇷 🇪🇸 🇰🇷 🇯🇵 🇷🇺 🇫🇷 🇹🇭 🇳🇱 🇹🇷 🇮🇩 🇺🇦 🇨🇿 🇮🇹

## Contributing

Do you speak multiple languages? We need your help! 

Visit **[crowdin.com/project/electron](https://crowdin.com/project/electron)** and log in with your GitHub account to help translate.

## Source Content

Electron's documentation and website are authored in English.

The source content in this repo is collected from a few places:

- Markdown files from the [electron](https://github.com/electron/electron/tree/master/docs) repo.
- YML files from the [electron.atom.io](https://github.com/electron/electron.atom.io/tree/gh-pages/_data/) repo
- Electron's [structured API docs](https://electron.atom.io/blog/2016/09/27/api-docs-json-schema).

Here's the directory structure:

```
content
└── en
    ├── api
    ├── docs
    └── website
```

## Translated Content

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

## Why Crowdin?

GitHub's documentation team reviewed numerous localization platforms (Acrolinx, LingoHub, Qordoba, Transifex) before choosing [Crowdin](http://crowdin.com). We found Crowdin to be the best fit for the needs of the Electron project, as it satisfies most of our unique requirements:

- **GitHub Flavored Markdown.** Some other localization platforms do not support markdown, on the basis that it is "unstructured" (though Githubbers are [working on that](https://githubengineering.com/a-formal-spec-for-github-markdown/). Other platforms have markdown support, but few have full support for GFM.
- **Arbitrary YML data.** Many localization platforms support YML, but some have specific requirements about its structure, such as a locale key like `en` at the root node of the file.
- **YML frontmatter.** Tools like Jekyll (upon which the Electron website is built) use a block of key-value metadata atop markdown files like `date`, `keywords`, `author`, `permalink`, etc. This content needs to be translated while preserving the original YML structure.

In addition to satifying our project's unique requirements, Crowdin has some compelling features:

- **GitHub Integration.** Crowdin is the only provider we evaluated that can integrate with GitHub and automatically sync content in and out of repositories.
- **Machine Translations.** Crowdin supports machine translation using APIs from Microsoft and Google. This may allow us to save human time and energy by automating the initial translation of doc sets.
- **Crowdsourcing.** Electron has a huge community of open-source
contributors. Whether or not we end up paying professionals to help translate Electron's docs, we will always want the localization process to be as transparent and inclusive as possible. Other localization platforms are geared toward professional translators, whereas Crowdin can be used by anyone, and has some unique collaborative features like voting.
- **Login with GitHub** Translators can log in with their GitHub accounts. This makes the onboarding process easier for participants, and gives  us an easier way to know who to thank for the contributions.

## License

MIT
