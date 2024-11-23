#include <image_io.hpp>

bool read_ppm(const std::string &filename, Image* &image) {
    std::ifstream file(filename, std::ios::binary);

    if (!file) {
        std::cerr << "Error opening file: " << filename << std::endl;
        return false;
    }

    std::string magicNumber;
    int maxColorValue;

    // Read PPM header
    file >> magicNumber;
    if (magicNumber != "P6") {
        std::cerr << "Invalid PPM format (not P6)" << std::endl;
        return false;
    }

    // Read width, height, and max color value
    int width, height;
    file >> width >> height >> maxColorValue;
    file.ignore(256, '\n');  // Consume the newline character after the header

    // Allocate memory for the image after we know the dimensions
    image = new Image(width, height);

    if (maxColorValue != 255) {
        std::cerr << "Unsupported max color value (only 255 is supported)" << std::endl;
        return false;
    }

    // Read pixel data into red, green, and blue channels
    for (int y = 0; y < height; ++y) {
        for (int x = 0; x < width; ++x) {
            file.read(reinterpret_cast<char*>(&image->red[y][x]), sizeof(uint8_t));   // Red
            file.read(reinterpret_cast<char*>(&image->green[y][x]), sizeof(uint8_t)); // Green
            file.read(reinterpret_cast<char*>(&image->blue[y][x]), sizeof(uint8_t));  // Blue
        }
    }

    file.close();
    return true;
}

bool write_ppm(const std::string &filename, Image* image) {
    std::ofstream file(filename, std::ios::binary);
    if (!file) {
        std::cerr << "Error opening file for writing: " << filename << std::endl;
        return false;
    }

    // Write PPM header
    file << "P6\n" << image->width << " " << image->height << "\n255\n";

    // Write pixel data: red, green, and blue channels
    for (int y = 0; y < image->height; ++y) {
        for (int x = 0; x < image->width; ++x) {
            file.write(reinterpret_cast<const char*>(&image->red[y][x]), sizeof(uint8_t));
            file.write(reinterpret_cast<const char*>(&image->green[y][x]), sizeof(uint8_t));
            file.write(reinterpret_cast<const char*>(&image->blue[y][x]), sizeof(uint8_t));
        }
    }

    file.close();
    return true;
}
