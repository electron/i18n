# Objeto NotificationAction

* `tipo` String - El tipo de acción, puede ser `botón`.
* `texto` String - (opcional) La etiqueta de una acción determinada.

## Apoyo de Plataforma / Acción

| Tipo de Acción | Apoyo de Plataformas | Uso de `texto`                   | `texto` Predetermnado | Limitaciones                                                                                                                                                |
| -------------- | -------------------- | -------------------------------- | --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `botón`        | macOS                | Usado como la etiqueta del botón | "Mostrar"             | Máximo de un botón, si se ofrecen varios sólo se usa el último. Esta acción también es incomptible con `hasReply` y se va a omitir si `hasReply` es `true`. |

### Botón de apoyo en macOS

Para que botones extra de notificación funcionen en macOS tu aplicación debe cumplir con los siguientes criterios.

* La aplicación está conectada
* La aplicación tiene su `NSUserNotificationAlertStyle` en `alert` en el `info.plist`.

Si alguno de estos requisitos no es cumplido el botón simplemente no aparecerá.