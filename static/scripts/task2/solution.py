import util


def decrypt(c1, c2, e1, e2, n):
    # Compute GCD
    (gcd, x, y) = util.egcd(e1, e2)
    assert(gcd == 1)

    # One of (x, y) will be negative, which makes it difficult to do (c ^ x) % n
    # To solve that problem, we compute the modular inverse d of c such that:
    #   d ^ (-x) === c ^ x (mod n)
    # (This solution comes from https://en.wikipedia.org/wiki/Modular_exponentiation)
    if x < 0:
        c1 = util.modinv(c1, n)
        x = -x
    elif y < 0:
        c2 = util.modinv(c2, n)
        y = -y

    # Use knowledge of c1, c2, x, y to solve for m
    m = ((c1 ** x) * (c2 ** y)) % n
    return m


if __name__ == '__main__':
    # Public modulus
    # FILL IN BADGUY's PUBLIC MODULUS (found in chat logs)
    n =

    # Public exponents
    # FILL IN BADGUY'S PUBLIC EXPONENTS
    e1 =
    e2 =

    # Ciphertexts
    # FILL IN BADGUY'S ENCRYPTED MESSAGES
    c1 =
    c2 =

    # Decrypt paired ciphertexts
    m_guess = decrypt(c1, c2, e1, e2, n)
    print 'guess = %s' % (util.deserialize(m_guess))
