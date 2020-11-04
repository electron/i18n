---
title: Hulpmiddelen voor toegankelijkheid
author: jlord
date: '2016-08-23'
---

Toegankelijke applicaties maken is belangrijk en we willen graag nieuwe functionaliteit introduceren in [Devtron](https://electronjs.org/devtron) en [Spectron](https://electronjs.org/spectron) die ontwikkelaars de kans geeft om hun apps voor iedereen beter te maken.

---

Toegankelijkheidsproblemen in Electron applicaties zijn vergelijkbaar met die van websites omdat ze beide uiteindelijk HTML zijn. Met Electron apps kunt u de online bronnen voor toegankelijkheidsaudits echter niet gebruiken, omdat uw app geen URL heeft om naar de auditor te verwijzen.

Deze nieuwe functies brengen die auditing-tools naar je Electron app. U kunt ervoor kiezen om audits toe te voegen aan uw tests met Spectron of ze te gebruiken binnen DevTools met Devtron. Lees verder voor een overzicht van de tools of bekijk onze [toegankelijkheidsdocumentatie](https://electronjs.org/docs/tutorial/accessibility/) voor meer informatie.

### Spectron

In het testframework Spectron kunt u nu elk venster controleren en `<webview>` tag in uw applicatie. Bijvoorbeeld:

```javascript
app.client.auditAccessibility().then(function (audit) {
  if (audit.failed) {
    console.error(audit.message)
  }
})
```

U kunt meer over deze functie lezen in [Spectron's documentatie](https://github.com/electron/spectron#accessibility-testing).

### Devtron

In Devtron is er een nieuw toegankelijkheidstabblad waarmee u een pagina in uw app kunt controleren, de resultaten kunt sorteren en filteren.

![devtron-schermafdruk](https://cloud.githubusercontent.com/assets/1305617/17156618/9f9bcd72-533f-11e6-880d-389115f40a2a.png)

Beide tools gebruiken de [Accessibility Developer Tools](https://github.com/GoogleChrome/accessibility-developer-tools) </a> bibliotheek gemaakt door Google voor Chrome. U kunt meer informatie krijgen over toegankelijkheidsaudit regels die deze bibliotheek gebruikt op die [repository's wiki](https://github.com/GoogleChrome/accessibility-developer-tools/wiki/Audit-Rules).

Als u andere geweldige toegankelijkheidstools voor Electron kent, voeg deze toe aan de [toegankelijkheidsdocumentatie](https://electronjs.org/docs/tutorial/accessibility/) met een pull-request.

