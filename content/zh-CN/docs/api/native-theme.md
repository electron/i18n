# 本地主题

> 读取并响应Chromium本地色彩主题中的变化。

进程：[主进程](../glossary.md#main-process)

## 事件

`nativeTheme`模块包括以下事件：

### 事件名: 'updated'

当以下NativeTheme属性发生变化时会触发此事件： `shouldUseDarkColors`, `shouldUseHighContrastColors`或`shouldUseInvertedColorScheme` 。 你需要自己检查到底是哪个属性发生了变化。

## Properties

`nativeTheme` 模块具备以下属性：

### `nativeTheme.shouldUseDarkColors` _只读_

此属性的值为一个 `Boolean` 类型的值，代表着当前OS / Chromium是否正处于dark模式。或者应用程序是否正被建议使用dark模式的皮肤  如果你希望修改此属性的值，你应该使用下面的 `themeSource`属性

### `原生主题。主题来源`

一个类型为`String`的属性，此属性可能的值为：`system`, `light` or `dark`.  它用于覆盖和取代铬选择在内部使用的价值 。

将此属性设置为 `system` 将删除覆盖并 所有内容都将重置为操作系统默认值。  默认情况下， `themeSource` 是 `system`。

将此属性设置为 `dark` 将产生以下效果：

* 访问时将 `true` `nativeTheme.shouldUseDarkColors`
* Linux 和 Windows 上的任何 UI 电子渲染（包括上下文菜单、开发人员等）都将使用深色 UI。
* 操作系统在 macOS 上呈现的任何 UI（包括菜单、窗口框架等）都将使用深色 UI。
* [`prefers-color-scheme`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme) CSS查询将匹配 `dark` 模式。
* 将发出 `updated` 事件

将此属性设置为 `light` 将产生以下效果：

* 访问时将 `false` `nativeTheme.shouldUseDarkColors`
* Linux 和 Windows 上的任何 UI 电子渲染（包括上下文菜单、开发人员等）都将使用光 UI。
* 操作系统在 macOS 上呈现的任何 UI（包括菜单、窗口框架等）都将使用光 UI。
* [`prefers-color-scheme`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme) CSS查询将匹配 `light` 模式。
* 将发出 `updated` 事件

此属性的使用应与应用程序中的经典"暗模式"状态机器保持一致， 用户有三个选项。

* `Follow OS` -> `themeSource = 'system'`
* `Dark Mode` -> `themeSource = 'dark'`
* `Light Mode` -> `themeSource = 'light'`

然后，您的应用程序应始终使用 `shouldUseDarkColors` 来确定应用哪些CSS。

### `nativeTheme.shouldUseHighContrastColors` _马科斯_ _窗口_ _只读_

操作系统/铬当前是否启用了支持高对比度模式 或被指示显示高对比度 UI 的 `Boolean` 。

### `nativeTheme.shouldUseInvertedColorScheme` _马科斯_ _窗口_ _只读_

`Boolean` 操作系统/铬目前是否有倒置配色方案 或被指示使用倒色方案。
