# will-app5

Program Utility Function (using bootstrap 5)

## Installation

    npm install @willsofts/will-app

## How To Install
This package is under [@willsofts](https://github.com/willsofts) libraries protection as private access, then you have to gain access key and setting in your own environment before start installation from administrator. \
ex. \
Window

    set NPM_TOKEN=your access token key here

Linux

    export NPM_TOKEN=your access token key here

### Application Info

| Function | Description |
| -------- | ----------- |
| DEFAULT_CONTENT_TYPE | application/json; charset=UTF-8 |
| getDefaultLanguage, setDefaultLanguage | get/set default language |
| getApiUrl, setApiUrl | get/set api url |
| getBaseUrl, setBaseUrl | get/set base url |
| getCdnUrl, setCdnUrl | get/set CDN url |
| getImgUrl, setImgUrl | get/set image url |
| getChatUrl, setChatUrl | get/set chat url |
| getBaseStorage, setBaseStorage | get/set base storage (`local`/`session`) default = 'session' (localStorage) |
| getDefaultRawParameters, setDefaultRawParameters | get/set raw parameters default = `false` |
| isSecureStorage, setSecureStorage | get/set secure storage default = `true` |
| getBaseCss, setBaseCss | get/set base css |
| getProgramMessage, setProgramMessage | get/set program messages |
| getProgramLabels, setProgramLabels | get/set program labels |
| getDefaultLabels, setDefaultLabels | get/set default labels |
| getMultiLanguages, setMultiLanguages | get/set multi languages |
| getMultiLanguagesModel | get multi languages model |
| getAppInfo | get application variables object |
| appInit | try to initial program message, program label and default label ex. appInit({program_message,default_labels,program_labels});|

### Custom Message Setting
Custom message code come from `program_message.json` (getProgramMessage/setProgramMessage).

ex. `program_message.json`
```json
[
    { "code":"QS0001", "TH": "คุณต้องการลบรายการนี้ใช่หรือไม่ %s", "EN":"Do you want to delete this transaction? %s"},
	{ "code":"QS0002", "TH": "คุณต้องการบันทึกรายการนี้ใช่หรือไม่", "EN": "Do you want to save this transaction?"},
	{ "code":"QS0003", "TH": "คุณต้องการยกเลิกรายการนี้ใช่หรือไม่", "EN": "Do you want to cancel this transaction?"},
	{ "code":"QS0004", "TH": "บันทึกรายการเรียบร้อยแล้ว %s", "EN": "Process Success %s"},
	{ "code":"QS0005", "TH": "ท่านต้องการลบรายการนี้ใช่หรือไม่ %s", "EN": "Do you want to delete this record? %s"},
    { "code":"fsconfirmbtn", "TH": "ตกลง", "EN": "OK"},
	{ "code":"fscancelbtn", "TH": "ยกเลิก", "EN": "Cancel"},
	{ "code":"fssavebtn", "TH": "บันทึก", "EN": "Save"},
	{ "code":"fsclosebtn", "TH": "ปิด", "EN": "Close"},
	{ "code":"fsokbtn", "TH": "ตกลง", "EN": "OK"},
	{ "code":"fsmessagetitle", "TH": "ข้อความ", "EN": "Message"},
	{ "code":"fsaccepttitle", "TH": "ยืนยัน", "EN": "Confirm"},
	{ "code":"fssuccessmsg", "TH": "การดำเนินการสำเร็จ", "EN": "Process success"},
	{ "code":"fsfailmsg", "TH": "การดำเนินการไม่สำเร็จ", "EN": "Process fail"},
	{ "code":"fsalert", "TH": "คำเตือน", "EN": "Alert"},
	{ "code":"fswarn", "TH": "คำเตือน", "EN": "Warning"},
	{ "code":"fsconfirm", "TH": "ยืนยัน", "EN": "Confirmation"},
	{ "code":"fsinfo", "TH": "ข้อความ", "EN": "Information"}
]
```

### Custom Label Setting
Custom label come from `program_label.json` (getProgramLabels/setProgramLabels) this is using `default_label.json` (getDefaultLabels/setDefaultLabels) for base setting.

ex. `program_label.json`
```json
[
	{
		"language": "TH",
		"label": [
			{"name": "caption_title", "value": "ข้อมูลโปรแกรม"},
			{"name": "progname_label", "value": "ชื่อโปรแกรม"},
			{"name": "progtype_label", "value": "ชนิด"}
	},
	{
		"language": "EN",
		"label": [
			{"name": "caption_title", "value": "Program Information"},
			{"name": "progname_label", "value": "Program Name"},
			{"name": "progtype_label", "value": "Type"}
	}
]
```

### Application Utility

| Function | Description |
| -------- | ----------- |
| addWindow | add specified window instance |
| getWindowByName | try to get window instance from specified name |
| closeChildWindows | try to close all child windows |
| submitWindow | try to submit url to specified target window name ex.<br/> submitWindow({ url: 'www.example.com', windowName: "example_name", method: "POST", params: { show: true } }) |
| openNewWindow | try to open new window specified by url ex. <br/> openNewWindow({ url: 'www.example.com', windowName: "example_name", method: "POST", params: { show: true}, newTab: true })|
| startWaiting, stopWaiting | try to start/stop waiting icon on mouse pointer location |
| submitFailure | try to alert capture AJAX failure error thrown |
| parseErrorThrown | try parse error thrown from AJAX |
| detectErrorResponse | try detect error response from API with head signature |
| successbox | try to display success popup dialog with [custom message setting](#custom-message-setting) |
| warningbox | try to display warning popup dialog with [custom message setting](#custom-message-setting) |
| alertbox | try to display alert popup dialog with [custom message setting](#custom-message-setting) |
| confirmbox | try to display confirm popup dialog with [custom message setting](#custom-message-setting) |
| alertDialog | try to display alert dialog with direct message setting |
| confirmDialog | try to display confirm dialog with direct message setting |
| confirmDelete | using confirmbox with message code `QS0001` from [custom message setting](#custom-message-setting) |
| confirmSave | using confirmbox with message code `QS0002` from [custom message setting](#custom-message-setting) |
| confirmCancel | using confirmbox with message code `QS0003` from [custom message setting](#custom-message-setting) |
| confirmRemove | using confirmbox with message code `QS0005` from [custom message setting](#custom-message-setting) |
| confirmSend | using confirmbox with message code `QS0006` from [custom message setting](#custom-message-setting) |
| confirmUpdate | using confirmbox with message code `QS0007` from [custom message setting](#custom-message-setting) |
| confirmClear | using confirmbox with message code `QS0008` from [custom message setting](#custom-message-setting) |
| confirmProcess | using confirmbox with message code `QS0009` from [custom message setting](#custom-message-setting) |
| confirmSaveAs | using confirmbox with message code `QS0010` from [custom message setting](#custom-message-setting) |
| confirmReceive | using confirmbox with message code `QS0011` from [custom message setting](#custom-message-setting) |
| confirmReset | using confirmbox with message code `QS0012` from [custom message setting](#custom-message-setting) |
| confirmErase | using confirmbox with message code `QS0013` from [custom message setting](#custom-message-setting) |
| confirmApprove | using confirmbox with message code `QS0014` from [custom message setting](#custom-message-setting) |
| confirmReject | using confirmbox with message code `QS0015` from [custom message setting](#custom-message-setting) |
| confirmRequest | using confirmbox with message code `QS0016` from [custom message setting](#custom-message-setting) |
| confirmImport | using confirmbox with message code `QS0017` from [custom message setting](#custom-message-setting) |
| confirmExport | using confirmbox with message code `QS0018` from [custom message setting](#custom-message-setting) |
| confirmResend | using confirmbox with message code `QS0019` from [custom message setting](#custom-message-setting) |
| confirmRevise | using confirmbox with message code `QS0020` from [custom message setting](#custom-message-setting) |
| startApplication | try call in order to setting up app config with callback function that invoked after finished | 
| serializeParameters | try to serialize parameters before calling API |

### Label Utility

| Function | Description |
| -------- | ----------- |
| getLabel | try to get label from [custom label setting](#custom-label-setting) with default language |
| getLabelItem | try to get label item (chunk) from [custom label setting](#custom-label-setting) |
| getLabelObject | try to get label category from [custom label setting](#custom-label-setting) with default language |
| getLabelModel | try to get label model from [custom label setting](#custom-label-setting) with default language |

### Message Utility

| Function | Description |
| -------- | ----------- |
| getMessageCode | get message from specified code from [custom message setting](#custom-message-setting) with default language |
| replaceString | try to replace message parameter with place holder `%S` |

### Random Utility

| Function | Description |
| -------- | ----------- |
| getRandomNumber | try to get random number with min = 1, max = 1000000 |
| random | try to get random with default 6 alpabets |
| randomNumber | try to get random with default 6 numerics |

### Utilities

| Function | Description |
| -------- | ----------- |
| getDateNow | To get date in format dd/MM/yyyy. |
| getTimeNow | To get time in format HH:mm:ss. |
| getDateTimeNow | To get datetime in format dd/MM/yyyy HH:mm:ss. |
| getYMD | To get date in format yyyy-MM-dd. |
| getDMY | To get date in format dd/MM/yyyy. |
| formatDate | To format Date to dd/MM/yyyy or yyyy-MM-dd. |
| formatTime | To format time HH:mm:ss. |
| formatDateTime | To format date into dd/MM/yyyy HH:mm:ss or yyyy-MM-dd HH:mm:ss. |
| getHMS | To format time HH:mm:ss. |
| currentDate | To format Date to yyyy-MM-dd. |
| currentTime | To format time to HH:mm:ss. |
| currentDateTime | To format Date to yyyy-MM-dd HH:mm:ss. |
| currentTimeMillis | To get current time in milli seconds. |
| addDays | To add number of days into Date. |
| compareDate | To compare between date. (returns number, -1 = lesser than, 0 = equal , 1 = greater than)|
| compareTime | To compare between time. (returns number, -1 = lesser than, 0 = equal , 1 = greater than)|
| compareDateTime | To compare between datetime. (returns number, -1 = lesser than, 0 = equal , 1 = greater than)|
| compareString | To compare string value. (returns number, -1 = lesser than, 0 = equal , 1 = greater than)|
| equalsIgnoreCase | To check string equals with ignore case. |
| isString | To check data is string or not. |
| hasAttributes | To check attributes is in object element. |
| parseInteger | To parse integer (especially from string). |
| parseFloat | To parse float (especially from string). |
| parseBoolean | To parse boolean (especially from string). |
| parseDate | To parse Date with data value string in format dd/MM/yyyy, yyyy-MM-dd, dd/MM/yyyy HH:mmss, yyyy-MM-dd HH:mm:ss. |
| parseTime | To parse time with data value string in format HH:mm:ss |
| now | To get current date/time. |
| translateVariables | To replace all variables in markup ${variable-name}. |
| serializeTimestamp | serialize timestamp into string format yyyyMMddHHmmssSSS |
| getFormatDate | To get date format with short or long month |
| getShortDate | To get date format with short month ex. 19 Sep 2024 |
| getLongDate | To get date format with long month ex. 19 September 2024 |
| getWeekDay | To get week day with short or long format ex. Thursday |
| getShortWeekDay | To get short week day ex. Thu |
| getLongWeekDay | To get long week day ex. Thursday |
| getFormatWeekDate | To get week day format ex. Thursday, 19 September 2024 |

### Paging

This is page setting instance for pagination with default settings:

    { page: 1, rowsPerPage: 10, totalRows: 0, totalPages: 1, limit: 10, offset: 10, rows: 0 };

| Function | Description |
| -------- | ----------- |
| hasPaging | to determine it has pagination or not |
| recordsOffset | to calculate offset of record position |
| recordsNumber | to calculate what record sequence no. |
| buildPagingModel | to build list of paging model the result is array of <br/> [{ page: number, text: string, css: "" }] |
| reset | try to reset page settings |
| clear | try to reset to default settings |

### KnMask

This is masking utility function.

| Function | Description | Example |
| -------- | ----------- | ---------- |
| maskNumber | to mask number format. <br/> Use # to include the digit from the position. <br/> Use x or * to mask the digit at that position.<br/>Any other char will be inserted. | ex. <br/> maskNumber(account, "xxxxxxxxxxxx####") result will be "xxxxxxxxxxxx5432"<br/> maskNumber("1234567898765432", "xxxx-xxxx-xxxx-####") result will be "xxxx-xxxx-xxxx-5432" |
| maskHead | to mask text header. | ex. <br/>maskHead("1234567898765432", 4) result will be "************5432" |
| maskTail | to mask text tailer | ex. <br/>maskTail("1234567898765432", 4) result will be "1234************" |
| maskHeadAndTail | to mask header and tailer | ex. <br/>maskHeadAndTail("1234567898765432", 4) result will be "1234********5432" |

