# Depuração em VSCode

Este guia explica como configurar a depuração vscode tanto para o seu próprio projeto Electron quanto para a base de código eletrônica nativa.

## Depurando seu aplicativo Electron

### Processo principal

#### 1. Abra um Electron projeto em VSCode.

```sh
$ git clone git@github.com:electron/electron-quick-start.git
$ code electron-quick-start
```

#### 2. Adicione um arquivo `.vscode/launch.json` com a seguinte configuração:

```json
{
  "version": "0.2. ",
  "configurations": [
    {
      "name": "Depurar processo principal",
      "type": "node",
      "request": "launch",
      "cwd": "${workspaceFolder}",
      "runtimeExecutable": "${workspaceFolder}/node_modules/. in/electron",
      "windows": {
        "runtimeExecutable": "${workspaceFolder}/node_modules/.bin/electron. md"
      },
      "args" : [". ],
      "outputCapture": "std"
    }
  ]
}
```

#### 3. Depuração

Defina alguns pontos de interrupção no `main.js`, e inicie a depuração no [Debug View](https://code.visualstudio.com/docs/editor/debugging). Você deveria ser capaz de bater nos pontos de interrupção.

Aqui está um projeto pré-configurado que você pode baixar e depurar diretamente no VSCode: https://github.com/octref/vscode-electron-debug/tree/master/electron-quick-start

## Depurando a base de código electron

Se você quiser construir o Electron a partir da fonte e modificar a base de código eletrônica nativa, esta seção irá ajudá-lo a testar suas modificações.

Para aqueles que não têm certeza de onde adquirir esse código ou como construí-lo, [Ferramentas de Construção da Electron](https://github.com/electron/build-tools) automatiza e explica a maior parte desse processo. Se você deseja configurar manualmente o ambiente, você pode usar estes [construir instruções](https://www.electronjs.org/docs/development/build-instructions-gn).

### Windows (C++)

#### 1. Abra um Electron projeto em VSCode.

```sh
$ git clone git@github.com:electron/electron-quick-start.git
$ code electron-quick-start
```

#### 2. Adicione um arquivo `.vscode/launch.json` com a seguinte configuração:

```json
{
  "versão": "0.2.0",
  "configurações": [
    {
      "nome": "(Windows) Launch",
      "tipo": "cppvsdbg",
      "solicitação": "lançamento",
      "programa": "${workspaceFolder}\\out\\your-executable location\\electron.exe",
      "args": ["your-electron-project-path"],
      "stopAtEntry": falso,
      "cwd": "${workspaceFolder}",
      "ambiente": [
          {"nome": "ELECTRON_ENABLE_LOGGING", "valor": "verdadeiro"},
          {"nome": "ELECTRON_ENABLE_STACK_DUMPING", "valor": "verdadeiro"},
          {"nome": "ELECTRON_RUN_AS_NODE", "valor": ""},
      ],
      "externalConsole": falso,
      "sourceFileMap": {
          "o:\\": "${workspaceFolder}",
      },
    },
  ]
}
```

**Notas de configuração**

* `cppvsdbg` requer que a extensão C/C++ incorporada</a>

seja habilitada.</li> 
  
  * `${workspaceFolder}` é o caminho completo para o diretório `src` do Chromium.
* `your-executable-location` será um dos seguintes, dependendo de alguns itens: 
    * `Testing`: Se você estiver usando as configurações padrão do</a> de ferramentas de construção da Electron ou as instruções padrão ao [construção a partir de](https://www.electronjs.org/docs/development/build-instructions-gn#building)de origem .</li> 
    
      * `Release`: Se você construiu uma compilação de lançamento em vez de uma compilação de teste.
  * `your-directory-name`: Se você modificou isso durante o processo de compilação a partir do padrão, isso será o que você especificou.</ul></li> 

* O `"your-electron-project-path"` de string de matriz `args` deve ser o caminho absoluto para o diretório ou `main.js` arquivo do projeto Electron que você está usando para testes. Neste exemplo, deve ser o seu caminho para `electron-quick-start`.</ul> 



#### 3. Depuração

Defina alguns pontos de interrupção nos arquivos .cc de sua escolha no código nativo Electron C++ e comece a depurar no [Debug View](https://code.visualstudio.com/docs/editor/debugging).
