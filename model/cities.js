var mongoose=require('mongoose');
var citySchema=new mongoose.Schema({
	"_id":String,
	"province_name":String,
	"city_list":[{
		"_cid":String,
		"city_name":String,
		"c_selected":String
	}]
},
      {
        usePushEach: true
      });
module.exports=mongoose.model('Citie',citySchema);
