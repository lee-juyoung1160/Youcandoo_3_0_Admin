
	import {ajaxRequestWithFormData, ajaxRequestWithJsonData, isSuccessResp} from '../modules/request.js'
	import {api, fileApiV2} from '../modules/api-url.js';
	import {
	categoryTitle,
	categoryIcon,
	isEstablish,
	isExposure,
	btnBack,
	btnList,
	btnUpdate,
	btnSubmit,
	btnAdd,
	modalClose,
	modalBackdrop,
	dataTable,
	subCategoryTitle,
	lengthInput,
	modalSubcategory,
	modalDoitImage,
	btnSubmitImage, attachment, deleteAttachment, createAttachment
} from '../modules/elements.js';
	import {sweetToast, sweetToastAndCallback, sweetConfirm, sweetError} from '../modules/alert.js';
	import {
		fadeoutModal,
		historyBack,
		limitInputLength,
		onErrorImage,
		overflowHidden,
	} from "../modules/common.js";
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
		getSubCategory();
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
		modalSubcategory.fadeIn();
		modalBackdrop.fadeIn();
		overflowHidden();
		subCategoryTitle.trigger('focus');
		subCategoryTitle.val('');
	}

	function getDetail()
	{
		const url = api.detailCategory;
		const errMsg = label.detailContent+message.ajaxLoadError;
		const param = {
			"idx" : categoryIdx
		}

		ajaxRequestWithJsonData(false, url, JSON.stringify(param), getDetailCallback, errMsg, false);
	}

	function getDetailCallback(data)
	{
		isSuccessResp(data) ? buildDetail(data) : sweetToast(data.msg);
	}

	let g_category_uuid;
	function buildDetail(data)
	{
		const { category_title, is_exposure, is_establish, icon_image_url, category_uuid } = data.data;

		categoryTitle.text(category_title);
		categoryIcon.attr('src', icon_image_url);
		isEstablish.text(is_establish);
		isExposure.text(is_exposure);

		g_category_uuid = category_uuid;

		onErrorImage();

		getSubCategory();
	}

	function getSubCategory()
	{
		const url = api.subCategoryList;
		const errMsg = label.list + message.ajaxLoadError
		let param = {
			"category_uuid" : g_category_uuid
		}

		ajaxRequestWithJsonData(true, url, JSON.stringify(param), getSubCategorySuccess, errMsg, false);
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
						return `<i class="fas fa-images" data-attachment="${row.doit_image_list}" id="${data}"></i>`;
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

	function onClickDoitImage(obj)
	{
		modalDoitImage.fadeIn();
		modalBackdrop.fadeIn();
		overflowHidden();
		buildModalDoitImage(obj);
	}

	function buildModalDoitImage(obj)
	{
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
		const url = fileApiV2.multi;
		const errMsg = `이미지 등록 ${message.ajaxError}`;
		let param  = new FormData();
		for (let i=0; i<createAttachment.length; i++)
			param.append('file', createAttachment[i].files[0]);

		ajaxRequestWithFormData(true, url, param, createSubcategoryRequest, errMsg, false);
	}

	function createSubcategoryRequest(data)
	{
		const url = api.createSubCategory;
		const errMsg = label.submit + message.ajaxError;
		const param = {
			"category_uuid" : g_category_uuid,
			"title" : subCategoryTitle.val().trim(),
			"doit_image_list" : data.image_urls
		}

		ajaxRequestWithJsonData(true, url, JSON.stringify(param), createSubcategoryCallback, errMsg, false);
	}

	function createSubcategoryCallback(data)
	{
		sweetToastAndCallback(data, createSubcategorySuccess)
	}

	function createSubcategorySuccess()
	{
		fadeoutModal();
		getSubCategory();
	}

	function onSubmitUpdateImage()
	{
		alert('준비중')
		//sweetConfirm(message.create, updateImageRequest);
	}

	function updateImageRequest()
	{
		const url = fileApiV2.multi;
		const errMsg = `이미지 등록 ${message.ajaxError}`;
		const attachment = $("input[name=attachment]");
		let param  = new FormData();
		for (let i=0; i<attachment.length; i++)
			param.append('file', attachment[i].files[0]);

		ajaxRequestWithFormData(true, url, param, updateImageCallback, errMsg, false);
	}

	function updateImageCallback(data)
	{
		isSuccessResp(data) ? updateImageToApiServerReq(data) : sweetToast(data.msg);
	}

	function updateImageToApiServerReq(data)
	{
		const url = api;
		const errMsg = label.submit + message.ajaxError;
		const param = {
			"doit_image" : data.image_urls,
		}

		ajaxRequestWithJsonData(true, url, JSON.stringify(param), updateImageToApiServerCallback, errMsg, false);
	}

	function updateImageToApiServerCallback()
	{
		sweetToastAndCallback(data, updateImageToApiServerCallbackSuccess);
	}

	function updateImageToApiServerCallbackSuccess()
	{
		fadeoutModal();
		getSubCategory();
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
			const needsWidth = $(obj).data('width');
			const needsHeight = $(obj).data('height');
			const img = new Image();

			if (obj.files[0])
			{
				img.src = window.URL.createObjectURL(obj.files[0]);
				img.onload = function() {
					const infoMessage = `선택한 이미지 사이즈는 ${this.width} x ${this.height}입니다.<br> 업로드 가능한 이미지 사이즈를 확인해주세요.`;

					if (compare === '같음' && (this.width !== needsWidth || this.height !== needsHeight))
					{
						sweetError(infoMessage);
						emptyFile(obj);
					}
					else if (compare === '이상' && (this.width < needsWidth || this.height < needsHeight))
					{
						sweetError(infoMessage);
						emptyFile(obj);
					}
					else if (compare === '이하' && (this.width > needsWidth || this.height > needsHeight))
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

	function onClickDelAttach(obj)
	{
		const inputFile = $(obj).siblings('input');
		emptyFile(inputFile)
		$(obj).hide();
	}


