# 模板和命令行界面

Electron 应用的开发从来都不是死板的, 应用的开发、构建、打包、分发从来都没有“唯一解”。 Electron 的编译和运行时相关额外功能通常可以在 [npm](https://www.npmjs.com/search?q=electron) 的独立安装包中找到, 这样开发者就可以根据自己的需求同时编译应用和 build pipeline.

得益于高度的模块化和扩展性，所有的开发团队，无论大小都可以在整个开发周期中无往不利、所向披靡。 与此同时，对于大多数开发者来说如果能有一款社区驱动的boilerplates或者命令行 工具，无疑会使应用的编译、打包、分发更加简单。

## 模板与命令行界面

一个模板就像是一张空白的画布，你可以以它为基础来搭建你的应用。 通常来说，你可以从一个代码仓库克隆一个模板，然后修改成你心仪的样子。

命令行工具则是在整个开发和分发过程中从另一方面给你提供帮助。 他们更有用，但同时也对代码结构和构建项目有着硬性的要求。 *特别是对于初学者来说，命令行工具十分有用。*

## electron-forge

Electron Forge 是一个用来构建现代化Electron应用的完善的工具。 Electron Forge将多个现有的（ 且有稳定维护的 ）Electron构建工具整合为一个简单易用的工具包，所有人都可以用它来快速地搭建Electron开发环境。

Forge 将一些流行框架整合为[“开箱即用”](https://electronforge.io/templates)的模板，比如：React、Vue、Angular等。 Forge 的一些核心模块来自于上层的Electron社区（比如[`electron-packager`](https://github.com/electron-userland/electron-packager)），因而Electron主要维护人员（比如说Slack）提交的Electron更新也会使Forge的用户受益。

关于Forge的更多信息，请查阅[electronforge.io](https://electronforge.io/)。

## electron-builder

Electron Builder 是一个完备的Electron应用打包和分发解决方案，它致力于软件开发的集成体验。 [`electron-builder`](https://github.com/electron-userland/electron-builder) 出于简化的目的添加了一个依赖项，可以在内部管理所有更多的要求。

`electron-builder` 会将Electron维护者使用的模块和功能(例如: auto-updater) 替换为自定义的. Electron Builder打包的应用内组件的集成度会更高，同时与主流的Electron应用共同点也就更少了。

关于Electron Builder的更多信息，请查阅[代码仓库](https://github.com/electron-userland/electron-builder)。

## electron-react-boilerplate

如果你不希望任何工具，而想要简单地从一个模板开始构建，CT Lin的 [`electron-react-boilerplate`](https://github.com/chentsulin/electron-react-boilerplate) 可能值得一看。 它在社区中很受欢迎，并在内部使用了 `electron-builder`。

## 其它工具和模板

["Awesome Electron" 列表](https://github.com/sindresorhus/awesome-electron#boilerplates)涵盖了众多可供选择的工具和模板。 如果您发现列表的长度令人畏惧，请不要忘记，您也可以在开发过程中逐渐添加工具。