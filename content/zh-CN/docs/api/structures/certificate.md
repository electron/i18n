# Certificate Object 证书对象

* `data` String - PEM 编码数据
* `issuer` [CertificatePrincipal](certificate-principal.md) - 主要的发行者
* `issuerName` String - 发行者通用名
* `issuerCert` Certificate - 发行者证书(没有自签名)
* `subject` [CertificatePrincipal](certificate-principal.md) - 首要主题
* `subjectName` String - 主题的通用名
* `serialNumber` String - Hex value represented string
* `validStart` Number - 证书生效的开始日期，以秒表示
* `validExpiry` Number - 证书失效的结束日期，以秒表示
* `fingerprint` String - 证书的指纹
