from random import randint, shuffle
import json


def generate_problem() -> str:
    ELEMENTS = [chr(i) for i in range(ord("A"), ord("Z") + 1)]
    eqs = []
    for _ in range(256):
        shuffle(ELEMENTS)
        es = [ELEMENTS[i] for i in range(0, randint(2, 8))]
        lcs = [randint(1, 256) for _ in range(len(es))]
        rcs = [randint(1, 256) for _ in range(len(es))]

        mt = ""
        eq = f"{' + '.join(f'{e}{c if c > 1 else mt}' for (e, c) in zip(es, lcs))} -> {''.join(f'{e}{cf * cn}' for (e, cf, cn) in zip(es, lcs, rcs))}"
        eqs.append(eq)
    return "\n".join(eqs)


def solve(s: str) -> int:
    eqs = s.splitlines()
    output = 0
    for eq in eqs:
        lhs, rhs = eq.split("->")
        rhs = rhs.strip()

        reactants = {
            t[0]: int(t[1:] if len(t) > 1 else 1)
            for t in list(map(lambda s: s.strip(), lhs.split("+")))
        }
        products = {}

        i = 0
        while i < len(rhs):
            e = rhs[i]
            i += 1
            j = i

            while i < len(rhs) and rhs[i] in "0123456789":
                i += 1
            products[e] = int(rhs[j:i]) if i != j else 1

        for i in reactants.keys():
            output += products[i] / reactants[i]

    return int(output)


if __name__ == "__main__":
    p = generate_problem()
    s = solve(p)
    print(json.dumps({"problem": p, "solution": s}))
