sed -i -e 's/3000/1337/g' Source/main.cpp
make
if [ ! -e /web/levihicks.dev/ ]; then
    sudo mkdir /web/levihicks.dev/
fi
if [ -e /web/levihicks.dev/www/ ]; then
    sudo rm -r /web/levihicks.dev/www/
fi
if [ -e /web/levihicks.dev/favicon/ ]; then
    sudo rm -r /web/levihicks.dev/favicon
fi
if [ -e /web/levihicks.dev/Link ]; then
    sudo rm /web/levihicks.dev/Link
fi
sudo cp Website /web/levihicks.dev/Link
sudo cp -R www/ /web/levihicks.dev/www/
sudo cp -R favicon/ /web/levihicks.dev/favicon/
sudo chown -R web:web /web/levihicks.dev/
if [ ! -e /etc/systemd/system/levihicks.dev.service ]; then
    sudo cp levihicks.dev.service /etc/systemd/system/levihicks.dev.service
    sudo systemctl daemon-reload
    sudo systemctl enable levihicks.dev.service
fi
sudo systemctl restart levihicks.dev.service