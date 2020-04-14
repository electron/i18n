# Objet ThumbarButton

* `icon` [NativeImage](../native-image.md) - L'icône s'affichant dans la miniature dans la barre d'outils.
* `click` Function
* `tooltip` String (facultatif) - Le texte dans l'info-bulle du bouton.
* `flags` String[] (facultatif) - Contrôle les états et comportements spécifiques du bouton. `['enabled']` par défaut.

Le `flags` est un tableau pouvant inclure ces `String`s suivant :

* `enabled` - Le bouton est actif et disponible à l'utilisateur.
* `disabled` - Le bouton est désactivé. Il est présent, mais il a un état visual indiquant qu'il ne répondra pas à l'action de l'utilisateur.
* `dismissonclick` - Lorsque le bouton est cliqué, la fenêtre de miniature se ferme immédiatement.
* `nobackground` - Utilise uniquement l'image et ne dessine pas de bordure sur le bouton.
* `hidden` - Le bouton n'est pas affiché à l'utilisateur.
* `noninteractive` - Le bouton est activé mais pas interactif ; L'état du bouton pressé ne sera pas dessiné. Cette valeur est prévue pour le cas où le bouton est utilisé dans une notification.