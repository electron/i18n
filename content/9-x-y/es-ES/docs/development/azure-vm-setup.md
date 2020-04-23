# Actualizar una imagen Azure Appveyor

Electron CI en Windows utiliza AppVeyor, el cual a su vez utiliza imágenes de Azure VM para ejecutarse.  Ocasionalmente, estas imagenes VM necesitan actualizarse debido a cambios en los requerimientos de Chormium.  Para actualizar usted necesitará [PowerShell](https://docs.microsoft.com/en-us/powershell/scripting/install/installing-powershell?view=powershell-6) y el [Azure PowerShell module](https://docs.microsoft.com/en-us/powershell/azure/install-az-ps?view=azps-1.8.0&viewFallbackFrom=azurermps-6.13.0).

Ocasionalmente necesitaremos actualizar estas imágenes debido a cambios en Chromium u otros requisitos varios de construcción.

Ejemplo Caso de uso:
    * We need `VS15.9` and we have `VS15.7` installed; this would require us to update an Azure image.

1. Identifique la imagen que desea modificar.
    * En [appveyor.yml](https://github.com/electron/electron/blob/master/appveyor.yml), la imagen es identificada por la propiedad *image*.
        * Los nombres usados corresponden a las *"images"* definidas para una nube de construcción, ejemplo el [libcc-20 cloud](https://windows-ci.electronjs.org/build-clouds/8).
    * Encuentre la imagen que desea modificar en la nube de construcción y tenga en cuenta que la **VHD Blob Path** para la imagen, que es el valor para la correspondiente llave.
        * Usted necesitará esta ruta URI para copiar dentro de una nueva imagen.
    * Usted además necesitará el nombre de la cuenta de almacenamiento el cual es etiquetado en AppVeyor como **Disk Storage Account Name**

2. Obtenga la clave de la cuenta de almacenamiento Azure
    * Inicie sesión en Azure usando credenciales almacenadas en LastPass (bajo Azure Enterprise) y luego encuentre la cuenta de almacenamiento correspondiente al nombre encontrado en AppVeyor.
        * Ejemplo, para `appveyorlibccbuilds` **Disk Storage Account Name** you'd look for `appveyorlibccbuilds` in the list of storage accounts @ Home < Storage Accounts
            * Haga clic en él y busque `Access Keys`, y luego puede utilizar cualquiera de las claves presentes en la lista.

3. Obtenga la URI completa de imagen de maquina virtual de Azure
    * Navigate to Home < Storage Accounts < `$ACCT_NAME` < Blobs < Images
        * EN la siguiente lista, mira el nombre de ruta VHD que obtuvo de Appveyor y luego pulsa en él.
            * Copiar toda la URL desde la parte superior de la ventana posterior.

4. Copiar la imagen usando el [Copy Master Image PowerShell script](https://github.com/appveyor/ci/blob/master/scripts/enterprise/copy-master-image-azure.ps1).
    * Es esencial copiar la VM porque si mueve una VM contra una imagen esa imagen no puede ser usada al mismo tiempo or AppVeyor.
    * Utilizar el nombre de la cuenta de almacenamiento, clave y URI obtenidos de Azure para ejecutar este script.
        * Mire el paso 3 para URI & cuando se le solicite, puls enter para usar la misma cuenta de almacenamiento como destino.
        * Usar nombre de contenedor de destino predeterminado `(images)`
        * Además, al nombrar la copia, utilice un nombre que indique lo que contendrá la nueva imagen (si ha cambiado) y la fecha.
            * Ej. `libcc-20core-vs2017-15.9-2019-04-15.vhd`
    * Acceda a Azure y consigua la URI para la imagen recién creada como se describe en un paso anterior

5. Haz una nueva VM usando el [Crear VM Master de VHD PowerShell](https://github.com/appveyor/ci/blob/master/scripts/enterprise/create_master_vm_from_vhd.ps1).
    * Desde PowerShell, ejecute el archivo `ps1` con `./create_master_vm_from_vhd.ps1`
    * Usted necesitarás la información de credencial disponible en la definición de nube de AppVeyor.
        * Esto incluye:
            * ID de Cliente
            * Secreto del Cliente
            * Tenant ID
            * ID de la suscripción
            * Grupo de Recursos
            * Red virtual
    * También necesitará especificar
        * Nombre de la VM principal - sólo un nombre único para identificar la VM temporal
        * Tamaño de la VM principal - usar `Standard_F32s_v2`
        * VHD URI Principal - usar la URI obtenida de @ end del paso anterior
        * Ubicación usar `East US`

6. Log back into Azure and find the VM you just created in Homee < Virtual Machines < `$YOUR_NEW_VM`
    * Puede descargar un archivo RDP (escritorio remoto) para acceder a la VM.

7. Usando Microsoft Remote Desktop, haga clic en `Connect` para conectarse a la VM.
    * Las credenciales para iniciar sesión en la VM se encuentran en LastPass bajo las credenciales `AppVeyor Enterprise master VM`.

8. Modificar la VM como sea necesario.

9. Apagar la VM y luego borrarla en Azure.

10. Agreagar la nueva imagen a l configuracion de la nube Appveyor o modifique una imagen para apuntar al nuevo VHD.
