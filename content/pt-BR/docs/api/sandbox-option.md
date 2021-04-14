# Opção `sandbox`

> Crie uma janela do navegador com uma renderização com caixa de areia. Com essa opção habilitada, o renderizador deve comunicar via IPC ao processo principal para acessar APIs de nó.

Um dos principais recursos de segurança do Chromium é que toda a renderização piscada/JavaScript código é executado dentro de uma caixa de areia. Esta caixa de areia usa recursos específicos do SISTEMA para garantir que que explora no processo de renderização não possa prejudicar o sistema.

Em outras palavras, quando a caixa de areia é habilitada, os renderizadores só podem fazer alterações ao sistema, delegando tarefas ao processo principal via IPC. [Aqui está](https://www.chromium.org/developers/design-documents/sandbox) mais informações sobre a caixa de areia.

Uma vez que uma característica importante na Electron é a capacidade de executar o Node.js no processo de renderização (facilitando o desenvolvimento de aplicações de desktop usando tecnologias de web), a caixa de areia é desativada por elétrons. Isso ocorre porque a maioria das APIs .js Node exigem acesso ao sistema. `require()` por exemplo, não é possível sem permissões do sistema de arquivos, que não estão disponíveis em um ambiente de sandboxed.

Normalmente, isso não é um problema para aplicativos de desktop, uma vez que o código é sempre confiável, mas torna o Electron menos seguro que o Chromium para exibir conteúdo web não confiável. Para aplicações que requerem mais segurança, a bandeira `sandbox` forçará a Electron a gerar um renderizador clássico de Cromo que é compatível com a caixa de areia.

Um renderizador com caixa de areia não tem um ambiente .js node em execução e não expõe AS APIs do Node.js JavaScript ao código do cliente. A única exceção é o script pré-carregamento, que tem acesso a um subconjunto da API renderizador eletrônica.

Outra diferença é que os renderizadores com caixa de areia não modificam nenhuma das APIs padrão JavaScript. Consequentemente, algumas APIs, como `window.open` funcionarão como fazem no Cromo (ou seja, não retornam um [`BrowserWindowProxy`](browser-window-proxy.md)).

## Exemplo

Para criar uma janela de caixa de areia, passe `sandbox: true` para `webPreferences`:

```js
deixe ganhar
app.whenReady().(()=> {
  win = novo BrowserWindow({
    webPreferência: {
      sandbox: true
    }
  })
  win.loadURL('http://google.com')
})
```

No código acima o [`BrowserWindow`](browser-window.md) criado tem Nó.js desativado e pode se comunicar somente via IPC. O uso desta opção impede a Electron de criar um nó.js tempo de execução na renderização. Além disso, dentro desta nova janela `window.open` segue o comportamento nativo (por padrão Electron cria um [`BrowserWindow`](browser-window.md) e retorna um proxy para isso via `window.open`).

[`app.enableSandbox`](app.md#appenablesandbox) podem ser usados para forçar `sandbox: true` para todas as instâncias `BrowserWindow` .

```js
deixe ganhar
app.enableSandbox()
app.whenReady().then(((() => {
  // não precisa passar 'sandbox: true' desde que 'app.enableSandbox()' foi chamado.
  win = novo BrowserWindow()
  win.loadURL('http://google.com')
})
```

## Pré-carga

Um aplicativo pode fazer personalizações para renderizadores de caixa de areia usando um script de pré-carga. Aqui está um exemplo:

```js
deixe ganhar
app.whenReady().(((() => {
  win = novo BrowserWindow({
    webPreferências: {
      sandbox: true, true,
      pré-carga: path.join(app.getAppPath(), 'préload.js')
    }
  })
  win.loadURL('http://google.com')
})
```

e preload.js:

```js
Este arquivo é carregado sempre que um contexto javascript é criado. Ele é executado em um escopo
// privado que pode acessar um subconjunto de APIs renderer electron. Sem
// contextIsolation habilitado, é possível acidentalmente vazar
privilegiados // globais como ipcRenderer para conteúdo web.
const { ipcRenderer } = require ('electron')

const defaultWindowOpen = janela.open

janela.open = função personalizadaWindowOpen (url, ... args) {
  ipcRenderer.send('report-window-open', location.origin, url, args)
  retorno padrãoWindowOpen (url + '?from_electron=1', ... args)
}
```

Coisas importantes a serem notarias no script de pré-carga:

- Mesmo que o renderizador de caixa de areia não tenha Node.js funcionando, ele ainda tem acesso a um ambiente limitado semelhante a um nó: `Buffer`, `process`, `setImmediate`, `clearImmediate` e `require` estão disponíveis.
- O script pré-carga deve ser contido em um único script, mas é possível ter código de pré-carga complexo composto com vários módulos usando uma ferramenta como webpack ou browserify. Um exemplo de uso do browserify está abaixo.

Para criar um pacote de navegador e usá-lo como um script de pré-carga, algo como o seguinte deve ser usado:

```sh
  browserify preload/index.js \
    -x elétron \
    --insert-global-vars=__filename,__dirname -o pré-carga.js
```

O sinalizador `-x` deve ser usado com qualquer módulo necessário que já esteja exposto em o escopo de pré-carga, e diz ao browserify para usar a função `require` de inc dentro para ele. `--insert-global-vars` garantirá que `process`, `Buffer` e `setImmediate` também sejam retirados do escopo de incisão (normalmente navegador injeta código para esses).

Atualmente, a função `require` fornecida no escopo de pré-carga expõe os seguintes módulos:

- `electron`
  - `crashReporter`
  - `desktopCapturer`
  - `ipcRenderer`
  - `nativeImage`
  - `webFrame`
- `eventos`
- `timers`
- `url`

Mais podem ser adicionados conforme necessário para expor mais APIs eletrônicas na caixa de areia.

## Renderização de conteúdo não confiável

Renderizar conteúdo não confiável no Electron ainda é um território um pouco desconhecido, embora alguns aplicativos estejam encontrando sucesso (por exemplo, Beaker Browser). Nosso objetivo é obter o mais próximo possível do Chrome em termos de segurança de conteúdo sandboxed, mas em última análise, sempre estaremos para trás devido a algumas questões fundamentais:

1. Não temos os recursos ou conhecimentos dedicados que o Chromium tem para aplicar à segurança de seu produto. Fazemos o nosso melhor para fazer uso do que temos, herdar tudo o que pudermos do Cromo, e responder rapidamente a problemas de segurança , mas a Electron não pode ser tão segura quanto o Cromo sem os recursos que o Cromo é capaz de dedicar.
2. Alguns recursos de segurança no Chrome (como Navegação segura e Certificado Transparência) exigem uma autoridade centralizada e servidores dedicados, ambos de que vão contra os objetivos do projeto Electron. Como tal, desabilitomos essas características em Electron, ao custo da segurança associada que eles trariam de outra forma.
3. Há apenas um Chromium, enquanto há muitos milhares de aplicativos construídos na Electron, todos os quais se comportam ligeiramente diferente. A contabilização dessas diferenças pode render um espaço enorme de possibilidades, e torná-lo desafiador para garantir a segurança da plataforma em casos de uso incomum.
4. Não podemos empurrar as atualizações de segurança diretamente para os usuários, por isso contamos com os fornecedores de aplicativos para atualizar a versão da Electron subjacente ao seu aplicativo, a fim de que atualizações de segurança cheguem aos usuários.

Aqui estão algumas coisas a considerar antes de tornar o conteúdo não confiável:

- Um script de pré-carga pode acidentalmente vazar APIs privilegiadas para código não confiável, , a menos que [`contextIsolation`](../tutorial/security.md#3-enable-context-isolation-for-remote-content) também esteja habilitado.
- Alguns bugs no motor V8 podem permitir que o código malicioso acesse o renderizador APIs de pré-carga, efetivamente concedendo acesso total ao sistema através do módulo `remote` . Portanto, é altamente recomendável [desativar o módulo `remote` ](../tutorial/security.md#15-disable-the-remote-module). Se a desativação não for viável, você deve [filtrar seletivamente o módulo `remote` ](../tutorial/security.md#16-filter-the-remote-module).
- Embora façamos nosso melhor esforço para retropor as correções de segurança do Chromium para versões mais antigas da Electron, não garantimos que cada correção será apoiada. Sua melhor chance de se manter seguro é estar na última versão estável de Electron.
