# Objeto NotificationAction

* `type` String - o tipo de ação, pode ser `button`.
* `text` String (opcional) - O label para esta ação.

## Plataforma / Suporte para Action

| Action Type | Plataforma com suporte | Utilização do `text`              | `text` padrão                                                                                                   | Limitações                                                                                                                                                                                                                                                                                     |
| ----------- | ---------------------- | --------------------------------- | --------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `button`    | macOS                  | Utilizado como label para o botão | "Show" (ou uma string com a internacionalização padrão do sistema se o primeiro `button`, caso contrário vazio) | Apenas o primeiro é utilizado. Caso múltiplos sejam informados, aqueles além do primeiro serão listados como ações adicionais (mostradas quando o mouse passar sobre o botão da ação). Qualquer ação desse tipo também é incompatível com `hasReply` e será ignorada se `hasReply` for `true`. |

### Suporte para o botão no macOS

Para que os botões extra de notificações funcionem no macOS, sua aplicação deverá atender aos seguintes critérios:

* Aplicação é assinada
* App tem seu `NSUserNotificationAlertStyle` configurado para `alert` em `info.plist`.

Se qualquer destes requisitos não forem atendidos, o botão não irá aparecer.