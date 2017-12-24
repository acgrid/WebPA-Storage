# Storage Service for WebPA
## Install
```bash
firewall-cmd --add-port=4000/tcp --zone=public --permanent
npm install -g nodemon
npm install
systemctl enable ...
systemctl start ...
```

```ini
[Unit]
Description=WebPA Storage Service
After=mongod.service

[Service]
Type=simple
PIDFile=/root/WebPA-Storage/nodemon.pid
ExecStart=/usr/bin/nodemon ./bin/www
WorkingDirectory=/root/WebPA-Storage
PrivateTmp=false
KillMode=process
Restart=always
StartLimitBurst=20

[Install]
WantedBy=multi-user.target
```