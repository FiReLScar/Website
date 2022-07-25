#include <link>
#include <iostream>

int main() {
  Link http(3000);

  // 404 Page
  http.Error(404, [](Request* req, Response* res) {
    res->SetHTTP("HTTP/1.1 404 Not Found\r\n\r\n404 Not Found");
  });
  http.Default([](Request* req, Response* res) {
    res->Error(404);
  });
  
  // Landing Page
  http.Get("/", [](Request* req, Response* res) {
    res->SetHeader("Content-Type", "text/html; charset=UTF-8");
    res->SendFile("www/index.html");
  });

  http.Get("/css/style.css", [](Request* req, Response* res) {
    res->SetHeader("Content-Type", "text/css; charset=UTF-8");
    res->SendFile("www/css/style.css");
  });

  // Levi
  http.Get("/levi.svg", [](Request* req, Response* res) {
    res->SetHeader("Content-Type", "image/svg+xml");
    res->SendFile("www/levi.svg");
  });
  http.Get("/levi-dark.svg", [](Request* req, Response* res) {
    res->SetHeader("Content-Type", "image/svg+xml");
    res->SendFile("www/levi-dark.svg");
  });

  // GitHub Logo
  http.Get("/github.svg", [](Request* req, Response* res) {
    res->SetHeader("Content-Type", "image/svg+xml");
    res->SendFile("www/github.svg");
  });
  http.Get("/github-dark.svg", [](Request* req, Response* res) {
    res->SetHeader("Content-Type", "image/svg+xml");
    res->SendFile("www/github-dark.svg");
  });

  // Hydra
  http.Get("/hydra.png", [](Request* req, Response* res) {
    res->SendFile("www/hydra.png");
  });

  // Link
  http.Get("/link.png", [](Request* req, Response* res) {
    res->SendFile("www/link.png");
  });

  // Nuclear
  http.Get("/nuclear.png", [](Request* req, Response* res) {
    res->SendFile("www/nuclear.png");
  });

  std::cout << "Starting server!" << std::endl;
  http.Start();
}