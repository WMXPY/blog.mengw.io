-   **_ForUbuntu_**

# Chrome

    wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | sudo apt-key add - 
    sudo sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list'
    sudo apt-get update 
    sudo apt-get install google-chrome-stable

# VSCode -> based on ummake

    sudo add-apt-repository ppa:ubuntu-desktop/ubuntu-make
    sudo apt-get update
    sudo apt-get install ubuntu-make
    umake web visual-studio-code

# UMake

<<<<<<< HEAD
    sudo apt-get install python-software-properties
    sudo apt-get install software-properties-common 

# NodeJS

    curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
    sudo apt-get install -y nodejs

# Git

    apt-get install git
=======
-   sudo apt-get install python-software-properties
-   sudo apt-get install software-properties-common 

# Python
- sudo apt-get install python-pip
>>>>>>> origin/master
