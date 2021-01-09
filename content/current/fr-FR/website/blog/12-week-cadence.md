---
title: Nouvelle Cadence de Sortie Electron
author: sofianguy
date: '2019-05-13'
---

🎉 Electron se déplace pour sortir une nouvelle version stable majeure toutes les 12 semaines ! 🎉

---

## ⚡ Wow c'est rapide ! Mais pourquoi?

En bref, Chromium n'arrête pas d'expédition, donc Electron ne va pas non plus ralentir.

Sorties de Chromium sur un calendrier cohérent de 6 semaines [](https://www.chromium.org/developers/calendar). Pour fournir les versions les plus récentes de Chromium dans Electron, notre horaire doit suivre les leurs. Plus d'informations sur le cycle de publication de Chromium peuvent être trouvées [ici](https://chromium.googlesource.com/chromium/src/+/master/docs/process/release_cycle.md).

## 🚀 Pourquoi toutes les 12 semaines?

Toutes les 6 semaines, une nouvelle version de Chromium propose de nouvelles fonctionnalités, des corrections de bugs et des corrections de sécurité et des améliorations V8. Les utilisateurs d'Electron's ont été très clairs et ont souhaité que ces changements soient effectués dans les plus brefs délais. donc nous avons ajusté nos dates de publication stable pour correspondre à toutes les autres versions de Chromium stable. En premier lieu, Electron v6.0. inclura M76 et est programmé pour une version stable le [Juillet 30, 2019](https://electronjs.org/docs/tutorial/electron-timelines#600-release-schedule), le même jour de sortie que [Chromium M76](https://www.chromestatus.com/features/schedule).

## 🚧 Qu'est-ce que cela signifie pour moi et mon application Electron ?

Vous aurez accès à de nouvelles fonctionnalités et corrections Chromium et V8 plus tôt qu'avant. Il est important de noter que vous saurez également _quand_ ces nouveaux changements viendront, vous serez ainsi en mesure de planifier avec de meilleures informations qu'avant.

L'équipe d'Electron [continuera à supporter](https://electronjs.org/docs/tutorial/support#supported-versions) les trois dernières versions majeures. Par exemple, lorsque [v6.0.0 sera stable le 30 juillet 2019](https://electronjs.org/docs/tutorial/electron-timelines#600-release-schedule), nous prendrons en charge v6.x, v5.x et v4.x, tandis que v3.x atteindra End-Of-Life.

## 💬 Programme de feedback

S'il vous plaît envisager de rejoindre notre [programme de retour d'application](https://electronjs.org/blog/app-feedback-program) pour nous aider à tester nos versions bêta et la stabilisation. Les projets qui participent à ce programme testent les bétas d'Electron sur leurs applications ; et en retour, les nouveaux bogues qu'ils trouvent sont priorisés pour la version stable.

## 📝 Un bref historique des versions d'Electron

Les décisions concernant les versions stables antérieures à la version 3.0.0 ne suivaient pas de calendrier. Nous avons ajouté des calendriers internes au projet avec v3.0.0 et v4.0.0. Plus tôt cette année, nous avons décidé de publier notre date de publication stable pour la première fois pour [Electron v5.0.0](https://electronjs.org/blog/electron-5-0-timeline). L'annonce de nos dates de publication stable a été reçue globalement et nous sommes heureux de continuer à le faire pour les prochaines versions.

Afin de mieux rationaliser ces efforts liés à la mise à niveau, nos groupes de travail [Améliorations](https://github.com/electron/governance/tree/master/wg-upgrades) et [Versions](https://github.com/electron/governance/tree/master/wg-releases) ont été créés au sein de notre système [Gouvernance](https://electronjs.org/blog/governance). Ils nous ont permis de mieux prioriser et de déléguer ce travail qui, nous l'espérons, deviendra plus visible à chaque publication ultérieure.

Voici où notre nouvelle cadence nous mettra en comparaison avec la cadence de Chromium:
<img alt="graphique de ligne comparant les versions d'Electron avec Chromium" src="https://user-images.githubusercontent.com/2138661/57543187-86340700-7308-11e9-9745-a9371bb29275.png" />

📨 Si vous avez des questions, veuillez nous écrire à [info@electronjs.org](mailto:info@electronjs.org).
