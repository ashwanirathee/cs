#ifndef IMAGE_IO_HPP
#define IMAGE_IO_HPP

#include <vector>
#include <string>
#include <fstream>
#include <iostream>
#include <cstdint>

class Pixel
{
public:
    uint8_t r, g, b;

    Pixel(uint8_t red, uint8_t green, uint8_t blue) : r(red), g(green), b(blue) {}
};

class Image
{
private:
    std::vector<std::vector<uint8_t>> red;
    std::vector<std::vector<uint8_t>> green;
    std::vector<std::vector<uint8_t>> blue;
    int width, height;

public:
    // Constructor
    Image(int w, int h) : width(w), height(h)
    {
        // Initialize the 2D arrays for each color channel with the given width and height
        red.resize(height, std::vector<uint8_t>(width));
        green.resize(height, std::vector<uint8_t>(width));
        blue.resize(height, std::vector<uint8_t>(width));
    }

    // Function to get a pixel at (x, y)
    Pixel get_pixel(int x, int y) const
    {
        // Check bounds for the x and y coordinates
        if (x < 0 || x >= width || y < 0 || y >= height)
        {
            throw std::out_of_range("Pixel coordinates out of range");
        }
        return Pixel{red[y][x], green[y][x], blue[y][x]};
    }

    // Example setter to fill the arrays (for testing purposes)
    int set_pixel(int x, int y, uint8_t r, uint8_t g, uint8_t b)
    {
        try
        {
            // Check bounds for the x and y coordinates
            if (x < 0 || x >= width || y < 0 || y >= height)
            {
                throw std::out_of_range("Pixel coordinates out of range");
            }

            // Set the pixel values
            red[y][x] = r;
            green[y][x] = g;
            blue[y][x] = b;
            return 0;
        }
        catch (const std::out_of_range &e)
        {
            // Handle the exception (print the error message)
            std::cerr << "Error: " << e.what() << std::endl;
            return 1;
        }
    }

    // Getters for image dimensions
    int get_width() const { return width; }
    int get_height() const { return height; }
    friend bool read_ppm(const std::string &filename, Image *&image);
    friend bool write_ppm(const std::string &filename, Image *image);
};

bool read_ppm(const std::string &filename, Image *&image);
bool write_ppm(const std::string &filename, Image *image);

#endif