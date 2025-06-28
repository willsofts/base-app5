import $ from "jquery";
import { getDefaultLanguage, getProgramMessage, getApiUrl, getMetaInfo, DEFAULT_CONTENT_TYPE } from "./app.info";
import { getAccessorToken, getStorage, setStorage } from "./messenger";

export function getMessageCode(errcode: string, params?: Array<any>, defaultMessage?: string) {
    if(errcode && errcode.trim().length>0) {
		let program_message = getProgramMessage();
        let lang = getDefaultLanguage();
        if(!lang || lang.trim().length==0) lang = "EN";
		let msg = null;
		//try find out from storage cached first
		let message_code = getStorage("message_code");
		if(message_code) {
			msg = message_code.find((item:any) => { return item.code == errcode; });
		}
		if(!msg) msg = program_message.find((item:any) => { return item.code == errcode; });
		if(msg) {
			let text = msg[lang];
			if(text && text.trim().length>0) {
				return replaceString(text, params);
			}
		}
    }
	return defaultMessage?defaultMessage:errcode;
}

export function replaceString(str: string, arrStr?: Array<any>){                           	
	if(arrStr) {
		let regex = /%s/;
		for(let i=0;i<arrStr.length;i++){
			let t_str = arrStr[i];
			str = str.replace(regex, t_str);
		}
	} 
	if(str) {
		let regex = /%s/g;
		str = str.replace(regex,"");
	}
	return str;
}

export function mergeMessageCodes(data_messages: any) {
	if(!data_messages) return false;
	if(!Array.isArray(data_messages) || data_messages.length <= 0) return false;
	let program_message = getProgramMessage();
	program_message.unshift(...data_messages);
	return true;
}

export function getApiMessageCode() {
    return getApiUrl() + (getMetaInfo()?.API_MESSAGE_CODE || "/api/msgcode/fetch");
}

export function loadAndMergeMessageCode(callback?: Function, loadMessageCode: boolean = String(getMetaInfo()?.LOAD_MESSAGE_CODE)=="true", url: string = getApiMessageCode()) {
	if(!loadMessageCode) return;
	//if exist in storage then do not make request
	if(getStorage("message_code")) {
		return;
	}
	fetchMessageCode(undefined,function(success: boolean,data: any) {
		if(success) {
			setStorage("message_code",data.body);
			if(callback) callback(success,data.body);
		}
	},url);
}

export function fetchMessageCode(code?: string, callback?: Function, url: string = getApiMessageCode()) {
    console.log("fetchMessageCode: ",code);
	let authtoken = getAccessorToken();
	$.ajax({
		url: url,
		type: "POST",
		data: code ? JSON.stringify({ msgcode: code }) : "",
		dataType: "json",
		headers : { "authtoken": authtoken },
		contentType: DEFAULT_CONTENT_TYPE,
		error : function(transport,status,errorThrown) {
			console.error(errorThrown);
			if(callback) callback(false,errorThrown,transport);
		},
		success: function(data) {
			if(callback) callback(true,data);
		}
	});		
}
