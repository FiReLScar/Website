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

  http.Get("/js/terminal.js", [](Request* req, Response* res) {
    res->SetHeader("Content-Type", "text/javascript; charset=UTF-8");
    res->SendFile("www/js/terminal.js");
  });
  
  // About Page
  http.Get("/about", [](Request* req, Response* res) {
    res->SetHeader("Content-Type", "text/html; charset=UTF-8");
    res->SendFile("www/about.html");
  });
  
  // Resume Page
  http.Get("/resume", [](Request* req, Response* res) {
    res->SetHeader("Content-Type", "application/pdf; charset=UTF-8");
    res->SendFile("www/resume.pdf");
  });
  
  // Contact Page
  http.Get("/contact", [](Request* req, Response* res) {
    res->SetHeader("Content-Type", "text/html; charset=UTF-8");
    res->SendFile("www/contact.html");
  });

  // Favicon
  http.Get("/android-chrome-192x192.png", [](Request* req, Response* res) {
    res->SendFile("favicon/android-chrome-192x192.png");
  });
  http.Get("/android-chrome-512x512.png", [](Request* req, Response* res) {
    res->SendFile("favicon/android-chrome-512x512.png");
  });
  http.Get("/apple-touch-icon.png", [](Request* req, Response* res) {
    res->SendFile("favicon/apple-touch-icon.png");
  });
  http.Get("/browserconfig.xml", [](Request* req, Response* res) {
    res->SendFile("favicon/browserconfig.xml");
  });
  http.Get("/favicon-16x16.png", [](Request* req, Response* res) {
    res->SendFile("favicon/favicon-16x16.png");
  });
  http.Get("/favicon-32x32.png", [](Request* req, Response* res) {
    res->SendFile("favicon/favicon-32x32.png");
  });
  http.Get("/favicon.ico", [](Request* req, Response* res) {
    res->SendFile("favicon/favicon.ico");
  });
  http.Get("/mstile-150x150.png", [](Request* req, Response* res) {
    res->SendFile("favicon/mstile-150x150.png");
  });
  http.Get("/safari-pinned-tab.png", [](Request* req, Response* res) {
    res->SendFile("favicon/safari-pinned-tab.png");
  });
  http.Get("/site.webmanifest", [](Request* req, Response* res) {
    res->SendFile("favicon/site.webmanifest");
  });

  // SEO Stuff
  http.Get("/robots.txt", [](Request* req, Response* res) {
    res->SendFile("www/robots");
  });

  http.Get("/sitemap.xml", [](Request* req, Response* res) {
    res->SetHeader("Content-Type", "application/xml");
    res->SendFile("www/sitemap.xml");
  });

  std::cout << "Starting server!" << std::endl;
  http.Start();
}