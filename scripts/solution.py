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
	lines = open('dictionary.txt').read().splitlines()

	# Public Key
	n = 10975913387
	e = 65537

	# Ciphertext
	cipher = 5765127787

	# Try every 
	for l in lines:
		if crypt(serialize(l), e, n) == cipher:
			print "Password Cracked: %s" % l
			break
