#include <geometry_base.hpp>
#include <iostream>
#include <image_io.hpp>
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

// PGPoint PGPoint::operator*(const Eigen::Matrix3d& trs) const{
//     Vector3d TEST = (*this->point);
//     Vector3d res = trs*TEST;
//     PGPoint point(res);
//     return point;
// }
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

Vector3f* PGPoint::getPoint() {
    return point;
}

std::pair<float,float> PGPoint::getCartesianCoordinates(){
    Vector3f p = *this->point;
    return {p(0)/p(2),p(1)/p(2)};
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

Image* applyInverseHomography(const Image* inputImage, const Eigen::Matrix3f& H_inv)
{
    int width = inputImage->get_width();
    int height = inputImage->get_height();
    Image* outputImage = new Image(width, height);

    for(int x = 0; x < width; x++){
        for(int y = 0;y < height; y++){
            PGPoint point_out((float)x, (float)y, 1.0f);
            Vector3f point = *point_out.getPoint();
            Vector3f point_in_vector = H_inv * point;
            PGPoint point_in(point_in_vector);
            std::pair<int, int> coords = point_in.getCartesianCoordinates();
            
            // Debug: Print transformed coordinates to track if they are out of bounds
            // if (x_out % 100 == 0 && y_out % 100 == 0) {
            //     std::cout << "Transforming (" << x_out << ", " << y_out << ") -> (" << x_in << ", " << y_in << ")" << std::endl;
            // }
            int x_in = coords.first;
            int y_in = coords.second;
            if (x_in >= 0 && x_in < width && y_in >= 0 && y_in < height)
            {
                // Clamp the coordinates to integer values
                int xi = static_cast<int>(std::round(x_in));  // Round to nearest integer
                int yi = static_cast<int>(std::round(y_in));  // Round to nearest integer
                
                // Make sure the pixel coordinates are within valid bounds
                xi = std::max(0, std::min(xi, width - 1));  // Clamp between 0 and width-1
                yi = std::max(0, std::min(yi, height - 1)); // Clamp between 0 and height-1

                // Get the pixel from the input image
                Pixel p = inputImage->get_pixel(xi, yi);
                
                // Set the pixel at (x_out, y_out) in the output image
                outputImage->set_pixel(x, y, p.r, p.g, p.b);
            }
            else
            {
                // Optionally set out-of-bounds pixels to a default color (e.g., black)
                outputImage->set_pixel(x, y, 0, 0, 0);  // Black pixel for out-of-bounds
            }
        }
    }
    return outputImage;
}


Eigen::Matrix3f calculateHomography(std::vector<std::pair<int,int>> cp_i, std::vector<std::pair<int, int>> cp_j){
    MatrixXf A(8, 8);
    VectorXf b(8);
    
    for (int i = 0; i < 4; i++) {
        float x_i = cp_i[i].first;
        float y_i = cp_i[i].second;
        float x_j = cp_j[i].first;
        float y_j = cp_j[i].second;

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
    Eigen::VectorXf h = A.colPivHouseholderQr().solve(b);

    // Convert the vector h to a 3x3 homography matrix
    Eigen::Matrix3f H;
    H << h(0), h(1), h(2),
         h(3), h(4), h(5),
         h(6), h(7), 1.0;
    return H;
}

