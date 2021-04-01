# Atualizando um Appveyor Azure Image

Electron Cl no Windows usa o AppVeyor, que por sua vez usa imagens do Azure Vm para executar.  Ocasionalmente, essas imagens VM precisam ser atualizadas devido a alterações nos requisitos do Cromo.  Para atualizar você precisará [](https://docs.microsoft.com/en-us/powershell/scripting/install/installing-powershell?view=powershell-6) do PowerShell e do</a>do módulo

Azure PowerShell .</p> 

Ocasionalmente, precisamos atualizar essas imagens devido a alterações no Cromo ou outras alterações de requisitos de construção diversas.

Caso de uso de exemplo:

    * Precisamos de `VS15.9` e temos `VS15.7` instalado; isso exigiria que atualizás e nós atualizas uma imagem do Azure.

1. Identifique a imagem que deseja modificar.
   
       * Em [appveyor.yml](https://github.com/electron/electron/blob/master/appveyor.yml), a imagem é identificada pela</em>de imagem *propriedade . 
      
              * Os nomes utilizados correspondem às "imagens" ** definidas para uma nuvem de construção, por exemplo, a</a>de nuvem libcc-20 .</li> </ul></li> 
          
              * Encontre a imagem que deseja modificar na nuvem de compilação e anote o **VHD Blob Path** para essa imagem, que é o valor para essa chave correspondente. 
              * Você precisará deste caminho URI para copiar em uma nova imagem.
    * Você também precisará do nome da conta de armazenamento que está rotulado no AppVeyor como o nome da conta de armazenamento em disco ****</ul></li> 

2 Obtenha a chave da conta de armazenamento do Azure
  
      * Faça login no Azure usando credenciais armazenadas no LastPass (sob a Azure Enterprise) e, em seguida, encontre a conta de armazenamento correspondente ao nome encontrado no AppVeyor. 
              * Exemplo, para `appveyorlibccbuilds` **Nome da conta de armazenamento em disco** que você procuraria `appveyorlibccbuilds` na lista de contas de armazenamento @ Home < Storage Accounts 
                      * Clique nele e procure `Access Keys`, e então você pode usar qualquer uma das teclas presentes na lista.
3 Obtenha a imagem completa da máquina virtual URI do Azure
  
      * Navegue até contas de armazenamento de < domésticas < `$ACCT_NAME` < blobs < images 
              * Na lista a seguir, procure o nome do caminho VHD que você obteve do Appveyor e clique nele. 
                      * Copie toda a URL do topo da janela subsequente.
4 Copie a imagem usando o script [Copy Master Image PowerShell](https://github.com/appveyor/ci/blob/master/scripts/enterprise/copy-master-image-azure.ps1).
  
      * É essencial copiar o VM porque se você girar um VM contra uma imagem essa imagem não pode ao mesmo tempo ser usada pelo AppVeyor.
    * Use o nome da conta de armazenamento, a chave e o URI obtidos do Azure para executar este script. 
              * Consulte o Passo 3 para & URI quando solicitado, pressione enter para usar a mesma conta de armazenamento que o destino.
        * Use o nome padrão do contêiner de destino `(images)`
        * Além disso, ao nomear a cópia, use um nome que indique o que a nova imagem conterá (se isso tiver sido alterado) e carimbo de data. 
                      * Ex. `libcc-20core-vs2017-15.9-2019-04-15.vhd`
    * Vá para o Azure e obtenha o URI para a imagem recém-criada como descrito em uma etapa anterior
5 Gire um novo VM usando o [Criar VM Mestre do VHD PowerShell](https://github.com/appveyor/ci/blob/master/scripts/enterprise/create_master_vm_from_vhd.ps1).
  
      * Do PowerShell, execute `ps1` arquivo com `./create_master_vm_from_vhd.ps1`
    * Você precisará das informações de credenciais disponíveis na definição de nuvem de compilação do AppVeyor. 
              * Isso inclui: 
                      * ID do cliente
            * Segredo do Cliente
            * ID do inquilino
            * ID de assinatura
            * Grupo de Recursos
            * Rede Virtual
    * Você também precisará especificar 
              * Nome Master VM - apenas um nome único para identificar o VM temporário
        * Tamanho Master VM - use `Standard_F32s_v2`
        * Mestre VHD URI - use URI obtido @ fim da etapa anterior
        * `East US`de uso de localização
6 Faça login no Azure e encontre o VM que você acabou de criar em Home < Máquinas Virtuais < `$YOUR_NEW_VM`
  
      * Você pode baixar um arquivo RDP (Remote Desktop) para acessar o VM.
7 Usando o Microsoft Remote Desktop, clique em `Connect` para se conectar ao VM.
  
      * Credenciais para fazer login no VM são encontradas no LastPass sob as credenciais `AppVeyor Enterprise master VM` .
8 Modifique o VM conforme necessário.

9 Desligue o VM e exclua-o no Azure.

10 Adicione a nova imagem às configurações do Rateveyor Cloud ou modifique uma imagem existente para apontar para o novo VHD.</ol>
