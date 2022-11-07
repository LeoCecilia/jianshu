Firstly, you should install docker
   `brew install docker`


# create the docker iamges individually
1. run `docker compose up -d`
2. run `docker ps -a` to get the [mongo / web app] containerId
3. run `cp ${mongoDataPath} ${containerId}:/`
   Note: `docker cp 导出的数据的文件名 容器ID:/`
4. `docker exec -it mongo /bin/bash`
5. `mongorestore -d jianshu 想要导入的文件路径`
   1. Note: the file path should be `jianshuData/jianshu`
   2. jianshuData will in the attachment
6. `exit`
7. `exit`
8. open `localhost:3000` in the browser


# Get the Ready Made docker images
1. firstly, you should install docker
   `brew install docker`
2. register the aliyun container website https://www.aliyun.com/activity/creativity/jinqiuyunchuang?utm_content=se_1012778171
3. login 阿里云Docker Registry
   `docker login --username={userName} registry.cn-hangzhou.aliyuncs.com`
   Notes: userName is your aliyun user name，
   1. if you fail to login, please kindly follow this link https://help.aliyun.com/document_detail/60761.html
   2. if you have already install docker for mac, then you should modify ~/.docker/config.json file, and then remove the `"credsStore": "desktop"` this line.
4. get images from registry
    `docker pull registry.cn-hangzhou.aliyuncs.com/heiwan/jianshu:latest`
    ``docker pull registry.cn-hangzhou.aliyuncs.com/heiwan/mongo:latest`
5. run images in dockers
   - run `docker images` in the terminal to get the web app id and mongo images id
   - `docker run 镜像id`