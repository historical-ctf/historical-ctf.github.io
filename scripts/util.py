# Turn a string into a number for RSA encryption. 
def serialize(s):
	ctr = 0
	i = len(s) - 1
	for c in s:
		ctr += ord(c) ** i
		i = i - 1
	return ctr

# Turn a number into a string after RSA decryption. 