import pandas as pd
import torch
from torch.utils.data import Dataset, DataLoader
from torchvision import transforms
from PIL import Image
import os
import numpy as np
from image_dataset import SingleClassImageDataset, MultiClassImageDataset

# Step 1: Load the dataset
file_path = './../../assets/santa_cruz_flora/images.csv'  # Path to the CSV file
images_folder = './../../assets/santa_cruz_flora/images/'  # Path to your images folder
image_extension = '.jpeg'  # Adjust to your image file format (.png, .jpeg, etc.)

# Read CSV
df = pd.read_csv(file_path)

# Filter rows where 'multi_single' == 0
filtered_df = df[df['multi_single'] == 0]

# Map class names to integer labels for single-class classification
class_mapping = {'class_1': 0, 'class_2': 1}
filtered_df['single_class_label'] = filtered_df['one_class'].map(class_mapping)

# Step 3: Define Image Transformations
transform = transforms.Compose([
    transforms.Resize((224, 224)),  # Resize all images to 224x224
    transforms.ToTensor(),          # Convert image to PyTorch tensor
    transforms.Normalize(mean=[0.5, 0.5, 0.5], std=[0.5, 0.5, 0.5])  # Normalize to [-1, 1]
])

# Step 4: Create the Dataset and DataLoader
dataset = SingleClassImageDataset(
    image_labels=filtered_df['label'].values, 
    targets=filtered_df['single_class_label'].values, 
    images_folder=images_folder,
    transform=transform,
    image_extension=image_extension
)

# Step 2: Process the labels into multi-hot encoding
def create_multihot_labels(row):
    """Creates a multi-hot encoded vector for the given row."""
    return [row['class_1'], row['class_2']]

# Apply the function to the DataFrame
df['multi_hot'] = df.apply(create_multihot_labels, axis=1)

# Step 5: Create the Dataset and DataLoader
dataset_multiclass = MultiClassImageDataset(
    image_labels=df['label'].values, 
    targets=df['multi_hot'].values, 
    images_folder=images_folder,
    transform=transform,
    image_extension=image_extension
)

dataloader = DataLoader(dataset, batch_size=2, shuffle=True)
dataloader_multiclass = DataLoader(dataset_multiclass, batch_size=2, shuffle=True)

# Step 5: Iterate through the DataLoader
for images, labels in dataloader:
    print("Image batch shape:", images.shape)  # Should be [B, 3, 224, 224]
    print("Labels:", labels)  # Single-class labels
    # break

# Step 6: Iterate through the DataLoader
for images, labels in dataloader_multiclass:
    print("Image batch shape:", images.shape)  # Should be [B, 3, 224, 224]
    print("Multi-hot Labels:", labels)  # Multi-hot encoded labels
    # break