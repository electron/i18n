# Appveyor Azure イメージを更新する

Windows 上の Electron CI は AppVeyor を使用し、AppVeyor は Azure VM イメージを実行に使用します。 場合によっては、Chromium の要件が変更されたため、これらの VM イメージを更新する必要があります。 更新するには、[PowerShell](https://docs.microsoft.com/en-us/powershell/scripting/install/installing-powershell?view=powershell-6) と [Azure PowerShell モジュール](https://docs.microsoft.com/en-us/powershell/azure/install-az-ps?view=azps-1.8.0&viewFallbackFrom=azurermps-6.13.0) が必要です。

時折、Chromium の変更やその他のビルド要件の変更により、これらのイメージを更新する必要があります。

ユースケースの例:

    * `VS15.9` が必要で、`VS15.7` がインストールされています。これには Azure イメージを更新する必要があります。
    

1. Identify the image you wish to modify.
    
    - In [appveyor.yml](https://github.com/electron/electron/blob/master/appveyor.yml), the image is identified by the property *image*. 
        - The names used correspond to the *"images"* defined for a build cloud, eg the [libcc-20 cloud](https://windows-ci.electronjs.org/build-clouds/8).
    - Find the image you wish to modify in the build cloud and make note of the **VHD Blob Path** for that image, which is the value for that corresponding key. 
        - You will need this URI path to copy into a new image.
    - You will also need the storage account name which is labeled in AppVeyor as the **Disk Storage Account Name**

2. Get the Azure storage account key
    
    - Log into Azure using credentials stored in LastPass (under Azure Enterprise) and then find the storage account corresponding to the name found in AppVeyor. 
        - Example, for `appveyorlibccbuilds` **ディスクストレジアカオウント名前** you'd look for `appveyorlibccbuilds` in the list of storage accounts @ Home < Storage Accounts 
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
            - Ex. `libcc-20core-vs2017-15.9-2019-04-15.vhd`
    - Go into Azure and get the URI for the newly created image as described in a previous step

5. Spin up a new VM using the [Create Master VM from VHD PowerShell](https://github.com/appveyor/ci/blob/master/scripts/enterprise/create_master_vm_from_vhd.ps1).
    
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

6. Log back into Azure and find the VM you just created in Homee < Virtual Machines < `$YOUR_NEW_VM`
    
    - You can download a RDP (Remote Desktop) file to access the VM.

7. Using Microsoft Remote Desktop, click `Connect` to connect to the VM.
    
    - Credentials for logging into the VM are found in LastPass under the `AppVeyor Enterprise master VM` credentials.

8. 必要に応じて VM を変更してください。

9. Azure で VM をシャットダウンして削除します。

10. Appveyor クラウドの設定に新しいイメージを追加するか、新しい VHD を指すように既存のイメージを変更します。