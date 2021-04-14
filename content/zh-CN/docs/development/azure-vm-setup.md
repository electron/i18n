# 更新应用者蔚蓝形象

Windows 上的电子 CI 使用应用维奥，后者又使用 Azure VM 图像运行。  有时，由于铬要求的变化，这些 VM 图像需要更新。  为了更新，您将需要 [电源壳](https://docs.microsoft.com/en-us/powershell/scripting/install/installing-powershell?view=powershell-6) 和 [Azure 电源壳模块](https://docs.microsoft.com/en-us/powershell/azure/install-az-ps?view=azps-1.8.0&viewFallbackFrom=azurermps-6.13.0)。

有时，我们需要更新这些图像，由于铬的变化或其他杂项构建要求的变化。

示例使用案例：
    * 我们需要安装`VS15.9`或者我们已安装好`VS15.7`；然后可能会请求我们去更新Azure镜像

1. 识别要修改的图像。
    * 在 [appveyor.yml](https://github.com/electron/electron/blob/master/appveyor.yml)文件中，镜像通过该文件来识别 *镜像* 配置。
        * *“images”*该命名被对应用来定义云构建，例如：[libcc-20 cloud](https://windows-ci.electronjs.org/build-clouds/8)
    * 找到你希望去修改构建在云端的镜像并且注意镜像的 **VHD Blob Path**（标签），它是对应键值对的值
        * 您将需要此 URI 路径来复制到新图像中。
    * 同时需要的的存储账号名，在AppVeyor中被标记为 **Disk Storage Account Name**

2. 获取 Azure 存储帐户密钥
    * 使用存储在 LastPass（Azure 企业下）中的凭据登录 Azure，然后找到与 AppVeyor 中查找的名称对应的存储帐户。
        * 例如，对于 `appveyorlibccbuilds` **磁盘存储帐户名称** 您在存储帐户列表中查找 `appveyorlibccbuilds` @ 家庭 < 存储帐户
            * 单击它并查找 `Access Keys`，然后您可以使用列表中的任何密钥。

3. 从蔚蓝获取完整的虚拟机图像 URI
    * 导航到家庭 < 存储帐户 < `$ACCT_NAME` < Blobs < 图像
        * 在下面的列表中，查找您从 Appveyor 获得的 VHD 路径名称，然后单击它。
            * 从后续窗口顶部复制整个 URL。

4. 使用</a>复制主图像电源壳脚本

复制图像。</p> 
   
       * 复制 VM 至关重要，因为如果您将 VM 与 AppVeyor 无法同时使用的图像旋转到图像上。
    * 使用从 Azure 获得的存储帐户名称、密钥和 URI 来运行此脚本。 
              * 提示时，请参阅 URI & 步骤 3，按输入以使用与目的地相同的存储帐户。
        * 使用默认目的地容器名称 `(images)`
        * 此外，在命名副本时，使用表示新图像将包含的内容（如果已更改）和日期戳的名称。 
                      * 前。 `libcc-20core-vs2017-15.9-2019-04-15.vhd`
    * 进入 Azure 并获取前一步骤中描述的新创建图像的 URI</li> 

5 旋转一个新的VM使用 [创建主VM从VHD电源壳](https://github.com/appveyor/ci/blob/master/scripts/enterprise/create_master_vm_from_vhd.ps1)。
  
      * 从电源壳，执行 `ps1` 文件与 `./create_master_vm_from_vhd.ps1`
    * 您将需要 AppVeyor 构建云定义中可用的凭据信息。 
              * 这包括： 
                      * 客户端 ID
            * 客户端机密
            * 租户 ID
            * 订阅 ID
            * 资源组
            * 虚拟网络
    * 您还需要指定 
              * 主VM名称-只是一个独特的名称来识别临时VM
        * 主VM尺寸- 使用 `Standard_F32s_v2`
        * 主VHD URI-使用URI获得@结束前一步
        * 位置使用 `East US`
6 重新登录到 Azure，并找到您刚刚在家庭虚拟机上创建的 VM < < `$YOUR_NEW_VM`
  
      * 您可以下载RDP（远程桌面）文件来访问VM。
7 使用微软远程桌面，单击 `Connect` 连接到 VM。
  
      * 登录 VM 的凭据在 lastPass 中根据 `AppVeyor Enterprise master VM` 凭据找到。
8 根据需要修改 VM。

9 关闭VM，然后在Azure中将其删除。

10 将新图像添加到应用云设置或修改现有图像以指向新的 VHD。</ol>
