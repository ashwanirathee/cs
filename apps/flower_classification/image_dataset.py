import os
import numpy as np
import torch
from PIL import Image
from torch.utils.data import Dataset

# Step 2: Define PyTorch Dataset class for single-class classification
class SingleClassImageDataset(Dataset):
    def __init__(self, image_labels, targets, images_folder, transform=None, image_extension=".jpeg"):
        """
        Args:
            image_labels (list): List of image filenames without extensions.
            targets (list): Corresponding class labels.
            images_folder (str): Path to the folder containing images.
            transform (callable, optional): Transformations for images.
        """
        self.image_labels = image_labels  # Filenames (e.g., 'image_1')
        self.targets = torch.tensor(targets, dtype=torch.long)  # Target labels
        self.images_folder = images_folder
        self.transform = transform  # Transformations for images
        self.image_extension = image_extension

    def __len__(self):
        return len(self.image_labels)

    def __getitem__(self, idx):
        # Construct full image path
        image_filename = self.image_labels[idx] + self.image_extension
        image_path = os.path.join(self.images_folder, image_filename)
        
        # Load image using PIL
        image = Image.open(image_path).convert("RGB")  # Ensure 3 channels (RGB)
        
        # Apply transformations if any
        if self.transform:
            image = self.transform(image)
        
        # Target (single-class label)
        label = self.targets[idx]

        return image, label


# Step 3: Define PyTorch Dataset class
class MultiClassImageDataset(Dataset):
    def __init__(self, image_labels, targets, images_folder, transform=None, image_extension=".jpeg"):
        """
        Args:
            image_labels (list): List of image filenames without extensions.
            targets (list): Multi-hot encoded labels.
            images_folder (str): Path to the folder containing images.
            transform (callable, optional): Transformations for images.
        """
        self.image_labels = image_labels
        # self.targets = torch.tensor(targets, dtype=torch.float)  # Multi-hot labels as floats
        # With this updated line
        self.targets = torch.tensor(np.array(targets.tolist(), dtype=np.float32), dtype=torch.float)
        self.images_folder = images_folder
        self.transform = transform
        self.image_extension = image_extension

    def __len__(self):
        return len(self.image_labels)

    def __getitem__(self, idx):
        # Construct full image path
        image_filename = self.image_labels[idx] + self.image_extension
        image_path = os.path.join(self.images_folder, image_filename)
        
        # Load image using PIL
        image = Image.open(image_path).convert("RGB")  # Ensure 3 channels (RGB)
        
        # Apply transformations if any
        if self.transform:
            image = self.transform(image)
        
        # Multi-hot encoded target
        label = self.targets[idx]

        return image, label