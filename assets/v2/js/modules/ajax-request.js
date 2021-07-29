
    const authorization = "9c3a60d74726c4e1cc0732fd280c89dbf80a344e7c3dc2c4ad4fdf12b97e52c7";
    const encryptAuth = btoa( JSON.stringify({ "authorization" : authorization,  "userid" : session_userid} ) );
    export const headers = { "Authorization" : encryptAuth };

    /**
     *  _global : 전역 이벤트 사용 여부. ajaxStart, ajaxComplete 이벤트 사용 중..(loader fadein, fadeout)
     *  _reqUrl : 요청 url
     *  _reqParam : 요청 파라미터
     * **/
    export function ajaxRequestWithFile(_global, _reqUrl, _reqParam)
    {
        return new Promise((resolve, reject) => {
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
                    resolve(data);
                },
                error: function (rejqXHR, textStatus, errorThrown) {
                    reject(errorThrown);
                },
                complete: function (xhr, status) {
                }
            });
        });
    }

    export function ajaxRequestWithJson (_global, _reqUrl, _reqParam)
    {
        return new Promise((resolve, reject) => {
            $.ajax({
                global: _global,
                url: _reqUrl,
                type: "POST",
                headers: headers,
                contentType: 'text/plain',
                dataType: 'json',
                data: _reqParam,
                success: function(data) {
                    resolve(data);
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    reject(errorThrown);
                },
                complete: function (xhr, status) {
                }
            });
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