const Koa = require('koa')
const app = new Koa()

// const {connect} = require('./database/init.js')
const mongoose = require('mongoose')
const {
  connect,
  initSchemas
} = require('./database/init.js')

;
(async () => {
  await connect()
  initSchemas()
  const User = mongoose.model('User')
  let oneUser = new User({
    userName: 'qfei2',
    password: '123456'
  })
  oneUser.save().then(() => {
    console.log('插入成功')
  })
  let users = await User.findOne({}).exec()
  console.log('------------------')
  console.log(users)
  console.log('------------------')

})()


app.use(async (ctx) => {
  ctx.body = '<h1>hello koa</h1>'
})

app.listen(3000, () => {
  console.log('server 3000')
})
