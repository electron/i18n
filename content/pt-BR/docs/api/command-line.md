## Classe: Linha de Comando

> Manipule os argumentos da linha de comando para o seu aplicativo que o Chromium lê

Processo: [Main](../glossary.md#main-process)

O exemplo a seguir mostra como verificar se a bandeira `--disable-gpu` está definida.

```javascript
const { app } = require('electron')
app.commandLine.hasSwitch('disable-gpu')
```

Para obter mais informações sobre quais tipos de bandeiras e switches você pode usar, verifique os Switches de linha de comando [](./command-line-switches.md) documento.

### Métodos de Instância

#### `commandLine.appendSwitch (switch[, valor])`

* `switch` String - Um interruptor de linha de comando, sem o líder `--`
* `value` String - (opcional) - Um valor para a opção desejada

Insere uma opção (com um `value` opcional) à linha de comando do Chromium.

**Nota:** Isso não afetará `process.argv`. O uso pretendido desta função é controlar o comportamento do Chromium.

#### `commandLine.appendArgument(valor)`

* `value` String - O argumento para anexar à linha de comando

Aprecie um argumento para a linha de comando do Chromium. O argumento será citado corretamente. Os switches precederão argumentos, independentemente da ordem de adoeção.

Se você está anexando um argumento como `--switch=value`, considere usar `appendSwitch('switch', 'value')` em vez disso.

**Nota:** Isso não afetará `process.argv`. O uso pretendido desta função é controlar o comportamento do Chromium.

#### `commandLine.hasSwitch(switch)`

* `switch` String - Uma opção de linha de comando

Retornos `Boolean` - Se o switch de linha de comando estiver presente.

#### `commandLine.getSwitchValue (switch)`

* `switch` String - Uma opção de linha de comando

Retornos `String` - O valor do switch de linha de comando.

**Nota:** Quando o interruptor não está presente ou não tem valor, ele retorna a sequência vazia.
