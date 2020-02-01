# Elektrondaki Sorunlar

* [How to Contribute to Issues](#how-to-contribute-to-issues)
* [Genel Yardım İsteğinde Bulunmak](#asking-for-general-help)
* [Hata raporu gönderme](#submitting-a-bug-report)
* [Bir hata raporu düzenle](#triaging-a-bug-report)
* [Bir hata raporu çözümlendir](#resolving-a-bug-report)

## How to Contribute to Issues

Herhangi bir sorun için temelde bireyin katkı sağlayabileceği üç yöntem vardır:

1. By opening the issue for discussion: If you believe that you have found a new bug in Electron, you should report it by creating a new issue in the [`electron/electron` issue tracker](https://github.com/electron/electron/issues).
2. Sorunun öncelikli bir hale getirilmesine yardımcı olmak: Bunu ya detaylandırarak (hata gösteren bir yeniden üretilebilir sınama durumu) ya da sorunu gidermek için öneriler sunarak sağlayın.
3. Bu sorunu gidermek için yardımcı olmak: Bunu bir hata olmadığını ya da düzeldiğini göstererek; fakat da çok somut ve incelenebilir biçimde ` elektron / elektron </ 0> 'da kaynağında görünmesini sağlayın.</li>
</ol>

<h2>Genel Yardım İstemek</h2>

<p><a href="../tutorial/support.md#finding-support">"Finding Support"</a> has a
list of resources for getting programming help, reporting security issues,
contributing, and more. Please use the issue tracker for bugs only!</p>

<h2>Hata raporu gönderme</h2>

<p>To submit a bug report:</p>

<p>When opening a new issue in the <a href="https://github.com/electron/electron/issues/new/choose"><code>electron/electron` issue tracker</a>, users will be presented with a template that should be filled in.</p> 
    ```markdown
    <!--
    Bir sorunu açtığınız için teşekkür ederiz! Akılda tutulması gereken birkaç şey: 
    
    - Sorun izleyici yalnızca hatalar ve özellik istekleri içindir.
    - Bir hata bildirmeden önce lütfen Electron'un en son sürümünde sorununuzu tekrar deneyin.
    - Genel bir tavsiyeye ihtiyacınız varsa, Slack'e katılın: http://atom-slack.herokuapp.com
    -->
    
    * Elektron versiyonu:
    * İşletim sistemi:
    
    ### Beklenti
    
    <!-- Sizce ne olmalı? -->
    
    ### Gerçek davranış
    
    <!-- Aslında ne oluyor? -->
    
    ### Nasıl yeniden üretilir?
    
    <!--
    
    Bu hatayı hızlı bir şekilde gözden geçirmek için en doğru yöntem, klonlanıp çalıştırılabilecek bir REPOSITORY sağlamaktır.
    
    Https://github.com/electron/electron-quick-start'u forklayabilir ve değişliklerinizle şubeye bir bağlantı ekleyebilirsiniz.
    
    Bir URL girerseniz, lütfen repo örneğinizi kopyalamak / ayarlamak / çalıştırmak için gerekli komutları listeleyin. Örneğin,
    
      $ git clone $YOUR_URL -b $BRANCH
      $ npm install
      $ npm start || electron.
    
    -->
    ```
    
    If you believe that you have found a bug in Electron, please fill out this form to the best of your ability.
    
    The two most important pieces of information needed to evaluate the report are a description of the bug and a simple test case to recreate it. It is easier to fix a bug if it can be reproduced.
    
    See [How to create a Minimal, Complete, and Verifiable example](https://stackoverflow.com/help/mcve).
    
    ## Bir hata raporu düzenle
    
    It's common for open issues to involve discussion. Some contributors may have differing opinions, including whether the behavior is a bug or feature. This discussion is part of the process and should be kept focused, helpful, and professional.
    
    Terse responses that provide neither additional context nor supporting detail are not helpful or professional. To many, such responses are annoying and unfriendly.
    
    Contributors are encouraged to solve issues collaboratively and help one another make progress. If you encounter an issue that you feel is invalid, or which contains incorrect information, explain *why* you feel that way with additional supporting context, and be willing to be convinced that you may be wrong. By doing so, we can often reach the correct outcome faster.
    
    ## Bir hata raporu çözümlendir
    
    Most issues are resolved by opening a pull request. The process for opening and reviewing a pull request is similar to that of opening and triaging issues, but carries with it a necessary review and approval workflow that ensures that the proposed changes meet the minimal quality and functional guidelines of the Electron project.