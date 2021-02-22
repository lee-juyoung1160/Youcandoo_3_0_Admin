
    import {
        modalContent, modalBackdrop, loader,
        dateButtons, datePicker, dateFrom, dateTo } from "./elements.js";
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

    function overflowHidden()
    {
        $('body').css("overflow", "hidden");
    }

    function overflowScroll()
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

    export function initDayBtn()
    {
        dateButtons.removeClass("active");
    }

    export function initPageLength(_obj)
    {
        let options = '';
        options += '<option value="10">10개씩 보기</ooption>';
        options += '<option selected value="30">30개씩 보기</ooption>';
        options += '<option value="50">50개씩 보기</ooption>';
        options += '<option value="100">100개씩 보기</ooption>';
        options += '<option value="500">500개씩 보기</ooption>';
        options += '<option value="1000">1000개씩 보기</ooption>';

        _obj.html(options);
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

