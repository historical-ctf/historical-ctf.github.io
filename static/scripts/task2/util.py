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


def encrypt(m, e, n):
    """Encrypt a message `m` with public exponent `e` and modulus `n` using RSA."""
    return pow(m, e, n)


def sign(m, d, n):
    """Sign a message `m` with private exponent `d` and modulus `n` using RSA."""
    return encrypt(m, d, n)


def egcd(a, b):
    """
    Compute the greatest common divisor (GCD) of integers `a` and `b`. In addition, return
    integers `x` and `y` such that ax + by = GCD(a, b).
    """
    x, y, u, v = 0, 1, 1, 0
    while a != 0:
        q, r = b // a, b % a
        m, n = x - u * q, y - v * q
        b, a, x, y, u, v = a, r, u, v, m, n
    gcd = b
    return gcd, x, y


def modinv(a, m):
    """Compute the inverse of `a` under modulus `m`."""
    g, x, y = egcd(a, m)
    if g != 1:
        raise Exception('Modular inverse does not exist')
    else:
        return x % m
