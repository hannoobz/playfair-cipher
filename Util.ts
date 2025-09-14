import path = require("path");
import fs = require("fs")

class Util {
	public static pipe<A, B>(f1: (a: A) => B): (a: A) => B;
	public static pipe<A, B, C>(f1: (a: A) => B, f2: (a: B) => C): (a: A) => C;
	public static pipe<A, B, C, D>(f1: (a: A) => B, f2: (a: B) => C, f3: (a: C) => D): (a: A) => D;
	public static pipe<A, B, C, D, E>(f1: (a: A) => B, f2: (a: B) => C, f3: (a: C) => D, f4: (a: D) => E): (a: A) => E;
	public static pipe<A, B, C, D, E, F>(
		f1: (a: A) => B,
		f2: (a: B) => C,
		f3: (a: C) => D,
		f4: (a: D) => E,
		f5: (a: E) => F
	): (a: A) => F;

	public static pipe(...fns: Function[]) {
		return (input: unknown) => fns.reduce((acc, fn) => fn(acc), input);
	}

	public static mutateKey(key: string): string {
		const arr = key.split('');
		const i = Math.floor(Math.random() * 25);
		const j = Math.floor(Math.random() * 25);
		[arr[i]!, arr[j]!] = [arr[j]!, arr[i]!];
		return arr.join('');
	}

	public static shuffle(text: string = 'ABCDEFGHIKLMNOPQRSTUVWXYZ') {
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

	// Stack limit problem, no recursion allowed here

	// public static makeQuadWindow(text: string): string[] {
	// 	if (text.length <= 4) return [text]
	// 	return [text.slice(0, 4)].concat(this.makeQuadWindow(text.slice(1)))
	// }

	public static makeQuadWindow(text: string): string[] {
		const result: string[] = [];
		for (let i = 0; i <= text.length - 4; i++) {
			result.push(text.slice(i, i + 4));
		}
		return result;
	}
}

export = Util
