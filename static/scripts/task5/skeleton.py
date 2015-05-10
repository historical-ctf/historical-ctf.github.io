import math

import util
from decrypt import square_and_multiply


def get_time(m, n, idx):
    """Get the time required to decrypt ciphertext `c` using modulus `n` and observing bit `idx."""
    pass


def reduction_required(m, key_bits, n):
    """
    Check if value `m`, when run through the square-and-multiply algorithm up to step `key_bits`
    and with modulus `n`, would require an extra reduction.
    """
    pass


if __name__ == '__main__':
    # TODO(Public modulus)
    N =

    # Number of values to sample
    T = 100

    # Timing difference threshold
    threshold = 0.01

    def get_bit(known_bits):
        """Estimate the next bit of a key, given `key_bits` of known bits."""
        pass

    # Start with the knowledge of the number of bits, and that the highest-order bit is a 1
    # TODO(Number of bits in private key)
    num_bits =
    known_bits = [1]
    for i in range(num_bits - 1):
        next_bit = get_bit(known_bits)
        print 'Guessed bit: %d' % next_bit
        known_bits.append(next_bit)
    print 'Private key: %d' % util.get_decimal(known_bits)
