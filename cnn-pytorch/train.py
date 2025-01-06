import torch
import torch.optim as optim
import torch.nn as nn
from model import CNN
from torch.utils.data import DataLoader
from dataset import prepare_dataset
from torchvision import transforms

def train_model(model, train_loader, val_loader, device, num_epochs=10):
    criterion = nn.CrossEntropyLoss()
    optimizer = optim.Adam(model.parameters(), lr=0.001)

    for epoch in range(num_epochs):
        model.train()
        train_loss = 0.0
        train_correct = 0
        train_total = 0

        for images, labels in train_loader:
            images, labels = images.to(device), labels.to(device)

            optimizer.zero_grad()
            outputs = model(images)
            loss = criterion(outputs, labels)
            loss.backward()
            optimizer.step()

            train_loss += loss.item()
            _, predicted = torch.max(outputs.data, 1)
            train_total += labels.size(0)
            train_correct += (predicted == labels).sum().item()

        # Validation
        model.eval()
        val_loss = 0.0
        val_correct = 0
        val_total = 0

        with torch.no_grad():
            for images, labels in val_loader:
                images, labels = images.to(device), labels.to(device)
                outputs = model(images)
                loss = criterion(outputs, labels)

                val_loss += loss.item()
                _, predicted = torch.max(outputs.data, 1)
                val_total += labels.size(0)
                val_correct += (predicted == labels).sum().item()

        print(f'Epoch [{epoch+1}/{num_epochs}]')
        print(f'Train Loss: {train_loss/len(train_loader):.4f}, Train Acc: {100*train_correct/train_total:.2f}%')
        print(f'Val Loss: {val_loss/len(val_loader):.4f}, Val Acc: {100*val_correct/val_total:.2f}%')
        print('--------------------')

def main():
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

    transform = transforms.Compose([
        transforms.Resize((128, 128)),
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
    ])

    good_folder = "./dataset/good"
    poor_folder = "./dataset/poor"
    train_images, train_labels, val_images, val_labels = prepare_dataset(good_folder, poor_folder, transform)

    train_loader = DataLoader(list(zip(train_images, train_labels)), batch_size=32, shuffle=True)
    val_loader = DataLoader(list(zip(val_images, val_labels)), batch_size=32, shuffle=False)

    model = CNN().to(device)

    train_model(model, train_loader, val_loader, device)

    torch.save(model.state_dict(), 'satellite_classifier.pth')

if __name__ == "__main__":
    main()
