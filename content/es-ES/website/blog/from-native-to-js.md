---
title: De nativo a JavaScript en Electron
author: codebytere
date: '19-03-2019'
---

¿Cómo llegan las características de Electron escritas en C++ o Objective-C a JavaScript para que estén disponibles para un usuario final?

---

## Fondo

[Electron](https://electronjs.org) es una plataforma JavaScript cuyo principal propósito es reducir la barrera a la entrada para que los desarrolladores construyan aplicaciones de escritorio robustas sin preocuparse por las implementaciones específicas de la plataforma. Sin embargo, en su núcleo, Electron mismo todavía necesita que la funcionalidad específica de la plataforma se escriba en un lenguaje de sistema determinado.

En realidad, Electron maneja el código nativo para usted para que pueda centrarse en una única API de JavaScript.

¿Pero cómo funciona esto? ¿Cómo llegan las características de Electron escritas en C++ o Objective-C a JavaScript para que estén disponibles para un usuario final?

Para rastrear este camino, vamos a comenzar con el módulo [`aplicación`](https://electronjs.org/docs/api/app).

Al abrir el archivo [`app.ts`](https://github.com/electron/electron/blob/0431997c8d64c9ed437b293e8fa15a96fc73a2a7/lib/browser/api/app.ts) dentro de nuestro directorio `lib/` , encontrarás la siguiente línea de código hacia arriba:

```js
const binding = process.electronBinding('app')
```

Esta línea apunta directamente al mecanismo de Electron para unir sus módulos C++/Objective-C a JavaScript para su uso por los desarrolladores. Esta función es creada por el encabezado y [archivo de implementación](https://github.com/electron/electron/blob/0431997c8d64c9ed437b293e8fa15a96fc73a2a7/atom/common/api/electron_bindings.cc) para la clase `ElectronBindings`.

## `process.electronBinding`

Estos archivos añaden la función `process.electronBinding` , que se comporta como el `process.binding` de Node.js. `process.binding` es una implementación de menor nivel de Node. 's [`require()`](https://nodejs.org/api/modules.html#modules_require_id) método, excepto que permite a los usuarios `requerir` código nativo en lugar de otro código escrito en JS. Esta función personalizada `process.electronBinding` confiere la capacidad de cargar código nativo desde Electron.

Cuando un módulo JavaScript de nivel superior (como `app`) requiere este código nativo, ¿cómo se determina y establece el estado de ese código nativo? ¿Dónde están los métodos expuestos a JavaScript? ¿Qué pasa con las propiedades?

## `native_mate`

En la actualidad, las respuestas a esta pregunta se pueden encontrar en `native_mate`: un fork de Chromium [`gin` librería](https://chromium.googlesource.com/chromium/src.git/+/lkgr/gin/) que facilita los tipos de marshal entre C++ y JavaScript.

Dentro de `native_mate/native_mate` hay un encabezado y archivo de implementación para `object_template_builder`. Esto es lo que nos permite formar módulos en código nativo cuya forma se ajusta a lo que los desarrolladores de JavaScript esperarían.

### `mate::ObjectTemplateBuilder`

Si miramos cada módulo Electron como un `objeto`, se hace más fácil ver por qué queremos usar `object_template_builder` para construirlos. Esta clase está construida sobre una clase expuesta por V8, que es el motor de alta potencia JavaScript y WebAssembly de código abierto de Google, escrito en C++. V8 implementa la especificación JavaScript (ECMAScript), por lo que sus implementaciones de funcionalidad nativas pueden correlacionarse directamente con implementaciones en JavaScript. Por ejemplo, [`v8::ObjectTemplate`](https://v8docs.nodesource.com/node-0.8/db/d5f/classv8_1_1_object_template.html) nos da objetos JavaScript sin una función de constructor dedicada y prototipo. Utiliza `Objeto[.prototype]`, y en JavaScript sería equivalente a [`Object.create()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create).

Para ver esto en acción, mire al archivo de implementación del módulo de la aplicación, [`atom_api_app.cc`](https://github.com/electron/electron/blob/0431997c8d64c9ed437b293e8fa15a96fc73a2a7/atom/browser/api/atom_api_app.cc). En la parte inferior está:

```cpp
mate::ObjectTemplateBuilder(isolate, prototype->PrototypeTemplate())
    .SetMethod("getGPUInfo", &App::GetGPUInfo)
```

En la línea anterior, `.SetMethod` es llamado en `mate::ObjectTemplateBuilder`. `. etMethod` puede ser llamado en cualquier instancia de la clase `ObjectTemplateBuilder` para establecer métodos en el [prototipo de objeto](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/prototype) en JavaScript, con la siguiente sintaxis:

```cpp
.SetMethod("method_name", &function_to_bind)
```

Este es el equivalente JavaScript de:

```js
function App{}
App.prototype.getGPUInfo = function () {
  // implementación aquí
}
```

Esta clase también contiene funciones para establecer propiedades en un módulo:

```cpp
.SetProperty("property_name", &getter_function_to_bind)
```

o

```cpp
.SetProperty("property_name", &getter_function_to_bind, &setter_function_to_bind)
```

Estas serían a su vez las implementaciones de JavaScript de [Object.defineProperty](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty):

```js
function App {}
Object.defineProperty(unnamed@@0) prototype, 'myProperty', {
  get() {
    return _myProperty
  }
})
```

y

```js
function App {}
Object.defineProperty(unnamed@@0) prototype, 'myProperty', {
  get() {
    return _myProperty
  }
  set(newPropertyValue) {
    _myProperty = newPropertyValue
  }
})
```

Es posible crear objetos JavaScript formados con prototipos y propiedades como esperan los desarrolladores, y una razón más clara sobre las funciones y propiedades implementadas en este nivel del sistema inferior!

La decisión acerca de dónde implementar cualquier método de módulo es en sí misma una compleja y a menudo no determinista, que cubriremos en un futuro puesto.
