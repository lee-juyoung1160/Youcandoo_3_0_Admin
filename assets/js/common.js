
    const selectEls       = $(".select-box select");
    const dayButtons      = $(".day-btn li");
    const datePicker      = $(".datepicker");
    const dateFrom        = $(".date_from");
    const dateTo          = $(".date_to");
    const inputNumber     = $(".only-num");
    const inputNumberWithZero     = $(".only-num-with-zero");
    const viewLoading     = $("#viewLoading");
    const lengthInput     = $(".length-input");
    const sessionUserId   = $("#session_userid");
    const sessionUserIp   = $("#session_userip");
    const sessionAuthCode = $("#session_authcode");
    const sideMenu        = $("#sideMenu");
    const moveTop         = $('.move-top');

    $(window)   .on("scroll", function () { toggleShowFloatingButton(); });
    $(document) .ajaxStart(function () { fadeinLoader(); });
    $(document) .ajaxComplete(function () { fadeoutLoader(); });

    $( () => {
        getLeftMenuByAuthCode();
        calculateInputLength();

        moveTop     .on("click", function () { moveScrollTop(this); });
        selectEls   .on("change", function () { onChangeSelectOption(this); });
        inputNumber .on("propertychange change keyup paste input", function () { initInputNumber(this); });
        inputNumberWithZero .on("propertychange change keyup paste input", function () { initInputNumberWithZero(this); });
        lengthInput .on("propertychange change keyup paste input", function () { checkInputLength(this); });
        dateFrom    .on("change", function () { onChangeSearchDateFrom(this); });
        dateTo      .on("change", function () { onChangeSearchDateTo(this); });
        datePicker  .prop("readonly", true);
    });

    /** 숫자 카운팅 에니메이션 **/
    function countAnimation(obj)
    {
        $({countNum: 0}).animate({ countNum: $(obj).text() },{
            duration: 500,
            easing: 'linear',
            step: function () {
                $(obj).text(Math.floor(this.countNum));
            },
            complete: function () {
                $(obj).text(numberWithCommas(this.countNum));
            }
        });
    }

    /** 글자수 체크 **/
    function checkInputLength(obj)
    {
        let inputLength = $(obj).val().length;
        let maxLength   = $(obj).prop('maxLength');

        if (inputLength > maxLength && maxLength > 0)
        {
            $(obj).val($(obj).val().slice(0, maxLength))
            inputLength = maxLength;
        }

        $(obj).next().find(".count-input").html(inputLength);
    }

    function calculateInputLength()
    {
        $(".length-input").each(function () {  checkInputLength(this); });
    }

    function getPromotionStatusName(_status)
    {
        if (_status === 'pending') return label.pendingIcon+' '+label.pending;
        else if (_status === 'progress') return label.progressIcon+' '+label.progress;
        else if (_status === 'end') return label.endIcon+' '+label.end;
        else if (_status === 'terminate') return label.terminateIcon+' '+label.terminate;
        else return label.dash;
    }

    /** 체크박스 최소 1개 체크 검사 **/
    function atLeastOneChecked(obj)
    {
        let checkedCount = $("input[name='"+obj.name+"']:checked").length;
        if (checkedCount === 0)
        {
            sweetToast(message.minimumChecked);
            $(obj).prop("checked", true);
        }
    }

    function fadeinLoader()
    {
        viewLoading.fadeIn(100);
    }

    function fadeoutLoader()
    {
        viewLoading.fadeOut(100);
    }

    function initPageLength(_obj)
    {
        let options = '';
        options += '<option value="10">10개씩 보기</ooption>';
        options += '<option selected value="30">30개씩 보기</ooption>';
        options += '<option value="50">50개씩 보기</ooption>';
        options += '<option value="100">100개씩 보기</ooption>';

        _obj.html(options);

        onChangeSelectOption(_obj);
    }

    function initActionPageLength(_obj)
    {
        let options = '';
        options += '<option value="12">12개씩 보기</ooption>';
        options += '<option selected value="30">30개씩 보기</ooption>';
        options += '<option value="60">60개씩 보기</ooption>';
        options += '<option value="120">120개씩 보기</ooption>';

        _obj.html(options);

        onChangeSelectOption(_obj);
    }

    function initSelectOption()
    {
        selectEls.each(function () {
            if (this.id !== 'selPageLength')
            {
                $(this).children().eq(0).prop("selected", true);
                onChangeSelectOption($(this));
            }
        });
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
            datePicker.datepicker("setDate", "today");
        else if ($(obj).hasClass("btn_week"))
            initSearchDateRange();
        else if ($(obj).hasClass("btn_month"))
            initSearchDateRangeMonth();
        else if ($(obj).hasClass("btn_long"))
        {
            dateFrom.datepicker("setDate", "-3M");
            dateTo.datepicker("setDate", "today");
        }
    }

    function initDayBtn()
    {
        dayButtons.removeClass("active");
    }

    function initMaxDateToday()
    {
        datePicker.datepicker("option", "minDate", "2020-07-01");
        datePicker.datepicker("option", "maxDate", "today");
    }

    function initMaxDateAfterThreeMonth()
    {
        datePicker.datepicker("option", "minDate", "2020-07-01");
        datePicker.datepicker("option", "maxDate", "+3M");
    }
    
    function initSearchDateRange()
    {
        dateFrom.datepicker("setDate", "-6D");
        dateTo.datepicker("setDate", "today");
    }

    function initSearchDateRangeMonth()
    {
        dateFrom.datepicker("setDate", "-1M");
        dateTo.datepicker("setDate", "today");
    }

    function initSearchDateRangeThreeMonth()
    {
        dateFrom.datepicker("setDate", "-3M");
        dateTo.datepicker("setDate", "today");
    }

    function initSearchDateRangeToday()
    {
        dateFrom.datepicker("setDate", "today");
        dateTo.datepicker("setDate", "today");
    }

    function setDateToday()
    {
        datePicker.datepicker("setDate", "today");
    }

    function initInputTodayDatepicker()
    {
        datePicker.datepicker({
            dateFormat: "yy-mm-dd"
            ,monthNames: label.monthNames
            ,dayNames: label.dayNames
            ,dayNamesMin: label.dayNames
            ,minDate: 0
        });
    }

    function initInputDatepicker()
    {
        datePicker.datepicker({
            dateFormat: "yy-mm-dd"
            ,monthNames: label.monthNames
            ,dayNames: label.dayNames
            ,dayNamesMin: label.dayNames
            ,minDate: +1
        });
    }

    function initSearchDatepicker()
    {
        datePicker.datepicker({
            dateFormat: "yy-mm-dd"
            ,monthNames: label.monthNames
            ,dayNames: label.dayNames
            ,dayNamesMin: label.dayNames
        });
    }

    function onChangeSearchDateFrom()
    {
        dateTo.datepicker("option", "minDate", new Date(dateFrom.datepicker("getDate")));
        initDayBtn();
    }

    function onChangeSearchDateTo()
    {
        dateFrom.datepicker("option", "maxDate", new Date(dateTo.datepicker("getDate")));
        initDayBtn();
    }

    function onChangeValidationImage(obj)
    {
        if (!isImage(obj) && obj.files[0])
        {
            sweetToast(message.invalidFile);
            emptyFile(obj);
        }
        else if (isOverFileSize(obj) && obj.files[0])
        {
            sweetToast(message.overFileSize);
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
            let oper   = $(obj).data('oper');
            let needsWidth  = $(obj).data('width');
            let needsHeight = $(obj).data('height');
            let img    = new Image();

            if (obj.files[0])
            {
                img.src = window.URL.createObjectURL(obj.files[0]);
                img.onload = function() {
                    let infoMessage = `선택한 이미지 사이즈는 ${this.width} x ${this.height}입니다. 업로드 가능한 이미지 사이즈를 확인해주세요.`;

                    if (oper === 'eq' && (this.width !== needsWidth || this.height !== needsHeight))
                    {
                        sweetError(infoMessage);
                        emptyFile(obj);
                    }
                    else if (oper === 'ge' && (this.width < needsWidth || this.height < needsHeight))
                    {
                        sweetError(infoMessage);
                        emptyFile(obj);
                    }
                    else if (oper === 'le' && (this.width > needsWidth || this.height > needsHeight))
                    {
                        sweetError(infoMessage);
                        emptyFile(obj);
                    }
                    else
                        setFile(obj, 'image');
                }
            }
            else emptyFile(obj);
        }
    }

    function onChangeValidationAudio(obj)
    {
        if (!isAudio(obj) && obj.files[0])
        {
            sweetToast(message.invalidFile);
            emptyFile(obj);
        }
        else if (isOverFileSize(obj) && obj.files[0])
        {
            sweetToast(message.overFileSize);
            emptyFile(obj);
        }
        else
            setFile(obj, 'audio');
    }

    function onChangeValidationVideo(obj)
    {
        if (!isVideo(obj) && obj.files[0])
        {
            sweetToast(message.invalidFile);
            emptyFile(obj);
        }
        else if (isOverFileSize(obj) && obj.files[0])
        {
            sweetToast(message.overFileSize);
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
            sweetToast(message.invalidBrowser);
    }

    function readImage(obj)
    {
        let reader = new FileReader();
        reader.readAsDataURL(obj.files[0]);

        reader.onload = function() {

            let innerDom = '';
            innerDom +=
                `<div class="upload-display">
                    <div class="upload-thumb-wrap">
                        <img src="${reader.result}" class="upload-thumb">
                    </div>
                </div>`

            $(obj).parent().prepend(innerDom);
        }
    }

    function removeThumbnail(obj)
    {
        $(obj).parent().children('.upload-display').remove();
    }

    /*function initSummerNote()
    {
        $('#summernote').summernote({
            lang: 'ko-KR',
            placeholder: '내용을 입력해주세요.',
            /!*height: 120,*!/
            toolbar: [
                ['font', ['bold', 'underline', 'clear']],
                /!*['color', ['color']],*!/
                ['para', ['paragraph']],
                ['table', ['table']],
                ['insert', ['link', 'picture', 'video']],
                ['view', ['fullscreen', 'codeview', 'help']]
            ]
        });
    }*/

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
            msg =
                `선택한 이미지 사이즈는 ${data.data.width} x ${data.data.height} 입니다.
                 ${data.msg}`
        }

        return msg;
    }

    function isSuccessResp(data)
    {
        return getStatusCode(data) === 0;
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
        overflowHidden();
    }

    function modalFadeout()
    {
        modalLayout.fadeOut();
        modalContent.fadeOut();
        $('body').css("overflow-y", "scroll");
    }

    function overflowHidden()
    {
        $('body').css("overflow", "hidden");
    }

    function onErrorImage(obj)
    {
        $(obj).attr('src', label.noImage);
    }

    function onErrorVideo()
    {
        sweetToast("영상을 불러올 수 없습니다.");
    }

    function onErrorActionVideo()
    {
        sweetToast("인증 영상을 불러올 수 없습니다.");
    }

    function onErrorExamVideo()
    {
        sweetToast("예시 영상을 불러올 수 없습니다.");
    }

    function onErrorActionAudio()
    {
        sweetToast("인증 음성을 불러올 수 없습니다.");
    }

    function onErrorExamAudio()
    {
        sweetToast("예시 음성을 불러올 수 없습니다.");
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
        return (
            `<div class="checkbox-wrap">
                <input onclick="onClickChkAll(this);" type="checkbox" name="chk-row" id="checkAll"/>
                <label for="checkAll"><span></span></label>
            </div>`
        )
    }

    function singleCheckBoxDom(idx)
    {
        return `<input onclick="toggleSingleCheckBox(this);" type="checkbox" id="${idx}"/><label for="${idx}"><span></span></label>`
    }

    function multiCheckBoxDom(idx)
    {
        return `<input onclick="onClickChkRow(this)" type="checkbox" name="chk-row" id="${idx}"/><label for="${idx}"><span></span></label>`
    }

    function toggleSingleCheckBox(obj)
    {
        let tableEl = obj.closest('table');
        let chkBox = $(tableEl).find('input:checkbox');

        $(chkBox).prop('checked', false);
        $(obj).prop('checked', true);
    }

    function onClickChkAll(obj)
    {
        let tableEl = '#'+$(obj).closest('table').prop('id');
        let table = $(tableEl).DataTable();
        let chkName = $(obj).prop('name');
        if ($(obj).is(':checked'))
        {
            $('input[name="'+chkName+'"]').prop('checked', true);
            table.rows().select();
        }
        else
        {
            $('input[name="'+chkName+'"]').prop('checked', false);
            table.rows().deselect();
        }
    }

    function onClickChkRow(obj)
    {
        let count   = 0;
        let chkName = $(obj).prop('name');
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
            uncheckedCheckAll();
    }

    /** 테이블 기본환경 설정 **/
    function initTableDefault()
    {
        $.extend( true, $.fn.dataTable.defaults, {
            /*pagingType: "simple_numbers_no_ellipses",*/
            ordering: false,
            order: [],
            info: false,
            processing: false,
            lengthChange: false,
            autoWidth: false,
            searching: false,
            fixedHeader: false,
            language: {
                emptyTable: message.emptyList
                ,zeroRecords: message.emptyList
                ,processing: message.searching
                ,paginate: {
                    previous: label.previous
                    ,next: label.next
                }
            }
        });
    }

    /** 테이블 현재 페이지 리로드 **/
    function tableReloadAndStayCurrentPage(tableObj)
    {
        let table = tableObj.DataTable();
        table.ajax.reload( null, false );
        if (table.data().length === 0)
            table.page( 'last' ).draw( 'page' );

        $("input[name=chk-row]").prop("checked", false);
    }

    /** 테이블 조회결과 없을 때 이전/다음 버튼 숨기기 **/
    function toggleBtnPreviousAndNextOnTable(obj)
    {
        let pagination = $(obj).closest('.dataTables_wrapper').find('.dataTables_paginate');
        pagination.toggle(obj.api().page.info().pages > 0);
    }

    /** 테이블 상단 total count **/
    function buildTotalCount(_table)
    {
        let table = $(_table).DataTable();
        let info = table.page.info();
        let numEl = $(_table).parent().siblings().find(".data-num")

        $(numEl).html(numberWithCommas(info.recordsTotal));
    }

    /** 테이터 테이블 데이터 존재 여부 **/
    function hasDataOnDatatable(_table)
    {
        let table = $(_table).DataTable();
        return table.data().any();
    }

    /** 테이블 조회결과 없을 때 row 삭제 **/
    function removeEmptyRowFromTable()
    {
        $(".dataTables_empty").parent().remove();
    }

    function initTableSorter(_table)
    {
        $(".no-sort").each(function () {
            if (isEmpty($(this).data('sort-method')))
                $(this).attr('data-sort-method', 'none');
        });

        new Tablesort($(_table)[0]);
    }

    function uncheckedCheckAllAfterMovePage(_table)
    {
        $(_table).on( 'page.dt', function () {
            uncheckedCheckAll();
        });
    }

    function uncheckedCheckAll()
    {
        $("#checkAll").prop('checked', false);
    }

    /**
     *  뒤로가기/이전버튼 이벤트에서 활성 페이지 유지를 위한 메서드
     * **/
    function redrawPage(_table, param_page)
    {
        let table = $(_table).DataTable();
        table.page(param_page-1).draw( 'page' );
    }

    function getCurrentPage(_table)
    {
        let table = $(_table).DataTable();
        let info = table.page.info();

        return (info.start / info.length) + 1;
    }

    /** 상세페이지 이동 **/
    /*function moveDetail(obj)
    {
        let target = $(obj).data('target');
        let param   = $(obj).data('uuid');
        let form   = $("<form></form>");
        form.prop("method", "post");
        form.prop("action", target);
        form.append($("<input/>", {type: 'hidden', name: 'uuid', value: param}));
        form.appendTo("body");
        form.submit();
    }*/

    /** 사이드 메뉴 세팅 **/
    function getLeftMenuByAuthCode()
    {
        let param   = JSON.stringify({"code" : sessionAuthCode.val()});
        let url     = api.getMenuByAuth;
        let errMsg  = '메뉴 '+label.list+message.ajaxLoadError;

        ajaxRequestWithJsonData(false, url, param, getLeftMenuByAuthCodeCallback, errMsg, false);
    }

    function getLeftMenuByAuthCodeCallback(data)
    {
        isSuccessResp(data) ? getLeftMenuByAuthCodeSuccess(data) : sweetError(invalidResp(data));
    }

    function getLeftMenuByAuthCodeSuccess(data)
    {
        buildMenuByAuthCode(data);
        activeMenu();
    }

    /** 권한별 메뉴 생성 **/
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
                /*if (isOuterIp() && isPrivateMenu(mainName)) continue;*/
                if (isOuterIp() && isAccessDeniedUcdUserBiz() && isPrivateMenu(mainName)) continue;

                menuDom +=
                    `<li onclick="onClickActiveParentMenu(this);" class="menu-btn" data-target="${target}">
                        <div class="btn-wrap clearfix">
                            <i class="far ${mainIcon}"></i>
                            <span>${mainName}</span>
                            <i class="fas fa-chevron-right arrow-i"></i>
                        </div>
                        <ul class="menu-btn-list ${target}">`
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
                        {
                            menuDom += `<li onclick="onClickChildMenu(this);"><a href="${menuPath}">${subName}</a></li>`
                            buildAccessibleMenus(menuPath);
                        }
                    }
                }
                menuDom +=
                        `</ul>
                        <div class="bar"></div>
                    </li>`
            }
        }

        sideMenu.html(menuDom);

        accessDeniedAuth();
    }

    let accessibleMenus = ['/', '/admin/mypage'];
    function buildAccessibleMenus(_auth)
    {
        /**
         * 현재 관리자 > 권한설정 메뉴에서 상세보기 권한, 수정 권한은 설정할 수 없음
         * 등록 권한은 일부 페이지만(promotion, doit) 설정 가능
         * 목록 권한은 모두 설정 가능.
         * 목록 권한만 있는 사용자가 권한이 없는(등록, 수정) 페이지의 url직접 접근할 경우 페이지 노출 됨.
         * 그것을 막고자 어쩔 수 없이 이 로직이 생김.
         * **/

        accessibleMenus.push(_auth);

        /** 프로모션등록, 두잇등록 권한이 있으면 수정 권한 추가 **/
        let customAccessiblePages = ['/promotion/create', '/doit/create'];
        if (customAccessiblePages.indexOf(_auth) !== -1)
            accessibleMenus.push(_auth.replace('create', 'update'));

        /** 프로모션 목록, 두잇 목록 권한이 있으면 상세 권한 추가 **/
        let customAccessiblePages1 = ['/promotion', '/doit'];
        if (customAccessiblePages1.indexOf(_auth) !== -1)
            accessibleMenus.push(_auth + '/detail');

        /** 그 외 메뉴들은 목록 권한이 있으면 등록, 수정, 상세 권한 추가 **/
        let customAccessiblePages2 =
               ['/user',
                '/biz',
                '/marketing/event',
                '/marketing/push',
                '/marketing/popup',
                '/service/notice',
                '/service/faq',
                '/admin',
                '/doit/category',
                '/doit/recommend',
                '/doit/talk',
                '/operate/account',
                '/gift'];
        if (customAccessiblePages2.indexOf(_auth) !== -1)
        {
            accessibleMenus.push(_auth + '/create');
            accessibleMenus.push(_auth + '/update');
            accessibleMenus.push(_auth + '/detail');
        }

        if (_auth === '/ucd/sales') accessibleMenus.push('/ucd/create/biz');
        if (_auth === '/ucd/charge') accessibleMenus.push('/ucd/create/user');
        if (_auth === '/ucd/cancel') accessibleMenus.push('/ucd/cancel/user');
        if (_auth === '/ucd/withdraw') accessibleMenus.push('/ucd/withdraw/user');
    }

    /** 권한 별 접근 가능 페이지 **/
    function accessDeniedAuth()
    {
        let pathName = getPathName();
        if (pathName.includes('update') || pathName.includes('detail'))
        {
            pathName = pathName.replace(pathName.split('/').reverse()[0], '');
            pathName = pathName.slice(0, -1);
        }

        if (accessibleMenus.indexOf(pathName) === -1)
        {
            alert(message.accessDenied);
            location.href = '/';
        }
    }

    function isAccessDeniedUcdUserBiz()
    {
        /** 2020.08.20
         *  재택근무로 추가된 로직. 원래는 아래 펑션(ip)만으로 처리했으나 권한까지 추가 됨.
         * **/
        let accessibleAuths = ['smg', 'mg', 'dev'];
        /*if ($("#env").val() === 'development') accessibleAuths.push('dev')*/
        return accessibleAuths.indexOf(sessionAuthCode.val()) === -1;
    }

    function isOuterIp()
    {
        return innerIps.indexOf(sessionUserIp.val()) === -1;
    }

    function isPrivateMenu(_menuName)
    {
        return privateMenus.indexOf(_menuName) !== -1;
    }

    function onClickActiveParentMenu(obj)
    {
        let content = $(obj).prop("data-target");

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
        let pathName = getPathName();
        let menuList = $('nav').find('a');
        $(menuList).each(function () {
            let menuPath = $(this).attr('href');
            if (pathName === menuPath)
                $(this).parents('li').addClass('active');
        })
    }

    /**
     * 뒤로가기 액션 관련 >>
     * 상세페이지에서 목록으로 이동할 때 이전 상태를 유지하기 위함
     * 페이지 진입할 때 sessionStorage에 param과 page path 쌓고
     * 상세에서 목록으로 뒤로가기 이동할 때 sessionStorage에서 값을 가져와 목록 페이지의 이전 상태를 유지
     * **/
    const NavType = window.PerformanceNavigation.TYPE_BACK_FORWARD;
    function isBackAction()
    {
        let result = false;
        if (NavType === window.performance.navigation.type)
        {
            let historyPage = sessionStorage.getItem("page");
            if (historyPage === getPathName())
                result = true;
        }

        return result;
    }

    function setHistoryParam(param)
    {
        param = isEmpty(param) ? '' : JSON.stringify(param);
        sessionStorage.setItem("param", param);
        sessionStorage.setItem("page", getPathName());
    }

    function getHistoryParam()
    {
        return JSON.parse(sessionStorage.getItem("param"));
    }
    /**
     * 여기까지 뒤로가기 액션 관련 끝
     * **/

    /**
     *  alert 관련
     * **/
    function sweetToast(msg)
    {
        Swal.fire({
            toast: true,
            position: 'center',
            icon: 'warning',
            title: msg,
            showConfirmButton: false,
            timer: 1500
        })
    }

    function sweetToastAndCallback(data, callback)
    {
        Swal.fire({
            toast: true,
            position: 'center',
            icon: isSuccessResp(data) ? 'success' : 'error',
            title: getStatusMessage(data),
            showConfirmButton: false,
            timer: 1500
        }).then((result) => {
            if (result.isDismissed)
            {
                if (isSuccessResp(data))
                    callback();
                /*else
                    sweetError(invalidResp(data));*/
            }
        })
    }

    function sweetError(msg)
    {
        Swal.fire({
            icon: 'error',
            text: msg
        })
    }

    function sweetConfirm(msg, callback)
    {
        Swal.fire({
            text: msg,
            showCancelButton: true,
            confirmButtonText: label.confirm,
            cancelButtonText: label.cancel
        }).then((result) => {
            if (result.value)
                callback();
        })
    }

    function sweetConfirmWithCancelCallback(msg, okCallback, cancelCallback)
    {
        Swal.fire({
            text: msg,
            showCancelButton: true,
            confirmButtonText: label.confirm,
            cancelButtonText: label.cancel
        }).then((result) => {
            if (result.value)
                okCallback();
            else
                cancelCallback();
        })
    }

    function sweetConfirmWithContent(content, callback)
    {
        Swal.fire({
            html: content,
            showCancelButton: true,
            confirmButtonText: label.confirm,
            cancelButtonText: label.cancel
        }).then((result) => {
            if (result.value)
                callback();
        })
    }

    function historyBack()
    {
        history.back();
    }

    function onClickUcdFormExport()
    {
        let data = [
            { "PID" : "", "" : "<<<---여기부터"},
            { "PID" : "", "" : "PID(프로필아이디)를" },
            { "PID" : "", "" : "이런 방식으로(줄을 바꿔가며)" },
            { "PID" : "", "" : "채우면 됩니다." },
            { "PID" : "", "" : "아!" },
            { "PID" : "", "" : "물론," },
            { "PID" : "", "" : "첫행부터 채워도" },
            { "PID" : "", "" : "괜찮아요." }
        ];
        setExcelData("회원UCD일괄등록양식", "회원목록", data);
    }

    function toggleShowFloatingButton()
    {
        let sectionHeight = $("section").height() * 0.15;
        let top = $(window).scrollTop();

        top > sectionHeight ? moveTop.fadeIn() : moveTop.fadeOut();
    }

    function moveScrollTop()
    {
        $("html, body").animate({ scrollTop : 0 }, 400);
    }

    function copyToClipboard(obj)
    {
        $(obj).siblings('input.input-copy').trigger('select');
        document.execCommand("copy");

        sweetToast('클립보드에 복사 됨.');
    }
    /** js파일에 쿼리파라미터 추가하기 (브라우저 캐시 갱신) **/
    /*function scriptVersion()
    {
        let scripts = $("script");
        let len = scripts.length;
        let date = new Date();
        let ver = date.getTime();
        for (let i=0; i<len; i++)
        {
            let script = scripts[i];
            let attrSrc = $(script).prop('src');
            if (!(attrSrc.includes('plugins')))
                $(script).attr('src', attrSrc+'?ver='+ver);
        }
    }*/

    function paginate(_currentPage, _lastPage)
    {
        let pageButtonLength  = 7;
        let i, current, pageNum;
        let pageDom = '';

        pageDom += _currentPage === 1 ?
            `<a class="paginate_button previous disabled" id="dataTable_previous">${label.previous}</a><span>` :
            `<a onclick="onClickPageNum(this)" 
				class="paginate_button previous" 
				data-page="${(_currentPage-1)}" id="dataTable_previous">${label.previous}</a><span>`

        if (_lastPage <= pageButtonLength)
        {
            for (i=1; i<=_lastPage; i++)
            {
                current = _lastPage > 1 && _currentPage === i ? 'current' : '';
                pageDom += `<a onclick="onClickPageNum(this);" class="paginate_button ${current}" data-page="${i}">${i}</a>`
            }
        }
        else
        {
            if (_currentPage < 5)
            {
                for (i=1; i<=pageButtonLength; i++)
                {
                    current = _lastPage > 1 && _currentPage === i ? 'current' : '';
                    pageNum = i === pageButtonLength ? _lastPage : i;
                    pageDom += i === pageButtonLength - 1 ?
                        `<span class="ellipsis">…</span>` :
                        `<a onclick="onClickPageNum(this);" class="paginate_button ${current}" data-page="${pageNum}">${pageNum}</a>`
                }
            }
            else if (_currentPage >= 5 && _currentPage <= _lastPage - 4)
            {
                for (i=1; i<=_lastPage; i++)
                {
                    if (i === 1)
                    {
                        pageDom +=
                            `<a onclick="onClickPageNum(this);" class="paginate_button" data-page="${i}">${i}</a>
							<span class="ellipsis">…</span>`
                    }

                    if (_currentPage === i)
                    {
                        pageDom +=
                            `<a onclick="onClickPageNum(this);" class="paginate_button" data-page="${(i - 1)}">${(i - 1)}</a>
							<a onclick="onClickPageNum(this);" class="paginate_button current" data-page="${i}">${i}</a>
							<a onclick="onClickPageNum(this);" class="paginate_button" data-page="${(i + 1)}">${(i + 1)}</a>`
                    }

                    if (_lastPage === i)
                    {
                        pageDom +=
                            `<span class="ellipsis">…</span>
							<a onclick="onClickPageNum(this);" class="paginate_button" data-page="${_lastPage}">${_lastPage}</a>`
                    }
                }
            }
            else if (_currentPage > _lastPage - 4)
            {
                for (i=1; i<=pageButtonLength; i++)
                {
                    current = _currentPage === _lastPage-(pageButtonLength-i) ? 'current' : '';
                    pageNum = i >= pageButtonLength - 4 ? (_lastPage-(pageButtonLength-i)) : i;
                    pageDom += i === 2 ?
                        `<span class="ellipsis">…</span>` :
                        `<a onclick="onClickPageNum(this);" class="paginate_button ${current}" data-page="${pageNum}">${pageNum}</a>`
                }
            }
        }

        pageDom += _lastPage === _currentPage || Number(_lastPage) === 0 ?
            `</span><a class="paginate_button next disabled" id="dataTable_next">${label.next}</a>` :
            `</span><a onclick="onClickPageNum(this)" 
						class="paginate_button next" 
						data-page="${(_currentPage+1)}" 
						id="dataTable_next">${label.next}</a>`

        return pageDom;
    }

