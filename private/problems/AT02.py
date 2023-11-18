import random

nucleotides = ['A', 'C', 'G', 'T']
pairs = {'A': 'T', 'C': 'G', 'G': 'C', 'T': 'A'}

# Generate two random strands of DNA
main_strand = [random.choice(nucleotides) for _ in range(64)]
complementary_strand = [pairs[n] for n in main_strand]

# Mutate one nucleotide
replacement = random.choice(range(len(main_strand)))

if main_strand[replacement] == "A": mutation = random.choice(['C', 'G'])
else: mutation = random.choice(['A', 'T'])

main_strand[replacement] = mutation

print(''.join(main_strand), ''.join(complementary_strand), sep='\n\n')

def find_mutation(main, complementary):
    """finds the mutation if any in the sequence and prints it in red"""
    for i, char in enumerate(main):
        if char == pairs[complementary[i]]:
            print(char, end='')
        else:
            print(f"\033[0;31m{char}\033[0m", end='')

print('\n')
input('Press enter to see the mutation')
find_mutation(main_strand, complementary_strand)
