import random

random.seed(42)

letters = [chr(i) for i in range(32, 127)]
shuffled_letters = letters.copy()
random.shuffle(shuffled_letters)

MAPPING_F = dict(zip(letters, shuffled_letters))
MAPPING_B = {MAPPING_F[a]: a for a in MAPPING_F.keys()}

PRIMES = [i for i in range(2, 500) if all([i % j for j in range(2, i // 2 + 1)])]


def map_forward(string: str) -> str:
    return "".join([MAPPING_F[c] for c in string])


def do_math(string: str) -> list[int]:
    a = lambda x: x - 32
    b = lambda x: PRIMES[x]

    return [(b(a(ord(i)))) for i in string]


def hex_letters(xs: list[int]) -> str:
    return "-".join([hex(x).lstrip("0x") for x in xs])


def map_backward(string: str) -> str:
    return "".join([MAPPING_B[c] for c in string])


email: str = "aneesh1701@gmail.com"
print(map_backward(hex_letters(do_math(map_forward(email)))))
