
    import {
        lengthInput, authCode, authName, btnSubmitAuth, btnSubmit,
        modalBackdrop, modalClose, modalOpen, authWrap,
    } from "../modules/elements.js";
    import {initInputNumber} from "../modules/utils.js";
    import {fadeinModal, fadeoutModal, limitInputLength} from "../modules/common.js";
    import {ajaxRequestWithJson, invalidResp, isSuccessResp} from "../modules/ajax-request";
    import {api} from "../modules/api-url-v1";
    import {sweetToast} from "../modules/alert";
    import {message} from "../modules/message";

    $( () => {
        /** 권한 불러오기 **/
        //getAuthList();
        /** 이벤트 **/
        lengthInput 	.on("propertychange change keyup paste input", function () { limitInputLength(this); });
        modalOpen       .on("click", function () { onClickModalOpen(); });
        modalClose		.on("click", function () { fadeoutModal(); });
        modalBackdrop	.on("click", function () { fadeoutModal(); });
    });

    function onClickModalOpen()
    {
        fadeinModal();
        initModal();
    }

    function initModal()
    {
        authCode.trigger('focus');
        authCode.val('');
        authName.val('');
    }

    function getAuthList()
    {
        ajaxRequestWithJson(false, api.authList, null)
            .then( async function( data, textStatus, jqXHR ) {
                await isSuccessResp(data) ? buildAuthList(data) : sweetToast(invalidResp(data));
                await getDetail();
            })
            .catch(reject => sweetError(`권한목록을${message.ajaxLoadError}`));
    }

    function buildAuthList(data)
    {
        authWrap.empty();

        const details  = data.data;
        let listEl = '';
        for (let i=0; i<details.length; i++)
        {
            const code = details[i].code;
            const name = details[i].name;
            const active = i === 0 ? 'on' : '';
            listEl +=
                `<tr>
                    <td><a class="auth-name" data-code="${code}">개발팀</a></td>
                    <td>
                        <button type="button" class="btn-xs btn-text-red btn-delete-auth">
                            <i class="fas fa-minus-circle"></i>
                        </button>
                    </td>
                </tr>`
        }

        authWrap.html(listEl);

        $(".auth-name").on('click', function () { onClickAuthName(this); });
        $(".btn-delete-auth").on('click', function () { deleteAuth(this); });
    }

    function onClickAuthName(obj)
    {
        authList.find('li').removeClass('on');
        $(obj).parent().addClass('on');

        getMenuByAuthCode();
    }

    function deleteAuth()
    {
        sweetConfirm(message.delete, deleteRequest);
    }

    function deleteRequest()
    {
        const param = JSON.stringify({"code" : selectedAuthCode()})
        const url = api.deleteAuth;
        const errMsg = label.delete+message.ajaxError;

    }

    function deleteReqCallback(data)
    {
        sweetToastAndCallback(data, getAuthList);
    }

    function selectedAuthCode()
    {
        let retCode = '';
        authList.find('li').each(function () {
            if ($(this).hasClass('on'))
                retCode = $(this).data('code');
        });
        return retCode;
    }