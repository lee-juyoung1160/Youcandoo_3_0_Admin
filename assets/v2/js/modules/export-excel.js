	import {isEmpty} from "./utils.js";
	import {fadeinLoader, fadeoutLoader} from "./common.js"

	let excelHandler = {
		fileName : "sample.xlsx",
		sheetName : "Sheet1",
		jsonData : []
	}

	export function exportExcel()
	{
		try {
			/** workbook 생성 **/
			let wb = XLSX.utils.book_new();
			/** sheet 생성 **/
			let sheet = XLSX.utils.json_to_sheet(excelHandler.jsonData);
			/** 생성된 workbook에 sheet 붙이기 **/
			XLSX.utils.book_append_sheet(wb, sheet, excelHandler.sheetName);
			/** 파일 내보내기 **/
			XLSX.writeFile(wb, excelHandler.fileName);
		} catch (e) {
			console.log(e)
		}
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
		fadeinLoader();
		let reader = new FileReader();
		reader.onload = function(e) {
			const data = reader.result;
		 	const workbook = XLSX.read(data, {type: 'binary'});

			let readData = [];
			try {
				workbook.SheetNames.map( name => {
					const options = {
						header: 1,
						range: 0,
						blankrows: false,
						defval: null,
						raw: true,
					}
					readData.push(...XLSX.utils.sheet_to_json(workbook.Sheets[name], options))
				})
			} catch (e) {
				fadeoutLoader();
			}


			let callbackArgs = [];
			readData.map( value => {
				if (!isEmpty(value[0]))
					callbackArgs.push(value[0])
			})

			callback(callbackArgs);
		}

		reader.readAsBinaryString(obj.files[0]);
	}

	export function onClickImportMemberFormExport()
	{
		const data = [
			{ "PID" : "", "" : "<<<---여기부터"},
			{ "PID" : "", "" : "PID(프로필아이디)를" },
			{ "PID" : "", "" : "이런 방식으로(줄을 바꿔가며)" },
			{ "PID" : "", "" : "채우면 됩니다." },
			{ "PID" : "", "" : "아!" },
			{ "PID" : "", "" : "물론," },
			{ "PID" : "", "" : "첫행부터 채워도" },
			{ "PID" : "", "" : "괜찮아요." }
		];

		setExcelData("회원일괄등록양식", "회원목록", data);
	}

	export function onClickImportDoitFormExport()
	{
		const data = [
			{ "DOIT UUID" : "", "" : "<<<---여기부터"},
			{ "DOIT UUID" : "", "" : "DOIT UUID(두잇아이디)를" },
			{ "DOIT UUID" : "", "" : "이런 방식으로(줄을 바꿔가며)" },
			{ "DOIT UUID" : "", "" : "채우면 됩니다." },
			{ "DOIT UUID" : "", "" : "아!" },
			{ "DOIT UUID" : "", "" : "물론," },
			{ "DOIT UUID" : "", "" : "첫행부터 채워도" },
			{ "DOIT UUID" : "", "" : "괜찮아요." }
		];

		setExcelData("두잇일괄등록양식", "두잇목록", data);
	}