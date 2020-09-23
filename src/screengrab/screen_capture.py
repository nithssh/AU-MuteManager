from PIL import ImageGrab, Image
import time

def main():
  while (True):
    x = 550
    y = 430
    off_x = 820
    off_y = 225
    outname = "./src/screengrab/screencap.png"
    img = ImageGrab.grab(bbox=(x, y, x + off_x, y + off_y))
    img.save(outname)
    time.sleep(0.5)

main()