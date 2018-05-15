# Objeto NotificationAction

* `type` String - o tipo de ação, pode ser `button`.
* `text` String (optional) - The label for the given action.

## Plataforma / Suporte para Action

| Action Type | Plataforma com suporte | Utilização do `text`              | `text` padrão                                                                               | Limitações                                                                                                                                                                                                                                                                |
| ----------- | ---------------------- | --------------------------------- | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `button`    | macOS                  | Utilizado como label para o botão | "Show" (or a localized string by system default if first of such `button`, otherwise empty) | Only the first one is used. If multiple are provided, those beyond the first will be listed as additional actions (displayed when mouse active over the action button). Any such action also is incompatible with `hasReply` and will be ignored if `hasReply` is `true`. |

### Suporte para o botão no macOS

Para que os botões extra de notificações funcionem no macOS, sua aplicação deverá atender aos seguintes critérios:

* Aplicação é assinada
* App has it's `NSUserNotificationAlertStyle` set to `alert` in the `Info.plist`.

Se qualquer destes requisitos não forem atendidos, o botão não irá aparecer.