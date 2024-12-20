import random
import json
from pprint import pprint

NUCLEOTIDES = ["A", "C", "G", "T"]
PAIRS = {"A": "T", "C": "G", "G": "C", "T": "A"}

random.seed(42)


def find_mutation(main, complementary):
    """finds the mutation if any in the sequence and prints it in red"""
    for i, char in enumerate(main):
        if char == PAIRS[complementary[i]]:
            continue
        return f"{char}{complementary[i]}-{i+1}"


a = """AAGCCCAATAAACCACTCTGACTGGCCGAATAGGGATATAGGCAACGACATGTGCGGCGACCCTTGCGACAGTGACGCTTTCGCCGTTGCCTAAACCTATTTGAAGGAGTCTAGCAGCCGCAGTAAGGCACAATACCTCGTCCGTGTTACCAGACCAAACAAGACGTCCTCTTCAATGTTTAAATGACCCTCTCGTCATAAAACCTTTCTACTATGTGTTCCGCAAGAATCAACAACTACAATGGCGCGTCGTGAATAACGCGACGGCTGAGACGAACGGCGCGTGAATGAAGCGCTTAAACAGCTCAGGAGCCAGTCCCCTACGTCGCATATCCTGGCCACTGGAGGTGAAGCGAATGGTATCGATACGTAGGAGGTGTGCCTTCGTAGGCTGTTTCTCAGGACGCCCAACTATTCTTTCCAATCCTACATCTGTTTCTTGCGTCGTAGCGGGACCCTCCATTGTTACTTATTAGGTTCTCGTTATGTCTCATAATCTCAGTGCTGGTGTGATAAGCAAACCACCCTACTGGCACGAAGTTCACAGAAGTGAGATTATGTCTCGTTTGGCAGTCTTGATGCTCGGGGGACACTTCTTTAAGCTCGGTGTGGTGGGCACGACCCTGGACGCGCGACGAAGCTAAGTTTGCAGTAATTAACCGACATCTTTGTGAACCGACCCACATTTGACGGTACGCTACCGCAACGGTATGTGTTAATGGAACAGACTTGCATATGTGGACGTTGTATAGGGATATTACGTTACGCGTTAACCGATACATACTGGTTTCTCTCCAGTGGAGGTCTTGGTTGCCTCTAGTTTCTACGATATACTCATGGTAGTGTAACGCATAATCGAAGAGGGTCCTCCCATCTCCTGTGATGCATGGTGTGCTTACTGGGATGAATGCGCCGCAAGTAGCAGGTCCCGGCGTGGATACCTGATAGATGGTGACTAGCATGTACAAGTAACCTTGTCTATTGAGCTTCGAGGATGCATACAAGCCCACCCGCAGCCGCAACA

TTCGGGTTATTTGGTGAGACTGACCGGCTTATCCCTATATCCGTTGCTGTACACGCCGCTGGGAACGCTGTCACTGCGAAAGCGGCAACGGATTTGGATAAACTTCCTCAGATCGTCGGCGTCATTCCGTGTTATGGAGCAGGCACAATGGTCTGGTTTGTTCTGCAGGAGAAGTTACAAATTTACTGGGAGAGCAGTATTTTGGAAAGATGATACACAAGGCGTTCTTAGTTGTTGATGTTACCGCGCAGCACTTATTGCGCTGCCGACTCTGCTTGCCGCGCACTTACTTCGCGAATTTGTCGAGTCCTCGGTCAGGGGATGCAGCGTATAGGACCGGTGACCTCCACTTCGCTTACCATAGCTATGCATCCTCCACACGGAAGCATCCGACAAAGAGTCCTGCGGGTTGATAAGAAAGGTTAGGATGTAGACAAAGAACGCAGCATCGCCCTGGGAGGTAACAATGAATAATCCAAGAGCAATACAGAGTATTAGAGTCACGACCACACTATTCGTTTGGTGGGATGACCGTGCTTCAAGTGTCTTCACTCTAATACAGAGCAAACCGTCAGAACTACGAGCCCCCTGTGAAGAAATTCGAGCCACACCACCCGTGCTGGGACCTGCGCGCTGCTTCGATTCAAACGTCATTAATTGGCTGTAGAAACACTTGGCTGGGTGTAAACTGCCATGCGATGGCGTTGCCATACACAATTACCTTGTCTGAACGAATACACCTGCAACATATCCCTATAATGCAATGCGCAATTGGCTATGTATGACCAAAGAGAGGTCACCTCCAGAACCAACGGAGATCAAAGATGCTATATGAGTACCATCACATTGCGTATTAGCTTCTCCCAGGAGGGTAGAGGACACTACGTACCACACGAATGACCCTACTTACGCGGCGTTCATCGTCCAGGGCCGCACCTATGGACTATCTACCACTGATCGTACATGTTCATTGGAACAGATAACTCGAAGCTCCTACGTATGTTCGGGTGGGCGTCGGCGTTGT"""
print(find_mutation(a.splitlines()[0], a.splitlines()[2]))


def get_data():
    """returns input and corresponding output data"""

    # Generate two random strands of DNA
    main_strand = [random.choice(NUCLEOTIDES) for _ in range(1024)]
    complementary_strand = [PAIRS[n] for n in main_strand]

    # Mutate one nucleotide
    replacement = random.choice(range(len(main_strand)))
    mutation = (
        random.choice(["C", "G"])
        if main_strand[replacement] == "A"
        else random.choice(["A", "T"])
    )
    main_strand[replacement] = mutation

    return {
        "problem": "\n\n".join(["".join(main_strand), "".join(complementary_strand)]),
        "solution": find_mutation(main_strand, complementary_strand),
    }


# if __name__ == "__main__":
#     p = get_data()
#     print(p["problem"])
#     print(p["solution"])
