#include <iostream>
#include <vector>
using namespace std;

class Point2D {
    int x;
    int y;
    public:
        Point2D(int x, int y){
            this->x = x;
            this->y = y;
        }
};

class PointList {
    public:
        std::vector<Point2D> pointlist;
};

int main(){
    PointList data;
    Point2D point1(0,0);
    Point2D point2(0,2);
    Point2D point3(2,2);
    Point2D point4(2,0);
    data.pointlist.push_back(point1);
    data.pointlist.push_back(point2);
    data.pointlist.push_back(point3);
    data.pointlist.push_back(point4);
    cout << data.pointlist.size() << endl;
    return 0;
}