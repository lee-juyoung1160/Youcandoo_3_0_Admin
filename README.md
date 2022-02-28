# 유캔두 어드민

## Plugins
[jQuery3.3.1](https://jquery.com)

[dataTables](https://datatables.net)

[SheetJS](https://sheetjs.com)

[chartjs](https://www.chartjs.org)

[sweetalert2](https://sweetalert2.github.io)

[swiper](http://swiperjs.com)

[crypto-js](https://code.google.com/archive/p/crypto-js)

## 주요 폴더 구조 및 설명
```bash
application
├── controllers
│   └── v2 : 컨트롤러(페이지 매핑)
├── views
│   └── v2 : 페이지 마크업(html)
│       ├── admin : 관리자
│       ├── biz : 비즈
│       ├── doit : 두잇
│       ├── gift : 상품
│       ├── emoticon : 이모티콘
│       ├── layout : 레이아웃 템플릿
│       ├── login : 로그인, 관리자등록, otp 인증, 마이페이지
│       ├── marketing : 마케팅
│       ├── member : 회원
│       ├── operate : 운영
│       ├── promotion : 프로모션
│       ├── report : 신고
│       ├── service : 고객센터
│       ├── ucd : UCD
│       └── main-dashboard.html : 메인 대시보드
├── assets
│   └── v2
│       └── css : 페이지 스타일(css)
│       └── js : 페이지 기능(js)
│           ├── admin : 관리자
│           ├── badge : 회원 > 뱃지 관리
│           ├── banner : 마케팅 > 배너 관리
│           ├── biz : 비즈
│           ├── bundles : 번들링 된 파일 모음. 실제 페이지에서 load 되는 파일.
│           ├── category : 두잇 > 카테고리 관리
│           ├── custom-event : 마케팅 > 참여이벤트 관리
│           ├── doit : 두잇 > 두잇 관리, 신규등록
│           ├── emoticon : 이모티콘
│           ├── encryption : 운영 > 암/복호화 처리
│           ├── error-message : 운영 > 오류 관리
│           ├── event : 마케팅 > 이벤트 관리
│           ├── faq : 고객센터 > FAQ
│           ├── gift : 상품
│           ├── inquiry : 고객센터 > 1:1 문의
│           ├── invite : 마케팅 > 친구초대 현황
│           ├── keyword : 두잇 > 추천 검색어
│           ├── login : 로그인, 관리자등록, opt 인증, 마이페이지
│           ├── logs : 운영 > 로그 관리
│           ├── member : 회원 > 회원 정보 조회
│           ├── modules : 자주 사용되는 로직을 모듈화 시켜놓은 파일 모음
│           ├── notice : 고객센터 > 공지사항
│           ├── pick : 두잇 > 유캔두 픽 두잇관리
│           ├── plugins : third party 라이브러리 모음
│           ├── popup : 마케팅 > 팝업 관리
│           ├── promotion : 프로모션
│           ├── push : 마케팅 > 푸시 관리
│           ├── rank : 두잇 > 유캔두 픽 랭킹관리
│           ├── report : 신고
│           ├── story : 마케팅 > 유캔두 스토리 
│           ├── ucd : UCD
│           ├── version : 운영 > 앱 버전관리
│           ├── main-dashboard.js : 메인 대시보드
│           └── menu.js : 사이드 메뉴
```

## Modules 폴더의 파일 및 주요 function 설명

#### ajax-request.js : ajax request에 필요한 function 모음
```javascript
import {ajaxRequestWithJson,  ajaxRequestWithFile} from "../modules/ajax-request.js";

ajaxRequestWithJson : json 파라미터로 api 호출 시 사용.

ajaxRequestWithFile : multipart/form-data로 파일 첨부할 때 사용.
```

#### alert.js : sweet-alert2를 이용한 custom alert 모음
```javascript
설명 생략.
```

#### api-url.js : api 호출 url이 선언된 모듈
```javascript
설명 생략.
```

#### common.js : 프로젝트 전역에서 빈번하게 사용하는 function 모음
```javascript
설명 생략.
```

#### doit-common.js : 두잇 등록, 목록, 상세 페이지에서 사용되는 function 모듈
```javascript
설명 생략.
```

#### elements.js : Dom control을 위한 html element가 선언된 모듈
```javascript
설명 생략.
```

#### export-excel.js : Sheet.js를 이용한 엑셀파일 입,출력과 관련된 function 모음
```javascript
설명 생략.
```

#### history.js : 뒤로가기 이벤트로 목록 페이지 진입할 때 이전 검색 조건을 유지하기 위한 모듈
```javascript
import {getHistoryParam, isBackAction, setHistoryParam} from "../modules/history.js";

isBackAction : 현재 페이지를 뒤로가기로 진입했는 지 여부

setHistoryParam : 목록 페이지에서 검색 조건을 localStorage에 저장할 때

getHistoryParam : 목록 페이지에서 이전 검색 조건을 localStorage부터 가져올 때

```

#### label.js, message.js : 빈번하게 사용하는 단어나 메세지 문구를 선한한 모듈
```javascript
설명 생략.
```

#### pgae-url.js : 페이지 주소가 선언된 모듈
```javascript
설명 생략.
```

#### tables.js : dataTable 사용할 때 공통으로 적용할 수 있는 function 모음
```javascript
설명 생략.
```

#### utils.js : util 모음
```javascript
설명 생략.
```
## js 파일 Bundle
* js파일 bundling 후 bundle 파일을 html에서 load.
* 라이브러리 : [webpack](https://webpack.js.org/)
* nodejs LTS 버전 설치 필수
* local pc에서 진행
```bash
  1. 임의의 경로에 임의의 폴더를 하나 생성한다.
  mkdir webpack-demo
  
  2. 생성된 폴더로 이동
  cd webpack-demo
  
  3. npm 초기화(pakage.json 파일생성)
  npm init -y
  
  4. webpack 및 webpack cli 설치
  npm install webpack webpack-cli --save-dev
  
  5. pakage.json 파일을 열어 scripts 항목에 아래 내용 추가
  "scripts": {
    "build": "webpack"
  }
```
```bash
  6. 폴더 최상위 레벨에 webpack.config.js 파일 생성 및 아래 내용 추가
  const path = require('path');

  module.exports = {
    entry: {
      menu: './src/menu.js',
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
  };

  // entry : bundle 대상이 될 파일 위치 및 이름 설정
  // output : bundle 파일이 생설될 위치 및 파일 이름에 대한 설정
  output.filename : bundle 파일이름
  output.path : bundle 파일이 생성될 위치(위 예제에선 폴더 최상위 레벨 dist라는 폴더에 생성됨)

  위 예시 에서 output.filename의 [name]부분은 entry의 menu에 해당 됨.
```
```bash
  7. 모든 설정이 완료되면 아래 명령로 bundling
  - npm 사용할 경우 : npm run build
  - yarn 사용할 경우 : yarn build

  8. output에 설정한 폴더에서 최종 결과물 확인
  9. bundle 된 파일을 프로젝트 내 assets > js > bundle 폴더로 복사
  10. 파일을 html에서 load
```