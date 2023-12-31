
	function chunkArray(array, size)
	{
		const chunked_arr = [];
		let copied = [...array];
		const numOfChild = Math.ceil(copied.length / size);
		for (let i = 0; i < numOfChild; i++) {
			chunked_arr.push(copied.splice(0, size));
		}
		return chunked_arr;
	}

	function convertPhoneNumber(number)
	{
		let phone = "";
		
	    if(number.length < 4) {
	        return number;
	    } else if(number.length < 7) {
	        phone += number.substr(0, 3);
	        phone += "-";
	        phone += number.substr(3);
	    } else if(number.length < 11) {
	        phone += number.substr(0, 3);
	        phone += "-";
	        phone += number.substr(3, 3);
	        phone += "-";
	        phone += number.substr(6);
	    } else {
	        phone += number.substr(0, 3);
	        phone += "-";
	        phone += number.substr(3, 4);
	        phone += "-";
	        phone += number.substr(7);
	    }
	    
	    return phone;
	}

	function convertNumberToKvalue(_value)
	{
		return (_value >= 10000 ? numberWithCommas(_value/1000)+'k' : numberWithCommas(_value))
	}

	function convertLinkToUrl(val)
	{
		let regURL = new RegExp("(http|https|ftp|telnet|news|irc)://([-/.a-zA-Z0-9_~#%$?&=:200-377()]+)","gi");
		return val.replace(regURL,"<a href='$1://$2' target='_blank'>$1://$2</a>");
	}

	function getLastDayNumber(_year, _month)
	{
		return new Date(_year, _month, 0).getDate();
	}

	function getCurrentHours()
	{
		return new Date().getHours();
	}

	function getCurrentMinutes()
	{
		return new Date().getMinutes();
	}

	function getStringFormatToDate(_date, separator)
	{
		let yyyy 	= _date.getFullYear().toString();
		let mm 		= (_date.getMonth() + 1).toString();
		let dd 		= _date.getDate().toString();
		let result  = '';
		try {
			result = yyyy + separator + (mm[1] ? mm : "0" + mm[0]) + separator + (dd[1] ? dd : "0" + dd[0]);
		} catch (e) {
			 
		}
		
		return result;
	}

	function appendZero(_num)
	{
		return Number(_num) < 10 ? _num.toString().padStart(2, '0') : _num;
	}

	function isXlsX(obj)
	{
		if (obj.files[0])
		{
			let file 		= obj.files[0];
			let fileType 	= file["type"];
			let imageTypes 	= ["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"];

			return $.inArray(fileType, imageTypes) >= 0;
		}
	}

	function isMobile()
	{
		let filter = "win16|win32|win64|mac|macintel";
		
		return filter.indexOf(navigator.platform.toLowerCase()) < 0;
	}
	
	function isEmpty(value) 
	{
		return (
			/** null or undefined **/
			(value == null) ||

			/** has length and it's zero **/
			(value.hasOwnProperty('length') && value.length === 0) ||

			/** is an Object and has no keys **/
			(value.constructor === Object && Object.keys(value).length === 0) ||

			(value.constructor === String && value.trim() === '')
		)
	}
	
	function isNegative(value)
	{
		return !(Math.sign(value) !== -1);
	}

	/** 숫자 형식에 , 붙이기 **/
	function numberWithCommas(x)
	{
	    return isEmpty(x) ? 0 : x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}

	function isImage(obj)
	{
		if (obj.files[0])
		{
			let file 		= obj.files[0];
			let fileType 	= file["type"];
			let imageTypes 	= ["image/jpeg", "image/png"];

			return $.inArray(fileType, imageTypes) >= 0;
		}
	}
	
	function isVideo(obj)
	{
		if (obj.files[0])
		{
			let file 		= obj.files[0];
			let fileType 	= file["type"];
			let videoTypes 	= ["video/quicktime", "video/mp4"];

			return $.inArray(fileType, videoTypes) >= 0;
		}
	}
	
	function isAudio(obj)
	{
		if (obj.files[0])
		{
			let file 		= obj.files[0];
			let fileType 	= file["type"];
			let audioTypes 	= ["audio/x-m4a", "audio/vnd.dlna.adts"];

			return $.inArray(fileType, audioTypes) >= 0;
		}
	}

	function isOverFileSize(obj)
	{
		if (obj.files[0])
		{
			let maxSize = 10 * 1024 * 1024;
			return obj.files[0].size >maxSize;
		}
	}

	/** 인풋 숫자만 입력 가능 **/
	function initInputNumber(obj)
	{
		let inputValue = $(obj).val();
		let inputValueArr = inputValue.split("");
		let inputLength = inputValueArr.length;
		let respStr = '';
		for (let i=0; i<inputLength; i++)
		{
			if (inputValueArr[0] == 0 || !isNumber(inputValueArr[0]))
				inputValueArr[0] = '';
			if (isNumber(inputValueArr[i]))
				respStr += inputValueArr[i];
		}

		$(obj).val(respStr);
	}

	function initInputNumberWithZero(obj)
	{
		let inputValue = $(obj).val();
		let inputValueArr = inputValue.split("");
		let inputLength = inputValueArr.length;
		let respStr = '';
		for (let i=0; i<inputLength; i++)
		{
			if (!isNumber(inputValueArr[0]))
				inputValueArr[0] = '';
			if (isNumber(inputValueArr[i]))
				respStr += inputValueArr[i];
		}

		$(obj).val(respStr);
	}
	
	function isNumber(param)
	{
		let regex = /^[0-9]*$/g;
		return regex.test(param);
	}

	function replaceAll(str, searchStr, replaceStr)
	{
		return str.split(searchStr).join(replaceStr);
	}

	function replaceDoubleQuotes(value)
	{
		return isEmpty(value) ? '' : value.split('"').join('&quot;');
	}

	function replaceInputTextarea(value)
	{
		return value.replace(/(?:\r\n|\r|\n)/g, "<br>");
	}

	function replaceSelectTextarea(value)
	{
		return value.split("<br>").join("\r\n");
	}

	function bizNoFormatter(num)
	{
		return num.replace(/(\d{3})(\d{2})(\d{5})/, '$1-$2-$3');
	}

	function isAlphabet(param)
	{
		let regExp = /^[A-Za-z]*$/;

		return regExp.test(param);
	}

	function isEmail(param)
	{
		let regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

		return regExp.test(param);
	}

	function isDomainName(param)
	{
		const regExp = /^(http(s)?\:\/\/)([0-9a-zA-Z\-]+\.)+[a-zA-Z]{2,6}(\:[0-9]+)?(\/\S*)?/;

		return regExp.test(param);
	}

	/** 문자열을 split해서 마지막 배열 요소를 반환하는 함수 **/
	function splitReverse(str, separator)
	{
		return str.split(separator).reverse()[0];
	}

	function getPathName()
	{
		return window.location.pathname;
	}

	function scrollToTarget(target)
	{
		$('html, body').animate({scrollTop : target});
	}




