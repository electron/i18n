# nativoTheme

> Leia e responda às alterações no tema da cor nativa do Chromium.

Processo: [Main](../glossary.md#main-process)

## Eventos

O módulo `nativeTheme` emite os seguintes eventos:

### Evento: 'atualizado'

Emitido quando algo no tema nativo subjacente mudou. Isso normalmente significa que o valor da `shouldUseDarkColors`, `shouldUseHighContrastColors` ou `shouldUseInvertedColorScheme` mudou. Você terá que verificá-los para determinar qual mudou.

## Propriedades

O módulo `nativeTheme` tem as seguintes propriedades:

### `nativeTheme.shouldUseDarkColors` _Readonly_

Uma `Boolean` para se o SO / Chromium atualmente tem um modo escuro ativado ou está sendo instruído a mostrar uma interface do usuário de estilo escuro.  Se você quiser modificar este valor, você deve usar `themeSource` abaixo.

### `nativeTheme.themeFonte`

Uma propriedade `String` que pode ser `system`, `light` ou `dark`.  Ela é usada para sobrepor e substituir o valor que o Chromium escolheu para usar internamente.

Definir esta propriedade para `system` removerá a substituição e tudo será redefinido para o padrão do sistema operacional.  Por padrão `themeSource` é `system`.

As configurações desta propriedade para `dark` terão os seguintes efeitos:

* `nativeTheme.shouldUseDarkColors` será `true` quando acessada
* Qualquer renderização ui Electron no Linux e Windows, incluindo menus de contexto, devtools, etc. usará a interface do usuário escura.
* Qualquer interface do usuário que o SISTEMA operacional renderiza no macOS, incluindo menus, quadros de janelas, etc. usará a interface do usuário escura.
* A consulta CSS [`prefers-color-scheme`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme) corresponderá ao modo `dark` .
* O evento `updated` será emitido

As configurações desta propriedade para `light` terão os seguintes efeitos:

* `nativeTheme.shouldUseDarkColors` será `false` quando acessada
* Qualquer renderização ui Electron no Linux e Windows, incluindo menus de contexto, devtools, etc. usará a interface do usuário leve.
* Qualquer interface do usuário que o SISTEMA operacional renderiza no macOS, incluindo menus, quadros de janelas, etc. usará a interface do usuário leve.
* A consulta CSS [`prefers-color-scheme`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme) corresponderá ao modo `light` .
* O evento `updated` será emitido

O uso desta propriedade deve estar alinhado com uma clássica máquina de estado "modo escuro" em seu aplicativo onde o usuário tem três opções.

* `Padrão do Sistema` --> `themeSource = 'system'`
* `Modo Escuro` --> `themeSource = 'dark'`
* `Modo Claro` --> `themeSource = 'light'`

Seu aplicativo deve, então, sempre usar `shouldUseDarkColors` para determinar qual CSS aplicar.

### `nativeTheme.shouldUseHighContrastColors` __ __do</em> _do MacOS</h3>

Uma `Boolean` para se o SO / Chromium atualmente tem o modo de alto contraste habilitado ou está sendo instruído a mostrar uma interface do usuário de alto contraste.

### `nativeTheme.shouldUseInvertedColorScheme` __ __do</em> _do MacOS</h3>

Uma `Boolean` para se o SO / Chromium atualmente tem um esquema de cores invertida ou está sendo instruído a usar um esquema de cores invertidas.
