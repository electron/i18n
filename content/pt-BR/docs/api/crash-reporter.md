# crashReporter

> Envie relatórios de falha para um servidor remoto.

Processo: [Main](../glossary.md#main-process), [Renderer](../glossary.md#renderer-process)

A seguir, um exemplo de configuração do Electron para enviar automaticamente relatórios de falha para um servidor remoto:

```javascript
const { crashReporter } = require ('electron')

crashReporter.start({ submitURL: 'https://your-domain.com/url-to-submit' })
```

Para configurar um servidor para aceitar e processar relatórios de falha, você pode usar seguintes projetos:

* [socorro](https://github.com/mozilla/socorro)
* [mini-breakpad-servidor](https://github.com/electron/mini-breakpad-server)

Ou use uma solução hospedada de terceiros:

* [Backtrace](https://backtrace.io/electron/)
* [Sentinela](https://docs.sentry.io/clients/electron)
* [BugSplat](https://www.bugsplat.com/docs/platforms/electron)

Os relatórios de falha são armazenados temporariamente antes de serem carregados em um diretório sob o diretório de dados do usuário do aplicativo (chamado 'Crashpad' no Windows e Mac, ou 'Crash Reports' no Linux). Você pode substituir este diretório ligando para `app.setPath('crashDumps', '/path/to/crashes')` antes de iniciar o acidente repórter.

No Windows e no macOS, a Electron usa [](https://chromium.googlesource.com/crashpad/crashpad/+/master/README.md) de travamentos para monitorar e relatar falhas. No Linux, a Electron usa [breakpad](https://chromium.googlesource.com/breakpad/breakpad/+/master/). Este é um detalhe de implementação impulsionado pelo Chromium, e pode mudar no futuro. Em particular, o crashpad é mais novo e provavelmente eventualmente substituirá breakpad em todas as plataformas.

### Nota sobre processos infantis do Node no Linux

Se você estiver usando o módulo Node.js `child_process` e quiser relatar falhas desses processos no Linux, há um passo extra que você precisará dar para inicializar adequadamente o repórter de acidente no processo infantil. Isso não é necessário no Mac ou Windows, pois essas plataformas usam o Crashpad, que monitora automaticamente os processos infantis.

Como `require('electron')` não está disponível nos processos infantis do Node, as seguintes APIs estão disponíveis no objeto `process` nos processos infantis do Nó. Note que, no Linux, cada processo filho node tem sua própria instância separada de o repórter de quebra de breakpad. Isso é diferente dos processos de renderização de crianças, que possuem um repórter breakpad "stub" que retorna informações ao principal processo de reportagem.

#### `process.crashReporter.start(options)`

Veja [`crashReporter.start()`](#crashreporterstartoptions).

#### `process.crashReporter.getParameters()`

Veja [`crashReporter.getParameters()`](#crashreportergetparameters).

#### `process.crashReporter.addExtraParameter(chave, valor)`

Veja [`crashReporter.addExtraParameter(key, value)`](#crashreporteraddextraparameterkey-value).

#### `process.crashReporter.removeExtraParameter(key)`

Veja [`crashReporter.removeExtraParameter(key)`](#crashreporterremoveextraparameterkey).

## Métodos

O módulo `crashReporter` tem os seguintes métodos:

### `crashReporter.start(opções)`

* objeto `options`
  * `submitURL` String - URL para a publicação de relatórios de acidentes será enviada como POST.
  * `productName` String (opcional) - Padrão para `app.name`.
  * `companyName` String (opcional) __ preterido - Codinome preterido para `{ globalExtra: { _companyName: ... } }`.
  * `uploadToServer` Boolean (opcional) - Se os relatórios de falha devem ser enviados ao servidor. Se falso, os relatórios de acidentes serão coletados e armazenados no diretório de acidentes , mas não carregados. O padrão é `true`.
  * `ignoreSystemCrashHandler` Booleano (opcional) - Se for verdade, os acidentes gerados no processo principal não serão encaminhados para o manipulador de travamento do sistema. Por padrão é `false`.
  * `rateLimit` Boolean (opcional) _macOS_ __ do Windows - Se for verdade, limite o número de de falhas carregadas para 1/hora. Por padrão é `false`.
  * `compress` Booleano (opcional) - Se for verdade, os relatórios de acidente serão comprimidos e carregados com `Content-Encoding: gzip`. O padrão é `true`.
  * `extra` Record<String, String> (opcional) - As anotações de chave/valor de string extra que serão enviadas juntamente com relatórios de falha gerados no processo principal. Apenas valores de string são suportados. Acidentes gerados em processos infantis não conterão esses parâmetros extras de para relatórios de acidentes gerados a partir de processos infantis, chamada [`addExtraParameter`](#crashreporteraddextraparameterkey-value) do processo criança.
  * `globalExtra` Record<String, String> (opcional) - Anotações de de string/value extras que serão enviadas juntamente com quaisquer relatórios de falha gerados em qualquer processo . Essas anotações não podem ser alteradas quando o repórter do acidente ter sido iniciado. Se uma chave estiver presente tanto nos parâmetros extras globais quanto parâmetros extras específicos do processo, então a global terá precedência. Por padrão, `productName` e a versão do aplicativo estão incluídos, assim como bem como a versão Electron.

Este método deve ser chamado antes de usar quaisquer outras APIs `crashReporter` . Uma vez iniciado desta forma, o manipulador de crashpad coleta falhas de todos os processos posteriormente criados. O repórter do acidente não pode ser desativado quando começou.

Esse método deve ser chamado o mais cedo possível na inicialização de aplicativos, de preferência antes `app.on('ready')`. Se o repórter de acidente não for iniciado no momento em um processo de renderização for criado, então esse processo de renderização não será monitorado pelo repórter do acidente.

**Nota:** Você pode testar o repórter de acidente gerando um acidente usando `process.crash()`.

**Nota:** Se você precisar enviar parâmetros de `extra` adicionais/atualizados após a primeira chamada `start` , você pode ligar para `addExtraParameter`.

**Nota:** Parâmetros passados em `extra`, `globalExtra` ou definidos com `addExtraParameter` têm limites no comprimento das teclas e valores. Os principais nomes devem ter no máximo 39 bytes de comprimento, e os valores não devem ser mais do que 127 bytes. Chaves com nomes mais longos que o máximo serão silenciosamente ignoradas. Os valores-chave mais longos do que o comprimento máximo serão truncados.

**Nota:** Este método só está disponível no processo principal.

### `crashReporter.getLastCrashReport()`

Retornos [`CrashReport`](structures/crash-report.md) - A data e a 190.000 último relatório do acidente. Apenas os relatórios de acidentes que foram carregados serão devolvidos; mesmo que um relatório de falha esteja presente no disco, ele não será devolvido até que seja carregado. No caso de não existirem relatórios enviados, `null` é retornado.

**Nota:** Este método só está disponível no processo principal.

### `crashReporter.getUploadedReports()`

Retornos [`CrashReport[]`](structures/crash-report.md):

Retorna todos os relatórios de acidentes enviados. Cada relatório contém a data e o envio ID.

**Nota:** Este método só está disponível no processo principal.

### `crashReporter.getUploadToServer()`

Devoluções `Boolean` - Se os relatórios devem ser submetidos ao servidor. Definir através o método `start` ou `setUploadToServer`.

**Nota:** Este método só está disponível no processo principal.

### `crashReporter.setUploadToServer (uploadToServer)`

* `uploadToServer` Boolean - Se os relatórios devem ser submetidos ao servidor.

Isso normalmente seria controlado pelas preferências do usuário. Isso não tem efeito se chamado antes de `start` for chamado.

**Nota:** Este método só está disponível no processo principal.

### `crashReporter.addExtraParameter (chave, valor)`

* `key` String - Tecla parâmetro, não deve ser mais do que 39 bytes.
* `value` Desequipe corda - parâmetro, não deve ser superior a 127 bytes.

Defina um parâmetro extra para ser enviado com o relatório do acidente. Os valores especificados aqui serão enviados, além de quaisquer valores definidos através da opção `extra` quando `start` foi chamado.

Parâmetros adicionados desta forma (ou através do parâmetro `extra` para `crashReporter.start`) são específicos para o processo de chamada. A adição de parâmetros extras de no processo principal não fará com que esses parâmetros sejam enviados junto com falhas de renderer ou outros processos infantis. Da mesma forma, a adição de parâmetros extras de em um processo de renderização não resultará na desses parâmetros enviados com travas que ocorrem em outros processos de renderização ou no processo principal.

**Nota:** Parâmetros têm limites no comprimento das teclas e valores. Os principais nomes não devem ser mais do que 39 bytes, e os valores não devem ser mais do que 20320 bytes. Chaves com nomes mais longos que o máximo serão silenciosamente ignoradas. Os valores de mais longos do que o comprimento máximo serão truncados.

**Nota:** Em valores linux com mais de 127 bytes serão divididos em várias teclas, cada um com 127 bytes de comprimento.  Ex. `addExtraParameter('foo', 'a'.repeat(130))` resultará em duas chaves em pedaços `foo__1` e `foo__2`, a primeira conterá os primeiros 127 bytes e a segunda conterá os 3 bytes restantes.  Em o seu backend de relatórios de acidentes você deve costurar chaves neste formato.

### `crashReporter.removeExtraParameter(chave)`

* `key` String - Tecla parâmetro, não deve ser mais do que 39 bytes.

Remova um parâmetro extra do conjunto atual de parâmetros. Acidentes futuros não incluirá este parâmetro.

### `crashReporter.getParameters()`

Retornos `Record<String, String>` - Os parâmetros atuais 'extras' do repórter de acidente.

## Carga útil do relatório de acidentes

O repórter do acidente enviará os seguintes dados para o `submitURL` como um `multipart/form-data` `POST`:

* `ver` String - A versão de Electron.
* `platform` String - por exemplo, 'win32'.
* `process_type` String - por exemplo, "renderer".
* `guid` String - por exemplo, '5e1286fc-da97-479e-918b-6bfb0c3d1c72'.
* `_version` String - A versão em `package.json`.
* `_productName` String - O nome do produto no objeto `crashReporter` `options` .
* `prod` String - Nome do produto subjacente. Neste caso, Electron.
* `_companyName` String - O nome da empresa no objeto `crashReporter` `options` .
* arquivo `upload_file_minidump` - O relatório de acidente no formato de `minidump`.
* Todas as propriedades do nível um do objeto `extra` no objeto `crashReporter` `options` .
