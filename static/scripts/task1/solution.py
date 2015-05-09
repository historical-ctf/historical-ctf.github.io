import util

def crypt(m, e, n):
    return pow(m,e,n)

if __name__ == '__main__':
    # Import password dictionary
    guesses = open('dictionary.txt').read().splitlines()

    # Public Key
    # FILL IN BADGUY'S PUBLIC KEY
    n = 
    e = 

    # Ciphertext
    # FILL IN BADGUY's CIPHERTEXT
    cipher = 187613886176

	# Try every password in dictionary
	count = 0
	for l in lines:
		if crypt(util.serialize(l), e, n) == cipher:
			print "Password Cracked: %s" % l
			break
		count = count + 1
		if (count % 100 == 0):
			print "Tried " + str(count) + " passwords"
