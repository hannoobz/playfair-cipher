class Playfair {
	public static mod5(n: number): number {
		return ((n % 5) + 5) % 5;
	}

	public static cipherTwoChar(twoChar: string, key: string): string {
		const firstLoc = key.indexOf(twoChar[0]!)
		const secondLoc = key.indexOf(twoChar[1]!)
		const firstRow = Math.floor(firstLoc / 5)
		const secondRow = Math.floor(secondLoc / 5)
		const firstCol = Playfair.mod5(firstLoc)
		const secondCol = Playfair.mod5(secondLoc)
		if (firstRow == secondRow)
			return key[(firstRow * 5) + Playfair.mod5(firstCol + 1)]! + key[(secondRow * 5) + Playfair.mod5(secondCol + 1)]!
		if (firstCol == secondCol)
			return key[(Playfair.mod5(firstRow + 1) * 5) + firstCol]! + key[(Playfair.mod5(secondRow + 1) * 5) + secondCol]!
		else
			return key[(firstRow * 5) + secondCol]! + key[(secondRow * 5) + firstCol]
	}

	public static cipher(plaintext: string, key: string): string {
		return plaintext.match(/.{1,2}/g)?.map((el) => Playfair.cipherTwoChar(el, key)).join("") ?? "";
	}

	public static decipherTwoChar(twoChar: string, key: string): string {
		const firstLoc = key.indexOf(twoChar[0]!)
		const secondLoc = key.indexOf(twoChar[1]!)
		const firstRow = Math.floor(firstLoc / 5)
		const secondRow = Math.floor(secondLoc / 5)
		const firstCol = Playfair.mod5(firstLoc)
		const secondCol = Playfair.mod5(secondLoc)
		if (firstRow == secondRow)
			return key[(firstRow * 5) + Playfair.mod5(firstCol - 1)]! + key[(secondRow * 5) + Playfair.mod5(secondCol - 1)]!
		if (firstCol == secondCol)
			return key[Playfair.mod5(firstRow - 1) * 5 + firstCol]! + key[Playfair.mod5(secondRow - 1) * 5 + secondCol]!
		else
			return key[(firstRow * 5) + secondCol]! + key[(secondRow * 5) + firstCol]
	}

	public static decipher(ciphertext: string, key: string): string {
		return ciphertext.match(/.{1,2}/g)?.map((el) => Playfair.decipherTwoChar(el, key)).join("") ?? "";
	}
}

export = Playfair
