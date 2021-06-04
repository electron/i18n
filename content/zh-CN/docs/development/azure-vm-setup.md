# 更新 Appveyor Azure 镜像

Windows 上的 Electron CI 使用 AppVeyor, 后者则使用 Azure VM 镜像运行。  有时，由于 Chromium 要求发生变化，这些 VM 镜像需要更新。  为了更新，您将需要 [PowerShell](https://docs.microsoft.com/en-us/powershell/scripting/install/installing-powershell?view=powershell-6) 和 [Azure PowerShell 模块](https://docs.microsoft.com/en-us/powershell/azure/install-az-ps?view=azps-1.8.0&viewFallbackFrom=azurermps-6.13.0)。

Occasionally we need to update these images owing to changes in Chromium or other miscellaneous build requirement changes.

Example Use Case:
    * 我们需要安装`VS15.9`或者我们已安装好`VS15.7`；然后可能会请求我们去更新Azure镜像

1. Identify the image you wish to modify.
    * 在 [appveyor.yml](https://github.com/electron/electron/blob/master/appveyor.yml)文件中，镜像通过该文件来识别 *镜像* 配置。
        * *“images”*该命名被对应用来定义云构建，例如：[libcc-20 cloud](https://windows-ci.electronjs.org/build-clouds/8)
    * 找到你希望去修改构建在云端的镜像并且注意镜像的 **VHD Blob Path**（标签），它是对应键值对的值
        * You will need this URI path to copy into a new image.
    * 同时需要的的存储账号名，在AppVeyor中被标记为 **Disk Storage Account Name**

2. Get the Azure storage account key
    * Log into Azure using credentials stored in LastPass (under Azure Enterprise) and then find the storage account corresponding to the name found in AppVeyor.
        * Example, for `appveyorlibccbuilds` **Disk Storage Account Name** you'd look for `appveyorlibccbuilds` in the list of storage accounts @ Home < Storage Accounts
            * Click into it and look for `Access Keys`, and then you can use any of the keys present in the list.

3. Get the full virtual machine image URI from Azure
    * Navigate to Home < Storage Accounts < `$ACCT_NAME` < Blobs < Images
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
