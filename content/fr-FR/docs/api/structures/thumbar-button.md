# Objet ThumbarButton

* `icon` [NativeImage](../native-image.md) - L'icône s'affichant dans la miniature dans la barre d'outils.
* `click` Function
* `tooltip` String (facultatif) - Le texte dans l'info-bulle du bouton.
* `flags` String[] (facultatif) - Contrôle les états et comportements spécifiques du bouton. `['enabled']` par défaut.

Le `flags` est un tableau pouvant inclure ces `String`s suivant :

* `enabled` - Le bouton est actif et disponible à l'utilisateur.
* `disabled` - Le bouton est désactivé. Il est présent, mais il a un état visual indiquant qu'il ne répondra pas à l'action de l'utilisateur.
* `dismissonclick` - When the button is clicked, the thumbnail window closes immediately.
* `nobackground` - Do not draw a button border, use only the image.
* `hidden` - The button is not shown to the user.
* `noninteractive` - The button is enabled but not interactive; no pressed button state is drawn. This value is intended for instances where the button is used in a notification.