---
title: 'Electron 2.0 y más allá - Versionado semántico'
author: aguas subterráneas
date: '2017-12-06'
---

Una nueva versión mayor de Electron está en desarrollo, y con ella algunos cambios en nuestra estrategia de versiones. A partir de la versión 2.0.0, Electron se adhiere estrictamente a la versión semántica.

---

Este cambio significa que verás el salto de la versión principal con más frecuencia, y normalmente será una actualización importante de Chromium. Las versiones de parches también serán más estables, ya que ahora sólo contendrán correcciones de errores sin nuevas características.

**Incrementos de versiones major**

* Actualización de versiones de Chromium
* Actualizaciones en la version major de Node.js
* Cambios incompatibles con la API de Electron

**Incrementos de version minor**

* Actualizaciones en la version minor de Node.js
* Cambios compatibles de la API de Electron

**Incrementos en la versión patch**

* Actualizaciones en la version patch de Node.js
* parches de chromium relacionados con soluciones de problemas
* Solución a fallos de Electron

Dado a que los rangos de SemVer de Electron ahora serán mas significativos, recomendamos instalar Electron usando la opción de npm `--save-dev`, que prefijará su versión con `^`, manteniéndote de forma segura con las actualizaciones mirror y patch:

```sh
npm install --save-dev electron
```

Para desarrolladores interesados sólo en correcciones de errores, debe usar el prefijo semver de tilde por ejemplo `~2. .0`, que nunca introducirá nuevas características, sólo corrige para mejorar la estabilidad.

Para más detalles, vea [electronjs.org/docs/tutorial/electron-versioning](https://electronjs.org/docs/tutorial/electron-versioning).
