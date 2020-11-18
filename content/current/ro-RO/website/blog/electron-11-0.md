---
title: Electron 11.0.0
author:
  - VerteDinde
date: '2020-11-17'
---

Electron 11.0.0 has been released! It includes upgrades to Chromium `87`, V8 `8.7`, and Node.js `12.18.3`. We've added support for Apple silicon, and general improvements. Citește mai jos pentru mai multe detalii!

---

The Electron team is excited to announce the release of Electron 11.0.0! Îl puteți instala cu npm prin intermediul `npm instalați electron@latest` sau descărcat-o de pe [eliberează site-ul nostru](https://electronjs.org/releases/stable). The release is packed with upgrades, fixes, and new support for Apple's M1 hardware.

Abia așteptăm să vedem ce construiești cu ei! Continuă să citești pentru detalii despre această lansare și împărtășește-ți feedback-ul pe care îl ai!

## Modificări notabile

### Schimbări stivă

* Chromium `87.0.4280.47`
    * [New in Chrome 86](https://developers.google.com/web/updates/2020/10/nic86)
    * [New in Chrome 87](https://developers.google.com/web/updates/2020/11/nic87)
* Node.js `12.18.3`
    * [Node 12.18.3 blog post](https://nodejs.org/en/blog/release/v12.18.3/)
    * [Node 12.7.0 blog post](https://nodejs.org/en/blog/release/v12.17.0/)
* V8 `8.7`
    * [V8 8.6 blog post](https://v8.dev/blog/v8-release-86)
    * [V8 8.7 blog post](https://v8.dev/blog/v8-release-87)

### Evidențiere caracteristici

* Support for Apple M1: On November 10, Apple announced their [new M1 chips, which will be included in their upcoming hardware](https://www.apple.com/newsroom/2020/11/apple-unleashes-m1/). Beginning in Electron 11, Electron will be shipping separate versions of Electron for Intel Macs (x64) and Apple's upcoming M1 hardware (arm64). You can learn more about how to get your Electron app [running on Apple's M1 hardware here.](https://www.electronjs.org/blog/apple-silicon) [#24545](https://github.com/electron/electron/pull/24545)
* Added V8 crash message and location information to crashReport parameters. [#24771](https://github.com/electron/electron/pull/24771)
* Improved the performance of sending wide objects over the context bridge. [#24671](https://github.com/electron/electron/pull/24671)

See the [11.0.0 release notes](https://github.com/electron/electron/releases/tag/v11.0.0) for a full list of new features and changes.

## Ruperea modificărilor

* Removed experimental APIs: `BrowserView.{fromId, fromWebContents, getAllViews}` and the `id` property of `BrowserView`. [#23578](https://github.com/electron/electron/pull/23578)

Mai multe informații despre acestea și schimbările viitoare pot fi găsite pe pagina [Schimbări de rupere planificate](https://github.com/electron/electron/blob/master/docs/breaking-changes.md).

## Modificări API

* Added `app.getApplicationInfoForProtocol()` API that returns detailed information about the app that handles a certain protocol. [#24112](https://github.com/electron/electron/pull/24112)
* Added `app.createThumbnailFromPath()` API that returns a preview image of a file given its file path and a maximum thumbnail size. [#24802](https://github.com/electron/electron/pull/24802)
* Added `webContents.forcefullyCrashRenderer()` to forcefully terminate a renderer process to assist with recovering a hung renderer. [#25756](https://github.com/electron/electron/pull/25756)

## End of Support for 8.x.y

Electron 8.x.y has reached end-of-support as per the project's [support policy](https://electronjs.org/docs/tutorial/support#supported-versions). Dezvoltatorii și aplicațiile sunt încurajate să actualizeze la o versiune mai nouă a Electron.

## Ce urmează

Pe termen scurt, vă puteţi aştepta ca echipa să continue să se concentreze pe a ţine pasul cu dezvoltarea componentelor majore care formează Electron, inclusiv crom, nod și V8. Although we are careful not to make promises about release dates, our plan is to release new major versions of Electron with new versions of those components approximately quarterly. The [tentative 12.0.0 schedule](https://electronjs.org/docs/tutorial/electron-timelines) maps out key dates in the Electron 12.0 development life cycle. De asemenea, [consultaţi documentul nostru de versionare](https://electronjs.org/docs/tutorial/electron-versioning) pentru informaţii mai detaliate despre versionare în Electron.

Pentru informații despre schimbările planificate de rupere în versiunile viitoare de Electron, [a se vedea documentul nostru Planificat Breaking Change](https://github.com/electron/electron/blob/master/docs/breaking-changes.md).

### Continued Work for Deprecation of `remote` Module
We started work to remove the `remote` module in [Electron 9](https://www.electronjs.org/blog/electron-9-0). We plan to remove the `remote` module itself in Electron 14.

Read and follow [this issue](https://github.com/electron/electron/issues/21408) for full plans and details for deprecation.

### Final Step for Requiring Native Node Modules to be Context Aware or N-API (in Electron 12)
From Electron 6 onwards, we've been laying the groundwork to require [native Node modules](https://nodejs.org/api/addons.html) loaded in the renderer process to be either [N-API](https://nodejs.org/api/n-api.html) or [Context Aware](https://nodejs.org/api/addons.html#addons_context_aware_addons). Enforcing this change allows for stronger security, faster performance, and reduced maintenance workload. The final step of this plan is to remove the ability to disable render process reuse in Electron 12.

Read and follow [this issue](https://github.com/electron/electron/issues/18397) for full details, including the proposed timeline.
