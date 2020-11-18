
	let excelHandler = {
		fileName : "sample.xlsx",
		sheetName : "Sheet1",
		jsonData : []
	}

	function exportExcel()
	{
		/** workbook 생성 **/
		let wb = XLSX.utils.book_new();
		/** sheet 생성 **/
		let sheet = XLSX.utils.json_to_sheet(excelHandler.jsonData);
		/** 생성된 workbook에 sheet 붙이기 **/
		XLSX.utils.book_append_sheet(wb, sheet, excelHandler.sheetName);
		/** 파일 내보내기 **/
		XLSX.writeFile(wb, excelHandler.fileName);
	}

	function setExcelData(_fileName, _sheetName, _data)
	{
		if (!isEmpty(_fileName))
			excelHandler.fileName = `${_fileName}.xlsx`;
		if (!isEmpty(_sheetName))
			excelHandler.sheetName = _sheetName;
		if (!isEmpty(_data))
			excelHandler.jsonData = _data;

		exportExcel();
	}

	function readExcelData(obj, callback)
	{
		let result = [];
		let reader = new FileReader();
		reader.onload = function(e) {
			let readData = []
			let data = new Uint8Array(reader.result);
			let workbook = XLSX.read(data, {type: 'array'});

			workbook.SheetNames.map( (name, index) => {
				readData.push(...XLSX.utils.sheet_to_json(workbook.Sheets[name], { header : 1 }))
			})

			readData.map( (value) => {
				result.push(value[0])
			})

			callback(result);
		};
		reader.readAsArrayBuffer(obj.files[0]);
	}

	const xlsxName = {
		doitList : '두잇목록',
		giftApply : '상품 신청 내역',
		promoDoit : '개설 두잇',
		promoUcd : 'UCD 정보',
	}