
	import {
		isSuccessResp,
		invalidResp,
		ajaxRequestWithJson,
		ajaxRequestWithFile
	} from '../modules/ajax-request.js';
	import {api, fileApiV2} from '../modules/api-url.js';
	import {
		btnSubmit, createDate, lengthInput, btnAdd,
		selType, categoryImage, categoryImageOn, categoryImageOff, emoticonTitle, emoticonWrap
	} from '../modules/elements.js';
	import {sweetConfirm, sweetError, sweetToast, sweetToastAndCallback} from '../modules/alert.js';
	import {limitInputLength} from "../modules/common.js";
	import {getStringFormatToDate, isEmpty} from '../modules/utils.js'
	import { label } from "../modules/label.js";
	import { message } from "../modules/message.js";
	import {page} from "../modules/page-url.js";

	$( () => {
		initPage();
		/** 이벤트 **/
		lengthInput.on("propertychange change keyup paste input", function () { limitInputLength(this); });
		btnSubmit.on('click', function () { onSubmitEmoticon(); });
		categoryImage.on('change', function () { onChangeImage(this); });
		categoryImageOn.on('change', function () { onChangeImage(this); });
		categoryImageOff.on('change', function () { onChangeImage(this); });
		btnAdd.children().on('click', function () { onClickBtnAdd(this); });
		selType.on('change', function () { onChangeSelType(); });
	});

	function initPage()
	{
		createDate.text(getStringFormatToDate(new Date(), '-'));
	}

	function onChangeSelType()
	{
		emoticonWrap.empty();
		const acceptType = selType.val() === 'dynamic' ? 'image/webp' : 'image/png';
		const element =
			`<li>
				<p class="list-num">01</p>
				<i class="fas fa-times"></i>
				<div class="flex-wrap">
					<div>
						<div class="emoticon-file-upload upload_design">
							<div class="design_comm"></div>
							<div class="hover-content">
								<label class="btn_upload" for="thumbnail_1">찾아보기<button type="button" class="inp_file"></button></label>
								<input type="file"
										class="emoticon-file-input" 
									   	id="thumbnail_1"
									   	name="emoticon_thumb_url.1"
									   	style="display: none;"
									   	accept="image/png"
									   	data-width="360" data-height="360"/>
							</div>
						</div>
						<div class="file-name" data-text="썸네일 이미지">썸네일 이미지</div>
					</div>
					<div>
						<div class="emoticon-file-upload upload_design">
							<div class="design_comm"></div>
							<div class="hover-content">
								<label class="btn_upload" for="emoticon_1">찾아보기<button type="button" class="inp_file"></button></label>
								<input type="file"
										class="emoticon-file-input" 
									   	id="emoticon_1"
									   	name="emoticon_file_url.1"
									   	style="display: none;"
									   	accept="${acceptType}"
									   	data-width="360" data-height="360"/>
							</div>
						</div>
						<div class="file-name" data-text="이모티콘 이미지">이모티콘 이미지</div>
					</div>
				</div>
			</li>`

		emoticonWrap.html(element);

		$('.emoticon-file-input').off().on('change', function () { onChangeImage(this); });
	}

	function onClickBtnAdd(obj)
	{
		const increase = $(obj).data('increase');
		const exist = emoticonWrap.children().length;
		const maxAddCount = 24;

		if ((exist + Number(increase)) > maxAddCount)
		{
			sweetToast(message.maxAddEmoticon);
			return;
		}

		const acceptType = selType.val() === 'dynamic' ? 'image/webp' : 'image/png';
		for (let i=0; i<Number(increase); i++)
		{
			const elementNum = exist + (i + 1);
			const element =
				`<li>
					<p class="list-num">${elementNum > 9 ? elementNum : `0${elementNum}`}</p>
					<i class="fas fa-times btn-delete"></i>
					<div class="flex-wrap">
						<div>
							<div class="emoticon-file-upload upload_design">
								<div class="design_comm"></div>
								<div class="hover-content">
									<label class="btn_upload" for="thumbnail_${elementNum}">찾아보기<button type="button" class="inp_file"></button></label>
									<input type="file" 
											class="emoticon-file-input" 
											id="thumbnail_${elementNum}" 
											name="emoticon_thumb_url.${elementNum}" 
											style="display: none;" 
											accept="image/png" 
											data-width="360" data-height="360"/>
								</div>	
							</div>
							<div class="file-name" data-text="썸네일 이미지">썸네일 이미지</div>
						</div>
						<div>
							<div class="emoticon-file-upload upload_design">
								<div class="design_comm"></div>
								<div class="hover-content">
									<label class="btn_upload" for="emoticon_${elementNum}">찾아보기<button type="button" class="inp_file"></button></label>
									<input type="file" 
											class="emoticon-file-input" 
											id="emoticon_${elementNum}" 
											name="emoticon_file_url.${elementNum}"
											style="display: none;"
											accept="${acceptType}" 
											data-width="360" data-height="360"/>
								</div>
							</div>
							<div class="file-name" data-text="이모티콘 이미지">이모티콘 이미지</div>
						</div>
					</div>
				</li>`;

			emoticonWrap.append(element);
		}

		$('.emoticon-file-input').off().on('change', function () { onChangeImage(this); });
		$('.btn-delete').off().on('click', function () { onClickBtnDelete(this); });
	}

	function onClickBtnDelete(obj)
	{
		$(obj).parent().remove();
		emoticonWrap.children().each(function (index) {
			const listNumber = index + 1;
			$(this).children('.list-num').text(`${listNumber > 9 ? listNumber : `0${listNumber}`}`);
		})
	}

	function onSubmitEmoticon()
	{
		if (validation())
		{
			let fileLength = 0;
			$('input[type=file]').each(function () {
				fileLength += $(this)[0].files.length;
			})

			const callback = fileLength > 0 ? fileUploadReq : createRequest;
			sweetConfirm(message.create, callback);
		}
	}

	function validation()
	{
		if (isEmpty(emoticonTitle.val()))
		{
			sweetToast(`제목은 ${message.required}`);
			emoticonTitle.trigger('focus');
			return false;
		}

		return true;
	}

	function fileUploadReq()
	{
		let param  = new FormData();
		param.append('category', categoryImage[0].files[0]);
		param.append('category_on', categoryImageOn[0].files[0]);
		param.append('category_off', categoryImageOff[0].files[0]);
		emoticonWrap.find('input').each(function () {
			if ($(this)[0].files.length > 0)
				param.append($(this).attr('name'), $(this)[0].files[0]);
		})

		ajaxRequestWithFile(true, fileApiV2.emoticon, param)
			.then( async function( data, textStatus, jqXHR ) {
				isSuccessResp(data) ? createRequest(data) : sweetToast(invalidResp(data));
			})
			.catch(reject => sweetError(`이미지 등록${message.ajaxError}`));
	}

	function createRequest(data)
	{
		const param = {
			"category_type" : selType.val(),
			"category_title" : emoticonTitle.val().trim(),
		}

		if (!isEmpty(data))
		{
			if (data.results.emoticon && data.results.emoticon.length > 0)
			{
				data.results.emoticon.map(obj => delete obj.group_id);

				Object.assign(param, data.results);
			}
		}

		ajaxRequestWithJson(true, api.createEmoticon, JSON.stringify(param))
			.then( async function( data, textStatus, jqXHR ) {
				await sweetToastAndCallback(data, createSuccess);
			})
			.catch(reject => sweetError(label.submit + message.ajaxError));
	}

	function createSuccess()
	{
		location.href = page.listEmoticon;
	}

	function onChangeImage(obj)
	{
		if (obj.files[0])
		{
			const accept = $(obj).attr('accept');
			const fileType = obj.files[0].type;

			if (accept !== fileType)
			{
				sweetToast(message.invalidFile);
				emptyFile(obj);
				return;
			}

			const img = new Image();
			img.src = window.URL.createObjectURL(obj.files[0]);
			img.onload = function() {
				const requiredWidth = isEmpty($(obj).data('width')) ? 0 : Number($(obj).data('width'));
				const requiredHeight = isEmpty($(obj).data('height')) ? 0 : Number($(obj).data('height'));
				const infoMessage = `업로드 가능한 이미지 사이즈를 확인해주세요.<br>
                                         선택한 이미지 사이즈: ${this.width} x ${this.height}<br>
                                         업로드 가능한 이미지 사이즈: ${requiredWidth} x ${requiredHeight}<br>`;

				if (this.width !== requiredWidth || this.height !== requiredHeight)
				{
					sweetError(infoMessage);
					emptyFile(obj);
					return;
				}

				setPreview(obj);
				setFileName(obj);
			}
		}
		else
			emptyFile(obj);
	}

	function setPreview(obj)
	{
		let reader = new FileReader();
		reader.readAsDataURL(obj.files[0]);

		reader.onload = function() {
			const imgElement = `<img src="${reader.result}" alt="이미지"/>`
			$(obj).parent().siblings('.design_comm').html(imgElement);
		}
	}

	function setFileName(obj)
	{
		$(obj).parent().parent().siblings('.file-name').text(obj.files[0].name);
	}

	function emptyFile(obj)
	{
		const nameTarget = $(obj).parent().parent().siblings('.file-name');
		$(nameTarget).text($(nameTarget).data('text'));
		$(obj).parent().siblings('.design_comm').empty();
		$(obj).val(null);
	}
