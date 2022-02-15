/* 
    사용방법

    1. 해당 파일이 위치하는 디렉토리에서 터미널 켜기
    2. npm i 이용하여 필요한 모듈 설치
    3. node app.js 사용하여 서버 실행
    4. 클라이언트에서 http://localhost:포트번호/주소 로 요청을 보내서 데이터 받아오기
*/


const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = 8000;
const morgan = require('morgan');//for log
const {stream} = require("./src/config/winston.config")
const routes = require('./src/routes');

app.use(morgan("combined",{stream}));
// cors 오류 방지
app.use(
    cors({
        origin: "*",
        optionsSuccessStatus: 200,
    })
);

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('./backend/src/images'))

//routes
app.use('/', routes)

app.on('error',function() {});


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
