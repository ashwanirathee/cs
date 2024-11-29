#include <iostream>
#include <fstream>
#include <vector>
#include <string>
#include <image_io.hpp>
#include <geometry_base.hpp>

using namespace std;

int main()
{
    Image *image = nullptr; // Initially nullptr

    if (read_ppm("./../assets/part1pairs/house_2.ppm", image))
    {
        std::cout << "Image loaded successfully." << std::endl;
    }
    else
    {
        std::cerr << "Failed to load the image." << std::endl;
        return 1;
    }

    uint8_t res = image->set_pixel(110, 131,255,255,255); // first is x and then y
    if(!res) std::cout << "Able to set pixel!" << endl;

    Pixel p = image->get_pixel(110, 131); // first is x and then y
    std::cout << "Able to get pixel!" << endl;
    cout << " Pixel:" << (int)p.r << " " << (int)p.g << " " << (int)p.b << endl;

    if (write_ppm("output.ppm", image))
    {
        std::cout << "Image written successfully." << std::endl;
    }
    else
    {
        std::cerr << "Failed to write image." << std::endl;
        return 1;
    }

    // Free the dynamically allocated memory
    delete image;
    return 0;
}
