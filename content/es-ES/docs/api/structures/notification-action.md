# Objeto NotificationAction

* `type` String - El tipo de acción, puede ser `button`.
* `text` String (opcional) La etiqueta de la acción en cuestión.

## Soporte de Plataforma / Acción

| Tipo de Acción | Plataformas soportadas | Uso de `text`                    | `text` predeterminado                                                                                                       | Limitaciones                                                                                                                                                                                                                                                                                                                |
| -------------- | ---------------------- | -------------------------------- | --------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `button`       | macOS                  | Usado como la etiqueta del botón | "Show" (o un texto localizado por defecto en el sistema, si es el primero de dicho `button`, de lo contrario retorna vacío) | Solo el primer elemento es usado. Si se proporcionan múltiples, aquellos más allá del primero se enumerarán como acciones adicionales (que se muestran cuando el mouse está activo sobre el botón de acción). Cualquier acción de este tipo también es incompatible con `hasReply` y será ignorada si `hasReply` es `true`. |

### Soporte de botón en macOS

Para que los botones de notificación extra funcionen en macOS, tu aplicación debe cumplir con las siguientes condiciones.

* La aplicación está certificada
* La aplicación tiene su propiedad `NSUserNotificationAlertStyle` configurada en `alert` en el `Info.plist`.

Si cualquiera de estos requisitos no se cumplen, los nuevos cambios no se mostrarán.
