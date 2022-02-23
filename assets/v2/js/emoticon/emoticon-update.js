
	import {ajaxRequestWithFile, ajaxRequestWithJson, invalidResp, isSuccessResp} from '../modules/ajax-request.js'
	import {api, fileApiV2} from '../modules/api-url.js';
	import {
		categoryId,
		categoryImage,
		categoryImageOff,
		categoryImageOn,
		createDate,
		emoticonTitle,
		emoticonWrap,
		categoryImageName, categoryImageOnName, categoryImageOffName, lengthInput, btnSubmit, btnAdd, emoticonType
	} from '../modules/elements.js';
	import {
		sweetToast,
		sweetError,
		sweetConfirm,
		sweetToastAndCallback,
		sweetConfirmWithoutCancel
	} from '../modules/alert.js';
	import {limitInputLength, onErrorImage, calculateInputLength} from "../modules/common.js";
	import { getPathName, splitReverse, isEmpty } from "../modules/utils.js";
	import { label } from "../modules/label.js";
	import { message } from "../modules/message.js";
	import { page } from "../modules/page-url.js";

	const pathName = getPathName();
	const emoticonCategoryId = splitReverse(pathName, '/');
	let storedEmoticons = [];
	let storedCategoryImage;
	let storedCategoryImageName = '이모티콘 대표 이미지';
	let storedCategoryOnImage;
	let storedCategoryOnImageName = '아이콘 클릭 시 (컬러)';
	let storedCategoryOffImage;
	let storedCategoryOffImageName = '아이콘 클릭 시 (흑백)';

	$( () => {
		/** 상세 불러오기 **/
		getDetail();
		/** 이벤트 **/
		lengthInput.on("propertychange change keyup paste input", function () { limitInputLength(this); });
		btnSubmit.on('click', function () { onSubmitUpdateEmoticon(); });
		categoryImage.on('change', function () { onChangeImage(this); });
		categoryImageOn.on('change', function () { onChangeImage(this); });
		categoryImageOff.on('change', function () { onChangeImage(this); });
		btnAdd.children().on('click', function () { onClickBtnAdd(this); });
	});

	function getDetail()
	{
		ajaxRequestWithJson(true, `${api.detailEmoticon}/${emoticonCategoryId}`, null)
			.then( async function( data, textStatus, jqXHR ) {
				isSuccessResp(data) ? buildDetail(data) : sweetToast(invalidResp(data));
			})
			.catch(reject => sweetError(label.detailContent + message.ajaxLoadError));
	}

	let g_emoticon_type;
	function buildDetail(data)
	{
		const {
			category_id,
			category_title,
			category_type,
			category_image_url,
			category_icon_on_url,
			category_icon_off_url,
			emoticon,
			created,
			is_exposure,
		} = data.data;

		if (is_exposure === 'Y')
			sweetConfirmWithoutCancel('오픈 된 이모티콘은 수정할 수 없습니다. 상세 페이지로 이동합니다.', updateSuccess);

		categoryId.text(category_id);
		createDate.text(created.slice(0, 10));
		emoticonTitle.val(category_title);
		emoticonType.text(category_type === 'dynamic' ? '움직이는 이모티콘' : '멈춰있는 이모티콘');
		g_emoticon_type = category_type;

		if (!isEmpty(category_image_url))
		{
			storedCategoryImage = category_image_url;
			storedCategoryImageName = getFileName(category_image_url);
		}
		if (!isEmpty(category_icon_on_url))
		{
			storedCategoryOnImage = category_icon_on_url;
			storedCategoryOnImageName = getFileName(category_icon_on_url);
		}
		if (!isEmpty(category_icon_off_url))
		{
			storedCategoryOffImage = category_icon_off_url;
			storedCategoryOffImageName = getFileName(category_icon_off_url);
		}
		categoryImage.parent().siblings('.design_comm').html(isEmpty(storedCategoryImage) ? '' : `<img src="${storedCategoryImage}" alt="대표 이미지"/>`);
		categoryImageName.text(storedCategoryImageName);
		categoryImageOn.parent().siblings('.design_comm').html(isEmpty(storedCategoryOnImage) ? '' : `<img src="${storedCategoryOnImage}" alt="카테고리 이미지 온"/>`);
		categoryImageOnName.text(storedCategoryOnImageName);
		categoryImageOff.parent().siblings('.design_comm').html(isEmpty(storedCategoryOffImage) ? '' : `<img src="${storedCategoryOffImage}" alt="카테고리 이미지 오프"/>`);
		categoryImageOffName.text(storedCategoryOffImageName);

		if (!isEmpty(emoticon) &&  emoticon.length > 0)
		{
			storedEmoticons = emoticon;
			const acceptType = g_emoticon_type === 'dynamic' ? 'image/webp' : 'image/png';
			const lastId = emoticon[emoticon.length - 1].emoticon_id;
			for (let i=0; i<Number(lastId); i++)
			{
				const elementNum = i + 1;
				const storedEmoticon = getStoredEmoticon(elementNum);
				const thumbnailElement = storedEmoticon.length > 0 ? `<img src="${storedEmoticon[0].emoticon_thumb_url}" alt="이모티콘 썸네일"/>` : '';
				const fileElement = storedEmoticon.length > 0 ? `<img src="${storedEmoticon[0].emoticon_file_url}" alt="이모티콘 파일"/>` : '';
				const thumbnailName = storedEmoticon.length > 0 ? getFileName(storedEmoticon[0].emoticon_thumb_url) : label.dash;
				const fileName = storedEmoticon.length > 0 ? getFileName(storedEmoticon[0].emoticon_file_url) : label.dash;
				const emoticonElement =
					`<li>
						<p class="list-num">${elementNum > 9 ? elementNum : `0${elementNum}`}</p>
						<div class="flex-wrap">
							<div>
								<div class="emoticon-file-upload upload_design">
									<div class="design_comm">${thumbnailElement}</div>
									<div class="hover-content">
										<label class="btn_upload" for="thumbnail_${elementNum}">변경하기<button type="button" class="inp_file"></button></label>
										<input type="file"
												class="emoticon-file-input"
												id="thumbnail_${elementNum}"
												name="emoticon_thumb_url.${elementNum}" 
												style="display: none;"
												accept="image/png"
												data-width="360" data-height="360"/>
									</div>
								</div>
								<div class="file-name">${thumbnailName}</div>
							</div>
							<div>
								<div class="emoticon-file-upload upload_design">
									<div class="design_comm">${fileElement}</div>
									<div class="hover-content">
										<label class="btn_upload" for="emoticon_${elementNum}">변경하기<button type="button" class="inp_file"></button></label>
										<input type="file"
												class="emoticon-file-input"
												id="emoticon_${elementNum}"
												name="emoticon_file_url.${elementNum}"
												style="display: none;"
												accept="${acceptType}"
												data-width="360" data-height="360"/>
									</div>
								</div>
								<div class="file-name">${fileName}</div>
							</div>
						</div>
					</li>`

				emoticonWrap.append(emoticonElement);
			}
		}

		$('.emoticon-file-input').off().on('change', function () { onChangeImage(this); });
		onErrorImage();
		calculateInputLength();
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

		const acceptType = g_emoticon_type === 'dynamic' ? 'image/webp' : 'image/png'
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

	function onSubmitUpdateEmoticon()
	{
		if (validation())
		{
			let fileLength = 0;
			$('input[type=file]').each(function () {
				fileLength += $(this)[0].files.length;
			})

			const callback = fileLength > 0 ? fileUploadReq : createRequest;
			sweetConfirm(message.modify, callback);
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
			"category_id" : categoryId.text().trim(),
			"category_type" : g_emoticon_type,
			"category_title" : emoticonTitle.val().trim(),
		}

		if (!isEmpty(data))
		{
			if (data.results.emoticon && data.results.emoticon.length > 0)
			{
				let storedEmoticonIds = [];
				let lastId = 0;
				if (storedEmoticons.length > 0)
				{
					storedEmoticons.map(storedEmoticon => storedEmoticonIds.push(storedEmoticon.emoticon_id));
					lastId = Number(storedEmoticons[storedEmoticons.length - 1].emoticon_id);
				}

				data.results.emoticon.map(obj => {
					storedEmoticonIds.indexOf(obj.group_id) > -1 ? obj.emoticon_id = Number(obj.group_id) : obj.emoticon_id = ++lastId;

					delete obj.group_id;
				});

				Object.assign(param, data.results);
			}
		}

		ajaxRequestWithJson(true, api.updateEmoticon, JSON.stringify(param))
			.then( async function( data, textStatus, jqXHR ) {
				await sweetToastAndCallback(data, updateSuccess);
			})
			.catch(reject => sweetError(label.modify + message.ajaxError));
	}

	function updateSuccess()
	{
		location.href = page.detailEmoticon + emoticonCategoryId;
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
		const elementId = obj.id;
		let imageElement = '';
		let imageName = '';
		switch (elementId) {
			case 'categoryImage' :
				imageElement = isEmpty(storedCategoryImage) ? '' : `<img src="${storedCategoryImage}" alt="이미지"/>`;
				imageName = storedCategoryImageName;
				break;
			case 'categoryImageOn' :
				imageElement = isEmpty(storedCategoryOnImage) ? '' : `<img src="${storedCategoryOnImage}" alt="이미지"/>`;
				imageName = storedCategoryOnImageName;
				break;
			case 'categoryImageOff' :
				imageElement = isEmpty(storedCategoryOffImage) ? '' : `<img src="${storedCategoryOffImage}" alt="이미지"/>`;
				imageName = storedCategoryOffImageName;
				break;
			default :
				const elementNum = elementId.split('_')[1];
				const storedEmoticon = getStoredEmoticon(elementNum);
				if (elementId.includes('thumbnail'))
				{
					imageElement = isEmpty(storedEmoticon) || isEmpty(storedEmoticon[0].emoticon_thumb_url) ? '' : `<img src="${storedEmoticon[0].emoticon_thumb_url}" alt="이미지"/>`;
					imageName = isEmpty(storedEmoticon) ? '썸네일 이미지' : getFileName(storedEmoticon[0].emoticon_thumb_url);
				}
				else
				{
					imageElement = isEmpty(storedEmoticon) || isEmpty(storedEmoticon[0].emoticon_file_url) ? '' : `<img src="${storedEmoticon[0].emoticon_file_url}" alt="이미지"/>`;
					imageName = isEmpty(storedEmoticon) ? '이모티콘 이미지' : getFileName(storedEmoticon[0].emoticon_file_url);
				}
		}
		$(obj).parent().siblings('.design_comm').html(imageElement);
		$(nameTarget).text(imageName);
		$(obj).val(null);
	}

	function getFileName(url)
	{
		return isEmpty(url) || isEmpty(url.split('/').reverse()[0]) ? label.dash : url.split('/').reverse()[0];
	}

	function getStoredEmoticon(elementNum)
	{
		return storedEmoticons.filter(emoticon => Number(elementNum) === Number(emoticon.emoticon_id))
	}