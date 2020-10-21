---
title: Mise à jour automatique plus facile pour les applications Open-Source
author: zeke
date: '2018-05-01'
---

Aujourd'hui, nous libérons une source libre et ouverte, hébergé [met à jour le webservice](https://github.com/electron/update.electronjs.org) et le compagnon [paquet npm](https://github.com/electron/update-electron-app) pour permettre des mises à jour automatiques faciles pour les applications Electron open-source. Il s'agit d'une étape vers l'habilitation des développeurs d'applications à penser moins au déploiement de et plus encore au développement d'expériences de haute qualité pour leurs utilisateurs.

---

<figure>
  <a href="https://github.com/electron/update-electron-app" style="display: block; text-align: center;">
    <img class="screenshot" src="https://user-images.githubusercontent.com/2289/39480716-e9990910-4d1d-11e8-8901-9549c6ff6050.png" alt="Capture d'écran de mise à jour">
    <figcaption>Le nouveau module de mise à jour en action</figcaption>
  </a>
</figure>

## Faciliter la vie

Electron a une API [autoUpdater](https://electronjs.org/docs/tutorial/updates) qui donne aux applications la possibilité de consommer des métadonnées depuis un point de terminaison distant pour vérifier les mises à jour, téléchargez-les en arrière-plan et installez-les automatiquement.

L'activation de ces mises à jour a été une étape lourde dans le processus de déploiement pour de nombreux développeurs d'applications Electron car il a besoin d'un serveur web pour être déployé et maintenu juste pour servir les métadonnées de l'historique des versions de l'application.

Aujourd'hui, nous annonçons une nouvelle solution de mise à jour automatique des applications. Si votre application Electron est dans un dépôt GitHub public et que vous utilisez GitHub Releases pour publier des builds, vous pouvez utiliser ce service pour fournir mises à jour en continu des applications à vos utilisateurs.

## Utiliser le nouveau module

Pour minimiser la configuration de votre part, nous avons créé [update-electron-app](https://github.com/electron/update-electron-app), un module npm qui s'intègre au nouveau webservice [update.electronjs.org](https://github.com/electron/update.electronjs.org).

Installer le module:

```sh
npm install update-electron-app
```

Appelez-le de n'importe où dans le processus [principal de votre application](https://electronjs.org/docs/glossary#main-process):

```js
require('update-electron-app')()
```

Voilà! Le module vérifiera les mises à jour au démarrage de l'application, puis toutes les dix minutes. Lorsqu'une mise à jour est trouvée, elle se téléchargera automatiquement en arrière-plan, et une boîte de dialogue s'affichera lorsque la mise à jour sera prête.

## Migration des applications existantes

Les applications qui utilisent déjà l'API autoUpdater d'Electron peuvent également utiliser ce service. Pour ce faire, vous pouvez [personnaliser le `update-electron-app`](https://github.com/electron/update-electron-app) module ou [intégrer directement avec update.electronjs.org](https://github.com/electron/update.electronjs.org).

## Alternatives

Si vous utilisez [electron-builder](https://github.com/electron-userland/electron-builder) pour empaqueter votre application, vous pouvez utiliser sa mise à jour intégrée. Pour plus de détails, voir [electron.build/auto-update](https://www.electron.build/auto-update).

Si votre application est privée, vous devrez peut-être exécuter votre propre serveur de mise à jour. Il y a un certain nombre d'outils open-source pour cela, y compris Zeit [Hazel](https://github.com/zeit/hazel) et le [noyau](https://github.com/atlassian/nucleus) d'Atlassian. Consultez le tutoriel [Déployer un serveur de mise à jour](https://electronjs.org/docs/tutorial/updates#deploying-an-update-server) pour plus d'informations .

## Remerciements

Merci à [Julian Gruber](http://juliangruber.com/) pour avoir aidé à concevoir et à construire ce service web simple et évolutif. Merci aux gens de [Zeit](https://zeit.co) pour leur service open-source [Hazel](https://github.com/zeit/hazel) dont nous avons dessiné l'inspiration de la conception. Merci à [Samuel Attard](https://www.samuelattard.com/) pour les commentaires de code. Merci à la communauté Electron d'avoir aidé à tester ce service .

🌲 Voici un avenir toujours vert pour les applications Electron !