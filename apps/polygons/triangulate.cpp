#include <SFML/Audio.hpp>
#include <SFML/Graphics.hpp>
#include <iostream>
#include <vector>

using namespace std;

// we are not talking about polygonization of point sets
// which in itself is a very interesting problem
// here we focus on just simple polygon where edges and points are defined.

struct Point {
    double x, y;
};

struct Edge {
    Point start, end;
};

vector<Point> createRegularPolygon(int sides, double radius, Point center) {
    vector<Point> points;
    double angleIncrement = 2 * M_PI / sides;
    for (int i = 0; i < sides; ++i) {
        double angle = i * angleIncrement;
        points.push_back({center.x + radius * cos(angle), center.y + radius * sin(angle)});
    }
    return points;
}

vector<Edge> triangulate(vector<Point> points, vector<Edge> edges){
    vector<Edge> possibleDiagonals;
    for (int i = 0; i < points.size(); i++) {
        for (int j = 0; j < points.size(); j++) {
            if(i == j) continue; // points aren't same

            // check if the points[i] and points[j] are connected by an edge
            bool connected = false;
            for (const auto& edge : edges) {
                if ((edge.start.x == points[i].x && edge.start.y == points[i].y && edge.end.x == points[j].x && edge.end.y == points[j].y) ||
                    (edge.start.x == points[j].x && edge.start.y == points[j].y && edge.end.x == points[i].x && edge.end.y == points[i].y)) {
                    connected = true;
                    break;
                }
            }
            if (!connected)
                cout << "Points " << i << " and " << j << " are not connected by an edge." << endl;
            else{
                cout << "Points " << i << " and " << j << " are connected by an edge." << endl;
                continue;
            }

            cout << "Point " << i << ": (" << points[i].x << ", " << points[i].y << ")" << endl;
            cout << "Point " << j << ": (" << points[j].x << ", " << points[j].y << ")" << endl;
            possibleDiagonals.push_back({points[i], points[j]});

            // a valid diagonal has been found
            // check if the diagonal intersects with any other edge
            // if it does, then it's not a valid diagonal
            // if it doesn't, then it's a valid diagonal
            // if it's a valid diagonal, then add it to the list of diagonals
            Edge possibleDiagonal = {points[i], points[j]};
            // if(isValidDiagonal(points, edges, possibleDiagonal)){
            //     cout << "Diagonal from " << i << " to " << j << " is valid." << endl;
            // }
            // else{
            //     cout << "Diagonal from " << i << " to " << j << " is not valid." << endl;
            // }
        }
    }
    return possibleDiagonals;
}

int main() {
    // Define a regular hexagon with 6 vertices
    // int sides = 6;
    // double radius = 1.0;
    // Point center = {0, 0};
    // vector<Point> polygon = createRegularPolygon(sides, radius, center);

    vector<Point> polygon = {
        {0, 0}, {2, 0}, {3, 1}, {2, 2}, {0, 2}, {-1, 1}
    };

    // Define edges explicitly
    vector<Edge> edges = {
        {polygon[0], polygon[1]},
        {polygon[1], polygon[2]},
        {polygon[2], polygon[3]},
        {polygon[3], polygon[4]},
        {polygon[4], polygon[5]},
        {polygon[5], polygon[0]} // Closing the loop
    };

    // question: how do we know if the polygon is simple?
    // question: how do we know if the polygon is convex?
    // question: how do we know if the polygon is concave?
    // question: how do we know given point sets that it's simple polygon will have n data points
    // question: given points, will there always exist a simple polygon?

    // Output the polygon edges
    cout << "Polygon Edges:" << endl;
    for (const auto& edge : edges) {
        cout << "(" << edge.start.x << ", " << edge.start.y << ") -> "
             << "(" << edge.end.x << ", " << edge.end.y << ")" << endl;
    }

    // first question: what's the number of vertices?
    // this is rather obvious
    cout << "Number of vertices: " << polygon.size() << endl;

    // second question: what's the number of edges?
    cout << "Number of edges: " << edges.size() << endl;

    // by jordan theorem, there is interior, exterior, and boundary of polygon
    // we say polygon for both interior and boundary
    // For now I take the theorem as is
    // Triangulation theorem: every simple polygon can be triangulated
    // Every triangulation of an n-gon has n − 2 triangles.

    // third question: what's the number of triangles?
    cout << "Number of triangles: " << polygon.size() - 2 << endl; // n-2 is the max number of triangles

    vector<Edge> diagonals = triangulate(polygon, edges);
    // Create an SFML window
    // sf::Window window(sf::VideoMode({800,600}), "Polygon Triangulation");
    sf::RenderWindow window(sf::VideoMode({800, 600}), "Polygon Triangulation");

    // Create a list of SFML lines to draw the edges
    vector<sf::Vertex> vertices;
    for (const auto& edge : edges) {
        // Convert from double to float for SFML drawing
        sf::Vertex start{sf::Vector2f(static_cast<float>(edge.start.x * 100 + 250), static_cast<float>(edge.start.y * 100 + 250)), sf::Color::Red, {100.f, 100.f}};
        sf::Vertex end{sf::Vector2f(static_cast<float>(edge.end.x * 100 + 250), static_cast<float>(edge.end.y * 100 + 250)), sf::Color::Red, {100.f, 100.f}};
        vertices.push_back(start);
        vertices.push_back(end);
    }

    for (const auto& edge : diagonals) {
        // Convert from double to float for SFML drawing
        sf::Vertex start{sf::Vector2f(static_cast<float>(edge.start.x * 100 + 250), static_cast<float>(edge.start.y * 100 + 250)), sf::Color::Blue, {100.f, 100.f}};
        sf::Vertex end{sf::Vector2f(static_cast<float>(edge.end.x * 100 + 250), static_cast<float>(edge.end.y * 100 + 250)), sf::Color::Blue, {100.f, 100.f}};
        vertices.push_back(start);
        vertices.push_back(end);
    }

    while (window.isOpen())
    {
        while (const std::optional event = window.pollEvent())
        {
            if (event->is<sf::Event::Closed>())
            {
                window.close();
            }
            else if (const auto* keyPressed = event->getIf<sf::Event::KeyPressed>())
            {
                if (keyPressed->scancode == sf::Keyboard::Scancode::Escape)
                    window.close();
            }
        }
        // Clear the screen
        window.clear(sf::Color::White);

        // Draw the polygon
        window.draw(vertices.data(), vertices.size(), sf::PrimitiveType::Lines);

        // Display the window contents
        window.display();
    }

    return 0;
}
