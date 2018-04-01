# Testing on Headless CI Systems (Travis CI, Jenkins)

Sendo baseado no Chromium, o Electron necessita de um driver de vídeo para rodar. Se o Chromium não conseguir encontrar um driver de vídeo, o Electron simplesmente não irá iniciar. Para testar aplicativos com base no Electron em sistemas como Travis, Circle, Jenkins ou similares requer que algumas configurações sejam feitas. Basicamente, precisamos usar um driver de vídeo virtual.

## Configurando o Servidor de Vídeo Virtual

Primeiramente instale o [Xvfb](https://en.wikipedia.org/wiki/Xvfb). É um framebuffer que implementa o protocolo de servidor de vídeo do X11 - ele realiza todas as operações gráficas na memória sem mostrar nenhuma mensagem, o que é exatamente o que precisamos.

Por fim, cria uma tela xvfb virtual e exporta uma variável de ambiente designada DISPLAY que direciona para si mesma. No Electron o Chromium irá procurar automaticamente pela variável `$DISPLAY`, sendo assim dispensáveis configurações adiciionais em seu aplicativo. Este passo pode ser automatizado com o pacote [xvfb-maybe](https://github.com/paulcbetts/xvfb-maybe) de Paul Betts. Para usa-lo, adicione antes dos seus comandos de testes a tag `xvfb-maybe` e a ferramenta irá configurar automaticamente o xvfb caso o sistema necessite esta configuração. On Windows or macOS, it will simply do nothing.

```sh
## On Windows or macOS, this just invokes electron-mocha
## On Linux, if we are in a headless environment, this will be equivalent
## to xvfb-run electron-mocha ./test/*.js
xvfb-maybe electron-mocha ./test/*.js
```

### Travis CI

On Travis, your `.travis.yml` should look roughly like this:

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

For Jenkins, a [Xvfb plugin is available](https://wiki.jenkins-ci.org/display/JENKINS/Xvfb+Plugin).

### Circle CI

Circle CI is awesome and has xvfb and `$DISPLAY` [already setup, so no further configuration is required](https://circleci.com/docs/environment#browsers).

### AppVeyor

AppVeyor runs on Windows, supporting Selenium, Chromium, Electron and similar tools out of the box - no configuration is required.