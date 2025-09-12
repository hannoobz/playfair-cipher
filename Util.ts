import * as fs from "fs";
import * as path from "path";

export default class Util {
	public static pipe<T>(...fns: Array<(arg: T) => T>) {
		return (initialValue: T): T => {
			return fns.reduce((acc, fn) => fn(acc), initialValue);
		};
	}

	public static randomString() {
		let result = '';
		let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
		let charactersLength = characters.length;
		for (let i = 0; i < 25; i++) {
			result += characters.charAt(Math.floor(Math.random() * charactersLength));
		}
		return result;
	}

	public static shuffle(text: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ') {
		let a = text.split(""),
			n = a.length;

		for (let i = n - 1; i > 0; i--) {
			let j = Math.floor(Math.random() * (i + 1));
			let tmp = a[i];
			a[i] = a[j]!;
			a[j] = tmp!;
		}
		return a.join("");
	}

	public static readCipherFile(filePath: string): string {
		const fullPath = path.resolve(filePath);
		if (!fs.existsSync(fullPath)) {
			throw new Error()
		}
		const rawText = fs.readFileSync(fullPath, "utf8");
		return rawText.toUpperCase().replace(/[^A-Z]/g, "");
	}
}
