    import {message} from "./message.js";
    import {label} from "./label.js";
    import {numberWithCommas} from "./utils.js";

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