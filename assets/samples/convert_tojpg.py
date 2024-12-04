from PIL import Image
import sys

def convert_ppm_to_jpg(ppm_filename):
    # Open the PPM image
    img = Image.open(ppm_filename)
    
    # Resize the image to 512x512
    img = img.resize((512, 512))
    
    # Save the image as JPG
    jpg_filename = ppm_filename.split('.')[0] + '.jpg'
    img.save(jpg_filename, 'JPEG')
    print(f"Converted {ppm_filename} to {jpg_filename}")

# Take the filename as an argument
if len(sys.argv) < 2:
    print("Please provide a PPM filename as an argument.")
else:
    ppm_filename = sys.argv[1]
    convert_ppm_to_jpg(ppm_filename)
