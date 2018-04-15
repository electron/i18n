# 模板和命令行界面

Electron 应用的开发从来都不是死板的, 应用的开发、构建、打包、分发从来都没有“唯一解”。 Electron 的编译和运行时相关额外功能通常可以在 [npm](https://www.npmjs.com/search?q=electron) 的独立安装包中找到, 这样开发者就可以根据自己的需求同时编译应用和 build pipeline.

得益于高度的模块化和扩展性，所有的开发团队，无论大小都可以在整个开发周期中无往不利、所向披靡。 与此同时，对于大多数开发者来说如果能有一款社区驱动的boilerplates或者命令行 工具，无疑会使应用的编译、打包、分发更加简单。

## 模板与命令行界面

一个模板就像是一张空白的画布，你可以以它为基础来搭建你的应用。 通常来说，你可以从一个代码仓库克隆一个模板，然后修改成你心仪的样子。

A command line tool on the other hand continues to support you throughout the development and release. They are more helpful and supportive but enforce guidelines on how your code should be structured and built. *Especially for beginners, using a command line tool is likely to be helpful*.

## electron-forge

A "complete tool for building modern Electron applications". Electron Forge unifies the existing (and well maintained) build tools for Electron development into a simple, easy to use package so that anyone can jump right in to Electron development.

Forge comes with [ready-to-use templates](https://electronforge.io/templates) for popular frameworks like React, Vue, or Angular. It uses the same core modules used by the greater Electron community (like [`electron-packager`](https://github.com/electron-userland/electron-packager)) –  changes made by Electron maintainers (like Slack) benefit Forge's users, too.

You can find more information and documentation on [electronforge.io](https://electronforge.io/).

## electron-builder

A "complete solution to package and build a ready-for-distribution Electron app" that focuses on an integrated experience. [`electron-builder`](https://github.com/electron-userland/electron-builder) adds one single dependency focused on simplicity and manages all further requirements internally.

`electron-builder` replaces features and modules used by the Electron maintainers (such as the auto-updater) with custom ones. They are generally tighter integrated but will have less in common with popular Electron apps like Atom, Visual Studio Code, or Slack.

You can find more information and documentation in [the repository](https://github.com/electron-userland/electron-builder).

## electron-react-boilerplate

If you don't want any tools but simply a solid boilerplate to build from, CT Lin's [`electron-react-boilerplate`](https://github.com/chentsulin/electron-react-boilerplate) might be worth a look. It's quite popular in the community and uses `electron-builder` internally.

## 其它工具和模板

The ["Awesome Electron" list](https://github.com/sindresorhus/awesome-electron#boilerplates) contains more tools and boilerplates to choose from. If you find the length of the list intimidating, don't forget that adding tools as you go along is a valid approach, too.