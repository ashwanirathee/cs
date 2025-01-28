import numpy as np

translation = np.array([[1, 0, -3], [0, 1, 3], [0, 0, 1]])
rotation = np.array([[0, 1, 0], [-1, 0, 0], [0, 0, 1]])
scale = np.array([[2, 0, 0], [0, 1, 0], [0, 0, 1]])
point = np.array([[4], [3], [1]])
print("rotation:\n", rotation)
print("translation:\n", translation)
print("scale:\n", scale)
result = translation @ rotation @ scale @ point

print("Result using np.matmul():\n",result)