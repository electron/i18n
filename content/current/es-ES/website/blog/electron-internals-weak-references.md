---
title: 'Internacionales de Electron&#58; Referencias débiles'
author: zcbenz
date: '20-09-2016'
---

Como lenguaje con recolección de basura, JavaScript libera a los usuarios de administrar los recursos manualmente. Pero como Electron aloja este entorno, tiene que ser muy cuidadoso evitando tanto pérdidas de memoria como de recursos.

Esta publicación introduce el concepto de referencias débiles y cómo se utilizan para gestionar recursos en Electron.

---

## Referencias débiles

En JavaScript, cada vez que asignas un objeto a una variable, estás añadiendo una referencia al objeto. Mientras haya una referencia al objeto, siempre se mantendrá en la memoria. Una vez que todas las referencias al objeto han desaparecido, i.e. allí ya no hay variables que almacenen el objeto, el motor de JavaScript recuperará la memoria en la próxima recolección de basura.

Una referencia débil es una referencia a un objeto que te permite obtener el objeto sin realizar si será basura recolectada o no. También recibirá notificación cuando el objeto sea recolectado en la basura. Entonces es posible administrar recursos con JavaScript.

Usando la clase `NativeImage` en Electron como ejemplo, cada vez que llamas al `nativeImage. reate()` API, se devuelve una instancia de `NativeImage` y es almacenar los datos de la imagen en C++. Una vez que haya terminado con la instancia y el motor JavaScript (V8) ha recolectado la basura del objeto, el código en C++ será llamado para liberar los datos de imagen en la memoria, por lo que no hay necesidad de que los usuarios gestionen esto manualmente.

Otro ejemplo es [el problema desaparecido de la ventana](https://electronjs.org/docs/faq/#my-apps-windowtray-disappeared-after-a-few-minutes), cuál muestra vistivamente cómo se recolecta la basura cuando todas las referencias a ella se han ido.

## Prueba de referencias débiles en Electron

No hay forma de probar directamente referencias débiles en JavaScript puro, ya que el idioma no tiene una forma de asignar referencias débiles. La única API en JavaScript relacionado con referencias débiles es [WeakMap](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap), pero dado que sólo crea llaves de referencia débil, es imposible saber cuándo un objeto ha sido basura recolectada.

En versiones de Electron anteriores a v0.37.8, puede utilizar el interno `v8Util. la API etDocutor` para probar referencias débiles, el cual añade una referencia débil al objeto pasado y llama al callback cuando el objeto es recolectado de basura:

```javascript
// El código a continuación solo puede ejecutarse en Electron < v0.37.8.
var v8Util = process.atomBinding('v8_util')

var object = {}
v8Util. etDichard tor(object, function () {
  console.log('El objeto es basura recolectada')
})

// Elimina todas las referencias al objeto.
object = undefined
// Inicia manualmente un GC.
gc()
// Consola imprime "El objeto es basura recolectada".
```

Ten en cuenta que tienes que iniciar Electron con el comando `--js-flags="--expose_gc"` para exponer la función interna `gc`.

La API fue eliminada en versiones posteriores porque V8 en realidad no permite ejecutar código JavaScript en el destructor y en versiones posteriores hacerlo causaría fallos aleatorios.

## Referencias débiles en el módulo `remoto`

Además de administrar recursos nativos con C++, Electron también necesita referencias débiles para administrar recursos JavaScript. Un ejemplo es el módulo `remoto`de Electron, que es un módulo [Llamada de Procedimiento Remoto](https://en.wikipedia.org/wiki/Remote_procedure_call) (RPC) que permite usar objetos en el proceso principal de procesos de renderizado.

Un desafío clave con el módulo `remoto` es evitar pérdidas de memoria. Cuando los usuarios adquieren un objeto remoto en el proceso de renderizado, el módulo `remote` debe garantizar que el objeto continúa viviendo en el proceso principal hasta que las referencias en el proceso de renderizado hayan desaparecido. Adicionalmente, también tiene que asegurarse de que el objeto puede ser recolectado cuando ya no hay ninguna referencia a él en procesos de renderizado.

Por ejemplo, sin una implementación adecuada, el siguiente código causaría fugas de memoria rápidamente:

```javascript
const {remote} = require('electron')

for (let i = 0; i < 10000; ++i) {
  remote.nativeImage.createEmpty()
}
```

La gestión de recursos en el módulo `remoto` es simple. Whenever an object is requested, a message is sent to the main process and Electron will store the object in a map and assign an ID for it, then send the ID back to the renderer process. En el proceso de renderizado, el módulo `remoto` recibirá el ID y lo envuelve con un objeto proxy y cuando el objeto proxy es basura recolectado, se enviará un mensaje al proceso principal para liberar el objeto.

Usando `remote.require` API como ejemplo, una implementación simplificada se ve así:

```javascript
remote.require = function (nombre) {
  // Indica al proceso principal que devuelva los metadatos del módulo.
  const meta = ipcRenderer.sendSync('REQUIRE', name)
  // Crear un objeto proxy.
  const object = metaToValue(meta)
  // Indica al proceso principal que libere el objeto cuando el objeto proxy es basura
  // recolectado.
  v8Util.setDichard tor(object, function () {
    ipcRenderer.send('FREE', meta.id)
  })
  return object
}
```

En el proceso principal:

```javascript
const map = {}
const id = 0

ipcMain. n('REQUIRE', function (event, name) {
  const object = require(name)
  // Agregar una referencia al objeto.
  map[++id] = object
  // Convierte el objeto a metadatas.
  event.returnValue = valueToMeta(id, object)
})

ipcMain.on('GREE', function (evento, id) {
  delete map[id]
})
```

## Mapas con valores débiles

Con la implementación simple anterior, cada llamada en el módulo `remoto` devolverá un nuevo objeto remoto desde el proceso principal, y cada objeto remoto representa una referencia al objeto en el proceso principal.

El diseño en sí mismo está bien, pero el problema es cuando hay varias llamadas para recibir el mismo objeto, se crearán múltiples objetos proxy y para objetos complicados esto puede añadir una gran presión sobre el uso de memoria y recolección de basura .

Por ejemplo, el siguiente código:

```javascript
const {remote} = require('electron')

for (let i = 0; i < 10000; ++i) {
  remote.getCurrentWindow()
}
```

Primero usa mucha memoria creando objetos proxy y luego ocupa la CPU (Central Processing Unit) para recolectar basura y enviar mensajes IPC.

Una optimización obvia es almacenar en caché los objetos remotos: cuando ya hay un objeto remoto con el mismo ID, el objeto remoto anterior será devuelto en lugar de crear uno nuevo.

Esto no es posible con la API en el núcleo JavaScript. Usar el mapa normal para cachear objetos evitará que V8 recolecte los objetos, mientras que la clase [WeakMap](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap) sólo puede usar objetos como claves débiles.

Para resolver esto, se añade un tipo de mapa con valores como referencias débiles, que es perfecto para cachear objetos con IDs. Ahora el `remote.require` se ve como esto:

```javascript
const remoteObjectCache = v8Util.createIDWeakMap()

remote.require = function (name) {
  // Indica al proceso principal que devuelva los meta datos del módulo.
  ...
  if (remoteObjectCache.has(meta.id))
    return remoteObjectCache.get(meta.id)
  // Create a proxy object.
  ...
  remoteObjectCache.set(meta.id, object)
  return object
}
```

Ten en cuenta que el `remoteObjectCache` almacena objetos como referencias débiles, así que no es necesario eliminar la clave cuando el objeto está recolectado en la basura.

## Código nativo

Para las personas interesadas en el código C++ de referencias débiles en Electron, puede ser encontrado en los siguientes archivos:

La API del `setDocutor`:

* [`objeto de monitor_vida_monitor.cc`](https://github.com/electron/electron/blob/v1.3.4/atom/common/api/object_life_monitor.cc)
* [`monitor_de vida`](https://github.com/electron/electron/blob/v1.3.4/atom/common/api/object_life_monitor.h)

El `createIDWeakMap` API:

* [`llave_map.h`](https://github.com/electron/electron/blob/v1.3.4/atom/common/key_weak_map.h)
* [`atom_api_key_weak_map.h`](https://github.com/electron/electron/blob/v1.3.4/atom/common/api/atom_api_key_weak_map.h)

