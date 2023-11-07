# Binary Number Conversion

## Description

Sachin Sir is teaching students how binary numbers work. He wants the students to cross check their answers with a calculator but is worried using one on the internet will distract the students.  
He asks you to make a program that will convert multi line binary input into denary and sum it up. Note that the input can contain spaces to improve readability and they should be ignored.

## Testing

### Data

```
0011 0000
0 0 0 0
1111 1
1
000000 1
```
Evaluates to 81

### Undefined Behaviour (UB)

1. `ABCD` leads to UB
2. `123` leads to UB
3. `-1001` leads to UB

## Additional Information

1. A valid binary string is one that contains the characters `0`, `1` or ` ` (whitespace). Your algorithm may be tested against invalid strings.
2. Spaces are to be ignored, meaning `1001` is equivalent to `1 0 0 1`

## Resources

[WikiBooks](https://en.wikibooks.org/wiki/Wikijunior:How_Things_Work/Binary_Numbers#:~:text=All%20the%20numbers%20are%20constructed,in%20the%20form%20of%20bits.)
