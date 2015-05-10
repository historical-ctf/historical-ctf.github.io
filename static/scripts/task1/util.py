import math


def serialize(s):
    """Serialize a string `s` into a number for RSA encryption."""
    ctr = 0
    i = len(s)
    for c in s:
        i = i - 1
        ctr = ctr + (ord(c) * (256 ** i))
    return ctr


def deserialize(n):
    """Deserialize a number `n` that has been RSA decrypted into a string."""
    builder = ""
    numBytes = math.ceil(int(n.bit_length()) / 8)
    i = 0
    while i <= numBytes:
        builder = builder + chr(n & 0xFF)
        n >>= 8
        i = i + 1
    return builder[::-1]
