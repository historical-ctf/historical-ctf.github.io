import util


def unblind(s, r, n):
    """Unblind signature `s` that was blinded with random factor `r` under modulus `n`."""
    pass

def blind(m, r, e, n):
    """
    Blind message `m` with random factor `r` using public exponent `e` and modulus `n`.
    """
    pass

if __name__ == '__main__':
    # TODO(Public modulus and exponent, which carry over from previous challenge)
    n =
    e =

    # TOOD(Choose a large random prime to be the blinding factor)
    r =

    # TODO(Choose an initial message, which should be Badguy's username)
    message =
    m = util.serialize(message)

    # Blind
    m_prime = blind(m, r, e, n)

    # TODO(Use the server to sign `m_prime`)
    blind_signature =
    true_signature = unblind(blind_signature, r, n)

    print 'Blinded signature: %d' % blind_signature
    print 'Unblinded signature: %d' % true_signature
