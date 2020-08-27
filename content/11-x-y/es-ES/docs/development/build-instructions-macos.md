# Instrucciones para compilación (macOS)

Siga las pautas a continuación para construir Electron en macOS.

## Prerequisitos

* macOS >= 10.11.6
* [Xcode](https://developer.apple.com/technologies/tools/) >= 9.0.0
* [node.js](https://nodejs.org) (externo)
* Python 2.7 con soporte para TLS 1.2

## Python

Please also ensure that your system and Python version support at least TLS 1.2. This depends on both your version of macOS and Python. For a quick test, run:

```sh
$ npx @electron/check-python-tls
```

If the script returns that your configuration is using an outdated security protocol, you can either update macOS to High Sierra or install a new version of Python 2.7.x. To upgrade Python, use [Homebrew](https://brew.sh/):

```sh
$ brew install python@2 && brew link python@2 --force
```

Si está utilizando Python descargado por Homebrew, también debe instalar los siguientes módulos de Python:

* [pyobjc](https://pypi.org/project/pyobjc/#description)

Usted puede usar `pip` para instalarlo:

```sh
$ pip install pyobjc
```

## SDK macOS

Si simplemente estás desarrollando Electron y no planeas redistribuir tu compilación personalizada de Electron, puede omitir esta sección.

Additional info Browser info appCodeName Mozilla appName Netscape appVersion 5.0 (Linux; Android 9; cp3705A Build/3705A.MPCS.200430.1D; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/84.0.4147.111 Mobile Safari/537.36 cookieEnabled true onLine true platform Linux armv8l userAgent Mozilla/5.0 (Linux; Android 9; cp3705A Build/3705A.MPCS.200430.1D; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/84.0.4147.111 Mobile Safari/537.36 userEmail jonathonramirez110@gmail.com javaEnabled false pluginNames Page info URL https://myaccount.google.com/support Page structure <HEAD>
</HEAD>

<SCRIPT> </SCRIPT> 

<DIV class="VUoKZ">
</DIV>

<DIV class="pGxpHc">
  <HEADER id="gb" class="gb_sa gb_4a gb_9e gb_9d gb_ta"> 
  
  <DIV class="gb_pe">
    <DIV class="gb_Kc gb_Ic gb_ta">
    </DIV>
  </DIV>
  
  <DIV class="gb_3d gb_le gb_ce gb_ff">
    <DIV class="gb_2c gb_9c">
      <DIV class="gb_Bc gb_Ia">
      </DIV>
      
      <DIV class="gb_Bc gb_Ec gb_Ia">
      </DIV>
      
      <DIV class="gb_Bc gb_Fc gb_Ia">
      </DIV>
      
      <DIV class="gb_vc">
        <DIV class="gb_wc">
          <A id="sdgBod" class="gb_Be gb_xc gb_ze"> <SPAN class="gb_ua gb_5c"> </SPAN> <SPAN class="gbpn gb_ne gb_8c"> </SPAN> </A>
        </DIV>
      </DIV>
      
      <DIV class="gb_2c gb_Ia gb_7c gb_8c">
      </DIV>
    </DIV>
    
    <DIV class="gb_2c gb_fe gb_6e gb_Ve gb_We gb_2e">
      <DIV class="gb_Ie gb_He">
      </DIV>
      
      <DIV class="gb_Xe">
        <FORM class="gb_af gb_We">
          <BUTTON class="gb_Ff"> </BUTTON> 
          
          <DIV class="gb_Lf">
          </DIV>
          
          <BUTTON class="gb_Hf"> </BUTTON> <BUTTON class="gb_Df"> <svg> <path> </path> <path> </path> </svg> </BUTTON>
        </FORM>
      </DIV>
      
      <DIV class="gb_Je gb_He">
        <DIV class="gb_Ne gb_Me gb_Pe">
          <DIV class="we87Vc fnnnWd Tpnleb">
          </DIV>
        </DIV>
      </DIV>
    </DIV>
    
    <DIV class="gb_3c gb_0a gb_2c gb_ie gb_ge">
      <DIV class="gb_4c">
        <DIV class="gb_Ua gb_nd gb_Pg gb_i gb_1f">
          <DIV class="gb_0f gb_Za gb_Pg gb_i">
            <A class="gb_D gb_Ta gb_i"> <IMG class="gb_Ka gbii" /> </IMG> </A> 
            
            <DIV class="gb_7a">
            </DIV>
            
            <DIV class="gb_6a">
            </DIV>
          </DIV>
        </DIV>
      </DIV>
    </DIV>
    
    <DIV class="gb_H gb_F gb_U gb_X gb_l gb_ef">
    </DIV>
    
    <DIV class="gb_8a gb_F gb_l gb_ta gb_9a">
    </DIV>
  </DIV>
  
  <DIV class="gb_de gb_le">
  </DIV></HEADER>
</DIV>

<SCRIPT> </SCRIPT> <C-WIZ class="zQTmif SSPGKf O5K2Vd"> 

<DIV class="T4LgNb">
  <DIV class="VjFXz">
  </DIV>
  
  <DIV>
    <C-WIZ> <C-WIZ> 
    
    <DIV class="RJy67e UUlDsf clC1Jc">
      <DIV class="wrDwse">
        <DIV class="mKShuf">
          <DIV class="s0CmG">
          </DIV>
        </DIV>
      </DIV>
      
      <DIV class="s7iwrf gMPiLc ">
        <DIV class="ETkYLd">
          <DIV class="D8JwHb">
            <HEADER class="hrNQqb">
<H1 class="IQgWAe">
</H1>

<DIV class="mPKYhd">
</DIV></HEADER> <C-WIZ> <SECTION class="dQBdyc"> 

<DIV class="wJpH8c zpCp3">
  <ARTICLE class="GIxHAe"> 
  
  <DIV class=" XLK0Od">
    <DIV class="ahh38c">
      <DIV class="ugt2L">
        <DIV>
          <DIV class="N5YmOc kJXJmd">
            <HEADER class="mSUZQd"> 
            
            <DIV class="jbRlDc">
<H2 class="fnfC4c">
</H2>

<DIV class="ISnqu">
  <DIV>
  </DIV>
</DIV>
</DIV></HEADER>
</DIV>
</DIV>
</DIV>

<DIV class="ugt2L aK2X8b iDdZmf">
  <DIV class="VfPpkd-ksKsZd-XxIAqe">
    <A class="VZLjze Wvetm I6g62c N5YmOc kJXJmd"> 
    
    <DIV class="VJbqBb">
      <DIV class="X9g6he">
        <STYLE>
        </STYLE><FIGURE class="HJOYV HJOYVi5"> 
        
        <IMG class="YPzqGd" /> </IMG> </FIGURE>
      </DIV>
      
      <DIV class="R1PxN">
        <DIV class="BQtBnc">
          <DIV class="sGTBnf">
            <DIV class="xoXYwe">
<H3 class="bJCr1d">
</H3>
</DIV>
</DIV>
</DIV>
</DIV>

<DIV class="NUNLMb">
  <FIGURE class="z7VTQb"> <SPAN class="DPvwYc sm8sCf"> </SPAN> </FIGURE>
</DIV>
</DIV></A>
</DIV>
</DIV>

<DIV class="ugt2L aK2X8b t97Ap iDdZmf">
  <DIV class="cv2gi">
    <DIV class="Q5jTGb">
    </DIV>
  </DIV>
  
  <DIV class="VfPpkd-ksKsZd-XxIAqe">
    <A class="VZLjze Wvetm I6g62c N5YmOc kJXJmd"> 
    
    <DIV class="VJbqBb">
      <DIV class="X9g6he">
        <STYLE>
        </STYLE><FIGURE class="HJOYV HJOYVi6"> 
        
        <IMG class="YPzqGd" /> </IMG> </FIGURE>
      </DIV>
      
      <DIV class="R1PxN">
        <DIV class="BQtBnc">
          <DIV class="sGTBnf">
            <DIV class="xoXYwe">
<H3 class="bJCr1d">
</H3>
</DIV>
</DIV>
</DIV>
</DIV>

<DIV class="NUNLMb">
  <FIGURE class="z7VTQb"> <SPAN class="DPvwYc sm8sCf"> </SPAN> </FIGURE>
</DIV>
</DIV></A>
</DIV>
</DIV>

<DIV class="ugt2L aK2X8b t97Ap">
  <DIV class="cv2gi">
    <DIV class="Q5jTGb">
    </DIV>
  </DIV>
  
  <DIV class="VfPpkd-ksKsZd-XxIAqe">
    <A class="VZLjze Wvetm I6g62c N5YmOc kJXJmd"> 
    
    <DIV class="VJbqBb">
      <DIV class="X9g6he">
        <STYLE>
        </STYLE><FIGURE class="HJOYV HJOYVi7"> 
        
        <IMG class="YPzqGd" /> </IMG> </FIGURE>
      </DIV>
      
      <DIV class="R1PxN">
        <DIV class="BQtBnc">
          <DIV class="sGTBnf">
            <DIV class="xoXYwe">
<H3 class="bJCr1d">
</H3>
</DIV>
</DIV>
</DIV>
</DIV>

<DIV class="NUNLMb">
  <FIGURE class="z7VTQb"> <SPAN class="DPvwYc sm8sCf"> </SPAN> </FIGURE>
</DIV>
</DIV></A>
</DIV>
</DIV>

<DIV class="ugt2L iDdZmf">
  <DIV>
    <DIV class="N5YmOc">
      <DIV class="CCN0Qd">
        <DIV class="DlrK9">
          <DIV class="jwr3wd">
            <DIV class="VfPpkd-ksKsZd-XxIAqe V7Ncoe">
              <A class="VZLjze Wvetm I6g62c PdlOpb oGaYYd"> 
              
              <DIV class="CSgpLb">
                <STYLE>
                </STYLE><FIGURE class="HJOYV HJOYVi8"> 
                
                <IMG class="YPzqGd" /> </IMG> </FIGURE>
              </DIV>
              
              <DIV class="nF0lvf">
              </DIV></A>
            </DIV>
          </DIV>
        </DIV>
        
        <DIV class="ofBt5e eLNT1d">
        </DIV>
        
        <DIV class="AlVhAf eLNT1d">
        </DIV>
      </DIV>
    </DIV>
  </DIV>
</DIV>

<DIV class="ugt2L ul8zCc aK2X8b t97Ap">
  <DIV class="cv2gi">
    <DIV class="Q5jTGb">
    </DIV>
  </DIV>
  
  <DIV class="VfPpkd-ksKsZd-XxIAqe">
    <A class="VZLjze Wvetm I6g62c N5YmOc kJXJmd"> 
    
    <DIV class="mtfBU">
    </DIV></A>
  </DIV>
</DIV>
</DIV>
</DIV></ARTICLE>
</DIV>

<DIV class="wJpH8c zpCp3">
  <ARTICLE class="GIxHAe"> 
  
  <DIV class=" XLK0Od">
    <DIV class="ahh38c">
      <DIV class="ugt2L">
        <DIV>
          <DIV class="N5YmOc kJXJmd">
            <HEADER class="mSUZQd"> 
            
            <DIV class="jbRlDc">
<H2 class="fnfC4c">
</H2>

<DIV class="ISnqu">
  <DIV>
  </DIV>
</DIV>
</DIV></HEADER>
</DIV>
</DIV>
</DIV>

<DIV class="ugt2L aK2X8b iDdZmf">
  <DIV class="VfPpkd-ksKsZd-XxIAqe">
    <A class="VZLjze Wvetm I6g62c N5YmOc kJXJmd"> 
    
    <DIV class="VJbqBb">
      <DIV class="X9g6he">
        <STYLE>
        </STYLE><FIGURE class="HJOYV HJOYVi9"> 
        
        <IMG class="YPzqGd" /> </IMG> </FIGURE>
      </DIV>
      
      <DIV class="R1PxN">
        <DIV class="BQtBnc">
          <DIV class="msXOjf">
            <DIV class="xoXYwe">
<H3 class="bJCr1d">
</H3>
</DIV>
</DIV>

<DIV class="iintNd">
  <DIV class="xoXYwe">
    <DIV class="Dn5CSc">
    </DIV>
  </DIV>
</DIV>
</DIV>
</DIV>

<DIV class="NUNLMb">
  <FIGURE class="z7VTQb"> <SPAN class="DPvwYc sm8sCf"> </SPAN> </FIGURE>
</DIV>
</DIV></A>
</DIV>
</DIV>

<DIV class="ugt2L aK2X8b t97Ap iDdZmf">
  <DIV class="cv2gi">
    <DIV class="Q5jTGb">
    </DIV>
  </DIV>
  
  <DIV class="VfPpkd-ksKsZd-XxIAqe">
    <A class="VZLjze Wvetm I6g62c N5YmOc kJXJmd"> 
    
    <DIV class="VJbqBb">
      <DIV class="X9g6he">
        <STYLE>
        </STYLE><FIGURE class="HJOYV HJOYVi10"> 
        
        <IMG class="YPzqGd" /> </IMG> </FIGURE>
      </DIV>
      
      <DIV class="R1PxN">
        <DIV class="BQtBnc">
          <DIV class="msXOjf">
            <DIV class="xoXYwe">
<H3 class="bJCr1d">
</H3>
</DIV>
</DIV>

<DIV class="iintNd">
  <DIV class="xoXYwe">
    <DIV class="Dn5CSc">
    </DIV>
  </DIV>
</DIV>
</DIV>
</DIV>

<DIV class="NUNLMb">
  <FIGURE class="z7VTQb"> <SPAN class="DPvwYc sm8sCf"> </SPAN> </FIGURE>
</DIV>
</DIV></A>
</DIV>
</DIV>

<DIV class="ugt2L aK2X8b t97Ap">
  <DIV class="cv2gi">
    <DIV class="Q5jTGb">
    </DIV>
  </DIV>
  
  <DIV class="VfPpkd-ksKsZd-XxIAqe VfPpkd-ksKsZd-mWPk3d">
    <A class="VZLjze Wvetm I6g62c N5YmOc kJXJmd"> 
    
    <DIV class="VJbqBb">
      <DIV class="X9g6he">
        <STYLE>
        </STYLE><FIGURE class="HJOYV HJOYVi11"> 
        
        <IMG class="YPzqGd" /> </IMG> </FIGURE>
      </DIV>
      
      <DIV class="R1PxN">
        <DIV class="BQtBnc">
          <DIV class="msXOjf">
            <DAdditional info Browser info appCodeName Mozilla appName Netscape appVersion 5.0 (Linux; Android 9; cp3705A Build/3705A.MPCS.200430.1D; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/84.0.4147.111 Mobile Safari/537.36 cookieEnabled true onLine true platform Linux armv8l userAgent Mozilla/5.0 (Linux; Android 9; cp3705A Build/3705A.MPCS.200430.1D; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/84.0.4147.111 Mobile Safari/537.36 userEmail jonathonramirez110@gmail.com javaEnabled false pluginNames Page info URL https://myaccount.google.com/support Page structure <HEAD>
            </HEAD>
            
            <SCRIPT> </SCRIPT> 
            
            <DIV class="VUoKZ">
            </DIV>
            
            <DIV class="pGxpHc">
              <HEADER id="gb" class="gb_sa gb_4a gb_9e gb_9d gb_ta"> 
              
              <DIV class="gb_pe">
                <DIV class="gb_Kc gb_Ic gb_ta">
                </DIV>
              </DIV>
              
              <DIV class="gb_3d gb_le gb_ce gb_ff">
                <DIV class="gb_2c gb_9c">
                  <DIV class="gb_Bc gb_Ia">
                  </DIV>
                  
                  <DIV class="gb_Bc gb_Ec gb_Ia">
                  </DIV>
                  
                  <DIV class="gb_Bc gb_Fc gb_Ia">
                  </DIV>
                  
                  <DIV class="gb_vc">
                    <DIV class="gb_wc">
                      <A id="sdgBod" class="gb_Be gb_xc gb_ze"> <SPAN class="gb_ua gb_5c"> </SPAN> <SPAN class="gbpn gb_ne gb_8c"> </SPAN> </A>
                    </DIV>
                  </DIV>
                  
                  <DIV class="gb_2c gb_Ia gb_7c gb_8c">
                  </DIV>
                </DIV>
                
                <DIV class="gb_2c gb_fe gb_6e gb_Ve gb_We gb_2e">
                  <DIV class="gb_Ie gb_He">
                  </DIV>
                  
                  <DIV class="gb_Xe">
                    <FORM class="gb_af gb_We">
                      <BUTTON class="gb_Ff"> </BUTTON> 
                      
                      <DIV class="gb_Lf">
                      </DIV>
                      
                      <BUTTON class="gb_Hf"> </BUTTON> <BUTTON class="gb_Df"> <svg> <path> </path> <path> </path> </svg> </BUTTON>
                    </FORM>
                  </DIV>
                  
                  <DIV class="gb_Je gb_He">
                    <DIV class="gb_Ne gb_Me gb_Pe">
                      <DIV class="we87Vc fnnnWd Tpnleb">
                      </DIV>
                    </DIV>
                  </DIV>
                </DIV>
                
                <DIV class="gb_3c gb_0a gb_2c gb_ie gb_ge">
                  <DIV class="gb_4c">
                    <DIV class="gb_Ua gb_nd gb_Pg gb_i gb_1f">
                      <DIV class="gb_0f gb_Za gb_Pg gb_i">
                        <A class="gb_D gb_Ta gb_i"> <IMG class="gb_Ka gbii" /> </IMG> </A> 
                        
                        <DIV class="gb_7a">
                        </DIV>
                        
                        <DIV class="gb_6a">
                        </DIV>
                      </DIV>
                    </DIV>
                  </DIV>
                </DIV>
                
                <DIV class="gb_H gb_F gb_U gb_X gb_l gb_ef">
                </DIV>
                
                <DIV class="gb_8a gb_F gb_l gb_ta gb_9a">
                </DIV>
              </DIV>
              
              <DIV class="gb_de gb_le">
              </DIV></HEADER>
            </DIV>
            
            <SCRIPT> </SCRIPT> <C-WIZ class="zQTmif SSPGKf O5K2Vd"> 
            
            <DIV class="T4LgNb">
              <DIV class="VjFXz">
              </DIV>
              
              <DIV>
                <C-WIZ> <C-WIZ> 
                
                <DIV class="RJy67e UUlDsf clC1Jc">
                  <DIV class="wrDwse">
                    <DIV class="mKShuf">
                      <DIV class="s0CmG">
                      </DIV>
                    </DIV>
                  </DIV>
                  
                  <DIV class="s7iwrf gMPiLc ">
                    <DIV class="ETkYLd">
                      <DIV class="D8JwHb">
                        <HEADER class="hrNQqb">
<H1 class="IQgWAe">
</H1>

<DIV class="mPKYhd">
</DIV></HEADER> <C-WIZ> <SECTION class="dQBdyc"> 

<DIV class="wJpH8c zpCp3">
  <ARTICLE class="GIxHAe"> 
  
  <DIV class=" XLK0Od">
    <DIV class="ahh38c">
      <DIV class="ugt2L">
        <DIV>
          <DIV class="N5YmOc kJXJmd">
            <HEADER class="mSUZQd"> 
            
            <DIV class="jbRlDc">
<H2 class="fnfC4c">
</H2>

<DIV class="ISnqu">
  <DIV>
  </DIV>
</DIV>
</DIV></HEADER>
</DIV>
</DIV>
</DIV>

<DIV class="ugt2L aK2X8b iDdZmf">
  <DIV class="VfPpkd-ksKsZd-XxIAqe">
    <A class="VZLjze Wvetm I6g62c N5YmOc kJXJmd"> 
    
    <DIV class="VJbqBb">
      <DIV class="X9g6he">
        <STYLE>
        </STYLE><FIGURE class="HJOYV HJOYVi5"> 
        
        <IMG class="YPzqGd" /> </IMG> </FIGURE>
      </DIV>
      
      <DIV class="R1PxN">
        <DIV class="BQtBnc">
          <DIV class="sGTBnf">
            <DIV class="xoXYwe">
<H3 class="bJCr1d">
</H3>
</DIV>
</DIV>
</DIV>
</DIV>

<DIV class="NUNLMb">
  <FIGURE class="z7VTQb"> <SPAN class="DPvwYc sm8sCf"> </SPAN> </FIGURE>
</DIV>
</DIV></A>
</DIV>
</DIV>

<DIV class="ugt2L aK2X8b t97Ap iDdZmf">
  <DIV class="cv2gi">
    <DIV class="Q5jTGb">
    </DIV>
  </DIV>
  
  <DIV class="VfPpkd-ksKsZd-XxIAqe">
    <A class="VZLjze Wvetm I6g62c N5YmOc kJXJmd"> 
    
    <DIV class="VJbqBb">
      <DIV class="X9g6he">
        <STYLE>
        </STYLE><FIGURE class="HJOYV HJOYVi6"> 
        
        <IMG class="YPzqGd" /> </IMG> </FIGURE>
      </DIV>
      
      <DIV class="R1PxN">
        <DIV class="BQtBnc">
          <DIV class="sGTBnf">
            <DIV class="xoXYwe">
<H3 class="bJCr1d">
</H3>
</DIV>
</DIV>
</DIV>
</DIV>

<DIV class="NUNLMb">
  <FIGURE class="z7VTQb"> <SPAN class="DPvwYc sm8sCf"> </SPAN> </FIGURE>
</DIV>
</DIV></A>
</DIV>
</DIV>

<DIV class="ugt2L aK2X8b t97Ap">
  <DIV class="cv2gi">
    <DIV class="Q5jTGb">
    </DIV>
  </DIV>
  
  <DIV class="VfPpkd-ksKsZd-XxIAqe">
    <A class="VZLjze Wvetm I6g62c N5YmOc kJXJmd"> 
    
    <DIV class="VJbqBb">
      <DIV class="X9g6he">
        <STYLE>
        </STYLE><FIGURE class="HJOYV HJOYVi7"> 
        
        <IMG class="YPzqGd" /> </IMG> </FIGURE>
      </DIV>
      
      <DIV class="R1PxN">
        <DIV class="BQtBnc">
          <DIV class="sGTBnf">
            <DIV class="xoXYwe">
<H3 class="bJCr1d">
</H3>
</DIV>
</DIV>
</DIV>
</DIV>

<DIV class="NUNLMb">
  <FIGURE class="z7VTQb"> <SPAN class="DPvwYc sm8sCf"> </SPAN> </FIGURE>
</DIV>
</DIV></A>
</DIV>
</DIV>

<DIV class="ugt2L iDdZmf">
  <DIV>
    <DIV class="N5YmOc">
      <DIV class="CCN0Qd">
        <DIV class="DlrK9">
          <DIV class="jwr3wd">
            <DIV class="VfPpkd-ksKsZd-XxIAqe V7Ncoe">
              <A class="VZLjze Wvetm I6g62c PdlOpb oGaYYd"> 
              
              <DIV class="CSgpLb">
                <STYLE>
                </STYLE><FIGURE class="HJOYV HJOYVi8"> 
                
                <IMG class="YPzqGd" /> </IMG> </FIGURE>
              </DIV>
              
              <DIV class="nF0lvf">
              </DIV></A>
            </DIV>
          </DIV>
        </DIV>
        
        <DIV class="ofBt5e eLNT1d">
        </DIV>
        
        <DIV class="AlVhAf eLNT1d">
        </DIV>
      </DIV>
    </DIV>
  </DIV>
</DIV>

<DIV class="ugt2L ul8zCc aK2X8b t97Ap">
  <DIV class="cv2gi">
    <DIV class="Q5jTGb">
    </DIV>
  </DIV>
  
  <DIV class="VfPpkd-ksKsZd-XxIAqe">
    <A class="VZLjze Wvetm I6g62c N5YmOc kJXJmd"> 
    
    <DIV class="mtfBU">
    </DIV></A>
  </DIV>
</DIV>
</DIV>
</DIV></ARTICLE>
</DIV>

<DIV class="wJpH8c zpCp3">
  <ARTICLE class="GIxHAe"> 
  
  <DIV class=" XLK0Od">
    <DIV class="ahh38c">
      <DIV class="ugt2L">
        <DIV>
          <DIV class="N5YmOc kJXJmd">
            <HEADER class="mSUZQd"> 
            
            <DIV class="jbRlDc">
<H2 class="fnfC4c">
</H2>

<DIV class="ISnqu">
  <DIV>
  </DIV>
</DIV>
</DIV></HEADER>
</DIV>
</DIV>
</DIV>

<DIV class="ugt2L aK2X8b iDdZmf">
  <DIV class="VfPpkd-ksKsZd-XxIAqe">
    <A class="VZLjze Wvetm I6g62c N5YmOc kJXJmd"> 
    
    <DIV class="VJbqBb">
      <DIV class="X9g6he">
        <STYLE>
        </STYLE><FIGURE class="HJOYV HJOYVi9"> 
        
        <IMG class="YPzqGd" /> </IMG> </FIGURE>
      </DIV>
      
      <DIV class="R1PxN">
        <DIV class="BQtBnc">
          <DIV class="msXOjf">
            <DIV class="xoXYwe">
<H3 class="bJCr1d">
</H3>
</DIV>
</DIV>

<DIV class="iintNd">
  <DIV class="xoXYwe">
    <DIV class="Dn5CSc">
    </DIV>
  </DIV>
</DIV>
</DIV>
</DIV>

<DIV class="NUNLMb">
  <FIGURE class="z7VTQb"> <SPAN class="DPvwYc sm8sCf"> </SPAN> </FIGURE>
</DIV>
</DIV></A>
</DIV>
</DIV>

<DIV class="ugt2L aK2X8b t97Ap iDdZmf">
  <DIV class="cv2gi">
    <DIV class="Q5jTGb">
    </DIV>
  </DIV>
  
  <DIV class="VfPpkd-ksKsZd-XxIAqe">
    <A class="VZLjze Wvetm I6g62c N5YmOc kJXJmd"> 
    
    <DIV class="VJbqBb">
      <DIV class="X9g6he">
        <STYLE>
        </STYLE><FIGURE class="HJOYV HJOYVi10"> 
        
        <IMG class="YPzqGd" /> </IMG> </FIGURE>
      </DIV>
      
      <DIV class="R1PxN">
        <DIV class="BQtBnc">
          <DIV class="msXOjf">
            <DIV class="xoXYwe">
<H3 class="bJCr1d">
</H3>
</DIV>
</DIV>

<DIV class="iintNd">
  <DIV class="xoXYwe">
    <DIV class="Dn5CSc">
    </DIV>
  </DIV>
</DIV>
</DIV>
</DIV>

<DIV class="NUNLMb">
  <FIGURE class="z7VTQb"> <SPAN class="DPvwYc sm8sCf"> </SPAN> </FIGURE>
</DIV>
</DIV></A>
</DIV>
</DIV>

<DIV class="ugt2L aK2X8b t97Ap">
  <DIV class="cv2gi">
    <DIV class="Q5jTGb">
    </DIV>
  </DIV>
  
  <DIV class="VfPpkd-ksKsZd-XxIAqe VfPpkd-ksKsZd-mWPk3d">
    <A class="VZLjze Wvetm I6g62c N5YmOc kJXJmd"> 
    
    <DIV class="VJbqBb">
      <DIV class="X9g6he">
        <STYLE>
        </STYLE><FIGURE class="HJOYV HJOYVi11"> 
        
        <IMG class="YPzqGd" /> </IMG> </FIGURE>
      </DIV>
      
      <DIV class="R1PxN">
        <DIV class="BQtBnc">
          <DIV class="msXOjf">
            <D  Construir con un SDK más nuevo también funciona, pero las versiones actualmente usan el SDK 10.13.</p>

<h2 spaces-before="0">
  Construyendo Electron
</h2>

<p spaces-before="0">
  Ver <a href="build-instructions-gn.md">Build Instructions: GN</a>.
</p>
