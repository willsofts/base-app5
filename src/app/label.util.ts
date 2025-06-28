import $ from "jquery";
import { getDefaultLanguage, getDefaultLabels, getProgramLabels, getApiUrl, DEFAULT_CONTENT_TYPE, getMetaInfo } from "./app.info";
import { getAccessorToken, getStorage, setStorage } from "./messenger";
import { loadAndMergeMessageCode } from "./msg.util";

export function getLabel(name: string, defaultLabel: string, lang = getDefaultLanguage()) {
    let result = undefined;
    let default_labels = getDefaultLabels();
    let program_labels = getProgramLabels();
    if(!lang || lang.trim().length==0) lang = "EN";
    let label_item = getLabelItem(name,lang,program_labels);
    if(label_item) {
        result = label_item.value;
    }
    if(!result) {
        label_item = getLabelItem(name,lang,default_labels);
        if(label_item) {
            result = label_item.value;
        }
    }
    return result?result:defaultLabel;
}

export function getLabelItem(name: string, lang: string, label_category: Array<any>) {
    if(!lang || lang.trim().length==0) lang = "EN";
    let lang_item = label_category.find((item) => { return item.language == lang; });
    if(!lang_item) lang_item = label_category.find((item) => { return item.language == "EN"; });
    if(lang_item) {
        return lang_item.label.find((item: any) => { return item.name == name; });
    }
    return undefined;
}

export function getLabelObject(lang = getDefaultLanguage(), label_category: Array<any>) {
    if(!lang || lang.trim().length==0) lang = "EN";
    let lang_item = label_category.find((item) => { return item.language == lang; });
    if(!lang_item) lang_item = label_category.find((item) => { return item.language == "EN"; });
    if(lang_item) {
        return lang_item.label;
    }
    return undefined;
}

export function getLabelModel(lang = getDefaultLanguage()) {
    let default_labels = getDefaultLabels();
    let program_labels = getProgramLabels();
    let default_item = getLabelObject(lang, default_labels);
    let program_item = getLabelObject(lang, program_labels);
    let default_model : any = {};
    let program_model : any = {};
    if(default_item) {
        default_item.forEach((element: any) => { default_model[element.name] = element.value; });
    }
    if(program_item) {
        program_item.forEach((element: any) => { program_model[element.name] = element.value; });
    }
    return Object.assign(default_model, program_model);
}

export function getApiLabel() {
    return getApiUrl() + (getMetaInfo().API_LABEL || "/api/label/fetch");
}

export function mergeProgramLabels(data_labels:any) : boolean {
    if(!data_labels) return false;
    if(!Array.isArray(data_labels) || data_labels.length <= 0) return false;
    let program_labels = getProgramLabels();
    for(let data of data_labels) {
        let lang = data.language;
        let lang_item = program_labels.find((item) => { return item.language == lang; });
        if(lang_item) {
            let concat_labels = [...lang_item.label, ...data.label];
            lang_item.label = [...new Map(concat_labels.map(item => [item.name, item])).values()];
        }
    }
    return true;
}

export function loadAndMergeLabel(id: string, callback?: Function, loadLabel: boolean = String(getMetaInfo()?.LOAD_LABEL)=="true", url: string = getApiLabel()) {
    loadAndMergeProgramLabel(id,callback,loadLabel,url);
    loadAndMergeMessageCode();
}

export function loadAndMergeProgramLabel(id: string, callback?: Function, loadLabel: boolean = String(getMetaInfo()?.LOAD_LABEL)=="true", url: string = getApiLabel()) {
    if(!loadLabel) return;
    let label_cached = getStorage(id);
    if(label_cached) {
        let merged = mergeProgramLabels(label_cached);
        if(merged && callback) callback(true,label_cached);
        return;
    }
    fetchLabel(id,function(success:boolean,data:any) {
        if(success) {
            setStorage(id,data.body);
            let merged = mergeProgramLabels(data.body);
            if(merged && callback) callback(true,data.body);
        }
    },url);
}

export function fetchLabel(id: string, callback: Function, url: string = getApiLabel()) {
    console.log("fetchLabel:",id);
	let authtoken = getAccessorToken();
	$.ajax({
		url: url,
		type: "POST",
		data: JSON.stringify({ labelid: id }),
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
