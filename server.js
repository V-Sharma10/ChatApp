const express = require('express');
const app = express();
const PORT = process.env.PORT || 3010;
const bodyPaser = require('body-parser');
// const cors = require('cors');
// app.use(cors);
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(bodyPaser.json());
app.use(bodyPaser.urlencoded({extended:false}))
app.use(express.static(__dirname));
// console.log(__dirname);//takes the index.html file as the front end part

var messages = [
    
    
]
app.get('/messages', (req, res) => {
    
    res.send(messages);
})

app.post('/messages', (req, res) => {
    messages.push(req.body);
    io.emit('message', req.body);
    res.sendStatus(200);
    // console.log(messages);
})

io.on('connection', (socket) => {
    console.log('connection situated');
} )

var server = http.listen(PORT, () => {
    console.log('server listening at',server.address().port);
});

