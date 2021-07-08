
	import {ajaxRequestWithFile, ajaxRequestWithJson, headers, isSuccessResp, invalidResp} from "../modules/ajax-request.js";
	import {api, fileApiV2} from '../modules/api-url.js';
	import {lengthInput, btnSubmit, price, contentImage, giftName, rdoExposure, modalOpen,
		modalClose, modalBackdrop, giftType, selectGiftName, goodsCode, ktImageUrl, keyword, dataTable
	} from '../modules/elements.js';
	import {sweetToast, sweetToastAndCallback, sweetConfirm} from '../modules/alert.js';
	import {calculateInputLength, emptyFile, fadeinModal, fadeoutModal, limitInputLength,
		onChangeValidateImage, onErrorImage} from "../modules/common.js";
	import {getPathName, splitReverse, isEmpty, initInputNumber,} from "../modules/utils.js";
	import { label } from "../modules/label.js";
	import { message } from "../modules/message.js";
	import { page } from "../modules/page-url.js";
	import {initTableDefaultConfig} from "../modules/tables.js";

	const pathName	= getPathName();
	const giftIdx	= splitReverse(pathName, '/');

	$( () => {
		/** dataTable default config **/
		initTableDefaultConfig();
		/** 상세 불러오기 **/
		getDetail();
		/** 이벤트 **/
		modalOpen.on("click", function () { onClickModalOpen(); });
		modalClose.on("click", function () { fadeoutModal(); });
		modalBackdrop.on("click", function () { fadeoutModal(); });
		price.on("propertychange change keyup paste input", function () { initInputNumber(this); });
		lengthInput.on("propertychange change keyup paste input", function () { limitInputLength(this); });
		contentImage.on('change', function () { onChangeValidateImage(this); });
		btnSubmit.on('click', function () { onSubmitUpdateGift(); });
	});

	function getDetail()
	{
		const param = { "idx" : giftIdx }

		ajaxRequestWithJson(true, api.detailGift, JSON.stringify(param))
			.then( async function( data, textStatus, jqXHR ) {
				await isSuccessResp(data) ? buildDetail(data) : sweetToast(invalidResp(data));
			})
			.catch(reject => sweetToast(label.detailContent + message.ajaxLoadError));
	}

	let g_gift_uuid;
	let isManual;
	function buildDetail(data)
	{
		const { gift_uuid, gift_name, gift_ucd, gift_image_url, is_exposure, goods_code } = data.data;
		g_gift_uuid = gift_uuid;
		isManual = isEmpty(goods_code);
		giftType.text(isEmpty(goods_code) ? label.gift : label.gifticon);
		toggleShowGiftNameElement();
		if (isManual)
			giftName.val(gift_name);
		else
		{
			selectGiftName.val(gift_name);
			goodsCode.val(goods_code);
			ktImageUrl.val(gift_image_url);
		}
		price.val(gift_ucd);
		contentImage.parent().after(`<div class="detail-img-wrap"><img src="${gift_image_url}" alt=""></div>`);
		rdoExposure.each(function () {
			$(this).prop('checked', $(this).val() === is_exposure);
		})

		onErrorImage();
		calculateInputLength();
	}

	function onSubmitUpdateGift()
	{
		if (validation())
		{
			const contentImgFile = contentImage[0].files;
			const callback = contentImgFile.length > 0 ? fileUploadReq : updateRequest;

			sweetConfirm(message.modify, callback);
		}
	}

	function fileUploadReq()
	{
		let param  = new FormData();
		param.append('file', contentImage[0].files[0]);

		ajaxRequestWithFile(true, fileApiV2.single, param)
			.then( async function( data, textStatus, jqXHR ) {
				await isSuccessResp(data) ? updateRequest(data) : sweetToast(invalidResp(data));
			})
			.catch(reject => sweetToast(`이미지 등록${message.ajaxError}`));
	}

	function updateRequest(data)
	{
		if (isEmpty(data) || isSuccessResp(data))
		{
			const param = {
				"gift_uuid" : g_gift_uuid,
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

			ajaxRequestWithJson(true, api.updateGift, JSON.stringify(param))
				.then( async function( data, textStatus, jqXHR ) {
					await sweetToastAndCallback(data, updateSuccess);
				})
				.catch(reject => sweetToast(label.modify + message.ajaxError));
		}
		else
			sweetToast(data.msg);
	}

	function updateSuccess()
	{
		location.href = page.detailGift + giftIdx;
	}

	function validation()
	{
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

		return true;
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

	function toggleShowGiftNameElement()
	{
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

		giftName.val('');
		selectGiftName.val('');
		goodsCode.val('');
		ktImageUrl.val('');
	}
