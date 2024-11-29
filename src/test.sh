set -x

g++ -std=c++20 -I. image_io.cpp geometry_base.cpp read_ppm.cpp

set +x