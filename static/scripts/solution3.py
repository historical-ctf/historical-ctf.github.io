import util2


def decrypt(c, e, n):
    i = 1
    prev_enc = c
    next_enc = util2.encrypt(prev_enc, e, n)
    while next_enc != c:
        i += 1
        prev_enc = next_enc
        next_enc = util2.encrypt(next_enc, e, n)
        if (i % 1000000 == 0):
            print "Tried %d iterations" % (i)

    return prev_enc, i


if __name__ == '__main__':
    # Picks a huge public exponent to be 'safe'
    e = 10001

    # Encrypts the 'secret' message
    m = 4712002626301551717
    n = 48112959837082048697
    c = util2.encrypt(m, e, n)

    (decrypted_message, num_encryptions) = decrypt(c, e, n)
    print 'Decrypted %d to %d in %d iterations' % (c, decrypted_message, num_encryptions)
