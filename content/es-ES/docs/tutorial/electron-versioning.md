# Versionamiento de Electron

> Una mirada detallada en la política e implementación de las versiones.

Como desde la versión 2.0.0, Electron siguen [semver](#semver). El siguiente comando instalará la estructura estable más reciente de Electron:

```sh
npm install --save-dev electron
```

Para actualizar un proyecto existente para que use la última versión estable:

```sh
npm install --save-dev electron@latest
```

## Versión 1.x

La versión *< 2.0* de electron no se ajustó a las especificaciones de [semver](http://semver.org). Versiones mayores corresponden a cambios API para el usuario final. Las versiones menores corresponden a publicaciones mayores de Chromium. Versiones con parches corresponden a nuevas características o correcciones de errores. Mientras es convenientes para desarrolladores combinar características, esto crea problemas para desarrolladores de de aplicaciones que los clientes están viendo. Los ciclos de pruebas QA de las aplicaciones mayores como Slack, Stride, Temas, Skype, VS Code, Arom, y Desktop pueden ser duraderas y la estabilidad es un resultado muy deseado. Hay un riesgo grande adoptando nuevas características mientras se está tratando de absorber soluciones a errores.

Aquí hay un ejemplo de la estrategia 1.x:

![](../images/versioning-sketch-0.png)

Una aplicación desarrollada con `1.8.1` no puede tener la corrección de errores `1.8.3` sin absorber las características `1.8.2`, o devolviendo el arreglo y manteniendo la nueva línea de publicación.

## Versión 2.0 y superiores

Hay varios cambios mayores desde nuestra estrategia 1.x expresada abajo. Cada cambio tiene la intención de satisfacer las necesidades y prioridades de los desarrolladores y personas que mantienen la aplicación.

1. Uso estricto de semver
2. Introducción de las etiquetas de semver-compliant `-beta`
3. Introducción a [mensajes de compromiso convencionales](https://conventionalcommits.org/)
4. Rama de estabilización claramente definidas
5. The `master` branch is versionless; only stabilization branches contain version information

Reseñamos en detalle cómo funcionan las ramas git, cómo funcionan las etiquetas de npm, qué es lo que el desarrollador espera ver, y como se puede hacer cambios por la puerta de atras.

# semver

Desde 2.0, Electron seguiría semver.

Abajo hay una tabla construyendo un mapa explícitamente con los tipos las categorías correspondientes de semver (Ej: mayor, menor, parche).

* **Incrementos de versiones mayores** 
    * Actualización de versiones de Chromium
    * actualizaciones mayores de versión de node.js
    * Cambios de API por Electron
* **Incrementos de version menores** 
    * node.js minor version updates
    * Cambios de API por otras razones de Electron
* **Incrementos en la versión de parches** 
    * actualizaciones en la versión de parches de node.js
    * parches de chromium relacionados con el arreglo de problemas
    * Arreglo de problemas de electron

Note que la mayoría de las actualizaciones de chromium serán consideras como rompientes. Arreglos que pueden hacerse por la puerta de atrás es probable que sean escogidos como parches.

# Ramas estabilizadoras

Las ramas estabilizadoras son ramas que corren paralelas a la maestra, tomando solo un compromiso escogido que esté relacionado con la seguridad o la estabilidad. Estas ramas nunca son combinadas con la maestra.

![](../images/versioning-sketch-1.png)

Las ramas estabilizadoras siempre son lineas de versiones o **mayores** o **menores**, y nombradas según el siguiente modelo `$MAJOR-$MINOR-x` Ej. `2-0-x`.

Permitimos a varias ramas estabilizadoras existir simultaneamente e intentamos soportar por lo menos dos en paralelo todo el tiempo, los arreglos de seguridad por la puerta trasera son necesarios. ![](../images/versioning-sketch-2.png)

Líneas antiguas no serán soportadas por GitHub, pero otros grupos pueden tomar la propiedad y estabilizar por la puerta trasera y hacer arreglos de seguridad por si mismos. Incitamos que no se haga esto, pero reconocemos que haría la vida de varios desarrolladores de aplicación más fácil.

# Publicaciones beta y arreglo de problemas

Los desarrolladores quieren saber cuáles publicaciones son *seguras*. Hasta características que parecen inocentes pueden introducir grandes regresiones en aplicaciones complejas. Al mismo tiempo, quedarse con una versión arreglada es peligroso porque está ignorando parches de seguridad y arreglos de errores que pudieron salir desde su versión. Nuestra meta es permitir que el siguiente rango semver estandar en `package.json` :

* Usar `~2.0.0` para admitir solo arreglo relacionados con la estabilidad o seguridad de su publicación `2.0.0`.
* Use `^2.0.0` para admitir características no frágiles y *razonablemente estables* que trabajen tanto en seguridad como en arreglo de errores.

Lo que es importante del segundo punto es que las aplicaciones que usan `^` aún deben ser capaces de esperar cierto nivel de estabilidad. Para lograr esto, semver le permite a *identificador pre-lanzamiento* indicar que una versión particular no es *segura* o *estable* todavía.

Sin importar lo que elija, periódicamente tendrá que golpear su versión en su `package.json` como cambios que son un hecho en la vida útil de Chromium.

El proceso es el siguiente:

1. Todos los lanzamientos de linea mayores o menores empiezan con una etiqueta `-beta.N` para `N >= 1`. En ese punto, el conjunto de características está **bloqueado**. Esa línea de lanzamientos no admite características posteriores, y se concentra solo en seguridad y estabilidad. e.g. `2.0.0-beta.1`.
2. Arreglo errores, regresión de estos, y parches de seguridad pueden ser admitidos. Al hacerlo, una nueva beta es lanzada `N`. por ejemplo. `2.0.0-beta.2`
3. Si una versión beta en particular es *generalmente considerada* como estable, será relanzada como una estructura estable, cambiando solamente la información de la versión. Por ejemplo. `2.0.0`.
4. Si correcciones de errores futuros o parches de seguridad necesitan ser hechos una vez que el lanzamiento es estable, estos son aplicados y la versión *Con el parche* es incrementada según: ejemplo `2.0.1`.

For each major and minor bump, you should expect to see something like the following:

```text
2.0.0-beta.1
2.0.0-beta.2
2.0.0-beta.3
2.0.0
2.0.1
2.0.2
```

Un ejemplo del ciclo de vida en imágenes:

* Una nueva rama de lanzamientos es creada e incluye el último conjunto de características. Es publicada como `2.0.0-beta.1`. ![](../images/versioning-sketch-3.png)
* A bug fix comes into master that can be backported to the release branch. The patch is applied, and a new beta is published as `2.0.0-beta.2`. ![](../images/versioning-sketch-4.png)
* El beta es considerado *generalmente estable* y es publicado de nuevo como no-beta con el nombre `2.0.0`. ![](../images/versioning-sketch-5.png)
* Later, a zero-day exploit is revealed and a fix is applied to master. We backport the fix to the `2-0-x` line and release `2.0.1`. ![](../images/versioning-sketch-6.png)

Algunos ejemplos de como varios rangos semver recogerán nuevo lanzamientos:

![](../images/versioning-sketch-7.png)

# Funciones faltantes: Alphas y nightly

Nuestra estrategia tiene algunas compensaciones, que por ahora sentimos que son apropiadas. Más importante que las nuevas características en la maestra pueden tomar un tiempo antes de alcanzar una linea de lanzamiento estable. Si quiere tratar nuevas características inmediatamente, tendrá que construir Electron usted mismo.

Como consideración futura, podemos introducir uno o ambos de los siguientes:

* nightly se estructura fuera de la maestra; esto le permitiría a la gente probar nuevas características rápido y que dieran retroalimentación
* lanzamientos alpha que tiene perdida de estabilidad se vuelven beta; por ejemplo, le permitiría admitir nuevas características mientras un canal de estabilidad está en *alpha*

# Señales de característica

Banderas de características son prácticas comunes en Chromium, y son bien establecidas en el ecosistema de diseño web. En el contexto de Electron, banderas de características o **ramas suaves** deben seguir las siguientes propiedades:

* it is enabled/disabled either at runtime, or build-time; we do not support the concept of a request-scoped feature flag
* segmenta completamente nuevos y viejos rutas de códigos; refactorizando viejo código para soportar nuevas características *viola* el contrato de las banderas de características
* banderas de características son removidas eventualmente después de que la rama blanda es absorbida

Nosotros reconciliamos el código con bandera con nuestras estrategias de versiones como sigue:

1. no consideramos iteración en códigos de características con bandera en las ramas de estabilidad: hasta el uso juicioso de algunas características con bandera no está libre de riesgo
2. hay que romper el contracto API en el código de características con bandera sin golpear las versiones mayores. Código con bandera no se adhiere a los semver

# Semantic Commits

Buscamos aumentar la claridad en todos los niveles del proceso de actualización y publicación. Comenzando con `2.0.0` necesitaremos retirar solicitudes adheridas a la especificación [Conventional Commits](https://conventionalcommits.org/), la cual se puede resumir como:

* Commits that would result in a semver **major** bump must start with `BREAKING CHANGE:`.
* Commits that would result in a semver **minor** bump must start with `feat:`.
* Commits that would result in a semver **patch** bump must start with `fix:`.

* Permitimos el aplastamiento de commits, siempre que el mensaje aplastado se adhiera al formato de mensaje anterior.

* Es aceptable que algunas confirmaciones en una solicitud de extracción no incluyan un prefijo semántico, siempre que una confirmación posterior en la misma solicitud de extracción contenga un mensaje semántico significativo que lo abarque.

# Versionless `master`

* La rama `master` siempre contendrá `0.0.0-dev` en su `package.json`
* Las ramas de lanzamiento no se fusionan nuevamente con la rama maestra
* Las ramas de versión *do*contienen la versión correcta en su `package.json`