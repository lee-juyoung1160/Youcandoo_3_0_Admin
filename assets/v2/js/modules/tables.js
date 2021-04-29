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
        const totalCount = numberWithCommas(getTotalRecordsFromDataTable(_table));

        $(numEl).text( totalCount);
    }

    /** 데이터 테이블에서 total count 가져오기 **/
    export function getTotalRecordsFromDataTable(_table)
    {
        const table = _table.DataTable();
        const info = table.page.info();

        return info.recordsTotal;
    }

    /** 테이블 조회결과 없을 때 이전/다음 버튼 숨기기 **/
    export function toggleBtnPreviousAndNextOnTable(obj)
    {
        let pagination = $(obj).closest('.dataTables_wrapper').find('.dataTables_paginate');
        pagination.toggle(obj.api().page.info().pages > 0);
    }

    /**
     *  뒤로가기/이전버튼 이벤트에서 기존 목록 페이지 유지를 위한 메서드
     * **/
    export function redrawPage(_table, param_page)
    {
        let table = $(_table).DataTable();
        table.page(param_page-1).draw( 'page' );
    }

    export function getCurrentPage(_table)
    {
        let table = $(_table).DataTable();
        let info = table.page.info();

        return (info.start / info.length) + 1;
    }

    /** 테이블 현재 페이지 리로드 **/
    export function tableReloadAndStayCurrentPage(tableObj)
    {
        let table = tableObj.DataTable();
        table.ajax.reload( null, false );
        if (table.data().length === 0)
            table.page( 'last' ).draw( 'page' );

        $("input[name=chk-row]").prop("checked", false);
    }

    export function checkBoxCheckAllElement()
    {
        return `<div class="checkbox-wrap"><input type="checkbox" name="chk-row" id="checkAll"/><label for="checkAll"><span></span></label></div>`;
    }

    export function onClickCheckAll(obj)
    {
        const checkboxName = $(obj).prop('name');
        const tableEl = '#'+$(obj).closest('table').prop('id');
        let table = $(tableEl).DataTable();
        if ($(obj).is(':checked'))
        {
            $('input[name="'+checkboxName+'"]').prop('checked', true);
            const checkboxElsInTableBody = $(tableEl).children('tbody').find('input[name="'+checkboxName+'"]');
            checkboxElsInTableBody.each(function (index) {
                table.row(index).select();
            })
        }
        else
        {
            $('input[name="'+checkboxName+'"]').prop('checked', false);
            table.rows().deselect();
        }
    }

    export function onClickCheckRow(obj)
    {
        let count   = 0;
        const checkboxEl = $("input[name=chk-row]");
        const checkboxElInTableBody = $("#dataTable tbody").find(":checkbox");

        checkboxElInTableBody.each(function () {
            if ($(this).is(':checked'))
                count++;
        });

        if (count === 0)
            checkboxEl.prop('checked', false);

        if (checkboxElInTableBody.length === count)
            checkboxEl.prop('checked', true);
        else
            uncheckedCheckAll();
    }

    export function uncheckedCheckAll()
    {
        $("#checkAll").prop('checked', false);
    }

    export function checkBoxElement(idx)
    {
        return `<div class="checkbox-wrap"><input type="checkbox" name="chk-row" id="${idx}"/><label for="${idx}"><span></span></label></div>`;
    }

    export function toggleSingleCheckBox(obj)
    {
        const tableEl = $(obj).parents('table');
        const chkBoxes = $(tableEl).find('input:checkbox');

        $(chkBoxes).prop('checked', false);
        $(obj).prop('checked', true);
    }