
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

	function stringFormatToDate(_date, _format)
	{
		let yyyy 	= _date.getFullYear().toString();
		let mm 		= (_date.getMonth() + 1).toString();
		let dd 		= _date.getDate().toString();
		
		try {
			
		} catch (e) {
			 
		}
		
		return yyyy + _format + (mm[1] ? mm : "0" + mm[0]) + _format + (dd[1] ? dd : "0" + dd[0]);
	}
	
	function isMobile()
	{
		let filter = "win16|win32|win64|mac|macintel";
		
		if (filter.indexOf(navigator.platform.toLowerCase()) < 0) 
			return true;
		else
			return false;
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

			(value.trim() === '')
		)
	}
	
	function numberWithCommas(x)
	{
	    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}
	
	function isImage(obj)
	{
		let file = obj.files[0];
		if (file)
		{
			let fileType 	= file["type"];
			let imageTypes 	= ["image/jpeg", "image/png"];

			if ($.inArray(fileType, imageTypes) >= 0)
				return true;
		}
	}
	
	function isVideo(obj)
	{
		let file = obj.files[0];
		if (file)
		{
			let fileType 	= file["type"];
			let videoTypes 	= ["video/quicktime", "video/mp4"];

			if ($.inArray(fileType, videoTypes) >= 0)
				return true;
		}
	}
	
	function isAudio(obj)
	{
		let file = obj.files[0];
		if (file)
		{
			let fileType = file["type"];
			let audioTypes = ["audio/x-m4a", "audio/vnd.dlna.adts"];

			if ($.inArray(fileType, audioTypes) >= 0)
				return true;
		}
	}

	/** 인풋 숫자만 입력 가능 **/
	function initInputNumber(obj)
	{
		$('.only-num').on('propertychange change keyup paste input', function (e) {

	    	if (!isNumber($(obj).val()))
	    	{
	    		$(obj).val('');
	    	}
	    });
	}
	
	function isNumber(param)
	{
		let regex = /^[1-9]{1}[0-9]*$/g;
		return regex.test(param);
	}

	function replaceAll(str, searchStr, replaceStr)
	{
		return str.split(searchStr).join(replaceStr);
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

	/** 문자열을 split해서 마지막 배열 요소를 반환하는 함수 **/
	function splitReverse(str, separator)
	{
		return str.split(separator).reverse()[0];
	}

	function getPathName()
	{
		return window.location.pathname;
	}




