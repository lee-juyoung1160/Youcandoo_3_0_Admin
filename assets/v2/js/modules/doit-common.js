
    import {ajaxRequestWithJson, isSuccessResp, invalidResp,} from "./ajax-request.js";
    import {api} from "./api-url.js";
    import {chkIsAnswer, chkIsQuestion, dateFrom, dateTo, doitKeyword, doitKeywords,selCategory, selSubcategory} from "./elements.js";
    import {isEmpty} from "./utils.js";
    import {limitInputLength,} from "./common.js";
    import {sweetToast} from "./alert.js";
    import {label} from "./label.js";
    import {message} from "./message.js";

    export function getCategoryList()
    {
        const param = { "keyword" : "" };

        ajaxRequestWithJson(false, api.createDoitCategoryList, JSON.stringify(param))
            .then( async function( data, textStatus, jqXHR ) {
                await isSuccessResp(data) ? buildSelCategory(data) : sweetToast(invalidResp(data));
                await getSubCategory();
            })
            .catch(reject => sweetToast(`카테고리 목록${message.ajaxLoadError}`));
    }

    export function buildSelCategory(data)
    {
        data.data.map( obj => selCategory.append(`<option value="${obj.category_uuid}">${obj.category_title}</option>`))
    }

    export function onChangeSelCategory()
    {
        getSubCategory();
    }

    export function getSubCategory()
    {
        const param = {  "category_uuid" : selCategory.val() }

        ajaxRequestWithJson(false, api.subCategoryList, JSON.stringify(param))
            .then( async function( data, textStatus, jqXHR ) {
                await isSuccessResp(data) ? buildSelSubCategory(data) : sweetToast(invalidResp(data));
            })
            .catch(reject => sweetToast(label.list + message.ajaxLoadError));
    }

    export function buildSelSubCategory(data)
    {
        let options = '<option value="">세부 카테고리</option>';
        data.data.map( obj => options += `<option value="${obj.subcategory_uuid}">${obj.subcategory_title}</option>`)

        selSubcategory.html(options);
    }

    export function onClickChkIsApply(obj)
    {
        if (!$(obj).is(':checked'))
        {
            chkIsQuestion.prop('checked', false);
            chkIsQuestion.prop('disabled', true);
            toggleQuestion(chkIsQuestion);

            chkIsAnswer.prop('checked', false);
            chkIsAnswer.prop('disabled', true);
        }
        else
            chkIsQuestion.prop('disabled', false);
    }

    export function onClickChkIsQuestion(obj)
    {
        if (!$(obj).is(':checked'))
        {
            chkIsAnswer.prop('checked', false);
            chkIsAnswer.prop('disabled', true);
        }
        else
            chkIsAnswer.prop('disabled', false);

        toggleQuestion(obj);
    }

    export function toggleQuestion(obj)
    {
        const textAreaWrap = $(obj).parent().siblings('.textarea-wrap');

        if ($(obj).is(':checked'))
            $(textAreaWrap).show()
        else
        {
            $(textAreaWrap).hide();
            $(textAreaWrap).children('textarea').val('');
        }

        $(textAreaWrap).children('textarea').trigger('focus');
    }

    export function onClickAddKeyword()
    {
        console.log('onClickAddKeyword')
        if (addKeywordValidation())
        {
            const inputValue = doitKeyword.val().trim();
            let keywordArr = [];
            $(".added-keyword").each(function () {
                keywordArr.push($(this).text());
            });

            if (isEmpty(keywordArr) || keywordArr.indexOf(inputValue) === -1)
            {
                const doitKeywordEl =
                    `<li class="keyword-li">
						#<span class="added-keyword">${inputValue}</span>
						<button class="btn-i btn-del-keyword"><i class="fas fa-times-circle"></i></button>
					</li>`

                doitKeywords.append(doitKeywordEl);

                doitKeyword.val('');
                doitKeyword.trigger('focus');
                limitInputLength(doitKeyword);
                addRemoveKeywordEvent();
            }
        }
    }

    export function addKeywordValidation()
    {
        if (isEmpty(doitKeyword.val()))
        {
            sweetToast(`키워드를 ${message.input}`);
            doitKeyword.trigger('focus');
            return false;
        }

        const splitInput = doitKeyword.val().split('');
        if (splitInput.indexOf(',') !== -1 || splitInput.indexOf('#') !== -1)
        {
            sweetToast('키워드에 # 또는 , 를 포함할 수 없습니다.');
            return false;
        }

        const doitKeywordLength = doitKeywords.find('li').length;
        if (doitKeywordLength >= 6)
        {
            sweetToast(`키워드는 ${message.maxAddSix}`);
            return false;
        }

        return true;
    }

    export function addRemoveKeywordEvent()
    {
        $(".btn-del-keyword").on('click', function () { removeDoitKeyword(this); })
    }

    export function removeDoitKeyword(obj)
    {
        $(obj).parents('.keyword-li').remove();
    }

    export function initSearchDatepickerMaxDateToday()
    {
        dateFrom.datepicker("option", "maxDate", "today");
        dateTo.datepicker("option", "maxDate", "today");
    }
