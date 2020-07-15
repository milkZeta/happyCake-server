var express = require('express');
var router = express.Router();
var mongoose=require("mongoose");
var city=require("../model/cities");

mongoose.connect('mongodb://127.0.0.1:27017/happyCake');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/getProvince', function(req, res, next) {
  city.find((err,doc)=>{
  	 if(err){
  	 	res.json({
  	 		status:'1',
  	 		msg:'获取城市信息失败！',
  	 		result:''
  	 	})
  	 }else{
  	 	res.json({
  	 		status:'0ss',
  	 		msg:'',
  	 		result:doc
  	 	})
  	 }
  })
});
router.post('/getCities', (req, res, next)=> {
  var province_id=req.body.province_id;
  city.findOne({_id:province_id},(err,doc)=>{
  	 if(err){
  	 	res.json({
  	 		status:'1',
  	 		msg:'获取城市信息失败！',
  	 		result:''
  	 	})
  	 }else{
  	 	res.json({
  	 		status:'0',
  	 		msg:req.param("province_id"),
  	 		result:doc
  	 	})
  	 }
  })
});
router.post('/getCityByStr',(req,res,next)=>{
  var cityStr=req.body.cityStr;
    // city.find({"city_list":{$elemMatch{'city_name':{'$regex':"海"}}}},(err,doc)=>{
      // city.find({'city_name':{'$regex':"琼海"}},(err,doc)=>{
        // city.find({"city_list.city_name":{'$regex':cityStr}},{"city_list":{$elemMatch:{"city_name":{'$regex':cityStr}}}},(err,doc)=>{
         city.aggregate([{"$unwind":"$city_list"},
           {"$match":{"city_list.city_name":{'$regex':cityStr}}},     
           {
              "$group":{
                  "_id":"000001",
                  "cities":{
                      "$push":{"province_name":"$province_name","_cid":"$city_list._cid","city_name":"$city_list.city_name"}
                  }
              }
           }]).exec((err,doc)=>{
       if(err){
         res.json({
           status:'1',
           msg:err.message,
           result:cityStr
         })
       }else{
         res.json({
           status:'0',
           msg:cityStr,
           result:doc
         })
       }
    })
})
module.exports = router;
