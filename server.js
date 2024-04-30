const ACCESS_TOKEN_SECRET = "1bd611a49759201174376aeb76d68c1580d64d6c397c98ded09b50bd1a7a7170"
const REFRESH_TOKEN_SECRET = "1bd611a49759201174376aeb76d68c1580d64d6c397c98ded09b50bd1a7a7170"

const PORT = 12010 
const express = require('express')
const cookieparser = require('cookie-parser')
const jwt = require('jsonwebtoken')

// browser - postman request module
const cors = require('cors')
const app = express();

//middleware 
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieparser());

// DB dummy data 
const userInfo = {
    username: 'test_user',
    password: '12345678',
    email: 'testemail@test.com'
}

//user object to create a token 
const user = {
    username: userInfo.username,
    email: userInfo.email
}


//token expire options 
const accessOpt = {
    expiresIn: '10m'
}

const refreshOpt = {
    expiresIn: '1d'
}


//cookie options
const cookieOpt = {
    httpOnly: true, //자바 스크립트 기반으로 쿠키를 볼 수 없게 
    sameSite: 'strict', // 다른 사이트에서 쿠키를 요청과 함께 전달되지 않게 
    secure: true,
    maxAge: 24 * 60 * 60 * 1000 // 만료기한 : 1000일 
}

const isAuthenticated = (req, res, next) => {
    if(!req.headers.authorization) {
        return next('route')
    }

    let auth = req.headers.authorization
    if (auth.startswith('Bearer ')) {
        auth = auth.substring(7, auth.length)
    }

    const user = jwt.verify(auth, ACCESS_TOKEN_SECRET)
    //if authorized user exists -> then next middleware otherwise next routing 
    if (user) return next()
    else return next('route')
}


app.get('/', isAuthenticated, (req, res) => {
    res.status(200).send('Hello World!')
})

app.get('/', (req, res) => {
    return res.status(401).send("Unauthorized")
})

app.post('/login', (req, res) => {
    const { username, password } = req.body
    console.log(req.body)
    console.log(username, password) 

    if (username === userInfo.username && password === userInfo.password) {
        const accessToken = jwt.sign(user, ACCESS_TOKEN_SECRET, accessOpt)
        const refreshToken = jwt.sign(user, REFRESH_TOKEN_SECRET, refreshOpt)
        // Cookie contains refresh token 
        // then later on, we can use refresh token to get new access token
        res.cookie('jwt', refreshToken, cookieOpt)
        return res.json({accessToken, refreshToken})
    }
    res.status(401).send('Invalid username or password')
})

// request fresh token first before requesting the access token 
app.post('/refresh', (req, res) => {
    console.log('REFRESH reqeust')
    console.log(req.cookies)
    if (req.cookies.jwt) {
        const refreshToken = req.cookies.jwt;
        (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: 'Unauthorized request'});
            }
            else{
                console.log(decoded)
                const accessToken = jwt.sign(user, ACCESS_TOKEN_SECRET, accessOpt);
                return res.json({accessToken});
            }
        }
    }
})