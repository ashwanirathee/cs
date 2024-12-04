
set(SOURCE_FILES
    "./../src/geometry_base.cpp"
    "./../src/image_io.cpp"
    "./../src/json_support.cpp")

add_executable(points ${SOURCE_FILES} points.cpp)
add_executable(read_ppm ${SOURCE_FILES} read_ppm.cpp)
add_executable(remove_perspective_distortion ${SOURCE_FILES} remove_perspective_distortion.cpp)
add_executable(eigen_test eigen_test.cpp)
add_executable(rapidjson_test rapidjson_test.cpp)
add_executable(rapidjson_test2 rapidjson_test2.cpp)

target_include_directories(points PUBLIC ${BASE_INCLUDE_DIR})
target_include_directories(read_ppm PUBLIC  ${BASE_INCLUDE_DIR})
target_include_directories(remove_perspective_distortion PUBLIC  ${BASE_INCLUDE_DIR})
target_include_directories(rapidjson_test PUBLIC ${COMBINED_INCLUDE_DIR})
target_include_directories(rapidjson_test2 PUBLIC ${COMBINED_INCLUDE_DIR})