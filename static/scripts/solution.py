def crypt(m, e, n):
    return (m ** e) % n


def serialize(s):
    ctr = 0
    i = len(s) - 1
    for c in s:
        ctr += ord(c) ** i
        i = i - 1
    return ctr

if __name__ == '__main__':
    # Import password dictionary
    guesses = open('dictionary.txt').read().splitlines()

    # Public Key
    n = 292092701533
    e = 65537

    # Ciphertext
    cipher = 187613886176

    # Try every password in dictionary
    count = 0
    for l in guesses:
        if crypt(serialize(l), e, n) == cipher:
            print "Password Cracked: %s" % l
            break
        count = count + 1
        if (count % 100 == 0):
            print "Tried " + str(count) + " passwords"
