# Event Management System with Vagrant
This guide will help set up the Event Management System using Vagrant with a frontend running on Fedora and a backend database on Ubuntu, accessible from local machine.

# Prerequisites:
VirtualBox
Vagrant
Git

# Setup:

1. Clone the Repository:
bash
Copy code
git clone https://github.com/PuneethReddyHC/event-management.git
cd event-management

2. Initialize Vagrant:
Inside the project directory, create a Vagrantfile with the following content:

Vagrant.configure("2") do |config|

  config.vm.define "frontend" do |frontend|
    frontend.vm.box = "generic/fedora33"
    frontend.vm.network "private_network", type: "dhcp"
    frontend.vm.network "forwarded_port", guest: 80, host: 8080
    frontend.vm.provision "shell", inline: <<-SHELL
      sudo dnf -y update
      sudo dnf -y install httpd php php-mysqlnd git
      sudo systemctl enable httpd
      sudo systemctl start httpd
      git clone https://github.com/PuneethReddyHC/event-management.git /var/www/html/
      sudo chown -R apache:apache /var/www/html/
    SHELL
  end

  config.vm.define "db" do |db|
    db.vm.box = "ubuntu/bionic64"
    db.vm.network "private_network", type: "dhcp"
    db.vm.provision "shell", inline: <<-SHELL
      sudo apt update
      sudo apt install -y mysql-server
      sudo systemctl enable mysql
      sudo systemctl start mysql
      sudo mysql -u root -e "CREATE DATABASE event_management;"
      sudo mysql -u root -e "CREATE USER 'event_user'@'%' IDENTIFIED BY 'password';"
      sudo mysql -u root -e "GRANT ALL PRIVILEGES ON event_management.* TO 'event_user'@'%';"
      sudo mysql -u root -e "FLUSH PRIVILEGES;"
    SHELL
  end

end

Replace 'password' with a password.

3. Start the Vagrant Boxes:
vagrant up
This command will start both the frontend and backend boxes, install the necessary software, and set up the database.

4. Connect Frontend to Backend:
SSH into the frontend box:
vagrant ssh frontend
Navigate to the Web Root: cd /var/www/html/
Modify the PHP Project's Database Configuration:
nano config.php

Update the Database Connection Details to match the details of setup.

vagrant ssh-config db

Database Name: Set it to event_management.

Username: Set it to event_user.

Password: Set it to the password 'password'

After making these changes in the configuration file, save and close it.

5. Access the Web App:
Access the PHP web app from local machine by opening a browser and navigating to:
http://localhost:8080
