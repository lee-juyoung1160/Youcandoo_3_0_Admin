
    const selYear   = $('#selYear');
    const selMonth  = $('#selMonth');
    const dataTable = $("#dataTable");
    const d = new Date();
    const year = d.getFullYear();
    const month = d.getMonth() + 1;

    /** 로드 바로 실행 **/
    $(() => {
        initSelectBox();
        buildGrid();
        /** 월단위 셀렉박스 이벤트 **/
        /*selYear     .on('change', function () { updatePage(); });
        selMonth    .on('change', function () { updatePage(); });*/
    });

    function initSelectBox()
    {
        initSelectBoxYear(year);
        initSelectBoxMonth(month);
    }

    function initSelectBoxYear(_year)
    {
        selYear.empty();

        let defaultYear  = 2020;

        for (defaultYear; defaultYear <= _year; defaultYear++)
            selYear.prepend(`<option value="${defaultYear}">${defaultYear}년</option>`);

        onChangeSelectOption(selYear);
    }

    function initSelectBoxMonth(_month)
    {
        selMonth.empty();

        let i = 1;

        for (i; i <= 12; i++)
        {
            let selected = i === Number(_month) ? 'selected' : '';
            selMonth.prepend(`<option ${selected} value="${appendZero(i)}">${appendZero(i)}월</option>`);
        }

        onChangeSelectOption(selMonth);
    }
