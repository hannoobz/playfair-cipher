import yargs = require("yargs");
import helpers = require("yargs/helpers");
import Precompute = require("./Precompute");
import Preprocess = require("./Preprocess");
import Util = require("./Util");
import SimulatedAnnealing = require("./SimulatedAnnealing");

type PrecomputeArgs = {
	input: string;
};

type SolveArgs = {
	logprob: string;
	cipher: string;
	keys: string;
	guidedKey?: string;
	temp?: number;
	rate?: number;
	steps?: number;
};

const ut = Util;
const pp = Preprocess;
const pc = Precompute;
const sa = SimulatedAnnealing;

const makeKey = ut.pipe(
	pp.toUpperCase,
	pp.spaceRemover,
	pp.jRemover,
	pp.dupeRemover,
	pp.alphabetFill
);

const argv = yargs(helpers.hideBin(process.argv))
	.command<PrecomputeArgs>(
		"precompute",
		"Precompute log probabilities from an n-gram file",
		(yargs) =>
			yargs.option("input", {
				alias: "i",
				type: "string",
				demandOption: true,
				describe: "Input text file containing n-grams and counts",
			})
	)
	.command<SolveArgs>(
		"solve",
		"Run simulated annealing to solve a cipher",
		(yargs) =>
			yargs
				.option("logprob", {
					type: "string",
					demandOption: true,
					describe: "Precomputed log probabilities file",
				})
				.option("cipher", {
					type: "string",
					demandOption: true,
					describe: "Ciphertext file to decipher",
				})
				.option("keys", {
					type: "string",
					demandOption: true,
					describe: "Output file to append solved keys",
				})
				.option("guidedKey", {
					type: "string",
					describe: "Initial guided key (Playfair key)",
				})
				.option("temp", {
					type: "number",
					default: 30,
					describe: "Starting temperature (default: 30)",
				})
				.option("rate", {
					type: "number",
					default: 0.01,
					describe: "Temperature decay rate (default: 0.01)",
				})
				.option("steps", {
					type: "number",
					default: 2000,
					describe: "Steps per temperature iteration (default: 2000)",
				})
	)
	.demandCommand(1, "You need to specify either 'precompute' or 'solve'")
	.help()
	.parseSync();

const command = argv._[0] as string;

if (command === "precompute") {
	console.log(`Precomputing log probabilities from: ${argv.input}`);
	const precomputeLogProb = ut.pipe(pc.readFile, pc.compute, pc.exportToFile);
	precomputeLogProb(argv.input as string);
	console.log(`Log probabilities saved to logprob-${argv.input}`);
}

if (command === "solve") {
	console.log(`Loading log probabilities from: ${argv.logprob}`);
	const logProb = pc.readPrecomputed(argv.logprob as string);

	const key = makeKey((argv.guidedKey ?? ut.shuffle()) as string);

	console.log(`Starting simulated annealing...`);
	const simulatedAnnealingInstance = new sa(
		logProb,
		argv.cipher as string,
		key,
		argv.temp as number,
		argv.rate as number,
		argv.steps as number
	);
	simulatedAnnealingInstance.solve(argv.keys as string);
}


