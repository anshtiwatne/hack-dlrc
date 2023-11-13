from random import random, randint

for _ in range(1024):  # we can go wild with this one
    p = random()

    if p < 0.90:  # 90% chance it is a direction
        print("NEWS"[randint(0, 3)])
    else:  # 10% chance it is a reset
        print("R")
