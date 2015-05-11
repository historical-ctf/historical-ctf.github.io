import util


def decrypt(c1, c2, c3, n1, n2, n3):
    """
    Decrypt by executing a Low Public Exponent Attack based on the Chinese Remainder Theorem.
    For a good explanation:
        http://crypto.stackexchange.com/questions/6713/low-public-exponent-attack-for-rsa
    """

    # Here's one step of the recurrence for you...
    t1 = c1 * (n2 * n3) * util.modinv(n2 * n3, n1)

    # Can you finish the rest?
    t2 =
    t3 =

if __name__ == '__main__':
    # TODO(Badguy's public exponent)
    e = 3

    # TODO(Badguy's three public moduli)
    n1 =
    n2 =
    n3 =

    # TODO(Three ciphertexts of the same message, extracted from the server)
    c1 =
    c2 =
    c3 =

    print util.deserialize(decrypt(c1, c2, c3, n1, n2, n3))
