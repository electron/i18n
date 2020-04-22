# Updating an Appveyor Azure Image

Electron CI on Windows uses AppVeyor, which in turn uses Azure VM images to run.  Occasionally, these VM images need to be updated due to changes in Chromium requirements.  In order to update you will need [PowerShell](https://docs.microsoft.com/en-us/powershell/scripting/install/installing-powershell?view=powershell-6) and the [Azure PowerShell module](https://docs.microsoft.com/en-us/powershell/azure/install-az-ps?view=azps-1.8.0&viewFallbackFrom=azurermps-6.13.0).

Occasionally we need to update these images owing to changes in Chromium or other miscellaneous build requirement changes.

Example Use Case:
    * We need `VS15.9` and we have `VS15.7` installed; this would require us to update an Azure image.

1. Identify the image you wish to modify.
    * In [appveyor.yml](https://github.com/electron/electron/blob/master/appveyor.yml), the image is identified by the property *image*.
        * The names used correspond to the *"images"* defined for a build cloud, eg the [libcc-20 cloud](https://windows-ci.electronjs.org/build-clouds/8).
    * Find the image you wish to modify in the build cloud and make note of the **VHD Blob Path** for that image, which is the value for that corresponding key.
        * You will need this URI path to copy into a new image.
    * You will also need the storage account name which is labeled in AppVeyor as the **Disk Storage Account Name**

2. Get the Azure storage account key
    * Log into Azure using credentials stored in LastPass (under Azure Enterprise) and then find the storage account corresponding to the name found in AppVeyor.
        * Esempio, per `appveyorlibccbuilds` **Disk Storage Account Name** you'd look for `appveyorlibccbuilds` in the list of storage accounts @ Home < Storage Accounts
            * Cliccaci e cerca le `Chiavi d'Accesso`, e poi potrai usare qualsiasi chiave presente nell'elenco.

3. Ottieni l'URI dell'immagine della macchina virtuale completa da Azure
    * Navigate to Home < Storage Accounts < `$ACCT_NAME` < Blobs < Images
        * Nell'elenco seguente, cerca il nome del percorso VHD che hai ottenutod a Appveyor e poi cliccaci.
            * Copia l'URL intero dalla parte superiore della finestra successiva.

4. Copia l'immagine usando lo [script Copy Master Image PowerShell](https://github.com/appveyor/ci/blob/master/scripts/enterprise/copy-master-image-azure.ps1).
    * Risulta essenziale copiare il VM perché se giri una VM contro un'immagine, questa non può essere contemporaneamente usata da AppVeyor.
    * Usa il nome profilo d'archiviazione, la chiave e l'URI ottenuti da Azure per eseguire questo script.
        * Vedi Passaggio 3 per l'URI & quando richiesto, premi invio per usare lo stesso profilo di archiviazione come destinazione.
        * Usa il nome del contenitore di destinazione predefinito `(immagini)`
        * Inoltre, quando nomini la copia, usa un nome che indica cosa conterrà la nuova immagine (se è cambiata) ed il timbro di data.
            * Es. `libcc-20core-vs2017-15.9-2019-04-15.vhd`
    * Vai in Azure ed ottieni l'URI per l'immagine appena creata come descritto in un passaggio precedente

5. Gira una nuova VM usando il [Create Master VM da VHD PowerShell](https://github.com/appveyor/ci/blob/master/scripts/enterprise/create_master_vm_from_vhd.ps1).
    * Da PowerShell, esegui il file `ps1` con `./create_master_vm_from_vhd.ps1`
    * Avrai bisogno di informazioni di credenziali disponibili nella definizione della build del cloud AppVeyor.
        * Questo include:
            * ID Client
            * Segreto Client
            * ID Tenant
            * ID Iscrizione
            * Gruppo Risorsa
            * Rete Virtuale
    * Dovrai anche specificare
        * Nome Master VM - solo un nome unico per identificare la VM temporanea
        * Dimensione Master VM - usa `Standard_F32s_v2`
        * URI Master VHD - usa URI ottenuto @ fine del passaggio precedente
        * Uso posizione `East US`

6. Log back into Azure and find the VM you just created in Homee < Virtual Machines < `$YOUR_NEW_VM`
    * Puoi scaricare un file RDP (Desktop Remoto) per accedere al VM.

7. Usando Microsoft Remote Desktop, clicca `Connetti` per connettere al VM.
    * Credenziali d'acceso nel VM si trovano in LastPass sotto le credenziali `AppVeyor Enterprise master VM`.

8. Modifica il VM come richiesto.

9. Spegni VM ed eliminala in Azure.

10. Aggiungi la nuova immagine alle impostazioni Appveyor Cloud o modifica un'immagine esistente per puntare il nuovo VHD.
