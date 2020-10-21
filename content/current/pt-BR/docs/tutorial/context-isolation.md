# Isolamento de contexto

## O que é isso?

Isolamento de Contexto é um recurso que garante que ambos seus `pré-carregar` scripts e a lógica interna do Electron's sejam executados em um contexto separado para o site que você carregar em um [`conteúdo web`](../api/web-contents.md).  Isso é importante para fins de segurança, pois ajuda a impedir que o site acesse os internos do Electron ou as poderosas APIs que seu script de pré-carregamento tem acesso.

Isto significa que o objeto `janela` ao qual seu script de pré-carga tem acesso é realmente um objeto **diferente** do que o site teria acesso.  Por exemplo, se você definir `window.hello = 'wave'` em seu script de pré-carga e o isolamento de contexto está habilitado na janela `. ello` será indefinido se o site tentar acessá-lo.

Cada aplicação deve ter o isolamento de contexto habilitado e do Electron 12, ele será ativado por padrão.

## Como faço para habilitá-lo?

Do Electron 12, será ativado por padrão. Para versões mais baixas, é uma opção na opção `WebPreferences` ao construir `nova janela de navegação`.

```javascript
const mainWindow = new BrowserWindow({
  webPreferences: {
    contextIsolation: true
  }
})
```

## Migração

> Eu fornecia APIs a partir do meu script de pré-carregamento usando a janela `.X = apiObject` agora o quê?

Expor APIs do seu script de pré-carga para o site carregado é um usecase comum e há um módulo dedicado no Electron para ajudá-lo a fazer isso de uma maneira indolor.

**Antes: Com o isolamento de contexto desativado**

```javascript
window.myAPI = {
  doAThing: () => {}
}
```

**Depois: Com o isolamento de contexto habilitado**

```javascript
const { contextBridge } = require('electron')

contextBridge.exposeInMainWorld('myAPI', {
  doAThing: () => {}
})
```

O módulo [`contextBridge`](../api/context-bridge.md) pode ser usado para **expor as APIs com segurança** do contexto isolado no qual seu script de pré-carga é executado para o contexto no qual o site está sendo executado. A API também estará acessível no site `window.myAPI` como antes.

Você deve ler a documentação `contextBridge` ligada acima para entender completamente suas limitações.  Por exemplo, você não pode enviar protótipos ou símbolos personalizados para a ponte.

## Considerações de segurança

Apenas habilitar `contextIsolação` e usar `contextBridge` não significa automaticamente que tudo o que você faz é seguro.  Por exemplo, esse código é **inseguro**.

```javascript
// ❌ Código inválido
contextBridge.exposeInMainWorld('myAPI', {
  send: ipcRenderer.send
})
```

Ele expõe diretamente uma API poderosa sem qualquer tipo de filtragem de argumento. Isso permitirá que qualquer site envie mensagens IPC arbitrárias que você não quer que sejam possíveis. A maneira correta de expor APIs baseadas em IPC seria fornecendo um método por mensagem IPC.

```javascript
// ✅ Um bom código
contextBridge.exposeInMainWorld('myAPI', {
  loadPreferences: () => ipcRenderer.invoke('load-prefs')
})
```

