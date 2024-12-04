cmake_minimum_required(VERSION 3.12)
project(cvcg)

cmake_policy(SET CMP0135 NEW) 


set(CMAKE_CXX_FLAGS_DEBUG "${CMAKE_CXX_FLAGS_DEBUG} -g")
set(CMAKE_C_FLAGS_DEBUG "${CMAKE_C_FLAGS_DEBUG} -g")

set(CMAKE_C_FLAGS "${CMAKE_C_FLAGS} -pthread")
set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -pthread")

set(CMAKE_CXX_STANDARD 14)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

if(NOT CMAKE_BUILD_TYPE)
  set(CMAKE_BUILD_TYPE Debug)
endif()

include(FetchContent)
FetchContent_Declare(
  googletest
  URL https://github.com/google/googletest/archive/03597a01ee50ed33e9dfd640b249b4be3799d395.zip
)
# For Windows: Prevent overriding the parent project's compiler/linker settings
set(gtest_force_shared_crt ON CACHE BOOL "" FORCE)
FetchContent_MakeAvailable(googletest)

# Path to the locally downloaded Eigen (adjust the path if needed)
set(BASE_INCLUDE_DIR "${CMAKE_SOURCE_DIR}/include")
set(EIGEN3_INCLUDE_DIR "${CMAKE_SOURCE_DIR}/external/eigen")
set(EXTERNAL_INCLUDE_DIR "${CMAKE_SOURCE_DIR}/external/rapidjson/include")
set(COMBINED_INCLUDE_DIR ${BASE_INCLUDE_DIR} ${EIGEN3_INCLUDE_DIR} ${EXTERNAL_INCLUDE_DIR})

# Add the include directory for Eigen
include_directories(${EIGEN3_INCLUDE_DIR})
include_directories(${EXTERNAL_INCLUDE_DIR})

add_subdirectory(src)
add_subdirectory(apps)
