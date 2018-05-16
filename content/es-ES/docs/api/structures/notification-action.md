# Objeto NotificationAction

* `tipo` String - El tipo de acción, puede ser `botón`.
* `text` String (optional) - The label for the given action.

## Soporte de Plataforma / Acción

| Tipo de Acción | Soporte de Plataforma | Uso de `texto`                   | `texto` Predeterminado                                                                      | Limitaciones                                                                                                                                                                                                                                                              |
| -------------- | --------------------- | -------------------------------- | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `button`       | macOS                 | Usado como la etiqueta del botón | "Show" (or a localized string by system default if first of such `button`, otherwise empty) | Only the first one is used. If multiple are provided, those beyond the first will be listed as additional actions (displayed when mouse active over the action button). Any such action also is incompatible with `hasReply` and will be ignored if `hasReply` is `true`. |

### Soporte de botón en macOS

Para que botones de notificación extra funcionen en macOS, tu aplicación debe cumplir con las siguientes condiciones.

* La aplicación está certificada
* App has it's `NSUserNotificationAlertStyle` set to `alert` in the `Info.plist`.

Si alguno de estos requisitos no se cumple el botón simplemente no aparecerá.