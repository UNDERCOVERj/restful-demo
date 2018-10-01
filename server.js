const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// 连接数据库
mongoose.connect('mongodb://localhost/restful', { useNewUrlParser: true }, (err) => {
    if (!err) {
        // 创建model
        const Person = mongoose.model('abcs', mongoose.Schema({
            name: {
                type: String,
                unique: true
            }, 
            age: Number
        }));
        const app = express();
        app.use(bodyParser.json({ type: 'application/json' }));
        app.use(express.static('public'));
        app.get('/api/person/:name', async (req, res) => {
            let { name } = req.params;
            let person = await Person.findOne({ name });
            if (person) {
                res.writeHead(200,{'Content-Type':'text/plain;charset=utf-8'});
                res.end(JSON.stringify({
                    code: 200,
                    data: person,
                    msg: '查询成功'
                }))
            }
        })
        app.post('/api/person', (req, res) => {
            let data = req.body;
            new Person(data).save()
                .then((person) => {
                    res.writeHead(200, {'Content-Type':'text/plain;charset=utf-8'});
                    res.end(JSON.stringify({
                        code: 200,
                        data: {},
                        msg: '新增成功'
                    }));
                })
                .catch(() => {
                    res.writeHead(200,{'Content-Type':'text/plain;charset=utf-8'});
                    res.end(JSON.stringify({
                        code: 200,
                        data: {},
                        msg: '用户已存在'
                    }));
                })

        })
        app.put('/api/person/:name', async (req, res) => {
            let { name } = req.params;
            let { age } = req.body;
            await Person.findOneAndUpdate({name}, {
                $set: {
                    age
                }
            })
            res.writeHead(200,{'Content-Type':'text/plain;charset=utf-8'});
            res.end(JSON.stringify({
                code: 200,
                data: {},
                msg: '更新成功'
            }))
        })
        app.delete('/api/person/:name', async (req, res) => {
            let { name } = req.params;
            await Person.deleteOne({ name });
            res.writeHead(200,{'Content-Type':'text/plain;charset=utf-8'});
            res.end(JSON.stringify({
                code: 200,
                data: {},
                msg: '删除成功'
            }))
        })
        app.listen(3000)


    }
});

