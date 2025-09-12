import * as path from "path";
import * as fs from "fs"

export default class Precompute {
	public static totalValue: number = 0;
	public static read: Map<string, number> = new Map();
	public static computed: Map<string, number> = new Map();

	public static readFile(txtFilename: string) {
		this.read.clear();
		this.totalValue = 0;

		const fullPath = path.resolve(txtFilename);
		const text = fs.readFileSync(fullPath, "utf8");
		const lines = text.split(/\r?\n/).filter(Boolean);

		for (const line of lines) {
			const [quad, countStr] = line.trim().split(/\s+/);
			const count = parseInt(countStr!, 10);

			if (!isNaN(count)) {
				this.read.set(quad!, count);
				this.totalValue += count;
			}
		}
	}

	public static compute() {
		if (this.totalValue === 0) {
			throw new Error()
		}
		this.computed.clear();
		for (const [quad, count] of this.read.entries()) {
			const probability = count / this.totalValue;
			this.computed.set(quad, Math.log10(probability));
		}
	}

	public static exportToFile(txtFilename: string) {
		if (this.computed.size === 0) {
			throw new Error()
		}
		const lines: string[] = [];
		for (const [quad, logProb] of this.computed.entries()) {
			lines.push(`${quad} ${logProb}`);
		}
		const fullPath = path.resolve(txtFilename);
		fs.writeFileSync(fullPath, lines.join("\n"), "utf8");
	}

	public static readPrecomputed(txtFilename: string) {
		this.computed.clear();

		const fullPath = path.resolve(txtFilename);
		const text = fs.readFileSync(fullPath, "utf8");
		const lines = text.split(/\r?\n/).filter(Boolean);

		for (const line of lines) {
			const [quad, logProbStr] = line.trim().split(/\s+/);
			const logProb = parseFloat(logProbStr!);
			if (!isNaN(logProb)) {
				this.computed.set(quad!, logProb);
			}
		}
	}
}

Precompute.readFile('4grams.txt')
Precompute.compute()
Precompute.exportToFile('4grams_logprob.txt')



