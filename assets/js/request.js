
    function ajaxRequestWithJsonData (_global, _reqUrl, _reqParam, _successCallback, _errorMsg, _completeCallback)
    {
        $.ajax({
            global: _global,
            url: _reqUrl,
            type: "POST",
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
                /** 동기 처리를 할 때 사용함 **/
                if (_completeCallback)
                    _completeCallback();
            }
        });
    }


    function ajaxRequestWithFormData (_global, _reqUrl, _reqParam, _callback, _errorMsg, _completeCallback)
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
                _callback(data);
            },
            error: function (request, status) {
                sweetError(_errorMsg);
            },
            complete: function (xhr, status) {
                /** 동기 처리를 할 때 사용함 **/
                if (_completeCallback)
                    _completeCallback();
            }
        });
    }