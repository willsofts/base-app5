
/* app.info */
export declare const DEFAULT_CONTENT_TYPE = "application/json; charset=UTF-8";
export declare function getAppInfo(): {
    DEFAULT_LANGUAGE: string | undefined;
    API_URL: string | undefined;
    BASE_URL: string | undefined;
    CDN_URL: string | undefined;
    IMG_URL: string | undefined;
    CHAT_URL: string | undefined;
    BASE_STORAGE: string | undefined;
    API_TOKEN: string | undefined;
    DEFAULT_RAW_PARAMETERS: boolean;
    SECURE_STORAGE: boolean;
    BASE_CSS: string | undefined;
    MULTI_LANGUAGES: string[];
};
export declare function registerNotification(callback: Function): void;
export declare function getMultiLanguages(): string[];
export declare function setMultiLanguages(values: any): void;
export declare function getDefaultLanguage(): string | undefined;
export declare function setDefaultLanguage(language: string): void;
export declare function getApiToken(): string | undefined;
export declare function getApiUrl(): string | undefined;
export declare function getBaseUrl(): string | undefined;
export declare function getCdnUrl(): string | undefined;
export declare function getImgUrl(): string | undefined;
export declare function getChatUrl(): string | undefined;
export declare function getBaseStorage(): string | undefined;
export declare function getDefaultRawParameters(): boolean;
export declare function setApiToken(value: string): void;
export declare function setApiUrl(value: string): void;
export declare function setBaseUrl(value: string): void;
export declare function setCdnUrl(value: string): void;
export declare function setImgUrl(value: string): void;
export declare function setChatUrl(value: string): void;
export declare function setBaseStorage(value: string): void;
export declare function setDefaultRawParameters(value: boolean): void;
export declare function setSecureStorage(value: boolean): void;
export declare function isSecureStorage(): boolean;
export declare function getBaseCss(): string | undefined;
export declare function setBaseCss(value: string): void;
export declare function getProgramMessage(): Array<any>;
export declare function getDefaultLabels(): Array<any>;
export declare function getProgramLabels(): Array<any>;
export declare function setProgramMessage(message: Array<any>): void;
export declare function setDefaultLabels(labels: Array<any>): void;
export declare function setProgramLabels(labels: Array<any>): void;
export declare function appInit(settings?: {
    program_message: any[];
    default_labels: any[];
    program_labels: any[];
    listen_messaging: string;
}): void;
export declare function getMultiLanguagesModel(datas: any): any;

/* app.util */
export declare function getWindowByName(winname: string): any;
export declare function closeChildWindows(): void;
export declare function addWindow(awindow: any): void;
export declare function submitWindow(settings: any): void;
export declare function openNewWindow(settings: any): Window | null | undefined;
export declare function startWaiting(): void;
export declare function stopWaiting(): void;
export declare function submitFailure(xhr?: any, status?: number | string, errorThrown?: string, checking?: boolean): void;
export declare function parseErrorThrown(xhr?: any, status?: number | string, errorThrown?: string): string;
export declare function detectErrorResponse(data: any): boolean;
export declare function successbox(callback?: Function, params?: any): void;
export declare function warningbox(errcode: string, callback?: Function, params?: any): void;
export declare function alertbox(errcode: string, callback?: Function, defaultmsg?: string, params?: any, addonmsg?: string, title?: string, icon?: string): void;
export declare function alertDialog(msg?: string, callbackfn?: Function, title?: string, icon?: string): void;
export declare function confirmbox(errcode: string, okFn?: Function, cancelFn?: Function, defaultmsg?: string, params?: any, addonmsg?: string, title?: string, icon?: string): boolean;
export declare function confirmDialog(msg?: string, okCallback?: Function, cancelCallback?: Function, title?: string, icon?: string): boolean;
export declare function alertmsg(errcode: string, defaultmsg?: string, params?: any, callback?: Function): void;
export declare function confirmmsg(errcode: string, defaultmsg?: string, params?: any, okFn?: Function, cancelFn?: Function): void;
export declare function confirmDialogBox(errcode: string, params?: any, defaultmsg?: string, okFn?: Function, cancelFn?: Function, addonmsg?: string): boolean;
export declare function confirmDelete(params?: any, okFn?: Function, cancelFn?: Function, addonmsg?: string): boolean;
export declare function confirmSave(okFn?: Function, cancelFn?: Function, addonmsg?: string): boolean;
export declare function confirmCancel(okFn?: Function, cancelFn?: Function, addonmsg?: string): boolean;
export declare function confirmRemove(params?: any, okFn?: Function, cancelFn?: Function, addonmsg?: string): boolean;
export declare function confirmSend(okFn?: Function, cancelFn?: Function, addonmsg?: string): boolean;
export declare function confirmUpdate(okFn?: Function, cancelFn?: Function, addonmsg?: string): boolean;
export declare function confirmClear(params?: any, okFn?: Function, cancelFn?: Function, addonmsg?: string): boolean;
export declare function confirmProcess(okFn?: Function, cancelFn?: Function, addonmsg?: string): boolean;
export declare function confirmSaveAs(okFn?: Function, cancelFn?: Function, addonmsg?: string): boolean;
export declare function confirmReceive(okFn?: Function, cancelFn?: Function, addonmsg?: string): boolean;
export declare function confirmReset(okFn?: Function, cancelFn?: Function, addonmsg?: string): boolean;
export declare function confirmErase(params?: any, okFn?: Function, cancelFn?: Function, addonmsg?: string): boolean;
export declare function confirmApprove(params?: any, okFn?: Function, cancelFn?: Function, addonmsg?: string): boolean;
export declare function confirmReject(params?: any, okFn?: Function, cancelFn?: Function, addonmsg?: string): boolean;
export declare function confirmRequest(okFn?: Function, cancelFn?: Function, addonmsg?: string): boolean;
export declare function confirmImport(okFn?: Function, cancelFn?: Function, addonmsg?: string): boolean;
export declare function confirmExport(okFn?: Function, cancelFn?: Function, addonmsg?: string): boolean;
export declare function confirmResend(okFn?: Function, cancelFn?: Function, addonmsg?: string): boolean;
export declare function confirmRevise(params?: any, okFn?: Function, cancelFn?: Function, addonmsg?: string): boolean;
export declare function startApplication(pid: string, callback?: Function): void;
export declare function setupApplication(callback?: Function): void;
export declare function serializeParameters(parameters?: any, addonParameters?: any, raw?: boolean): {
    cipherdata: boolean;
    jsondata: string;
    jsonobject: any;
    headers: {
        authtoken: any;
        "data-type": string;
        language: string | undefined;
    };
};
export declare function decryptCipherData(headers: any, data: any): any;
export declare function createLinkStyle(css_url?: string): void;
export declare function disableControls(): void;

/* ctrl.util */
export declare function getControlClasses(attrClass: string, ...classes: string[]): string;
export declare function clearCalendar(src: any): void;
export declare function openCalendar(src: any): void;
export declare function triggerInput(input: any): void;
export declare function inputNumberOnly(myfield: any, e: any, decimal: number | string, isPlus: boolean): boolean;
export declare function checkInputNumberOnly(myfield: any, e: any, decimal: number | string, isPlus: boolean): boolean;
export declare function checkInputKey(myfield: any, event: any, decimal: number | string, maxvalue: number | string): void;
export declare function formatNumber(element: any, maxvalue: number | string, decimal: number | string): true | undefined;
export declare function putComma(data: string): string;
export declare function clearComma(data: string): string;
export declare function getCaretPosition(ctrl: any): number;
export declare function setCaretPosition(ctrl: any, iCaretPos: number): void;
export declare function parseNumber(avalue: string): number;
export declare function removeComma(avalue: string): string;
export declare function removeDelimiter(avalue: string, delimiter: string): string;
export declare function formatFloating(avalue: string, decimal: number): string;
export declare function formatDecimal(avalue: any, decimal: number, verifydecimal: boolean): string;
export declare function ensureTableSetting(settings: any): any;
export declare function formatDataTable(data: any, field: any): any;

export declare class DH {
    prime: string;
    generator: string;
    privateKey: string;
    publicKey: string;
    sharedKey: string;
    otherPublicKey: string;
    constructor();
    encryptText(word: string, keyBase64: string): string;
    decryptText(word: string, keyBase64: string): string;
    encrypt(word: string): string;
    decrypt(word: string): string;
    computePublicKey(): void;
    computeSharedKey(): void;
    compute(): void;
    requestGenerator(callback?: Function, aurl?: string): void;
    getAccessorInfo(): any;
    getAccessorToken(): any;
    requestPublicKey(dh?: DH, callback?: Function, aurl?: string): void;
    submitPublicKey(callback?: Function, aurl?: string): void;
    updatePublicKey(callback?: Function, aurl?: string): void;
}

/* KnMask */
export declare class KnMask {
    maskChar: string;
    constructor(maskChar?: string);
    /**
     * @param text The number in plain text
     * @param mask The mask pattern.
     *    Use # to include the digit from the position.
     *    Use x or * to mask the digit at that position.
     *    Any other char will be inserted.
     *
     * @return The masked string
     */
    static maskingNumber(text?: string, mask?: string, maskChar?: string): string;
    /**
     * @param text The number in plain text
     * @param maskLength number of remaining original text
     * @param maskChar default is "*" to be masked
     * @return The masked string
     * ex. text = "1234567898765432"
     * after maskingHead(text,4) = ************5432
     * mask head but last 4 characters remain
     */
    static maskingHead(text?: string, maskLength?: number, maskChar?: string): string;
    /**
     * @param text The number in plain text
     * @param maskLength number of remaining original text
     * @param maskChar default is "*" to be masked
     * @return The masked string
     * ex. text = "1234567898765432"
     * after maskingTail(text,4) = 1234************
     * mask tail (until end of string) but first 4 characters remain
     */
    static maskingTail(text?: string, maskLength?: number, maskChar?: string): string;
    /**
     * @param text The number in plain text
     * @param maskLength number of remaining original text
     * @param maskChar default is "*" to be masked
     * @return The masked string
     * ex. text = "1234567898765432"
     * after maskingHeadAndTail(text,4) = 1234********5432
     * mask head and tail (until end of string) but first & last 4 characters remain
     */
    static maskingHeadAndTail(text?: string, maskLength?: number, maskChar?: string): string;
    maskHead(text?: string, maskLength?: number): string;
    maskNumber(text?: string, mask?: string): string;
    maskTail(text?: string, maskLength?: number): string;
    maskHeadAndTail(text?: string, maskLength?: number): string;
}

/* label.util */
export declare function getLabel(name: string, defaultLabel: string, lang?: string | undefined): any;
export declare function getLabelItem(name: string, lang: string, label_category: Array<any>): any;
export declare function getLabelObject(lang: string | undefined, label_category: Array<any>): any;
export declare function getLabelModel(lang?: string | undefined): any;

/* messenger */
export declare function getSecureEngine(): any;
export declare function setMessagingCallback(callback?: Function): void;
export declare function setCurrentWindow(curwin: any): void;
export declare function getCurrentWindow(): any;
export declare function getStorage(key: string): any;
export declare function setStorage(key: string, value: string): void;
export declare function removeStorage(key: string): void;
export declare function getAccessorInfo(): any;
export declare function getAccessorToken(): any;
export declare function saveAccessorInfo(json: any): void;
export declare function removeAccessorInfo(): void;
export declare function sendMessageInterface(win: any): boolean;
export declare function sendMessageToFrame(data: any, win: any): boolean;
export declare function requestAccessorInfo(callback?: Function): boolean | undefined;
export declare function sendMessageToParent(data: any): boolean | undefined;
export declare function sendMessageToOpener(data: any): boolean | undefined;
export declare function handleRequestMessage(data: any): void;
export declare function setupDiffie(json: any): void;
export declare function getDH(): DH | null;
export declare function bindingChildMessaging(): void;
export declare function bindingParentMessaging(): void;

/* msg.util */
export declare function getMessageCode(errcode: string, params?: Array<any>, defaultMessage?: string): string;
export declare function replaceString(str: string, arrStr?: Array<any>): string;

export declare const DEFAULT_PAGE_SETTINGS: {
    page: number;
    rowsPerPage: number;
    totalRows: number;
    totalPages: number;
    limit: number;
    offset: number;
    rows: number;
};
export declare class Paging {
    private setting;
    constructor(setting?: {});
    reset(setting: Object): void;
    hasPaging(rows: number): boolean;
    recordsOffset(): number;
    recordsNumber(seqno: number): number;
    buildPagingModel(options?: {
        totalRows: number;
    }): {
        page: number;
        text: string;
        css: string;
    }[];
}

/* permit.util */
export declare const DEFAULT_PERMITS: {
    all: boolean;
    insert: boolean;
    retrieve: boolean;
    update: boolean;
    delete: boolean;
    import: boolean;
    export: boolean;
    launch: boolean;
    print: boolean;
};
export declare class Permission {
    permits: any;
    constructor(setting?: {});
    canDo(action: string): boolean;
}
export declare function getPermitModel(pid: string): Promise<Permission | undefined>;
export declare function loadPermissions(pid: string): Promise<undefined>;

/* pwd.util */
export declare function randomPassword(): string;
export declare function getAlphabets(text?: string): number;
export declare function getDigits(text?: string): number;
export declare function isDigit(c: string): boolean;
export declare function isLetter(c: string): boolean;
export declare function isLowerCase(c: string): boolean;
export declare function isUpperCase(c: string): boolean;
export declare function indexOfAlphabets(text?: string): number;
export declare function createNewPassword(): string;
export declare function checkNumberOnly(text?: string): boolean;

/* random.util */
export declare const ALPHABETS: string[];
export declare const NUMERICS: string[];
export declare function getRandomNumber(min?: number, max?: number): number;
export declare function random(len?: number, alphabets?: string[]): string;
export declare function randomNumber(len?: number, alphabets?: string[]): string;

export declare class Utilities {
    static readonly NORMAL = 0;
    static readonly INTER = 1;
    static readonly SHORT = 0;
    static readonly LONG = 1;
    static readonly SHORT_MONTH_ARRAY: string[];
    static readonly LONG_MONTH_ARRAY: string[];
    static readonly SHORT_WEEK_DAY: string[];
    static readonly LONG_WEEK_DAY: string[];
    /**
     * To get date in format dd/MM/yyyy
     * @param now Date or undefind
     * @returns string
     */
    static getDateNow(now?: Date): string;
    /**
     * To get time in format HH:mm:ss
     * @param now Date or undefined
     * @returns string
     */
    static getTimeNow(now?: Date): string;
    /**
     * To get datetime in format dd/MM/yyyy HH:mm:ss
     * @param now Date or undefined
     * @returns string
     */
    static getDateTimeNow(now?: Date): string;
    /**
     * To get date in format yyyy-MM-dd
     * @param now Date or undefined
     * @returns string
     */
    static getYMD(now?: Date): string;
    /**
     * To get date in format dd/MM/yyyy
     * @param now Date or undefined
     * @returns string
     */
    static getDMY(now?: Date): string;
    /**
     * To format Date to dd/MM/yyyy or yyyy-MM-dd
     * @param now Date or undefined
     * @param ymd boolean default false
     * @returns string
     */
    static formatDate(now?: Date, ymd?: boolean): string;
    /**
     * To format time HH:mm:ss
     * @param now Date or undefined
     * @returns string
     */
    static formatTime(now?: Date): string;
    /**
     * To format date into dd/MM/yyyy HH:mm:ss or yyyy-MM-dd HH:mm:ss
     * @param now Date or undefined
     * @param ymd boolean default false
     * @returns string
     */
    static formatDateTime(now?: Date, ymd?: boolean): string;
    /**
     * To format time HH:mm:ss
     * @param now Date or undefined
     * @returns string
     */
    static getHMS(now?: Date): string;
    /**
     * To format Date to yyyy-MM-dd
     * @param now Date or undefined
     * @returns string
     */
    static currentDate(now?: Date): string;
    /**
     * To format time to HH:mm:ss
     * @param now Date or undefined
     * @returns string
     */
    static currentTime(now?: Date): string;
    /**
     * To format Date to yyyy-MM-dd HH:mm:ss
     * @param now Date or undefined
     * @returns string
     */
    static currentDateTime(now?: Date): string;
    /**
     * To get current time in milli seconds
     * @param now Date or undefined
     * @returns number
     */
    static currentTimeMillis(now?: Date): number;
    /**
     * To add number of days into Date
     * @param days number
     * @param date Date or undefined
     * @returns Date
     */
    static addDays(days: number, date?: Date): Date;
    /**
     * To compare between date
     * @param adate Date or undefined
     * @param bdate Date or undefined
     * @returns number, -1 = lesser than, 0 = equal , 1 = greater than
     */
    static compareDate(adate?: Date, bdate?: Date): number;
    /**
     * To compare between time
     * @param adate Date or undefined
     * @param bdate Date or undefined
     * @returns number, -1 = lesser than, 0 = equal , 1 = greater than
     */
    static compareTime(adate?: Date, bdate?: Date): number;
    /**
     * To compare between datetime
     * @param adate Date or undefined
     * @param bdate Date or undefined
     * @returns number, -1 = lesser than, 0 = equal , 1 = greater than
     */
    static compareDateTime(adate?: Date, bdate?: Date): number;
    /**
     * To compare string value
     * @param astr string
     * @param bstr string
     * @returns number, -1 = lesser than, 0 = equal , 1 = greater than
     */
    static compareString(astr?: string, bstr?: string): number;
    /**
     * To check string equals with ignore case
     * @param astr string
     * @param bstr string
     * @returns boolean
     */
    static equalsIgnoreCase(astr?: string, bstr?: string): boolean;
    /**
     * To check data is string or not
     * @param value any
     * @returns boolean
     */
    static isString(value: any): boolean;
    /**
     * To check attributes is in object element
     * @param element unknown
     * @param attributes string array
     * @returns boolean
     */
    static hasAttributes: <T extends string>(element: unknown, attributes: T[]) => element is Record<T, unknown>;
    /**
     * To parse integer (especially from string)
     * @param dataValue any
     * @param defaultValue number
     * @returns number
     */
    static parseInteger(dataValue?: any, defaultValue?: number): number | undefined;
    /**
     * To parse float (especially from string)
     * @param dataValue any
     * @param defaultValue number
     * @returns number
     */
    static parseFloat(dataValue?: any, defaultValue?: number): number | undefined;
    /**
     * To parse boolean (especially from string)
     * @param dataValue any
     * @param defaultValue boolean
     * @returns boolean
     */
    static parseBoolean(dataValue?: any, defaultValue?: boolean): boolean | undefined;
    /**
     * To parse Date with data value string in format dd/MM/yyyy, yyyy-MM-dd, dd/MM/yyyy HH:mm:ss, yyyy-MM-dd HH:mm:ss
     * @param dataValue
     * @param defaultValue
     * @returns Date
     */
    static parseDate(dataValue?: any, defaultValue?: Date): Date | undefined;
    /**
     * To parse time with data value string in format HH:mm:ss
     * @param dataValue
     * @param defaultValue
     * @returns Date
     */
    static parseTime(dataValue?: string, defaultValue?: Date): Date | undefined;
    /**
     * get current date/time now
     * @returns Date
     */
    static now(): Date;
    /**
     * try to translate variables in template with foramt ${key} with value in variables
     * @returns string
     */
    static translateVariables(template: string, variables: any): string;
    /**
     * serialize timestamp into string format yyyyMMddHHmmssSSS
     * @returns string
     */
    static serializeTimestamp(now: Date, delimiter?: string, includeMillis?: boolean): string;
    /**
     * To get date format with short or long month
     * @returns string
     */
    static getFormatDate(date?: Date, fortype?: number, delimiter?: string, forstyle?: number, separater?: string): string;
    /**
     * To get date format with short month
     * @returns string
     */
    static getShortDate(date?: Date, delimiter?: string, forstyle?: number): string;
    /**
     * To get date format with long month
     * @returns string
     */
    static getLongDate(date?: Date, delimiter?: string, forstyle?: number): string;
    /**
     * To get week day with short or long format
     * @returns string
     */
    static getWeekDay(date?: Date, fortype?: number): string;
    /**
     * To get short week day
     * @returns string
     */
    static getShortWeekDay(date?: Date): string;
    /**
     * To get long week day
     * @returns string
     */
    static getLongWeekDay(date?: Date): string;
    /**
     * To get week day format
     * @returns string
     */
    static getFormatWeekDate(date?: Date, fortype?: number, delimiter?: string, forstyle?: number, separater?: string): string;
}
declare const bootbox: any;
export { bootbox };
