import matplotlib.pyplot as plt
from PIL import Image

def display_images_side_by_side(image1_path, image2_path):
    # Open the images using Pillow
    img1 = Image.open(image1_path)
    img2 = Image.open(image2_path)
    
    # Create a figure with 1 row and 2 columns
    fig, axes = plt.subplots(1, 2, figsize=(12, 6))
    
    # Display the images
    axes[0].imshow(img1)
    axes[0].axis('off')  # Hide axis
    axes[0].set_title('Original Image')
    
    axes[1].imshow(img2)
    axes[1].axis('off')  # Hide axis
    axes[1].set_title('Undistorted Image')

    # Set the main title
    plt.suptitle('Perspective Undistortion', fontsize=16)
    
    # Show the plot
    plt.show()

# Example usage
image1_path = '.\\samples\\santa_cruz_beach.jpg'  # Provide the path to your first image
image2_path = '.\\results\\santa_cruz_beach_undistorted.jpg'  # Provide the path to your second image

display_images_side_by_side(image1_path, image2_path)
