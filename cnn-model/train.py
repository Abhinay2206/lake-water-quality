import numpy as np
from layers import sigmoid, sigmoid_derivative
from layers import ConvLayer, MaxPool, Dense

def train_model(X_train, y_train, EPOCHS=20, LEARNING_RATE=0.001):
    # Initialize layers
    conv = ConvLayer(8, 3)
    pool = MaxPool(2)

    # Perform a forward pass on a single image to calculate the flattened size
    sample_output = pool.forward(conv.forward(X_train[0]))
    flattened_size = sample_output.flatten().shape[0]

    # Use the dynamically computed flattened size to initialize Dense
    dense = Dense(flattened_size, 1)

    # Training loop
    for epoch in range(EPOCHS):
        loss = 0
        for i in range(len(X_train)):
            # Forward pass
            out = conv.forward(X_train[i])
            out = pool.forward(out)
            out_flattened = out.flatten()  # Flatten output after pooling
            out_dense = dense.forward(out_flattened)
            pred = sigmoid(out_dense)

            # Compute loss
            y_true = y_train[i]
            loss += -y_true * np.log(pred) - (1 - y_true) * np.log(1 - pred)

            # Backpropagation
            dL_dpred = -(y_true / pred - (1 - y_true) / (1 - pred))
            dL_dout = sigmoid_derivative(out_dense) * dL_dpred
            dL_dout = dense.backward(dL_dout, LEARNING_RATE)
            
            # Reshape the gradient before passing it to pooling layer
            dL_dout = dL_dout.reshape(out.shape)  # Use the shape of the pooling layer output
            dL_dout = pool.backward(dL_dout)  # Backprop through pooling
            conv.backward(dL_dout, LEARNING_RATE)  # Backprop through convolutional layer

        print(f"Epoch {epoch+1}, Loss: {loss/len(X_train)}")
    
    return conv, pool, dense