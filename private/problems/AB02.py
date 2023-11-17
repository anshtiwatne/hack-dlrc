from random import randint, random

ws = {chr(c): [] for c in range(ord("a"), ord("z") + 1)}
with open("./data/words_alpha.txt", "r") as f:
    for w in [w.lower().strip() for w in f.read().splitlines() if w]:
        ws[w[0]].append(w)

s = []
for _ in range(2500):  # 2500 words
    t = ws[chr(randint(ord("a"), ord("z")))]
    p = random()

    if p < 0.75:  # 75% chance of no alliteration
        s.append(t[randint(0, len(t) - 1)])
    elif p < 0.95:  # 20% chance of alliteration
        for _ in range(randint(3, 5)):
            s.append(t[randint(0, len(t) - 1)])
    else:  # 5% chance of alliteration with articles
        for _ in range(randint(3, 5)):
            s.append(t[randint(0, len(t) - 1)])
            s.append(["a", "an", "the"][randint(0, 2)])

print(" ".join(s))
