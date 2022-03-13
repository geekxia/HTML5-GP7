const KoaRouter = require('@koa/router')
const router = new KoaRouter()

const W = require('../controllers/Wechat')


const v = '/api/v1'

router
.get(`${v}/wechat/login`, W.login)


module.exports = router
