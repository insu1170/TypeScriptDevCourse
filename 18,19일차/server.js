const express = require('express');
const app = express();
app.use(express.json());
app.listen(3001);

const db = new Map();
db.set(1, {
    "userId": "test1",
    "password": 123,
    "name": "test"
})
var id = 2


app.route('/users/:id')
    .get((req, res) => {
        const id = parseInt(req.params.id);
        const user = db.get(id);

        if (!user) {
            return res.status(404).json({ message: "회원 정보가 없다" });
        }

        res.status(200).json({
            userId: user.userId,
            name: user.name
        });
    })
    .delete((req, res) => {
        const id = parseInt(req.params.id);
        const user = db.get(id);

        if (!user) {
            return res.status(404).json({ message: '정보 없음' });
        }

        db.delete(id);
        res.status(200).json({
            message: `${user.name}님 담에봐`
        });
    });


// 로그인
app.post('/login', (req, res) => {
    console.log(req.body)
    // const userId = req.body.userId
    const query = req.body
    loginUser = {};
    db.forEach((data) => {
        console.log(data);
        if (data.userId == query.userId) {
            console.log('id있')
            loginUser = data;
        }
    })

    if (Object.keys(loginUser).length) {
        console.log('로그인 로직')
        if (loginUser.password == query.password) {
            console.log('pw 맞')
            console.log(loginUser.name,'환영')
            res.send(loginUser.name+"님 환영합니다")
        } else {
            console.log('pw 틀')
        }
    }

})


// 회원가입

app.post('/join', (req, res) => {
    if (!req.body.name) {
        return res.status(400).json({
            message: '이름을 입력하세요'
        });
    }

    const user = {
        userId: id,
        name: req.body.name
    };

    db.set(id++, user);

    res.status(201).json({
        message: `${user.name} 환영`
    });
});


// 개별 조회

// 개별 탈퇴

