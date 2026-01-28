const express = require('express');
const app = express();
app.use(express.json());
app.listen(3002);


const db = new Map();

var id = 1

app.route('/channels')
    // 채널 전체 조회
    .get((req, res) => {
        var channels = []
        if (db.size !== 0) {
            db.forEach((data, index) => {
                channels.push(data)
            })
            res.status(200).json(channels)
        } else {
            res.status(404).json({
                message: "조회 데이터 없음"
            })
        }

    })

    // 채널 개별 생성
    .post((req, res) => {
        console.log(req.body)
        if (req.body.channelTitle) {
            db.set(id++, req.body)
            res.status(201).json({ meassgae: `${db.get(id - 1).channelTitle} 채널 응원` })

        } else {
            res.status(400).json({
                meassage: '제대로 요청'
            })
        }

    })

app.route('/channels/:id')
    // 채널 개별 조회    
    .get((req, res) => {
        let id = parseInt(req.params.id);
        const channel = db.get(id)
        console.log(channel)
        if (channel == undefined) {
            res.status(404).json({ message: "없는 채널" })
        } else {

            res.status(200).json(channel)
        }
    })

    // 개별 수정
    .put((req, res) => {
        let id = parseInt(req.params.id);
        const channel = db.get(id);
        var oldTitle = channel.channelTitle;

        if (channel) {
            var newTitle = req.body.channelTitle
            channel.channelTitle = newTitle
            db.set(id, channel)
            res.json({
                message: `수정 완 ${oldTitle} => ${newTitle}`
            })
        } else {
            res.status(404).json({ message: "없는 채널" })
        }
    })

    // 채널 삭제
    .delete((req, res) => {
        let id = parseInt(req.params.id);
        const channel = db.get(id)
        if (channel) {
            db.delete(id)
            res.status(200).json({
                message: `${channel.channelTitle} 정상 삭제`
            })

        } else {
            res.status(404).json({ message: "없는 채널" })
        }

    })
