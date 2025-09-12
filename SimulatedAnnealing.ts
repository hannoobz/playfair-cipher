import Precompute from "./Precompute.js"
import Util from "./Util.js"

export default class SimulatedAnnealing {
	private fitnessMap: Map<string, number>
	private parentKey: string = Util.shuffle()
	private cipherText: string
	private currentFitness: number = Number.NEGATIVE_INFINITY
	private temperature: number = 100
	private temperatureChangeRate: number = 1
	private step: number = 100

	constructor(logprobFileName: string, cipherTextFilename: string) {
		Precompute.readPrecomputed(logprobFileName)
		this.fitnessMap = Precompute.computed
		this.cipherText = Util.readCipherFile(cipherTextFilename)
	}

	public setTemperature(v: number) {
		this.temperature = v;
	}

	public setTemperatureChangeRate(v: number) {
		this.temperatureChangeRate = v;
	}

	public setStep(v: number) {
		this.step = v;
	}

	// public solve() {
	// 	const resetter temp = this.temperature
	// 	const
	// 	for (; this.temperature > 0; this.temperature -= this.temperatureChangeRate) {
	// 		for ()
	// 	}
	// }
}
