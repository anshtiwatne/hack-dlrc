from random import random, randint
import json
import math


def generate_problem():
    out = ""
    for _ in range(2048):  # we can go wild with this one
        p = random()

        if p < 0.60:  # 60% chance it North or East
            out += "NE"[randint(0, 1)] + "\n"
        if p < 0.98:  # 38% chance it is West or South
            out += "WS"[randint(0, 1)] + "\n"
        else:  # 2% chance it is a reset
            out += "R\n"
    return out


def solve(inp: str) -> int:
    x = 0
    y = 0

    for move in inp.splitlines():  # you can just split at R\n and take the last list
        if move == "N":
            y += 1
        if move == "E":
            x += 1
        if move == "W":
            x -= 1
        if move == "S":
            y -= 1
        if move == "R":
            x, y = 0, 0

    return int(math.sqrt(x**2 + y**2))


if __name__ == "__main__":
    p = generate_problem()
    s = solve(p)
    print(json.dumps({"problem": p, "solution": s}))
