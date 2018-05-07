# Ostatnie dokumenty (Windows & macOS)

Windows and macOS provide access to a list of recent documents opened by the application via JumpList or dock menu, respectively.

**JumpList:**

![JumpList Recent Files](https://cloud.githubusercontent.com/assets/2289/23446924/11a27b98-fdfc-11e6-8485-cc3b1e86b80a.png)

**Application dock menu:**

![macOS Dock Menu](https://cloud.githubusercontent.com/assets/639601/5069610/2aa80758-6e97-11e4-8cfb-c1a414a10774.png)

To add a file to recent documents, you can use the [app.addRecentDocument](../api/app.md#appaddrecentdocumentpath-macos-windows) API:

```javascript
const { app } = require('electron')
app.addRecentDocument('/Users/USERNAME/Desktop/work.type')
```

And you can use [app.clearRecentDocuments](../api/app.md#appclearrecentdocuments-macos-windows) API to empty the recent documents list:

```javascript
const { app } = require('electron')
app.clearRecentDocuments()
```

## Windows Notes

In order to be able to use this feature on Windows, your application has to be registered as a handler of the file type of the document, otherwise the file won't appear in JumpList even after you have added it. You can find everything on registering your application in [Application Registration](https://msdn.microsoft.com/en-us/library/cc144104(VS.85).aspx).

When a user clicks a file from the JumpList, a new instance of your application will be started with the path of the file added as a command line argument.

## macOS Notes

When a file is requested from the recent documents menu, the `open-file` event of `app` module will be emitted for it.