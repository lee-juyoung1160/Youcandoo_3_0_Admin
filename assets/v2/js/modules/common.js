
    import {
        modalContent, modalBackdrop, loader, selectEls,
        dateButtons, datePicker, dateFrom, dateTo, } from "./elements.js";
    import { message } from "./message.js";
    import { label } from "./label.js";
    import { numberWithCommas, isOverFileSize, appendZero, isImage, isAudio, isVideo } from "./utils.js";
    import { sweetToast, sweetError } from "./alert.js";

    export function historyBack()
    {
        history.back();
    }

    export function fadeinModal()
    {
        modalContent.fadeIn();
        modalBackdrop.fadeIn();
        overflowHidden();
    }

    export function fadeoutModal()
    {
        modalContent.fadeOut();
        modalBackdrop.fadeOut();
        overflowScroll();
    }

    export function overflowHidden()
    {
        $('body').css("overflow-y", "hidden");
    }

    export function overflowScroll()
    {
        $('body').css("overflow-y", "auto");
    }

    export function fadeinLoader()
    {
        loader.fadeIn(100);
    }

    export function fadeoutLoader()
    {
        loader.fadeOut(100);
    }

    export function initInputDatepickerMinDateToday()
    {
        datePicker.datepicker({
            dateFormat: "yy-mm-dd"
            ,changeYear: true
            ,showMonthAfterYear: true
            ,monthNames: label.monthNames
            ,dayNames: label.dayNames
            ,dayNamesMin: label.dayNames
            ,minDate: 0
        });
    }

    export function initInputDatepickerMinDateNextDay()
    {
        datePicker.datepicker({
            dateFormat: "yy-mm-dd"
            ,changeYear: true
            ,showMonthAfterYear: true
            ,monthNames: label.monthNames
            ,dayNames: label.dayNames
            ,dayNamesMin: label.dayNames
            ,minDate: +1
        });
    }

    export function initSearchDatepicker()
    {
        datePicker.datepicker({
            dateFormat: "yy-mm-dd"
            ,changeYear: true
            ,showMonthAfterYear: true
            ,monthNames: label.monthNames
            ,dayNames: label.dayNames
            ,dayNamesMin: label.dayNames
        });
    }

    /** 목록페이지 > 상단검색 > 날짜 > 오늘,1주일,1개월,3개월 활성/비활성 **/
    export function onClickDateRangeBtn(obj)
    {
        initDayBtn();

        $(obj).addClass("active");

        if ($(obj).hasClass("today"))
            setDateToday();
        else if ($(obj).hasClass("week"))
            initSearchDateRangeWeek();
        else if ($(obj).hasClass("month"))
            initSearchDateRangeMonth();
        else if ($(obj).hasClass("months"))
            initSearchDateRangeMonths()
    }

    function getDateStr(_date)
    {
        const year = _date.getFullYear();
        const month = (_date.getMonth() + 1);
        const day = _date.getDate();

        return `${year}-${appendZero(month)}-${appendZero(day)}`;
    }

    function getTodayStr()
    {
        const d = new Date();

        return  getDateStr(d);
    }

    function getWeekAgoStr()
    {
        const d = new Date();
        d.setDate(d.getDate() - 7);
        return  getDateStr(d);
    }

    function getMonthAgoStr()
    {
        const d = new Date();
        d.setMonth(d.getMonth() -1);
        return  getDateStr(d);
    }

    function getMonthsAgoStr()
    {
        const d = new Date();
        d.setMonth(d.getMonth() - 3);
        return  getDateStr(d);
    }

    export function initSearchDateRangeWeek()
    {
        dateFrom.val(getWeekAgoStr());
        dateTo.val(getTodayStr());
    }

    export function initSearchDateRangeMonth()
    {
        dateFrom.val(getMonthAgoStr());
        dateTo.val(getTodayStr());
    }

    export function initSearchDateRangeMonths()
    {
        dateFrom.val(getMonthsAgoStr());
        dateTo.val(getTodayStr());
    }

    export function initInputDateRangeWeek()
    {
        dateFrom.datepicker("setDate", "today");
        dateTo.datepicker("setDate", "+6D");
    }

    export function initMinDateToday()
    {
        datePicker.datepicker("option", "minDate", "today");
        datePicker.datepicker("option", "maxDate", "9999-12-31");
    }

    export function initMaxDateToday()
    {
        datePicker.datepicker("option", "minDate", "2020-07-01");
        datePicker.datepicker("option", "maxDate", "today");
    }

    export function initMaxDateMonths()
    {
        datePicker.datepicker("option", "minDate", "2020-07-01");
        datePicker.datepicker("option", "maxDate", "+3M");
    }

    export function setDateToday()
    {
        datePicker.val(getTodayStr());
    }

    export function initDayBtn()
    {
        dateButtons.removeClass("active");
    }

    export function onChangeSearchDateFrom()
    {
        dateTo.datepicker("option", "minDate", new Date(dateFrom.datepicker("getDate")));
        initDayBtn();
    }

    export function onChangeSearchDateTo()
    {
        dateFrom.datepicker("option", "maxDate", new Date(dateTo.datepicker("getDate")));
        initDayBtn();
    }

    export function initPageLength(_obj)
    {
        const options =
            `<option value="10">10개씩 보기</ooption>
            <option selected value="30">30개씩 보기</ooption>
            <option value="50">50개씩 보기</ooption>
            <option value="100">100개씩 보기</ooption>
            <option value="500">500개씩 보기</ooption>
            <option value="1000">1000개씩 보기</ooption>`

        _obj.html(options);
    }

    export function initSelectOption()
    {
        selectEls.each(function () {
            $(this).children().eq(0).prop("selected", true);
        });
    }

    /** 글자수 체크 **/
    export function limitInputLength(obj)
    {
        let inputLength = $(obj).val().length;
        let maxLength   = $(obj).prop('maxLength');

        if (inputLength > maxLength && maxLength > 0)
        {
            $(obj).val($(obj).val().slice(0, maxLength))
            inputLength = maxLength;
        }

        $(obj).next().find(".count-input").text(inputLength);
    }

    export function calculateInputLength()
    {
        $(".length-input").each(function () {  limitInputLength(this); });
    }

    export function onErrorImage()
    {
        $('img').on('error', function () {
            $(this).attr('src', label.noImage);
        });
    }

    export function onChangeValidationAudio(obj)
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

    export function onChangeValidationVideo(obj)
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

    export function onChangeValidateImage(obj)
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
             * data-compare: 같음/이상/이하
             * 속성이 있어야 한다.
             * **/
            const compare = $(obj).data('compare');
            const needsWidth = $(obj).data('width');
            const needsHeight = $(obj).data('height');
            const img = new Image();

            if (obj.files[0])
            {
                img.src = window.URL.createObjectURL(obj.files[0]);
                img.onload = function() {
                    setFile(obj, 'image');
                    /*const infoMessage = `선택한 이미지 사이즈는 ${this.width} x ${this.height}입니다.<br> 업로드 가능한 이미지 사이즈를 확인해주세요.`;

                    if (compare === '같음' && (this.width !== needsWidth || this.height !== needsHeight))
                    {
                        sweetError(infoMessage);
                        emptyFile(obj);
                    }
                    else if (compare === '이상' && (this.width < needsWidth || this.height < needsHeight))
                    {
                        sweetError(infoMessage);
                        emptyFile(obj);
                    }
                    else if (compare === '이하' && (this.width > needsWidth || this.height > needsHeight))
                    {
                        sweetError(infoMessage);
                        emptyFile(obj);
                    }
                    else
                        setFile(obj, 'image');*/
                }
            }
            else emptyFile(obj);
        }
    }

    /** 파일 썸네일과 파일이름 보여주는 이벤트 **/
    export function setFile(obj, type)
    {
        if(window.FileReader)
        {
            if (obj.files && obj.files[0])
            {
                setFileName(obj);

                if (type === 'image')
                {
                    /** 기존 썸네일 영역 삭제 **/
                    removeThumbnail(obj);
                    /** 파일읽어서 썸네일 표출하기 **/
                    readImage(obj);
                }
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
            const innerDom = `<div class="detail-img-wrap"><img src="${reader.result}" alt=""></div>`;
            $(obj).parent().after(innerDom);
        }
    }

    function setFileName(obj)
    {
        const fileName = obj.files[0].name;
        $(obj).siblings('.upload-name').val(fileName);
    }

    export function emptyFile(obj)
    {
        removeThumbnail(obj);
        $(obj).val(null);
        $(obj).siblings('.upload-name').val('파일선택');
    }

    export function removeThumbnail(obj)
    {
        const thumbnailWrap = $(obj).parent().siblings('.detail-img-wrap');
        if (thumbnailWrap.length > 0)
            thumbnailWrap.remove();
    }

    export function copyToClipboard(obj)
    {
        $(obj).siblings('input.input-copy').trigger('select');
        document.execCommand("copy");

        sweetToast('클립보드에 복사 됨.');
    }

    export function paginate(_currentPage, _lastPage)
    {
        let pageButtonLength  = 7;
        let i, current, pageNum;
        let pageDom = '';

        pageDom += _currentPage === 1 ?
            `<a class="paginate_button previous disabled" id="dataTable_previous">${label.previous}</a><span>` :
            `<a class="paginate_button previous" data-page="${(_currentPage-1)}" id="dataTable_previous">${label.previous}</a><span>`

        if (_lastPage <= pageButtonLength)
        {
            for (i=1; i<=_lastPage; i++)
            {
                current = _lastPage > 1 && _currentPage === i ? 'current' : '';
                pageDom += `<a class="paginate_button ${current}" data-page="${i}">${i}</a>`
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
                        `<a class="paginate_button ${current}" data-page="${pageNum}">${pageNum}</a>`
                }
            }
            else if (_currentPage >= 5 && _currentPage <= _lastPage - 4)
            {
                for (i=1; i<=_lastPage; i++)
                {
                    if (i === 1)
                    {
                        pageDom +=
                            `<a class="paginate_button" data-page="${i}">${i}</a>
							<span class="ellipsis">…</span>`
                    }

                    if (_currentPage === i)
                    {
                        pageDom +=
                            `<a class="paginate_button" data-page="${(i - 1)}">${(i - 1)}</a>
							<a class="paginate_button current" data-page="${i}">${i}</a>
							<a class="paginate_button" data-page="${(i + 1)}">${(i + 1)}</a>`
                    }

                    if (_lastPage === i)
                    {
                        pageDom +=
                            `<span class="ellipsis">…</span>
							<a class="paginate_button" data-page="${_lastPage}">${_lastPage}</a>`
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
                        `<a class="paginate_button ${current}" data-page="${pageNum}">${pageNum}</a>`
                }
            }
        }

        pageDom += _lastPage === _currentPage || Number(_lastPage) === 0 ?
            `</span><a class="paginate_button next disabled" id="dataTable_next">${label.next}</a>` :
            `</span><a class="paginate_button next" data-page="${(_currentPage+1)}" id="dataTable_next">${label.next}</a>`

        return pageDom;
    }

