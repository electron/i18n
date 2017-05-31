# Seguridad, capacidades nativas y su responsabilidad

Como desarrolladores web, generalmente disfrutamos de la red del explorador de seguridad fuerte - los riesgos asociados con el código que escribimos son relativamente pequeños. Nuestros sitios web se concede limitado energías en un sandbox, y confiamos en que nuestros usuarios disfruten de un navegador construido por un gran equipo de ingenieros que sea capaces de responder rápidamente a las amenazas de seguridad descubiertas recientemente.

Cuando se trabaja con la electrónica, es importante entender que el electrón no es un navegador web. Te permite crear numerosas aplicaciones con tecnologías web familiares, pero su código tiene mucho mayor poder. JavaScript puede acceder el sistema de archivos y shell de usuario. Esto le permite crear aplicaciones nativas de alta calidad, pero los riesgos de seguridad inherentes de la escala con los poderes adicionales otorgados a su código.

Con esto en mente, ten en cuenta que mostrar contenido arbitrario de poses de untrusted fuentes un grave riesgo de seguridad que electrón no está diseñado manejar. De hecho, las más populares aplicaciones de electrón (átomo, holgura, código de Visual Studio, etcetera) Mostrar principalmente contenido local (o contenido remoto confiable y seguro sin integración de nodos) – si la aplicación ejecuta código desde una fuente en línea, es su responsabilidad asegurar que el código no es malicioso.

## Reportando problemas de seguridad

Para obtener información sobre cómo revelar correctamente una vulnerabilidad de electrón, ver [SECURITY.md](https://github.com/electron/electron/tree/master/SECURITY.md)

## Actualizaciones y problemas de seguridad cromo

Mientras que el electrón se esfuerza para apoyar nuevas versiones de cromo tan pronto como sea posible, los desarrolladores deben ser conscientes que actualizar es una empresa seria - con edición de mano decenas o incluso cientos de archivos. Dados los recursos y contribuciones disponibles en la actualidad, electrónica a menudo no estará en la versión más reciente de cromo, rezagados ya sea por días o semanas.

Creemos que nuestro sistema actual de actualizar el componente de cromo golpea un equilibrio adecuado entre los recursos que tenemos disponibles y las necesidades de la mayoría de aplicaciones construcción sobre el framework. Definitivamente estamos interesados en saber más acerca de casos de uso específicos de la gente que construye cosas sobre electrónica. Solicitudes de extracción y contribuciones apoyando este esfuerzo son siempre muy bienvenidas.

## Haciendo caso omiso sobre el Consejo

Existe un problema de seguridad cada vez que usted recibe el código de un destino remoto y ejecuta localmente. Como ejemplo, considere un sitio Web remoto se muestra en una ventana del navegador. Si un atacante logra de alguna manera cambiar dicho contenido (ya sea atacando directamente a la fuente, o por estar entre su aplicación y el destino real), será capaces de ejecutar código nativo en la máquina del usuario.

> :warning: bajo ninguna circunstancia se debe cargar y ejecutar código remoto con integración del nodo activado. En cambio, utilizan archivos sólo locales (empaquetados junto con su solicitud) para ejecutar código de nodo. Para mostrar contenido remoto, utilice la etiqueta de `webview` y asegúrese de desactivar el `nodeIntegration`.

#### Lista de verificación

Esto no es a prueba de balas, pero al menos, usted debería tratar de los siguientes:

* Sólo mostrar contenido seguro (https)
* Deshabilitar la integración de nodos en todos los renders que mostrar contenido remoto (configuración de `nodeIntegration` para `false` en `webPreferences`)
* Habilitar aislamiento de contexto en todos los renders que mostrar contenido remoto (configuración de `contextIsolation` para `true` en `webPreferences`)
* Utilice `ses.setPermissionRequestHandler ()` en todas las sesiones que cargan contenido remoto
* Deshabilitar `webSecurity`. Deshabilitarlo deshabilitará la política del mismo origen.
* Definir un [`Content-seguridad-Policy`](http://www.html5rocks.com/en/tutorials/security/content-security-policy/) y utilizar normas restrictivas (es decir, `script-fuente ` 'uno mismo')
* [Override y desactivar el `eval`](https://github.com/nylas/N1/blob/0abc5d5defcdb057120d726b271933425b75b415/static/index.js#L6-L8), que permite cadenas ser ejecutado como código.
* No establezca `allowRunningInsecureContent` en true.
* No permite `experimentalFeatures` o `experimentalCanvasFeatures` a menos que sepas lo que estás haciendo.
* No utilice `blinkFeatures` a menos que sepas lo que estás haciendo.
* WebViews: No agregue el atributo `nodeintegration`.
* WebViews: No use `disablewebsecurity`
* WebViews: No use `allowpopups`
* WebViews: No utilice `insertCSS` o `executeJavaScript` con control remoto CSS/JS.

De nuevo, esta lista sólo minimiza el riesgo, no quitarlo. Si su objetivo es mostrar una página web, un navegador será una opción más segura.