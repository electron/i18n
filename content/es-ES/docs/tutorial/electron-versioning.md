# Versionado de Electron

> Una mirada detallada en la política e implementación de las versiones.

Desde la versión 2.0.0, Electron sigue [semver](#semver). El siguiente comando instalará la compilación mas estable y reciente de Electron:

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

Hay varios cambios principales desde nuestra estrategia 1.x expresada abajo. Cada cambio tiene la intención de satisfacer las necesidades y prioridades de los desarrolladores/mantenedores y los desarrolladores de aplicaciones.

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

# Ramas estabilizadoras

Las ramas estabilizadoras son ramas que corren paralelas a la maestra, tomando solo un compromiso escogido que esté relacionado con la seguridad o la estabilidad. Estas ramas nunca son combinadas con la maestra.

![](../images/versioning-sketch-1.png)

Las ramas estabilizadoras siempre son lineas de versiones o **mayores** o **menores**, y nombradas según el siguiente modelo `$MAJOR-$MINOR-x` Ej. `2-0-x`.

Permitimos a varias ramas estabilizadoras existir simultaneamente e intentamos soportar por lo menos dos en paralelo todo el tiempo, los arreglos de seguridad por la puerta trasera son necesarios. ![](../images/versioning-sketch-2.png)

Líneas antiguas no serán soportadas por GitHub, pero otros grupos pueden tomar la propiedad y estabilizar por la puerta trasera y hacer arreglos de seguridad por si mismos. Incitamos que no se haga esto, pero reconocemos que haría la vida de varios desarrolladores de aplicación más fácil.

# Publicaciones beta y arreglo de problemas

Los desarrolladores quieren saber cuáles publicaciones son *seguras*. Hasta características que parecen inocentes pueden introducir grandes regresiones en aplicaciones complejas. Al mismo tiempo, quedarse con una versión arreglada es peligroso porque está ignorando parches de seguridad y arreglos de errores que pudieron salir desde su versión. Nuestra meta es permitir que el siguiente rango semver estandar en `package.json` :

- Usar `~2.0.0` para admitir solo arreglo relacionados con la estabilidad o seguridad de su publicación `2.0.0`.
- Use `^2.0.0` para admitir características no frágiles y *razonablemente estables* que trabajen tanto en seguridad como en arreglo de errores.

Lo que es importante del segundo punto es que las aplicaciones que usan `^` aún deben ser capaces de esperar cierto nivel de estabilidad. Para lograr esto, semver le permite a *identificador pre-lanzamiento* indicar que una versión particular no es *segura* o *estable* todavía.

Sin importar lo que elija, periódicamente tendrá que golpear su versión en su `package.json` como cambios que son un hecho en la vida útil de Chromium.

El proceso es el siguiente:

1. All new major and minor releases lines begin with a beta series indicated by semver prerelease tags of `beta.N`, p.e. `2.0.0-beta.1`. Después de la primera beta, las versiones beta que la sigan deben cumplir con las siguientes condiciones: 
    1. The change is backwards API-compatible (deprecations are allowed)
    2. The risk to meeting our stability timeline must be low.
2. If allowed changes need to be made once a release is beta, they are applied and the prerelease tag is incremented, e.g. `2.0.0-beta.2`.
3. If a particular beta release is *generally regarded* as stable, it will be re-released as a stable build, changing only the version information. p.e. `2.0.0`. After the first stable, all changes must be backwards-compatible bug or security fixes.
4. If future bug fixes or security patches need to be made once a release is stable, they are applied and the *patch* version is incremented e.g. `2.0.1`.

Specifically, the above means:

1. Admitting non-breaking-API changes early in the beta cycle is okay, even if those changes have the potential to cause moderate side-affects
2. Admitting feature-flagged changes, that do not otherwise alter existing code paths, at most points in the beta cycle is okay. Users can explicitly enable those flags in their apps.
3. Admitting features of any sort very late in the beta cycle is 

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

- Una nueva rama de lanzamientos es creada e incluye el último conjunto de características. Es publicada como `2.0.0-beta.1`. ![](../images/versioning-sketch-3.png)
- A bug fix comes into master that can be backported to the release branch. The patch is applied, and a new beta is published as `2.0.0-beta.2`. ![](../images/versioning-sketch-4.png)
- El beta es considerado *generalmente estable* y es publicado de nuevo como no-beta con el nombre `2.0.0`. ![](../images/versioning-sketch-5.png)
- Later, a zero-day exploit is revealed and a fix is applied to master. We backport the fix to the `2-0-x` line and release `2.0.1`. ![](../images/versioning-sketch-6.png)

Algunos ejemplos de como varios rangos semver recogerán nuevo lanzamientos:

![](../images/versioning-sketch-7.png)

# Funciones faltantes: Alphas y nightly

Nuestra estrategia tiene algunas compensaciones, que por ahora sentimos que son apropiadas. Más importante que las nuevas características en la maestra pueden tomar un tiempo antes de alcanzar una linea de lanzamiento estable. Si quiere tratar nuevas características inmediatamente, tendrá que construir Electron usted mismo.

Como consideración futura, podemos introducir uno o ambos de los siguientes:

- nightly se estructura fuera de la maestra; esto le permitiría a la gente probar nuevas características rápido y que dieran retroalimentación
- lanzamientos alpha que tiene perdida de estabilidad se vuelven beta; por ejemplo, le permitiría admitir nuevas características mientras un canal de estabilidad está en *alpha*

# Señales de característica

Banderas de características son prácticas comunes en Chromium, y son bien establecidas en el ecosistema de diseño web. En el contexto de Electron, banderas de características o **ramas suaves** deben seguir las siguientes propiedades:

- it is enabled/disabled either at runtime, or build-time; we do not support the concept of a request-scoped feature flag
- segmenta completamente nuevos y viejos rutas de códigos; refactorizando viejo código para soportar nuevas características *viola* el contrato de las banderas de características
- feature flags are eventually removed after the feature is released

# Semantic Commits

Buscamos aumentar la claridad en todos los niveles del proceso de actualización y publicación. Comenzando con `2.0.0` necesitaremos retirar solicitudes adheridas a la especificación [Conventional Commits](https://conventionalcommits.org/), la cual se puede resumir como:

- Commits that would result in a semver **major** bump must start their body with `BREAKING CHANGE:`.
- Commits that would result in a semver **minor** bump must start with `feat:`.
- Commits that would result in a semver **patch** bump must start with `fix:`.

- Permitimos el aplastamiento de commits, siempre que el mensaje aplastado se adhiera al formato de mensaje anterior.

- It is acceptable for some commits in a pull request to not include a semantic prefix, as long as the pull request title contains a meaningful encompassing semantic message.

# Versionless `master`

- La rama `master` siempre contendrá `0.0.0-dev` en su `package.json`
- Las ramas de lanzamiento no se fusionan nuevamente con la rama maestra
- Las ramas de versión *do*contienen la versión correcta en su `package.json`