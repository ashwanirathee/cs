import torch
from torchvision import datasets, transforms
from torch.utils.data import DataLoader
import torch.nn as nn
from torchvision import models
import torch.optim as optim
import numpy as np

# Define transformations
transform = transforms.Compose([
    transforms.Resize((224, 224)),       # Resize images to 224x224
    transforms.ToTensor(),               # Convert images to PyTorch tensors
    transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])  # Normalize with ImageNet stats
])

# Load Flowers102 dataset
train_data = datasets.Flowers102(
    root="./data",  # Directory to store data
    split="test",  # Options: 'train', 'val', 'test'
    transform=transform,
    download=True   # Download if not already downloaded
)

val_data = datasets.Flowers102(
    root="./data",
    split="val",
    transform=transform,
    download=True
)

test_data = datasets.Flowers102(
    root="./data",
    split="train",
    transform=transform,
    download=True
)

# Data loaders
train_loader = DataLoader(train_data, batch_size=32, shuffle=True)
val_loader = DataLoader(val_data, batch_size=32, shuffle=False)
test_loader = DataLoader(test_data, batch_size=32, shuffle=False)

# Check dataset size
print(f"Train size: {len(train_data)}")
print(f"Validation size: {len(val_data)}")
print(f"Test size: {len(test_data)}")

# Load pre-trained model
device = torch.device("mps" if torch.backends.mps.is_available() else "cpu")
print(device)
model = models.resnet50(pretrained=True)

# Modify the classifier
num_features = model.fc.in_features
model.fc = nn.Linear(num_features, 102)  # 102 classes
model = model.to(device)

# Define loss and optimizer
criterion = nn.CrossEntropyLoss()
optimizer = optim.Adam(model.fc.parameters(), lr=0.001)

# Training loop
epochs = 50
for epoch in range(epochs):
    model.train()
    running_loss = 0
    for images, labels in train_loader:
        images, labels = images.to(device), labels.to(device)
        optimizer.zero_grad()
        outputs = model(images)
        loss = criterion(outputs, labels)
        loss.backward()
        optimizer.step()
        running_loss += loss.item()

    print(f"Epoch {epoch+1}/{epochs}, Loss: {running_loss/len(train_loader)}")

# Save the model
torch.save(model.state_dict(), "flower_model.pth")