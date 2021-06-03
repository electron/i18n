# Electron Fuses

> Alterna característica en tiempo de empaquetado

## ¿Qué son los fusibles?

Para un subconjunto de funcionalidad de Electron tiene sentido deshabilitar ciertas características para una aplicación entera.  Por ejemplo, el 99% de las aplicaciones no hacen uso de `ELECTRON_RUN_AS_NODE`, estas aplicaciones quiere ser capaz de enviar un binario que sea incapaz de usar esa característica.  Además no queremos que los consumidores de Electron construyan Electron a partir de la fuente, ya que ese es un desafío técnico masivo y tiene un alto costo tanto en tiempo como en dinero.

Los fusibles son la solución a este problema, en un alto nivel son "bits mágicos" en el binario de Electron que se pueden voltear cuando empaca su aplicación Electron para habilitar / deshabilitar ciertas características / restricciones.  Debido a que son volteados en tiempo de empaquetado antes de que el código firme la aplicación, el sistema operativo se hace responsable de asegurar que esos bits no son volteados de nuevo a través de la validación de firma de código a nivel de sistema operativo (Gatekeeper / App Locker).

## ¿Cómo voltear los fusibles?

### La forma fácil

Hemos hecho un módulo práctico `@electron/fuses` para hacer que voltear estos fusibles sea fácil.  Revisa el README del módulo para más detalles sobre uso y los casos de errores potenciales.

```js
require('@electron/fuses').flipFuses(
  // Path to electron
  require('electron'),
  // Fuses to flip
  {
    runAsNode: false
  }
)
```

### La forma difícil

#### Glosario Rápido

* **Fuse Wire**: Una secuencia de bytes en el binario de Electron usados para controlar los fusibles
* **Sentinel**: Una secuencia estática conocida de bytes que puedes usar para localizar el cable del fusible
* **Fuse Schema**: El formato / valores permitidos para el cable de fusible

Para voltear los fusibles manualmente, es necesario editar el binario de Electron y modificar el cable del fusible para que sea la secuencia de bytes que represente el estado de los fusibles que desea.

En algún lugar en el binario de Electron habrá una secuencia de bytes que se verán así:

```text
| ...binary | sentinel_bytes | fuse_version | fuse_wire_length | fuse_wire | ...binary |
```

* `sentinel_bytes` siempre es esta cadena exacta `dL7pKGdnNz796PbbjQWNKmHXBZaB9tsX`
* `fuse_version` es un solo byte cuyo valor entero sin signo representa la versión del esquema de fusible
* `fuse_wire_length` es un solo byte cuyo valor entero sin signo representa el numero de fusibles en el siguiente cable de fusible
* `fuse_wire` es una secuencia de N bytes, cada byte representa un solo fusible y su estado.
  * "0" (0x30) indica que el fusible esta desactivado
  * "1" (0x31) indica que el fusible esta activado
  * "r" (0x72) indica que el fusible a sido eliminado y cambiar el byte 1 o 0 no tendrá efecto.

Para voltear un fusible busque su posición en el cable del fusible y cámbielo a "0" o "1" dependiendo del estado que desee.

Puede ver el esquema actual [aquí](https://github.com/electron/electron/blob/master/build/fuses/fuses.json5).
