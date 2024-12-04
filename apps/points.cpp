#include <geometry_base.hpp>
#include <image_io.hpp>

using namespace std;

int main(){
    cout << "hello" << endl;
    Matrix3f T;
    T << 1, 0, 1,  // Translation by (1, 0)
         0, 1, 2,  // Translation by (0, 2)
         0, 0, 1;  // Homogeneous coordinate remains unchanged

    PGPoint point1(2.0f, 2.0f, 1.0f);
    Vector3f pgp = point1.transform(T);
    cout << pgp[0] << " " << pgp[1] << " " << pgp[2] << endl;
    
    // example 2.3
    PGLine line_x(-1.0f,0.0f,1.0f);
    bool test = point1.onLineCheck(line_x);
    cout << "Test:" << test << endl;
    PGLine line_y(0.0f,-1.0f,1.0f);
    PGPoint test1 = line_x.intersectionWithLine(line_y);
    // cout << test1.point << endl;

    cout << "Example 2.5:" << endl;
    PGLine line_x1(-1.0f, 0.0f, 1.0f);
    PGLine line_x2(-1.0f, 0.0f, 2.0f);
    PGPoint res = line_x1.intersectionWithLine(line_x2);
    res.display();

    cout << "Example 2.5.1: Line at infinity check" << endl;
    PGLine l_infi(0.0f, 0.0f, 1.0f);
    // for(int i=0;i<5;i++) {
    //     for(int j=0;j<5;j++){
    //         cout << i << " " << j << endl;
    //         PGPoint p((float)i,(float)j, 0.0f);
    //         bool output = p.onLineCheck(l_infi);
    //         cout << *p.point << " is on line:" << output << endl;
    //     }
    // }

    return 0;
}