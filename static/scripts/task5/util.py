def get_bits(k):
    """Return the binary representation of `k`, where bits[0] is the highest-order bit."""
    bits = []
    while k:
        bits.append(k % 2)
        k /= 2
    bits.reverse()
    return bits


def get_decimal(bits):
    """Return `bits` expressed in decimal, where bits[0] is the highest-order bit."""
    k = 0
    factor = 1
    for i in range(len(bits)):
        k += factor * bits[-(1 + i)]
        factor *= 2
    return k
