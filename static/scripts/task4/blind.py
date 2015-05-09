import util


def unblind(signature, r, n):
    # We need r^{-1}, so we have to solve for modular inverse
    r_prime = util.modinv(r, n)
    return (signature * r_prime) % n


def blind(m, r, e, n):
    return pow(m, r ** e, n)

if __name__ == '__main__':
    # Modulus carries over from previous challenge
    n = 0xa9a9ee1cbd49db03db8134be1c45cfb2cfb62a6eaf5b496c21beda2f0730a5ba0c23818f4eb6a3b2c883ced7b2f72e23fa1632b8a5f75b3fc828abdfba0a639e3cbc8fc1fa477e2aa261159e72e7dd2fbee806b25963a398b046def8abedc00af335b97af88f1a1811be6b08993dabc690252b69246fb46b941b4794c2d5923d

    # Choose public and private exponents
    e = 3
    d = 39713988244451435985442544928037620108630080212739017809813048458439001895187393054538720660262501760109174491293325448136691620094813858467940894847997811502869371752050334199362122759722637928920170584906163890229921466818153996913966768194938247120342940740519574376132102185752469090898587754201756064618

    # Choose a large random prime to be the blinding factor
    r = 76777

    # Sign the initial message for comparison
    message = 'bbadguy'
    m = util.serialize(message)
    true_signature = util.sign(m, d, n)

    # Blind and sign
    m_prime = blind(m, r, e, n)
    blind_signature = util.sign(m_prime, d, n)

    print 'True signature: %d' % true_signature
    print 'Blinded signature: %d' % blind_signature
    print 'Unblinded signature: %d' % unblind(blind_signature, r, n)
