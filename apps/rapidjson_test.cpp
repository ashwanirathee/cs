#include <iostream>
#include <rapidjson/document.h>  // Include RapidJSON's document header
#include <rapidjson/writer.h>    // Include RapidJSON's writer header
#include <rapidjson/stringbuffer.h>  // Include RapidJSON's string buffer header

int main() {
    // Example JSON string (input data)
    const char* json = R"({
        "name": "John",
        "age": 30,
        "isStudent": false,
        "address": {
            "street": "123 Main St",
            "city": "Anytown"
        }
    })";

    // Parse the JSON string
    rapidjson::Document document;
    document.Parse(json);

    // Check for errors during parsing
    if (document.HasParseError()) {
        std::cerr << "Error parsing JSON!" << std::endl;
        return 1;
    }

    // Access and print values from the JSON
    if (document.HasMember("name") && document["name"].IsString()) {
        std::cout << "Name: " << document["name"].GetString() << std::endl;
    }

    if (document.HasMember("age") && document["age"].IsInt()) {
        std::cout << "Age: " << document["age"].GetInt() << std::endl;
    }

    if (document.HasMember("isStudent") && document["isStudent"].IsBool()) {
        std::cout << "Is Student: " << (document["isStudent"].GetBool() ? "Yes" : "No") << std::endl;
    }

    // Access nested object "address"
    if (document.HasMember("address") && document["address"].IsObject()) {
        const rapidjson::Value& address = document["address"];
        if (address.HasMember("street") && address["street"].IsString()) {
            std::cout << "Street: " << address["street"].GetString() << std::endl;
        }
        if (address.HasMember("city") && address["city"].IsString()) {
            std::cout << "City: " << address["city"].GetString() << std::endl;
        }
    }

    // Modify a value in the JSON document
    document["age"] = 31;  // Update age to 31
    document["isStudent"] = true;  // Update isStudent to true

    // Create a new value to add
    rapidjson::Value country("USA", document.GetAllocator());
    document.AddMember("country", country, document.GetAllocator());

    // Serialize the modified document back to a JSON string
    rapidjson::StringBuffer buffer;
    rapidjson::Writer<rapidjson::StringBuffer> writer(buffer);
    document.Accept(writer);

    // Output the modified JSON string
    std::cout << "Modified JSON: " << buffer.GetString() << std::endl;

    return 0;
}
