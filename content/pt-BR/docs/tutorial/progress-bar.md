# Barra de Progresso na Barra de Tarefas (Windows, macOS, Unity)

No Windows, um botão na barra de tarefas pode ser usado para exibir uma barra de progresso. Isso permite que uma janela possa fornecer informações de progresso ao usuário sem que ele tenha que abrir a janela em si.

No macOS, a barra de progresso será exibida em uma parte do dock.

O Unity DE também possui uma função semelhante que permite você especificar a barra de progresso em uma parte do launcher.

**Barra de progresso em um botão da barra de tarefas:**

![Barra de Progresso](https://cloud.githubusercontent.com/assets/639601/5081682/16691fda-6f0e-11e4-9676-49b6418f1264.png)

Todos os três casos são cobertos pela mesma API - o método `setProgressBar()`, que está disponível em instâncias do `BrowserWindows`. Chame-o passando um número entre `` e `1` para indicar seu progresso. Se você estiver rodando uma tarefa demorada e, por exemplo, 63% dela tenha sido completada, você pode chama-lo usando `setProgressBar(0.63)`.

De um modo geral, configurando um valor abaixo de zero (como o `-1`) irá remover a barra de progresso, mas quando definido com um valor maior do que um (como `2`) vai mudar a barra de progresso para o modo intermédio.

Veja a [documentação da API para mais opões e modos](../api/browser-window.md#winsetprogressbarprogress).

```javascript
const { BrowserWindow } = require('electron')
const win = new BrowserWindow()

win.setProgressBar(0.5)
```