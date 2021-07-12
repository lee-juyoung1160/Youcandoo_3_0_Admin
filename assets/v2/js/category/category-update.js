
	import {ajaxRequestWithFile, ajaxRequestWithJson, isSuccessResp, invalidResp} from "../modules/ajax-request.js";
	import { api, fileApiV2 } from '../modules/api-url-v1.js';
	import {categoryTitle, categoryIcon, thumbnail, rdoExposure, btnSubmit, dataTable, lengthInput,} from '../modules/elements.js';
	import {sweetToast, sweetToastAndCallback, sweetConfirm} from '../modules/alert.js';
	import {limitInputLength, calculateInputLength, onChangeValidateImage, onErrorImage,} from "../modules/common.js";
	import { getPathName, splitReverse, isEmpty } from "../modules/utils.js";
	import { label } from "../modules/label.js";
	import { message } from "../modules/message.js";
	import { page } from "../modules/page-url.js";
	import { initTableDefaultConfig } from "../modules/tables.js";

	const pathName		= getPathName();
	const categoryIdx	= splitReverse(pathName, '/');

	$( () => {
		/** dataTable default config **/
		initTableDefaultConfig();
		/** 상세 불러오기 **/
		getDetail();
		/** 이벤트 **/
		lengthInput .on("propertychange change keyup paste input", function () { limitInputLength(this); });
		categoryIcon.on('change', function () { onChangeValidateImage(this); });
		btnSubmit	.on('click', function () { onSubmitUpdateCategory(); });
	});

	function getDetail()
	{
		const param = { "idx" : categoryIdx }

		ajaxRequestWithJson(true, api.detailCategory, JSON.stringify(param))
			.then( async function( data, textStatus, jqXHR ) {
				await isSuccessResp(data) ? buildDetail(data) : sweetToast(invalidResp(data));
				await getSubCategory();
			})
			.catch(reject => sweetToast(label.detailContent + message.ajaxLoadError));
	}

	let g_category_uuid;
	function buildDetail(data)
	{
		const { category_title, is_exposure, icon_image_url, category_uuid } = data.data;

		categoryTitle.val(category_title);
		thumbnail.attr('src', icon_image_url);
		rdoExposure.each(function () {
			$(this).prop('checked', $(this).val() === is_exposure);
		});

		g_category_uuid = category_uuid;

		onErrorImage();
		calculateInputLength();
	}

	function getSubCategory()
	{
		const param = { "category_uuid" : g_category_uuid }

		ajaxRequestWithJson(false, api.subCategoryList, JSON.stringify(param))
			.then( async function( data, textStatus, jqXHR ) {
				await isSuccessResp(data) ? getSubCategorySuccess(data) : sweetToast(invalidResp(data));
			})
			.catch(reject => sweetToast(label.list + message.ajaxLoadError));
	}

	function getSubCategorySuccess(data)
	{
		data.recordsTotal = data.count;
		data.recordsFiltered = data.count;
		buildSubCategory(data);
	}

	function buildSubCategory(data)
	{
		dataTable.DataTable({
			data: data.data,
			columns: [
				{title: "세부 카테고리",	data: "subcategory_title", 	width: "80%",
					render: function (data, type, row, meta) {
						return `<div class="input-wrap">
                                    <input type="text" class="length-input" value="${data}" maxlength="15" disabled>
                                    <p class="length-count-wrap"><span class="count-input">0</span>/15</p>
                                </div>
                                <button type="button" class="btn-xs btn-edit btn-editable" data-uuid="${row.subcategory_uuid}">수정</button>`
					}
				},
				{title: "삭제",			data: "subcategory_uuid",	width: "20%",
					render: function (data, type, row, meta) {
						return `<button type="button" class="btn-xs btn-text-red delete-btn" id="${data}">
									<i class="fas fa-minus-circle"></i>
								</button>`
					}
				}
			],
			serverSide: false,
			paging: false,
			select: false,
			destroy: true,
			initComplete: function () {
				$(".length-input").on("propertychange change keyup paste input", function () { limitInputLength(this); });
				calculateInputLength();
				initTableSort();
				addEditableEvent();
				addDeleteEvent();
			},
			fnRowCallback: function( nRow, aData ) {
				$(nRow).attr('data-uuid', aData.subcategory_uuid);
			},
			drawCallback: function (settings) {
			}
		});
	}

	function initTableSort()
	{
		dataTable.find('tbody').sortable({
			helper: function (e, el) {
				return addAttrDragonElement(el);
			}
		});
	}

	function addAttrDragonElement(el)
	{
		let tdElement = $(el).children();
		$(tdElement[0]).css("width", Math.ceil(($(el).width()/100)*80)+'px');
		$(tdElement[1]).css("width", Math.ceil(($(el).width()/100)*20)+'px');
		return $(el);
	}

	function addEditableEvent()
	{
		document.querySelectorAll('.btn-edit').forEach( element => element.addEventListener('click', onClickEditable));
	}

	function onClickEditable(event)
	{
		initButtons();

		const btnTarget = event.target;
		$(btnTarget).siblings('.input-wrap').children('input').prop('disabled', false);
		$(btnTarget).siblings('.input-wrap').trigger('focus');
		$(btnTarget).removeClass('btn-editable');
		$(btnTarget).addClass('btn-teal btn-submit-edit');
		$(btnTarget).text('완료');

		addSubmitEvent(btnTarget);
	}

	function initButtons()
	{
		const btnEdit = $(".btn-edit");
		btnEdit.siblings('.input-wrap').children('input').prop('disabled', true);
		btnEdit.removeClass('btn-teal btn-submit-edit');
		btnEdit.addClass('btn-editable');
		btnEdit.text('수정');
	}

	function addSubmitEvent(_target)
	{
		removeSubmitEvent();
		addEditableEvent();

		_target.removeEventListener('click', onClickEditable);
		_target.addEventListener('click', onSubmitEditSubcategory);
	}

	function removeSubmitEvent()
	{
		document.querySelectorAll('.btn-edit').forEach( element => element.removeEventListener('click', onSubmitEditSubcategory));
	}

	let inputValue;
	let edit_subcategory_uuid;
	function onSubmitEditSubcategory(event)
	{
		const btnTarget = event.target;
		const inputTarget = $(btnTarget).siblings('.input-wrap').children('input');
		inputValue = $(inputTarget).val();
		edit_subcategory_uuid = $(btnTarget).data('uuid');

		if (isEmpty(inputValue))
		{
			sweetToast(`세부 카테고리를 ${message.input}`);
			$(inputTarget).trigger('focus');
			return;
		}

		editSubcategoryRequest();
	}

	function editSubcategoryRequest()
	{
		const param = {
			"subcategory_title" : inputValue,
			"subcategory_uuid" : edit_subcategory_uuid
		};

		ajaxRequestWithJson(true, api.editSubCategory, JSON.stringify(param))
			.then( async function( data, textStatus, jqXHR ) {
				await sweetToastAndCallback(data, getSubCategory);
			})
			.catch(reject => sweetToast(label.modify + message.ajaxError));
	}

	function addDeleteEvent()
	{
		$(".delete-btn").on('click', function () { deleteRow(this); })
	}

	let g_delete_uuids = [];
	function deleteRow(obj)
	{
		$(obj).closest('tr').remove();
		g_delete_uuids.push(obj.id);
	}

	function updateValidation()
	{
		if (isEmpty(categoryTitle.val()))
		{
			sweetToast(`카테고리 명은 ${message.required}`);
			categoryTitle.trigger('focus');
			return false;
		}

		return true;
	}

	function onSubmitUpdateCategory()
	{
		if (updateValidation())
		{
			const requestFn = g_delete_uuids.length > 0 ? deleteSubCategoryRequest : reorderSubCategoryRequest

			sweetConfirm(message.modify, requestFn);
		}
	}

	function deleteSubCategoryRequest()
	{
		const param = { "subcategory_list" : g_delete_uuids };

		ajaxRequestWithJson(true, api.deleteSubCategory, JSON.stringify(param))
			.then( async function( data, textStatus, jqXHR ) {
				await isSuccessResp(data) ? reorderSubCategoryRequest() : sweetToast(invalidResp(data));
			})
			.catch(reject => sweetToast(`세부 카테고리 삭제${message.ajaxError}`));
	}

	function reorderSubCategoryRequest()
	{
		if (getRowIds().length > 0)
		{
			const param = {
				"category_uuid" : g_category_uuid,
				"subcategory_list" : getRowIds()
			};

			ajaxRequestWithJson(true, api.reorderSubCategory, JSON.stringify(param))
				.then( async function( data, textStatus, jqXHR ) {
					await isSuccessResp(data) ? reorderSubcategoryReqCallback(data) : sweetToast(invalidResp(data));
				})
				.catch(reject => sweetToast(`세부 카테고리 정렬${message.ajaxError}`));
		}
		else
		{
			const imageFile = categoryIcon[0].files;
			imageFile.length === 0 ? updateCategoryRequest() : fileUploadReq();
		}
	}

	function reorderSubcategoryReqCallback(data)
	{
		const imageFile = categoryIcon[0].files;
		imageFile.length === 0 ? updateCategoryRequest() : fileUploadReq();
	}

	function fileUploadReq()
	{
		let param  = new FormData();
		param.append('file', categoryIcon[0].files[0]);

		ajaxRequestWithFile(true, fileApiV2.single, param)
			.then( async function( data, textStatus, jqXHR ) {
				await isSuccessResp(data) ? updateCategoryRequest(data) : sweetToast(invalidResp(data));
			})
			.catch(reject => sweetToast(`이미지 등록${message.ajaxError}`));
	}

	function updateCategoryRequest(data)
	{
		if (isEmpty(data) || isSuccessResp(data))
		{
			const param = {
				"category_uuid" : g_category_uuid,
				"title" : categoryTitle.val().trim(),
				"is_exposure" : $('input[name=radio-exposure]:checked').val(),
			}

			if (!isEmpty(data))
				param["icon_image_url"] = data.image_urls.file;

			ajaxRequestWithJson(true, api.updateCategory, JSON.stringify(param))
				.then( async function( data, textStatus, jqXHR ) {
					await sweetToastAndCallback(data, updateCategorySuccess);
				})
				.catch(reject => sweetToast(label.modify + message.ajaxError));
		}
	}

	function updateCategorySuccess()
	{
		location.href = page.detailCategory + categoryIdx;
	}

	function getRowIds()
	{
		const rows = dataTable.find('tbody').children();
		let uuids = [];

		for (let i=0; i<rows.length; i++)
		{
			let subUuid = $(rows[i]).data('uuid');
			if (isEmpty(subUuid)) continue;
			uuids.push(subUuid);
		}

		return uuids;
	}
