import util

# Low public exponent attack based on the Chinese Remainder Theorem.
# For a good explanation, see http://crypto.stackexchange.com/questions/6713/low-public-exponent-attack-for-rsa
def decrypt(c1, c2, c3, n1, n2, n3):

    # Here's one step of the recurrence for you...
    t1 = c1 * (n2 * n3) * util.modinv(n2 * n3, n1)

    # Can you finish the rest?
    t2 = 
    t3 = 

if __name__ == '__main__':
    # BADGUY'S PUBLIC EXPONENT
    e = 3

    # BADGUY'S THREE PUBLIC MODULI
    n1 = 
    n2 = 
    n3 = 

    # CIPHERTEXT OF BADGUY'S BANK
    m = util.serialize()
    c1 = util.encrypt(m, e, n1)
    c2 = util.encrypt(m, e, n2)
    c3 = util.encrypt(m, e, n3)

    print util.deserialize(decrypt(c1, c2, c3, n1, n2, n3))
