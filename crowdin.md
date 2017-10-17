## Crowdin

Electron's localization effort uses [Crowdin], an awesome platform for 
collaborative translation. It's free for open source projects, and anyone
who understands multiples languages is welcome to join in the effort, regardless 
of their technical experience or familiarity with the Electron project.

## Why Crowdin?

GitHub's documentation team reviewed numerous localization platforms (XTM, Smartling, Memsource, LingoHub, Qordoba, Transifex) before choosing [Crowdin](http://crowdin.com). We found Crowdin to be the best fit for the needs of the Electron project, as it satisfies most of our unique requirements.

## Our Requirements

- **GitHub Flavored Markdown.** Some other localization platforms do not support markdown, on the basis that it is "unstructured" (though Githubbers are [working on that](https://githubengineering.com/a-formal-spec-for-github-markdown/). Other platforms have markdown support, but few have full support for GFM.
- **Aribtrary YAML data.** Many localization platforms support YAML, but some have specific requirements about its structure, such as a locale key like `en` at the root node of the file.
- **YAML frontmatter.** Tools like Jekyll (upon which the Electron website is built) use a block of key-value metadata atop markdown files like `date`, `keywords`, `author`, `permalink`, etc. This content needs to be translated while preserving the original YAML structure.

## Features

In addition to satifying our project's unique requirements, Crowdin has some compelling features:

- **GitHub Integration.** Crowdin is the only provider we evaluated that can integrate with GitHub and automatically sync content in and out of repositories.
- **Machine Translations.** Crowdin supports machine translation using APIs from Microsoft and Google. This may allow us to save human time and energy by automating the initial translation of doc sets.
- **Crowdsourcing.** Electron has a huge community of open-source
contributors. Whether or not we end up paying professionals to help translate Electron's docs, we will always want the localization process to be as transparent and inclusive as possible. Other localization platforms are geared toward professional translators, whereas Crowdin can be used by anyone, and has some unique collaborative features like voting.
- **Login with GitHub** Translators can log in with their GitHub accounts. This makes the onboarding process easier for participants, and gives  us an easier way to know who to thank for the contributions.

[Crowdin]: https://crowdin.com/project/electron