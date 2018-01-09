# Objeto ThumbarButton

* `icon` [NativeImage](../native-image.md) - O icone exibido na barra de ferramentas de miniaturas.
* `click` Function
* `tooltip` String (opcional) - O texto do tooltip do botão.
* `flags` String[] (opcional) - Controla estados específicos e comportamentos do botão. Por padrão é definido `['enabled']`.

As `flags` são um array que pode conter as seguintes `String`s:

* `enabled` - O botão está ativo e disponível ao usuário.
* `disabled` - O botão está desabilitado. Ele está presente, mas tem um visual indicando que não vai responder a interação do usuário.
* `dismissonclick` - Quando o botão é clicado, o janela da miniatura é fechada imediatamente.
* `nobackground` - Não desenha a borda do botão, utiliza apenas a imagem.
* `hidden` - O botão não é exibido ao usuário.
* `noninteractive` - O botão está habilitado mas não é possível interagir; Não é desenhado um estado de botão pressionado. Este valor é destinado à instancias onde o botão é utilizado em uma notificação.