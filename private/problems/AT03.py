from random import randint, random
import math
import json

PI = 3.14
G = 6.67 * (10e-11)


def generate_problem() -> str:
    ps = []
    for _ in range(32):
        for _ in range(randint(1, 16)):
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
        averages.append(sum / len(s))
    return averages.index(max(averages)) + 1


print(
    solve(
        """V103-R132
V11-R15
V10-R4
V29-R27
V73-R26
V19-R49
V111-R155
V9-R2
V40-R31

V98-R186
V45-R123
V9-R3
V5-R9
V124-R124
V120-R64
V35-R22
V51-R8

V110-R279
V88-R142
V78-R64

V115-R103
V99-R13
V95-R66
V88-R145
V106-R55
V65-R159
V9-R14
V55-R109
V33-R8
V82-R156
V103-R171

V102-R227
V14-R6
V122-R30
V125-R318
V29-R16
V69-R37

V69-R22
V32-R24
V54-R43
V128-R259
V32-R26
V57-R168
V61-R138
V21-R47

V87-R77
V10-R25
V76-R5
V66-R91
V5-R6
V95-R127
V24-R19
V11-R8
V55-R143
V57-R71
V43-R35
V43-R101
V79-R12
V39-R68
V36-R14
V96-R186

V124-R221
V28-R67
V107-R318
V53-R4
V17-R3
V65-R160
V51-R56
V81-R184
V33-R71
V12-R18
V42-R70
V40-R88
V111-R118
V72-R18

V118-R305
V61-R3
V101-R185
V77-R79

V80-R234
V64-R43
V51-R129
V108-R147

V57-R56
V87-R99
V85-R75
V93-R139

V35-R16
V28-R48
V50-R128
V19-R35
V9-R10
V72-R91

V19-R26
V80-R52
V51-R119
V81-R172
V52-R3
V28-R39
V117-R295
V50-R71
V116-R324
V53-R74
V10-R19

V87-R216
V92-R43
V101-R78
V123-R232
V84-R213
V122-R313

V71-R123
V18-R5
V80-R54
V49-R19
V82-R60
V115-R195
V16-R46
V27-R30
V70-R100
V121-R156
V12-R12
V40-R52

V43-R3

V21-R12
V117-R210
V55-R139
V29-R4

V3-R8
V51-R62
V83-R92
V51-R9

V125-R96
V128-R92
V14-R31
V85-R239
V60-R145
V101-R186
V10-R16
V92-R71
V125-R268
V37-R64
V8-R3
V96-R56

V73-R116
V83-R241
V47-R28
V63-R54
V112-R239
V6-R17
V78-R159

V48-R37
V5-R1
V4-R9
V64-R37
V112-R313
V18-R52
V82-R125
V50-R113
V25-R1
V14-R18
V44-R48

V92-R15
V56-R94
V74-R42
V109-R35
V126-R370
V9-R7
V29-R14
V32-R15
V66-R6
V31-R3
V14-R41
V19-R50
V49-R31
V114-R327
V53-R146
V26-R52

V5-R9
V52-R147
V10-R17
V24-R67
V63-R65
V14-R28
V110-R71
V92-R43
V45-R48
V65-R8
V17-R15
V36-R56
V116-R286

V127-R255
V127-R34
V122-R206

V39-R114
V10-R11
V36-R6
V67-R68
V5-R11
V125-R51

V117-R280
V77-R203
V110-R296
V50-R84
V122-R94
V54-R124
V67-R147
V105-R300
V116-R83
V3-R5

V54-R57
V84-R9
V17-R19
V26-R75
V46-R61
V125-R331
V22-R5
V30-R69

V63-R24
V105-R157
V12-R33

V37-R67
V110-R239
V32-R28
V57-R85
V3-R5

V43-R19
V91-R119
V37-R98
V101-R236
V34-R71
V108-R267
V98-R174
V128-R109
V33-R50
V15-R8
V72-R75
V89-R15
V49-R13
V124-R120
V39-R105
V109-R168

V93-R122
V50-R30
V53-R141
V24-R11
V40-R56
V77-R15
V22-R13
V39-R64
V83-R230
V74-R125

V26-R2
V100-R190
V39-R62
V22-R60
V119-R150
V19-R5
V20-R19
V123-R30"""
    )
)

# if __name__ == "__main__":
#     p = generate_problem()
#     s = solve(p)
#     print(p)
#     print(s)
