import fs = require('fs')
import Util = require('./Util')
import Playfair = require('./Playfair')

class SimulatedAnnealing {
	public fitnessMap: Map<string, number>
	private parentKey: string
	public cipherText: string
	private currentFitness: number
	private startingTemperature: number
	private temperatureChangeRate: number
	private step: number

	constructor(
		fitnessMap: Map<string, number>,
		cipherTextFilename: string,
		parentKey: string,
		startingTemperature: number = 30,
		temperatureChangeRate: number = 0.01,
		step: number = 2000,
	) {
		this.fitnessMap = fitnessMap
		this.parentKey = parentKey
		this.cipherText = Util.readCipherFile(cipherTextFilename)
		this.currentFitness = this.calculateFitness(this.cipherText, this.parentKey)
		this.startingTemperature = startingTemperature
		this.temperatureChangeRate = temperatureChangeRate
		this.step = step
	}

	private calculateFitness(cipherText: string, key: string): number {
		const decryptedQuadWindow = Util.makeQuadWindow(Playfair.decipher(cipherText, key))
		return decryptedQuadWindow.reduce((acc, curr) => acc + (this.fitnessMap.get(curr) ?? -10), 0);
	}

	public solve(filename: string) {
		console.log(this.parentKey, this.currentFitness)
		for (let temp = this.startingTemperature; temp > 0; temp -= this.temperatureChangeRate) {
			for (let i = 0; i < this.step; i++) {
				const childKey = Util.mutateKey(this.parentKey)
				const localFitness = this.calculateFitness(this.cipherText, childKey)
				console.log(`TEMP: ${temp} || STEP: ${i} || FITNESS: ${localFitness} || ${childKey}`)
				const delta = localFitness - this.currentFitness
				if (delta > 0) {
					this.parentKey = childKey
					this.currentFitness = localFitness
				} else {
					const prob = Math.exp(delta / temp);
					if (Math.random() < prob) {
						this.parentKey = childKey;
						this.currentFitness = localFitness;
					}
				}
			}
		}
		console.log(`KEY:${this.parentKey} || FITNESS: ${this.currentFitness}`)
		fs.appendFile(filename, this.parentKey + ' ' + this.currentFitness + ' \n', (err) => {
			if (err) {
				console.log(err)
			}
			else {
				console.log(`KEY APPENDED TO FILE SUCCESSFULlY`)
			}
		})
	}
}

export = SimulatedAnnealing
