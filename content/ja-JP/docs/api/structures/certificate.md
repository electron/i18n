# Certificate オブジェクト

* `data` String - PEMエンコードデータ
* `issuer` [CertificatePrincipal](certificate-principal.md) - 発行者
* `issuerName` String - 発行者のコモンネーム
* `issuerCert` Certificate - 発行者の証明書 (自己署名していない場合)
* `subject` [CertificatePrincipal](certificate-principal.md) - 発行先
* `subjectName` String - 発行先のコモンネーム
* `serialNumber` String - 16 進数の文字列
* `validExpiry` Number - 有効な証明書になる開始日の秒数
* `validExpiry` Number - 有効な証明書でなくなる終了日の秒数
* `fingerprint` String - 証明書のフィンガープリント
