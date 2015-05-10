import util


def unblind(s, r, n):
    """Unblind signature `s` that was blinded with random factor `r` under modulus `n`."""
    # We need r^{-1}, so we have to solve for modular inverse
    r_prime = util.modinv(r, n)
    return (s * r_prime) % n


def blind(m, r, e, n):
    """
    Blind message `m` with random factor `r` using public exponent `e` and modulus `n`.
    """
    blinding_factor = r ** e
    return (m * blinding_factor) % n

if __name__ == '__main__':
    # Modulus carries over from previous challenge
    n =

    # Public exponent
    e =

    # Choose a large random prime to be the blinding factor
    r =

    # Sign the initial message for comparison
    message =
    m = util.serialize(message)

    # Blind and sign
    m_prime = blind(m, r, e, n)
    blind_signature = util.sign(m_prime, d, n)
    true_signature = unblind(blind_signature, r, n)

    print 'Blinded signature: %d' % blind_signature
    print 'Unblinded signature: %d' % true_signature
