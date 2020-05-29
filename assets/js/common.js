
    const menuBtn            = $(".menu-btn");
    const menuBtnList        = $(".menu-btn-list");
    const menuListClickEvent = $(".menu-btn-list li");
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
    const countInput         = $(".count-input");
    const sessionUserId      = $("#session_userid");

    menuBtn             .on("click", function () { onClickActiveParentMenu(this); });
    menuListClickEvent  .on("click", function () { onClickChildMenu(this); });
    noticeBtn           .on("click", function () {  onClickActiveNotice(); });
    selectTarget        .on("change", function () { onChangeSelectOption(this); });
    inputNumber         .on("keyup", function () { initInputNumber(this); });
    dateFrom            .on("change", function () { onChangeSearchDateFrom(this); });

    /** 글자수 체크 **/
    function checkInputLength()
    {
        lengthInput.on('input', function () {
            let inputLength = $(this).val().length;
            let maxLength   = $(this).attr('maxLength');

            if (inputLength > maxLength)
            {
                $(this).val($(this).val().slice(0, maxLength))
                inputLength = maxLength;
            }

            $(this).next().find(countInput).html(inputLength);
        })
    }

    function fadeinLoader()
    {
        viewLoading.fadeIn(100);
    }

    function fadeoutLoader()
    {
        viewLoading.fadeOut(100);
    }

    function onClickActiveParentMenu(obj)
    {
        let content = $(obj).attr("data-target");

        menuBtn.removeClass("active");
        menuBtnList.removeClass("active");
        $(obj).addClass("active");
        $(content).addClass("active");
    }

    function onClickChildMenu(obj)
    {
        menuListClickEvent.removeClass("active");
        $(obj).addClass("active");
    }

    /** 페이지 상단 > 벨 아이콘 클릭 이벤트 **/
    function onClickActiveNotice()
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
    }

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

    function onChangeValidationImage(obj)
    {
        onChangeFile(obj);

        if (!isImage(obj) && obj.files[0])
        {
            alert(message.invalidFile);
            $(obj).val(null);
            $(obj).siblings('.upload-name').val('파일선택');
        }
    }

    function onChangeValidationAudio(obj)
    {
        onChangeFile(obj);

        if (!isAudio(obj) && obj.files[0])
        {
            alert(message.invalidFile);
            $(obj).val(null);
            $(obj).siblings('.upload-name').val('파일선택');
        }
    }

    function onChangeValidationVideo(obj)
    {
        onChangeFile(obj);

        if (!isVideo(obj) && obj.files[0])
        {
            alert(message.invalidFile);
            $(obj).val(null);
            $(obj).siblings('.upload-name').val('파일선택');
        }
    }

    /** 파일 썸네일과 파일이름 보여주는 이벤트 **/
    function onChangeFile(obj)
    {
        let innerDom = '';
        let fileName;
        let src;
        let parent = $(obj).parent();

        parent.children('.upload-display').remove();

        if(window.File && window.FileReader)
        {
            let siblingsDom = '.upload-name';
            let file = obj.files[0];

            if ( obj.files && file)
            {
                /** image, audio, video 파일만 **/
                if (isImage(obj) || isAudio(obj) || isVideo(obj))
                {
                    fileName = file.name;
                    let reader = new FileReader();

                    reader.onload = function(event) {

                        src = event.target.result;

                        innerDom += '<div class="upload-display">';
                        innerDom += 	'<div class="upload-thumb-wrap">';
                        innerDom += 		'<img src="'+src+'" class="upload-thumb">';
                        innerDom += 	'</div>';
                        innerDom += '</div>';

                        parent.prepend(innerDom);
                    }

                    reader.readAsDataURL(file);

                    $(obj).siblings(siblingsDom).val(fileName);
                }
            }
            else
                $(obj).siblings(siblingsDom).val('파일선택');
        }
        /*else
        {
            $(obj)[0].select();
            $(obj)[0].blur();

            let imgSrc = document.selection.createRange().text;

            innerDom += '<div class="upload-display">';
            innerDom += 	'<div class="upload-thumb-wrap">';
            innerDom += 		'<img class="upload-thumb">';
            innerDom += 	'</div>';
            innerDom += '</div>';

            parent.prepend(innerDom);

            let img = $(obj).siblings('.upload-display').find('img');
            img[0].style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(enable='true',sizingMethod='scale',src=\""+imgSrc+"\")";
        }*/
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
        return data.msg;
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
        let resp = JSON.parse(data);

        return resp.msg;
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
            buildGrid();
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
        activeMenu();
        $(document).ajaxStart(function () { fadeinLoader(); });
        $(document).ajaxComplete(function () { fadeoutLoader(); });
    })