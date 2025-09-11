export default class Playfair {
	public static cipher(plaintext: string, key: string): string {
		function cipherTwoChar(twoChar: string, key: string): string {
			function mod5(n: number): number {
				return ((n % 5) + 5) % 5;
			}
			const firstLoc = key.indexOf(twoChar[0]!)
			const secondLoc = key.indexOf(twoChar[1]!)

			const firstRow = Math.floor(firstLoc / 5)
			const secondRow = Math.floor(secondLoc / 5)

			const firstCol = mod5(firstLoc)
			const secondCol = mod5(secondLoc)

			if (firstRow == secondRow)
				return key[(firstRow * 5) + mod5(firstCol + 1)]! + key[(secondRow * 5) + mod5(secondCol + 1)]!

			if (firstCol == secondCol)
				return key[(mod5(firstRow + 1) * 5) + firstCol]! + key[(mod5(secondRow + 1) * 5) + secondCol]!

			else
				return key[(firstRow * 5) + secondCol]! + key[(secondRow * 5) + firstCol]
		}
		return plaintext.match(/.{1,2}/g)?.map((el) => cipherTwoChar(el, key)).join("") ?? "";
	}

	public static decipher(ciphertext: string, key: string): string {
		function decipherTwoChar(twoChar: string, key: string): string {
			function mod5(n: number): number {
				return ((n % 5) + 5) % 5;
			}
			const firstLoc = key.indexOf(twoChar[0]!)
			const secondLoc = key.indexOf(twoChar[1]!)

			const firstRow = Math.floor(firstLoc / 5)
			const secondRow = Math.floor(secondLoc / 5)

			const firstCol = mod5(firstLoc)
			const secondCol = mod5(secondLoc)

			if (firstRow == secondRow)
				return key[(firstRow * 5) + mod5(firstCol - 1)]! + key[(secondRow * 5) + mod5(secondCol - 1)]!

			if (firstCol == secondCol)
				return key[mod5(firstRow - 1) * 5 + firstCol]! + key[mod5(secondRow - 1) * 5 + secondCol]!

			else
				return key[(firstRow * 5) + secondCol]! + key[(secondRow * 5) + firstCol]
		}
		return ciphertext.match(/.{1,2}/g)?.map((el) => decipherTwoChar(el, key)).join("") ?? "";
	}
}
