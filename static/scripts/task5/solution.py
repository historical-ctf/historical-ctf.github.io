import math
import time
import numpy as np

from decrypt import square_and_multiply


def get_time(m, n, idx):
    """Get the time required to decrypt ciphertext `c` using modulus `n` and observing bit `idx."""
    start_time = time.time()
    square_and_multiply(m, n, idx)
    return time.time() - start_time


def reduction_required(m, key_bits, n):
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
    # Public modulus
    N = 11371820908545711283

    # Number of values to sample
    T = 100

    # Timing difference threshold
    threshold = 0.01

    def get_bit(known_bits):
        """Estimate the next bit of a key, given `key_bits` of known bits."""
        under = []
        over = []
        guessed_bits = known_bits + [1]

        # Prepare to sample
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

        # Compute mean times for those that required a reduction and those that did not
        over_times = [get_time(v, N, len(known_bits)) for v in over]
        under_times = [get_time(v, N, len(known_bits)) for v in under]
        over_mean = sum(over_times) / float(len(over_times))
        under_mean = sum(under_times) / float(len(under_times))

        # Compare mean time
        if abs(over_mean - under_mean) > threshold:
            return 1
        else:
            return 0

    # Start with the knowledge that there are 62 bits, and the highest-order bit is a 1
    num_bits = 62
    known_bits = [1]
    for i in range(num_bits - 1):
        next_bit = get_bit(known_bits)
        print 'Guessed bit: %d' % next_bit
        known_bits.append(next_bit)
