import random
from pprint import pprint

NUCLEOTIDES = ['A', 'C', 'G', 'T']
PAIRS = {'A': 'T', 'C': 'G', 'G': 'C', 'T': 'A'}

random.seed(42)

def find_mutation(main, complementary):
    """finds the mutation if any in the sequence and prints it in red"""
    for i, char in enumerate(main):
        if char == PAIRS[complementary[i]]: continue
        return f"{char}{complementary[i]}-{i+1}"


def get_data():
    """returns input and corresponding output data"""
    data = {i: {} for i in range(16)}

    for i in range(16):
        # Generate two random strands of DNA
        main_strand = [random.choice(NUCLEOTIDES) for _ in range(1024)]
        complementary_strand = [PAIRS[n] for n in main_strand]

        # Mutate one nucleotide
        replacement = random.choice(range(len(main_strand)))
        mutation = random.choice(['C', 'G']) if main_strand[replacement] == "A" else random.choice(['A', 'T'])
        main_strand[replacement] = mutation

        data[i] = {
            'inp': '\n\n'.join([''.join(main_strand), ''.join(complementary_strand)]),
            'out': find_mutation(main_strand, complementary_strand)
        }

    return data

if __name__ == '__main__':
    pprint(get_data())

