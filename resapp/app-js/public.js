var publicjs = {
		// 单选框 选中
		radioClick : function(obj){ 
			 var oRadio = $(obj)  ;
			 var sRadioValue = oRadio.val();
			 var sRadioName = oRadio.attr('label');
			 var oParentDiv = oRadio.parents("div[id^=dyn_radio_div_]") ;
			 oParentDiv.find('input:hidden[name$=_value]').val(sRadioValue) ;
			 oParentDiv.find('input:hidden[name$=_name]').val(sRadioName) ;
		} ,
		// 复选框 选中
		checkboxClick : function(obj){ 
			 var oCurItem = $(obj)  ;
			 var oParentDiv = oCurItem.parents("div[id^=dyn_checkbox_div_]") ;  // div
			 // 
			 var sValueStr = "";
			 var sNameStr = "";
			 oParentDiv.find(":checkbox:checked").each(function(){ // 已选中选项
				 sValueStr +=  "," + $(this).val() ;
				 sNameStr += "," + $(this).attr("label") ;
			 });
			 // 隐藏域
			 oParentDiv.find('input:hidden[name$=_value]').val(sValueStr.substring(1)) ;
			 oParentDiv.find('input:hidden[name$=_name]').val(sNameStr.substring(1)) ;
		}, 
		// 下拉框 选中
		selectChange : function(obj){ 
			 var oSelect = $(obj)  ;
			 var oParentDiv = oSelect.parents("div[id^=dyn_select_div_]") ;  // div
			// 已选中选项
			 var selectedOption = oSelect.find("option:selected"); 
			 // 
			 var sValueStr = selectedOption.val();
			 var sNameStr = selectedOption.text();
			 // 隐藏域
			 oParentDiv.find('input:hidden[name$=_value]').val(sValueStr) ;
			 oParentDiv.find('input:hidden[name$=_name]').val(sNameStr) ;
		}
};

/**
 * 弹出框方案
 * @param obj 点击对象
 * @param width 弹出框宽度
 * @param hight 弹出框高度
 * @param title 弹出框标题
 * @param html 弹出框内容
 */
function showBox(obj,width,hight,title,html){
	var wBox = obj.wBox({
		wBoxURL: "wbox/",
		title : title,
		html : "<div id='myMap' style='width:500px;height:100px;overflow-y:auto;color:#cc0000'>"+html+"</div>",
		callBack: null,
        noTitle: false,
		show:true,
		timeout:0,
		target:null,
		requestType:null,//iframe,ajax,img
		drag:true
	});
//	wBox.showBox();
}

/**
 * 获得标签的值
 */
function getTagValue(oTag)
{
	try
	{
		if(oTag.is("span"))
		{
			return irisTrim(oTag.text());
		}
		else
		{
			return oTag.val();
		}
	}
	catch(ex)
	{
		return "";
	}
}

/**
 * iris去除空格
 * @param strToDeal
 * @returns
 */
function irisTrim(strToDeal)
{
	var strTemp=strToDeal.toString();
	return strTemp.replace(/(^(\s|　)*)|((\s|　)*$)/g, "");
}

//转义字符
function changeString(selectid) {
	selectid = selectid.replace(/\[/g, "\\[");
	selectid = selectid.replace(/\]/g, "\\]");
	return selectid;
}
