# Updating an Appveyor Azure Image

Electron CI on Windows uses AppVeyor, which in turn uses Azure VM images to run.  Occasionally, these VM images need to be updated due to changes in Chromium requirements.  In order to update you will need [PowerShell](https://docs.microsoft.com/en-us/powershell/scripting/install/installing-powershell?view=powershell-6) and the [Azure PowerShell module](https://docs.microsoft.com/en-us/powershell/azure/install-az-ps?view=azps-1.8.0&viewFallbackFrom=azurermps-6.13.0).

Occasionally we need to update these images owing to changes in Chromium or other miscellaneous build requirement changes.

Exemple de cas d'utilisation :
    * We need `VS15.9` and we have `VS15.7` installed; this would require us to update an Azure image.

1. Identifiez l'image que vous souhaitez modifier.
    * In [appveyor.yml](https://github.com/electron/electron/blob/main/appveyor.yml), the image is identified by the property *image*.
        * The names used correspond to the *"images"* defined for a build cloud, eg the [libcc-20 cloud](https://windows-ci.electronjs.org/build-clouds/8).
    * Find the image you wish to modify in the build cloud and make note of the **VHD Blob Path** for that image, which is the value for that corresponding key.
        * You will need this URI path to copy into a new image.
    * You will also need the storage account name which is labeled in AppVeyor as the **Disk Storage Account Name**

2. Get the Azure storage account key
    * Log into Azure using credentials stored in LastPass (under Azure Enterprise) and then find the storage account corresponding to the name found in AppVeyor.
        * Exemple, pour `appveyorlibccbuilds` **Disk Storage Account Name** you'd look for `appveyorlibccbuilds` in the list of storage accounts @ Home < Storage Accounts
            * Click into it and look for `Access Keys`, and then you can use any of the keys present in the list.

3. Obtenir l'URI complet de l'image de la machine virtuelle à partir d'Azure
    * Accédez aux < de stockage < `$ACCT_NAME` < Blobs < Images
        * In the following list, look for the VHD path name you got from Appveyor and then click on it.
            * Copiez l'URL entière depuis le haut de la fenêtre suivante.

4. Copy the image using the [Copy Master Image PowerShell script](https://github.com/appveyor/ci/blob/master/scripts/enterprise/copy-master-image-azure.ps1).
    * It is essential to copy the VM because if you spin up a VM against an image that image cannot at the same time be used by AppVeyor.
    * Use the storage account name, key, and URI obtained from Azure to run this script.
        * See Step 3 for URI & when prompted, press enter to use same storage account as destination.
        * Utiliser le nom du conteneur de destination par défaut `(images)`
        * En outre, lorsque vous nommez la copie, utilisez un nom qui indique ce que la nouvelle image contiendra (si cela a changé) et un horodatage.
            * Ex. `libcc-20core-vs2017-15.9-2019-04-15.vhd`
    * Go into Azure and get the URI for the newly created image as described in a previous step

5. Spin up a new VM using the [Create Master VM from VHD PowerShell](https://github.com/appveyor/ci/blob/master/scripts/enterprise/create_master_vm_from_vhd.ps1).
    * Depuis PowerShell, exécutez le fichier `ps1` avec `./create_master_vm_from_vhd.ps1`
    * You will need the credential information available in the AppVeyor build cloud definition.
        * Ceci comprend :
            * Client ID
            * Client Secret
            * Tenant ID
            * Subscription ID
            * Resource Group
            * Virtual Network
    * Vous devrez également préciser
        * Master VM name - just a unique name to identify the temporary VM
        * Master VM size - use `Standard_F32s_v2`
        * Master VHD URI - use URI obtained @ end of previous step
        * Location use `East US`

6. Reconnectez-vous à Azure et trouvez la VM que vous venez de créer dans Home < Virtual Machines < `$YOUR_NEW_VM`
    * You can download a RDP (Remote Desktop) file to access the VM.

7. Using Microsoft Remote Desktop, click `Connect` to connect to the VM.
    * Credentials for logging into the VM are found in LastPass under the `AppVeyor Enterprise master VM` credentials.

8. Modifier la VM si nécessaire.

9. Shut down the VM and then delete it in Azure.

10. Add the new image to the Appveyor Cloud settings or modify an existing image to point to the new VHD.
