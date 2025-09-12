import Playfair from "./Playfair.js"
import Preprocess from "./Preprocess.js"
import Util from "./Util.js"

const p = Preprocess
const pf = Playfair
const preprocessor = Util.pipe(
	p.toUpperCase,
	p.spaceRemover,
	p.jReplacer,
	p.pairXFill,
	p.oddXFill
)

const keymaker = Util.pipe(
	p.toUpperCase,
	p.jRemover,
	p.spaceRemover,
	p.dupeRemover,
	p.alphabetFill
)

console.log(Util.shuffle())


// const key = keymaker("jalan ganesha sepuluh")
// const plaintext = preprocessor("temui ibu nanti malam")
//
// const ciphertext = pf.cipher(plaintext, key)
//
// const deciphertext = pf.decipher(ciphertext, key)
//
// console.log(ciphertext)
// console.log(deciphertext)
//
// console.time("cipher");
// Playfair.cipher("A".repeat(21000), "ABCDEFGHIKLMNOPQRSTUVWXYZ");
// console.timeEnd("cipher");
//
//
// const randomize = keymaker(Util.randomString())
// console.log(randomize)
// console.log(Util.shuffle(randomize))
