---
title: Arreglo de transparencia de certificado
author: kevinsawicki
date: '2016-12-09'
---

Electron [1.4. 2](https://github.com/electron/electron/releases/tag/v1.4.12) contiene un parche importante que soluciona un problema de Chrome en el que algunos Symantec, GeoTrust, y los certificados Thawte SSL/TLS son rechazados incorrectamente 10 semanas desde el tiempo de compilación de [libchromiumcontent](https://github.com/electron/libchromiumcontent), La biblioteca Chrome de Electron subyacente. No hay problemas con los certificados utilizados en los sitios afectados y la sustitución de estos certificados no ayudará.

---

En Electron 1.4.0 &mdash; 1.4.11 solicitudes HTTPS a los sitios que utilicen estos certificados afectados fallarán con errores de red después de una fecha determinada. Esto afecta a las solicitudes HTTPS realizadas usando las API de red subyacentes de Chrome tales como `window. etch`, solicitudes de Ajax, la `red` API </code> de Electron, `Navegador Window. oadURL`, `contenido web. oadURL`, el `src` atributo en un `<webview>` tag y otros.

La actualización de sus aplicaciones a 1.4.12 evitará que estas solicitudes fallen ocurran.

**Nota:** Este problema se introdujo en Chrome 53, por lo que las versiones anteriores de Electron que 1.4.0 no se verán afectadas.

### Fechas de impacto

A continuación se muestra una tabla de cada versión de Electron 1.4 y la fecha en la que las solicitudes a sitios que utilicen estos certificados afectados comenzarán a fallar.

<table class="table table-ruled table-full-width">
    <thead>
        <tr class="text-left">
            <th>Versión de Electron</th>
            <th>Fecha de Impacto</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>1.3.x</td>
            <td>No afectado</td>
        </tr>
        <tr>
            <td>1.4.0</td>
            <td>Ya está fallando</td>
        </tr>
        <tr>
            <td>1.4.1</td>
            <td>Ya está fallando</td>
        </tr>
        <tr>
            <td>1.4.2</td>
            <td>Ya está fallando</td>
        </tr>
        <tr>
            <td>1.4.3</td>
            <td>10 de diciembre de 2016 9:00 PM PST</td>
        </tr>
        <tr>
            <td>1.4.4</td>
            <td>10 de diciembre de 2016 9:00 PM PST</td>
        </tr>
        <tr>
            <td>1.4.5</td>
            <td>10 de diciembre de 2016 9:00 PM PST</td>
        </tr>
        <tr>
            <td>1.4.6</td>
            <td>14 de enero de 2017 9:00 PM PST</td>
        </tr>
        <tr>
            <td>1.4.7</td>
            <td>14 de enero de 2017 9:00 PM PST</td>
        </tr>
        <tr>
            <td>1.4.8</td>
            <td>14 de enero de 2017 9:00 PM PST</td>
        </tr>
        <tr>
            <td>1.4.9</td>
            <td>14 de enero de 2017 9:00 PM PST</td>
        </tr>
        <tr>
            <td>1.4.10</td>
            <td>14 de enero de 2017 9:00 PM PST</td>
        </tr>
        <tr>
            <td>1.4.11</td>
            <td>11 de febrero de 2017 9:00 PM PST</td>
        </tr>
        <tr>
            <td>1.4.12</td>
            <td>No afectado</td>
        </tr>
    </tbody>
</table>

Puedes verificar la fecha de impacto de tu aplicación configurando el reloj de tu computadora hacia delante y luego comprobar si [https://symbeta. ymantec.com/welcome/](https://symbeta.symantec.com/welcome/) carga con éxito.

## Más información

Puede leer más sobre este tema, el problema original y la corrección en los siguientes lugares:

- [¿Qué es la transparencia del certificado?](https://www.certificate-transparency.org/what-is-ct)
- [Artículo de la base de conocimiento de Symtantec](https://knowledge.symantec.com/support/ssl-certificates-support/index?page=content&id=ALERT2160)
- [Número de cromo 664177](https://bugs.chromium.org/p/chromium/issues/detail?id=664177)
- [Corregir cromo para el problema 664177](https://codereview.chromium.org/2495583002)
- [parche libchromiumcontent para la incidencia 664177](https://github.com/electron/libchromiumcontent/pull/248)

