# Testing on Headless CI Systems (Travis CI, Jenkins)

Sendo baseado no Chromium, o Electron necessita de um driver de vídeo para rodar. If Chromium can't find a display driver, Electron will fail to launch - and therefore not executing any of your tests, regardless of how you are running them. Para testar aplicativos com base no Electron em sistemas como Travis, Circle, Jenkins ou similares requer que algumas configurações sejam feitas. Basicamente, precisamos usar um driver de vídeo virtual.

## Configurando o Servidor de Vídeo Virtual

Primeiramente instale o [Xvfb](https://en.wikipedia.org/wiki/Xvfb). É um framebuffer que implementa o protocolo de servidor de vídeo do X11 - ele realiza todas as operações gráficas na memória sem mostrar nenhuma mensagem, o que é exatamente o que precisamos.

Then, create a virtual Xvfb screen and export an environment variable called DISPLAY that points to it. No Electron o Chromium irá procurar automaticamente pela variável `$DISPLAY`, sendo assim dispensáveis configurações adicionais em seu aplicativo. Esta etapa pode ser automatizada com o pacote [xvfb-maybe](https://github.com/anaisbetts/xvfb-maybe): Preceda seus comandos de teste com `xvfb-maybe` e a ferramenta fará a configuração automaticamente do Xvfb, se requerido pelo sistema. On Windows or macOS, it will do nothing.

```sh
## On Windows or macOS, this invokes electron-mocha
## On Linux, if we are in a headless environment, this will be equivalent
## to xvfb-run electron-mocha ./test/*.js
xvfb-maybe electron-mocha ./test/*.js
```

### Travis CI

No Travis, o seu `.travis;yml` deverá se parecer basicamente desta forma:

```yml
addons:
  apt:
    packages:
      - xvfb

install:
  - export DISPLAY=':99.0'
  - Xvfb :99 -screen 0 1024x768x24 > /dev/null 2>&1 &
```

### Jenkins

Para o Jenkins, um [plugin Xvfb está disponível](https://wiki.jenkins-ci.org/display/JENKINS/Xvfb+Plugin).

### Circle CI

Circle CI is awesome and has Xvfb and `$DISPLAY` [already set up, so no further configuration is required](https://circleci.com/docs/environment#browsers).

### AppVeyor

AppVeyor roda no Windows, tendo suporte para Selenium, Chomium, Electron e ferramentas similares de fora - configuração adicional é dispensada.
