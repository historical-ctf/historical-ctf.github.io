import util


def decrypt(c1, c2, e1, e2, n):
    # Compute GCD
    (gcd, x, y) = util.egcd(e1, e2)
    assert(gcd == 1)

    # One of (x, y) will be negative, which makes it difficult to do (c ^ x) % n
    # To solve that problem, we compute the modular inverse d of c such that:
    #   d ^ (-x) === c ^ x (mod n)
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
    # TODO(Public modulus, from the chat logs)
    n =

    # TODO(Public exponents, also from chat logs)
    e1 =
    e2 =

    # TODO(Ciphertexts, also from chat logs)
    c1 =
    c2 =

    # Decrypt paired ciphertexts
    m_guess = decrypt(c1, c2, e1, e2, n)
    print 'guess = %s' % (util.deserialize(m_guess))
