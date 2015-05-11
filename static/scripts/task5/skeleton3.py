import math
import numpy as np

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
    for idx, bit in enumerate(key_bits):
        if idx == 0:
            x = m
        else:
            x = (x * x) % n
            if (bit == 1):
                x = (x * m)
                if idx == len(key_bits) - 1:
                    return x > n
                else:
                    x %= n


if __name__ == '__main__':
    # TODO(Public modulus)
    N =

    # Number of values of each type to sample
    T = 50

    # Timing difference threshold for means
    threshold = 0.01

    def get_bit(known_bits):
        """Estimate the next bit of a key, given `key_bits` of known bits."""
        under = []
        over = []
        guessed_bits = known_bits + [1]

        # Prepare to sample from a normal distribution
        (loc, scale) = (math.sqrt(N), N)
        while len(over) < T or len(under) < T:
            sample = int(np.random.normal(loc=loc, scale=scale))

            # Check if this value would require an extra reduction step
            if reduction_required(sample, guessed_bits, N):
                if len(over) < T:
                    over.append(sample)
            else:
                if len(under) < T:
                    under.append(sample)

        # Compute times for those that required a reduction and those that did not
        over_times = [get_time(v, N, len(known_bits)) for v in over]
        under_times = [get_time(v, N, len(known_bits)) for v in under]

        # TODO(Compare means)
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
