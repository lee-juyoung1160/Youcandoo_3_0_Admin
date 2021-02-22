    import { sweetError } from "./alert.js";

    /**
     *  _global : 전역 이벤트 사용 여부. ajaxStart, ajaxComplete 이벤트 사용 중..(loader in, out)
     *  _reqUrl : 요청 url
     *  _reqParam : 요청 파라미터
     *  _successCallback : ajax success에서 callback
     *  _errorMsg : ajax error에서 띄울 에러메세지
     *  _completeCallback : ajax complete에서 callbak (동기처리할 때 사용 중..)
     * **/

    const authorization = "9c3a60d74726c4e1cc0732fd280c89dbf80a344e7c3dc2c4ad4fdf12b97e52c7";
    const userid = $("#session_userid").val();
    const encryptAuth = btoa( JSON.stringify({ "authorization" : authorization,  "userid" : userid} ) );
    export const headers = { "Authorization" : encryptAuth };

    export function ajaxRequestWithJsonData (_global, _reqUrl, _reqParam, _successCallback, _errorMsg, _completeCallback)
    {
        $.ajax({
            global: _global,
            url: _reqUrl,
            type: "POST",
            headers: headers,
            contentType: 'text/plain',
            dataType: 'json',
            data: _reqParam,
            success: function(data) {
                _successCallback(data);
            },
            error: function (request, status) {
                sweetError(_errorMsg);
            },
            complete: function (xhr, status) {
                if (_completeCallback)
                    _completeCallback();
            }
        });
    }


    export function ajaxRequestWithFormData (_global, _reqUrl, _reqParam, _successCallback, _errorMsg, _completeCallback)
    {
        $.ajax({
            url: _reqUrl,
            type: "POST",
            global: _global,
            processData: false,
            contentType: false,
            headers: headers,
            dataType: 'json',
            data: _reqParam,
            success: function(data) {
                _successCallback(data);
            },
            error: function (request, status) {
                sweetError(_errorMsg);
            },
            complete: function (xhr, status) {
                if (_completeCallback)
                    _completeCallback();
            }
        });
    }

    export function getStatusCode(data)
    {
        return data.status;
    }

    export function getStatusMessage(data)
    {
        let fileStatus = [30034, 30035, 30308];
        let msg = data.msg;
        let status = data.status;

        if (fileStatus.indexOf(status) > -1)
        {
            msg =
                `선택한 이미지 사이즈는 ${data.data.width} x ${data.data.height} 입니다.
                 ${data.msg}`
        }

        return msg;
    }

    export function isSuccessResp(data)
    {
        return getStatusCode(data) === 0;
    }

    export function invalidResp(data)
    {
        return data.msg;
    }