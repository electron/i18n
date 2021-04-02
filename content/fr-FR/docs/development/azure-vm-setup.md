# Mise à jour d’une image Appveyor Azure

Electron CI sur Windows utilise AppVeyor, qui à son tour utilise des images Azure VM pour s’exécuter.  Parfois, ces images VM doivent être mises à jour en raison de changements dans les exigences de chrome.  Afin de mettre à jour, vous aurez besoin [de](https://docs.microsoft.com/en-us/powershell/scripting/install/installing-powershell?view=powershell-6) PowerShell et [module Azure PowerShell](https://docs.microsoft.com/en-us/powershell/azure/install-az-ps?view=azps-1.8.0&viewFallbackFrom=azurermps-6.13.0).

Parfois, nous avons besoin de mettre à jour ces images en raison de changements dans le chrome ou d’autres changements divers d’exigence de construction.

Exemple Cas d’utilisation :
    * Nous avons besoin `VS15.9` et nous avons `VS15.7` installés; cela nous obligerait à mettre à jour une image Azure.

1. Identifiez l’image que vous souhaitez modifier.
    * Dans [appveyor.yml](https://github.com/electron/electron/blob/master/appveyor.yml), l’image est identifiée par la propriété *image*.
        * Les noms utilisés correspondent aux *« images »* définies pour un nuage de build, par exemple le nuage libcc-20 [](https://windows-ci.electronjs.org/build-clouds/8).
    * Trouvez l’image que vous souhaitez modifier dans le nuage de build et notez les</strong> de chemin VHD Blob de **pour cette image, qui est la valeur de cette clé correspondante.
        * Vous aurez besoin de ce chemin URI pour copier dans une nouvelle image.</li>
    * Vous aurez également besoin du nom du compte de stockage qui est étiqueté dans AppVeyor comme nom **compte de stockage de disque**</ul></li>

2

Obtenez la clé de compte de stockage Azure
    * Connectez-vous à Azure à l’aide des informations d’identification stockées dans LastPass (sous Azure Enterprise) puis trouvez le compte de stockage correspondant au nom trouvé dans AppVeyor.
        * Par exemple, par `appveyorlibccbuilds` **nom du compte de stockage de disque** que vous recherchez `appveyorlibccbuilds` dans la liste des comptes de stockage @ Comptes de stockage < domicile
            * Cliquez dessus et cherchez des `Access Keys`, puis vous pouvez utiliser l’une des clés présentes dans la liste.

3

Obtenez l’image complète de la machine virtuelle URI d’Azure
    * Accédez aux < de stockage < `$ACCT_NAME` < Blobs < Images
        * Dans la liste suivante, recherchez le nom de chemin VHD que vous avez obtenu d’Appveyor, puis cliquez dessus.
            * Copiez l’URL entière du haut de la fenêtre suivante.

4

Copiez l’image à l’aide [le script PowerShell de Copy Master Image](https://github.com/appveyor/ci/blob/master/scripts/enterprise/copy-master-image-azure.ps1).
    * Il est essentiel de copier le VM parce que si vous faites tourner un VM contre une image que l’image ne peut pas en même temps être utilisée par AppVeyor.
    * Utilisez le nom de compte de stockage, la clé et URI obtenus d’Azure pour exécuter ce script.
        * Voir l’étape 3 pour URI & lorsque vous êtes invité, appuyez sur entrez pour utiliser le même compte de stockage que la destination.
        * Utilisez le nom du conteneur de destination par défaut `(images)`
        * En outre, lors de la désignation de la copie, utilisez un nom qui indique ce que la nouvelle image contiendra (si cela a changé) et le timbre de date.
            * Ex. `libcc-20core-vs2017-15.9-2019-04-15.vhd`
    * Allez dans Azure et obtenez l’URI pour l’image nouvellement créée telle que décrite dans une étape précédente

5

Faites tourner un nouveau VM à l’aide [créer master VM à partir de VHD PowerShell](https://github.com/appveyor/ci/blob/master/scripts/enterprise/create_master_vm_from_vhd.ps1).
    * À partir de PowerShell, exécutez `ps1` fichier avec `./create_master_vm_from_vhd.ps1`
    * Vous aurez besoin des informations d’identification disponibles dans la définition cloud de build AppVeyor.
        * Cela comprend :
            * Client ID
            * Client Secret
            * Pièce d’identité du locataire
            * ID d’abonnement
            * Groupe de ressources
            * Réseau virtuel
    * Vous devrez également spécifier
        * Master VM nom - juste un nom unique pour identifier le VM temporaire
        * Taille master VM - utiliser `Standard_F32s_v2`
        * Master VHD URI - utiliser URI obtenu @ fin de l’étape précédente
        * Utilisation de l’emplacement `East US`

6

Reconnectez-vous à Azure et trouvez la VM que vous venez de créer dans Home < Virtual Machines < `$YOUR_NEW_VM`
    * Vous pouvez télécharger un fichier RDP (Remote Desktop) pour accéder au VM.

7

À l’aide de Microsoft Remote Desktop, cliquez `Connect` pour vous connecter au VM.
    * Les informations d’identification pour se connecter au VM se trouvent dans LastPass sous `AppVeyor Enterprise master VM` informations d’identification.

8

Modifiez le VM au besoin.

9

Arrêtez le VM, puis supprimez-le dans Azure.

10

Ajoutez la nouvelle image aux paramètres Appveyor Cloud ou modifiez une image existante pour pointer vers le nouveau VHD.</ol>
