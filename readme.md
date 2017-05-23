# electron-i18n 

The home of Electron's translateable content

This repository is a collection of Electron documentation from various sources.

## Contents

The `content` directory contains a subdirectory for each locale.

The source locale is English (en). Its content is derived from a few sources:

- [markdown docs](https://github.com/electron/electron/tree/master/docs) from the electron/electron repo.
- localizable YML strings from the electron.atom.io website
- API class/module/method/argument descriptions derived from Electron's [electron-api.json](https://electron.atom.io/blog/2016/09/27/api-docs-json-schema) release asset.


Here's the directory structure:

```
❯ tree content -L 3
content
└── en
    ├── api
    │   ├── api-descriptions.yml
    │   └── electron-api.json
    ├── docs
    │   ├── README.md
    │   ├── development
    │   ├── faq.md
    │   ├── glossary.md
    │   ├── styleguide.md
    │   └── tutorial
    └── website
        └── locale.yml
```

## License

MIT
