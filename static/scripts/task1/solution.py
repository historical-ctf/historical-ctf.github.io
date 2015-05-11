import util

if __name__ == '__main__':
    # Import password dictionary
    guesses = open('dictionary.txt').read().splitlines()

    # TODO(Public key and public exponent)
    n =
    e =

    # TODO(Ciphertext of password)
    cipher =

    # Try every password in dictionary
    count = 0
    for guess in guesses:
        if util.encrypt(util.serialize(guess), e, n) == cipher:
            print "Password Cracked: %s" % guess
            break
        count = count + 1
        if (count % 100 == 0):
            print "Tried " + str(count) + " passwords"
