from PIL import Image

# Open the JPG image
img = Image.open('santa_cruz_beach_small.jpg')

# Convert and save as PPM
img.save('santa_cruz_beach_small.ppm', 'PPM')
