from random import random, randint

for _ in range(1024):  # we can go wild with this one
    p = random()

    if p < 0.95:  # 95% chance it is a direction
        print("NEWS"[randint(0, 3)])
    else:  # 5% chance it is a reset
        print("R")
