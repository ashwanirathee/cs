#include <vector>
#include <Eigen/Dense>

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
    void display() const;     // Method to display PGPoint details!
    bool isIdealPoint();
    std::vector<float> toEGPoint();
    Vector3f transform(Matrix3f T);
    bool onLineCheck(PGLine line);
    PGLine createLineWithAnotherPoint(PGPoint point2);
};
