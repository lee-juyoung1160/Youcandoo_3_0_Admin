
    const noticeBtn          = $("#notice");
    const noticeList         = $(".notice-list");
    const onNotice           = $(".on-notice");
    const selectTarget       = $(".select-box select");
    const dayButtons         = $(".day-btn li");
    const datePicker         = $(".datepicker");
    const dateFrom           = $(".date_from");
    const dateTo             = $(".date_to");
    const inputNumber        = $(".only-num");
    const viewLoading        = $("#viewLoading");
    const lengthInput        = $(".length-input");
    const sessionUserId      = $("#session_userid");
    const sessionAuthCode    = $("#session_authcode");
    const sideMenu           = $("#sideMenu");

    /*noticeBtn       .on("click", function () {  onClickActiveNotice(); });*/
    selectTarget    .on("change", function () { onChangeSelectOption(this); });
    inputNumber     .on("propertychange change keyup paste input", function () { initInputNumber(this); });
    lengthInput     .on("propertychange change keyup paste input", function () { checkInputLength(this); });
    dateFrom        .on("change", function () { onChangeSearchDateFrom(this); });
    dateTo          .on("change", function () { onChangeSearchDateTo(this); });

    /** 권한별 레프트 메뉴 불러오기 **/
    getLeftMenuByAuthCode();

    /** 글자수 체크 **/
    function checkInputLength(obj)
    {
        let inputLength = $(obj).val().length;
        let maxLength   = $(obj).attr('maxLength');

        if (inputLength > maxLength)
        {
            $(obj).val($(obj).val().slice(0, maxLength))
            inputLength = maxLength;
        }

        $(obj).next().find(".count-input").html(inputLength);
    }

    function calculateInputLength()
    {
        $(".length-input").each(function () {
            checkInputLength(this);
        });
    }

    function getPromotionStatusName(param)
    {
        if (param === 'pending') return '대기';
        if (param === 'progress') return '진행';
        if (param === 'end') return '마감';
        if (param === 'terminate') return '종료';
    }

    function fadeinLoader()
    {
        viewLoading.fadeIn(100);
    }

    function fadeoutLoader()
    {
        viewLoading.fadeOut(100);
    }

    /** 페이지 상단 > 벨 아이콘 클릭 이벤트 **/
    /*function onClickActiveNotice()
    {
        if (!noticeBtn.hasClass("active"))
        {
            noticeBtn   .addClass("active");
            noticeList  .addClass("active");
            onNotice    .addClass("active");
        }
        else
        {
            noticeBtn   .removeClass("active");
            noticeList  .removeClass("active");
            onNotice    .removeClass("active");
        }
    }*/

    /** 셀렉트 옵션 > 선택값에 따라 text 변경 **/
    function onChangeSelectOption(obj)
    {
        let select_name = $(obj).children('option:selected').text();

        $(obj).siblings("label").text(select_name);
    }

    /** 목록페이지 > 상단검색 > 날짜 > 오늘,1주일,1개월,3개월 활성/비활성 **/
    function onClickActiveAloneDayBtn(obj)
    {
        dayButtons.removeClass("active");
        $(obj).addClass("active");

        if ($(obj).hasClass("btn_today"))
        {
            datePicker.datepicker("setDate", "today");
        }
        else if ($(obj).hasClass("btn_week"))
        {
            dateFrom.datepicker("setDate", "-7D");
            dateTo.datepicker("setDate", "today");
        }
        else if ($(obj).hasClass("btn_month"))
        {
            dateFrom.datepicker("setDate", "-1M");
            dateTo.datepicker("setDate", "today");
        }
        else if ($(obj).hasClass("btn_long"))
        {
            dateFrom.datepicker("setDate", "-3M");
            dateTo.datepicker("setDate", "today");
        }
    }

    function setDateToday()
    {
        datePicker.datepicker("setDate", "today");
    }

    function initInputTodayDatepicker()
    {
        datePicker.datepicker({
            dateFormat: "yy-mm-dd"
            ,monthNames: ["1월", "2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"]
            ,dayNames: ["일", "월", "화", "수", "목", "금", "토"]
            ,dayNamesMin: ["일", "월", "화", "수", "목", "금", "토"]
            ,minDate: 0
        });
    }

    function initInputDatepicker()
    {
        datePicker.datepicker({
            dateFormat: "yy-mm-dd"
            ,monthNames: ["1월", "2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"]
            ,dayNames: ["일", "월", "화", "수", "목", "금", "토"]
            ,dayNamesMin: ["일", "월", "화", "수", "목", "금", "토"]
            ,minDate: +1
        });
    }

    function initSearchDatepicker()
    {
        datePicker.datepicker({
            dateFormat: "yy-mm-dd"
            ,monthNames: ["1월", "2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"]
            ,dayNames: ["일", "월", "화", "수", "목", "금", "토"]
            ,dayNamesMin: ["일", "월", "화", "수", "목", "금", "토"]
        });
    }

    function onChangeSearchDateFrom()
    {
        dateTo.datepicker("option", "minDate", new Date(dateFrom.datepicker("getDate")));
    }

    function onChangeSearchDateTo()
    {
        dateFrom.datepicker("option", "maxDate", new Date(dateTo.datepicker("getDate")));
    }

    function onChangeValidationImage(obj)
    {
        if (!isImage(obj) && obj.files[0])
        {
            alert(message.invalidFile);
            emptyFile(obj);
        }
        else
        {
            /**
             * 사이즈 체크를 위해서 해당 html 페이지 file element에
             * data-width: 폭
             * data-height: 높이
             * data-oper: 비교연산 eq: 같음, ge: 이상, le: 이하
             * 속성이 있어야 한다.
             * **/
            /*let oper   = $(obj).data('oper');
            let needsWidth  = $(obj).data('width');
            let needsHeight = $(obj).data('height');
            let img    = new Image();
            img.src = window.URL.createObjectURL(obj.files[0]);
            img.onload = function() {
                let infoMessage = '선택한 이미지 사이즈는 '+this.width+'x'+this.height+'입니다.\n업로드 가능한 이미지 사이즈를 확인해주세요.';
                
                if (oper === 'eq' && (this.width !== needsWidth || this.height !== needsHeight))
                {
                    alert(infoMessage);
                    emptyFile(obj);
                }
                else if (oper === 'ge' && (this.width < needsWidth || this.height < needsHeight))
                {
                    alert(infoMessage);
                    emptyFile(obj);
                }
                else if (oper === 'le' && (this.width > needsWidth || this.height > needsHeight))
                {
                    alert(infoMessage);
                    emptyFile(obj);
                }
                else
                    setFile(obj, 'image');
            }*/

            setFile(obj, 'image');
        }
    }

    function onChangeValidationAudio(obj)
    {
        if (!isAudio(obj) && obj.files[0])
        {
            alert(message.invalidFile);
            emptyFile(obj);
        }
        else
            setFile(obj, 'audio');
    }

    function onChangeValidationVideo(obj)
    {
        if (!isVideo(obj) && obj.files[0])
        {
            alert(message.invalidFile);
            emptyFile(obj);
        }
        else
            setFile(obj, 'video');
    }

    function emptyFile(obj)
    {
        removeThumbnail(obj);
        $(obj).val(null);
        $(obj).siblings('.upload-name').val('파일선택');
    }

    /** 파일 썸네일과 파일이름 보여주는 이벤트 **/
    function setFile(obj, type)
    {
        if(window.FileReader)
        {
            let file = obj.files[0];

            if (obj.files && obj.files[0])
            {
                /** image 일때 썸네일 표출 **/
                if (type === 'image')
                {
                    /** 기존 썸네일 삭제 **/
                    removeThumbnail(obj);

                    /** 파일읽어서 썸네일 표출하기 **/
                    readImage(obj);
                }

                $(obj).siblings('.upload-name').val(file.name);
            }
            else
                emptyFile(obj);
        }
        else
            alert(message.invalidBrowser);
    }

    function readImage(obj)
    {
        let reader = new FileReader();
        reader.readAsDataURL(obj.files[0]);

        reader.onload = function() {

            let innerDom = '';
            innerDom += '<div class="upload-display">';
            innerDom += 	'<div class="upload-thumb-wrap">';
            innerDom += 		'<img src="'+reader.result+'" class="upload-thumb">';
            innerDom += 	'</div>';
            innerDom += '</div>';

            $(obj).parent().prepend(innerDom);
        }
    }

    function removeThumbnail(obj)
    {
        $(obj).parent().children('.upload-display').remove();
    }

    function initSummerNote()
    {
        $('#summernote').summernote({
            lang: 'ko-KR',
            placeholder: '내용을 입력해주세요.',
            /*height: 120,*/
            toolbar: [
                ['font', ['bold', 'underline', 'clear']],
                /*['color', ['color']],*/
                ['para', ['paragraph']],
                ['table', ['table']],
                ['insert', ['link', 'picture', 'video']],
                ['view', ['fullscreen', 'codeview', 'help']]
            ]
        });
    }

    function getStatusCode(data)
    {
        return data.status;
    }

    function getStatusMessage(data)
    {
        let fileStatus = [30034, 30035, 30308];
        let msg = data.msg;
        let code = data.status;

        if (fileStatus.indexOf(code) > -1)
        {
            msg = '선택한 이미지 사이즈는 '+data.data.width+'x'+data.data.height+'입니다.\n';
            msg += data.msg;
        }

        return msg;
    }

    function isSuccessResp(data)
    {
        if (data.status === 30000)
            return true;
        else
            return false;
    }

    function invalidResp(data)
    {
        return data.msg;
    }

    /** modal 열기,닫기 **/
    function modalFadein()
    {
        modalLayout.fadeIn();
        modalContent.fadeIn();
        initModal();
    }

    function modalFadeout()
    {
        modalLayout.fadeOut();
        modalContent.fadeOut();
    }

    /** 목록페이지 엔터로 검색 **/
    function onKeydownSearch(event)
    {
        if (event.keyCode === 13)
            onSubmitSearch();
    }

    /** 테이블 영역 체크박스 **/
    function tableCheckAllDom()
    {
        let chkAll = '<div class="checkbox-wrap">';
        chkAll +=       '<input onclick="onClickChkAll(this);" type="checkbox" name="chk-row" id="checkAll"/>';
        chkAll +=       '<label for="checkAll"><span></span></label>'
        chkAll += '</div>';

        return chkAll;
    }

    function singleCheckBoxDom(idx)
    {
        return '<input onclick="toggleSingleCheckBox(this);" type="checkbox" id="'+idx+'"/><label for="'+idx+'"><span></span></label>';
    }

    function multiCheckBoxDom(idx)
    {
        return '<input onclick="onClickChkRow(this)" type="checkbox" name="chk-row" id="'+idx+'"/><label for="'+idx+'"><span></span></label>';
    }

    function toggleSingleCheckBox(obj)
    {
        let chkBox = dataTable.find('input:checkbox');
        $(chkBox).each(function () {
            if (this.id !== obj.id)
                $(this).prop('checked', false);
        })
    }

    function onClickChkAll(obj)
    {
        let chkName = $(obj).attr('name');
        if ($(obj).is(':checked'))
            $('input[name="'+chkName+'"]').prop('checked', true);
        else
            $('input[name="'+chkName+'"]').prop('checked', false);

        $(obj).closest('table').find('tbody').children('tr').toggleClass('selected');
    }

    function onClickChkRow(obj)
    {
        let count   = 0;
        let chkName = $(obj).attr('name');
        let element = $('tbody input[name="'+chkName+'"]');

        element.each(function () {
            if ($(this).is(':checked'))
                count++;
        })

        if (count === 0)
            $('input[name="'+chkName+'"]').prop('checked', false);

        if (element.length === count)
            $('input[name="'+chkName+'"]').prop('checked', true);
        else
            $("#checkAll").prop('checked', false);
    }

    /** 테이블 현재 페이지 리로드 **/
    function dataReloadAndStayCurrentPage(tableObj)
    {
        let table = tableObj.DataTable();
        table.ajax.reload( null, false );
        if (table.data().length === 0)
            table.page( 'last' ).draw( 'page' );

        $("input[name=chk-row]").prop("checked", false);
    }

    /** 테이블 리로드 **/
    function reloadTable(tableObj)
    {
        let table = tableObj.DataTable();
        table.ajax.reload();
    }

    /** 테이블 상단 total count **/
    function buildTotalCount(tableObj)
    {
        let table = tableObj.DataTable();
        let info = table.page.info();
        let numEl = tableObj.parent().siblings().find(".data-num")

        $(numEl).html(info.recordsTotal);
    }

    /** 상세페이지 이동 **/
    function moveDetail(obj)
    {
        let target = $(obj).data('target');
        let param   = $(obj).data('uuid');
        let form   = $("<form></form>");
        form.attr("method", "post");
        form.attr("action", target);
        form.append($("<input/>", {type: 'hidden', name: 'uuid', value: param}));
        form.appendTo("body");
        form.submit();
    }

    function getLeftMenuByAuthCode()
    {
        $.ajax({
            url: api.getMenuByAuth,
            type: "POST",
            headers : headers,
            dataType: 'json',
            data : JSON.stringify({"code" : sessionAuthCode.val()}),
            success: function(data) {
                if (isSuccessResp(data))
                {
                    buildMenuByAuthCode(data);
                    //checkAuthIntoPage(data);
                    activeMenu();
                }
                else
                    alert(invalidResp(data));
            },
            error: function (request, status) {
                alert('메뉴 '+label.list+message.ajaxLoadError);
            }
        });
    }

    /** 권한별 메뉴 리스트 **/
    function buildMenuByAuthCode(data)
    {
        let keys   	= Object.getOwnPropertyNames(data.data);
        let menuDom = '';
        for (let i=0; i<keys.length; i++)
        {
            let key   	 = keys[i];
            let mainIcon = data.data[key].icon;
            let mainName = data.data[key].name;
            let mainView = data.data[key].view;
            let children = data.data[key].children;
            let target   = 'menu_'+i;
            if (mainView === true)
            {
                menuDom += '<li onclick="onClickActiveParentMenu(this);" class="menu-btn" data-target="'+target+'">';
                menuDom +=     '<div class="btn-wrap clearfix">';
                menuDom +=         '<i class="far ' +mainIcon+'"></i>';
                menuDom +=         '<span>'+mainName+'</span>';
                menuDom +=         '<i class="fas fa-chevron-right arrow-i"></i>';
                menuDom +=     '</div>';
                menuDom +=     '<ul class="menu-btn-list ' +target+'">';
                if (children)
                {
                    let subKeys = Object.getOwnPropertyNames(children);
                    for (let j=0; j<subKeys.length; j++)
                    {
                        let subKey   = subKeys[j];
                        let subName  = children[subKey].name;
                        let menuPath = children[subKey].path;
                        let subView  = children[subKey].view;

                        if (subView === true)
                            menuDom +=     '<li onclick="onClickChildMenu(this);"><a href="'+menuPath+'">'+subName+'</a></li>';
                    }
                }
                menuDom +=     '</ul>';
                menuDom +=     '<div class="bar"></div>';
                menuDom += '</li>';
            }
        }

        sideMenu.html(menuDom);
    }

    /** 권한별 접근 가능 페이지 체크 **/
    function checkAuthIntoPage(data)
    {
        let keys   	= Object.getOwnPropertyNames(data.data);
        let pathName   = getPathName();
        let accessible = [];
        for (let i=0; i<keys.length; i++)
        {
            let key   	 = keys[i];
            let mainView = data.data[key].view;
            let children = data.data[key].children;
            if (mainView === true)
            {
                if (children)
                {
                    let subKeys = Object.getOwnPropertyNames(children);
                    for (let j=0; j<subKeys.length; j++)
                    {
                        let subKey   = subKeys[j];
                        let menuPath = children[subKey].path;
                        let subView  = children[subKey].view;
                        let splitMenuPath = menuPath.split('/');
                        if (subView === true)
                        {
                            if (!isEmpty(splitMenuPath[1]))
                            {
                                if (accessible.indexOf(splitMenuPath[1]+splitMenuPath[2]) === -1)
                                    accessible.push(splitMenuPath[1]+splitMenuPath[2]);
                            }
                        }
                    }
                }
            }
        }

        if (pathName !== '/')
        {
            let splitPath = pathName.split('/');
            let compareValue = splitPath[1]+splitPath[2];

            if (accessible.indexOf(compareValue) === -1)
            {
                alert(message.accessDenied);
                location.href = '/';
            }
        }
    }

    function onClickActiveParentMenu(obj)
    {
        let content = $(obj).attr("data-target");

        $(".menu-btn").removeClass("active");
        $(".menu-btn-list").removeClass("active");
        $(obj).addClass("active");
        $(content).addClass("active");
    }

    function onClickChildMenu(obj)
    {
        $(".menu-btn-list li").removeClass("active");
        $(obj).addClass("active");
    }

    function activeMenu()
    {
        let pathName       = getPathName();
        let splitUrlPath   = pathName.split('/');
        let pathCompareVal = splitUrlPath[1]+splitUrlPath[2];
        let menuList  = $('nav').find('a');
        $(menuList).each(function () {
            let menuPath       = $(this).attr('href');
            let splitMenuPath  = menuPath.split('/');
            let menuCompareVal = splitMenuPath[1]+splitMenuPath[2];
            if (pathCompareVal === menuCompareVal)
                $(this).parents('li').addClass('active');
        })
    }

    $(document).ready(function () {
        $(document).ajaxStart(() => { fadeinLoader(); });
        $(document).ajaxComplete(() => { fadeoutLoader(); });
        calculateInputLength();
    })