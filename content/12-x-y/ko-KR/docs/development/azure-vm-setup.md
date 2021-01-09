# Updating an Appveyor Azure Image

Electron CI on Windows uses AppVeyor, which in turn uses Azure VM images to run.  Occasionally, these VM images need to be updated due to changes in Chromium requirements.  In order to update you will need [PowerShell](https://docs.microsoft.com/en-us/powershell/scripting/install/installing-powershell?view=powershell-6) and the [Azure PowerShell module](https://docs.microsoft.com/en-us/powershell/azure/install-az-ps?view=azps-1.8.0&viewFallbackFrom=azurermps-6.13.0).

Occasionally we need to update these images owing to changes in Chromium or other miscellaneous build requirement changes.

Example Use Case:
    * VS15.9가 필요하고 VS15.7이 설치되어 있습니다. 이를 위해서는 Azure 이미지를 업데이트해야 합니다.

1. Identify the image you wish to modify.
    * appveyor.yml에서 이미지는 속성 이미지로 식별됩니다.
        * 사용된 이름은 빌드 클라우드(예: libcc-20 클라우드)에 대해 정의된 "이미지"에 해당합니다.
    * 빌드 클라우드에서 수정하려는 이미지를 찾고 해당 이미지의 VHD Blob Path (해당 키의 값)를 기록하세요.
        * You will need this URI path to copy into a new image.
    * AppVeyor에서 디스크 스토리지 계정 이름으로 레이블이 지정된 스토리지 계정 이름이 필요합니다.

2. Get the Azure storage account key
    * Log into Azure using credentials stored in LastPass (under Azure Enterprise) and then find the storage account corresponding to the name found in AppVeyor.
        * Example, for `appveyorlibccbuilds` 스토리지 계정 목록에서 appveyor libc 빌드를 찾을 디스크 스토리지 계정 이름 @ 홈 < 스토리지 계정
            * Click into it and look for `Access Keys`, and then you can use any of the keys present in the list.

3. Get the full virtual machine image URI from Azure
    * 홈 < 스토리지 계정 < `$ACCT_NAME` < Blob < 이미지로 이동
        * In the following list, look for the VHD path name you got from Appveyor and then click on it.
            * Copy the whole URL from the top of the subsequent window.

4. Copy the image using the [Copy Master Image PowerShell script](https://github.com/appveyor/ci/blob/master/scripts/enterprise/copy-master-image-azure.ps1).
    * It is essential to copy the VM because if you spin up a VM against an image that image cannot at the same time be used by AppVeyor.
    * Use the storage account name, key, and URI obtained from Azure to run this script.
        * See Step 3 for URI & when prompted, press enter to use same storage account as destination.
        * Use default destination container name `(images)`
        * Also, when naming the copy, use a name that indicates what the new image will contain (if that has changed) and date stamp.
            * Ex. `libcc-20core-vs2017-15.9-2019-04-15.vhd`
    * Go into Azure and get the URI for the newly created image as described in a previous step

5. Spin up a new VM using the [Create Master VM from VHD PowerShell](https://github.com/appveyor/ci/blob/master/scripts/enterprise/create_master_vm_from_vhd.ps1).
    * From PowerShell, execute `ps1` file with `./create_master_vm_from_vhd.ps1`
    * You will need the credential information available in the AppVeyor build cloud definition.
        * This includes:
            * Client ID
            * Client Secret
            * Tenant ID
            * Subscription ID
            * Resource Group
            * Virtual Network
    * You will also need to specify
        * Master VM name - just a unique name to identify the temporary VM
        * Master VM size - use `Standard_F32s_v2`
        * Master VHD URI - use URI obtained @ end of previous step
        * Location use `East US`

6. Log back into Azure and find the VM you just created in Home < Virtual Machines < `$YOUR_NEW_VM`
    * You can download a RDP (Remote Desktop) file to access the VM.

7. Using Microsoft Remote Desktop, click `Connect` to connect to the VM.
    * Credentials for logging into the VM are found in LastPass under the `AppVeyor Enterprise master VM` credentials.

8. Modify the VM as required.

9. Shut down the VM and then delete it in Azure.

10. Add the new image to the Appveyor Cloud settings or modify an existing image to point to the new VHD.
