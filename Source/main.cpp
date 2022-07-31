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
  
  // About Page
  http.Get("/about", [](Request* req, Response* res) {
    res->SetHeader("Content-Type", "text/html; charset=UTF-8");
    res->SendFile("www/about.html");
  });

  // Favicon
  http.Get("/android-chrome-192x192.png", [](Request* req, Response* res) {
    res->SendFile("www/android-chrome-192x192.png");
  });
  http.Get("/android-chrome-512x512.png", [](Request* req, Response* res) {
    res->SendFile("www/android-chrome-512x512.png");
  });
  http.Get("/apple-touch-icon.png", [](Request* req, Response* res) {
    res->SendFile("www/apple-touch-icon.png");
  });
  http.Get("/browserconfig.xml", [](Request* req, Response* res) {
    res->SendFile("www/browserconfig.xml");
  });
  http.Get("/favicon-16x16.png", [](Request* req, Response* res) {
    res->SendFile("www/favicon-16x16.png");
  });
  http.Get("/favicon-32x32.png", [](Request* req, Response* res) {
    res->SendFile("www/favicon-32x32.png");
  });
  http.Get("/favicon.ico", [](Request* req, Response* res) {
    res->SendFile("www/favicon.ico");
  });
  http.Get("/mstile-150x150.png", [](Request* req, Response* res) {
    res->SendFile("www/mstile-150x150.png");
  });
  http.Get("/safari-pinned-tab.png", [](Request* req, Response* res) {
    res->SendFile("www/safari-pinned-tab.png");
  });
  http.Get("/site.webmanifest", [](Request* req, Response* res) {
    res->SendFile("www/site.webmanifest");
  });

  std::cout << "Starting server!" << std::endl;
  http.Start();
}