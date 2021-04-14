## 类: TouchBar

> 为原生macOS应用创建TouchBar布局

进程：[主进程](../glossary.md#main-process)

### `新的触摸栏（选项）`

* `选项` 对象
  * `items` （[触摸巴顿](touch-bar-button.md) | [触摸巴彩色皮克](touch-bar-color-picker.md) | [触摸栏组](touch-bar-group.md) | [触摸巴贝尔](touch-bar-label.md) | [触摸栏](touch-bar-popover.md) | [触摸栏](touch-bar-scrubber.md) | [触摸栏隔离控制](touch-bar-segmented-control.md) | [触摸滑机](touch-bar-slider.md) | [触摸栏](touch-bar-spacer.md)）[]（可选）
  * `escapeItem` ([TouchBarButton](touch-bar-button.md) | [TouchBarColorPicker](touch-bar-color-picker.md) | [TouchBarGroup](touch-bar-group.md) | [TouchBarLabel](touch-bar-label.md) | [TouchBarPopover](touch-bar-popover.md) | [TouchBarScrubber](touch-bar-scrubber.md) | [TouchBarSegmentedControl](touch-bar-segmented-control.md) | [TouchBarSlider](touch-bar-slider.md) | [TouchBarSpacer](touch-bar-spacer.md) | null) (可选的)

创建一个新的触摸栏与指定的项目。 使用 `BrowserWindow.setTouchBar` 将 `TouchBar` 添加到窗口。

**注意:** TouchBar API目前为实验性质，以后的Electron版本可能会更改或删除。

**提示：**如果您没有带Touch Bar的MacBook，则可以使用[ Touch Bar Simulator ](https://github.com/sindresorhus/touch-bar-simulator)来测试应用中的Touch Bar使用情况。

### 静态属性

#### `触摸巴布顿`

`TouchBarButton` 类的 [`typeof TouchBarButton`](./touch-bar-button.md) 参考。

#### `触摸巴彩色皮克`

`TouchBarColorPicker` 类的 [`typeof TouchBarColorPicker`](./touch-bar-color-picker.md) 参考。

#### `触摸栏组`

`TouchBarGroup` 类的 [`typeof TouchBarGroup`](./touch-bar-group.md) 参考。

#### `触摸巴拉贝尔`

`TouchBarLabel` 类的 [`typeof TouchBarLabel`](./touch-bar-label.md) 参考。

#### `触摸栏弹出`

`TouchBarPopover` 类的 [`typeof TouchBarPopover`](./touch-bar-popover.md) 参考。

#### `触摸巴斯克鲁伯`

`TouchBarScrubber` 类的 [`typeof TouchBarScrubber`](./touch-bar-scrubber.md) 参考。

#### `触摸栏隔离控制`

`TouchBarSegmentedControl` 类的 [`typeof TouchBarSegmentedControl`](./touch-bar-segmented-control.md) 参考。

#### `触摸栏滑机`

`TouchBarSlider` 类的 [`typeof TouchBarSlider`](./touch-bar-slider.md) 参考。

#### `触摸巴空间器`

`TouchBarSpacer` 类的 [`typeof TouchBarSpacer`](./touch-bar-spacer.md) 参考。

#### `触摸巴其他石墨斯普罗西`

`TouchBarOtherItemsProxy` 类的 [`typeof TouchBarOtherItemsProxy`](./touch-bar-other-items-proxy.md) 参考。

### 实例属性

在`TouchBar`的实例中有以下属性可用：

#### `touchBar.escapeItem`

`TouchBarItem`设置的内容将替换掉Touch bar中的“esc”按钮 将该项设为`null`以使用默认的"esc"按钮 修改这个值将立即更新Touch bar中的返回按钮

## 示例

下面是一个带有一个按钮和若干文本的简易Touch bar老虎机游戏示例

```javascript
康斯特 { app, BrowserWindow, TouchBar } =要求（'电子'）

锥 { TouchBarLabel, TouchBarButton, TouchBarSpacer } =TouchBar

让旋转=假

//卷轴标签
锥卷轴1=新的触摸巴拉贝尔（）
锥卷轴2=新的触摸杆卷轴（）
锥卷轴3= 新的 TouchBar 标签 （）

// 旋转结果标签
缺点结果 = 新的 TouchBar 标签 （）

// 旋转按钮
康斯特旋转 = 新的触摸巴按钮 （+
  标签： "🎰旋转"，
  背景颜色： '#7851A9'，
  单击：（）=> {
    //如果（旋转） {
      return
    }

    旋转

    旋转，请忽略单击。标签="

    让超时=10
    const旋转长=4*100 0//4秒
    const开始时间=日期。now（）

    const旋转音圈=（）=> =
      更新（）

      如果（（日期.now）-开始时间） >=旋转长）{
        完成Spin（）
      }其他{
        //每次旋转
        超时减慢一点*=1.1
        设置超时（旋转， 超时）
      =
    =

    旋转（）
  =
}）

连续获得随机值=（）=> {
  const值=[🍒'，'💎'，'7️♥'，'🍊'，'🔔' "⭐"， "🍇"， "🍀"]
  返回值 [Math. 地板 （数学. 随机 ）] [值. 长度]]
[

续更新] （） => [
  卷轴 1. 标签 = 获取随机价值 （）
  卷轴 2. 标签 = 获取随机价值 （）
  重新标记 = 获取
[

const 完成Spin = （） => =
  const 唯一价值 = 新集 （[卷轴 1.标签， 卷轴 2.标签， 卷轴 3.标签]）. 大小
  如果 （唯一价值 == 1） {
    // 所有 3 个值都是相同的
    结果 💰。
    结果.文本颜色="#FDFF00"
  =其他（唯一值==2）=
    //2值
    结果相同 😍。
    结果.文本颜色="#FDFF00"
  }其他=
    //没有值是相同的
    结果。标签="🙁再次旋转"
    结果。文本颜色=空
  =
  旋转=假
=

锥体触摸栏=新TouchBar（{
  项：[
    旋转，
    新的触摸栏空间器（{ size: 'large' }），
    卷轴1，
    新的触摸栏空间器（{ size: 'small' }），
    卷轴2，
    新的 TouchBarSpacer （{ size: 'small' }），
    卷轴 3，
    个新的 TouchbarSpacer （{ size: 'large' }），
    结果
  ]
[）

让窗口

应用程序
    
  > 。：假的，
    标题BarStyle：'隐藏嵌套'，
    宽度：200，
    高度：200，
    背景颜色：'#000'
  }）

窗口
  。
```

### 运行以上示例

要运行上面的示例，您需要 (假设您已经在将要运行该示例的目录中打开了一个终端)：

1. 将上述文件保存到您的电脑上，并命名为 `touchbar.js`
2. 通过 `npm install electron` 来安装 Electron
3. 在 Electron 中运行示例：`./node_modules/.bin/electron touchbar.js`

接下来这个应用会在你的Touch bar (或者Touch bar模拟器) 上运行，你将能看到一个Electron窗口
