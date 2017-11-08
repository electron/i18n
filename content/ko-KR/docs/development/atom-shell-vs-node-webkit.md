# Electron이 NW.js(node-webkit)와 기술적으로 다른점

**참고: Electron은 Atom Shell의 새로운 이름입니다.**

NW.js 처럼 Electron은 JavaScript와 HTML 그리고 Node 통합 환경을 제공함으로써 웹 페이지에서 저 수준 시스템에 접근할 수 있도록 하여 웹 기반 데스크탑 애플리케이션을 작성할 수 있도록 하는 프레임워크 입니다.

하지만 Electron과 NW.js는 근본적인 개발흐름의 차이도 있습니다:

**1. 애플리케이션의 엔트리 포인트**

NW.js에선 애플리케이션의 엔트리 포인트로 웹 페이지를 사용합니다. package.json내의 main 필드에 메인 웹 페이지(index.html) URL을 지정하면 애플리케이션의 메인 윈도우로 열리게 됩니다.

Electron에선 JavaScript를 엔트리 포인트로 사용합니다. URL을 직접 제공하는 대신 API를 사용하여 직접 브라우저 창과 HTML 파일을 로드할 수 있습니다. 또한 윈도우의 종료시기를 결정하는 이벤트를 리스닝해야 합니다.

Electron은 Node.js 런타임과 비슷하게 작동합니다. Electron의 API는 저수준이기에 브라우저 테스팅을 위해 PhantomJS를 사용할 수도 있습니다.

**2. 빌드 시스템**

Electron은 Chromium의 모든것을 빌드하는 복잡성을 피하기 위해 libchromiumcontent를 사용하여 Chromium의 Content API에 접근합니다. libchromiumcontent은 단일 공유 라이브러리이고 Chromium Content 모듈과 의존성 라이브러리들을 포함합니다. 유저는 Electron을 빌드 하기 위해 높은 사양의 빌드용 컴퓨터를 구비할 필요가 없습니다.

**3. Node 통합**

NW.js는 웹 페이지에서 require를 사용할 수 있도록 Chromium을 패치했습니다. 한편 Electron은 Chromium의 해킹을 방지하기 위해 libuv loop와 각 플랫폼의 메시지 루프에 통합하는 다른 방법을 채택하였습니다. Node_bindings의 코드를 보면 이 부분이 어떻게 구현됬는지 알 수 있습니다.

**4. 다중 컨텍스트**

만약 NW.js를 사용해본 적이 있다면 Node context와 Web context의 개념을 잘 알고 있을 겁니다. 이러한 개념은 NW.js가 구현되기 위해 만들어졌습니다.

Node의 다중 컨텍스트를 사용하기 때문에 Electron은 웹 페이지의 새로운 JavaScript 컨텍스트를 생성하지 않습니다.

참고: NW.js는 0.13 버전부터 선택적으로 다중 컨텍스트를 지원합니다.