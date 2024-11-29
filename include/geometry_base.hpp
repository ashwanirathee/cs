#include <vector>

class PGPoint {
    private:
        float x;
        float y;
        float k;

    PGPoint(float xp, float yp, float k);
    std::vector<float> toTriple();
    bool operator==(const PGPoint& other) const;
    void display() const;     // Method to display PGPoint details!
    bool isIdealPoint();
    std::vector<float> toEGPoint();
};