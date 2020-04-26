# Versionado de Electron

> Una mirada detallada en la política e implementación de las versiones.

As of version 2.0.0, Electron follows [semver](#semver). The following command will install the most recent stable build of Electron:

```sh
npm install --save-dev electron
```

Para actualizar un proyecto existente para que use la última versión estable:

```sh
npm install --save-dev electron@latest
```

## Versión 1.x

Las versiones de electrón *< 2.0* no se ajustan a la especificación [semver](http://semver.org): las versiones principales correspondían a cambios en la API para el usuario final, las versiones menores correspondían a versiones principales de Chromium, y las versiones de parches correspondían a nuevas características y correcciones de errores. Mientras que es conveniente para los desarrolladores combinar características, crea problemas para los desarrolladores de aplicaciones orientadas al cliente. Los ciclos de pruebas QA de aplicaciones importantes como Slack, Stride, Teams, Skype, VS Code, Atom, y Desktop pueden ser muy completos y la estabilidad es un resultado muy deseado. Hay un riesgo grande adoptando nuevas características mientras se está tratando de asimilar las soluciones de errores.

Aquí hay un ejemplo de la estrategia 1.x:

![](../images/versioning-sketch-0.png)

Una aplicación desarrollada con `1.8.1` no puede tener la solución de errores `1.8.3` sin asimilar las características `1.8.2`, o portando la solución y manteniendo un nueva línea de publicación.

## Versión 2.0 y superiores

There are several major changes from our 1.x strategy outlined below. Each change is intended to satisfy the needs and priorities of developers/maintainers and app developers.

1. Uso estricto de semver
2. Introducción de las etiquetas de semver-compliant `-beta`
3. Introducción a [mensajes de compromiso convencionales](https://conventionalcommits.org/)
4. Ramas estabilizadoras bien definidas
5. La rama `master` no tiene versiones: solo las ramas de estabilización contienen información de las versiones

Reseñamos en detalle cómo funcionan las ramas git, cómo funcionan las etiquetas de npm, qué es lo que los desarrolladores esperan ver, y como se pueden portar cambios a versiones anteriores.

# semver

Desde 2.0, Electron seguirá semver.

A continuación hay una tabla relacionado explícitamente los tipos de cambios con sus correspondientes categorías de semver (Ej: Major, Minor, Patch).

| Incrementos de versiones major                 | Incrementos de version minor                   | Incrementos en la versión patch                              |
| ---------------------------------------------- | ---------------------------------------------- | ------------------------------------------------------------ |
| Cambios incompatibles con la API de Electron   | Cambios compatibles de la API de Electron      | Solución a fallos de Electron                                |
| Actualizaciones en la version major de Node.js | Actualizaciones en la version minor de Node.js | Actualizaciones en la version patch de Node.js               |
| Actualización de versiones de Chromium         |                                                | parches de chromium relacionados con soluciones de problemas |


Note that most Chromium updates will be considered breaking. Fixes that can be backported will likely be cherry-picked as patches.

# Ramas de estabilización

Stabilization branches are branches that run parallel to master, taking in only cherry-picked commits that are related to security or stability. These branches are never merged back to master.

![](../images/versioning-sketch-1.png)

Desde Electron 8, las ramas de estabilización son siempre de las líneas de versión **mayor** y se nombran contra la siguiente plantilla `$MAJOR-x-y` p.e. `8-x-y`.  Antes de eso nosotros usabamos la lineas de version **minor** y las nombrabamos como `$MAJOR-$MINOR-x` p.e. `2-0-x`

Permitimos a varias ramas estabilizadoras existir simultaneamente e intentamos soportar por lo menos dos en paralelo todo el tiempo, los arreglos de seguridad por la puerta trasera son necesarios. ![](../images/versioning-sketch-2.png)

Líneas antiguas no serán soportadas por GitHub, pero otros grupos pueden tomar la propiedad y estabilizar por la puerta trasera y hacer arreglos de seguridad por si mismos. Incitamos que no se haga esto, pero reconocemos que haría la vida de varios desarrolladores de aplicación más fácil.

# Publicaciones beta y arreglo de problemas

Los desarrolladores quieren saber cuáles publicaciones son _seguras_. Hasta características que parecen inocentes pueden introducir grandes regresiones en aplicaciones complejas. Al mismo tiempo, quedarse con una versión arreglada es peligroso porque está ignorando parches de seguridad y arreglos de errores que pudieron salir desde su versión. Nuestra meta es permitir que el siguiente rango semver estandar en `package.json` :

* Usar `~2.0.0` para admitir solo arreglo relacionados con la estabilidad o seguridad de su publicación `2.0.0`.
* Use `^2.0.0` para admitir características no frágiles y _razonablemente estables_ que trabajen tanto en seguridad como en arreglo de errores.

Lo que es importante del segundo punto es que las aplicaciones que usan `^` aún deben ser capaces de esperar cierto nivel de estabilidad. To accomplish this, semver allows for a _pre-release identifier_ to indicate a particular version is not yet _safe_ or _stable_.

Sin importar lo que elija, periódicamente tendrá que golpear su versión en su `package.json` como cambios que son un hecho en la vida útil de Chromium.

El proceso es el siguiente:

1. All new major and minor releases lines begin with a beta series indicated by semver prerelease tags of `beta.N`, e.g. `2.0.0-beta.1`. Después de la primera beta, las versiones beta que la sigan deben cumplir con las siguientes condiciones:
    1. El cambio es compatible con API hacia atrás (se permiten las deprecaciones)
    2. El riesgo de cumplir con nuestro cronograma de estabilidad debe ser bajo.
2. Si es necesario hacer cambios permitidos una vez que la versión es beta, se aplican los cambios y la etiqueta prerelease is encrementado, Por ejemplo `2.0.0-beta.2`.
3. Si una versión beta en particular es _generally regarded_ como estable, será reenviado como una versión estable, cambiando sólo la información de la versión. p.e. `2.0.0`. Después le primera versión estable, todos los cambios deben ser compatibles con versiones anteriores, correcciones de error o de seguridad.
4. Si correcciones futura de errores o parches de seguridad se hacen deben una vez que la versión sea estable, esas correcciones son aplicadas y la versión _patch_ es incrementada, Por ejemplo `2.0.1`.

Específicamente, lo anterior significa:

1. Admitir cambios no-rompibles de la API antes de la semana 3 en el ciclo beta está bien, incluso si esos cambios tienen el potencial de causar efectos secundarios moderados
2. Admitting feature-flagged changes, that do not otherwise alter existing code paths, at most points in the beta cycle is okay. Users can explicitly enable those flags in their apps.
3. Admitting features of any sort after Week 3 in the beta cycle is 👎 without a very good reason.

Por cada cambio mayor y menor, debería esperar ver algo como lo siguiente:

```plaintext
2.0.0-beta.1
2.0.0-beta.2
2.0.0-beta.3
2.0.0
2.0.1
2.0.2
```

Un ejemplo del ciclo de vida en imágenes:

* A new release branch is created that includes the latest set of features. It is published as `2.0.0-beta.1`. ![](../images/versioning-sketch-3.png)
* A bug fix comes into master that can be backported to the release branch. The patch is applied, and a new beta is published as `2.0.0-beta.2`. ![](../images/versioning-sketch-4.png)
* El beta es considerado _generalmente estable_ y es publicado de nuevo como no-beta con el nombre `2.0.0`. ![](../images/versioning-sketch-5.png)
* Later, a zero-day exploit is revealed and a fix is applied to master. We backport the fix to the `2-0-x` line and release `2.0.1`. ![](../images/versioning-sketch-6.png)

Algunos ejemplos de como varios rangos semver recogerán nuevo lanzamientos:

![](../images/versioning-sketch-7.png)

# Funciones faltantes: Alfas
Nuestra estrategia tiene algunas compensaciones, que por ahora sentimos que son apropiadas. Más importante que las nuevas características en la maestra pueden tomar un tiempo antes de alcanzar una linea de lanzamiento estable. Si quiere tratar nuevas características inmediatamente, tendrá que construir Electron usted mismo.

Como consideración futura, podemos introducir uno o ambos de los siguientes:

* lanzamientos alpha que tiene perdida de estabilidad se vuelven beta; por ejemplo, le permitiría admitir nuevas características mientras un canal de estabilidad está en _alpha_

# Señales de característica
Banderas de características son prácticas comunes en Chromium, y son bien establecidas en el ecosistema de diseño web. En el contexto de Electron, banderas de características o **ramas suaves** deben seguir las siguientes propiedades:

* está habilitado/deshabilitado en tiempo de ejecución o en tiempo de construcción, no soportamos el concepto de una bandera de característica alcance por solicitud
* segmenta completamente nuevos y viejos rutas de códigos; refactorizando viejo código para soportar nuevas características _viola_ el contrato de las banderas de características
* las banderas de características eventualmente son removidas después de que la característica es lanzada

# Commits semánticos

Buscamos aumentar la claridad en todos los niveles del proceso de actualización y publicación. Comenzando con `2.0.0` necesitaremos retirar solicitudes adheridas a la especificación [Conventional Commits](https://conventionalcommits.org/), la cual se puede resumir como:

* Los commits que resultarían en un **major** semver deben empezar su cuerpo con `BREAKING CHANGE:`.
* Los commits que resultarían en un **minor** sember deben empezar con `feat:`.
* Los commits que resultarían en un **patch** semver deben empezar con `fix:`.

* Permitimos el aplastamiento de commits, siempre que el mensaje aplastado se adhiera al formato de mensaje anterior.
* Es aceptable que algunos compromisos en una solicitud de pull no incluyan un prefijo semántico, siempre que el título de pull request contenga un mensaje semántico significativo.

# Versioned `master`

- La rama `master` siempre contendrá la siguiente versión mayor `X.0.0-nightly.DATE` en su `package.json`
- Las ramas de lanzamiento no se fusionan nuevamente con la rama maestra
- Las ramas de versión _do_contienen la versión correcta en su `package.json`
- As soon as a release branch is cut for a major, master must be bumped to the next major.  I.e. `master` is always versioned as the next theoretical release branch
