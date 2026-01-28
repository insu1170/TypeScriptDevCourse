// index.js
const { channel } = require('diagnostics_channel');
const express = require('express');
const app = express();

app.listen(3000, () => {
    console.log('server running on http://localhost:3000');
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let youtuber = {
    channelTitle: "십오야",
    sub: '5만명',
    videoNum: "725개"
}

let youtuber2 = {
    channelTitle: "야",
    sub: '51만명',
    videoNum: "7254개"
}
let youtuber3 = {
    channelTitle: "호",
    sub: '51만명',
    videoNum: "7254개"
}
// https://www.youtube.com/@studio_pirates
let db = new Map();
db.set(1, youtuber)
db.set(2, youtuber2)
db.set(3, youtuber3)

app.get('/youtubers', (req, res) => {

    res.json({
        message: `모든 유튜버 조회`
    })
})

app.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);

    if (!db.has(id)) {
        return res.status(404).json({ message: 'not found' });
    }

    res.json({
        id,
        productName: db.get(id)
    });
});




app.post('/youtubers', (req, res) => {
    console.log(req.body.channelTitle, 'sfsfs')
    const channelTitle = req.body.channelTitle
    if (channelTitle) {
        db.set(id++, req.body);
        res.json({
            message: `${db.get(id - 1).channelTitle} 환영`
        })
    } else {
        res.status(400).json({
            message: "유효하지 않음"
        })
    }
})

app.delete('/youtubers/:id', (req, res) => {

    let { id } = req.params;
    id = parseInt(id);
    if (db.get(id) == undefined) {
        res.status(404).json({
            message: `${id}는 없는 유튜버`
        })
        return;
    }
    db.delete(id);
    const title = db.get(id).channelTitle
    res.json({
        message: `${title} 여기까지인가요`
    })
})



app.delete('/youtubers', (req, res) => {
    if (db.size >= 1) {
        db.clear();
        res.json('모든 유튜버 삭제')
    } else {
        res.status(404).json('삭제할 유튜버 X')
    }
})



app.put('/youtuvers/:id', (req, res) => {

    res.json({

    })
})