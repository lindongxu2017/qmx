
/*返回上一页*/

function back(){
	window.history.back()
}

/*删除指定元素*/

function deleteArr(delIndex){
	var temArray=[];
		for(var i=0;i<this.length;i++){
			if(i!=delIndex){
				temArray.push(this[i]);
			}
		}
		console.log('123')
	return temArray;
}

/*Cookie*/

/*设置cookie*/
function setCookie(c_name,value,expiredays){
	var exdate=new Date()
	exdate.setDate(exdate.getDate()+expiredays)
	document.cookie=c_name+ "=" +escape(value)+
	((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
}

/*查询cookie*/
function getCookie(c_name){
	if (document.cookie.length>0){
	  	c_start=document.cookie.indexOf(c_name + "=")
	  	if (c_start!=-1){ 
		    c_start=c_start + c_name.length+1 
		    c_end=document.cookie.indexOf(";",c_start)
		    if (c_end==-1) c_end=document.cookie.length
		    return unescape(document.cookie.substring(c_start,c_end))
	    } 
  	}
	return ""
}
/*删除cookie*/
function delAllCookie(){    
    var myDate=new Date();    
    myDate.setTime(-1000);//设置时间    
    var data=document.cookie;    
    var dataArray=data.split("; ");    
    for(var i=0;i<dataArray.length;i++){    
         var varName=dataArray[i].split("=");    
         document.cookie=varName[0]+"=''; expires="+myDate.toGMTString();    
    }    
                  
}
// 获取get参数
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}

// 时间戳转换为年月日
function getTime(t){
	return new Date(parseInt(t)*1000).toLocaleDateString().replace(/\//g,  "-");;
}

// 时间戳转换为天数
function getDays(oldValue, newValue){
	var day = Math.ceil((newValue/1000-oldValue)/(24*3600));
	return day;
}

// 提示框	Frozen UI
function tips(text, t){
	var type = t;
	if(type == undefined){
		type = 'success';
	}
	el=$.tips({
        content:text,
        stayTime:2000,
        type: type
    })
    el.on("tips:hide",function(){
        // console.log("tips hide");
    })
}