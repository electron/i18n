# Liberación

Este documento describe el proceso para lanzar una nueva versión del Electron.

## Notas de la versión de compilación

El proceso actual es mantener un archivo local, hacer el seguimiento de cambios notables como tirar las solicitudes se fusionan. Ejemplos de cómo dar formato a las notas, ver las versiones anteriores de [the lanza page](https://github.com/electron/electron/releases).

## Crear una rama temporal

Crear una nueva rama de `master` llamado `release`.

```sh
lanzamiento de Git checkout master git pull git checkout -b
```

Esta rama se crea como una precaución para evitar que cualquier combinados bandas escondidas en un lanzamiento entre el momento en la rama temporal se crea y las estructuras del CI son completas.

## La versión

Ejecute el script `bump-version`, `major` paso, `minor` o `patch` como argumento:

```sh
MNP ejecutar bump-versión - origen de parche git push cabeza
```

Esto va topetón el número de versión en varios archivos. Ver [this tope commit](https://github.com/electron/electron/commit/78ec1b8f89b3886b856377a1756a51617bc33f5a) para un ejemplo.

Comunicados de la mayoría será a nivel de `patch`. Actualizaciones de Chrome u otros cambios importantes deben usar `minor`. Para obtener más información, consulte [electron versioning](/docs/tutorial/electron-versioning.md).

## Editar el proyecto de liberación

  1. Visite [the lanza page](https://github.com/electron/electron/releases) y verás un nuevo proyecto de liberación con notas de la versión de marcador de posición.
  2. El lanzamiento de editar y añadir notas.
  3. Haga clic en 'guardar borrador'. **Do no, haga clic en 'Publicar comunicado'!**
  4. Espere a que todas las estructuras pasar. :hourglass_flowing_sand:

## Fusionar la rama temporal

Combinar el reverso temporal en master, sin crear un commit de combinación:

```sh
git fusión liberación maestro--no-commit git push origen
```

Si esto falla, rebase con master y recompilar:

```sh
comprobación de git git pull lanzar origen de git rebase master git push cabeza
```

## Ejecutar la versión de depuración local

Ejecute la versión de depuración local para verificar que usted realmente está construyendo la versión que desea. A veces creías que estabas haciendo un lanzamiento para una nueva versión, pero no estás realmente.

```sh
nueva gestión pública ejecute build MNP start
```

Verifique que la ventana muestra la versión actual.

## Variables de entorno del sistema

Usted necesitará configurar las siguientes variables de entorno para publicar un comunicado. Pida a otro miembro del equipo estas credenciales.

- `ELECTRON_S3_BUCKET`
- `ELECTRON_S3_ACCESS_KEY`
- `ELECTRON_S3_SECRET_KEY`
- `ELECTRON_GITHUB_TOKEN` - un token de acceso de personal con alcance "repo".

Sólo necesita hacer esto una vez.

## Publicar la versión

Este script será descargar los binarios y generar los encabezados de nodo y el vinculador .lib utilizado en Windows por nodo-gyp para compilar módulos nativos.

```sh
ejecutar lanzamiento de NGP
```

Nota: Muchas distribuciones de Python nave aún con los viejos certificados HTTPS. Se puede ver un `InsecureRequestWarning`, pero puede tenerse en cuenta.

## Eliminar la rama temporal

```sh
liberar git checkout master git branch -D origen de empuje de # eliminar sucursal git: # eliminar rama remota
```