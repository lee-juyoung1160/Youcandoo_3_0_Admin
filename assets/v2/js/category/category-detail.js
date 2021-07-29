
	import {ajaxRequestWithFile, ajaxRequestWithJson, isSuccessResp, invalidResp} from "../modules/ajax-request.js";
	import {api, fileApiV2} from '../modules/api-url-v1.js';
	import {categoryTitle, categoryIcon, isExposure, btnBack, btnList, btnUpdate, btnSubmit,
		btnAdd, modalClose, modalBackdrop, dataTable, subCategoryTitle, lengthInput, modalSubcategory, modalDoitImage,
		btnSubmitImage, attachment, deleteAttachment, createAttachment, modalDoitImageTitle} from '../modules/elements.js';
	import {sweetToast, sweetToastAndCallback, sweetConfirm, sweetError} from '../modules/alert.js';
	import {fadeoutModal, historyBack, limitInputLength, onErrorImage, overflowHidden,} from "../modules/common.js";
	import {getPathName, splitReverse, isEmpty, isImage, isOverFileSize} from "../modules/utils.js";
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
		lengthInput 	.on("propertychange change keyup paste input", function () { limitInputLength(this); });
		createAttachment.on("change", function () { onChangeValidateImageCustom(this); });
		attachment		.on("change", function () { onChangeValidateImageCustom(this); });
		btnAdd			.on("click", function () { onClickModalSubcategoryOpen(); });
		modalClose		.on("click", function () { fadeoutModal(); });
		modalBackdrop	.on("click", function () { fadeoutModal(); });
		btnBack	 		.on('click', function () { historyBack(); });
		btnList	 		.on('click', function () { goListPage(); });
		btnUpdate		.on('click', function () { goUpdatePage(); });
		btnSubmit		.on('click', function () { onSubmitSubcategory(); });
		btnSubmitImage	.on('click', function () { onSubmitUpdateImage(); });
		deleteAttachment.on('click', function () { onClickDelAttach(this); });
	});

	function onClickModalSubcategoryOpen()
	{
		initCreateAttachment();
		modalSubcategory.fadeIn();
		modalBackdrop.fadeIn();
		overflowHidden();
		subCategoryTitle.trigger('focus');
		subCategoryTitle.val('');
	}

	function getDetail()
	{
		const param = { "idx" : categoryIdx }

		ajaxRequestWithJson(true, api.detailCategory, JSON.stringify(param))
			.then( async function( data, textStatus, jqXHR ) {
				if (isSuccessResp(data))
				{
					await buildDetail(data);
					await getSubCategory();
				}
				else
					sweetToast(invalidResp(data));
			})
			.catch(reject => sweetError(label.detailContent + message.ajaxLoadError));
	}

	let g_category_uuid;
	function buildDetail(data)
	{
		const { category_title, is_exposure, icon_image_url, category_uuid } = data.data;

		categoryTitle.text(category_title);
		categoryIcon.attr('src', icon_image_url);
		isExposure.text(is_exposure);

		g_category_uuid = category_uuid;

		onErrorImage();
	}

	function getSubCategory()
	{
		const param = { "category_uuid" : g_category_uuid }

		ajaxRequestWithJson(false, api.subCategoryList, JSON.stringify(param))
			.then( async function( data, textStatus, jqXHR ) {
				isSuccessResp(data) ? getSubCategorySuccess(data) : sweetToast(invalidResp(data));
			})
			.catch(reject => sweetError(label.list + message.ajaxLoadError));
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
				{title: "세부 카테고리",	data: "subcategory_title",	width: "85%" }
				,{title: "두잇 이미지",	data: "subcategory_uuid",	width: "15%",
					render: function (data, type, row, meta) {
						return `<i class="fas fa-images" data-attachment="${row.doit_image_list}" data-title="${row.subcategory_title}" id="${data}"></i>`;
					}
				}
			],
			serverSide: false,
			paging: false,
			select: false,
			destroy: true,
			initComplete: function () {
			},
			fnRowCallback: function( nRow, aData ) {
				$(nRow).children().eq(1).find('i').on('click', function () { onClickDoitImage(this); } );
			},
			drawCallback: function (settings) {
			}
		});
	}

	let g_subcategory_uuid;
	function onClickDoitImage(obj)
	{
		g_subcategory_uuid = obj.id;
		modalDoitImage.fadeIn();
		modalBackdrop.fadeIn();
		overflowHidden();
		buildModalDoitImage(obj);
	}

	function buildModalDoitImage(obj)
	{
		g_delete_attachment_urls = [];

		modalDoitImageTitle.text(`두잇 이미지 설정 - ${$(obj).data('title')}`);

		attachment.each(function () {
			$(this).siblings('.icon-delete-attach').hide();
			removeThumbnail(this);

		});

		let attachments = [];
		if (!isEmpty($(obj).data('attachment')))
			attachments = $(obj).data('attachment').split(',');

		if (attachments.length > 0)
		{
			attachments.map((value, index) => {
				const thumbnailEl = `<div class="detail-img-wrap"><img src="${value}" alt=""></div>`;
				attachment.eq(index).parent().append(thumbnailEl);
				attachment.eq(index).siblings('.icon-delete-attach').show();
			})
		}
	}

	function createValidation()
	{
		if (isEmpty(subCategoryTitle.val()))
		{
			sweetToast(`세부 카테고리 명은 ${message.required}`);
			subCategoryTitle.trigger('focus');
			return false;
		}

		let imgCount = 0;
		createAttachment.each(function () {
			const doitImg = $(this)[0].files;
			if (doitImg.length > 0)
				imgCount++;
		})
		if (imgCount === 0)
		{
			sweetToast(`두잇 기본 이미지는 ${message.required}`);
			return false;
		}

		return true;
	}

	function onSubmitSubcategory()
	{
		if (createValidation())
			sweetConfirm(message.create, fileUploadReq);
	}

	function fileUploadReq()
	{
		let param  = new FormData();
		for (let i=0; i<createAttachment.length; i++)
			param.append('file', createAttachment[i].files[0]);

		ajaxRequestWithFile(true, fileApiV2.multi, param)
			.then( async function( data, textStatus, jqXHR ) {
				isSuccessResp(data) ? createSubcategoryRequest(data) : sweetToast(invalidResp(data));
			})
			.catch(reject => sweetError(`이미지 등록${message.ajaxError}`));
	}

	function createSubcategoryRequest(data)
	{
		const param = {
			"category_uuid" : g_category_uuid,
			"title" : subCategoryTitle.val().trim(),
			"doit_image_list" : data.image_urls
		}

		ajaxRequestWithJson(true, api.createSubCategory, JSON.stringify(param))
			.then( async function( data, textStatus, jqXHR ) {
				await initCreateAttachment();
				await sweetToastAndCallback(data, createSubcategorySuccess);
			})
			.catch(reject => sweetError(label.submit + message.ajaxError));
	}

	function createSubcategorySuccess()
	{
		fadeoutModal();
		getSubCategory();
	}

	function initCreateAttachment()
	{
		createAttachment.each(function () {
			$(this).siblings('.icon-delete-attach').hide();
			emptyFile(this);
		})
	}

	function onSubmitUpdateImage()
	{
		if (updateImageValid())
		{
			let imgCount = 0;
			attachment.each(function () {
				const doitImg = $(this)[0].files;
				if (doitImg.length > 0)
					imgCount++;
			})

			const callback = imgCount > 0 ? updateFileUploadRequest : updateImageToApiServerReq;
			sweetConfirm(message.create, callback);
		}
	}

	function updateImageValid()
	{
		let uploadCount = 0;
		attachment.each(function () {
			const doitImg = $(this)[0].files;
			if (doitImg.length > 0)
				uploadCount++;
		});

		if (uploadCount === 0 && g_delete_attachment_urls.length === 0)
		{
			sweetToast('변경된 내용이 없습니다.');
			return false;
		}

		let thumbnailCount = 0;
		attachment.each(function () {
			const thumbnailImg = $(this).siblings('.detail-img-wrap');
			if (thumbnailImg.length > 0)
				thumbnailCount++;
		});

		if (thumbnailCount === 0)
		{
			sweetToast(`두잇 기본 이미지는 ${message.required}`);
			return false;
		}

		return true;
	}

	function updateFileUploadRequest()
	{
		let param  = new FormData();
		for (let i=0; i<attachment.length; i++)
			param.append('file', attachment[i].files[0]);

		ajaxRequestWithFile(true, fileApiV2.multi, param)
			.then( async function( data, textStatus, jqXHR ) {
				isSuccessResp(data) ? updateImageToApiServerReq(data) : sweetToast(invalidResp(data));
			})
			.catch(reject => sweetError(`이미지 등록${message.ajaxError}`));
	}

	function updateImageToApiServerReq(data)
	{
		const param = { "subcategory_uuid" : g_subcategory_uuid }

		if (!isEmpty(data))
			param["add_image_list"] = data.image_urls;
		if (g_delete_attachment_urls.length > 0)
			param["delete_image_list"] = g_delete_attachment_urls;

		ajaxRequestWithJson(true, api.updateSubCategoryDoitImg, JSON.stringify(param))
			.then( async function( data, textStatus, jqXHR ) {
				await initUpdateAttachment();
				await sweetToastAndCallback(data, updateImageToApiServerCallbackSuccess);
			})
			.catch(reject => sweetError(label.modify + message.ajaxError));
	}

	function updateImageToApiServerCallbackSuccess()
	{
		fadeoutModal();
		getSubCategory();
	}

	function initUpdateAttachment()
	{
		attachment.each(function () {
			$(this).siblings('.icon-delete-attach').hide();
			emptyFile(this);
		})
	}

	function goListPage()
	{
		location.href = page.listCategory;
	}

	function goUpdatePage()
	{
		location.href = page.updateCategory + categoryIdx;
	}

	function onChangeValidateImageCustom(obj)
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
			 * data-compare: 같음/이상/이하
			 * 속성이 있어야 한다.
			 * **/
			const compare = $(obj).data('compare');
			const requiredWidth = $(obj).data('width');
			const requiredHeight = $(obj).data('height');
			const img = new Image();

			if (obj.files[0])
			{
				img.src = window.URL.createObjectURL(obj.files[0]);
				img.onload = function() {
					const infoMessage = `업로드 가능한 이미지 사이즈를 확인해주세요.<br>
                                         선택한 이미지 사이즈: ${this.width} x ${this.height}<br>
                                         업로드 가능한 이미지 사이즈: ${requiredWidth} x ${requiredHeight}`;

					if (compare === '같음' && (this.width !== requiredWidth || this.height !== requiredHeight))
					{
						sweetError(infoMessage);
						emptyFile(obj);
					}
					else if (compare === '이상' && (this.width < requiredWidth || this.height < requiredHeight))
					{
						sweetError(infoMessage);
						emptyFile(obj);
					}
					else if (compare === '이하' && (this.width > requiredWidth || this.height > requiredHeight))
					{
						sweetError(infoMessage);
						emptyFile(obj);
					}
					else
						setFile(obj);
				}
			}
			else emptyFile(obj);
		}
	}

	function setFile(obj)
	{
		if(window.FileReader)
		{
			if (obj.files && obj.files[0])
			{
				/** 파일이름 세팅 **/
				const fileName = obj.files[0].name;
				$(obj).siblings('.upload-name').val(fileName);

				/** 기존 썸네일 영역 삭제 **/
				removeThumbnail(obj);

				/** 파일읽어서 썸네일 표출하기 **/
				let reader = new FileReader();
				reader.readAsDataURL(obj.files[0]);

				reader.onload = function() {
					const innerDom = `<div class="detail-img-wrap"><img src="${reader.result}" alt=""></div>`;
					$(obj).parent().append(innerDom);
				}

				$(obj).siblings('.icon-delete-attach').show();
			}
			else
				emptyFile(obj);
		}
		else
			sweetToast(message.invalidBrowser);
	}

	function removeThumbnail(obj)
	{
		const thumbnailWrap = $(obj).siblings('.detail-img-wrap');
		if (thumbnailWrap.length > 0)
			thumbnailWrap.remove();
	}

	function emptyFile(obj)
	{
		removeThumbnail(obj);
		$(obj).val(null);
	}

	let g_delete_attachment_urls = [];
	function onClickDelAttach(obj)
	{
		if ($(obj).hasClass('update-attachment'))
			g_delete_attachment_urls.push($(obj).siblings('.detail-img-wrap').children('img').attr('src'));

		const inputFile = $(obj).siblings('input');
		emptyFile(inputFile)
		$(obj).hide();
	}
