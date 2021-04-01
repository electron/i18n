# Testando em Sistemas de CI sem Cabeça (Travis CI, Jenkins)

Sendo baseado no Chromium, o Electron necessita de um driver de vídeo para rodar. Se Chromium não consegue encontrar um driver de exibição, Electron vai falhar na inicialização - e portanto não executa nenhum dos seus testes, independente de como você está executando eles. Para testar aplicativos com base no Electron em sistemas como Travis, Circle, Jenkins ou similares requer que algumas configurações sejam feitas. Basicamente, precisamos usar um driver de vídeo virtual.

## Configurando o Servidor de Vídeo Virtual

Primeiramente instale o [Xvfb](https://en.wikipedia.org/wiki/Xvfb). É um framebuffer que implementa o protocolo de servidor de vídeo do X11 - ele realiza todas as operações gráficas na memória sem mostrar nenhuma mensagem, o que é exatamente o que precisamos.

Então, crie uma tela Xvfb virtual e exporte uma variável de ambiente chamada de DISPLAY que aponta para ela. No Electron o Chromium irá procurar automaticamente pela variável `$DISPLAY`, sendo assim dispensáveis configurações adicionais em seu aplicativo. Esta etapa pode ser automatizada com o pacote [xvfb-maybe](https://github.com/anaisbetts/xvfb-maybe): Preceda seus comandos de teste com `xvfb-maybe` e a ferramenta fará a configuração automaticamente do Xvfb, se requerido pelo sistema. No Windows ou macOS, não fará nada.

```sh
## No Windows ou macOS, isso invoca o electron-mocha
## No Linux, no Linux, se estamos em um ambiente sem cabeçalho, isso será equivalente a
## xvfb-run electron-mocha. test/*.js
xvfb-talvez electron-mocha ./test/*.js
```

### Travis CI

No Travis, o seu `.travis;yml` deverá se parecer basicamente desta forma:

```yml
addons:
  apt:
    pacotes:
      - xvfb

install:
  - exportar EXPLY=':99. '
  - Xvfb :99 -tela 0 1024x768x24 > /dev/null 2>&1 &
```

### Jenkins

Para o Jenkins, um [plugin Xvfb está disponível](https://wiki.jenkins-ci.org/display/JENKINS/Xvfb+Plugin).

### Circle CI

Circle CI é impressionante e já tem Xvfb e `$DISPLAY` [configurado, então nenhuma outra configuração é necessária](https://circleci.com/docs/environment#browsers).

### AppVeyor

AppVeyor roda no Windows, tendo suporte para Selenium, Chomium, Electron e ferramentas similares de fora - configuração adicional é dispensada.
