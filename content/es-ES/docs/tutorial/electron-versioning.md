# Versión Electron

Si usted ha estado usando nodo y MNP por un tiempo, usted es probablemente consciente de [Semantic Versioning](http://semver.org) o SemVer para abreviar. Es una Convención para especificar números de versión de software que ayuda a comunicar la intención de los usuarios de su software.

## Resumen de versiones semántica

Versiones semánticas se componen siempre de tres números:

    Major.minor.patch
    

Números de versión semántica se golpean (incrementado) usando las siguientes reglas:

* **Major** es para los cambios que rompen hacia atrás compatibilidad.
* **Minor** es para nuevas funciones que no se rompen hacia atrás compatibilidad.
* **Patch** es para correcciones de errores y otros cambios menores.

Una simple mnemónica para recordar este esquema es el siguiente:

    Breaking.Feature.Fix
    

## Versión Electron

Debido a su dependencia del nodo y el cromo, no es posible para el proyecto de Electron a adherirse a una política de SemVer. **You por lo tanto debe siempre referencia a una versión específica de Electron.**

Números de versión Electron se golpean con las siguientes reglas:

* **Major** es para romper cambios en API del Electron. Si actualiza desde `0.37.0` a `1.0.0`, deberás realizar cambios en su aplicación.
* **Minor** es para Chrome importante y actualizaciones menores de nodo, o Electron significativo cambia. Si actualiza desde `1.5.0` a `1.6.0`, su aplicación se supone que todavía funciona, pero puede que tenga que trabajar alrededor de pequeños cambios.
* **Patch** es para nuevas características y correcciones de errores. Si actualiza desde `1.6.2` a `1.6.3`, su aplicación seguirá trabajando como-es.

Recomendamos que usted crear una versión fija al instalar Electron de MNP:

```sh
MNP instalar Electron--save-exacto--save-dev
```

`--save-exact` bandera agregue `electron` al archivo `package.json` sin necesidad de utilizar un ` ^ ` o ` ~ `, por ejemplo `1.6.2` en vez de ` ^ 1.6.2`. Esta práctica asegura que todas las actualizaciones del Electron son una operación manual hecha por usted, el desarrollador.

Como alternativa, puede utilizar el ` ~` prefijo en su gama SemVer, como ` ~ 1.6.2`. Esto bloquear su versión mayor y menor, sino que permiten nuevas versiones del parche a instalar.