---
title: Documentación de Electron
author: señor
date: '04-06-2015'
---

Esta semana hemos dado a la documentación de Electron un hogar en [electronjs.org](https://electronjs.org). Puedes visitar [/docs/latest](https://electronjs.org/docs/latest) para ver el último conjunto de documentos. También mantendremos versiones de documentos antiguos, así que podrás visitar [/docs/vX.XX.X](https://electronjs.org/docs/v0.26.0) para los documentos que se relacionan con la versión que estás usando.

---

Puedes visitar [/docs](https://electronjs.org/docs) para ver qué versiones están disponibles o [/docs/all](https://electronjs.org/docs/all) para ver la última versión de los documentos en una sola página (agradable para `cmd` + `f` búsquedas).

If you'd like to contribute to the docs content, you can do so in the [Electron repository](https://github.com/electron/electron/tree/main/docs), where the docs are fetched from. Los obtenemos por cada versión menor y los añadimos al [repositorio de Electron](http://github.com/electron/electronjs.org), que está hecho con [Jekyll](http://jekyllrb.com).

Si está interesado en aprender más sobre cómo extraemos los documentos de un repositorio a otro seguir leyendo a continuación. De lo contrario, ¡disfruta de los [documentos](https://electronjs.org/latest)!

## Los bits técnicos

Estamos preservando la documentación dentro del repositorio núcleo de Electron tal como está. Esto significa que [electron/electron](http://github.com/electron/electron) siempre tendrá la última versión de la documentación. Cuando se liberan nuevas versiones de Electron las duplicamos en el repositorio del sitio web de Electron [electron/electronjs.org](http://github.com/electron/electronjs.org).

### script/docs

Para obtener los documentos ejecutamos un [script](https://github.com/electron/electronjs.org/blob/0205b5ab26c96a95121bc564c5824f92108677e0/script/docs) con una interfaz de línea de comandos de `script/docs vX.XX.` con o sin la opción `--latest` (dependiendo de si la versión que está importando es la última versión). Nuestro script [para obtener documentos](https://github.com/electron/electronjs.org/blob/0205b5ab26c96a95121bc564c5824f92108677e0/lib/fetch-docs.js) utiliza algunos módulos interesantes de Node:

- [`nugget`](http://npmjs.com/nugget) para [obtener el tarball de lanzamiento](https://github.com/electron/electronjs.org/blob/0205b5ab26c96a95121bc564c5824f92108677e0/lib/fetch-docs.js#L40-L43) y guardarlo en un directorio temporal.
- [`gunzip-maybe`](http://npmsjs.com/gunzip-maybe) a [descomprimir el tarball](https://github.com/electron/electronjs.org/blob/0205b5ab26c96a95121bc564c5824f92108677e0/lib/fetch-docs.js#L95).
- [`tar-fs`](http://npmjs.com/tar-fs) para [streaming solo el directorio `/docs`](https://github.com/electron/electronjs.org/blob/0205b5ab26c96a95121bc564c5824f92108677e0/lib/fetch-docs.js#L63-L65) desde el tarball y [filtrando y procesando los archivos](https://github.com/electron/electronjs.org/blob/0205b5ab26c96a95121bc564c5824f92108677e0/lib/fetch-docs.js#L68-L78) (con la ayuda de [`throughh2`](http://npmjs.com/through2)) para que funcionen bien con nuestro sitio Jekyll (más en eso abajo).

[Pruebas](https://github.com/electron/electronjs.org/tree/gh-pages/spec) nos ayudan a saber que todos los pedazos desembarcaron como se esperaba.

### Jekyl

El sitio web Electron es un sitio Jekyll y hacemos uso de la función de [Colecciones](http://jekyllrb.com/docs/collections/) para los documentos con una estructura como esta:

```bash
electron.atom.io
Ningés; _docs
    tótpico
    tópico
 tópico
 tópicamente v0.27.0
    tótpico
    tópico
    tórax, así que
```

#### Cuadro frontal

Para que Jekyll renderice cada página necesita al menos un asunto frontal vacío. Vamos a utilizar la materia frontal en todas nuestras páginas, así que mientras estamos transmitiendo el directorio `/docs` que verificamos para ver si un archivo es el `README. d` archivo (en cuyo caso recibe una configuración de materia frontal) o si es cualquier otro archivo con una extensión markdown (en cuyo caso recibe una materia frontal ligeramente diferente).

Cada página recibe este conjunto de variables de la materia principal:

```yaml
---
version: v0.27.0
category: Tutorial
title: 'Inicio rápido'
source_url: 'https://github.com/electron/electron/blob/master/docs/tutorial/quick-start.md'
---
```

El `README. d` obtiene un enlace `permanente` adicional para que tenga una URL con una raíz común de `índice. tml` en lugar de un incómodo `/readme/`.

```yaml
permalink: /es_ES/docs/v0.27.0/index.html
```

#### Configuración y redirecciones

En el archivo `_config. ml` archivo una variable `latest_version` se establece cada vez que se utiliza la bandera `--latest` al recuperar documentos. También añadimos una lista de todas las versiones que han sido añadidas al sitio así como el enlace permanente que nos gustaría para toda la colección de documentos.

```yaml
latest_version: v0.27.0
available_versions:
    - v0.27.0
colecciones:
    docs: {output: true, permalink: '/docs/:path/'}
```

El archivo `más tarde. d` en la raíz de nuestro sitio está vacío excepto por esta materia frontal que permite a los usuarios ver el índice (alias `README`) de la última versión de documentos visitando esta URL, [electrón. tom.io/docs/latest](https://electronjs.org/docs/latest), en lugar de usar el último número de versión específicamente (aunque también puedes hacer eso).

```yaml
---
permalink: /es/docs/latest/
redirect_to: /docs/{{ site.data.releases[0].version }}
---
```

#### Diseños

En la plantilla de diseño de `docs.html` usamos condicionales para mostrar u ocultar información en el encabezado y migas bread.

```html
{% raw %}
{% if page.category != 'ignore' %}
<h6 class='docs-breadcrumb'>{{ page.version }} / {{ page.category }}
  {% if page.title != 'README' %} / {{ page.title }} {% endif %}</h6>
{% endif %}
{% endraw %}
```

Para crear una página que muestre las versiones que están disponibles, simplemente bucle a través de la lista en nuestra configuración de un archivo, `versiones. d`, en la raíz del sitio. También le damos a esta página un enlace permanente: `/docs/`

```html
{% raw %}
{% for version in site.available_versions %}
- [{{ version }}](/docs/{{ version }})
{% endfor %}
{% endraw %}
```

¡Espero que hayas disfrutado de estos trozos técnicos! Si estás interesado en más información sobre el uso de Jekyll para sitios de documentación, revisa cómo el equipo de documentación de GitHub publica [documentos de GitHub en Jekyll](https://github.com/blog/1939-how-github-uses-github-to-document-github).
