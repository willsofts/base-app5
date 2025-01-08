import $ from "jquery";
import { getApiUrl } from "./app.info";
import { getAccessorInfo } from "./messenger";
import CryptoJS from "crypto-js";
import BigInteger from "bigi";

const getPrimes = function (min: number, max: number) {
	const result = Array(max + 1).fill(0).map((_, i) => i);
	for (let i = 2; i <= Math.sqrt(max + 1); i++) {
		for (let j = i ** 2; j < max + 1; j += i) delete result[j];
	}
	return Object.values(result.slice(min));
};
	
const getRandomNum = function(min: number, max: number) {
	return Math.floor(Math.random() * (max - min + 1) + min);
};
	
const getRandomPrime = function (min: number, max: number) {
	const primes = getPrimes(min, max);
	return primes[getRandomNum(0, primes.length - 1)];
};
	
const getPrimeNumber = function() {
	return getRandomPrime(1000,10000);
};
	
export class DH {
    prime: string;
    generator: string;
    privateKey: string;
    publicKey: string;
    sharedKey: string;
    otherPublicKey: string;

    constructor() {
		this.prime = ""+getPrimeNumber();
		this.generator = ""+getPrimeNumber();
		this.privateKey = ""+getPrimeNumber();
		this.publicKey = ""+getPrimeNumber();
		this.sharedKey = ""+getPrimeNumber();
		this.otherPublicKey = ""+getPrimeNumber();
	}

	public encryptText(word: string, keyBase64: string) {
		let key = CryptoJS.enc.Base64.parse(keyBase64);
		let srcs = CryptoJS.enc.Utf8.parse(word);
		let encrypted = CryptoJS.AES.encrypt(srcs, key, {mode:CryptoJS.mode.ECB,padding: CryptoJS.pad.Pkcs7});
		return encrypted.toString();
	}

	public decryptText(word: string, keyBase64: string) {
		let key = CryptoJS.enc.Base64.parse(keyBase64);
		let decrypt = CryptoJS.AES.decrypt(word, key, {mode:CryptoJS.mode.ECB,padding: CryptoJS.pad.Pkcs7});
		return CryptoJS.enc.Utf8.stringify(decrypt).toString();
	}

	public encrypt(word: string) {
		let hash = CryptoJS.SHA256(this.sharedKey);
		let keyBase64 = hash.toString(CryptoJS.enc.Base64);
		let key = CryptoJS.enc.Base64.parse(keyBase64);
		let srcs = CryptoJS.enc.Utf8.parse(word);
		let encrypted = CryptoJS.AES.encrypt(srcs, key, {mode:CryptoJS.mode.ECB,padding: CryptoJS.pad.Pkcs7});
		return encrypted.toString();
	}

	public decrypt(word: string) {
		let hash = CryptoJS.SHA256(this.sharedKey);
		let keyBase64 = hash.toString(CryptoJS.enc.Base64);
		let key = CryptoJS.enc.Base64.parse(keyBase64);
		let decrypt = CryptoJS.AES.decrypt(word, key, {mode:CryptoJS.mode.ECB,padding: CryptoJS.pad.Pkcs7});
		return CryptoJS.enc.Utf8.stringify(decrypt).toString();
	}
	
	public computePublicKey() {	
		let G = new BigInteger(this.generator,undefined,undefined);
		let P = new BigInteger(this.prime,undefined,undefined);
		let a = new BigInteger(this.privateKey,undefined,undefined);
		let ap = G.modPowInt(a, P);
		this.publicKey = ap.toString();
	}

	public computeSharedKey() {
		let P = new BigInteger(this.prime,undefined,undefined);
		let a = new BigInteger(this.privateKey,undefined,undefined);
		let bp = new BigInteger(this.otherPublicKey,undefined,undefined);		
		let ashare = bp.modPowInt(a, P);
		this.sharedKey = ashare.toString();
	}
	
	public compute() {
		this.computePublicKey();
		this.computeSharedKey();
	}
	
	public requestGenerator(callback?: Function, aurl?: string) {
		this.requestPublicKey(this,callback,aurl);
	}

	public getAccessorInfo() {
		return getAccessorInfo();
	}

	public getAccessorToken() {
		let json = this.getAccessorInfo();
		if(json && json.authtoken) {
			return json.authtoken;
		}
		return "";
	}
	
	public requestPublicKey(dh?: DH, callback?: Function, aurl?: string) {
		if(!aurl) aurl = getApiUrl()+"/api/crypto/dh";
		let authtoken = this.getAccessorToken();
		$.ajax({
			url: aurl,
			type: "POST",
			dataType: "json",
			headers : { "authtoken": authtoken },
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			error : (transport,status,errorThrown) => {
				console.log(errorThrown);
				if(callback) callback(false,errorThrown);
			},
			success: (data,status,transport) => {
				console.log(transport.responseText);
				if(dh && data.body.info) {
					let info = data.body.info;
					dh.prime = info.prime;
					dh.generator = info.generator;
					dh.otherPublicKey = info.publickey;
					dh.compute();
					dh.submitPublicKey();
				}	
				if(callback) callback(true,data,transport);
			}
		});	
	}
	
	public submitPublicKey(callback?: Function, aurl?: string) {
		if(!aurl) aurl = getApiUrl()+"/api/crypto/dh";
		let authtoken = this.getAccessorToken();
		$.ajax({
			url: aurl,
			type: "POST",
			data: {
				publickey: this.publicKey
			},
			dataType: "json",
			headers : { "authtoken": authtoken },
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			error : (transport,status,errorThrown) => {
				console.log(errorThrown);
				if(callback) callback(false,errorThrown);
			},
			success: (data,status,transport) => {
				console.log(transport.responseText);
				if(callback) callback(true,transport);
			}
		});		
	}

	public updatePublicKey(callback?: Function, aurl?: string) {
		if(!aurl) aurl = getApiUrl()+"/api/crypto/update";
		let authtoken = this.getAccessorToken();
		$.ajax({
			url: aurl,
			type: "POST",
			data: {
				publickey: this.publicKey
			},
			dataType: "json",
			headers : { "authtoken": authtoken },
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			error : (transport,status,errorThrown) => {
				console.log(errorThrown);
				if(callback) callback(false,errorThrown);
			},
			success: (data,status,transport) => {
				console.log(transport.responseText);
				if(callback) callback(true,transport);
			}
		});		
	}

}
