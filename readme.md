# electron-i18n 

A home for Electron's translated documentation.

## Content

The `content` directory contains a subdirectory for each locale.

The source content (in English) is collected from a few places:

- Markdown docs from the electron/electron repo.
- YML strings from the electron.atom.io website
- YML `description` strings for classes, modules, methods, arguments, etc from Electron's [structured API docs](https://electron.atom.io/blog/2016/09/27/api-docs-json-schema).

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

To get a sense of how content is organized, see [crowdin.yaml](crowdin.yaml)

## License

MIT
