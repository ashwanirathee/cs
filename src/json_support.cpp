#include <json_support.hpp>
#include <iostream>
#include <fstream>
#include <utility>
#include <sstream>

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

