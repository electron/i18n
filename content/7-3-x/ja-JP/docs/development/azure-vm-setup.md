# Appveyor Azure イメージを更新する

Windows 上の Electron CI は AppVeyor を使用し、AppVeyor は Azure VM イメージを実行に使用します。  場合によっては、Chromium の要件が変更されたため、これらの VM イメージを更新する必要があります。  更新するには、[PowerShell](https://docs.microsoft.com/en-us/powershell/scripting/install/installing-powershell?view=powershell-6) と [Azure PowerShell モジュール](https://docs.microsoft.com/en-us/powershell/azure/install-az-ps?view=azps-1.8.0&viewFallbackFrom=azurermps-6.13.0) が必要です。

時折、Chromium の変更やその他のビルド要件の変更により、これらのイメージを更新する必要があります。

ユースケースの例:
    * `VS15.9` が必要なのに `VS15.7` がインストールされているので、Azure イメージを更新する必要がある。

1. 修正したいイメージを指定します。
    * [appveyor.yml](https://github.com/electron/electron/blob/master/appveyor.yml) では、イメージは *image* プロパティで識別されます。
        * 使用される名前は、クラウドを構築するために定義された *"イメージ"*、たとえば [libcc-20 クラウド](https://windows-ci.electronjs.org/build-clouds/8) に対応しています。
    * ビルドクラウドで変更するイメージを探し、そのイメージの **VHD Blob Path** をメモします。これはキーに対応する値です。
        * 新しいイメージにコピーするにはこの URI パスが必要になります。
    * また、AppVeyor 上で **ディスクストレージアカウント名** とラベル付けされたストレージアカウント名も必要になります。

2. Azure ストレージアカウントキーを取得します
    * LastPass (Azure Enterprise 傘下) に保存されている資格情報を使用して Azure にログインし、AppVeyor にある名前に対応するストレージアカウントを探します。
        * 例えば、`appveyorlibccbuilds` という **ディスクストレージアカウント名** の場合、ストレージアカウントのリスト @ ホーム < ストレージアカウントで `appveyorlibccbuilds` を探します。
            * それをクリックして `アクセスキー` を見つけます。そして、リストにあるキーのうちどれでも使うことができます。

3. Azure からフルの仮想マシンイメージ URI を取得します
    * ホーム < ストレージアカウント < `$ACCT_NAME` < Blobs < イメージ に移動します。
        * そのリスト内の、Appveyor から入手した VHD パス名を探してクリックします。
            * 出てきたウィンドウ上から URL 全体をコピーします。

4. [マスターイメージ PowerShell スクリプトをコピー](https://github.com/appveyor/ci/blob/master/scripts/enterprise/copy-master-image-azure.ps1) を用いてイメージをコピーします。
    * VM をイメージに対して起動する場合、そのイメージを AppVeyor で同時に使用することはできないため、VM をコピーする必要があります。
    * このスクリプトを実行するために、Azure から取得したストレージアカウント名、キー、URI を使用します。
        * URI についてはステップ 3 を参照してください。プロンプトが表示されたら、エンターを押してコピー先となるように同じストレージアカウントを使用します。
        * デフォルトのコピーされたコンテナ名 `(images)` を使用します
        * また、コピーの名前を変更するときは、(変更されている場合は) 新しいイメージに含まれる内容と日付スタンプを示す名前を使用します。
            * 例: `libcc-20core-vs2017-15.9-2019-04-15.vhd`
    * 前の手順で説明したように、Azure に行き、新しく作成したイメージの URI を取得します。

5. [VHD PowerShell からマスター VM を作成](https://github.com/appveyor/ci/blob/master/scripts/enterprise/create_master_vm_from_vhd.ps1) を用いて新しい VM を起動します。
    * PowerShell から、`./create_master_vm_from_vhd.ps1` のような `ps1` ファイルを実行します。
    * AppVeyor ビルドクラウド定義で利用可能な認証情報が必要になります。
        * これは以下のものが含まれます。
            * クライアント ID
            * クライアントの秘密
            * テナント ID
            * サブスクリプション ID
            * リソースグループ
            * 仮想ネットワーク
    * 更に以下の指定が必要です
        * マスター VM 名 - 一時 VM を識別するための一意な名前です
        * マスター VM 容量 - `Standard_F32s_v2` を使用します
        * マスター VHD URI - 前のステップの最後で取得した URI を使用します
        * 位置情報は `East US` を使用します

6. Azure にログインし直して先ほど作成した VM を探します。ホーム < 仮想マシン < `$YOUR_NEW_VM` を見てください。
    * RDP (Remote Desktop) ファイルをダウンロードして VM にアクセスできます。

7. Microsoft リモート デスクトップを使用して、`接続` をクリックして VM に接続します。
    * VM にログインするための認証情報は、LastPass の `AppVeyor Enterprise マスター VM` 認証情報下にあります。

8. 必要に応じて VM を変更してください。

9. Azure で VM をシャットダウンして削除します。

10. Appveyor クラウドの設定に新しいイメージを追加するか、新しい VHD を指すように既存のイメージを変更します。
