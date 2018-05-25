# Objet NotificationAction

* `type` String - Le type d'action, peut être `button`.
* `text` String - (facultatif) Le libellé pour l'action donnée.

## Support Plateforme / Action

| Type d'action | Support Plateforme | Usage du `text`               | `text` par défaut                                                                                              | Limitations                                                                                                                                                                                                                                                                                 |
| ------------- | ------------------ | ----------------------------- | -------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `button`      | macOS              | Utilisé comme label du bouton | "Show" (ou une chaîne de caractère traduite dans la langue par défaut du système pour le `bouton`, sinon vide) | Seul le premier est utilisé. Si plusieurs sont fournis, ceux qui sont situés après seront listés comme des actions supplémentaires (affichées quand la souris passe au dessus du bouton). Any such action also is incompatible with `hasReply` and will be ignored if `hasReply` is `true`. |

### Support des boutons sur macOS

Afin que les boutons dans les notifications fonctionnent sur macOS, votre application doit répondre aux critères suivants :

* L'application est signée
* L'application a `NSUserNotificationAlertStyle` défini à `alert` dans le `info.plist`.

Si l'une de ces exigences n'est pas remplie, alors le bouton n'apparaîtra pas tout simplement.