#include <iostream>
#include <fstream>
#include <vector>
#include <utility>
#include <rapidjson/document.h>
#include <rapidjson/writer.h>
#include <rapidjson/stringbuffer.h>
#include <sstream>

using namespace rapidjson;
using namespace std;

void writeJson(const vector<pair<int, int>>& cp_i, const vector<pair<int, int>>& cp_j, const string& filename) {
    // Create a JSON Document
    Document document;
    document.SetObject();
    Document::AllocatorType& allocator = document.GetAllocator();

    // Create arrays for the point data
    Value cp_i_array(kArrayType);
    Value cp_j_array(kArrayType);

    // Populate cp_i array
    for (const auto& point : cp_i) {
        Value point_obj(kObjectType);
        point_obj.AddMember("x", point.first, allocator);
        point_obj.AddMember("y", point.second, allocator);
        cp_i_array.PushBack(point_obj, allocator);
    }

    // Populate cp_j array
    for (const auto& point : cp_j) {
        Value point_obj(kObjectType);
        point_obj.AddMember("x", point.first, allocator);
        point_obj.AddMember("y", point.second, allocator);
        cp_j_array.PushBack(point_obj, allocator);
    }

    // Add the arrays to the document
    document.AddMember("cp_i", cp_i_array, allocator);
    document.AddMember("cp_j", cp_j_array, allocator);

    // Write the document to a file
    StringBuffer buffer;
    Writer<StringBuffer> writer(buffer);
    document.Accept(writer);

    // Write the JSON string to the file
    ofstream ofs(filename);
    ofs << buffer.GetString();
    ofs.close();
}

void readJson(vector<pair<int, int>>& cp_i, vector<pair<int, int>>& cp_j, const string& filename) {
    // Open and parse the JSON file
    ifstream ifs(filename);
    stringstream ss;
    ss << ifs.rdbuf();
    string json_content = ss.str();
    
    Document document;
    document.Parse(json_content.c_str());

    // Read cp_i data
    const Value& cp_i_array = document["cp_i"];
    for (SizeType i = 0; i < cp_i_array.Size(); i++) {
        int x = cp_i_array[i]["x"].GetInt();
        int y = cp_i_array[i]["y"].GetInt();
        cp_i.push_back({x, y});
    }

    // Read cp_j data
    const Value& cp_j_array = document["cp_j"];
    for (SizeType i = 0; i < cp_j_array.Size(); i++) {
        int x = cp_j_array[i]["x"].GetInt();
        int y = cp_j_array[i]["y"].GetInt();
        cp_j.push_back({x, y});
    }
}

int main() {
    // Sample points
    vector<pair<int, int>> cp_i = {{100, 100}, {200, 100}, {100, 250}, {200, 250}};
    vector<pair<int, int>> cp_j = {{512, 1067}, {730, 1026}, {519, 1526}, {723, 1421}};

    // Write points to JSON file
    writeJson(cp_i, cp_j, "points.json");

    // Read points from JSON file
    vector<pair<int, int>> cp_i_read, cp_j_read;
    readJson(cp_i_read, cp_j_read, "points.json");

    // Print out the read points
    cout << "Read cp_i points:" << endl;
    for (const auto& point : cp_i_read) {
        cout << "(" << point.first << ", " << point.second << ")" << endl;
    }

    cout << "Read cp_j points:" << endl;
    for (const auto& point : cp_j_read) {
        cout << "(" << point.first << ", " << point.second << ")" << endl;
    }

    return 0;
}
