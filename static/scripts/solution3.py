import util2
import math

def iroot(k, n):
    u, s = n, n+1
    while u < s:
        s = u
        t = (k-1) * s + n // pow(s, k-1)
        u = t // k
    return s

def decrypt(c1, c2, c3, n1, n2, n3):
    t1 = c1*(n2*n3)*util2.modinv(n2*n3, n1)
    t2 = c2*(n1*n3)*util2.modinv(n1*n3, n2)
    t3 = c3*(n1*n2)*util2.modinv(n1*n2, n3)
    cubed = (t1+t2+t3) % (n1*n2*n3)
    return iroot(3, cubed)

if __name__ == '__main__':
    # Low public exponent
    e = 3

    # Three different modulu
    n1 = 0xd94d889e88853dd89769a18015a0a2e6bf82bf356fe14f251fb4f5e2df0d9f9a94a68a30c428b39e3362fb3779a497eceaea37100f264d7fb9fb1a97fbf621133de55fdcb9b1ad0d7a31b379216d79252f5c527b9bc63d83d4ecf4d1d45cbf843e8474babc655e9bb6799cba77a47eafa838296474afc24beb9c825b73ebf549
    n2 = 0xe79e9b8b7e273631d1972087bef4efd6c46ce6baebc8fd2bdfdbbb4d7421567b327cf1e9a661fe57f51a895b0662f1b099584899fe9d4f57e7569a40be7fcb4be81a5d54a3f3ace167b2a209c71aae648fc3042cf4d3b7e7a484b93924383f7500ce489005875f085ae9ea8e38c5afa66b141d13abfae79293fad25b581f8e25
    n3 = 0xa9a9ee1cbd49db03db8134be1c45cfb2cfb62a6eaf5b496c21beda2f0730a5ba0c23818f4eb6a3b2c883ced7b2f72e23fa1632b8a5f75b3fc828abdfba0a639e3cbc8fc1fa477e2aa261159e72e7dd2fbee806b25963a398b046def8abedc00af335b97af88f1a1811be6b08993dabc690252b69246fb46b941b4794c2d5923d

    # Encrypts the 'secret' message
    m = util2.serialize("Charlie Marsh was here")
    c1 = util2.encrypt(m, e, n1)
    c2 = util2.encrypt(m, e, n2)
    c3 = util2.encrypt(m, e, n3) 

    print util2.deserialize(decrypt(c1,c2,c3, n1, n2, n3))