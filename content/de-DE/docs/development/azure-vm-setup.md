# Aktualisieren eines Appveyor Azure-Images

Electron CI unter Windows verwendet AppVeyor, das wiederum Azure VM-Images zum Ausführen verwendet.  Gelegentlich müssen diese VM-Images aufgrund von Änderungen der Chromium-Anforderungen aktualisiert werden.  Zum Aktualisieren benötigen Sie [PowerShell-](https://docs.microsoft.com/en-us/powershell/scripting/install/installing-powershell?view=powershell-6) und das</a>

Azure PowerShell-Moduls .</p> 

Gelegentlich müssen wir diese Bilder aufgrund von Änderungen in Chrom oder anderen Änderungen der Buildanforderungen aktualisieren.

Beispiel Anwendungsfall:

    * Wir brauchen `VS15.9` , und wir haben `VS15.7` installiert; Dies würde erfordern, dass wir ein Azure-Image aktualisieren.

1. Identifizieren Sie das Bild, das Sie ändern möchten.
   
       * In [appveyor.yml](https://github.com/electron/electron/blob/master/appveyor.yml)wird das Bild durch die Eigenschaft *Bild*identifiziert. 
              * Die verwendeten Namen entsprechen den *"Images", die für eine Buildcloud definiert* , z. B. die [libcc-20 cloud](https://windows-ci.electronjs.org/build-clouds/8).
    * Suchen Sie das Bild, das Sie in der Buildwolke ändern möchten, und notieren Sie sich die **VHD-Blobpfad-** für dieses Bild, das der Wert für diesen entsprechenden Schlüssel ist. 
              * Sie benötigen diesen URI-Pfad, um in ein neues Bild zu kopieren.
    * Sie benötigen auch den Namen des Speicherkontos, der in AppVeyor als **Disk Storage Account Name**
2. Abrufen des Azure-Speicherkontoschlüssels
   
       * Melden Sie sich bei Azure mit Anmeldeinformationen an, die in Lastpass (unter Azure Enterprise) gespeichert sind, und suchen Sie dann das Speicherkonto, das dem Namen von AppVeyor entspricht. 
              * Beispiel für `appveyorlibccbuilds` **Name des Datenträgerspeicherkontos** Sie `appveyorlibccbuilds` in der Liste der Speicher < konten suchen würden. 
                      * Klicken Sie darauf und suchen Sie nach `Access Keys`, und dann können Sie einen der in der Liste vorhandenen Schlüssel verwenden.
3. Abrufen des vollständigen URI für virtuelle Computerabbilde aus Azure
   
       * Navigieren zu Home < Storage Accounts < `$ACCT_NAME` < Blobs < Images 
              * Suchen Sie in der folgenden Liste nach dem VHD-Pfadnamen, den Sie von Appveyor erhalten haben, und klicken Sie dann darauf. 
                      * Kopieren Sie die gesamte URL vom oberen Rand des nachfolgenden Fensters.
4. Kopieren Sie das Bild mit dem [Copy Master Image PowerShell-Skript](https://github.com/appveyor/ci/blob/master/scripts/enterprise/copy-master-image-azure.ps1).
   
       * Es ist wichtig, die VM zu kopieren, da, wenn Sie eine VM für ein Image drehen, dieses Image nicht gleichzeitig von AppVeyor verwendet werden kann.
    * Verwenden Sie den Namen, den Schlüssel und den URI des Speicherkontos, die sie von Azure erhalten haben, um dieses Skript auszuführen. 
              * Siehe Schritt 3 für URI- & wenn Sie dazu aufgefordert werden, drücken Sie die Eingabetaste, um dasselbe Speicherkonto wie das Ziel zu verwenden.
        * Verwenden des Standardmäßigen Zielcontainernamens `(images)`
        * Verwenden Sie beim Benennen der Kopie außerdem einen Namen, der angibt, was das neue Bild enthalten soll (falls sich das geändert hat) und den Datumsstempel. 
                      * Ex. `libcc-20core-vs2017-15.9-2019-04-15.vhd`
    * Gehen Sie in Azure, und rufen Sie den URI für das neu erstellte Image ab, wie in einem vorherigen Schritt beschrieben.
5. Drehen Sie eine neue VM mit dem [Erstellen von Master-VM aus VHD PowerShell](https://github.com/appveyor/ci/blob/master/scripts/enterprise/create_master_vm_from_vhd.ps1).
   
       * Führen Sie von PowerShell aus `ps1` Datei mit `./create_master_vm_from_vhd.ps1`
    * Sie benötigen die Anmeldeinformationen, die in der AppVeyor-Build-Cloud-Definition verfügbar sind. 
              * Dazu gehören: 
                      * Client-ID
            * Client Secret
            * Mandanten-ID
            * Abonnement-ID
            * Ressourcengruppe
            * Virtuelles Netzwerk
    * Sie müssen auch angeben, 
              * Master-VM-Name – nur ein eindeutiger Name zum Identifizieren der temporären VM
        * Master-VM-Größe - verwenden Sie `Standard_F32s_v2`
        * Master-VHD-URI - Uri erhalten verwenden - Ende des vorherigen Schritts
        * Standortverwendung `East US`
6. Melden Sie sich wieder bei Azure an, und suchen Sie die VM, die Sie soeben in Home < Virtual Machines erstellt haben, < `$YOUR_NEW_VM`
   
       * Sie können eine RDP-Datei (Remote Desktop) herunterladen, um auf die VM zuzugreifen.
7. Klicken Sie mithilfe von Microsoft Remote Desktop auf `Connect` , um eine Verbindung mit der VM herzustellen.
   
       * Anmeldeinformationen für die Anmeldung in der VM finden Sie in Lastpass unter der `AppVeyor Enterprise master VM` Anmeldeinformationen.
8. Ändern Sie die VM nach Bedarf.

9. Fahren Sie die VM herunter, und löschen Sie sie dann in Azure.

10. Fügen Sie das neue Bild den Appveyor Cloud-Einstellungen hinzu, oder ändern Sie ein vorhandenes Bild, um auf die neue VHD zu verweisen.
