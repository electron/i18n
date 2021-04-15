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

To do a source level single step in the currently selected thread, execute `step` (or `s`). This would take you into `name_override_.empty()`. To proceed and do a step over, run `next` (or `n`).

```sh
(lldb) step
Process 25244 stopped
* thread #1: tid = 0x839a4c, 0x0000000100162dcc Electron Framework`atom::Browser::SetName(this=0x0000000108b14f20, name="Electron") + 44 at browser.cc:119, queue = 'com.apple.main-thread', stop reason = step in
    frame #0: 0x0000000100162dcc Electron Framework`atom::Browser::SetName(this=0x0000000108b14f20, name="Electron") + 44 at browser.cc:119
   116
   117  void Browser::SetName(const std::string& name) {
   118    name_override_ = name;
-> 119  }
   120
   121  int Browser::GetBadgeCount() {
   122    return badge_count_;
```

**NOTE:** If you don't see source code when you think you should, you may not have added the `~/.lldbinit` file above.

To finish debugging at this point, run `process continue`. You can also continue until a certain line is hit in this thread (`thread until 100`). This command will run the thread in the current frame till it reaches line 100 in this frame or stops if it leaves the current frame.

Now, if you open up Electron's developer tools and call `setName`, you will once again hit the breakpoint.

### Leia mais

LLDB is a powerful tool with a great documentation. To learn more about it, consider Apple's debugging documentation, for instance the [LLDB Command Structure Reference][lldb-command-structure] or the introduction to [Using LLDB as a Standalone Debugger][lldb-standalone].

You can also check out LLDB's fantastic [manual and tutorial][lldb-tutorial], which will explain more complex debugging scenarios.

[lldb-command-structure]: https://developer.apple.com/library/mac/documentation/IDEs/Conceptual/gdb_to_lldb_transition_guide/document/lldb-basics.html#//apple_ref/doc/uid/TP40012917-CH2-SW2
[lldb-standalone]: https://developer.apple.com/library/mac/documentation/IDEs/Conceptual/gdb_to_lldb_transition_guide/document/lldb-terminal-workflow-tutorial.html
[lldb-tutorial]: https://lldb.llvm.org/tutorial.html
