
	let excelHandler = {
		fileName : "통합 문서1"
		,sheetName : "Sheet1"
		,excelData : []
		,getFileName : function() {
			return this.fileName + ".xlsx";
		}
		,getSheetName : function() {
			return this.sheetName;
		}
		,getData : function() {
			return this.excelData;
		}
		,getWorksheet : function() {
			return XLSX.utils.json_to_sheet(this.getData());
		}
	}

	function exportExcel()
	{
		let wb;
		let sheet;
		let exportWorkbook;

		/** workbook 생성 **/
		wb = XLSX.utils.book_new();
		/** sheet 생성 **/
		sheet = excelHandler.getWorksheet();
		/** 생성된 workbook에 sheet 붙이기 **/
		XLSX.utils.book_append_sheet(wb, sheet, excelHandler.getSheetName());
		/** 파일 만들기 **/
		exportWorkbook = XLSX.write(wb, {bookType:'xlsx',  type: 'binary'});
		/** 파일 내보내기 **/
		saveAs(
			new Blob([s2ab(exportWorkbook)],{type:"application/octet-stream"}), excelHandler.getFileName()
		);
	}

	function s2ab(s)
	{
		/** convert s to arrayBuffer **/
		let buffer = new ArrayBuffer(s.length);
		/** create uint8array as viewer **/
		let view = new Uint8Array(buffer);
		/** convert to octet **/
		for (let i=0; i<s.length; i++)
			view[i] = s.charCodeAt(i) & 0xFF;

		return buffer;
	}

	function setExcelData(_fileName, _sheetName, data)
	{
		if (!isEmpty(_fileName)) excelHandler.fileName = _fileName;
		if (!isEmpty(_sheetName)) excelHandler.sheetName = _sheetName;
		if (!isEmpty(data))
		{
			excelHandler.excelData = data;
		}
		exportExcel();
	}

	function readExcelData(event)
	{
		let input = event.target;
		let reader = new FileReader();

		reader.onload = () => {

			let fileData = reader.result;
			let wb = XLSX.read(fileData, {type : 'binary'});

			wb.SheetNames.forEach( (sheet, index) => {
				let rowObj =XLSX.utils.sheet_to_json(wb.Sheets[sheet]);
			})
		};

		reader.readAsBinaryString(input.files[0]);
	}