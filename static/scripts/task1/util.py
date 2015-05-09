import math

# Turn a string into a number for RSA encryption.
def serialize(s):
    ctr = 0
    i = len(s)
    for c in s:
        i = i - 1
        ctr = ctr + (ord(c) * (256 ** i))
    return ctr

# Turn a number into a string after RSA decryption.
def deserialize(n):
    builder = ""
    numBytes = math.ceil(int(n.bit_length()) / 8)
    i = 0
    while i <= numBytes:
        builder = builder + chr(n & 0xFF)
        n >>= 8
        i = i + 1
    return builder[::-1]
