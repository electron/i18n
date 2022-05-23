# safeStorage

> Permite el acceso a un cifrado y descifrado simple de cadenas para el almacenamiento en la máquina local.

Proceso: [principal](../glossary.md#main-process)</0>

Este módulo protege los datos almacenados en el disco de ser accedido por otras aplicaciones o usuario con acceso completo al disco.

Tenga en cuenta que en Mac, se requiere acceso al Keychain del sistema y estas llamadas pueden bloquear el hilo actual para recoger la entrada del usuario. Los mismo es válido para Linux, si una herramienta de gestión de contraseñas está disponible.

## Métodos

El módulo `safeStorage` tiene los siguientes métodos:

### `safeStorage.isEncryptionAvailable()`

Devuelve `Boolean` - Si el cifrado está disponible.

En Linux, devuelve true si la clave secreta está disponible. En MacOS, devuelve true is Keychain está disponible. En Windows, devuelve true sin otras condiciones previas.

### `safeStorage.encryptString(plainText)`

* `plainText` String

Devuelve `Buffer` -  Un array de bytes que representa la cadena cifrada.

Esta función lanzará un error si falla el cifrado.

### `safeStorage.decryptString(encrypted)`

* `encrypted` Buffer

Devuelve `String` - La cadena descifrada. Descifra el buffer cifrado obtenido con  `safeStorage.encryptString` de nuevo a una cadena.

Esta función lanzará un error si falla el cifrado.
