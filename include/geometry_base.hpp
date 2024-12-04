#ifndef GEOMETRY_BASE_HPP
#define GEOMETRY_BASE_HPP

#include <vector>
#include <Eigen/Dense>
#include <image_io.hpp>

using namespace Eigen;

class PGPoint;

class PGLine{
    public:
    Vector3f* line;
    PGLine(float a, float b, float c);
    PGLine(Vector3f line);
    ~PGLine();
    PGPoint intersectionWithLine(PGLine line2);
};

class PGPoint {
    public:
    Vector3f* point;
    PGPoint(float xp, float yp, float k);
    PGPoint(Vector3f point);
    ~PGPoint();
    std::vector<float> toTriple();
    bool operator==(const PGPoint& other) const;
    // PGPoint operator*(const Eigen::Matrix3d& trs) const;
    void display() const;     // Method to display PGPoint details!
    bool isIdealPoint();
    std::vector<float> toEGPoint();
    Vector3f transform(Matrix3f T);
    bool onLineCheck(PGLine line);
    PGLine createLineWithAnotherPoint(PGPoint point2);
    Vector3f* getPoint();
    std::pair<float,float> getCartesianCoordinates();
};

Image* applyInverseHomography(const Image* inputImage, const Eigen::Matrix3f& H_inv);
Eigen::Matrix3f calculateHomography(std::vector<std::pair<int,int>> cp_i, std::vector<std::pair<int, int>> cp_j);

#endif