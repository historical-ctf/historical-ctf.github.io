import time
import util

# Private key with obfuscated name
_xyzhxysadkj = util.get_bits(2377205257342368779)

# Delay time
_jsuiiqwje = 0.025

def square_and_multiply(m, n, idx):
    x = m
    i = 1
    for bit in _xyzhxysadkj[1:]:
        x = (x * x) % n
        if (bit == 1):
            x = (x * m)
            if x >= n:
                x %= n
                if idx == i:
                    time.sleep(_jsuiiqwje)
        elif (bit == 0) and idx == i:
            time.sleep(_jsuiiqwje / 2)
        i += 1
    return x
