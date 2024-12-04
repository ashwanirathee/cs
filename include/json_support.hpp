#ifndef JSON_SUPPORT_HPP
#define JSON_SUPPORT_HPP

#include <rapidjson/document.h>
#include <rapidjson/writer.h>
#include <rapidjson/stringbuffer.h>
#include <vector>

using namespace rapidjson;
using namespace std;

void writeJson(const vector<pair<int, int>>& cp_i, const vector<pair<int, int>>& cp_j, const string& filename);
void readJson(vector<pair<int, int>>& cp_i, vector<pair<int, int>>& cp_j, const string& filename);

#endif