# Introduction

Bienvenue sur la documentation d'Electron ! Si c'est la première fois que vous développez une application Electron, lisez cette section Getting Started pour vous familiariser avec les bases. Sinon, n'hésitez pas à explorer nos guides et notre documentation sur l'API !

## Qu'est-ce qu'Electron ?

Electron est un framework pour construire des applications de bureau en utilisant JavaScript, HTML et CSS. En intégrant [Chromium][chromium] et [Node.js][node] dans son binaire, Electron vous permet de maintenir une base de code JavaScript et de créer des applications multi-plateformes qui fonctionnent sous Windows, MacOS et Linux — aucune expérience de développement natif requise.

## Prérequis

Ces docs fonctionnent en supposant que le lecteur est familier avec Node.js et le développement web général. Si vous avez besoin d'être plus à l'aise avec l'un ou l'autre de ces domaines, nous vous recommandons les ressources suivantes :

* [Commencer avec le Web (MDN)][mdn-guide]
* [Introduction à Node.js][node-guide]

De plus, vous comprendrez mieux comment fonctionne Electron si vous vous familiarisé avec le modèle de processus de Chromium. Vous pouvez obtenir un bref aperçu de l'architecture Chrome avec la [bande dessinée Chrome ][comic], qui a été publiée en même temps que le lancement de Chrome en 2008. Bien que cela fait plus d’une décennie depuis, les principes de base introduits dans la bande dessinée restent utiles pour comprendre Electron.

## Exemples d'exécution avec Electron Fiddle

[Electron Fiddle][fiddle] est une application de type bac à sable écrite avec Electron et supportée par les contributeurs d'Electron. Nous recommandons fortement de l'installer comme outil d'apprentissage pour expérimenter avec les API d'Electron ou pour prototyper des fonctionnalités pendant le développement.

Fiddle s'intègre également parfaitement à notre documentation. Lorsque vous parcourrez des exemples dans nos tutoriels, vous verrez fréquemment un bouton "Ouvrir dans Electron Fiddle" sous un bloc de code. Si vous avez Fiddle installé, ce bouton ouvrira un lien `fiddle.electronjs.org` qui chargera automatiquement l'exemple dans Fiddle, pas de copier-coller requis.

## Pour obtenir de l'aide

Êtes-vous coincé quelque part ? Voici quelques liens vers des endroits où chercher :

* Si vous avez besoin d'aide pour développer votre application, notre [serveur communautaire Discord][discord] est un excellent endroit pour obtenir des conseils d'autres développeurs d'applications Electron.
* Si vous soupçonnez que vous rencontrez un bug avec le paquetage `electron` , veuillez consulter le [suivi de tickets GitHub][issue-tracker] pour voir si des problèmes existants correspondent au votre. Si ce n'est pas le cas, n'hésitez pas à remplir notre modèle de rapport de bug et à nous le soumettre.

[chromium]: https://www.chromium.org/
[node]: https://nodejs.org/
[mdn-guide]: https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web
[node-guide]: https://nodejs.dev/learn
[comic]: https://www.google.com/googlebooks/chrome/
[fiddle]: https://electronjs.org/fiddle
[issue-tracker]: https://github.com/electron/electron/issues
[discord]: https://discord.gg/electron
