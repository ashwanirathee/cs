#include <geometry_base.hpp>
#include <image_io.hpp>

using namespace std;

// Function to apply inverse homography and transform the image
void applyInverseHomography(const Image* inputImage, Image* outputImage, const Eigen::Matrix3d& H_inv)
{
    int width = outputImage->get_width();  // Use output image dimensions
    int height = outputImage->get_height();
    int input_width = inputImage->get_width();
    int input_height = inputImage->get_height();

    for (int y_out = 0; y_out < height; ++y_out)
    {
        for (int x_out = 0; x_out < width; ++x_out)
        {
            // Convert (x_out, y_out) to homogeneous coordinates
            Eigen::Vector3d point_out(x_out, y_out, 1.0);

            // Apply the inverse homography to find the corresponding point in the input image
            Eigen::Vector3d point_in = H_inv * point_out;

            // Convert back to Cartesian coordinates
            double x_in = point_in(0) / point_in(2);
            double y_in = point_in(1) / point_in(2);

            // Debug: Print transformed coordinates to track if they are out of bounds
            // if (x_out % 100 == 0 && y_out % 100 == 0) {
            //     std::cout << "Transforming (" << x_out << ", " << y_out << ") -> (" << x_in << ", " << y_in << ")" << std::endl;
            // }

            // Ensure the transformed coordinates are within bounds of the input image
            if (x_in >= 0 && x_in < input_width && y_in >= 0 && y_in < input_height)
            {
                // Clamp the coordinates to integer values
                int xi = static_cast<int>(std::round(x_in));  // Round to nearest integer
                int yi = static_cast<int>(std::round(y_in));  // Round to nearest integer
                
                // Make sure the pixel coordinates are within valid bounds
                xi = std::max(0, std::min(xi, input_width - 1));  // Clamp between 0 and width-1
                yi = std::max(0, std::min(yi, input_height - 1)); // Clamp between 0 and height-1

                // Get the pixel from the input image
                Pixel p = inputImage->get_pixel(xi, yi);
                
                // Set the pixel at (x_out, y_out) in the output image
                outputImage->set_pixel(x_out, y_out, p.r, p.g, p.b);
            }
            else
            {
                // Optionally set out-of-bounds pixels to a default color (e.g., black)
                outputImage->set_pixel(x_out, y_out, 0, 0, 0);  // Black pixel for out-of-bounds
            }
        }
    }
}

Eigen::Matrix3d calculateHomography(vector<pair<int,int>> cp_i, vector<pair<int, int>> cp_j){
    MatrixXd A(8, 8);
    VectorXd b(8);
    
    for (int i = 0; i < 4; i++) {
        double x_i = cp_i[i].first;
        double y_i = cp_i[i].second;
        double x_j = cp_j[i].first;
        double y_j = cp_j[i].second;

        A(2*i, 0) = x_i;
        A(2*i, 1) = y_i;
        A(2*i, 2) = 1;
        A(2*i, 3) = 0;
        A(2*i, 4) = 0;
        A(2*i, 5) = 0;
        A(2*i, 6) = -x_j * x_i;
        A(2*i, 7) = -x_j * y_i;
        b(2*i) = x_j;

        A(2*i+1, 0) = 0;
        A(2*i+1, 1) = 0;
        A(2*i+1, 2) = 0;
        A(2*i+1, 3) = x_i;
        A(2*i+1, 4) = y_i;
        A(2*i+1, 5) = 1;
        A(2*i+1, 6) = -y_j * x_i;
        A(2*i+1, 7) = -y_j * y_i;
        b(2*i+1) = y_j;
    }

    // Solve for the homography vector h
    Eigen::VectorXd h = A.colPivHouseholderQr().solve(b);

    // Convert the vector h to a 3x3 homography matrix
    Eigen::Matrix3d H;
    H << h(0), h(1), h(2),
         h(3), h(4), h(5),
         h(6), h(7), 1.0;
    return H;
}
int main(){
    cout << "hello" << endl;
    Matrix3f T;
    T << 1, 0, 1,  // Translation by (1, 0)
         0, 1, 2,  // Translation by (0, 2)
         0, 0, 1;  // Homogeneous coordinate remains unchanged

    PGPoint point1(2.0f, 2.0f, 1.0f);
    Vector3f pgp = point1.transform(T);
    cout << pgp[0] << " " << pgp[1] << " " << pgp[2] << endl;
    
    // example 2.3
    PGLine line_x(-1.0f,0.0f,1.0f);
    bool test = point1.onLineCheck(line_x);
    cout << "Test:" << test << endl;
    PGLine line_y(0.0f,-1.0f,1.0f);
    PGPoint test1 = line_x.intersectionWithLine(line_y);
    // cout << test1.point << endl;

    cout << "Example 2.5:" << endl;
    PGLine line_x1(-1.0f, 0.0f, 1.0f);
    PGLine line_x2(-1.0f, 0.0f, 2.0f);
    PGPoint res = line_x1.intersectionWithLine(line_x2);
    res.display();

    cout << "Example 2.5.1: Line at infinity check" << endl;
    PGLine l_infi(0.0f, 0.0f, 1.0f);
    // for(int i=0;i<5;i++) {
    //     for(int j=0;j<5;j++){
    //         cout << i << " " << j << endl;
    //         PGPoint p((float)i,(float)j, 0.0f);
    //         bool output = p.onLineCheck(l_infi);
    //         cout << *p.point << " is on line:" << output << endl;
    //     }
    // }

    cout << "Example 2.12: Remove projective distortion!" << endl;
    vector<pair<int,int>> cp_i = {{100,100},{200,100}, {100, 250}, {200,250}};
    vector<pair<int, int>> cp_j = {{512,1067}, {730,1026},{519,1526},{723,1421}};

    Eigen::Matrix3d H = calculateHomography(cp_i, cp_j);
    
    // Read the input image (PPM format)
    Image* inputImage;
    if (!read_ppm("./../assets/samples/santa_cruz_beach.ppm", inputImage))
    {
        return -1;
    }

    // Create an empty output image
    Image* outputImage = new Image(2000, 2000);

    // Apply inverse homography to remove distortion
    applyInverseHomography(inputImage, outputImage, H);

    // Write the output image (PPM format)
    if (!write_ppm("output_image.ppm", outputImage))
    {
        return -1;
    }

    std::cout << "Image has been undistorted and saved as output_image.ppm" << std::endl;

    // Clean up
    delete inputImage;
    delete outputImage;
    return 0;
}