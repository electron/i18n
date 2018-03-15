# Objeto NotificationAction

* `tipo` String - El tipo de acción, puede ser `botón`.
* `texto` String - (opcional) La etiqueta de la acción en cuestión.

## Soporte de Plataforma / Acción

| Tipo de Acción | Soporte de Plataforma | Uso de `texto`                   | `texto` Predeterminado | Limitaciones                                                                                                                                                         |
| -------------- | --------------------- | -------------------------------- | ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `button`       | macOS                 | Usado como la etiqueta del botón | "Mostrar"              | Maximum of one button, if multiple are provided only the last is used. This action is also incompatible with `hasReply` and will be ignored if `hasReply` is `true`. |

### Soporte de botón en macOS

Para que botones de notificación extra funcionen en macOS, tu aplicación debe cumplir con las siguientes condiciones.

* La aplicación está certificada
* La aplicación tiene su `NSUserNotificationAlertStyle` en `alert` en el `info.plist`.

Si alguno de estos requisitos no se cumple el botón simplemente no aparecerá.