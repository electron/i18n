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

> :warning: Under no circumstances should you load and execute remote code with Node integration enabled. Instead, use only local files (packaged together with your application) to execute Node code. To display remote content, use the `webview` tag and make sure to disable the `nodeIntegration`.

#### Checklist

This is not bulletproof, but at the least, you should attempt the following:

* Only display secure (https) content
* Disable the Node integration in all renderers that display remote content (setting `nodeIntegration` to `false` in `webPreferences`)
* Enable context isolation in all renderers that display remote content (setting `contextIsolation` to `true` in `webPreferences`)
* Use `ses.setPermissionRequestHandler()` in all sessions that load remote content
* Do not disable `webSecurity`. Disabling it will disable the same-origin policy.
* Define a [`Content-Security-Policy`](http://www.html5rocks.com/en/tutorials/security/content-security-policy/) , and use restrictive rules (i.e. `script-src 'self'`)
* [Override and disable `eval`](https://github.com/nylas/N1/blob/0abc5d5defcdb057120d726b271933425b75b415/static/index.js#L6-L8) , which allows strings to be executed as code.
* Do not set `allowRunningInsecureContent` to true.
* Do not enable `experimentalFeatures` or `experimentalCanvasFeatures` unless you know what you're doing.
* Do not use `blinkFeatures` unless you know what you're doing.
* WebViews: Do not add the `nodeintegration` attribute.
* WebViews: Do not use `disablewebsecurity`
* WebViews: Do not use `allowpopups`
* WebViews: Do not use `insertCSS` or `executeJavaScript` with remote CSS/JS.

Again, this list merely minimizes the risk, it does not remove it. If your goal is to display a website, a browser will be a more secure option.