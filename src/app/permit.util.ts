import { getApiUrl, DEFAULT_CONTENT_TYPE } from "./app.info";
import { serializeParameters } from "./app.util";

const permitsChunk : any = {};
export const DEFAULT_PERMITS = { all: false, insert: false, retrieve: false, update: false, delete: false, import: false, export: false, launch: true, print: false };
export class Permission {
    public permits : any;
    constructor(setting = { }) {
        this.permits = Object.assign({},DEFAULT_PERMITS,setting);
    }
    canDo(action: string) : boolean {
        let cando = this.permits[action];
        return cando !== undefined && cando;
    }
}
export async function getPermitModel(pid: string) {
    if(!pid || pid.trim().length==0) return undefined;
    if(!permitsChunk[pid]) {
        await loadPermissions(pid);        
    }
    return new Permission(permitsChunk[pid]);
}
export async function loadPermissions(pid: string) {
    if(!pid || pid.trim().length==0) return undefined;
    try {
        let params = serializeParameters({progid: pid});
        let options = { method: "POST", headers: { ...params.headers, "Content-Type": DEFAULT_CONTENT_TYPE }, body: params.jsondata };
        let response = await fetch(getApiUrl()+"/api/permit/get",options);
        let json = await response.json();
        console.log("loadPermissions: pid="+pid,json);
        if(json && json.body[pid]) {
            permitsChunk[pid] = json.body[pid];
        }
    } catch(ex) { console.error(ex); }
}
