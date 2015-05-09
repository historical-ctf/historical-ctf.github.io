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


def encrypt(m, e, n):
    return pow(m, e, n)


def sign(m, d, n):
    return encrypt(m, d, n)


def egcd(a, b):
    x, y, u, v = 0, 1, 1, 0
    while a != 0:
        q, r = b // a, b % a
        m, n = x - u * q, y - v * q
        b, a, x, y, u, v = a, r, u, v, m, n
    gcd = b
    return gcd, x, y


def modinv(a, m):
    g, x, y = egcd(a, m)
    if g != 1:
        raise Exception('Modular inverse does not exist')
    else:
        return x % m
