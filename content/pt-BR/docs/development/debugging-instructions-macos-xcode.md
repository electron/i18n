## Depuração com XCode

### Gerar projeto xcode para fontes de depuração (não pode criar código a partir de xcode)

Execute `gn gen` com o argumento --ide=xcode.

```sh
$ gn gen out/Testing --ide=xcode
```

Isso vai gerar o electron.ninja.xcworkspace. Você terá que abrir este espaço de trabalho para definir pontos de interrupção e inspecionar.

Consulte `gn help gen` para obter mais informações sobre a geração de projetos IDE com GN.

### Depuração e pontos de interrupção

Inicie o aplicativo Electron após a compilação. Agora você pode abrir o espaço de trabalho xcode criado acima e anexar-se ao processo Electron através do menu de depuração > Debug Attach To Process > Electron. [Nota: Se você quiser depurar processo renderizador, você precisa se conectar ao Ajudante de Elétrons também.]

Agora você pode definir pontos de interrupção em qualquer um dos arquivos indexados. No entanto, você não será capaz de definir pontos de interrupção diretamente na fonte Chromium. Para definir pontos de interrupção na fonte Chromium, você pode escolher Debug > Breakpoints > Criar Ponto de Ruptura Simbólica e definir qualquer nome de função como o símbolo. Isso definirá o ponto de interrupção para todas as funções com esse nome, de todas as classes, se houver mais de uma. Você também pode fazer esta etapa de definição de break points antes de anexar o depurador, no entanto, pontos de interrupção reais para funções simbólicas de breakpoint podem não aparecer até que o depurador esteja conectado ao aplicativo.
