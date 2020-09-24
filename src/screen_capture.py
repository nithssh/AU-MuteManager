#
# This is a simple script to capture part of the screen using Pillow.
# Called from index.js as child_process exec
#

from PIL import ImageGrab
import time, sys

x = 550
y = 430
width = 820
height = 225
outname = "./data/screencap.png"
img = ImageGrab.grab(bbox=(x, y, x + width, y + height))
img.save(outname)
