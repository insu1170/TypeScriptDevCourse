const express = require('express');
const app = express();

app.listen(3001);

const fruits = [
    { id: 1, name: 'apple' },
    { id: 2, name: 'orange' },
    { id: 3, name: 'strawberry' },
    { id: 4, name: 'blueberry' }]

//전체조회
app.get('/fruits', (req, res) => {
    console.log('전체조회')
    res.json(fruits)
})


app.get('/fruits/:id', (req, res) => {

    const id = parseInt(req.params.id);
    console.log('특정 조회', id)

    // fruits.forEach((data) => {
    //     if(data.id==id) return res.json(data)
    // })

    const find = fruits.find(f=>(f.id==id));
    console.log(find)
    if(find) res.json(find);
        else{
            res.status(404).send(`${id} 없음`)
        }
    
})