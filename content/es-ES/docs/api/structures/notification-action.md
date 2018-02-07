# Objeto NotificationAction

* `tipo` String - El tipo de acción, puede ser `botón`.
* `texto` String - (opcional) La etiqueta de una acción determinada.

## Apoyo de Plataforma / Acción

| Tipo de Acción | Apoyo de Plataformas | Uso de `texto`                   | `texto` Predetermnado | Limitaciones                                                                                                                                                         |
| -------------- | -------------------- | -------------------------------- | --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `button`       | macOS                | Usado como la etiqueta del botón | "Mostrar"             | Maximum of one button, if multiple are provided only the last is used. This action is also incompatible with `hasReply` and will be ignored if `hasReply` is `true`. |

### Botón de apoyo en macOS

Para que botones extra de notificación funcionen en macOS tu aplicación debe cumplir con los siguientes criterios.

* La aplicación está conectada
* La aplicación tiene su `NSUserNotificationAlertStyle` en `alert` en el `info.plist`.

Si alguno de estos requisitos no es cumplido el botón simplemente no aparecerá.