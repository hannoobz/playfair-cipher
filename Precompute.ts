import fs = require('fs')
import path = require('path')

class Precompute {
	public static readFile(txtFilename: string) {
		const read = new Map<string, number>();
		let totalValue = 0;
		const fullPath = path.resolve(txtFilename);
		const text = fs.readFileSync(fullPath, "utf8");
		const lines = text.split(/\r?\n/).filter(Boolean);
		for (const line of lines) {
			const [quad, countStr] = line.trim().split(/\s+/);
			const count = parseInt(countStr!, 10);
			if (!isNaN(count)) {
				read.set(quad!, count);
				totalValue += count;
			}
		}
		return { read, totalValue, txtFilename };
	}

	public static compute(data: { read: Map<string, number>, totalValue: number, txtFilename: string }) {
		const { read, totalValue, txtFilename } = data;
		if (totalValue === 0) {
			throw new Error("totalValue cannot be zero.");
		}
		const computed = new Map<string, number>();
		for (const [quad, count] of read.entries()) {
			const probability = count / totalValue;
			computed.set(quad, Math.log10(probability));
		}
		return { ...data, computed };
	}

	public static exportToFile(data: { computed: Map<string, number>, txtFilename: string }) {
		const { computed, txtFilename } = data;
		if (computed.size === 0) {
			throw new Error("No computed data to export.");
		}
		const lines = Array.from(computed.entries()).map(
			([quad, logProb]) => `${quad} ${logProb}`
		);
		const fullPath = path.resolve(`logprob-${txtFilename}`);
		fs.writeFileSync(fullPath, lines.join("\n"), "utf8");
		return data;
	}

	public static readPrecomputed(txtFilename: string): Map<string, number> {
		const computed = new Map<string, number>();
		const fullPath = path.resolve(txtFilename);
		const text = fs.readFileSync(fullPath, "utf8");
		const lines = text.split(/\r?\n/).filter(Boolean);
		for (const line of lines) {
			const [quad, logProbStr] = line.trim().split(/\s+/);
			const logProb = parseFloat(logProbStr!);
			if (!isNaN(logProb)) {
				computed.set(quad!, logProb);
			}
		}
		return computed;
	}
}

export = Precompute
