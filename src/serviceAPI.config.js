const BASEURL = "https://www.easy-mock.com/mock/5c3f2248419c5d0de8845cc9/"
const LOCALURL = "http://localhost:3000/"
const URL = {
    getShoppingMallInfo:BASEURL+'index',
    getGoodsInfo:BASEURL+'getGoodsInfo',
    registerUser:LOCALURL+'user/register',   //用户注册接口
    login:LOCALURL+'user/login',   //用户注册接口
}
module.exports = URL