sed -i -e 's/3000/1337/g' Source/main.cpp
make
sudo rm -r /web/levihicks.dev/www/
sudo rm /web/levihicks.dev/Link
sudo cp Website /web/levihicks.dev/Link
sudo cp -R www/ /web/levihicks.dev/www/
sudo systemctl restart levihicks.dev.service