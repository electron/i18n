# Configuração do servidor símbolo em Debugger

Os símbolos de depuração permitem que você tenha sessões de depuração melhores. Eles têm informações sobre as funções contidas em executáveis e bibliotecas dinâmicas e fornecem informações você para obter pilhas de chamadas limpas. Um servidor símbolo permite que o depurador de carregue os símbolos, binários e fontes corretos automaticamente sem forçando os usuários a baixar arquivos de depuração grandes. O servidor funciona como [servidor símbolo da Microsoft](https://support.microsoft.com/kb/311503) para que a documentação possa ser útil.

Note que, como as construções eletrônicas liberadas são fortemente otimizadas, a depuração é nem sempre fácil. O depurador não será capaz de mostrar o conteúdo de todas as variáveis e o caminho de execução pode parecer estranho por causa de inlining, chamadas de cauda e outras otimizações de compiladores. A única solução alternativa é construir uma construção local não otimizada.

A URL oficial do servidor de símbolos para Electron está https://symbols.electronjs.org. Você não pode visitar esta URL diretamente, você deve adicioná-la ao caminho símbolo da sua ferramenta de depuração de . Nos exemplos abaixo, um diretório de cache local é usado para evitar buscar repetidamente o PDB do servidor. Substitua `c:\code\symbols` por um diretório de cache apropriado na sua máquina.

## Usando o servidor símbolo em Windbg

O caminho do símbolo Windbg é configurado com um valor de string delimitado com caracteres asterisco. Para usar apenas o servidor símbolo Electron, adicione a seguinte entrada ao seu caminho de símbolo (**Nota:** você pode substituir `c:\code\symbols` por qualquer diretório de gravável no seu computador, se preferir um local diferente para símbolos de baixados):

```powershell
SRV*c:\code\symbols\*https://symbols.electronjs.org
```

Defina esta sequência como `_NT_SYMBOL_PATH` no ambiente, usando os menus Windbg, ou digitando o comando `.sympath` . Se você quiser obter símbolos de servidor símbolo da Microsoft também, você deve listar primeiro:

```powershell
SRV*c:\code\symbols\*https://msdl.microsoft.com/download/symbols;SRV*c:\code\symbols\*https://symbols.electronjs.org
```

## Usando o servidor símbolo no Visual Studio

![Opções de > ferramentas](https://mdn.mozillademos.org/files/733/symbol-server-vc8express-menu.jpg) ![Configurações de símbolos](https://mdn.mozillademos.org/files/2497/2005_options.gif)

## Solução de problemas: Símbolos não carregarão

Digite os seguintes comandos no Windbg para imprimir por que os símbolos não estão carregando:

```powershell
> !sym barulhento
> .recarregar /f elétron.exe
```
