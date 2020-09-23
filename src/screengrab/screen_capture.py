#
# This is a simple script to capture part of the screen using Pillow.
# Called from index.js as child_process exec
#

from PIL import ImageGrab
import time, sys

x = 550
y = 430
off_x = 820
off_y = 225
outname = "./data/screencap.png"
img = ImageGrab.grab(bbox=(x, y, x + off_x, y + off_y))
img.save(outname)
print("done_capture")
sys.stdout.flush()