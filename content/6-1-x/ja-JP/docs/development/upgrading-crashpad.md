# Crashpad のアップグレード

1. これから使う Crashpad のバージョンを取得してください。
  - `libcc/src/third_party/crashpad/README.chromium` の `Revision:` 行にチェックサムがあります
    - 対応するブランチをチェックアウトする必要があります。
  - Google の Crashpad をクローンします (https://chromium.googlesource.com/crashpad/crashpad)
    - `git clone https://chromium.googlesource.com/crashpad/crashpad`
  - リビジョンチェックサムでブランチをチェックアウトしてください。
      - `git checkout <revision checksum>`
  - Electron の Crashpad フォークをリモートとして追加します
    - `git remote add electron https://github.com/electron/crashpad`
  - 更新のために新しいブランチにチェックアウトします
    - `git checkout -b electron-crashpad-vA.B.C.D`
    - `A.B.C.D` は `libcc/VERSION` にある Chromium のバージョンで、`62.0.3202.94` のようになります

2. `git log --oneline` で適用する必要がある Electron パッチのチェックリストを作ります
    - もしくは https://github.com/electron/crashpad/commits/previous-branch-name を見てください

3. それぞれのパッチにおいて、
  - `electron-crashpad-vA.B.C.D` 内で、パッチのチェックサムで cherry-pick します
    - `git cherry-pick <checksum>`
  - コンフリクトを解決します
  - 念のためビルドしてから、add、commit、そして Electron の Crashpad フォークに push します
    - `git push electron electron-crashpad-vA.B.C.D`

4. 新しい Crashpad をビルドするために Electron を更新する:
  - `cd vendor/crashpad`
  - `git fetch`
  - `git checkout electron-crashpad-v62.0.3202.94`
5. 両方のターゲットに対して Ninja ファイルを再生成する
  - Electron root の最上層で、`script/update.py` を実行します。
  - `script/build.py -c D --target=crashpad_client`
  - `script/build.py -c D --target=crashpad_handler`
  - 両方のエラーをなくしてください
6. submodule 参照へ変更を push する
  - (Electron の最上層から) `git add vendor/crashpad`
  - `git push origin upgrade-to-chromium-62`
