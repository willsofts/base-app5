import { getApiUrl, getBaseUrl, getCdnUrl, getImgUrl, getDefaultLanguage, getApiToken, getBaseStorage, setApiUrl, setBaseUrl, setCdnUrl, setImgUrl, setDefaultLanguage, setApiToken, getDefaultRawParameters, setBaseStorage, isSecureStorage, setSecureStorage, getBaseCss, setBaseCss, getChatUrl, setChatUrl, getMultiLanguages, setMultiLanguages, loadAppConfig, getTokenKey, setTokenKey, getMetaInfo, setMetaInfo } from "./app.info";
import { createLinkStyle } from "./app.util";
import { DH } from "./dh";
import SecureLS from 'secure-ls';

var messagingCallback : Function | undefined;
var currentWindow : any;
var secureEngine : any;
export function getSecureEngine() {
    if(!secureEngine) {
        secureEngine = isSecureStorage() ? new SecureLS({storage: "local"==getBaseStorage() ? localStorage : sessionStorage} as any) : null;
    }
    return secureEngine;
}
export function setMessagingCallback(callback?: Function) {
    messagingCallback = callback;
}
export function setCurrentWindow(curwin: any) {
    currentWindow = curwin;
}
export function getCurrentWindow() { return currentWindow; }
export function getStorage(key: string) {
    let secureLs = getSecureEngine();
    if(secureLs) return secureLs.get(key);    
	if("local"==getBaseStorage()) {
		return localStorage.getItem(key);
	}
    return sessionStorage.getItem(key);
}
export function setStorage(key: string, value: string) {
    let secureLs = getSecureEngine();
    if(secureLs) {
        secureLs.set(key,value);
        return;
    }
	if("local"==getBaseStorage()) {
		localStorage.setItem(key,value);
		return;
	}
	sessionStorage.setItem(key,value);
}
export function removeStorage(key: string) {
    let secureLs = getSecureEngine();
    if(secureLs) {
        secureLs.remove(key);
        return;
    }
	if("local"==getBaseStorage()) {
		localStorage.removeItem(key);
		return;
	}
    sessionStorage.removeItem(key);
}
export function getAccessorInfo() {
    let info = getStorage("accessorinfo");
    if(info && info!="") {
        try { return JSON.parse(info); } catch(ex) { console.error(ex); }
    }    
    return null;
}
export function getAccessorToken() {
    let json = getAccessorInfo();
    if(json && json.authtoken) {
        return json.authtoken;
    }
    let token = getApiToken();
	if(token && token!="") return token;
    return "";
}
export function getAccessTokenKey() {
    let json = getAccessorInfo();
    if(json && json.tokenkey) {
        return json.tokenkey;
    }
    let token = getTokenKey();
	if(token && token!="") return token;
    return "";
}
export function saveAccessorInfo(json: any) {
	setStorage("accessorinfo",JSON.stringify(json));
}
export function removeAccessorInfo() {
	removeStorage("accessorinfo");
}
export function sendMessageInterface(win: any) {
    let moderator = win?"opener":"parent";
	let info = getAccessorInfo();
    let options = getStorage("accessoptions");
	let msg = {type: "storage", archetype: "willsofts", moderator: moderator, API_URL: getApiUrl(), BASE_URL: getBaseUrl(), CDN_URL: getCdnUrl(), IMG_URL: getImgUrl(), DEFAULT_LANGUAGE: getDefaultLanguage(), API_TOKEN: getApiToken(), BASE_STORAGE: getBaseStorage(), SECURE_STORAGE: isSecureStorage(), BASE_CSS: getBaseCss(), CHAT_URL: getChatUrl(), MULTI_LANGUAGES: getMultiLanguages(), TOKEN_KEY: getTokenKey(), accessorinfo: info, accessoptions: options};
	return sendMessageToFrame(msg,win);
}
export function sendMessageToFrame(data: any,win: any) {
    if(!data) return false;
    try {
		console.log("sendMessageToFrame:",data);
        if(!win) win = document.getElementsByTagName('iframe')[0].contentWindow;    
        if(win) win.postMessage(JSON.stringify(data), "*");	
        return true;
    } catch(ex) { console.log(ex); }
    return false;
}
export function requestAccessorInfo(callback?: Function) {
    if(callback) setMessagingCallback(callback);
    let msg = { type: "accessorinfo", archetype: "willsofts" };
    console.log("requestAccessorInfo: ",msg);
    console.log("window.opener",window.opener);
    console.log("window.parent",window.parent);
    if(window.opener) {
        return sendMessageToOpener(msg);
    }
    return sendMessageToParent(msg);
}
export function sendMessageToParent(data: any) {
    if(!data) return;
    try {
        console.log("sendMessageToParent:",data);
        window.parent.postMessage(JSON.stringify(data), "*");
        return true;
    } catch(ex) { console.log(ex); }
    return false;
}
export function sendMessageToOpener(data: any) {
    if(!data) return;
    try {
        console.log("sendMessageToOpener:",data);
        window.opener.postMessage(JSON.stringify(data), "*");
        return true;
    } catch(ex) { console.log(ex); }
    return false;
}
export function handleRequestMessage(data: any) {
    if(data.type=="storage") {
        console.log("handleRequestMessage: data",data);
        if(data.TOKEN_KEY !== undefined) setTokenKey(data.TOKEN_KEY);
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
        if(data.META_INFO !== undefined) setMetaInfo(data.META_INFO);
        if(data.accessoptions !== undefined) setStorage("accessoptions",data.accessoptions);
        if(data.accessorinfo) {
            saveAccessorInfo(data.accessorinfo);
        }
        console.info("handleRequestMessage: accessor info",data.accessorinfo);
        console.info("handleRequestMessage: DEFAULT_LANGUAGE="+getDefaultLanguage(),", BASE_STORAGE="+getBaseStorage(),", DEFAULT_RAW_PARAMETERS="+getDefaultRawParameters(),", SECURE_STORAGE="+isSecureStorage());
        console.info("handleRequestMessage: API_URL="+getApiUrl(),", BASE_URL="+getBaseUrl(),", CDN_URL="+getCdnUrl(),", IMG_URL="+getImgUrl()+", BASE_CSS="+getBaseCss()+", CHAT_URL="+getChatUrl()+", MULTI_LANGUAGES="+getMultiLanguages());
        console.info("handleRequestMessage: API_TOKEN="+getApiToken(),", META_INFO=",getMetaInfo()); 
        createLinkStyle(getBaseCss());       
    }
    if(messagingCallback && data.archetype=="willsofts") {
        loadAppConfig(() => { if(messagingCallback) messagingCallback(data); });
    }
}
export function setupDiffie(json: any) {
	console.log("setupDiffie",getAccessorToken());
    let info = json.body.info;
    if(info) {
        const dh = new DH();
        dh.prime = info.prime;
        dh.generator = info.generator;
        dh.otherPublicKey = info.publickey;
        dh.compute();
        if(!(String((getMetaInfo() as any).DISABLE_DIFFIE)=="true")) {
            dh.updatePublicKey((success:boolean) => {
                if(success) {
                    info.handshake = "C"; //confirm
                    saveAccessorInfo(json.body);		
                }
            });
        }
        info.privatekey = dh.privateKey;
        info.publickey = dh.publicKey;
        info.sharedkey = dh.sharedKey;
        info.otherpublickey = dh.otherPublicKey;
		info.handshake = "";
        saveAccessorInfo(json.body);
    }
}
export function getDH() {
    let json = getAccessorInfo();
    if(json && json.info) {
        let info = json.info;
        if(!info.handshake || info.handshake=="" || info.handshake=="F") return null; //not confirm or fail
        if(info.prime && info.generator && info.publickey && info.privatekey && info.sharedkey && info.otherpublickey) {
            const dh = new DH();
            dh.prime = info.prime;
            dh.generator = info.generator;
            dh.otherPublicKey = info.publickey;
            dh.privateKey = info.privatekey;
            dh.publicKey = info.publickey;
            dh.sharedKey = info.sharedkey;
            dh.otherPublicKey = info.otherpublickey;
            return dh;
        }
    }
    return null;
}
export function bindingChildMessaging() {
    window.onmessage = function(e) {
        //console.log("window-messenger: onmessage:",e.data);
        try {
            let payload = e.data;
            if(typeof payload === 'string') { payload = JSON.parse(e.data); }
            //in case of parent window, try to send accessor info
            /*
            if(payload.type=="accessorinfo") {					
                sendMessageInterface(getCurrentWindow());
                return;
            }*/
            //in case of child window, try to handle request message
            handleRequestMessage(payload);
        } catch(ex) { console.error(ex); }
    }
}
export function bindingParentMessaging() {
    window.onmessage = function(e) {
        //console.log("window-main: onmessage:",e.data);
        try {
            let payload = e.data;
            if(typeof payload === 'string') { payload = JSON.parse(e.data); }
            //in case of parent window, try to send accessor info            
            if(payload.type=="accessorinfo") {					
                sendMessageInterface(getCurrentWindow());
                return;
            }
            //in case of child window, try to handle request message
            //handleRequestMessage(payload);
        } catch(ex) { console.error(ex); }
    }
}
