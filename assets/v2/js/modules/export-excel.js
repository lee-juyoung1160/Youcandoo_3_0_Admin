
	let excelHandler = {
		fileName : "sample.xlsx",
		sheetName : "Sheet1",
		jsonData : []
	}

	export function exportExcel()
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

	export function setExcelData(_fileName, _sheetName, _data)
	{
		if (!isEmpty(_fileName))
			excelHandler.fileName = `${_fileName}.xlsx`;
		if (!isEmpty(_sheetName))
			excelHandler.sheetName = _sheetName;
		if (!isEmpty(_data))
			excelHandler.jsonData = _data;

		exportExcel();
	}

	export function readExcelData(obj, callback)
	{
		let reader = new FileReader();
		reader.onload = function(e) {

			const data = new Uint8Array(reader.result);
			const workbook = XLSX.read(data, {type: 'array'});

			let readData = []
			workbook.SheetNames.map( name => readData.push(...XLSX.utils.sheet_to_json(workbook.Sheets[name], { header : 1 })) )

			let callbackArgs = [];
			readData.map( value => callbackArgs.push(value[0]) )

			callback(callbackArgs);
		};
		reader.readAsArrayBuffer(obj.files[0]);
	}