---
title: "Nuevo en Electron 2: Compras dentro de la aplicación"
author: zeke
date: '04-04-2018'
---
  
La nueva línea de lanzamiento Electron 2.0 está [empaquetada](https://github.com/electron/electron/releases/tag/v2.0.0-beta.1) con nuevas características y correcciones. Uno de los aspectos destacados de esta nueva versión principal es una nueva [`inAppPurchase` API](https://github.com/electron/electron/blob/master/docs/api/in-app-purchase.md) para la App Store [de Mac](https://support.apple.com/en-us/HT202023).

---

Las compras dentro de la aplicación permiten que el contenido o las suscripciones se compren directamente desde dentro de las aplicaciones. Esto proporciona a los desarrolladores una forma fácil de abrazarse con el modelo de negocio [freemium](https://developer.apple.com/app-store/freemium-business-model/), dondequiera que los usuarios no paguen nada para descargar una aplicación y se les ofrece compras dentro de la aplicación opcional para funciones premium, contenido adicional o suscripciones.

La nueva API fue añadida a Electron por el colaborador comunitario [Adrien Fery](https://github.com/AdrienFery) para permitir compras dentro de la aplicación en [Amanote](https://amanote.com/), una aplicación Electron para tomar notas para conferencias y conferencias. Amanote es gratuito para descargar y permite añadir notas claras y estructuradas a PDFs, con características como fórmulas matemáticas, dibujos, grabación de audio y más.

Desde que se añadió soporte para compras en la aplicación a la versión Mac de Amanote, ¡Adrien ha notado un **40% más de ventas**!

## Comenzando

La nueva [`inAppPurchase`](https://github.com/electron/electron/blob/master/docs/api/in-app-purchase.md) API ya ha aterrizado en la última beta de Electron:

```sh
npm i -D electron@beta
```

Los documentos para la API pueden ser [encontrados en GitHub](https://github.com/electron/electron/blob/master/docs/api/in-app-purchase.md), y Adrien han tenido la amabilidad de escribir un tutorial sobre cómo usar la API. Para empezar a añadir compras dentro de la aplicación, [vea el tutorial](https://github.com/AdrienFery/electron/blob/a69bbe882aed1a5aee2b7910afe09900275b2bf6/docs/tutorial/in-app-purchases.md).

Más [mejoras en la API](https://github.com/electron/electron/pull/12464) están en funcionamiento, y pronto llegará a una próxima versión beta de Electron.

## Windows podría ser siguiente

A continuación, Adrien espera abrir un nuevo canal de ingresos para Amanote añadiendo soporte para las compras dentro de la aplicación de Microsoft Store en Electron. ¡Manténte atento a desarrollos al respecto!