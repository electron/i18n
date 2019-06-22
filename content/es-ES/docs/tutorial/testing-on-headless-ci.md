# Pruebas de sistemas de CI sin cabeceras (Travis CI, Jenkins)

Al estar basado en Chromium, Electron requiere un controlador para funcionar. If Chromium can't find a display driver, Electron will fail to launch - and therefore not executing any of your tests, regardless of how you are running them. Probar aplicaciones basadas en Electron en Travis, Circle, Jenkins o sistemas similares requiere un poco de configuración. En esencia, necesitamos un controlador de pantalla virtual.

## Configurando un servidor de pantalla virtual

Primero, instala [Xvfb](https://en.wikipedia.org/wiki/Xvfb). Es un framebuffer virtual, implementando el protocolo de servidor de pantalla X11 - realiza todas las operaciones gráficas en la memoria sin mostrar nada en el monitor, que es exactamente lo que necesitamos.

Entonces, crea una pantalla virtual Xvfb y exporta una variable de entorno llamada DISPLAY que apunta a ella. Chromium en electron buscará automáticamente por `$DISPLAY`, así que su aplicación no requerirá más configuraciones. Este paso puede ser automatizado con los comandos de Paul Betts [xvfb-maybe](https://github.com/paulcbetts/xvfb-maybe): Antepone tus comandos de prueba con `xvfb-maybe` y la pequeña herramienta automáticamente configurará Xvfb, si es necesario para el sistema actual. En Windows o macOS, no hará nada.

```sh
## On Windows or macOS, this invokes electron-mocha
## On Linux, if we are in a headless environment, this will be equivalent
## to xvfb-run electron-mocha ./test/*.js
xvfb-maybe electron-mocha ./test/*.js
```

### Travis CI

En Travis, su `. travis.yml` debería verse más o menos así:

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

Para Jenkins, un [plugin de Xvfb está disponible](https://wiki.jenkins-ci.org/display/JENKINS/Xvfb+Plugin).

### Circle CI

Circle CI es impresionante y tiene xvfb y `$DISPLAY` [ya configurados, por lo que no es necesaria ninguna configuración adicional](https://circleci.com/docs/environment#browsers).

### AppVeyor

AppVeyor corre en Windows, soportando Selenium, Chromium, electron y herramientas fuera de la caja similares - no se requiere configuración.