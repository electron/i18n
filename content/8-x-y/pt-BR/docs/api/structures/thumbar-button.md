# Objeto ThumbarButton

* `icon` [NativeImage](../native-image.md) - O icone exibido na barra de ferramentas de miniaturas.
* `click` Function
* `tooltip` String (opcional) - O texto do tooltip do botão.
* `flags` String[] (optional) - Control specific states and behaviors of the button. By default, it is `['enabled']`.

As `flags` são um array que pode conter as seguintes `String`s:

* `enabled` - O botão está ativo e disponível ao usuário.
* `disabled` - The button is disabled. It is present, but has a visual state indicating it will not respond to user action.
* `dismissonclick` - Quando o botão é clicado, o janela da miniatura é fechada imediatamente.
* `nobackground` - Não desenha a borda do botão, utiliza apenas a imagem.
* `hidden` - O botão não é exibido ao usuário.
* `noninteractive` - The button is enabled but not interactive; no pressed button state is drawn. This value is intended for instances where the button is used in a notification.
