from random import randint, random
import math
import json

PI = 3.14
G = 6.67 * (10e-11)


def generate_problem() -> str:
    ps = []
    for _ in range(2):
        for _ in range(randint(1, 3)):
            rbyv = random() + randint(0, 2)

            v = randint(2, 128)
            r = rbyv * v
            ps.append(f"V{math.ceil(v)}-R{math.ceil(r)}")
        ps.append("")
    return "\n".join(ps)


def solve(string: str) -> int:
    ss = []
    split = string.splitlines()
    i, j = 0, 0
    while i < len(split):
        ss.append([])
        while i < len(split) and split[i]:
            ss[j].append(split[i])
            i += 1
        i += 1
        j += 1

    averages = []
    for s in ss:
        sum = 0
        for p in s:
            v, r = map(lambda a: int(a[1:]), p.split("-"))
            t = (2 * PI * r) / v
            m = (4 * PI**2 * r**3) / (G * t**2)
            sum += m
            print(m)
        averages.append(sum / len(s))
    return averages.index(max(averages)) + 1


if __name__ == "__main__":
    p = generate_problem()
    s = solve(p)
    print(json.dumps({"problem": p, "solution": s}))
