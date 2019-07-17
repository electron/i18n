# Appveyor Azure イメージを更新する

Windows 上の Electron CI は AppVeyor を使用し、AppVeyor は Azure VM イメージを実行に使用します。 場合によっては、Chromium の要件が変更されたため、これらの VM イメージを更新する必要があります。 更新するには、[PowerShell](https://docs.microsoft.com/en-us/powershell/scripting/install/installing-powershell?view=powershell-6) と [Azure PowerShell モジュール](https://docs.microsoft.com/en-us/powershell/azure/install-az-ps?view=azps-1.8.0&viewFallbackFrom=azurermps-6.13.0) が必要です。

時折、Chromium の変更やその他のビルド要件の変更により、これらのイメージを更新する必要があります。

ユースケースの例:

    * `VS15.9` が必要だが、`VS15.7` がインストールされている場合。これは Azure イメージを更新する必要があります。
    

1. 修正したいイメージを指定します。
    
    - [appveyor.yml](https://github.com/electron/electron/blob/master/appveyor.yml) では、イメージは *image* プロパティで識別されます。 
        - 使用される名前は、クラウドを構築するために定義された *"イメージ"*、たとえば [libcc-20 クラウド](https://windows-ci.electronjs.org/build-clouds/8) に対応しています。
    - ビルドクラウドで変更するイメージを探し、そのイメージの **VHD Blob Path** をメモします。これはキーに対応する値です。 
        - 新しいイメージにコピーするにはこの URI パスが必要になります。
    - また、AppVeyor 上で **ディスクストレージアカウント名** とラベル付けされたストレージアカウント名も必要になります。

2. Azure ストレージアカウントキーを取得します
    
    - LastPass (Azure Enterprise 傘下) に保存されている資格情報を使用して Azure にログインし、AppVeyor にある名前に対応するストレージアカウントを探します。 
        - 例えば、`appveyorlibccbuilds` という **ディスクストレージアカウント名** の場合、ホーム < ストレージアカウント にあるストレージアカウントリストで `appveyorlibccbuilds` を探します。 
            - それをクリックして `アクセスキー` を見つけます。そして、リストにあるキーのうちどれでも使うことができます。

3. Azure からフルの仮想マシンイメージ URI を取得します
    
    - ホーム < ストレージアカウント < `$ACCT_NAME` < Blobs < Images 
        - In the following list, look for the VHD path name you got from Appveyor and then click on it. 
            - Copy the whole URL from the top of the subsequent window.

4. [マスターイメージ PowerShell スクリプトをコピー](https://github.com/appveyor/ci/blob/master/scripts/enterprise/copy-master-image-azure.ps1) を用いてイメージをコピーします。
    
    - It is essential to copy the VM because if you spin up a VM against an image that image cannot at the same time be used by AppVeyor.
    - Use the storage account name, key, and URI obtained from Azure to run this script. 
        - See Step 3 for URI & when prompted, press enter to use same storage account as destination.
        - Use default destination container name `(images)`
        - Also, when naming the copy, use a name that indicates what the new image will contain (if that has changed) and date stamp. 
            - Ex. `libcc-20core-vs2017-15.9-2019-04-15.vhd`
    - Go into Azure and get the URI for the newly created image as described in a previous step

5. [VHD PowerShell からマスター VM を作成](https://github.com/appveyor/ci/blob/master/scripts/enterprise/create_master_vm_from_vhd.ps1) を用いて新しい VM を起動します。
    
    - From PowerShell, execute `ps1` file with `./create_master_vm_from_vhd.ps1`
    - You will need the credential information available in the AppVeyor build cloud definition. 
        - これには以下も含まれます。 
            - クライアントID
            - Client Secret
            - Tenant ID
            - サブスクリプションID
            - Resource Group
            - Virtual Network
    - You will also need to specify 
        - Master VM name - just a unique name to identify the temporary VM
        - Master VM size - use `Standard_F32s_v2`
        - Master VHD URI - use URI obtained @ end of previous step
        - Location use `East US`

6. Azure にログインし直して先ほど作成した VM を探します。ホーム < 仮想マシン < `$YOUR_NEW_VM` を見てください。
    
    - You can download a RDP (Remote Desktop) file to access the VM.

7. Microsoft リモート デスクトップを使用して、`接続` をクリックして VM に接続します。
    
    - Credentials for logging into the VM are found in LastPass under the `AppVeyor Enterprise master VM` credentials.

8. 必要に応じて VM を変更してください。

9. Azure で VM をシャットダウンして削除します。

10. Appveyor クラウドの設定に新しいイメージを追加するか、新しい VHD を指すように既存のイメージを変更します。