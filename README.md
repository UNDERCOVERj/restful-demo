# 操作

```
git clone

cd ..

npm install

node server

打开localhost:3000/index.html
```

**策略切换**

在index.html中 

```
strategy.createPerson();
strategy.getPerson();
strategy.updatePerson();
strategy.deletePerson();
```

在浏览器下查看xhr

# 数据库操作

1. [安装mongodb](http://www.runoob.com/mongodb/mongodb-linux-install.html)

2. 命令行查看数据库

`cd /usr/local/mongodb/bin`

`sudo ./mongod`

3. 重新打开一个窗口，相同路径下

```
./mongo // 后台查看

show dbs // 查看数据

use restful // 切换到restful

db.abcs.find() // 查看文档
```