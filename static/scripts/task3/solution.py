import util


def decrypt(c1, c2, c3, n1, n2, n3):
    """
    Decrypt by executing a Low Public Exponent Attack based on the Chinese Remainder Theorem.
    For a good explanation:
        http://crypto.stackexchange.com/questions/6713/low-public-exponent-attack-for-rsa
    """
    t1 = c1 * (n2 * n3) * util.modinv(n2 * n3, n1)
    t2 = c2 * (n1 * n3) * util.modinv(n1 * n3, n2)
    t3 = c3 * (n1 * n2) * util.modinv(n1 * n2, n3)
    cubed = (t1 + t2 + t3) % (n1 * n2 * n3)
    return util.iroot(cubed, 3)

if __name__ == '__main__':
    # TODO(Badguy's public exponent)
    e =

    # TODO(Badguy's three public moduli)
    n1 =
    n2 =
    n3 =

    # TODO(Three ciphertexts of the same message, extracted from the server)
    c1 =
    c2 =
    c3 =

    # Decrypt using the Low Public Exponent Attack
    print util.deserialize(decrypt(c1, c2, c3, n1, n2, n3))
