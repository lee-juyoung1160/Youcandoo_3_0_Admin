
	import {ajaxRequestWithFile, ajaxRequestWithJson, invalidResp, isSuccessResp, headers} from "../modules/ajax-request.js";
	import { api, fileApiV2 } from '../modules/api-url.js';
	import {lengthInput, btnSubmit, giftName, contentImage, price, rdoManual, selectGiftName, goodsCode,
		modalOpen, modalClose, modalBackdrop, keyword, dataTable, btnSearch, ktImageUrl,} from '../modules/elements.js';
	import { sweetConfirm, sweetToast, sweetToastAndCallback } from  '../modules/alert.js';
	import {onChangeValidateImage, limitInputLength, fadeoutModal, fadeinModal, onErrorImage, emptyFile} from "../modules/common.js";
	import {initInputNumber, isEmpty} from "../modules/utils.js";
	import { label } from "../modules/label.js";
	import { message } from "../modules/message.js";
	import { page } from "../modules/page-url.js";
	import {initTableDefaultConfig} from "../modules/tables.js";

	$( () => {
		/** dataTable default config **/
		initTableDefaultConfig();
		/** 이벤트 **/
		modalOpen		.on("click", function () { onClickModalOpen(); });
		modalClose		.on("click", function () { fadeoutModal(); });
		modalBackdrop	.on("click", function () { fadeoutModal(); });
		price.on("propertychange change keyup paste input", function () { initInputNumber(this); });
		lengthInput.on("propertychange change keyup paste input", function () { limitInputLength(this); });
		contentImage.on('change', function () { onChangeValidateImage(this); });
		rdoManual.on('change', function () { onChangeRdoManual(this); });
		btnSearch.on('click', function () { buildKtGoods(); });
		btnSubmit.on('click', function () { onSubmitGift(); });
	});

	function onChangeRdoManual(obj)
	{
		const isManual = $(obj).val() === 'Y';
		if (isManual)
		{
			giftName.parent().show();
			selectGiftName.parent().hide();
			giftName.trigger('focus');
		}
		else
		{
			selectGiftName.parent().show();
			giftName.parent().hide();
		}

		emptyFile(contentImage);
		giftName.val('');
		selectGiftName.val('');
		goodsCode.val('');
		ktImageUrl.val('');
	}

	function onClickModalOpen()
	{
		fadeinModal();
		keyword.val('');
		buildKtGoods();
	}

	function buildKtGoods()
	{
		dataTable.DataTable({
			ajax : {
				url: api.ktGoodsList,
				type:"POST",
				global: false,
				headers: headers,
				dataFilter: function(data){
					let json = JSON.parse(data);
					if (isSuccessResp(json))
					{
						json.recordsTotal = json.count;
						json.recordsFiltered = json.count;
					}
					else
					{
						json.data = [];
						sweetToast(invalidResp(json));
					}

					return JSON.stringify(json);
				},
				data: function (d) {
					const param = {
						"limit" : d.length
						,"page" : (d.start / d.length) + 1
						,"keyword" : keyword.val().trim()
						,"search_type" : "goods_name",
					}

					return JSON.stringify(param);
				},
				error: function (request, status) {
					sweetError(label.list+message.ajaxLoadError);
				}
			},
			columns: [
				{title: "상품코드",    		data: "goods_code",  		width: "25%" }
				,{title: "상품명",    		data: "goods_name",  		width: "25%" }
				,{title: "브랜드명",    		data: "brand_name",  		width: "20%" }
				,{title: "판매종료일시",    	data: "end_date",  			width: "20%" }
				,{title: "이미지", 			data: "goods_img_b",		width: "10%",
					render: function (data, type, row, meta) {
						return `<div class="list-img-wrap"><img src="${data}" alt=""></div>`;
					}
				}
			],
			serverSide: true,
			paging: true,
			pageLength: 5,
			select: false,
			destroy: true,
			initComplete: function () {
				onErrorImage();
			},
			fnRowCallback: function( nRow, aData ) {
				$(nRow).attr('data-code', aData.goods_code);
				$(nRow).attr('data-url', aData.goods_img_b);
				$(nRow).attr('data-name', `[${aData.brand_name}] ${aData.goods_name}`);
				$(nRow).on('click', function () { onSelectGoods(this); })
			}
		});
	}

	function onSelectGoods(obj)
	{
		selectGiftName.val($(obj).data('name'));
		goodsCode.val($(obj).data('code'));
		ktImageUrl.val($(obj).data('url'));
		buildThumbnail($(obj).data('url'));
		fadeoutModal();
	}

	function buildThumbnail(url)
	{
		emptyFile(contentImage);
		contentImage.parent().siblings('.detail-img-wrap').remove();
		const thumbnailEl = `<div class="detail-img-wrap"><img src="${url}" alt=""></div>`;
		contentImage.parent().after(thumbnailEl);
	}

	function onSubmitGift()
	{
		if (validation())
		{
			const imageFile = contentImage[0].files;
			const requestFn = imageFile.length === 0 ? createRequest : fileUploadReq;
			sweetConfirm(message.create, requestFn);
		}
	}

	function fileUploadReq()
	{
		let param  = new FormData();
		param.append('file', contentImage[0].files[0]);

		ajaxRequestWithFile(true, fileApiV2.single, param)
			.then( async function( data, textStatus, jqXHR ) {
				await isSuccessResp(data) ? createRequest(data) : sweetToast(invalidResp(data));
			})
			.catch(reject => sweetToast(`이미지 등록${message.ajaxError}`));
	}

	function createRequest(data)
	{
		if (isEmpty(data) || isSuccessResp(data))
		{
			const isManual = $("input[name=radio-manual]:checked").val() === 'Y';
			const param = {
				"gift_name" : isManual ? giftName.val().trim() : selectGiftName.val().trim(),
				"gift_ucd" : price.val().trim(),
				"is_exposure" : $("input[name=radio-exposure]:checked").val(),
			}

			if (!isEmpty(data))
				param["gift_image_url"] = data.image_urls.file;

			if (!isManual)
			{
				param["goods_code"] = goodsCode.val().trim();
				param["kt_gift_image_url"] = ktImageUrl.val().trim();
			}

			ajaxRequestWithJson(true, api.createGift, JSON.stringify(param))
				.then( async function( data, textStatus, jqXHR ) {
					await sweetToastAndCallback(data, createSuccess);
				})
				.catch(reject => sweetToast(label.detailContent + message.ajaxLoadError));
		}
		else
			sweetToast(data.msg);
	}

	function createSuccess()
	{
		location.href = page.listGift;
	}

	function validation()
	{
		const isManual = $("input[name=radio-manual]:checked").val() === 'Y';
		if (isManual && isEmpty(giftName.val()))
		{
			sweetToast(`상품명은 ${message.required}`);
			giftName.trigger('focus');
			return false;
		}

		if (!isManual && isEmpty(selectGiftName.val()))
		{
			sweetToast(`상품명은 ${message.required}`);
			selectGiftName.trigger('focus');
			return false;
		}

		if (isEmpty(price.val()))
		{
			sweetToast(`금액은 ${message.required}`);
			price.trigger('focus');
			return false;
		}


		const contentImg = contentImage[0].files;
		if (isManual && contentImg.length === 0)
		{
			sweetToast(`상품 이미지는 ${message.required}`);
			return false;
		}

		return true;
	}
