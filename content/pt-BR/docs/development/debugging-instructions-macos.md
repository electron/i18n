# Depuração no macOS

Se experimentar falhas ou problemas no Electron que acredita que não são causados pelo seu aplicativo de JavaScript, mas devido ao próprio Electron, a depuração pode ser um pouco complicada, especialmente para os desenvolvedores que não usam a depuração nativa/C++. No entanto, usando o lldb e o código-fonte Electron, você pode habilitar depuração passo-a-passo com pontos de interrupção dentro do código fonte de Electron. Você também pode usar [XCode para depurar](debugging-instructions-macos-xcode.md) se você preferir uma interface gráfica.

## Requisitos

* **Uma construção de depuração de**Eletrônica : A maneira mais fácil é geralmente construí-lo si mesmo, usando as ferramentas e pré-requisitos listados no [instruções de construção para](build-instructions-macos.md)macOS . Embora você possa anexar e depurar Electron como você pode baixá-lo diretamente, você descobrirá que ele é fortemente otimizado, tornando a depuração substancialmente mais difícil: O depurador não será capaz de mostrar-lhe o conteúdo de todas as variáveis e o caminho de execução pode parecer estranho por causa da inlinação, chamadas de cauda e outras otimizações do compilador.

* **Xcode**: Além do Xcode, também instale as ferramentas da linha de comando Xcode. Eles incluem LLDB, o depurador padrão em Xcode no macOS. Suporta depuração C, Objective-C e C++ nos dispositivos desktop e iOS e simulador.

* **.lldbinit**: Criar ou editar `~/.lldbinit` para permitir que o código do Cromo seja devidamente mapeado.

   ```text
   importação de script de comando ~/elétron/src/tools/lldb/lldbinit.py
   ```

## Anexar e depurar o Electron

Para iniciar uma sessão de depuração, abra o Terminal e inicie `lldb`, passando uma construção de elétrons sem liberação como parâmetro.

```sh
$ lldb ./out/Testing/Electron.app
(lldb) criar "./out/Testing/Electron.app"
Conjunto executável atual para './out/Testing/Electron.app' (x86_64).
```

### Definir pontos de interrupção

O LLDB é uma ferramenta poderosa e suporta múltiplas estratégias para inspeção de código. Para esta introdução básica, vamos supor que você está chamando um comando do JavaScript que não está se comportando corretamente - então você gostaria de quebrar a C++ desse comando dentro da fonte Electron.

Arquivos de código relevantes podem ser encontrados em `./shell/`.

Vamos supor que você queira depurar `app.setName()`, que é definido em `browser.cc` como `Browser::SetName()`. Defina o ponto de interrupção usando o comando `breakpoint` , especificando arquivo e linha para quebrar:

```sh
(lldb) conjunto de pontos de interrupção --arquivo browser.cc --linha 117
Breakpoint 1: onde = Electron Framework'atom::Browser::SetName(std::__1::basic_string<char, std::__1::char_traits<char>, std::__1::allocator<char> > const&) + 20 em browser.cc:118, endereço = 0x000000000015fdb4
```

Em seguida, inicie Electron:

```sh
(lldb) executar
```

O aplicativo será imediatamente pausado, já que a Electron define o nome do aplicativo no lançamento:

```sh
(lldb) executar
Processo 25244 lançado: '/Users/fr/Code/electron/out/Testing/Electron.app/Contents/MacOS/Electron' (x86_64)
Processo 25244 parou
* thread #1: tid = 0x839a4c, 0x0000000100162db4 átomo do Electron Framework::Browser::SetName(this=0x0000000108b14f20, name="Electron") + 20 em browser.cc:118, fila = 'com.apple.main-thread', razão de parada = ponto de interrupção 1.1
    #0 de quadro: 0x0000000100162db4 átomo do quadro de elétrons::Browser::SetName(this=0x0000000108b14f20, name="Electron") + 20 a browser.cc:118
   115 }
   116
   117 vazio Navegador::SetName(const std::string& nome) {
-> 118 name_override_ = nome;
   119 }
   120
   121 int Browser ::GetBadgeCount() {
(lldb)
```

Para mostrar os argumentos e variáveis locais para o quadro atual, execute `frame variable` (ou `fr v`), que mostrará que o aplicativo está atualmente definindo o nome para "Elétron".

```sh
(lldb) variável de quadro
(átomo::Navegador *) este = 0x0000000108b14f20
( &de corda const ) nome = "Elétron": {
    [...]
}
```

Para fazer uma etapa única de nível de origem no segmento selecionado atualmente, execute `step` (ou `s`). Isso te levaria para `name_override_.empty()`. Para prosseguir e dar um passo mais, executar `next` (ou `n`).

```sh
(lldb) passo
Processo 25244 parou
* thread #1: tid = 0x839a4c, 0x0000000100162dcc Electron Framework'atom::Browser::SetName(this=0x0000000108b14f20, name="Electron") + 44 at browser.cc:119, queue = 'com.apple.main-thread', razão de parada = passo em
    quadro #0: 0x0000000100162dcc Electron Framework'atom::Browser::SetName(this=0x0000000108b14f20, name="Electron") + 44 em browser.cc:119
   116
   117 void Browser::SetName(const std::string& nome) {
   118 name_override_ = nome;
-> 119 }
   120
   121 int Navegador::GetBadgeCount() {
   122 badge_count_ de retorno;
```

**NOTA:** Se você não ver o código-fonte quando acha que deveria, você pode não ter adicionado o arquivo `~/.lldbinit` acima.

Para terminar a depuração neste momento, corra `process continue`. Você também pode continuar até que uma certa linha de seja atingida neste segmento (`thread until 100`). Este comando executará o segmento no quadro de atual até atingir a linha 100 neste quadro ou parar se ele deixar o quadro atual.

Agora, se você abrir as ferramentas de desenvolvedor da Electron e chamar `setName`, você mais uma vez atingirá o ponto de interrupção .

### Leia mais

LLDB é uma ferramenta poderosa com uma ótima documentação. Para saber mais sobre isso, considere a documentação de depuração da Apple, por exemplo, o</a> de referência da estrutura de comando

LLDB ou a introdução ao [usando o LLDB como um][lldb-standalone]de depuração autônomo .</p> 

Você também pode conferir o fantástico</a>manual e tutorial do LLDB, o que explicará cenários de depuração mais complexos.</p>

[lldb-standalone]: https://developer.apple.com/library/mac/documentation/IDEs/Conceptual/gdb_to_lldb_transition_guide/document/lldb-terminal-workflow-tutorial.html
