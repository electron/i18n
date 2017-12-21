# Certificate オブジェクト

* `data` String - PEMエンコードデータ
* `issuer` [CertificatePrincipal](certificate-principal.md) - 発行元
* `issuerName` String - 発行者の共通名
* `issuerCert` Certificate - 発行者証明書（自己署名していない場合）
* `subject` [CertificatePrincipal](certificate-principal.md) - 主要な件名
* `subjectName` String - 件名の共通名
* `serialNumber` String - 文字列を表す16進数
* `validExpiry` Number - 証明書が有効である開始日の秒数
* `validExpiry` Number - 証明書が有効である終了日の秒数
* `fingerprint` String - 証明書のフィンガープリント