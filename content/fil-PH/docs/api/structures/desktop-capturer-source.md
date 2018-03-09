# DesktopCapturerSource Object

* `id`String - Ang kumikilala sa window o screen na maaaring gamitin bilang isang `chromeMediaSourceId` na tumigil kapag tinatawagan [`navigator.webkitGetUserMedia`]. Ang format ng kumikilala ay ganito `window:XX` o `screen:XX`, na ang `XX` ay bilang na hindi tiyak ang paglabas.
* `name` String - Ang pinagmumulan ng screen ay pinapangalanan na alinman sa `Entire Screen` o `Screen<index>`, samantalang ang pangalan ng pinagmumulan ng window ay tumutugma sa titulo ng window.
* `thumbnail`[NativeImage](../native-image.md) - imahe ng isang thumbnail. **Note** Walang gumagarantiya na ang sukat ng thumbnail ay katulad din ng `thumbnailSize` tinukoy sa `options` ipinasa sa `desktopCapturer.getSources`. Ang aktuwal na sukat ay nakasalalay sa scale ng screen o window.