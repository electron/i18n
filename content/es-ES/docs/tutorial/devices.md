# Acceso del dispositivo

Al igual que los navegadores basados en Chromium, Electron proporciona acceso al dispositivo del hardware a través de las APIs web.  En la mayor parte estas APIs trabajan como lo hacen en un navegador, pero hay algunas diferencias que necesitan ser tomadas en cuenta.  La diferencia principal entre Electron y los navegadores es lo que ocurre cuando el acceso al dispositivo es solicitado.  En un navegador, a los usuarios se le presenta una ventana emergente donde ellos puede otorgar acceso a un dispositivo individual.  En Electron, se proporcionan APIs que un desarrollador puede utilizar para elegir automáticamente un dispositivo o para solicitar a los usuarios que elijan un dispositivo a través de una interfaz creada por el desarrollador.

## API Web Bluetooth

La [Web Bluetooth API](https://web.dev/bluetooth/) puede ser utilizada para comunicarse con dispositivos bluetooth. Para poder utilizar esta API en Electron, los desarrolladores necesitan manejar el [evento `select-bluetooth-device` en el webContents](../api/web-contents.md#event-select-bluetooth-device) asociado con la solicitud del dispositivo.

### Ejemplo

Este ejemplo demuestra un aplicación Electron que automáticamente selecciona el primer dispositivo bluetooth disponible cuando el botón `Test Bluetooth` es pulsado.

```javascript fiddle='docs/fiddles/features/web-bluetooth'

```

## API WebHID

La [WebHID API](https://web.dev/hid/) puede ser usada para acceder a dispositivos HID tales como teclados y gamepads.  Electron proporciona varias APIs, para trabajar con la API WebHID:

* El [evento `select-hid-device` en la Session](../api/session.md#event-select-hid-device) puede ser usado para seleccionar un dispositivo HID cuando se hace una llamada a `navigator.hid.requestDevice`.  Adicionalmente, los eventos [`hid-device-added`](../api/session.md#event-hid-device-added) y [`hid-device-removed`](../api/session.md#event-hid-device-removed) en la Session pueden ser utilizados para manejar dispositivos que se conectan o desconectan durante el proceso `navigator.hid.requestDevice`.
* [`ses.setDevicePermissionHandler(handler)`](../api/session.md#sessetdevicepermissionhandlerhandler) puede ser utilizado para proveer permisos predeterminados a los dispositivos sin llamar primero para obtener permiso a dispositivo a través de `navigator.hid.requestDevice`.  Adicionalmente el comportamiento por defecto de Electron es almacenar el permiso de dispositivo concedido a través de la vida útil del correspondiente WebContents.  Si se necesita almacenamiento a más largo plazo, un desarrollado puede almacenar los permisos de dispositivos otorgados (pj cuando se maneja el evento `select-hid-device`) y luego leer desde ese almacenamiento con `setDevicePermissionHandler`.
* [`ses.setPermissionCheckHandler(handler)`](../api/session.md#sessetpermissioncheckhandlerhandler) puede ser usado para desactivar el acceso a HID a orígenes específicos.

### Lista de bloqueados

Por defecto Electron emplea la misma [blocklist](https://github.com/WICG/webhid/blob/main/blocklist.txt) usada por Chromium.  Si desea anular este comportamiento, puede hacerlo estableciendo la bandera `disable-hid-blocklist`:

```javascript
app.commandLine.appendSwitch('disable-hid-blocklist')
```

### Ejemplo

Este ejemplo demuestra una aplicación Electron que automáticamente selecciona dispositivos HID a través de [`ses.setDevicePermissionHandler(handler)`](../api/session.md#sessetdevicepermissionhandlerhandler) y a través del [evento `select-hid-device` en la Session](../api/session.md#event-select-hid-device) cuando el botón `Test WebHID` es pulsado.

```javascript fiddle='docs/fiddles/features/web-hid'

```

## API Serial Web

La [Web Serial API](https://web.dev/serial/) puede ser utilizada para acceder a dispositivos seriales que están conectados a través de la puerta serial, USB, or Bluetooth.  Para utilizar esta API en Electron, los desarrolladores necesitan manejar el [evento `select-serial-port` en la Session](../api/session.md#event-select-serial-port) asociado con la solicitud de puerto serial.

Hay varias APIs adicionales para trabajar con la API Web Serial:

* Los eventos [`serial-port-added`](../api/session.md#event-serial-port-added) y [`serial-port-removed`](../api/session.md#event-serial-port-removed) en la Session pueden ser usados para maenjar dispositivos que están conectados o desconectados durante el proceso `navigator.serial.requestPort`.
* [`ses.setPermissionCheckHandler(handler)`](../api/session.md#sessetpermissioncheckhandlerhandler) puede ser usado para desactivar el acceso serial a orígenes específicos.

### Ejemplo

Este ejemplo demuestra una aplicación Electron que automáticamente selecciona el primer dispositivo serial Arduino Uno (si está conectado) a través del [evento `select-serial-port` en la Session](../api/session.md#event-select-serial-port) cuando el botón `Test Web Serial` es pulsado.

```javascript fiddle='docs/fiddles/features/web-serial'

```
