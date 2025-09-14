class Preprocess {
	public static toUpperCase(text: string): string {
		return text.toUpperCase()
	}

	public static spaceRemover(text: string): string {
		return text.split("").reduce((acc, char) => {
			return acc + (char === ' ' ? '' : char);
		}, "");
	}

	public static jReplacer(text: string): string {
		return text.split("").reduce((acc, char) => {
			return acc + (char === 'J' ? 'I' : char)
		}, "").toString()
	}

	public static pairXFill(text: string): string {
		if (text === '') return '';
		return text.split("").reduce((acc, char) => {
			if (acc.slice(-1) == char) {
				return acc + 'X' + char
			}
			else return acc + char
		}, "").toString()
	}

	public static oddXFill(text: string): string {
		return text.length % 2 == 0 ? text : text + 'X';
	}

	public static alphabetFill(text: string, current: number = 65): string {
		if (current == 91) return text
		const character = String.fromCharCode(current)
		if (character == 'J') return Preprocess.alphabetFill(text, current + 1)
		return Preprocess.alphabetFill(text + (text.includes(character) ? "" : character), current + 1)
	}

	public static dupeRemover(text: string): string {
		return text.split("").reduce((acc, char) => {
			return acc + (acc.includes(char) ? "" : char)
		})
	}

	public static jRemover(text: string): string {
		return text.split("").reduce((acc, char) => {
			return acc + (char === 'J' ? '' : char)
		}, "").toString()
	}
}

export = Preprocess

