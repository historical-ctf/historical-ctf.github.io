import time
import util


_d = util.get_bits(2377205257342368779)


def square_and_multiply(m, n, idx):
    x = m
    i = 1
    for bit in _d[1:]:
        x = (x * x) % n
        if (bit == 1):
            x = (x * m)
            if x >= n:
                x %= n
                if idx == i:
                    time.sleep(0.05)
        i += 1
    return x
