# Recent Documents (Windows & macOS)

Windows and macOS provide access to a list of recent documents opened by the application via JumpList or dock menu, respectively.

**JumpList:**

![Kagagamit lang na mga file sa JumpList](https://cloud.githubusercontent.com/assets/2289/23446924/11a27b98-fdfc-11e6-8485-cc3b1e86b80a.png)

**Dock Menu ng Aplikasyon:**

![macOS Dock Menu](https://cloud.githubusercontent.com/assets/639601/5069610/2aa80758-6e97-11e4-8cfb-c1a414a10774.png)

Pwede mong gamitin sa pagdagdag ng file sa kagagamit lang na mga dokumento ang [app.addRecentDocument](../api/app.md#appaddrecentdocumentpath-macos-windows) na API:

```javascript
const { app } = require('electron')
app.addRecentDocument('/Users/USERNAME/Desktop/work.type')
```

At pwede mong gamitin ang [app.clearRecentDocuments](../api/app.md#appclearrecentdocuments-macos-windows) API upang linisin ang listahan ng kagagamit lang na mga dokumento:

```javascript
const { app } = require('electron')
app.clearRecentDocuments()
```

## Mga Tala ng Windows

Upang magamit ang katangiang ito sa Windows, kailangang ang aplikasyon mo ay nakarehistro bilang tagahawak ng uri ng file ng dokumento, kung hindi ang file ay hindi makikita sa JumpList kahit na nadagdag mo na ito. Makikita mo lahat tungkol sa pagrehistro ng iyong aplikasyon sa [Application Registration](https://msdn.microsoft.com/en-us/library/cc144104(VS.85).aspx).

Kung ini-click ng isang tagagamit ang isang file mula sa JumpList, ang isang instance ng iyang aplikasyon ay masisimulan gamit ang isang path ng file na idinadagdag bilang argumento ng command line.

## Mga Tala ng macOS

Kung ang isang file ay hinihingi mula sa menu ng kagagamit lamang na mga dokumento, ang `open-file` na pangyayari ng module ng `app` ay mailalabas para dito.