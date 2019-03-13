const Koa = require('koa')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const cors = require('koa2-cors')
const mongoose = require('mongoose')

const app = new Koa()
let router = new Router();
app.use(bodyParser());
app.use(cors())

let user = require('./appApi/user.js')
let goods = require('./appApi/goods.js')
const {connect,initSchemas} = require('./database/init.js')

router.use('/user',user.routes())
router.use('/goods',goods.routes())
app.use(router.routes())
app.use(router.allowedMethods())

;(async () => {
  await connect()
  initSchemas()
  // const User = mongoose.model('User')
  // let oneUser = new User({
  //   userName: 'qfei2',
  //   password: '123456'
  // })
  // oneUser.save().then(() => {
  //   console.log('插 入成功')
  // })
  // let users = await User.findOne({}).exec()
  // console.log('------------------')
  // console.log(users)
  // console.log('------------------')
})()


app.use(async (ctx) => {
  ctx.body = '<h1>hello koa</h1>'
})

app.listen(3000, () => {
  console.log('server 3000')
})
