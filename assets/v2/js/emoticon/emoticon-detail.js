
	import { ajaxRequestWithJson, isSuccessResp } from '../modules/ajax-request.js'
	import { api } from '../modules/api-url.js';
	import {
		btnBack,
		btnList,
		isExposure,
		categoryId,
		categoryImage,
		categoryImageOff,
		categoryImageOn,
		createDate,
		emoticonTitle,
		emoticonType,
		emoticonWrap,
		categoryImageName, categoryImageOnName, categoryImageOffName
	} from '../modules/elements.js';
	import {sweetToast, sweetError} from '../modules/alert.js';
	import { historyBack, onErrorImage} from "../modules/common.js";
	import { getPathName, splitReverse, isEmpty } from "../modules/utils.js";
	import { label } from "../modules/label.js";
	import { message } from "../modules/message.js";
	import { page } from "../modules/page-url.js";

	const pathName = getPathName();
	const emoticonCategoryId = splitReverse(pathName, '/');

	$( () => {
		/** 상세 불러오기 **/
		getDetail();
		/** 이벤트 **/
		btnBack	 .on('click', function () { historyBack(); });
		btnList	 .on('click', function () { goListPage(); });
	});

	function getDetail()
	{
		ajaxRequestWithJson(true, `${api.detailEmoticon}/${emoticonCategoryId}`, null)
			.then( async function( data, textStatus, jqXHR ) {
				isSuccessResp(data) ? buildDetail(data) : sweetToast(invalidResp(data));
			})
			.catch(reject => sweetError(label.detailContent + message.ajaxLoadError));
	}

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
			is_exposure,
			created
		} = data.data;

		categoryId.text(category_id);
		createDate.text(created.slice(0, 10));
		emoticonTitle.text(category_title);
		emoticonType.text(category_type === 'dynamic' ? '움직이는 이모티콘' : '멈춰있는 이모티콘');
		categoryImage.attr('src', category_image_url);
		categoryImageName.text(getFileName(category_image_url));
		categoryImageOn.attr('src', category_icon_on_url);
		categoryImageOff.attr('src', category_icon_off_url);
		categoryImageOnName.text(getFileName(category_icon_on_url));
		categoryImageOffName.text(getFileName(category_icon_off_url));
		if (!isEmpty(emoticon) &&  emoticon.length > 0)
		{
			emoticon.map((obj, index) => {
				const {emoticon_file_url, emoticon_thumb_url, emoticon_id} = obj;
				const emoticonElement =
					`<li>
						<p class="list-num">${Number(emoticon_id) > 9 ? Number(emoticon_id) : `0${Number(emoticon_id)}`}</p>
						<div class="flex-wrap">
							<div>
								<img class="design_comm_view" src="${emoticon_thumb_url}" alt="이미지 미리보기">
								<div class="file-name">${getFileName(emoticon_thumb_url)}</div>
							</div>
							<div>
								<img class="design_comm_view" src="${emoticon_file_url}" alt="이미지 미리보기">
								<div class="file-name">${getFileName(emoticon_file_url)}</div>
							</div>
						</div>
					</li>`

				emoticonWrap.append(emoticonElement);
			})
		}
		isExposure.text(is_exposure);
		onErrorImage();
	}

	function goListPage()
	{
		location.href = page.listEmoticon;
	}

	function getFileName(url)
	{
		return isEmpty(url) || isEmpty(url.split('/').reverse()[0]) ? label.dash : url.split('/').reverse()[0];
	}

