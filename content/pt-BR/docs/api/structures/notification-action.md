# Objeto NotificationAction

* `type` String - o tipo de ação, pode ser `button`.
* `text` String - (opcional) O label para esta ação.

## Plataforma / Suporte para Action

| Action Type | Plataforma com suporte | Utilização do `text`              | `text` padrão | Limitações                                                                                                                                                           |
| ----------- | ---------------------- | --------------------------------- | ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `button`    | macOS                  | Utilizado como label para o botão | "Show"        | Máximo de um botão, se múltiplos são fornecidos, apenas o último é utilizado. Essa ação também é incompatível com `hasReply` e será ignorada se `hasReply` é `true`. |

### Suporte para o botão no macOS

Para que os botões extra de notificações funcionem no macOS, sua aplicação deverá atender aos seguintes critérios:

* Aplicação é assinada
* Aplicação tem seu `NSUserNotificationAlertStyle` definido como `alert` no arquivo `info.plist`.

Se qualquer destes requisitos não forem atendidos, o botão não irá aparecer.