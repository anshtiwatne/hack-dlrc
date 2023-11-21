from random import randint, random
import json


def generate_problem() -> str:
    ds = "0123456789ABCDEF"
    out = ""
    for _ in range(256):
        l = randint(8, 12)
        b = randint(1, 16)
        s = "+" if random() > 0.30 else "-"  # 70% chance it is a +

        n = ""
        if b == 1:  # base 1 edge case
            n = "".join([ds[1] for _ in range(l)])
        else:
            n = "".join([ds[randint(0, b - 1)] for _ in range(l)])  # yeah, fight me
        out += f"{s} {b} {n}\n"
    return out


def solve(inp: str) -> int:
    out = 0
    for l in inp.splitlines():
        s, b, m = l.split()
        b = int(b)

        out += (int(m, b) if b > 1 else len(m)) * (1 if s == "+" else -1)
    return out


if __name__ == "__main__":
    p = generate_problem()
    s = solve(p)
    print(json.dumps({"problem": p, "solution": s}))
