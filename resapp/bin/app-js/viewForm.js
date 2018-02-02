var viewFormObj = { 
		processAllObj : function(){
    $('input,textarea,select,img.datepick-trigger').not(":button").filter(':visible').each(function(){
      // 遍历逐个处理
      if($(this).is(":text,textarea")){        //文本输入框、多行文本输入
        viewFormObj.replaceText(this);
      }else if($(this).is(":radio,:checkbox,select")){  // 单选、复选、下拉
        viewFormObj.disableObj(this);
      }else if($(this).is(":file,:button,img.datepick-trigger")){  // 文件上传 按钮
    	  viewFormObj.hideObj(this);
            }
    });
  },
   // obj替换 
  replaceText : function(obj){
     var oObj = $(obj) ;
     var tempValue = oObj.val() ;
     oObj.replaceWith( "<pre>" + tempValue + "</pre>");  // pre原样展示 
    },
  // obj disable 
  disableObj : function(obj){
    $(obj).attr("disabled" , true) ;
    },
  // obj hide 
   hideObj : function(obj){
      $(obj).hide() ;
      }
}