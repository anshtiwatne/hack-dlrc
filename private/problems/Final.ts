const MAP_F = new Map<String, String>([
	[' ', 'f'],
	['!', '['],
	['"', ']'],
	['#', '^'],
	['$', 'A'],
	['%', ':'],
	['&', '!'],
	["'", 'c'],
	['(', '/'],
	[')', '\\'],
	['*', '3'],
	['+', '*'],
	[',', 'T'],
	['-', 'i'],
	['.', 'S'],
	['/', 'x'],
	['0', 'Q'],
	['1', 'I'],
	['2', 'l'],
	['3', '>'],
	['4', 'W'],
	['5', 'j'],
	['6', 'M'],
	['7', '@'],
	['8', 'o'],
	['9', 'b'],
	[':', 'z'],
	[';', '('],
	['<', 'E'],
	['=', 's'],
	['>', 'n'],
	['?', 'O'],
	['@', 'L'],
	['A', 'J'],
	['B', '}'],
	['C', 'R'],
	['D', '~'],
	['E', ','],
	['F', 'D'],
	['G', '7'],
	['H', 'G'],
	['I', 'H'],
	['J', '2'],
	['K', '_'],
	['L', 'h'],
	['M', 'X'],
	['N', "'"],
	['O', 'B'],
	['P', 'm'],
	['Q', 'N'],
	['R', '"'],
	['S', '0'],
	['T', 'F'],
	['U', 'a'],
	['V', '6'],
	['W', 'Z'],
	['X', '8'],
	['Y', '%'],
	['Z', '&'],
	['[', '5'],
	['\\', 'P'],
	[']', 'w'],
	['^', ')'],
	['_', 'd'],
	['`', 'K'],
	['a', 'r'],
	['b', '4'],
	['c', ' '],
	['d', '{'],
	['e', 'Y'],
	['f', 'y'],
	['g', 'U'],
	['h', 'u'],
	['i', '9'],
	['j', 'g'],
	['k', 'p'],
	['l', '`'],
	['m', '='],
	['n', ';'],
	['o', 't'],
	['p', '|'],
	['q', '$'],
	['r', 'V'],
	['s', 'k'],
	['t', '+'],
	['u', 'e'],
	['v', 'v'],
	['w', '-'],
	['x', '1'],
	['y', '<'],
	['z', '?'],
	['{', 'C'],
	['|', '#'],
	['}', '.'],
	['~', 'q'],
])

const MAP_B = new Map<String, String>([
	['f', ' '],
	['[', '!'],
	[']', '"'],
	['^', '#'],
	['A', '$'],
	[':', '%'],
	['!', '&'],
	['c', "'"],
	['/', '('],
	['\\', ')'],
	['3', '*'],
	['*', '+'],
	['T', ','],
	['i', '-'],
	['S', '.'],
	['x', '/'],
	['Q', '0'],
	['I', '1'],
	['l', '2'],
	['>', '3'],
	['W', '4'],
	['j', '5'],
	['M', '6'],
	['@', '7'],
	['o', '8'],
	['b', '9'],
	['z', ':'],
	['(', ';'],
	['E', '<'],
	['s', '='],
	['n', '>'],
	['O', '?'],
	['L', '@'],
	['J', 'A'],
	['}', 'B'],
	['R', 'C'],
	['~', 'D'],
	[',', 'E'],
	['D', 'F'],
	['7', 'G'],
	['G', 'H'],
	['H', 'I'],
	['2', 'J'],
	['_', 'K'],
	['h', 'L'],
	['X', 'M'],
	["'", 'N'],
	['B', 'O'],
	['m', 'P'],
	['N', 'Q'],
	['"', 'R'],
	['0', 'S'],
	['F', 'T'],
	['a', 'U'],
	['6', 'V'],
	['Z', 'W'],
	['8', 'X'],
	['%', 'Y'],
	['&', 'Z'],
	['5', '['],
	['P', '\\'],
	['w', ']'],
	[')', '^'],
	['d', '_'],
	['K', '`'],
	['r', 'a'],
	['4', 'b'],
	[' ', 'c'],
	['{', 'd'],
	['Y', 'e'],
	['y', 'f'],
	['U', 'g'],
	['u', 'h'],
	['9', 'i'],
	['g', 'j'],
	['p', 'k'],
	['`', 'l'],
	['=', 'm'],
	[';', 'n'],
	['t', 'o'],
	['|', 'p'],
	['$', 'q'],
	['V', 'r'],
	['k', 's'],
	['+', 't'],
	['e', 'u'],
	['v', 'v'],
	['-', 'w'],
	['1', 'x'],
	['<', 'y'],
	['?', 'z'],
	['C', '{'],
	['#', '|'],
	['.', '}'],
	['q', '~'],
])

const PRIMES: number[] = [
	2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71,
	73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151,
	157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233,
	239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317,
	331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419,
	421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499,
]

function encrypt(email: string) {
	return email
		.split('')
		.map((c) => MAP_F.get(c) as string) // Translate Forward
		.map((c) => c?.charCodeAt(0) - 32)
		.map((n) => PRIMES[n])
		.map((n) => n.toString(16))
		.join('-')
		.split('')
		.map((c) => MAP_B.get(c) as string) // Translate Backward
		.join('')
}
