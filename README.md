
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