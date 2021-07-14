
    import {ajaxRequestWithJson, invalidResp, isSuccessResp} from "./modules/ajax-request.js";
    import {api} from "./modules/api-url-v1.js";
    import {sweetToast} from "./modules/alert.js";
    import {label} from "./modules/label.js";
    import {message} from "./modules/message.js";
    import {
        initSearchDatepicker,
        initSearchDateRangeWeek,
        onChangeSearchDateFrom,
        onChangeSearchDateTo
    } from "./modules/common.js";
    import {dateFrom, dateTo} from "./modules/elements.js";


    $( () => {
        initSearchDatepicker();
        initSearchDateRangeWeek();
        dateFrom.on('change', function () { onChangeSearchDateFrom(); });
        dateTo.on('change', function () { onChangeSearchDateTo(); });
    });

    function getInfos()
    {
        const param = { "idx" : '' }

        ajaxRequestWithJson(true, api, JSON.stringify(param))
            .then( async function( data, textStatus, jqXHR ) {
                await isSuccessResp(data) ? buildInfos(data) : sweetToast(invalidResp(data));
            })
            .catch(reject => sweetToast(`${message.ajaxLoadError}`));
    }

    function buildInfos(data)
    {

    }




    /** 차트 초기화 **/
    function initChart(ctx, type, label, dataset, options)
    {
        return new Chart(ctx,{
            type : type,
            data : {
                labels : label,
                datasets : dataset
            },
            options : options,
        });
    }

    const chartOptions = {
        doughnutOptions: {
            cutoutPercentage : 44,
            legend: {
                align: 'center',
                position: 'left',
                labels: {
                    boxWidth: 12
                }
            },
            plugins: {
                labels: {
                    render: function (args) {
                        return numberWithCommas(args.value);
                    },
                    fontSize: 14,
                    fontColor: '#fff',
                    fontFamily: 'Roboto, sans-serif',
                    position: 'default',
                    showActualPercentages: false
                }
            },
            elements: {
                center: {
                    text: '',
                    color: color.darkNavy,
                    fontStyle: 'Roboto',
                    sidePadding: 20, /** Default is 20 (as a percentage) **/
                    maxFontSize: 25,
                    minFontSize: false, /** Default is 18 (in px), set to false and text will not wrap. **/
                    lineHeight: 25 /** Default is 25 (in px), used for when text wraps **/
                }
            }
        },
    }