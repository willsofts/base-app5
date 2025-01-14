import { bindingChildMessaging, bindingParentMessaging } from "./messenger";
import { createLinkStyle } from "./app.util";
const appInfo = {
	DEFAULT_LANGUAGE : process.env.VUE_APP_DEFAULT_LANGUAGE,
	API_URL : process.env.VUE_APP_API_URL,
	BASE_URL : process.env.VUE_APP_BASE_URL,
	CDN_URL : process.env.VUE_APP_CDN_URL,
	IMG_URL : process.env.VUE_APP_IMG_URL,
	CHAT_URL : process.env.VUE_APP_CHAT_URL,
	BASE_STORAGE : process.env.VUE_APP_BASE_STORAGE,
	API_TOKEN : process.env.VUE_APP_API_TOKEN,
	DEFAULT_RAW_PARAMETERS : process.env.VUE_APP_DEFAULT_RAW_PARAMETERS == "true",
	SECURE_STORAGE : process.env.VUE_APP_SECURE_STORAGE == "true",
	BASE_CSS : process.env.VUE_APP_BASE_CSS,
	MULTI_LANGUAGES : ["EN","TH"],
};
var APP_MULTI_LANGUAGES = process.env.VUE_APP_MULTI_LANGUAGES;
if(APP_MULTI_LANGUAGES && APP_MULTI_LANGUAGES.trim().length>0) {
	let multilangs = JSON.parse(APP_MULTI_LANGUAGES);
	if(Array.isArray(multilangs)) appInfo.MULTI_LANGUAGES = multilangs;
}
export const DEFAULT_CONTENT_TYPE = "application/json; charset=UTF-8";
console.log("AppInfo",appInfo);
var notifyCallback : Function;
export function getAppInfo() { return appInfo; }
export function registerNotification(callback: Function) { notifyCallback = callback; }
export function getMultiLanguages() { return appInfo.MULTI_LANGUAGES; }
export function setMultiLanguages(values:any) { 
	console.info("set MULTI_LANGUAGES",values); 
	if(values) appInfo.MULTI_LANGUAGES = values; 
	if(notifyCallback) notifyCallback("multi-languages",appInfo.MULTI_LANGUAGES);
}
export function getDefaultLanguage() { return appInfo.DEFAULT_LANGUAGE; }
export function setDefaultLanguage(language: string) {
	console.log("set default_language="+language);
	if(language && language.trim().length>0) appInfo.DEFAULT_LANGUAGE = language;
}
export function getApiToken() { return appInfo.API_TOKEN; }
export function getApiUrl() { return appInfo.API_URL; }
export function getBaseUrl() { return appInfo.BASE_URL; }
export function getCdnUrl() { return appInfo.CDN_URL; }
export function getImgUrl() { return appInfo.IMG_URL; }
export function getChatUrl() { return appInfo.CHAT_URL; }
export function getBaseStorage() { return appInfo.BASE_STORAGE; }
export function getDefaultRawParameters() { return appInfo.DEFAULT_RAW_PARAMETERS; }
export function setApiToken(value: string) { appInfo.API_TOKEN = value; }
export function setApiUrl(value: string) { appInfo.API_URL = value; }
export function setBaseUrl(value: string) { appInfo.BASE_URL = value; }
export function setCdnUrl(value: string) { appInfo.CDN_URL = value; }
export function setImgUrl(value: string) { appInfo.IMG_URL = value; }
export function setChatUrl(value: string) { appInfo.CHAT_URL = value; }
export function setBaseStorage(value: string) { appInfo.BASE_STORAGE = value; }
export function setDefaultRawParameters(value: boolean) { appInfo.DEFAULT_RAW_PARAMETERS = value; }
export function setSecureStorage(value: boolean) { appInfo.SECURE_STORAGE = value; }
export function isSecureStorage() { return appInfo.SECURE_STORAGE; }
export function getBaseCss() { return appInfo.BASE_CSS; }
export function setBaseCss(value: string) { appInfo.BASE_CSS = value; }
var default_labels : Array<any> = [];
var program_labels : Array<any> = [];
var program_message : Array<any> = [];
export function getProgramMessage() : Array<any> { return program_message; }
export function getDefaultLabels() : Array<any>{ return default_labels; }
export function getProgramLabels() : Array<any> { return program_labels; }
export function setProgramMessage(message: Array<any>) { program_message = message; }
export function setDefaultLabels(labels: Array<any>) { default_labels = labels; }
export function setProgramLabels(labels: Array<any>) { program_labels = labels; }
export function appInit(settings = {program_message,default_labels,program_labels,listen_messaging: 'child'}) {
	const setting = Object.assign({listen_messaging: 'child'},settings)
	setProgramMessage(setting.program_message);
	setDefaultLabels(setting.default_labels);
	setProgramLabels(setting.program_labels);
	if(setting.listen_messaging=='child') {
		bindingChildMessaging();
	} else if(setting.listen_messaging=='parent') {
		bindingParentMessaging();
	}
}
export function getMultiLanguagesModel(datas:any) {
    let multilangs = datas || getMultiLanguages();
    if(!multilangs) multilangs = ["EN","TH"];
    return multilangs.map((item:any) => { return {lang: item, label: item+"_lang"} });
}
export function assignAppConfig(data:any,callback?:Function) {
	console.log("assignAppConfig:",data);
	if(!data) return;
	if(data.API_URL !== undefined) setApiUrl(data.API_URL);
	if(data.BASE_URL !== undefined) setBaseUrl(data.BASE_URL);
	if(data.CDN_URL !== undefined) setCdnUrl(data.CDN_URL);
	if(data.IMG_URL !== undefined) setImgUrl(data.IMG_URL);
	if(data.DEFAULT_LANGUAGE !== undefined) setDefaultLanguage(data.DEFAULT_LANGUAGE);
	if(data.API_TOKEN !== undefined) setApiToken(data.API_TOKEN);
	if(data.BASE_STORAGE !== undefined) setBaseStorage(data.BASE_STORAGE);
	if(data.SECURE_STORAGE !== undefined) setSecureStorage(data.SECURE_STORAGE);
	if(data.BASE_CSS !== undefined) setBaseCss(data.BASE_CSS);
	if(data.CHAT_URL !== undefined) setChatUrl(data.CHAT_URL);
	if(data.MULTI_LANGUAGES !== undefined) setMultiLanguages(data.MULTI_LANGUAGES);
	if(data.DEFAULT_RAW_PARAMETERS !== undefined) setDefaultRawParameters(data.DEFAULT_RAW_PARAMETERS);
	console.info("appConfig: DEFAULT_LANGUAGE="+getDefaultLanguage(),", BASE_STORAGE="+getBaseStorage(),", DEFAULT_RAW_PARAMETERS="+getDefaultRawParameters(),", SECURE_STORAGE="+isSecureStorage());
	console.info("appConfig: API_URL="+getApiUrl(),", BASE_URL="+getBaseUrl(),", CDN_URL="+getCdnUrl(),", IMG_URL="+getImgUrl()+", BASE_CSS="+getBaseCss()+", CHAT_URL="+getChatUrl()+", MULTI_LANGUAGES="+getMultiLanguages());
	createLinkStyle(getBaseCss());
	if(callback) callback(data);
}
export function loadAppConfig(callback?:Function, url:string = "../config/app.config.json") {
	fetch(url).then(response => response.json()).then(data => {
		assignAppConfig(data,callback);
	}).catch(err => { console.error(err); if(callback) callback(); });
}
