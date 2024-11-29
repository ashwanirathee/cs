
set(SOURCE_FILES
    "./../src/geometry_base.cpp"
    "./../src/image_io.cpp")

add_executable(points ${SOURCE_FILES} points.cpp)
add_executable(read_ppm ${SOURCE_FILES} read_ppm.cpp)

target_include_directories(points PUBLIC ${CMAKE_CURRENT_SOURCE_DIR})
target_include_directories(points PUBLIC ${CMAKE_CURRENT_SOURCE_DIR}/../include/)
target_include_directories(read_ppm PUBLIC ${CMAKE_CURRENT_SOURCE_DIR})
target_include_directories(read_ppm PUBLIC ${CMAKE_CURRENT_SOURCE_DIR}/../include/)

add_executable(eigen_test eigen_test.cpp)