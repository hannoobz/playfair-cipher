# **Playfair Cipher Solver**

A **TypeScript CLI tool** for solving Playfair cipher text using **simulated annealing**.  
This project includes tools to:

- **Precompute log probabilities** from N-gram frequency files.
- **Run a solver** that attempts to break Playfair ciphers using a heuristic search.
- **Build custom Playfair keys** via preprocessing utilities.

---

## **Features**
- 🔹 Modular design with separate components:
  - `Precompute` — Generate log probabilities from 4-gram datasets
  - `SimulatedAnnealing` — Heuristic solver for deciphering ciphertext
  - `Playfair` — Encryption/decryption implementation for Playfair cipher
  - `Preprocess` — Utility functions for key sanitization and transformation
  - `Util` — Functional helpers like `pipe`
- 🔹 Supports custom configurations:
  - Adjustable temperature, decay rate, and iteration steps for annealing.
  - Flexible input/output filenames.

---

## **Installation**

### **1. Clone the Repository**
```bash
git clone https://github.com/hannoobz/playfair-cipher.git
cd playfair-cipher
````

### **2. Install Dependencies**

```bash
npm install
```

### **3. Build the Project**

```bash
npm run build
```

This compiles TypeScript files into the `dist/` folder.

---

## **Usage**

The project provides a single CLI entry point: `app.js`.

Run it through `npm run dev` or directly with `node dist/app.js`.

---

### **1. Precompute N-Gram Log Probabilities**

Before solving, you must precompute a log probability file from an **N-gram frequency dataset**.

#### Command:

```bash
npm run precompute --  --input=4grams.txt
```

#### Example Input (`4grams.txt`):

```
TION 13168375
NTHE 11234972
THER 10218035
THAT 8980536
OFTH 8132597
FTHE 8100836
THES 7717675
```
This example is taken from PracticalCryptography

http://practicalcryptography.com/cryptanalysis/text-characterisation/quadgrams/

#### Output:

Creates a new file named:

```
logprob-4grams.txt
```

---

### **2. Solve a Cipher**

Once you have `logprob-4grams.txt`, run the solver to decrypt a ciphertext file.

#### Command:

```bash
npm run solve --logprob=logprob-4grams.txt --cipher=cipher.txt --keys=keys.txt --guidedKey=QWERTYUIOPASDFGHKLZXCVBNM
```

#### Options:

| Option        | Type   | Required | Default | Description                               |
| ------------- | ------ | -------- | ------- | ----------------------------------------- |
| `--logprob`   | string | ✅ Yes    | -       | Precomputed log probability file          |
| `--cipher`    | string | ✅ Yes    | -       | Ciphertext file to decrypt                |
| `--keys`      | string | ✅ Yes    | -       | Output file where best keys will be saved |
| `--guidedKey` | string | ❌ No     | Randomized string       | Initial Playfair key                      |
| `--temp`      | number | ❌ No     | 30      | Starting temperature for annealing        |
| `--rate`      | number | ❌ No     | 0.01    | Temperature decay rate                    |
| `--steps`     | number | ❌ No     | 2000    | Steps per temperature iteration           |

---

### **Example Workflow**

#### Step 1: Precompute Log Probabilities

```bash
npm run precompute --  --input=4grams.txt
```

Output:

```
logprob-4grams.txt
```

---

#### Step 2: Prepare Ciphertext

Create a `cipher.txt` file containing the Playfair cipher text you want to decrypt:

```
BMODZBXDNABEKUDMUIXMMOUVIF
```

---

#### Step 3: Solve

```bash
npm run solve --  \
  --logprob=logprob-4grams.txt \
  --cipher=cipher.txt \
  --keys=keys.txt \
  --guidedKey=QWERTYUIOPASDFGHKLZXCVBNM \
  --temp=10 \
  --rate=0.5 \
  --steps=100
```

The program will log its progress and append the best key found to `keys.txt`.

---

#### Author

**M. Hanief Fatkhan Nashrullah**

Email: [13522100@std.stei.itb.ac.id](mailto:13522100@std.stei.itb.ac.id)


#### Disclaimer

This is **just an implementation** in TypeScript based on the article:
[Practical Cryptography - Cryptanalysis of the Playfair Cipher](http://www.practicalcryptography.com/cryptanalysis/stochastic-searching/cryptanalysis-playfair/)


