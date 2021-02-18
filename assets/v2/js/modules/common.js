
    import { modalContent, modalBackdrop, loader } from "./elements.js";
    import { message } from "./message.js";
    import { label } from "./label.js";
    import { numberWithCommas } from "./utils.js";

    export function fadeinModal()
    {
        modalContent.fadeIn();
        modalBackdrop.fadeIn();
    }

    export function fadeoutModal()
    {
        modalContent.fadeOut();
        modalBackdrop.fadeOut();
    }

    export function fadeinLoader()
    {
        loader.fadeIn(100);
    }

    export function fadeoutLoader()
    {
        loader.fadeOut(100);
    }

    export function onErrorImage()
    {
        $('img').on('error', function () {
            $(this).attr('src', label.noImage);
        });
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

    /** 테이블 기본환경 설정 **/
    export function initTableDefaultConfig()
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

    /** 테이블 상단 total count 세팅 **/
    export function buildTotalCount(_table)
    {
        const numEl = $(_table).parent().siblings().find(".data-num")

        $(numEl).html(numberWithCommas(getTotalRecordsFromDataTable(_table)));
    }

    /** 데이터 테이블에서 total count 가져오기 **/
    export function getTotalRecordsFromDataTable(_table)
    {
        const table = _table.DataTable();
        const info = table.page.info();

        return info.recordsTotal;
    }
