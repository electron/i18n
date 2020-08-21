# Appveyor Azure 이미지 업데이트

Windows의 Electron CI는 AppVeyor를 사용하며, 이는 Azure VM 이미지를 사용하여 실행됩니다.  경우에 따라서 Chromium 요구 사항의 변경으로 인해 이러한 VM 이미지를 업데이트 해야합니다.  업데이트하려면 PowerShell 및 Azure PowerShell 모듈이 필요합니다.

경우에 따라서 Chromium의 변경 또는 기타 빌드 요구 사항 변경으로 인해 이러한 이미지를 업데이트해야 할 수도 있습니다.

사용 사례의 예:
    * VS15.9가 필요하고 VS15.7이 설치되어 있습니다. 이를 위해서는 Azure 이미지를 업데이트해야 합니다.

1. 수정하려는 이미지를 식별하세요.
    * appveyor.yml에서 이미지는 속성 이미지로 식별됩니다.
        * 사용된 이름은 빌드 클라우드(예: libcc-20 클라우드)에 대해 정의된 "이미지"에 해당합니다.
    * 빌드 클라우드에서 수정하려는 이미지를 찾고 해당 이미지의 VHD Blob Path (해당 키의 값)를 기록하세요.
        * 새 이미지로 복사하려면 URL 경로가 필요합니다.
    * AppVeyor에서 디스크 스토리지 계정 이름으로 레이블이 지정된 스토리지 계정 이름이 필요합니다.

2. Azure 저장소 계정 값 받기
    * LastPass (Azure Enterprise)에 저장된 자격 증명을 사용하여 Azure에 로그인한 다음 AppVeyor에 있는 이름에 해당하는 저장소 계정을 찾습니다.
        * 예를 들어, applibor libc빌드의 경우 스토리지 계정 목록에서 appveyor libc 빌드를 찾을 디스크 스토리지 계정 이름 @ 홈 < 스토리지 계정
            * 그것을 클릭하고 액세스 키를 찾으면 목록에 있는 키를 사용할 수 있습니다.

3. Azure에서 전체 가상 머신 이미지 URL 가져오기
    * 홈 < 스토리지 계정 < `$ACCT_NAME` < Blob < 이미지로 이동
        * 다음 목록에서 Appveyor에서 가져온 VHD 경로 이름을 찾아서 클릭하십시오.
            * 다음 상단에서 전체 URL을 복사하십시오.

4. [Copy Master Image PowerShell script](https://github.com/appveyor/ci/blob/master/scripts/enterprise/copy-master-image-azure.ps1)를 이용하여 이미지를 복사합니다.
    * VM을 복사하는 것은 이미지에 대해 VM을 작동하는 경우 AppVeyor에서 동시에 사용할 수 없기 때문에 필수적입니다.
    * Azure에서 가져온 저장소 계정 이름, 키 및 URI를 사용하여 이 스크립트를 실행합니다.
        * URI의 경우 Step 3 참조 & 메세지가 표시되면 엔터를 눌러 대상과 동일한 저장소 계정을 사용합니다.
        * `(images)`의 이름을 갖는 디폴트 데스티네이션 컨테이너을 사용하세요.
        * 또한 복사본의 이름을 지정할 떄 새이미지에 포함할 항목(변경된 경우) 과 날짜 스탬프를 나타태는 이름을 사용하세요.
            * 예. `libcc-20core-vs 2017-15.9-2019-04-15.vhd`
    * Azure로 이동하여 이전 단계에서 설명한 대로 새로 만든 이미지에 대한 URI를 가져옵니다.

5. [Create Master VM from VHD PowerShell](https://github.com/appveyor/ci/blob/master/scripts/enterprise/create_master_vm_from_vhd.ps1)을 이용하여 새로운 VM을 작동시키세요
    * PowerShell에서 `./create_master_vm_from_vhd.ps1`로 `ps1`파일을 실행하세요.
    * AppVeyor 빌드 클라우드 정의에서 사용할 수 있는 자격 증명 정보가 필요합니다.
        * 여기에는 다음이 포함됩니다.
            * 클라이언트 ID
            * 클라이언트 Secret
            * 테넌트 ID
            * 등록 ID
            * 리소스 그룹
            * 가상 네트워크
    * 또한 지정해야 합니다.
        * 마스터 VM 이름 - 임시 VM을 식별하는 고유한 이름일 뿐입니다.
        * 마스터 VM 크기 - `Standard_F32s_v2`을 사용하세요.
        * 마스터 VHD URI - 이전 단계의 끝에서 얻은 URI를 사용하세요.
        * `미국 동부`위치를 사용하세요.

6. Azure에 다시 로그인하고 홈에서 방금 만든 VM을 찾습니다. < 가상 머신 < `$YOUR_NEW_VM`
    * RDP(원격 데스크톱) 파일을 다운로드하여 VM에 액세스할 수 있습니다.

7. Microsoft 원격 데스크톱을 사용하여 `연결`을 클릭하여 VM에 연결합니다.
    * VM에 로그인하기 위한 자격 증명은 `AppVeyor 엔터프라이즈 마스터 VM` 자격 증명 아래의 LastPass에서 찾을 수 있습니다.

8. 필요에 따라 VM을 수정합니다.

9. VM을 종료한 다음 Azure에서 삭제합니다.

10. Appveyor 클라우드 설정에 새 이미지를 추가하거나 새 VHD를 가리키도록 기존 이미지를 수정하세요.
