const KoaRouter = require('@koa/router')
const router = new KoaRouter()
const checkToken = require('../middlewares/checkToken')

// todolist
const TD = require('../controllers/Todo')

// vue vant webapp
const VG = require('../controllers/vant/Good')
const VU = require('../controllers/vant/User')
const VC = require('../controllers/vant/Cart')

// vue-element-admin
const EU = require('../controllers/element/User')
const EG = require('../controllers/element/Good')

const UP = require('../controllers/Upload')


const v = '/api/v1'

router
.get(`${v}/todo/getTodoList`, TD.getTodoList)
.post(`${v}/todo/addTodo`, TD.addTodo)
.get(`${v}/todo/delTodo`, TD.delTodo)
.get(`${v}/todo/transferTodo`, TD.transferTodo)
.post(`${v}/todo/updTodo`, TD.updTodo)

.get(`${v}/vant/getGoodList`, VG.getGoodList)
.get(`${v}/vant/getAllCate`, VG.getAllCates)
.post(`${v}/vant/regist`, VU.regist)
.post(`${v}/vant/login`, VU.login)
.get(`${v}/vant/getGoodInfo`, VG.getGoodInfo)  // 这种接口不需要鉴权
.post(`${v}/vant/addToCart`, checkToken, VC.addToCart)     // 这种接口要鉴权
.get(`${v}/vant/cartList`, checkToken, VC.getCartList)
.get(`${v}/vant/cartDel`, checkToken, VC.delCartItem)
.get(`${v}/vant/cartUpd`, checkToken, VC.updCartCount)
.post(`${v}/vant/cartSubmit`, checkToken, VC.submitCart)
.get(`${v}/vant/getUserInfo`, checkToken, VU.getUserInfo)

.post(`${v}/element/login`, EU.login)
.get(`${v}/element/getUserInfo`, checkToken, EU.getUserInfo)
.get(`${v}/element/good/list`, checkToken, EG.goodList)
.post(`${v}/element/good/add/edit`, checkToken, EG.goodAddOrEdit)
.get(`${v}/element/all/cate`, checkToken, EG.getAllCate)
.get(`${v}/element/good/check`, checkToken, EG.goodCheck)
.get(`${v}/element/good/info`, checkToken, EG.goodInfo)
.get(`${v}/element/user/list`, checkToken,  EU.getUserList)
.post(`${v}/element/user/add`, checkToken, EU.addUser)
.get(`${v}/element/user/upd`, checkToken, EU.updateUser)
.get(`${v}/element/role/list`, checkToken, EU.getRoleList)
.post(`${v}/upload/img`, checkToken, UP.imgUpload)



module.exports = router
