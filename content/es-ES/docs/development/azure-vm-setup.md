# Actualizar una imagen Azure Appveyor

Electron CI en Windows utiliza AppVeyor, el cual a su vez utiliza imágenes de Azure VM para ejecutarse. Ocasionalmente, estas imagenes VM necesitan actualizarse debido a cambios en los requerimientos de Chormium. Para actualizar usted necesitará [PowerShell](https://docs.microsoft.com/en-us/powershell/scripting/install/installing-powershell?view=powershell-6) y el [Azure PowerShell module](https://docs.microsoft.com/en-us/powershell/azure/install-az-ps?view=azps-1.8.0&viewFallbackFrom=azurermps-6.13.0).

Ocasionalmente necesitaremos actualizar estas imágenes debido a cambios en Chromium u otros requisitos varios de construcción.

Ejemplo Caso de uso:

    * Necesitamos `VS15.9` y tenemos instalado `VS15.7`; esto nos requeriría actualizar in imagen Azure.
    

1. Identifique la imagen que desea modificar.
    
    - En [appveyor.yml](https://github.com/electron/electron/blob/master/appveyor.yml), la imagen es identificada por la propiedad *image*. 
        - Los nombres usados corresponden a las *"images"* definidas para una nube de construcción, ejemplo el [libcc-20 cloud](https://windows-ci.electronjs.org/build-clouds/8).
    - Encuentre la imagen que desea modificar en la nube de construcción y tenga en cuenta que la **VHD Blob Path** para la imagen, que es el valor para la correspondiente llave. 
        - Usted necesitará esta ruta URI para copiar dentro de una nueva imagen.
    - Usted además necesitará el nombre de la cuenta de almacenamiento el cual es etiquetado en AppVeyor como **Disk Storage Account Name**

2. Obtenga la clave de la cuenta de almacenamiento Azure
    
    - Inicie sesión en Azure usando credenciales almacenadas en LastPass (bajo Azure Enterprise) y luego encuentre la cuenta de almacenamiento correspondiente al nombre encontrado en AppVeyor. 
        - Ejemplo, para `appveyorlibccbuilds` **Nombre de cuenta de almacenamiento de disco** you'd look for `appveyorlibccbuilds` in the list of storage accounts @ Home < Storage Accounts 
            - Click into it and look for `Access Keys`, and then you can use any of the keys present in the list.

3. Get the full virtual machine image URI from Azure
    
    - Navigate to Home < Storage Accounts < `$ACCT_NAME` < Blobs < Images 
        - In the following list, look for the VHD path name you got from Appveyor and then click on it. 
            - Copy the whole URL from the top of the subsequent window.

4. Copy the image using the [Copy Master Image PowerShell script](https://github.com/appveyor/ci/blob/master/scripts/enterprise/copy-master-image-azure.ps1).
    
    - It is essential to copy the VM because if you spin up a VM against an image that image cannot at the same time be used by AppVeyor.
    - Use the storage account name, key, and URI obtained from Azure to run this script. 
        - See Step 3 for URI & when prompted, press enter to use same storage account as destination.
        - Use default destination container name `(images)`
        - Also, when naming the copy, use a name that indicates what the new image will contain (if that has changed) and date stamp. 
            - Ej. `libcc-20core-vs2017-15.9-2019-04-15.vhd`
    - Go into Azure and get the URI for the newly created image as described in a previous step

5. Spin up a new VM using the [Create Master VM from VHD PowerShell](https://github.com/appveyor/ci/blob/master/scripts/enterprise/create_master_vm_from_vhd.ps1).
    
    - From PowerShell, execute `ps1` file with `./create_master_vm_from_vhd.ps1`
    - You will need the credential information available in the AppVeyor build cloud definition. 
        - Esto incluye: 
            - ID de Cliente
            - Secreto del Cliente
            - Tenant ID
            - ID de la suscripción
            - Grupo de Recursos
            - Red virtual
    - También necesitará especificar 
        - Master VM name - just a unique name to identify the temporary VM
        - Master VM size - use `Standard_F32s_v2`
        - Master VHD URI - use URI obtained @ end of previous step
        - Location use `East US`

6. Log back into Azure and find the VM you just created in Homee < Virtual Machines < `$YOUR_NEW_VM`
    
    - You can download a RDP (Remote Desktop) file to access the VM.

7. Using Microsoft Remote Desktop, click `Connect` to connect to the VM.
    
    - Credentials for logging into the VM are found in LastPass under the `AppVeyor Enterprise master VM` credentials.

8. Modify the VM as required.

9. Apagar la VM y luego borrarla en Azure.

10. Add the new image to the Appveyor Cloud settings or modify an existing image to point to the new VHD.