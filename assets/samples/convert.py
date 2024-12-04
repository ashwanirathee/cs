import sys
from PIL import Image
import os

# Check if the user provided a filename argument
if len(sys.argv) != 2:
    print("Usage: python script.py <input_image>")
    sys.exit(1)

# Get the input filename from the command line argument
input_filename = sys.argv[1]

# Open the image
img = Image.open(input_filename)
img_resized = img.resize((512, 512))

# Get the base name (without extension) of the input file
base_name = os.path.splitext(input_filename)[0]

# Create the output filename by appending .ppm
output_filename = base_name + '.ppm'

# Convert and save the image as PPM
img_resized.save(output_filename, 'PPM')

print(f"Image saved as {output_filename}")
