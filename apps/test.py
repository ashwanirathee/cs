import numpy as np
import cv2 as cv

# Load stereo images
imgL = cv.imread('tsukuba_l.png', cv.IMREAD_COLOR)
imgR = cv.imread('tsukuba_r.png', cv.IMREAD_GRAYSCALE)

# Convert left image to grayscale
imgL_gray = cv.cvtColor(imgL, cv.COLOR_BGR2GRAY)

# Compute disparity map
stereo = cv.StereoBM_create(numDisparities=64, blockSize=21)
disparity = stereo.compute(imgL_gray, imgR)

# Normalize disparity map
disparity_normalized = cv.normalize(
    disparity, None, alpha=0, beta=255, norm_type=cv.NORM_MINMAX, dtype=cv.CV_8U
)

# Stereo camera parameters
focal_length = 700
baseline = 0.1
cx, cy = 320, 240

# Reprojection matrix
Q = np.array([
    [1, 0, 0, -cx],
    [0, -1, 0, cy],  # Flip Y-axis
    [0, 0, focal_length, 0],
    [0, 0, -1 / baseline, 0]
])

# Reproject disparity to 3D
points_3D = cv.reprojectImageTo3D(disparity, Q)

# Mask valid points
mask = disparity > 0
points_3D = points_3D[mask]
colors = imgL[mask]

# Scale and filter points
points_3D /= np.max(np.abs(points_3D)) * 0.5  # Normalize to [-10, 10]
valid_mask = (np.abs(points_3D[:, 0]) < 10) & (np.abs(points_3D[:, 1]) < 10) & (np.abs(points_3D[:, 2]) < 10)
points_3D = points_3D[valid_mask]
colors = colors[valid_mask]

# Save point cloud to PLY file
def save_point_cloud_with_color(filename, points, colors):
    with open(filename, 'w') as f:
        f.write("ply\n")
        f.write("format ascii 1.0\n")
        f.write(f"element vertex {len(points)}\n")
        f.write("property float x\n")
        f.write("property float y\n")
        f.write("property float z\n")
        f.write("property uchar red\n")
        f.write("property uchar green\n")
        f.write("property uchar blue\n")
        f.write("end_header\n")
        for point, color in zip(points, colors):
            f.write(f"{point[0]} {point[1]} {point[2]} {color[2]} {color[1]} {color[0]}\n")

save_point_cloud_with_color("improved_point_cloud.ply", points_3D, colors)

print("Improved point cloud saved as 'improved_point_cloud.ply'")
