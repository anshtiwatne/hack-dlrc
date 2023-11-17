from random import randint, random

ds = "0123456789ABCDEF"
for _ in range(256):
    l = randint(8, 12)
    b = randint(1, 16)
    s = "+" if random() > 0.30 else "-"  # 70% chance it is a +

    n = ""
    if b == 1:  # base 1 edge case
        n = "".join([ds[1] for _ in range(l)])
    else:
        n = "".join([ds[randint(0, b - 1)] for _ in range(l)])  # yeah, fight me
    print(f"{s} {b} {n}")
