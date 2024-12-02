#include <geometry_base.hpp>
#include <iostream>
#include <vector>

PGPoint::PGPoint(float xp, float yp, float kp) {
    this->point = new Vector3f(xp,yp,kp);
}

PGPoint::PGPoint(Vector3f point){
    this->point = new Vector3f(point);
}

PGPoint::~PGPoint(){
    delete point;
}

std::vector<float> PGPoint::toTriple(){
    // return {this->point[0],this->point[1],this->point[2]};
    return {};
}

// Overloading the == operator
bool PGPoint::operator==(const PGPoint& other) const {
    return this->point->cross(*other.point).isZero();
}

// Method to display PGPoint details!
void PGPoint::display() const {
    // std::cout << "x: " << this->point[0] << ", y: " << this->point[1] << ",k:" << this->point[2] << std::endl;
    std::cout << "PGPoint:" << *this->point << std::endl; 
}

bool PGPoint::isIdealPoint(){
    // if(this->point[2] == 0) return true;
    // return false;
    return false;
}

std::vector<float> PGPoint::toEGPoint(){
    // return {this->point[0]/this->point[2], this->point[0]/this->point[2]};
    return {};
}

Vector3f PGPoint::transform(Matrix3f T){
    return T * (*point);
}

bool PGPoint::onLineCheck(PGLine line2){
    double scalarProduct = this->point->dot(*line2.line);
    if(scalarProduct == 0) return true;
    // std::cout << "scalar product:" << scalarProduct << std::endl;
    return false;
}

PGLine PGPoint::createLineWithAnotherPoint(PGPoint point2){
    Vector3f line = this->point->cross(*point2.point);
    PGLine res(line);
    return res;
}

PGLine::PGLine(float a, float b, float c) {
    this->line = new Vector3f(a,b,c);
}

PGLine::PGLine(Vector3f line){
    this->line = new Vector3f(line);
}

PGLine::~PGLine(){
    delete line;
}

PGPoint PGLine::intersectionWithLine(PGLine line2){
    Vector3f x = this->line->cross(*line2.line);
    PGPoint test(x);
    return test;
}