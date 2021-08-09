
# 유캔두 어드민
유캔두 어드민

## Plugins
[jQuery3.3.1](https://jquery.com/)

[dataTables](https://datatables.net/)

[SheetJS](https://sheetjs.com/)

[chartjs](https://www.chartjs.org/)

[sweetalert2](https://sweetalert2.github.io/)

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

#### api-url-v1.js : api 호출 url이 선언된 모듈
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
* js파일을 모듈로 구현했기 때문에 bundle 후 사용을 권장.(필수는 아님)
* 라이브러리 : [webpack](https://webpack.js.org/)
* nodejs LTS 버전 설치 필수
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
```javascript
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

// entry : bundling 대상이 될 파일 위치 및 이름 설정
// output : bundling 된 파일이 생설될 위치 및 파일 이름에 대한 설정
output.filename : bundling 된 파일이름
output.path : bundling 된 파일이 생성될 위치

위 예시 에서 output.filename의 [name]부분은 entry.menu에 해당 됨.
```
```bash
  7. 모든 설정이 완료되면 아래 명렬어로 bundling
  - npm 사용할 경우 : npm run build
  - yarn 사용할 경우 : yarn build

  8. output에 설정한 폴더에서 최종 결과물 확인
```