# Elektrondaki Sorunlar

# Sorunlar

* [Sorunlara nasıl müdahil olunur](#how-to-contribute-in-issues)
* [Genel Yardım İstemek](#asking-for-general-help)
* [Hata raporu gönderme](#submitting-a-bug-report)
* [Bir hata raporu düzenle](#triaging-a-bug-report)
* [Bir hata raporu çözümlendir](#resolving-a-bug-report)

## Sorunlara nasıl müdahil olunur

Herhangi bir sorun için temelde bireyin katkı sağlayabileceği üç yöntem vardır:

1. Konuyu tartışmaya açmak: Eğer bir sorun bulduğunuza inanıyorsanız, `elektron/elektron` sayı izleyicisini açarak bunu rapor edin.
2. Sorunun öncelikli bir hale getirilmesine yardımcı olmak: Bunu ya detaylandırarak (hata gösteren bir yeniden üretilebilir sınama durumu) ya da sorunu gidermek için öneriler sunarak sağlayın.
3. Bu sorunu gidermek için yardımcı olmak: Bunu bir hata olmadığını ya da düzeldiğini göstererek; fakat da çok somut ve incelenebilir biçimde ` elektron / elektron </ 0> 'da kaynağında görünmesini sağlayın.</li>
</ol>

<h2>Genel Yardım İsteğinde Bulunmak</h2>

<p>Çünkü, etkinlik düzeyi <code>Elektron/elektron` deposundaki aktivite düzeyi çok yüksek olduğundan, soru sorarak veya elektron kullanarak genel yardım talepleri [topluluk bölümü Kanal](https://atomio.slack.com) veya [forum](https://discuss.atom.io/c/electron) yönelik olmalıdır.</p> 
    ## Hata raporu gönderme
    
    Sorun izleyici içinde yeni bir başlık açarken `electron/electron`, kullanıcılar tarafından doldurulması gereken bir şablon sunulacaktır.
    
    ```markdown
& Lt;! -
Bir sorunu açtığınız için teşekkür ederiz! Akılda tutulması gereken birkaç şey: 

- Sorun izleyici yalnızca hatalar ve özellik istekleri içindir.
- Bir hata bildirmeden önce lütfen Electron'un en son sürümünde sorununuzu tekrar deneyin.
- If you need general advice, join our Slack: http://atom-slack.herokuapp.com
-->

* Electron version:
* Operating system:

### Expected behavior

<!-- What do you think should happen? -->

### Actual behavior

<!-- What actually happens? -->

### How to reproduce

<!--

Your best chance of getting this bug looked at quickly is to provide a REPOSITORY that can be cloned and run.

You can fork https://github.com/electron/electron-quick-start and include a link to the branch with your changes.

If you provide a URL, please list the commands required to clone/setup/run your repo e.g.

  $ git clone $YOUR_URL -b $BRANCH
  $ npm install
  $ npm start || electron .

-->
```

If you believe that you have found a bug in Electron, please fill out this form to the best of your ability.

The two most important pieces of information needed to evaluate the report are a description of the bug and a simple test case to recreate it. It easier to fix a bug if it can be reproduced.

See [How to create a Minimal, Complete, and Verifiable example](https://stackoverflow.com/help/mcve).

## Bir hata raporu düzenle

It's common for open issues to involve discussion. Some contributors may have differing opinions, including whether the behavior is a bug or feature. This discussion is part of the process and should be kept focused, helpful, and professional.

Terse responses that provide neither additional context nor supporting detail are not helpful or professional. To many, such responses are annoying and unfriendly.

Contributors are encouraged to solve issues collaboratively and help one another make progress. If encounter an issue that you feel is invalid, or which contains incorrect information, explain *why* you feel that way with additional supporting context, and be willing to be convinced that you may be wrong. By doing so, we can often reach the correct outcome faster.

## Bir hata raporu çözümlendir

Most issues are resolved by opening a pull request. The process for opening and reviewing a pull request is similar to that of opening and triaging issues, but carries with it a necessary review and approval workflow that ensures that the proposed changes meet the minimal quality and functional guidelines of the Electron project.