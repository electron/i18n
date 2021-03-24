---
title: "Actualizaciones de Internacionalización"
author: vanessayuenn
date: '20-06-2018'
---

Desde el lanzamiento del [](https://electronjs.org/blog/new-website) del nuevo sitio web internacionalizado de Electron hemos estado trabajando duro para hacer la experiencia de desarrollo de Electron aún más accesible para desarrolladores fuera del mundo de habla inglesa.

Así que aquí estamos con algunas emocionantes actualizaciones de i18n!

---

## 🌐 Interruptor de idioma

¿Sabías que mucha gente que lee la documentación traducida a menudo cruza la referencia que con la documentación original en inglés? Lo hacen para familiarizarse con los documentos ingleses y para evitar traducciones desfasadas o inexactas, que es una advertencia de documentación internacionalizada.

<figure>
  <img class="screenshot" src="https://user-images.githubusercontent.com/6842965/35578586-cae629e2-05e4-11e8-9431-0278f8c2b39f.gif" alt="Interruptor de idioma en la documentación de Electron">
</figure>

Para facilitar las referencias cruzadas a documentos en inglés, hemos enviado recientemente una característica que le permite alternar sin problemas una sección de la documentación de Electron entre Inglés y cualquier idioma en el que esté viendo el sitio web. El interruptor de idioma se mostrará siempre y cuando tengas un local que no sea el inglés seleccionado en el sitio web.

## ⚡ Acceso rápido a la página de traducción

<figure>
  <img class="screenshot" src="https://user-images.githubusercontent.com/6842965/36511386-c32e31fc-1766-11e8-8484-7466be6a5eb0.png" alt="Nuevo pie de documentación de Electron en japonés">
  <figcaption>Pie de documentación de Electron en japonés</figcaption>
</figure>

¿Nota un error tipográfico o una traducción incorrecta mientras estás leyendo la documentación? Ya no tienes que iniciar sesión en Crowdin, elegir tu locale, encontrar el archivo que te gustaría la corrección, etc etc. En su lugar, puedes bajarte hasta la parte inferior de la documentación mencionada y hacer clic en "Traducir esta documentación" (o el equivalente en tu idioma). Voila! Has llegado directamente a la página de traducción de Crowdin. ¡Ahora aplica tu magia de traducción!

## 📈 Algunas estadísticas

Desde que hemos publicitado el esfuerzo i18n de documentación de Electron hemos visto _un enorme crecimiento_ en las contribuciones de traducción de miembros de la comunidad Electron de todo el mundo. Hasta la fecha, tenemos **1,719,029 cadenas traducidas, de 1,066 traductores comunitarios y en 25 idiomas**.

<figure>
  <a href="https://crowdin.com/project/electron/">
    <img class="screenshot" src="https://user-images.githubusercontent.com/6842965/41649826-ca26037c-747c-11e8-9594-5ce12d2978e2.png" alt="Previsión de traducción proporcionada por Crowdin">
    <figcaption>Previsión de traducción proporcionada por Crowdin</figcaption>
  </a>
</figure>

Aquí hay una gráfica divertida que muestra la cantidad aproximada de tiempo necesaria para traducir el proyecto a cada idioma si se conserva el tempo existente (basado en la actividad del proyecto durante los últimos 14 días en el momento de la escritura).

## 📃 Encuesta de traductores

Nos gustaría dar un enorme ❤️ gracias ❤️ a todos los que han contribuido con su tiempo para ayudar a mejorar Electron! Con el fin de reconocer adecuadamente el duro trabajo de nuestra comunidad de traductores, hemos creado una encuesta para recopilar información (es decir, el mapeo entre sus nombres de usuario de Crowdin y Github) sobre nuestros traductores.

Si eres uno de nuestros increíbles traductores, por favor tómate unos minutos para llenar esto: https://goo.gl/forms/b46sjdcHmlpV0GKT2.

## 🙌 Internacionalización del nodo Effort

Debido al éxito de la iniciativa i18n de Electron, Node.js decidió modelar [su revamped esfuerzo de i18n](https://github.com/nodejs/i18n) después del patrón que utilizamos también! 🎉 El nodo [. s i18n iniciativa](https://github.com/nodejs/i18n) ha sido lanzada y ganada un gran impulso, pero puedes leer sobre la propuesta temprana y el razonamiento detrás de ella [aquí](https://medium.com/the-node-js-collection/internationalizing-node-js-fe7761798b0a).

## 🔦 Guía de contribución

Si estás interesado en unirte a nuestro esfuerzo para hacer a Electron más amigable internacionalmente tenemos una guía de contribución útil [para ayudarte](https://github.com/electron/i18n/blob/master/contributing.md) para empezar. ¡Feliz internacionalización! 📚
