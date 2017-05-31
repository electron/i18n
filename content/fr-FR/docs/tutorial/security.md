# Sécurité, fonctionnalités natives et votre responsabilité

En tant que développeurs web, nous aimons habituellement la sécurité forte nette du navigateur - les risques associés au code que nous écrivons sont relativement faibles. Nos sites Web est accordées limited alimente dans un bac à sable, et nous espérons que nos utilisateurs profiter d’un navigateur intégré par une grande équipe d’ingénieurs qui est capable de répondre rapidement aux menaces de sécurité récemment découvertes.

Lorsque vous travaillez avec des électrons, il est important de comprendre que l’électron n’est pas un navigateur web. Il vous permet de construire des applications de bureau riche en fonctionnalités avec les technologies web familières, mais votre code exerce un pouvoir beaucoup plus grand. JavaScript peut accéder le système de fichiers, shell utilisateur et bien plus. Cela vous permet de construire des applications natives de haute qualité, mais les risques de sécurité inhérents à l’échelle des pouvoirs supplémentaires accordées à votre code.

Dans cet esprit, sachez qu’affichant un contenu arbitraire de poses de sources non fiables un grave risque pour la sécurité que l’électron n’est pas destiné à gérer. En fait, les applications les plus populaires électron (atome, Slack, Code de Visual Studio, etc.) affichent principalement contenu local (ou un contenu distant fiable et sécurisé sans intégration de nœud) – si votre application exécute le code provenant d’une source en ligne, il est de votre responsabilité de vous assurer que le code n’est pas malveillant.

## Signalement des problèmes de sécurité

Pour plus d’informations sur la façon de communiquer correctement une vulnérabilité de type électronique, voir [SECURITY.md](https://github.com/electron/electron/tree/master/SECURITY.md)

## Mises à niveau et les questions de sécurité chrome

Alors que les électrons s’efforce de soutenir les nouvelles versions de chrome dès que possible, les développeurs doivent être conscients que la mise à niveau est une entreprise sérieuse - impliquant la modification manuelle des dizaines ou même des centaines de fichiers. Étant donné les ressources et les contributions disponibles aujourd'hui, électron ne sera souvent pas sur la toute dernière version de chrome, à la traîne en jours ou semaines.

Nous pensons que notre système actuel de mise à jour le composant de chrome établit un juste équilibre entre les ressources dont nous disposons et les besoins de la majorité des applications construites sur le dessus du cadre. Nous sommes certainement intéressés à entendre davantage sur des cas d’utilisation spécifiques du peuple que construire des choses au sommet de l’électron. Demandes de traction et contributions soutenant cet effort sont toujours bienvenues.

## Ignorant les conseils

Il existe un problème de sécurité chaque fois que vous recevez le code d’une destination distante et l’exécutez localement. Par exemple, imaginez un site distant affiché dans une fenêtre du navigateur. Si un pirate réussit à modifier lesdits contenus (que ce soit en s’attaquant à la source directement, ou en étant assis entre votre application et la destination réelle), ils seront en mesure d’exécuter du code natif sur l’ordinateur de l’utilisateur.

> :warning: en aucune circonstance devriez-vous charger et exécuter le code à distance grâce à l’intégration de nœud activée. Utilisez plutôt les fichiers uniquement locales (empaquetés avec votre demande) pour exécuter le code de nœud. Pour afficher un contenu distant, utilisez la balise `webview` et assurez-vous de désactiver le `nodeIntegration`.

#### Liste de vérification

Ce n’est pas bulletproof, mais à tout le moins, vous devriez essayer ce qui suit :

* Afficher uniquement le contenu sécurisé (https)
* Désactiver l’intégration de nœud dans tous les convertisseurs qui affichent du contenu distant (en affectant `nodeIntegration` `false` en `webPreferences`)
* Activer l’isolement de contexte dans tous les convertisseurs qui affichent du contenu distant (en affectant `contextIsolation` `true` en `webPreferences`)
* Utilisation `ses.setPermissionRequestHandler ()` dans toutes les sessions qui se chargent de contenu distant
* Ne désactivez pas le `webSecurity`. Désactivez-le désactivera la politique de la même origine.
* Définir une sécurité-[`Content-Policy`](http://www.html5rocks.com/en/tutorials/security/content-security-policy/) et appliquer les règles restrictives (par exemple `script-src « moi » `)
* `eval`</a> Override et de désactivation, qui autorise les chaînes à exécuter dans le code.</li> 
    
    * Ne définissez pas de `allowRunningInsecureContent` à true.
    * N’activez pas de `experimentalFeatures` ou `experimentalCanvasFeatures` sauf si vous savez ce que vous faites.
    * N’utilisez pas de `blinkFeatures` sauf si vous savez ce que vous faites.
    * WebViews : N’ajoutez pas l’attribut `nodeintegration`.
    * WebViews : Ne pas utiliser `disablewebsecurity`
    * WebViews : Ne pas utiliser `allowpopups`
    * WebViews : Ne pas utiliser `insertCSS` ou `executeJavaScript` avec télécommande CSS/JS.</ul> 
    
    Encore une fois, cette liste a simplement réduit le risque, il ne le supprime pas. Si votre but est d’afficher un site Web, un navigateur sera une option plus sûre.