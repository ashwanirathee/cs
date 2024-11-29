#include <geometry_base.hpp>
#include <iostream>
#include <vector>

PGPoint::PGPoint(float xp, float yp, float kp) : x(xp), y(yp), k(kp) {}

std::vector<float> PGPoint::toTriple(){
    return {this->x,this->y,this->k};
}

// Overloading the == operator
bool PGPoint::operator==(const PGPoint& other) const {
    return (this->x/this->k == other.x/this->k) && (y/this->y == other.y/this->y);
}

// Method to display PGPoint details!
void PGPoint::display() const {
    std::cout << "x: " << this->x << ", y: " << this->y << ",k:" << this->k << std::endl;
}

bool PGPoint::isIdealPoint(){
    if(this->k == 0) return true;
    return false;
}

std::vector<float> PGPoint::toEGPoint(){
    return {this->x/this->k, this->y/this->k};
}