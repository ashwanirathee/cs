#include <iostream>
#include <image_io.hpp>
#include <geometry_base.hpp>
#include <json_support.hpp>
#include <Eigen/Dense>

using namespace Eigen;
using namespace std;

int main(int argc, char* argv[]){
    if (argc < 2) {
        std::cerr << "Please provide a file name as an argument." << std::endl;
        return 1;
    }

    // vector<pair<int,int>> cp_i = {{100,100},{200,100}, {100, 250}, {200,250}};
    // vector<pair<int, int>> cp_j = {{512,1067}, {730,1026},{519,1526},{723,1421}};
    vector<pair<int,int>> cp_i;
    vector<pair<int, int>> cp_j;
    string filename = argv[1];
    string cor_filename = argv[2];
    readJson(cp_i, cp_j, cor_filename);

    Eigen::Matrix3f H = calculateHomography(cp_j, cp_i);
    Eigen::Matrix3f H_inv = H.inverse();

    // Read the input image (PPM format)
    Image* inputImage;
    if (!read_ppm(filename, inputImage))
    {
        return -1;
    }

    Image* outputImage = applyInverseHomography(inputImage, H_inv);

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