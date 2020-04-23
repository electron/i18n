# dialog

> 파일 열기와 저장, 경고, 기타 등등에 대한 기본 시스템 대화 상자를 표시합니다.

프로세스: [Main](../glossary.md#main-process)

다중 파일 선택 및 경로를 선택하는 다이얼로그 창을 표시하는 예제입니다:

```javascript
const { dialog } = require('electron')
console.log(dialog.showOpenDialog({ properties: ['openFile', 'openDirectory', 'multiSelections'] }))
```

The Dialog is opened from Electron's main thread. If you want to use the dialog object from a renderer process, remember to access it using the remote:

```javascript
const { dialog } = require('electron').remote
console.log(dialog)
```

## 메서드

`dialog` 모듈은 다음과 같은 메서드를 참조합니다:

### `dialog.showOpenDialogSync([browserWindow, ]options)`

* `browserWindow` [BrowserWindow](browser-window.md) (optional)
* `options` Object
  * `title` String (optional)
  * `defaultPath` String (optional)
  * `buttonLabel` String (optional) - 확인 버튼에 대한 사용자 지정 라벨입니다. 비워둘 경우 기본 라벨이 사용됩니다.
  * `filters` [FileFilter[]](structures/file-filter.md) (optional)
  * `properties` String[] (optional) - Contains which features the dialog should use. The following values are supported:
    * `openFile` - 파일 선택 가능
    * `openDirectory` - 폴더 선택 가능
    * `multiSelections` - 경로 다중 선택 가능
    * `showHiddenFiles` - 숨겨진 파일 표시
    * `createDirectory` _macOS_ - dialog에서 새로운 폴더 생성 가능
    * `promptToCreate` _Windows_ - 입력한 경로가 존재하지 않을 경우 프롬프트 생성. 실제로 해당 경로에 파일을 만들지는 않지만 존재하지 않는 파일에 대한 경로를 반환함으로써 애플리케이션에서 해당 파일을 생성할 수 있도록 합니다.
    * `noResolveAliases` _macOS_ - Disable the automatic alias (symlink) path resolution. Selected aliases will now return the alias path instead of their target path.
    * `treatPackageAsDirectory` _macOS_ - `.app` 폴더와 같은 macOS 패키지를 파일이 아니라 폴더로써 다룹니다
  * `message` String (optional) _macOS_ - 입력 상자 상단에 들어갈 메시지를 설정합니다
  * `securityScopedBookmarks` Boolean (optional) _masOS_ _mas_ - Mac App Store 용으로 패키지 되었을때를 위한 [security scoped bookmarks](https://developer.apple.com/library/content/documentation/Security/Conceptual/AppSandboxDesignGuide/AppSandboxInDepth/AppSandboxInDepth.html#//apple_ref/doc/uid/TP40011183-CH3-SW16)를 만듭니다

Returns `String[] | undefined`, the file paths chosen by the user; if the dialog is cancelled it returns `undefined`.

`browserWindow` 인수는 대화 상자가 부모 창에 연결되어 모달 대화상자로써 표시될 수 있도록 해줍니다.

The `filters` specifies an array of file types that can be displayed or selected when you want to limit the user to a specific type. 예시:

```javascript
{
  filters: [
    { name: 'Images', extensions: ['jpg', 'png', 'gif'] },
    { name: 'Movies', extensions: ['mkv', 'avi', 'mp4'] },
    { name: 'Custom File Type', extensions: ['as'] },
    { name: 'All Files', extensions: ['*'] }
  ]
}
```

`extensions` 배열에서는 와일드카드 문자나 점 문자가 들어가지 않은 확장자의 값이 들어가야 합니다. (예시: `'png'` 는 가능하지만 `'.png'`나 `'*.png'`는 불가능합니다) 모든 파일을 표시하고 싶다면 `'*'` 와일드카드를 사용해주세요. (다른 와일드카드 값은 사용할 수 없습니다)

**Note:** 윈도우, 리눅스에서는 dialog 창이 file, directory 중복 선택 불가능합니다. directory 선택을 원할경우 `properties` `['openFile', 'opendirectory']` 를 설정하면 directory 선택이 가능합니다.

```js
dialog.showOpenDialogSync(mainWindow, {
  properties: ['openFile', 'openDirectory']
})
```

### `dialog.showOpenDialog([browserWindow, ]options)`

* `browserWindow` [BrowserWindow](browser-window.md) (optional)
* `options` Object
  * `title` String (optional)
  * `defaultPath` String (optional)
  * `buttonLabel` String (optional) - 확인 버튼에 대한 사용자 지정 라벨입니다. 비워둘 경우 기본 라벨이 사용됩니다.
  * `filters` [FileFilter[]](structures/file-filter.md) (optional)
  * `properties` String[] (optional) - Contains which features the dialog should use. The following values are supported:
    * `openFile` - 파일 선택 가능
    * `openDirectory` - 폴더 선택 가능
    * `multiSelections` - 경로 다중 선택 가능
    * `showHiddenFiles` - 숨겨진 파일 표시
    * `createDirectory` _macOS_ - dialog에서 새로운 폴더 생성 가능
    * `promptToCreate` _Windows_ - 입력한 경로가 존재하지 않을 경우 프롬프트 생성. 실제로 해당 경로에 파일을 만들지는 않지만 존재하지 않는 파일에 대한 경로를 반환함으로써 애플리케이션에서 해당 파일을 생성할 수 있도록 합니다.
    * `noResolveAliases` _macOS_ - Disable the automatic alias (symlink) path resolution. Selected aliases will now return the alias path instead of their target path.
    * `treatPackageAsDirectory` _macOS_ - `.app` 폴더와 같은 macOS 패키지를 파일이 아니라 폴더로써 다룹니다
  * `message` String (optional) _macOS_ - 입력 상자 상단에 들어갈 메시지를 설정합니다
  * `securityScopedBookmarks` Boolean (optional) _masOS_ _mas_ - Mac App Store 용으로 패키지 되었을때를 위한 [security scoped bookmarks](https://developer.apple.com/library/content/documentation/Security/Conceptual/AppSandboxDesignGuide/AppSandboxInDepth/AppSandboxInDepth.html#//apple_ref/doc/uid/TP40011183-CH3-SW16)를 만듭니다
* `callback` Function (optional)

Returns `Promise<Object>` - Resolve wih an object containing the following:

* `canceled` Boolean - whether or not the dialog was canceled.
* `filePaths` String[] (optional) - An array of file paths chosen by the user. If the dialog is cancelled this will be an empty array.
* `bookmarks` String[] (optional) _macOS_ _mas_ - An array matching the `filePaths` array of base64 encoded strings which contains security scoped bookmark data. 이 값을 얻기 위해서는 `securityScopedBookmarks`를 반드시 설정해야 합니다.

`browserWindow` 인수는 대화 상자가 부모 창에 연결되어 모달 대화상자로써 표시될 수 있도록 해줍니다.

The `filters` specifies an array of file types that can be displayed or selected when you want to limit the user to a specific type. 예시:

```javascript
{
  filters: [
    { name: 'Images', extensions: ['jpg', 'png', 'gif'] },
    { name: 'Movies', extensions: ['mkv', 'avi', 'mp4'] },
    { name: 'Custom File Type', extensions: ['as'] },
    { name: 'All Files', extensions: ['*'] }
  ]
}
```

`extensions` 배열에서는 와일드카드 문자나 점 문자가 들어가지 않은 확장자의 값이 들어가야 합니다. (예시: `'png'` 는 가능하지만 `'.png'`나 `'*.png'`는 불가능합니다) 모든 파일을 표시하고 싶다면 `'*'` 와일드카드를 사용해주세요. (다른 와일드카드 값은 사용할 수 없습니다)

**Note:** 윈도우, 리눅스에서는 dialog 창이 file, directory 중복 선택 불가능합니다. directory 선택을 원할경우 `properties` `['openFile', 'opendirectory']` 를 설정하면 directory 선택이 가능합니다.

```js
dialog.showOpenDialog(mainWindow, {
  properties: ['openFile', 'openDirectory']
}).then(result => {
  console.log(result.canceled)
  console.log(result.filePaths)
}).catch(err => {
  console.log(err)
})
```

### `dialog.showSaveDialogSync([browserWindow, ]options)`

* `browserWindow` [BrowserWindow](browser-window.md) (optional)
* `options` Object
  * `title` String (optional)
  * `defaultPath` String (optional) - directory 절대경로, file 절대경로 혹은 file name을 기본값으로 사용.
  * `buttonLabel` String (optional) - 확인 버튼에 대한 사용자 지정 라벨입니다. 비워둘 경우 기본 라벨이 사용됩니다.
  * `filters` [FileFilter[]](structures/file-filter.md) (optional)
  * `message` String (optional) _macOS_ - Message to display above text fields.
  * `nameFieldLabel` String (optional) _macOS_ - Custom label for the text displayed in front of the filename text field.
  * `showsTagField` Boolean (optional) _macOS_ - Show the tags input box, defaults to `true`.
  * `securityScopedBookmarks` Boolean (optional) _macOS_ _mas_ - Create a [security scoped bookmark](https://developer.apple.com/library/content/documentation/Security/Conceptual/AppSandboxDesignGuide/AppSandboxInDepth/AppSandboxInDepth.html#//apple_ref/doc/uid/TP40011183-CH3-SW16) when packaged for the Mac App Store. If this option is enabled and the file doesn't already exist a blank file will be created at the chosen path.

Returns `String | undefined`, the path of the file chosen by the user; if the dialog is cancelled it returns `undefined`.

`browserWindow` 인수는 대화 상자가 부모 창에 연결되어 모달 대화상자로써 표시될 수 있도록 해줍니다.

The `filters` specifies an array of file types that can be displayed, see `dialog.showOpenDialog` for an example.

### `dialog.showSaveDialog([browserWindow, ]options)`

* `browserWindow` [BrowserWindow](browser-window.md) (optional)
* `options` Object
  * `title` String (optional)
  * `defaultPath` String (optional) - directory 절대경로, file 절대경로 혹은 file name을 기본값으로 사용.
  * `buttonLabel` String (optional) - 확인 버튼에 대한 사용자 지정 라벨입니다. 비워둘 경우 기본 라벨이 사용됩니다.
  * `filters` [FileFilter[]](structures/file-filter.md) (optional)
  * `message` String (optional) _macOS_ - Message to display above text fields.
  * `nameFieldLabel` String (optional) _macOS_ - Custom label for the text displayed in front of the filename text field.
  * `showsTagField` Boolean (optional) _macOS_ - Show the tags input box, defaults to `true`.
  * `securityScopedBookmarks` Boolean (optional) _macOS_ _mas_ - Create a [security scoped bookmark](https://developer.apple.com/library/content/documentation/Security/Conceptual/AppSandboxDesignGuide/AppSandboxInDepth/AppSandboxInDepth.html#//apple_ref/doc/uid/TP40011183-CH3-SW16) when packaged for the Mac App Store. If this option is enabled and the file doesn't already exist a blank file will be created at the chosen path.

Returns `Promise<Object>` - Resolve with an object containing the following:
  * `canceled` Boolean - whether or not the dialog was canceled.
  * `filePath` String (optional) If the dialog is canceled this will be `undefined`.
  * `bookmark` String (optional) _macOS_ _mas_ - Base64 encoded string which contains the security scoped bookmark data for the saved file. `securityScopedBookmarks` must be enabled for this to be present.

`browserWindow` 인수는 대화 상자가 부모 창에 연결되어 모달 대화상자로써 표시될 수 있도록 해줍니다.

The `filters` specifies an array of file types that can be displayed, see `dialog.showOpenDialog` for an example.

**Note:** MacOS 에서는 dialog expanding and collapsing 시에 문제를 피하기위해 비동기 버전 사용이 권장됩니다.

### `dialog.showMessageBoxSync([browserWindow, ]options)`

* `browserWindow` [BrowserWindow](browser-window.md) (optional)
* `options` Object
  * `type` String (optional) - Can be `"none"`, `"info"`, `"error"`, `"question"` or `"warning"`. On Windows, `"question"` displays the same icon as `"info"`, unless you set an icon using the `"icon"` option. On macOS, both `"warning"` and `"error"` display the same warning icon.
  * `buttons` String[] (optional) - Array of texts for buttons. On Windows, an empty array will result in one button labeled "OK".
  * `defaultId` Integer (optional) - Index of the button in the buttons array which will be selected by default when the message box opens.
  * `title` String (optional) - Title of the message box, some platforms will not show it.
  * `message` String - Content of the message box.
  * `detail` String (optional) - Extra information of the message.
  * `checkboxLabel` String (optional) - If provided, the message box will include a checkbox with the given label. The checkbox state can be inspected only when using `callback`.
  * `checkboxChecked` Boolean (optional) - Initial checked state of the checkbox. `false` by default.
  * `icon` ([NativeImage](native-image.md) | String) (optional)
  * `cancelId` Integer (optional) - The index of the button to be used to cancel the dialog, via the `Esc` key. By default this is assigned to the first button with "cancel" or "no" as the label. If no such labeled buttons exist and this option is not set, `0` will be used as the return value or callback response.
  * `noLink` Boolean (optional) - On Windows Electron will try to figure out which one of the `buttons` are common buttons (like "Cancel" or "Yes"), and show the others as command links in the dialog. This can make the dialog appear in the style of modern Windows apps. If you don't like this behavior, you can set `noLink` to `true`.
  * `normalizeAccessKeys` Boolean (optional) - Normalize the keyboard access keys across platforms. 기본값은 `false`이다. Enabling this assumes `&` is used in the button labels for the placement of the keyboard shortcut access key and labels will be converted so they work correctly on each platform, `&` characters are removed on macOS, converted to `_` on Linux, and left untouched on Windows. For example, a button label of `Vie&w` will be converted to `Vie_w` on Linux and `View` on macOS and can be selected via `Alt-W` on Windows and Linux.

Returns `Integer` - the index of the clicked button.

Shows a message box, it will block the process until the message box is closed. It returns the index of the clicked button.

`browserWindow` 인수는 대화 상자가 부모 창에 연결되어 모달 대화상자로써 표시될 수 있도록 해줍니다.

### `dialog.showMessageBox([browserWindow, ]options)`

* `browserWindow` [BrowserWindow](browser-window.md) (optional)
* `options` Object
  * `type` String (optional) - Can be `"none"`, `"info"`, `"error"`, `"question"` or `"warning"`. On Windows, `"question"` displays the same icon as `"info"`, unless you set an icon using the `"icon"` option. On macOS, both `"warning"` and `"error"` display the same warning icon.
  * `buttons` String[] (optional) - Array of texts for buttons. On Windows, an empty array will result in one button labeled "OK".
  * `defaultId` Integer (optional) - Index of the button in the buttons array which will be selected by default when the message box opens.
  * `title` String (optional) - Title of the message box, some platforms will not show it.
  * `message` String - Content of the message box.
  * `detail` String (optional) - Extra information of the message.
  * `checkboxLabel` String (optional) - If provided, the message box will include a checkbox with the given label. The checkbox state can be inspected only when using `callback`.
  * `checkboxChecked` Boolean (optional) - Initial checked state of the checkbox. `false` by default.
  * `icon` [NativeImage](native-image.md) (optional)
  * `cancelId` Integer (optional) - The index of the button to be used to cancel the dialog, via the `Esc` key. By default this is assigned to the first button with "cancel" or "no" as the label. If no such labeled buttons exist and this option is not set, `0` will be used as the return value or callback response.
  * `noLink` Boolean (optional) - On Windows Electron will try to figure out which one of the `buttons` are common buttons (like "Cancel" or "Yes"), and show the others as command links in the dialog. This can make the dialog appear in the style of modern Windows apps. If you don't like this behavior, you can set `noLink` to `true`.
  * `normalizeAccessKeys` Boolean (optional) - Normalize the keyboard access keys across platforms. 기본값은 `false`이다. Enabling this assumes `&` is used in the button labels for the placement of the keyboard shortcut access key and labels will be converted so they work correctly on each platform, `&` characters are removed on macOS, converted to `_` on Linux, and left untouched on Windows. For example, a button label of `Vie&w` will be converted to `Vie_w` on Linux and `View` on macOS and can be selected via `Alt-W` on Windows and Linux.

Returns `Promise<Object>` - resolves with a promise containing the following properties:
  * `response` Number - The index of the clicked button.
  * `checkboxChecked` Boolean - The checked state of the checkbox if `checkboxLabel` was set. Otherwise `false`.

Shows a message box, it will block the process until the message box is closed.

`browserWindow` 인수는 대화 상자가 부모 창에 연결되어 모달 대화상자로써 표시될 수 있도록 해줍니다.

### `dialog.showErrorBox(title, content)`

* `title` String - The title to display in the error box.
* `content` String - The text content to display in the error box.

Displays a modal dialog that shows an error message.

This API can be called safely before the `ready` event the `app` module emits, it is usually used to report errors in early stage of startup. If called before the app `ready`event on Linux, the message will be emitted to stderr, and no GUI dialog will appear.

### `dialog.showCertificateTrustDialog([browserWindow, ]options, callback)` _macOS_ _Windows_

* `browserWindow` [BrowserWindow](browser-window.md) (optional)
* `options` Object
  * `certificate` [Certificate](structures/certificate.md) - The certificate to trust/import.
  * `message` String - The message to display to the user.
* `callback` Function

On macOS, this displays a modal dialog that shows a message and certificate information, and gives the user the option of trusting/importing the certificate. If you provide a `browserWindow` argument the dialog will be attached to the parent window, making it modal.

On Windows the options are more limited, due to the Win32 APIs used:

* The `message` argument is not used, as the OS provides its own confirmation dialog.
* The `browserWindow` argument is ignored since it is not possible to make this confirmation dialog modal.

**[곧 중단 예정](modernization/promisification.md)**

### `dialog.showCertificateTrustDialog([browserWindow, ]options)` _macOS_ _Windows_

* `browserWindow` [BrowserWindow](browser-window.md) (optional)
* `options` Object
  * `certificate` [Certificate](structures/certificate.md) - The certificate to trust/import.
  * `message` String - The message to display to the user.

Returns `Promise<void>` - resolves when the certificate trust dialog is shown.

On macOS, this displays a modal dialog that shows a message and certificate information, and gives the user the option of trusting/importing the certificate. If you provide a `browserWindow` argument the dialog will be attached to the parent window, making it modal.

On Windows the options are more limited, due to the Win32 APIs used:

* The `message` argument is not used, as the OS provides its own confirmation dialog.
* The `browserWindow` argument is ignored since it is not possible to make this confirmation dialog modal.

## Sheets

On macOS, dialogs are presented as sheets attached to a window if you provide a [`BrowserWindow`](browser-window.md) reference in the `browserWindow` parameter, or modals if no window is provided.

You can call `BrowserWindow.getCurrentWindow().setSheetOffset(offset)` to change the offset from the window frame where sheets are attached.
