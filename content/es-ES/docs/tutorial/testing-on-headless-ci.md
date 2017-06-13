# Pruebas de sistemas de CI sin cabeza (Travis CI, Jenkins)

Está basado en Chromium, electrón requiere un controlador para funcionar. Si el cromo no puede encontrar un controlador de pantalla, electrón simplemente dejará de lanzamiento - y por lo tanto no ejecutar cualquiera de las pruebas, independientemente de cómo se ejecuta. Prueba aplicaciones basadas en electrónica en Travis, círculo, Jenkins o sistemas similares, por tanto, requiere un poco de configuración. En esencia, necesitamos utilizar un controlador de pantalla virtual.

## Configuración del servidor Virtual Display

En primer lugar, instale [Xvfb](https://en.wikipedia.org/wiki/Xvfb). Es un framebuffer virtual, implementar el X11 protocolo de servidor - la exhibición realiza todas las operaciones gráficas en memoria sin mostrar ninguna pantalla de salida, que es exactamente lo que necesitamos.

Entonces, crear una pantalla virtual xvfb y exportar una variable de entorno llamada pantalla que apunta a él. Cromo en electrón automáticamente buscará `$DISPLAY`, así que no hay más configuración de su aplicación se requiere. Este paso puede ser automatizado con[xvfb-maybe](https://github.com/paulcbetts/xvfb-maybe) de Paul Betts: anteponga a los comandos prueba `xvfb-maybe` y el pequeño instrumento configurará automáticamente xvfb, si es requerido por el sistema actual. En Windows o macOS, simplemente no hará nada.

    ## En Windows o macOS, esto sólo invoca electrón-mocha ## en Linux, si estamos en un entorno sin cabeza, esto será equivalente ## a xvfb-gestión electrónica-mocha./test/*.js xvfb-quizás electrón-mocha./test/*.js
    

### Travis CI

En Travis, su `.travis.yml` debe ser aproximadamente:

```yml
addons: apt: paquetes:-xvfb instalar:-export DISPLAY = ':99.0' - Xvfb: 99 - pantalla 0 1024 x 768 x 24 >/dev/null 2>&1 &
```

### Jenkins

Para Jenkins, un plugin de [Xvfb es available](https://wiki.jenkins-ci.org/display/JENKINS/Xvfb+Plugin).

### Círculo de CI

Círculo de CI es impresionante y tiene xvfb y `$DISPLAY` configuración de[already, así required](https://circleci.com/docs/environment#browsers) no es ninguna configuración adicional.

### AppVeyor

AppVeyor funciona en Windows, soporte de selenio, cromo, electrónica y herramientas similares fuera de la caja - no es necesaria ninguna configuración.