
    import {lengthInput, authCode, authName, btnSubmitAuth, btnSubmit,
        modalBackdrop, modalClose, modalOpen, authWrap, menuWrap,} from "../modules/elements.js";
    import {isEmpty} from "../modules/utils.js";
    import {fadeinModal, fadeoutModal, limitInputLength} from "../modules/common.js";
    import {ajaxRequestWithJson, invalidResp, isSuccessResp} from "../modules/ajax-request.js";
    import {api} from "../modules/api-url-v1.js";
    import {sweetConfirm, sweetToast, sweetToastAndCallback, sweetError} from "../modules/alert.js";
    import {message} from "../modules/message.js";

    $( () => {
        /** 권한 불러오기 **/
        getAuthList();
        /** 이벤트 **/
        lengthInput 	.on("propertychange change keyup paste input", function () { limitInputLength(this); });
        modalOpen       .on("click", function () { onClickModalOpen(); });
        modalClose		.on("click", function () { fadeoutModal(); });
        modalBackdrop	.on("click", function () { fadeoutModal(); });
        btnSubmitAuth	.on("click", function () { onSubmitAuth(); });
        btnSubmit	    .on("click", function () { onSubmitMenuWithAuth(); });
    });

    function getAuthList()
    {
        ajaxRequestWithJson(false, api.authList, null)
            .then( async function( data, textStatus, jqXHR ) {
                if (isSuccessResp(data))
                {
                    await buildAuthList(data);
                    await getMenuWithAuth();
                }
                else
                    sweetToast(invalidResp(data));
            })
            .catch(reject => sweetError(`권한목록을${message.ajaxLoadError}`));
    }

    function buildAuthList(data)
    {
        authWrap.empty();
        if (!isEmpty(data.data) && data.data.length > 0)
        {
            data.data.map((obj, index) => {
                const { code, name } = obj;
                const auth =
                    `<tr class="name-row ${index === 0 ? 'selected' : ''}" data-code="${code}">
                        <td><a class="auth-name">${name}</a></td>
                        <td>
                            <button type="button" class="btn-xs btn-text-red btn-delete-auth" data-code="${code}">
                                <i class="fas fa-minus-circle"></i>
                            </button>
                        </td>
                    </tr>`

                authWrap.append(auth);
            })

            $(".auth-name").on('click', function () { onClickAuthName(this); });
            $(".btn-delete-auth").on('click', function () { deleteAuth(this); });
        }
    }

    function onClickAuthName(obj)
    {
        $(".name-row").removeClass('selected');
        $(obj).closest('.name-row').addClass('selected');

        getMenuWithAuth();
    }

    function getMenuWithAuth()
    {
        const param = { "code" : selectedAuthCode() };

        ajaxRequestWithJson(true, api.getMenuWithAuth, JSON.stringify(param))
            .then( async function( data, textStatus, jqXHR ) {
                await isSuccessResp(data) ? buildMenuWithAuth(data) : sweetToast(invalidResp(data));
            })
            .catch(reject => sweetError(`메뉴 목록을${message.ajaxLoadError}`));
    }

    function buildMenuWithAuth(data)
    {
        menuWrap.find('tr').remove();
        if (data.data)
        {
            const menus = data.data;
            const mainKeys = Object.getOwnPropertyNames(menus);
            if (!isEmpty(mainKeys) && mainKeys.length > 0)
            {
                mainKeys.map((mainKey, index) => {
                    const {name, view, children} = menus[mainKey];

                    const subKeys = Object.getOwnPropertyNames(children);
                    let subMenu = '';
                    if (!isEmpty(subKeys) && subKeys.length > 0)
                    {
                        subKeys.map(subKey => {
                            subMenu +=
                                `<div class="checkbox-wrap">
                                    <input id="${subKey}_${index}" data-key="${subKey}" type="checkbox" name="${mainKey}" class="chk-sub-menu" ${children[subKey].view ? 'checked' : ''}>
                                    <label for="${subKey}_${index}"><span></span>${children[subKey].name}</label>
                                </div>`
                        })
                    }

                    const menu =
                        `<tr>
                            <th>
                                <div class="checkbox-wrap">
                                    <input id="${mainKey}" data-key="${mainKey}" type="checkbox" name="${mainKey}" class="chk-main-menu" ${view ? 'checked' : ''}>
                                    <label for="${mainKey}"><span></span>${name}</label>
                                </div>
                            </th>
                            <td>
                                ${subMenu}
                            </td>
                        </tr>`

                    menuWrap.append(menu)
                })

                $(".chk-main-menu").on('change', function () { onClickChkMain(this) });
                $(".chk-sub-menu").on('change', function () { onClickChkSub(this) });
            }
        }
    }

    function onClickChkMain(obj)
    {
        const chkName = $(obj).attr('name');
        const isChecked = $(obj).is(':checked');

        $(`input[name=${chkName}]`).prop('checked', isChecked);
    }

    function onClickChkSub(obj)
    {
        const chkName = $(obj).attr('name');
        const chkMain = $(`input[name=${chkName}].chk-main-menu`);
        const checkedSub = $(`input[name=${chkName}].chk-sub-menu:checked`);

        chkMain.prop('checked', checkedSub.length > 0);
    }

    function onSubmitMenuWithAuth()
    {
        sweetConfirm(message.create, setMenuRequest);
    }

    function setMenuRequest()
    {
        let menuObj = {};
        $(".chk-main-menu").each(function () {
            const submenu = $(`input[name=${this.name}].chk-sub-menu`);
            let subObj = {};
            submenu.each(function () {
                subObj[$(this).data('key')] = {
                    'view' : $(this).is(':checked')
                }
            })

            menuObj[$(this).data('key')] = {
                "view" : $(this).is(':checked'),
                "children" : subObj
            }
        })
        const param = {
            "code" : selectedAuthCode(),
            "menu" : menuObj,
        };

        ajaxRequestWithJson(true, api.setMenuWithAuth, JSON.stringify(param))
            .then( async function( data, textStatus, jqXHR ) {
                await sweetToastAndCallback(data, getMenuWithAuth);
            })
            .catch(reject => sweetError(`메뉴 목록을${message.ajaxLoadError}`));
    }

    function onSubmitAuth()
    {
        if (createAuthValid())
            sweetConfirm(message.create, createAuthRequest)
    }

    function createAuthValid()
    {
        if (isEmpty(authCode.val()))
        {
            sweetToast(`권한 코드는 ${message.required}`);
            authCode.trigger('focus');
            return false;
        }

        if (isEmpty(authName.val()))
        {
            sweetToast(`권한명은 ${message.required}`);
            authName.trigger('focus');
            return false;
        }

        return true;
    }

    function createAuthRequest()
    {
        const param = {
            "name" : authName.val().trim(),
            "code" : authCode.val().trim()
        };

        ajaxRequestWithJson(true, api.createAuth, JSON.stringify(param))
            .then( async function( data, textStatus, jqXHR ) {
                await sweetToastAndCallback(data, requestSuccess);
            })
            .catch(reject => sweetError(`권한 목록을${message.ajaxLoadError}`));
    }

    function requestSuccess()
    {
        fadeoutModal();
        getAuthList();
    }

    let g_delete_code;
    function deleteAuth(obj)
    {
        g_delete_code = $(obj).data('code');
        sweetConfirm(message.delete, deleteRequest);
    }

    function deleteRequest()
    {
        const param = { "code" : g_delete_code };
        ajaxRequestWithJson(true, api.deleteAuth, JSON.stringify(param))
            .then( async function( data, textStatus, jqXHR ) {
                await sweetToastAndCallback(data, getAuthList);
            })
            .catch(reject => sweetError(`삭제${message.ajaxError}`));
    }

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

    function selectedAuthCode()
    {
        return $('.name-row.selected').data('code');
    }
