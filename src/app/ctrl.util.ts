import $ from "jquery"
import { Utilities } from "./Utilities";

export function getControlClasses(attrClass: string,...classes: string[]) {
	let ctrlClasses = "";
	if(!attrClass) attrClass = "";
	for(let c of classes) {
		if(attrClass.indexOf(c)<0) ctrlClasses += " "+c;
	}
	return ctrlClasses;
}
export function clearCalendar(src: any) {
	let dpkr = $(src);
	if(dpkr.is(":disabled")) return;
	if(dpkr.is("[readonly]")) {
		let edit = dpkr.attr("editable");
		if(!("true"==edit)) return;		
	}
	dpkr.val("");
	src.dispatchEvent(new Event('select')); 
	let ifn = dpkr.data("afterSelectDatePicker");
	if(ifn) ifn("",dpkr);
}
export function openCalendar(src: any) {
	let dpkr = $(src);
	if(dpkr.is(":disabled")) return;
	if(dpkr.is("[readonly]")) {
		let edit = dpkr.attr("editable");
		if(!("true"==edit)) return;		
	}
	try{ 
		let picker = dpkr as any;
		picker.datepicker({
			showOn : "",
			dateFormat : "dd/mm/yy",
			changeMonth: true,
			changeYear: true,
			yearRange: "c-100:+100",
			onSelect : function(input: any,inst: any) {
				src.focus();
				src.dispatchEvent(new Event('select')); 
				let fn = dpkr.data("afterSelectDatePicker");
				if(fn) fn(input,inst);
			}
		});
		picker.datepicker("show");
		$(document).off('focusin');
		return;
	}catch (ex)	{ console.error(ex); }
}
export function triggerInput(input: any) { 
	input.dispatchEvent(new Event('input', { bubbles: true })); 
}
export function inputNumberOnly(myfield: any,e: any,decimal: number|string,isPlus: boolean) { 
	let key; let keychar;  
	if (e) key = e.which; else return true; 
	keychar = String.fromCharCode(key); 
	let element = myfield; 
	isPlus = ( isPlus != null )? true : false ; 
	let isPoint= ( decimal != null && decimal != 0 )? true : false ; 
	if ( key==45 && element.value.indexOf('-')==-1 && !isPlus  ) { 
		element.value="-"+element.value;
		triggerInput(element); 
	} 
	if ( (key==46) && (element.value.indexOf('.')==-1) && isPoint ) { 
		if (element.value == "") element.value='0';
		triggerInput(element); 
		return true; 
	} 
	if ((key==null) || (key==0) || (key==8) || (key==9) || (key==27)) return true; 
	else if ("0123456789".indexOf(keychar) > -1) {
		triggerInput(element); 
		return true; 
	} else return false; 
} 
export function checkInputNumberOnly(myfield: any,e: any,decimal: number|string,isPlus: boolean) { 
	let iskeyup = myfield.getAttribute('keyup'); 
	if ( iskeyup==null) { }
	else if ( iskeyup==false) {  return false; }  
	myfield.setAttribute('keyup',false);  
	return inputNumberOnly(myfield,e,decimal,isPlus);  
} 
export function checkInputKey(myfield: any,event: any,decimal: number|string,maxvalue: number|string) { 
	let iNum=event.keyCode; 
	if (((iNum>=48)&&(iNum<=57)) || ((iNum>=96)&&(iNum<=105)) || iNum==109 || iNum==110 || iNum==189 || iNum==190 ) { 
		myfield.setAttribute('keyup',true);    
		let c_pos = getCaretPosition(myfield);
		let o_len = myfield.value.length;
		formatNumber(myfield,maxvalue,decimal);
		let n_len = myfield.value.length;
		setCaretPosition(myfield,n_len>o_len?c_pos+1:c_pos);
		triggerInput(myfield);
	} 
} 
export function formatNumber(element: any,maxvalue: number|string,decimal: number|string) { 
	let valueBfChange = element.value;
	let data = element.value; 
	let point = 0 ; 
	if ( decimal != null && decimal !=  ""  ) { 
		let precisions = Number(decimal);
		point = ( precisions >= 0 ) ? precisions : 2;
	} 
	let fraction : any = null ; 
	if ( maxvalue != null && maxvalue != "" ) { 
		if ( Number(maxvalue) >= 0 ) { 
			fraction = maxvalue ; 
			if ( data.indexOf("-")>-1 )  fraction++; 	
		} else {
			fraction = null  ; 
		}
	} 
	data = clearComma(data); 
	try { 
		let dot = '' ; 
		let x = data.split('.'); 
		if ( x.length == 2 && point > 0 ) { 
			dot = ( x[1].length > point )?('.'+x[1].substring(0,point)):('.'+x[1]) ; 
		} 
		while ( x[0].length > 1 && x[0].charAt(0)=="0" ) { 
			x[0] = x[0].substring(1);	
		} 
		if ( (fraction == 0 && Number(x[0]) > 0 ) || ( fraction > 0 && x[0].length > fraction ) ) { 
			element.value = valueBfChange ; 
			return true;	
		} 
		data = x[0] + dot; 
	}catch (ex) { console.error(ex); } 
	element.value = putComma(data); 
} 
export function putComma(data: string) { 
	if ( data.indexOf(',') > -1 ) { data = clearComma(data); } 
	let move = ( data.indexOf('.') > -1 ) ? data.indexOf('.') : data.length; 
	let minus = ( data.indexOf('-') > -1 ) ? 1 : 0 ; 
	while ( move > 3 ) { 
		if ( minus && move <= 4  )  { break ; } 
		data = data.substring(0,move-3)+","+data.substring(move-3) ; 
		move -= 3 ; 
	} 
	return data; 
} 
export function clearComma(data: string){ 
	while (data.indexOf(',')!=-1) { 
		data = data.replace(',',''); 
	} 
	return data; 
} 
export function getCaretPosition(ctrl: any) {
	let iCaretPos = 0;
	if ((document as any).selection) { 
		ctrl.focus ();
		let selector = (document as any).selection.createRange ();
		selector.moveStart ('character', -ctrl.value.length);
		iCaretPos = selector.text.length;
	} else if (ctrl.selectionStart || ctrl.selectionStart == '0') {
		iCaretPos = ctrl.selectionStart;
	}
	return (iCaretPos);
}
export function setCaretPosition(ctrl: any, iCaretPos: number) {
	if (ctrl.createTextRange) { 
		let selector = ctrl.createTextRange ();
		selector.collapse(true);
		selector.moveEnd ('character', iCaretPos);
		selector.moveStart ('character', iCaretPos);
		selector.select ();
	} else if (ctrl.selectionStart || ctrl.selectionStart == '0') {
		ctrl.selectionStart = iCaretPos;
		ctrl.selectionEnd = iCaretPos;
		ctrl.focus ();
	}
}
export function parseNumber(avalue: string) {
	if(!avalue) return 0; 
	return Number(removeComma(avalue)); 
} 		  
export function removeComma(avalue: string) { 
	if(!avalue) return avalue; 
	let result = avalue+""; 
	while ( result.indexOf(",") > -1 ) { 
		result = removeDelimiter(result,",");	} 
	return result; 
} 		 				 
export function removeDelimiter(avalue: string,delimiter: string) { 
	return avalue.replace(delimiter,""); 
} 
export function formatFloating(avalue: string,decimal: number) { 
	avalue = avalue+""; 
	avalue = removeComma(avalue); 
	return formatDecimal(avalue,decimal,true); 
} 		 							 
export function formatDecimal(avalue: any,decimal: number,verifydecimal: boolean) { 
	let sign = ""; 
	let result = avalue+"";			 
	let bstr = ""; 
	let cstr = ""; 
	let i = result.indexOf("-"); 
	if(i>=0) { 
		sign = "-"; 
		result = result.substring(i+1); 
	} else { 
		i = result.indexOf("+"); 
		if(i>=0) { 
			sign = "+"; 
			result = result.substring(i+1);					 
		} 
	} 
	let astr = result; 
	i = result.indexOf("."); 
	if(i>0) { 
		astr = result.substring(0,i); 
		bstr = result.substring(i+1); 
		cstr = result.substring(i); 
	}  
	let la = astr.length; 
	if(la>3) { 
		let tstr = astr; 
		astr = ""; 
		while(tstr!="") { 
			la = tstr.length; 
			let md = la % 3; 
			if(md>0) { 
				astr += tstr.substring(0,md)+","; 
				tstr = tstr.substring(md); 
			} else { 
				astr += tstr.substring(0,3); 
				tstr = tstr.substring(3); 
				if(tstr!="") astr += ","; 
			} 
		} 
	} 
	if(verifydecimal) { 
		if(decimal>0) { 
			let l = bstr.length; 
			if(decimal>l) { 
				let j = 0; 
				for(j=l;j<decimal;j++) { 
					bstr += "0"; 
				} 
			} else { 
				bstr = bstr.substring(0,decimal); 
			}		 
			if(astr=="") return ""; 
			return sign+astr+"."+bstr; 
		} else { 
			return sign+astr; 
		} 
	} else { 
		return sign+astr+cstr; 
	} 
}						 

const header_action = { type: "button", action: "edit" };
export function ensureTableSetting(settings: any) {
    let headers = {autoFormat: true, ...settings};
    if(headers.actions) {
        for(let act of headers.actions) {
            let item = {...header_action, ...act};
            if(!item.css && "button"==item.type) {
                if("edit"==item.action) {
                    item.css = "btn-edit fa-data-edit fa-btn fa fa-pencil";
                } else if("delete"==item.action) {
                    item.css = "btn-delete fa-data-delete fa-btn fa fa-trash";
                } else if("view"==item.action) {
                    item.css = "btn-view fa-data-view fa-btn fa fa-eye";
                }
            }
            Object.assign(act,item);
        }
    }
    return headers;
}
export function formatDataTable(data: any,field: any) {
	try {
		if(field) {
			if(field.type=="DECIMAL") { 
				return formatFloating(data,field.decimal!==undefined?field.decimal:2); 
			}
			else if(field.type=="DATE") {                       
				let date = Utilities.parseDate(data);
				if(date) return Utilities.formatDate(date);
			}
			else if(field.type=="DATETIME") { 
				let date = Utilities.parseDate(data);
				if(date) return Utilities.formatDateTime(date);
			}
		}
		return data;
	} catch(ex) {
		console.error(ex);
		return data;
	}
}
