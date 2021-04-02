# Objeto ThumbarButton

* `icon` [NativeImage](../native-image.md) - O icone exibido na barra de ferramentas de miniaturas.
* `click` Function
* `tooltip` String (opcional) - O texto do tooltip do botão.
* `flags` String[] (opcional) - Controle estados e comportamentos específicos do botão . Por padrão, é `['enabled']`.

As `flags` são um array que pode conter as seguintes `String`s:

* `enabled` - O botão está ativo e disponível ao usuário.
* `disabled` - O botão está desativado. Está presente, mas tem um estado visual indicando que não responderá à ação do usuário.
* `dismissonclick` - Quando o botão é clicado, o janela da miniatura é fechada imediatamente.
* `nobackground` - Não desenha a borda do botão, utiliza apenas a imagem.
* `hidden` - O botão não é exibido ao usuário.
* `noninteractive` - O botão está ativado, mas não interativo; nenhum estado de botão pressionado é desenhado. Esse valor destina-se a casos em que o botão é usado em uma notificação.
