
    import {
        modalContent, modalBackdrop, loader, selectEls,
        dateButtons, datePicker, dateFrom, dateTo, } from "./elements.js";
    import { message } from "./message.js";
    import { label } from "./label.js";
    import { numberWithCommas, isOverFileSize } from "./utils.js";
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
        $('body').css("overflow", "hidden");
    }

    export function overflowScroll()
    {
        $('body').css("overflow", "scroll");
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
            datePicker.datepicker("setDate", "today");
        else if ($(obj).hasClass("week"))
            initSearchDateRangeWeek();
        else if ($(obj).hasClass("month"))
            initSearchDateRangeMonth();
        else if ($(obj).hasClass("months"))
            initSearchDateRangeMonths()
    }

    export function initSearchDateRangeWeek()
    {
        dateFrom.datepicker("setDate", "-6D");
        dateTo.datepicker("setDate", "today");
    }

    export function initSearchDateRangeMonth()
    {
        dateFrom.datepicker("setDate", "-1M");
        dateTo.datepicker("setDate", "today");
    }

    export function initSearchDateRangeMonths()
    {
        dateFrom.datepicker("setDate", "-3M");
        dateTo.datepicker("setDate", "today");
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
        datePicker.datepicker("setDate", "today");
    }

    export function initDayBtn()
    {
        dateButtons.removeClass("active");
    }

    export function initPageLength(_obj)
    {
        let options = '';
        options += '<option value="1">1개씩 보기</ooption>';
        options += '<option value="10">10개씩 보기</ooption>';
        options += '<option selected value="30">30개씩 보기</ooption>';
        options += '<option value="50">50개씩 보기</ooption>';
        options += '<option value="100">100개씩 보기</ooption>';
        options += '<option value="500">500개씩 보기</ooption>';
        options += '<option value="1000">1000개씩 보기</ooption>';

        _obj.html(options);
    }

    export function initSelectOption()
    {
        selectEls.each(function () {
            if (this.id !== 'selPageLength')
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

    /** 파일 썸네일과 파일이름 보여주는 이벤트 **/
    export function setFile(obj, type)
    {
        if(window.FileReader)
        {
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

    export function emptyFile(obj)
    {
        removeThumbnail(obj);
        $(obj).val(null);
    }

    export function removeThumbnail(obj)
    {
        const thumbnailWrap = $(obj).parent().siblings('.detail-img-wrap');
        if (thumbnailWrap.length > 0)
            thumbnailWrap.remove();
    }

    export function isImage(obj)
    {
        if (obj.files[0])
        {
            let file 		= obj.files[0];
            let fileType 	= file["type"];
            let imageTypes 	= ["image/jpeg", "image/png"];

            return $.inArray(fileType, imageTypes) >= 0;
        }
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

