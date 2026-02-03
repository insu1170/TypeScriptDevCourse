const express = require('express');
const router = express.Router()
router.use(express.json());
const conn = require('./mariadb')

router.route('/')
    // 채널 전체 조회
    .get((req, res) => {

        var userId = req.body;

        userId && conn.query(
            `SELECT * FROM channels where user_id = ?`, userId,
            function (_err, results, _fields) {
                if (results.length) {
                    res.status(200).json(results)
                }
                else {
                    notFoundChannel(res)
                }
            }
        );
        res.status(400).end()

    })

    // 채널 개별 생성
    .post((req, res) => {
        const { name, userId } = req.body
        if (name && userId) {

            const query = `insert into channels (name,user_id) values (?,?)`
            let value = [name, userId]
            conn.query(query, value,
                function (_err, results, _fields) {
                    if (results.length) {
                        res.status(200).json(results)
                    }
                    else {
                        notFoundChannel(res)
                    }
                }
            );
        } else {
            res.status(400).json({
                meassage: '제대로 요청'
            })
        }

    })

router.route('/:id')
    // 채널 개별 조회    
    .get((req, res) => {
        let id = parseInt(req.params.id);

        conn.query(
            `SELECT * FROM channels where id = ?`, id,
            function (_err, results, _fields) {
                if (results.length) {
                    res.status(200).json(results)
                }
                else {
                    notFoundChannel(res)
                }
            }
        );
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


const notFoundChannel = (res) => {
    res.status(404).json({
        message: "채널정보 찾기 X"
    })
}


module.exports = router