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


# inverse functions

def unhex_letters(string: str) -> list[int]:
    return [int(x, 16) for x in string.split("-")]

def undo_math(xs: list[int]) -> str:
    a = lambda x: x + 32
    b = lambda x: PRIMES.index(x)

    return "".join([chr(a(b(x))) for x in xs])

email: str = "palash.bmh@gmail.com"
# encrypted: str = "x_ wxU[wxGwxU[wxG9wx9GwuiwbGwV_wx9Gw'xw xwV_wxU[wVxwxGwuiwJwx9xwV_"
print(map_backward(hex_letters(do_math(map_forward(email)))))
# print(map_forward(unhex_letters(undo_math(map_backward(encrypted)))))
