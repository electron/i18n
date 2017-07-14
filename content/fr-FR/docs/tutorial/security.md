# Sécurité, fonctionnalités natives et votre responsabilité

En tant que développeurs web, nous aimons habituellement la sécurité du navigateur - les risques associés au code que nous écrivons sont relativement faibles. Nos sites Web bénéficient de pouvoirs limités dans un navigateur, et nous espérons que nos utilisateurs profitent d’un navigateur developpé par une grande équipe d’ingénieurs qui est capable de répondre rapidement aux menaces de sécurité récemment découvertes.

Lorsque vous travaillez avec Electron, il est important de comprendre que l’Electron n’est pas un navigateur web. Il vous permet de developper des applications de bureau riche en fonctionnalités avec des technologies web familières, mais votre code exerce un pouvoir beaucoup plus grand. JavaScript peut accéder au système de fichiers, au shell et bien plus. Cela vous permet de développer des applications natives de haute qualité, mais les risques de sécurité inhérents sont à l’échelle des pouvoirs supplémentaires accordées à votre code.

Dans cet esprit, sachez qu’afficher un contenu arbitraire de sources peu fiables est un grave risque pour la sécurité qu'Electron n’est pas destiné à gérer. En fait, les applications les plus populaires Electron (Atom, Slack, Visual Studio Code, etc.) affichent principalement du contenu local (ou un contenu distant fiable et sécurisé sans intégration de Node) – si votre application exécute le code provenant d’une source en ligne, il est de votre responsabilité de vous assurer que le code n’est pas malveillant.

## Signalement des problèmes de sécurité

Pour plus d’informations sur la façon de communiquer correctement une vulnérabilité d'Electron, voir [SECURITY.md](https://github.com/electron/electron/tree/master/SECURITY.md)

## Problèmes de sécurité et mises à jour de Chromium

Alors qu'Electron s’efforce de soutenir les nouvelles versions de Chromium dès que possible, les développeurs doivent être conscients que la mise à niveau est une entreprise sérieuse - impliquant la modification manuelle des dizaines ou même des centaines de fichiers. Étant donné les ressources et les contributions disponibles aujourd'hui, Electron ne sera souvent pas sur la toute dernière version de Chromium, à la traîne de quelques jours ou semaines.

Nous estimons que notre système actuel de mise à jour de Chromium présente un équilibre approprié entre les ressources disponibles et les besoins de la majorité des applications développées sur le framework. Nous sommes intéressés à en savoir plus sur les cas d'utilisation spécifiques des personnes qui développent avec Electron. Les Pull requests et les contributions qui appuient ces efforts sont toujours les bienvenues.

## Ignorer les conseils ci-dessus

Il existe un problème de sécurité chaque fois que vous recevez le code d’une destination distante et l’exécutez localement. Par exemple, imaginez un site distant affiché dans une fenêtre du navigateur. Si un pirate réussit à modifier lesdits contenus (que ce soit en s’attaquant à la source directement, ou en étant entre votre application et la destination réelle), ils seront en mesure d’exécuter du code natif sur l’ordinateur de l’utilisateur.

> :warning: en aucune circonstance vous devriez charger et exécuter du code distant avec l'intégration de Node activé. Utilisez plutôt les fichiers locaux (empaquetés avec votre demande) pour exécuter le code de Node. Pour afficher du contenu distant, utilisez la balise `webview` et assurez-vous de désactiver le `nodeIntegration`.

#### Liste de contrôle

Ce n’est pas bulletproof, mais au moins, vous devriez essayer ce qui suit :

* Afficher uniquement le contenu sécurisé (https)
* Désactiver l’intégration de Node dans tous les convertisseurs qui affichent du contenu distant (paramètre `nodeIntegration` `faux` dans `webPreferences`)
* Activer l’isolement de contexte dans tous les convertisseurs qui affichent du contenu distant (paramètre `contextIsolation` sur `true` dans `webPreferences`)
* Utiliser `ses.setPermissionRequestHandler()` dans toutes les sessions qui se chargent de contenu distant
* Ne désactivez pas `webSecurity`. Le désactiver désactivera la politique de la même origine.
* Définir une [`Content-Security-Policy`](http://www.html5rocks.com/en/tutorials/security/content-security-policy/) et appliquer les règles restrictives (c.-à-d. `script-src 'self'`)
* [Annuler et désactiver `eval`](https://github.com/nylas/N1/blob/0abc5d5defcdb057120d726b271933425b75b415/static/index.js#L6-L8), qui permet aux strings d'exécuter du code.
* Ne définissez pas `allowRunningInsecureContent` à true.
* N’activez pas de `experimentalFeatures` ou `experimentalCanvasFeatures` sauf si vous savez ce que vous faites.
* N’utilisez pas `blinkFeatures` sauf si vous savez ce que vous faites.
* WebViews : N’ajoutez pas l’attribut `nodeintegration`.
* WebViews : Ne pas utiliser `disablewebsecurity`
* WebViews : Ne pas utiliser `allowpopups`
* WebViews : Ne pas utiliser `insertCSS` ou `executeJavaScript` avec CSS/JS distant.

Encore une fois, cette liste permet simplement de réduire le risque, elle ne le supprime pas. Si votre but est d’afficher un site Web, un navigateur sera une option plus sûre.