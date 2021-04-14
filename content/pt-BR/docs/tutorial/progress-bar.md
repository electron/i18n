# Barra de Progresso na Barra de Tarefas (Windows, macOS, Unity)

## Visão Geral

Uma barra de progresso permite que uma janela forneça informações de progresso ao usuário sem a necessidade de mudar para a própria janela.

No Windows, você pode usar um botão de barra de tarefas para exibir uma barra de progresso.

![Barra de Progresso do Windows][1]

No macOS, a barra de progresso será exibida como parte do ícone de doca.

![barra de progresso do macOS][2]

No Linux, a interface gráfica Unity também tem um recurso semelhante que permite você especificar a barra de progresso no launcher.

![Barra de Progresso Linux][3]

> NOTA: no Windows, cada janela pode ter sua própria barra de progresso, enquanto no macOS e Linux (Unity) pode haver apenas uma barra de progresso para o aplicativo.

----

Todos os três casos são cobertos pela mesma API - o método [`setProgressBar()`][setprogressbar] disponível em uma instância de `BrowserWindow`. Para indicar seu progresso, ligue para este método com um número entre `0` e `1`. Por exemplo, se você tem uma tarefa de longa duração que está atualmente em 63% para a conclusão, você a chamaria de `setProgressBar(0.63)`.

Definindo o parâmetro para valores negativos (por exemplo. `-1`) removerá o progresso barra, ao que defini-lo para valores maiores que `1` (por exemplo. `2`) mudará a barra de progresso para o modo indeterminado (somente windows -- ele será fixado em 100% caso contrário). Neste modo, uma barra de progresso permanece ativa, mas não mostra uma porcentagem real. Use este modo para situações em que você não sabe quanto tempo uma operação levará para ser concluída.

Veja a [documentação da API para mais opções e modos][setprogressbar].

## Exemplo

Começando com um aplicativo de trabalho do [Guia de início rápido](quick-start.md), adicione as seguintes linhas ao arquivo `main.js`:

```javascript fiddle='docs/fiddles/features/progress-bar'
const { BrowserWindow } = require('electron')
const win = new BrowserWindow()

win.setProgressBar(0.5)
```

Depois de lançar o aplicativo Electron, você deve ver a barra em dock (macOS) ou barra de tarefas (Windows, Unity), indicando o progresso porcentagem que você acabou de definir.

![barra de progresso do dock macOS](../images/dock-progress-bar.png)

Para macOS, a barra de progresso também será indicada para o seu aplicativo ao usar [](https://support.apple.com/en-us/HT204100)de Controle de Missão :

![Barra de Progresso do Controle da Missão](../images/mission-control-progress-bar.png)

[1]: https://cloud.githubusercontent.com/assets/639601/5081682/16691fda-6f0e-11e4-9676-49b6418f1264.png
[2]: ../images/macos-progress-bar.png
[3]: ../images/linux-progress-bar.png
[setprogressbar]: ../api/browser-window.md#winsetprogressbarprogress-options
[setprogressbar]: ../api/browser-window.md#winsetprogressbarprogress-options
