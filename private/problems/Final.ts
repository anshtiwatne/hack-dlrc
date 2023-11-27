const sentence =
	'while Hosting hackDLRC, ansh And Aneesh faced An issue that They need your help With, your first Clue lies In this sentence And The Browser Console.'

const link = {
	'÷': [
		2102904856, 2345547724, 2345547724, 2264666768, 2325327485, 1172773862,
		950351233, 950351233, 2102904856, 1961363183, 2001803661, 2163565573,
		930130994, 2022023900, 2183785812, 2305107246, 2001803661, 930130994,
		2123125095, 2224226290, 950351233, 2062464378, 2123125095, 2224226290,
		1961363183, 2183785812, 1981583422, 2244446529, 2325327485, 2325327485,
	],
}

const key = parseInt(
	sentence
		.split(' ')
		.map((word) => Number(word[0] == word[0].toUpperCase()))
		.join(''),
	2,
)

const decrypted = link['÷']
	.map((num) => String.fromCharCode(num / key))
	.join('')

console.log(decrypted)
