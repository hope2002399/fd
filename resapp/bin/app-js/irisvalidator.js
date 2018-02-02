var errorMsg = new Array();// 错误消息集合
var checkList = "required,email,english,chinese,maxlength,minlength,max,min,date,dateCompare,idCard,valueCompare,percentCompare";
var strTitle = "";
/**
 * 验证单个字段
 * 
 * @param objId
 * @returns {Boolean}
 */
function validate(obj, title) {
	if (title != null && title != "")
		strTitle = title + "-->";
	else
		strTitle = "";
	obj.find(":text,:hidden,:password,[type='date'],select,textarea,span,[type='hidden']")
			.each(function() {
				if($(this).attr("name") && $(this).attr("name")!=''&& $(this).attr("name").indexOf("|")==-1)
				irisValObj($(this));
			});

}

/**
 * 验证table里有空就完整填写 针对表格里都为必添 例:irisJqValEmpty("tabid","经费信息请完整填写");
 */
function irisJqValEmpty(obj, msg) {
	
	var sum=0;
	obj.find(":input[type!=hidden],textarea").each(function() {
		
		var noreq=$(this).attr("class");
		
		if($.trim($(this).val())==''&& $(this).css("display")!="none" && $(this).parent().css("display")!="none" &&(noreq == null || $.trim(noreq) == ""||noreq.indexOf("noreq")<0) ){
			sum+=1;
		}
	});
	if(sum!=0)
	irisValaddMsg(msg);
	
	return sum;
}

/**
 * 验证申请书单位财务信息 例:irisJqValEmpty("tabid","经费信息请完整填写");
 */
function irisFundEmpty(obj, msg) {
	
	var sum=0;
	obj.find("span[id^='finance']").each(function() {
		if($.trim($(this).text())==''){
			sum+=1;
		}
	});
	if(sum!=0)
	irisValaddMsg(msg);
	
	return sum;
}

/**
 * 
 * @param objId
 *            tableId
 * @param rowNum
 *            最低行数,可以不写
 */
function validateByTabRow(obj, title, rowNum,headNum) {
	if(!headNum)headNum=2;
	if ((obj.find("tr").length - headNum) < rowNum)
		irisValaddMsg(messageTip.rowNum.replace("[name]", title).replace(
				"[num]", rowNum));
	obj.find("tr").each(
			function(index) {

				if (index >= headNum) {
					rtitle = messageTip.rowIndex.replace("[name]", title)
							.replace("[index]", index - (headNum-1));
					validate($(this), rtitle);
				}
			});
}

/**
 * 检查验证结果
 * 
 * @returns {Boolean}
 */
function valResult() {
	if (errorMsg.length == 0)
		return true;
	else
		return false;
}

/**
 * 判断需要检查哪些
 * 
 * @param obj
 */
function irisValObj(obj) {
	var objClass = obj.attr("class");
	if (objClass == null || $.trim(objClass) == "") {
		return;
	}

	var classes = $.trim(objClass).split(" ");
	for ( var i = 0; i < classes.length; i++) {// 循环判断取出需要验证的信息
		if (classes[i].indexOf("required") >= 0 && classes[i].indexOf("requiredcb") ==-1) {// 不许为空
			if (!irisValNotEmptyByObj(obj))
				continue;
		}else if (classes[i].indexOf("requiredcb") >= 0) {// 不许为空
			if (!irisCbValNotEmptyByObj(obj))
				continue;
		} else if (classes[i].indexOf("year") >= 0 && classes[i].indexOf("yearp") == -1 && classes[i].indexOf("yearm") == -1) {// 不许为空
			if (!irisValYearByObj(obj))
				continue;
		} else if (classes[i].indexOf("maxlength") >= 0) {
			var maxlen = (classes[i].split(":"))[1];// 获取最大值
			if (!irisValMaxLen(maxlen, obj))
				continue;
		} else if (classes[i].indexOf("minlength") >= 0) {
			var minlen = (classes[i].split(":"))[1];// 获取最小长度
			if (!irisValMinLen(minlen, obj))
				continue;
		} else if (classes[i].indexOf("max:") >= 0) {// 最大值比较
			var max = (classes[i].split(":"))[1];//
			if (!irisValMax(max, obj))
				continue;
		} else if (classes[i].indexOf("min:") >= 0
				&& classes[i].indexOf("reqmin") == -1) {// 最小值比较
			var min = (classes[i].split(":"))[1];
			if (!irisValMin(min, obj))
				continue;
		} else if (classes[i].indexOf("email") >= 0) {// email格式验证
			if (!irisValEmailByObj(obj))
				continue;
		} else if (classes[i].indexOf("mobile") >= 0) {// email格式验证
			if (!irisValMobile(obj))
				continue;
		} else if (classes[i].indexOf("english") >= 0) {// 英文格式验证
			if (!irisValEnglish(obj))
				continue;
		} else if (classes[i].indexOf("chinese") >= 0) {// 中文格式验证
			if (!irisValChinese(obj))
				continue;
		} else if (classes[i].indexOf("dateCompareBeforeE") >= 0) {// 日期比较
																	// 前者未在后者之后
			var cobj1Id = (classes[i].split(":"))[1];
			var cobj2Id = (classes[i].split(":"))[2];
			if (!irisValDateBeforeEByObj($("#" + changeString(cobj1Id)), $("#"
					+ changeString(cobj2Id))))
				continue;
		} else if (classes[i].indexOf("dateCompareAfterE") >= 0) {// 日期比较
																	// 前者至少在后者之后
			var cobj1Id = (classes[i].split(":"))[1];
			var cobj2Id = (classes[i].split(":"))[2];
			if (!irisValDateAfterEByObj($("#" + changeString(cobj1Id)), $("#"
					+ changeString(cobj2Id))))
				continue;
		} else if (classes[i].indexOf("dateCompare") >= 0) {// 日期比较
			var cobjId = (classes[i].split(":"))[1];
			if (!irisValDateCompareByObj(obj, $("#" + changeString(cobjId))))
				continue;
		} else if (classes[i].indexOf("date") >= 0) {// 时间格式
			if (!irisValDateByObj(obj))
				continue;
		} else if (classes[i].indexOf("reqmin") >= 0) {// 判断一组相同的元素最少需要填写
			var min = (classes[i].split(":"))[1];
			if (!irisValReqMinByObj(obj, min))
				continue;
		} else if (classes[i].indexOf("idCard") >= 0) {// 身份证格式验证
			if (!irisValIDCardByObj(obj))
				continue;
		} else if (classes[i].indexOf("orgCard") >= 0) {// 组织机构代码格式验证
			if (!irisValORGCardByObj(obj))
				continue;
		} else if (classes[i].indexOf("valueCompare") >= 0) {// 比较值大小
			var minid = (classes[i].split(":"))[1];
			var maxid = (classes[i].split(":"))[2];
			if (!irisValThan(minid, maxid, ""))
				continue;
		} else if (classes[i].indexOf("valueNotEqual") >= 0) {// 验证值是否相等
			var val1id = (classes[i].split(":"))[1];
			if (!irisValNotEqual(obj, $("#" + changeString(val1id)), ""))
				continue;
		} else if (classes[i].indexOf("valueEqual") >= 0) {// 验证值是否相等
			var val1id = (classes[i].split(":"))[1];
			var val2id = (classes[i].split(":"))[2];
			if (!irisValEqual2(val1id, val2id, ""))
				continue;
		} else if (classes[i].indexOf("valueGreatEqual") >= 0) {// 验证两值是否存在大于等于关系
			var val1id = (classes[i].split(":"))[1];
			var val2id = (classes[i].split(":"))[2];
			if (!irisValGreatEqual(val1id, val2id, ""))
				continue;
		} else if (classes[i].indexOf("valueGENum") >= 0) {// 验证值是否大于等于某个数
			var val1id = (classes[i].split(":"))[1];
			var num = (classes[i].split(":"))[2];
			if (!irisValGreatEqualNum(val1id, num, ""))
				continue;
		} else if (classes[i].indexOf("valueLENum") >= 0) {// 验证值是否小于等于某个数
			var val1id = (classes[i].split(":"))[1];
			var num = (classes[i].split(":"))[2];
			if (!irisValLessEqualNum(val1id, num, ""))
				continue;
		} else if (classes[i].indexOf("noRepeatByNames") >= 0) {// //验证值不能重复
			var objs = (classes[i].split(":")).slice(1);
			if (!irisValNoRepeatByNames(objs, ""))
				continue;
		} else if (classes[i].indexOf("percentCompare") >= 0) {// 比较百分比
			var totalId = (classes[i].split(":"))[1];
			var percent = (classes[i].split(":"))[2];
			if (!irisValPercentCompare(obj, $("#" + totalId), percent))
				continue;
		} else if (classes[i].indexOf("noRepeat") >= 0) {// 验证值不能重复
			if (!irisValNoRepeat(obj))
				continue;
		} else if (classes[i].indexOf("afterToday") >= 0) {// 验证日期必须大于当前日期
			if (!irisValAfterToday(obj))	
				continue;
		} else if (classes[i].indexOf("beforeToday") >= 0) {// 验证日期必须不大于当前日期
			if (!irisValBeforeToday(obj))
				continue;
		}  else if (classes[i].indexOf("person") >= 0) {// 变更项目负责人个人信息是否完善
			if (!irisValNotEmptyPsnCode(obj))   
				continue;
		} else if (classes[i].indexOf("talbelRowsCompare") >= 0) {// 验证项目人员总数大于等于项目人员列表数
			var val1id = (classes[i].split(":"))[1];
			var val2id = (classes[i].split(":"))[2];
			var startidx = ((classes[i].split(":"))[3] != null) ? (classes[i]
					.split(":"))[3] : "";
			if (!irisValTalbelRowsCompare(val1id, val2id, startidx))
				continue;
		}else if(classes[i].indexOf("checkBoxNum") >= 0) {            //验证checkbox所选个数
			var id = (classes[i].split(":"))[1];
			var maxNum = (classes[i].split(":"))[2];
			if (!irisCheckBoxNumCheck(id,maxNum))
				continue;
		
		}else if(classes[i].indexOf("sumEqual") >= 0) {            //验证 a+b=c ?
			var id1 = (classes[i].split(":"))[1];
			var id2 = (classes[i].split(":"))[2];
			var id3 = (classes[i].split(":"))[3];
			if (!irisCheckSumEqual(id1,id2,id3))
				continue;
		}else if(classes[i].indexOf("sumEq") >= 0) {            //验证 a=b+c+d....  class格式 sumEqual2：id1：id2,id3,id4
			var countId = (classes[i].split(":"))[1];
			var subIds = (classes[i].split(":"))[2];
			if (!irisCheckSumEqual2(countId,subIds))
				continue;
		}
	}
}
//验证变更项目负责人个人信息是否完善
function irisValNotEmptyPsnCode(obj) {
	var str = getTagValueByJq(obj);

	if (str == "") {
		irisValaddMsg("该项目的项目负责人个人信息未完善，请联系项目负责人完善好个人信息！");
		return false;
	}
	return true;
}
//兼容span
function irisValEqual2(str1, str2, msg) {
	var obj1 = $("#" + str1);
	var obj2 = $("#" + str2);
	var val1 = getTagValueByJq(obj1);
	var val2 = getTagValueByJq(obj2);
	if (val1 == "")
		val1 = 0;
	if (val2 == "")
		val2 = 0;
	if (parseFloat(val1) != parseFloat(val2)) {
		if (msg == "") {
			msg = strTitle + $("#" + str1).attr("label") + "必须等于"
					+ $("#" + str2).attr("label");
		}
		irisValaddMsg(msg);
		return false;
	}
	return true;
}

function irisValNotEqual(obj1, obj2, msg) {
	var val1 = getTagValueByJq(obj1);
	var val2 = getTagValueByJq(obj2);
	if (val1&&val2) {
		val1 = ToCDB(val1.toUpperCase().replace(/\s/g,""));
		val2 = ToCDB(val2.toUpperCase().replace(/\s/g,""));
		if(val1 == val2){
			if (msg == "") {
				msg = strTitle + obj1.attr("label") + "与" + obj2.attr("label") +"的内容不允许相同";
			}
			irisValaddMsg(msg);
		}
		return false;
	}
	return true;
}

///全角空格为12288，半角空格为32
///其他字符半角(33-126)与全角(65281-65374)的对应关系是：均相差65248
//半角转换为全角函数
function ToDBC(txtstring)
{
	var tmp = "";
	for(var i=0;i<txtstring.length;i++)
	{
		if(txtstring.charCodeAt(i)==32)
		{
			tmp= tmp+ String.fromCharCode(12288);
		}
		if(txtstring.charCodeAt(i)<127)
		{
			tmp=tmp+String.fromCharCode(txtstring.charCodeAt(i)+65248);
		}
	}
	return tmp;
}

//全角转换为半角函数
function ToCDB(str)
{
	var tmp = "";
	for(var i=0;i<str.length;i++)
	{
		if(str.charCodeAt(i)>65248&&str.charCodeAt(i)<65375)
		{
			tmp += String.fromCharCode(str.charCodeAt(i)-65248);
		}
		else
		{
			tmp += String.fromCharCode(str.charCodeAt(i));
		}
	}
	return tmp
}

function irisValGreatEqual(str1, str2, msg) {
	var val1 = getTagValueByJq($("#" + changeString(str1)));
	var val2 = getTagValueByJq($("#" + changeString(str2)));
	if(val1 && val1!="") val1 = val1.replace(",","");
	if(val2 && val2!="") val2 = val2.replace(",","");
	if (val1 == "")
		minvalue = 0;
	if (val2 == "")
		maxvalue = 0;
	if (parseFloat(val1) < parseFloat(val2)) {
		if (msg == "") {
			msg = strTitle + $("#" + changeString(str1)).attr("label") + "必须大于等于"
					+ $("#" + changeString(str2)).attr("label");
		}
		irisValaddMsg(msg);
		return false;
	}
	return true;
}
function irisValGreatEqualNum(str1, num, msg) {
	var val1 = $("#" + changeString(str1)).val();
	if (parseFloat(val1) < parseFloat(num)) {
		if (msg == "") {
			msg = strTitle + $("#" + changeString(str1)).attr("label") + "必须大于等于"
					+ num;
		}
		irisValaddMsg(msg);
		return false;
	}
	return true;
}

function irisValLessEqualNum(str1, num, msg) {
	var val1 = $("#" + changeString(str1)).val();
	if (parseFloat(val1) > parseFloat(num)) {
		if (msg == "") {
			msg = strTitle + $("#" + changeString(str1)).attr("label") + "必须小于等于"
					+ num;
		}
		irisValaddMsg(msg);
		return false;
	}
	return true;
}

// 验证是否为空
function irisValNotEmptyByObj(obj) {
	var str = getTagValueByJq(obj);

	if (str == "") {

		var strLaber = "";

		if (obj.attr("label") != null) {
			strLaber = obj.attr("label");
		}
		if(obj.attr("name") && obj.attr("name").indexOf("file_code")!=-1){
			irisValaddMsg(messageTip.fileRequired
					.replace("[name]", strTitle + strLaber));
			return false;
		}
		irisValaddMsg(messageTip.required
				.replace("[name]", strTitle + strLaber));
		return false;
	}
	return true;
}
//验证是否为空
function irisCbValNotEmptyByObj(obj) {
	var str = getTagValueByJq(obj);

	if (str == "") {

		var strLaber = "";

		if (obj.attr("label") != null) {
			strLaber = obj.attr("label");
		}
		irisValaddMsg(strTitle + messageTip.requiredCb
				.replace("[name]", strLaber));
		return false;
	}
	return true;
}
// 验证最大长度
function irisValMaxLen(len, obj) {
	var str = getTagValueByJq(obj);

	// str=str.replace(/\r(\n)?/g,"");

	if (str.length > len) {
		var strLaber = "";
		if (obj.attr("label") != null) {
			strLaber = obj.attr("label");
		}
		irisValaddMsg(messageTip.maxlength.replace("[name]",
				strTitle + strLaber).replace("[maxlength]", len).replace(
				"[length]", (str.length - len)));
		return false;
	}
	return true;
}

// 验证最少长度
function irisValMinLen(len, obj) {
	var str = getTagValueByJq(obj);

	// str=str.replace(/\r(\n)?/g,"");

	if (str.length < len) {

		var strLaber = "";
		if (obj.attr("label") != null) {
			strLaber = obj.attr("label");
		}
		irisValaddMsg(messageTip.minlength.replace("[name]",
				strTitle + strLaber).replace("[minlength]", len).replace(
				"[length]", (str.length)));
		return false;
	}
	return true;
}

// 验证最大值
function irisValMax(len, obj) {
	var str = getTagValueByJq(obj);

	// str=str.replace(/\r(\n)?/g,"");

	if (parseFloat(str) >parseFloat(len)) {

		var strLaber = "";
		if (obj.attr("label") != null) {
			strLaber = obj.attr("label");
		}
		irisValaddMsg(messageTip.max.replace("[name]", strTitle + strLaber)
				+ len);

		return false;
	}
	return true;
}

// 验证最小值
function irisValMin(len, obj) {
	var str = getTagValueByJq(obj);

	// str=str.replace(/\r(\n)?/g,"");

	if (str != '' && str < len) {
		var strLaber = "";
		if (obj.attr("label") != null) {
			strLaber = obj.attr("label");
		}
		irisValaddMsg(messageTip.min.replace("[name]", strTitle + strLaber)
				+ len);

		return false;
	}
	return true;
}

// 验证日期
function irisValDateByObj(obj) {
	var str = getTagValueByJq(obj);
	var matchArray = str
			.match(/^((((19|20)(([02468][048])|([13579][26]))-(02)-29))|((20[0-9][0-9])|(19[0-9][0-9])|(18[0-9][0-9]))-((((0[1-9])|(1[0-2]))-((0[1-9])|(1\d)|(2[0-8])))|((((0[13578])|(1[02]))-31)|(((0[1,3-9])|(1[0-2]))-(29|30)))))$/);
	if (locale == "en_US") {
		matchArray = str
				.match(/^((((02|2)\/29)\/(19|20)(([02468][048])|([13579][26])))|((((0?[1-9])|(1[0-2]))\/((0?[1-9])|(1\d)|(2[0-8])))|((((0?[13578])|(1[02]))\/31)|(((0?[1,3-9])|(1[0-2]))\/(29|30))))\/((20[0-9][0-9])|(19[0-9][0-9])|(18[0-9][0-9])))$/);
	}
	if (str != "" && matchArray == null) {
		var strLaber = "";
		if (obj.attr("label") != null) {
			strLaber = obj.attr("label");
		}
		irisValaddMsg(messageTip.date.replace("[name]", strTitle + strLaber));
		return false;
	}

	return true;
}

//纯验证日期格式是否正确  验证日期（由于日期比较的项在不同的table下，造成填写检查提示错误）
function irisValDateByObjPure(obj) {
	var str = getTagValueByJq(obj);
	var matchArray = str
			.match(/^((((19|20)(([02468][048])|([13579][26]))-(02)-29))|((20[0-9][0-9])|(19[0-9][0-9])|(18[0-9][0-9]))-((((0[1-9])|(1[0-2]))-((0[1-9])|(1\d)|(2[0-8])))|((((0[13578])|(1[02]))-31)|(((0[1,3-9])|(1[0-2]))-(29|30)))))$/);
	if (locale == "en_US") {
		matchArray = str
				.match(/^((((02|2)\/29)\/(19|20)(([02468][048])|([13579][26])))|((((0?[1-9])|(1[0-2]))\/((0?[1-9])|(1\d)|(2[0-8])))|((((0?[13578])|(1[02]))\/31)|(((0?[1,3-9])|(1[0-2]))\/(29|30))))\/((20[0-9][0-9])|(19[0-9][0-9])|(18[0-9][0-9])))$/);
	}
	if (str != "" && matchArray == null) {
		return false;
	}

	return true;
}

// 验证两个日期大小(d1<d2)
function irisValDateCompareByObj(d1, d2) {

	var str1 = getTagValueByJq(d1);
	var str2 = getTagValueByJq(d2);

	if (str1 == "" || str2 == "")
		return true;

	var flag = true;
	if (!irisValDateByObjPure(d1))
		flag = false;
	if (!irisValDateByObjPure(d2))
		flag = false;
	if (!flag)
		return true;

	var firstDate;
	var secondDate;
	if (locale == "en_US") {
		d1Array = (str1.split("/"));
		d2Array = (str2.split("/"));

		firstDate = new Date(d1Array[2], getDateNumber(d1Array[0]) - 1,
				getDateNumber(d1Array[1]));
		secondDate = new Date(d2Array[2], getDateNumber(d2Array[0]) - 1,
				getDateNumber(d2Array[1]));
	} else {
		d1Array = (str1.split("-"));
		d2Array = (str2.split("-"));

		firstDate = new Date(d1Array[0], getDateNumber(d1Array[1]) - 1,
				getDateNumber(d1Array[2]));
		secondDate = new Date(d2Array[0], getDateNumber(d2Array[1]) - 1,
				getDateNumber(d2Array[2]));
	}

	if (firstDate < secondDate)
		return true;
	else {
		var strLaber1 = "";
		if (d1.attr("label") != null) {
			strLaber1 = d1.attr("label");
		}
		var strLaber2 = "";
		if (d2.attr("label") != null) {
			strLaber2 = d2.attr("label");
		}
		irisValaddMsg(strTitle
				+ messageTip.dateCompare.replace("[d1]", strLaber1).replace(
						"[d2]", strLaber2));
		return false;
	}

}
// 验证两个日期大小(d1<=d2)
function irisValDateBeforeEByObj(d1, d2) {

	var str1 = getTagValueByJq(d1);
	var str2 = getTagValueByJq(d2);

	if (str1 == "" || str2 == "")
		return true;

	var flag = true;
	if (!irisValDateByObjPure(d1))
		flag = false;
	if (!irisValDateByObjPure(d2))
		flag = false;
	if (!flag)
		return true;

	var firstDate;
	var secondDate;
	if (locale == "en_US") {
		d1Array = (str1.split("/"));
		d2Array = (str2.split("/"));
		firstDate = new Date(d1Array[2], getDateNumber(d1Array[0]) - 1,
				getDateNumber(d1Array[1]));
		secondDate = new Date(d2Array[2], getDateNumber(d2Array[0]) - 1,
				getDateNumber(d2Array[1]));
	} else {
		d1Array = (str1.split("-"));
		d2Array = (str2.split("-"));
		firstDate = new Date(d1Array[0], getDateNumber(d1Array[1]) - 1,
				getDateNumber(d1Array[2]));
		secondDate = new Date(d2Array[0], getDateNumber(d2Array[1]) - 1,
				getDateNumber(d2Array[2]));
	}
	if (firstDate <= secondDate)
		return true;
	else {
		var strLaber1 = "";
		if (d1.attr("label") != null) {
			strLaber1 = d1.attr("label");
		}
		var strLaber2 = "";
		if (d2.attr("label") != null) {
			strLaber2 = d2.attr("label");
		}
		irisValaddMsg(strTitle
				+ messageTip.dateBeforeE.replace("[d1]", strLaber1).replace(
						"[d2]", strLaber2));
		return false;
	}
}
// 验证两个日期大小(d1>=d2)
function irisValDateAfterEByObj(d1, d2) {

	var str1 = getTagValueByJq(d1);
	var str2 = getTagValueByJq(d2);

	if (str1 == "" || str2 == "")
		return true;

	var flag = true;
	if (!irisValDateByObjPure(d1))
		flag = false;
	if (!irisValDateByObjPure(d2))
		flag = false;
	if (!flag)
		return true;

	var firstDate;
	var secondDate;
	if (locale == "en_US") {
		d1Array = (str1.split("/"));
		d2Array = (str2.split("/"));
		firstDate = new Date(d1Array[2], getDateNumber(d1Array[0]) - 1,
				getDateNumber(d1Array[1]));
		secondDate = new Date(d2Array[2], getDateNumber(d2Array[0]) - 1,
				getDateNumber(d2Array[1]));
	} else {
		d1Array = (str1.split("-"));
		d2Array = (str2.split("-"));
		firstDate = new Date(d1Array[0], getDateNumber(d1Array[1]) - 1,
				getDateNumber(d1Array[2]));
		secondDate = new Date(d2Array[0], getDateNumber(d2Array[1]) - 1,
				getDateNumber(d2Array[2]));
	}
	if (firstDate >= secondDate)
		return true;
	else {
		var strLaber1 = "";
		if (d1.attr("label") != null) {
			strLaber1 = d1.attr("label");
		}
		var strLaber2 = "";
		if (d2.attr("label") != null) {
			strLaber2 = d2.attr("label");
		}
		irisValaddMsg(strTitle
				+ messageTip.dateAfterE.replace("[d1]", strLaber1).replace(
						"[d2]", strLaber2));
		return false;
	}
}

/**
 * 辅助日期比较
 * 
 * @param str
 * @returns
 */
function getDateNumber(str) {
	if ((str.substring(0, 1)).indexOf("0") > -1) {
		str = str.substring(1, str.length);
	}
	return str;
}
// 验证email
function irisValEmailByObj(obj) {
	var str = getTagValueByJq(obj);
	var matchArray = str.match(/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/);
	if (str != "" && matchArray == null) {
		var strLaber = "";
		if (obj.attr("label") != null) {
			strLaber = obj.attr("label");
		}
		irisValaddMsg(messageTip.email.replace("[name]", strTitle + strLaber));
		return false;
	}

	return true;
}

/**
 * 验证同样的Obj最少要填写一个
 * 
 * @param objName
 * @param min
 * @returns {Boolean}
 */
function irisValReqMinByObj(obj, min) {
	var objName = obj.attr("name").substring(0,
			obj.attr("name").lastIndexOf("_"));
	var num = 0;
	$("[name*='" + objName + "_']").each(function() {
		if ($(this) != null && $(this).val() != "") {
			num = num + 1;
		}
	});
	if (num < min) {
		var strLaber = "";
		if (obj.attr("label") != null) {
			strLaber = obj.attr("label");
		}

		irisValaddMsg(messageTip.reqmin.replace("[name]", strTitle + strLaber)
				.replace("[min]", min));
		return false;
	} else {
		return true;
	}
}

// 验证身份证
function irisValIDCardByObj(obj) {
	var str = getTagValueByJq(obj);
	if($.trim(str) == ""){
		return true;
	}
	// 验证身份证，
	if (checkIdentityCard(str)) {
		return true;
	}

	var strLaber = "";
	if (obj.attr("label") != null) {
		strLaber = obj.attr("label");
	}
	irisValaddMsg("[name]的格式不符合规范，请重新填写".replace("[name]", strTitle + strLaber));
}

//验证组织机构代码
function irisValORGCardByObj(obj) {
	var str = getTagValueByJq(obj);
	if($.trim(str) == ""){
		return true;
	}

	//验证组织机构代码，
	if (checkOrgCode(str)||checkSocialCreditCode(str)) {
		return true;
	}

	var strLaber = "";
	if (obj.attr("label") != null) {
		strLaber = obj.attr("label");
	}
	irisValaddMsg("[name]的格式不符合规范，请重新填写".replace("[name]", strTitle + strLaber));
}

/**
 * 比较2个数大小
 * 
 * @param str1
 * @param str2
 * @param msg
 * @returns {Boolean}
 */
function irisValThan(str1, str2, msg) {
	if($("#" + changeString(str1)).length!=1 || $("#" + changeString(str2)).length!=1)
        return true;

	var minvalue = getTagValueByJq($("#" + changeString(str1)));
	var maxvalue = getTagValueByJq($("#" + changeString(str2)));
	if(minvalue && minvalue!="") minvalue = minvalue.replace(",","");
	if(maxvalue && maxvalue!="") maxvalue = maxvalue.replace(",","");
	//var minvalue = $("#" + str1).val();
	//var maxvalue = $("#" + str2).val();
	if (minvalue == "")
		minvalue = 0;
	if (maxvalue == "")
		maxvalue = 0;
	if (parseFloat(minvalue) > parseFloat(maxvalue)) {
		if (msg == "") {
			msg = strTitle + $("#" +  changeString(str1)).attr("label") + "不能大于"
					+ $("#" + changeString(str2)).attr("label");
		}
		irisValaddMsg(msg);
		return false;
	}
	return true;
}

/**
 * 验证两个数字的百分比
 * 
 * @param obj
 * @param totalObj
 * @param percent
 */
function irisValPercentCompare(obj, totalObj, percent) {
	if ($.isNumeric(obj.val()) && $.isNumeric(totalObj.val())
			&& $.isNumeric(percent) && percent >= 0) {
		var objValue = parseFloat(obj.val());
		var totalValue = parseFloat(totalObj.val());

		if (objValue / totalValue > percent / 100) {
			var objLabel = "";
			var totalLabel = "";
			if (obj.attr("label") != null)
				objLabel = obj.attr("label");
			if (totalObj.attr("label") != null)
				totalLabel = totalObj.attr("label");

			irisValaddMsg(strTitle + objLabel + "不能超过" + totalLabel + "的"
					+ percent + "%");
			return false;
		}
	}
	return true;
}

/**
 * 验证值不能重复
 * 
 * @param obj
 */
function irisValNoRepeat(obj) {
	var objName = obj.attr("name").substring(0,
			obj.attr("name").lastIndexOf("_"));
	var objs = $("[name*='" + objName + "_']");
	var flag = true;
	objs.each(function(i, obj1) {
		if ($.trim($(obj1).val()) != "") {
			for ( var j = i + 1; j < objs.length; j++) {
				if ($.trim($(obj1).val()) == $.trim($(objs[j]).val())) {
					flag = false;
					return false;
				}
			}
		}
	});

	if (!flag) {
		var strLaber = "";
		if (obj.attr("label") != null) {
			strLaber = obj.attr("label");
		}

		irisValaddMsg(messageTip.canNotBeDuplicated.replace("[name]", strTitle
				+ strLaber));
		return false;
	} else {
		return true;
	}
}
/**
 * 验证值不能重复 传入名称数组
 * 
 * @param obj
 */
function irisValNoRepeatByNames(nameArr) {
	var names = $(nameArr);
	var flag = true;
	names.each(function(i, obj) {
		obj1 = $("[name *='" + obj + "']").get(0);
		if ($.trim($(obj1).val()) != "") {
			for ( var j = i + 1; j < nameArr.length; j++) {
				var obj2 = $("[name *='" + nameArr[j] + "']").get(0);
				if ($.trim($(obj1).val()) == $.trim($(obj2).val())) {
					flag = false;
					return false;
				}
			}
		}
	});
	if (!flag) {
		var strLaber = "";
		names.each(function(i, obj) {
			obj1 = $("[name *='" + obj + "']");
			if (obj1.attr("label") != null) {
				strLaber += "与" + obj1.attr("label");
			}
		});
		strLaber = strLaber.substring(1);
		irisValaddMsg(messageTip.canNotBeDuplicated.replace("[name]", strTitle
				+ strLaber));
		return false;
	} else {
		return true;
	}
}

/**
 * /验证日期必须大于当前日期
 * 
 * @param obj
 * @returns {Boolean}
 */
function irisValAfterToday(obj) {
	var str = getTagValueByJq(obj);
	if (str == "" || !irisValDateByObj(obj))
		return true;

	var firstDate = new Date();
	var secondDate;
	if (locale == "en_US") {
		var objArray = (str.split("/"));
		secondDate = new Date(objArray[2], getDateNumber(objArray[0]) - 1,
				getDateNumber(objArray[1]));
	} else {
		var objArray = (str.split("-"));
		secondDate = new Date(objArray[0], getDateNumber(objArray[1]) - 1,
				getDateNumber(objArray[2]));
	}

	if (firstDate < secondDate)
		return true;
	else {
		var strLaber = "";
		if (obj.attr("label") != null) {
			strLaber = obj.attr("label");
		}
		irisValaddMsg(strTitle
				+ messageTip.startDateMustLaterThanToday.replace("[name]",
						strLaber));
		return false;
	}

}

/**
 * /验证日期必须不大于当前日期
 * 
 * @param obj
 * @returns {Boolean}
 */
function irisValBeforeToday(obj) {
	var str = getTagValueByJq(obj);
	if (str == "" || !irisValDateByObj(obj))
		return true;

	var firstDate = new Date();
	var secondDate;
	if (locale == "en_US") {
		var objArray = (str.split("/"));
		secondDate = new Date(objArray[2], getDateNumber(objArray[0]) - 1,
				getDateNumber(objArray[1]));
	} else {
		var objArray = (str.split("-"));
		secondDate = new Date(objArray[0], getDateNumber(objArray[1]) - 1,
				getDateNumber(objArray[2]));
	}

	if (firstDate >= secondDate)
		return true;
	else {
		var strLaber = "";
		if (obj.attr("label") != null) {
			strLaber = obj.attr("label");
		}
		irisValaddMsg(strTitle
				+ messageTip.regDateMustBeforeThanToday.replace("[name]",
						strLaber));
		return false;
	}

}

/*
 * 判断表格行数不超过某一个值 str1：表格id str2：需要比较的值的id startidx：计算从第几行开始计算表格行数，默认值为2
 */
function irisValTalbelRowsCompare(str1, str2, startidx) {
	var tabLength;
	if (startidx == "") {
		tabLength = $('#' + str1 + ' tr').length - 2;
	} else {
		tabLength = $('#' + str1 + ' tr').length - startidx;
	}
	var count = $('#' + str2).val();
	msg = strTitle + $("#" + str2).attr("label") + "必须大于等于"
			+ $("#" + str1).attr("label");
	if (tabLength > count) {
		irisValaddMsg(msg);
		return false;
	} else {
		return true;
	}

}

/**
 * 获得标签的值
 */
function getTagValueByJq(oTag) {
	try {
		if (oTag.is("span"))
			return oTag.text();
		else if (oTag.is("[type='radio']"))
			return $.trim($("#" + oTag.attr("name") + "_value").val());
		else
			return $.trim(oTag.val());
	} catch (ex) {
		return "";
	}
}

/** 添加错误消息* */
function irisValaddMsg(strValue) {
	if (strValue != "")
		addArrValue(errorMsg, strValue);
}
function addArrValue(arrObj, strValue) {
	arrObj[arrObj.length] = strValue;
}
/** 添加错误消息* */

/**
 * 显示错误消息
 */
function irisValShowMsg(jqObj) {
	var strHtml = "";
	for ( var i = 0; i < errorMsg.length; i++) {
		strHtml = strHtml + (i + 1) + ":" + errorMsg[i] + "<br>";
	}
	errorMsg = new Array();
	showBox(jqObj, "300px", "200px", messageTip.check_nopass, strHtml);

}
/*校验统一社会信用代码*/
function checkSocialCreditCode(code) 
{ 
  code=code.toUpperCase();
　　var patrn = /^[0-9A-Z]+$/;
 　　//18位校验及大写校验
　　 if ((code.length != 18) || (patrn.test(code) == false)){ 
　　　　　　return false;
　　}else{ 
　　　　var Ancode;//统一社会信用代码的每一个值
 　　　　var Ancodevalue;//统一社会信用代码每一个值的权重 
　　　　var total = 0; 
　　　　var weightedfactors = [1, 3, 9, 27, 19, 26, 16, 17, 20, 29, 25, 13, 8, 24, 10, 30, 28];//加权因子 
　　　　var str = '0123456789ABCDEFGHJKLMNPQRTUWXY';
　　　　//不用I、O、S、V、Z 
　　　　for (var i = 0; i < code.length - 1; i++) 
　　　　{
 　　　　Ancode = code.substring(i, i + 1); 
　　　　Ancodevalue = str.indexOf(Ancode); 
　　　　total = total + Ancodevalue * weightedfactors[i];
　　　　//权重与加权因子相乘之和 
　　　　}
 　　　　var logiccheckcode = 31 - total % 31;
 　　　　if (logiccheckcode == 31){
                    　　logiccheckcode = 0;
      }
      var Str = "0,1,2,3,4,5,6,7,8,9,A,B,C,D,E,F,G,H,J,K,L,M,N,P,Q,R,T,U,W,X,Y";
      var Array_Str = Str.split(',');
      logiccheckcode = Array_Str[logiccheckcode];
　　　　 var checkcode = code.substring(17, 18);
　　　　 if (logiccheckcode != checkcode) 
　　　　{ 
　　　　　　//alert("不是有效的统一社会信用编码！"); 
	 	return false;
 　　　　}else{
	 	return true;
 　　　　}
 　　}
　}
/* 校验组织机构代码 */
function checkOrgCode(code) {
	if (code.length != 9) {
		return false;
	}
	code = code.toUpperCase();

	var weights = new Array(3, 7, 9, 10, 5, 8, 4, 2);
	var aChar;
	var sumWeight = 0;
	var C9 = code.charAt(8);

	for ( var i = 0; i < 8; i++) {
		aChar = code.charAt(i);
		sumWeight += weights[i] * getCharCode(aChar);
	}
	// alert(sumWeight);

	var result = 11 - (sumWeight % 11);
	// alert("X"+"=" + C9);

	if (result == 11) {
		return "0" == C9;
	}
	if (result == 10) {
		return "X" == C9;
	}
	return result == C9;

}

function getCharCode(aChar) {
	var aCharCode = aChar.charCodeAt(0);
	if (aCharCode < 65)
		return aChar;
	return aCharCode - 55;

}

function irisValIDCard(strobj, msg) {
	var obj = getObjByIdOrName(strobj);
	if (!obj)
		return true;

	return irisValIDCardByObj(obj, msg);
}
function irisValShowMeg(msg) {
	irisValaddMsg(msg);
}

// 验证负值 by pcy
function irisValMinus(str, msg) {
	var obj = document.getElementById(str).value;
	if (obj < 0) {
		irisValaddMsg(messageTip.negative.replace("[name]", msg));
		return false;
	}
	return true;
}
function irisValEqual(str1, str2, msg) {
	var obj1 = document.getElementById(str1).value;
	var obj2 = document.getElementById(str2).value;
	if (obj1 == "") {
		obj1 = 0;
	}
	if (obj2 == "") {
		obj2 = 0;
	}
	// if(obj1==""&&obj2=="")
	if (parseFloat(obj1) != parseFloat(obj2)) {
		irisValaddMsg(messageTip.equal.replace("[name]", msg));
		return false;
	}
	return true;
}
// 验证百分率 by pcy
function irisValPercent(str, msg) {
	var obj = document.getElementById(str).value;
	if (parseFloat(obj) > 100) {
		irisValaddMsg(messageTip.percent.replace("[name]", msg));
		return false;
	}
	return true;
}
function getObjByIdOrName(str) {
	var obj = document.getElementById(str);
	if (obj == null) {
		obj = document.getElementsByName(str);
		if (obj[0])
			obj = obj[0];
		else
			return null;
	}
	return obj;
}
function irisValYear(obj, msg) {
	var year = document.getElementById(obj).value;

	if (parseInt(year) < 1950 || parseInt(year) > 2050) {
		irisValaddMsg(msg);
		return false;
	}
	return true;

}
// /=================== ytb add
function sti_ValDateByObj(obj, msg) {

	var str = getTagValueByJq(obj);
	if (str == "")
		return false;

	str = str + "-01-01";
	// alert('tst'+str+'test');
	// var matchArray =
	// str.match(/^((((1[6-9]|[2-9]\d)\d{2})-(0?[13578]|1[02])-(0?[1-9]|[12]\d|3[01]))|(((1[6-9]|[2-9]\d)\d{2})-(0?[13456789]|1[012])-(0?[1-9]|[12]\d|30))|(((1[6-9]|[2-9]\d)\d{2})-0?2-(0?[1-9]|1\d|2[0-8]))|(((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))-0?2-29-))$/);
	var matchArray = str
			.match(/^((((19|20)(([02468][048])|([13579][26]))-(02|2)-29))|((20[0-9][0-9])|(19[0-9][0-9]))-((((0?[1-9])|(1[0-2]))-((0?[1-9])|(1\d)|(2[0-8])))|((((0?[13578])|(1[02]))-31)|(((0?[1,3-9])|(1[0-2]))-(29|30)))))$/);
	if (str != "" && matchArray == null) {
		irisValaddMsg(msg);
		return false;
	}

	return true;
}

function sti_ValDate(strobj, msg) {
	var obj = getObjByIdOrName(strobj);
	if (!obj)
		return true;

	return sti_ValDateByObj(obj, msg);
}

function stiValDateCompareByObj(d1, msg) {

	var str1 = getTagValueByJq(d1);
	// var str2 = getTagValueByJq(d2);
	// if(str1==""||str2=="") return true;

	// if(!irisValDateByObj(d1,"")) return true;
	// if(!irisValDateByObj(d2,"")) return true;
	var today = new Date();
	today_str = today.getYear() + "-" + (today.getMonth() + 1) + "-"
			+ today.getDate();
	str1 = str1 + "-" + (today.getMonth() + 1) + "-" + today.getDate();
	// alert("str1="+str1);
	// alert("today_str="+today_str);

	d1Array = (str1.split("-"));
	d2Array = (today_str.split("-"));
	// alert("eee");
	var firstDate = new Date(d1Array[0], getDateNumber(d1Array[1]),
			getDateNumber(d1Array[2]));
	// alert("dd");
	var secondDate = new Date(d2Array[0], getDateNumber(d2Array[1]),
			getDateNumber(d2Array[2]));
	// alert("ff");
	// return ;
	if (firstDate <= secondDate)
		return true;
	else {
		irisValaddMsg(msg);
		return false;
	}

}
// add by lwy 20080822
function irisValAjax(url, postData) {
	var xmlobj = getNewXmlHttpRequest();
	// var url ="/stms/publicDetail.do?Action=ajaxSetStatus";
	// var postData="&detailCode=" + encodeURIComponent(detailCode)+"&status=" +
	// encodeURIComponent(status);
	xmlobj.open('POST', url, false);
	xmlobj
			.setRequestHeader("Content-Type",
					"application/x-www-form-urlencoded");
	xmlobj.send(postData);

	var errMsg = xmlobj.responseText;
	if (errMsg != "") {
		irisValaddMsg(errMsg);
		return false;
	}
	return true;
}

/**
 * 校验研究领域
 * 
 * @param tblId
 *            操作的表格id
 * @param flag
 *            使用的场所，"prp"表示申请书>编辑参与人信息中，"psn"表示个人信息维护中
 */
function validateResearch(tblId, flag) {
	if ($("#subject1").length == 0) {
		if (flag == "psn")
			irisValaddMsg(messageTip.research_atLeast);
		else if (flag == "prp")
			return true;
	} else {
		$("#" + tblId).children().children().each(
				function() {

					var i = $(this).get(0).rowIndex;// 获得行数
					if (i > 1) {// 如果有行 显示时display行不计入类，故只减1
						i = i - 1;

						var subject = $("#subject" + i).val();
						var zh_keyword = $("#span_zh_keyword_" + i).html();
						var en_keyword = $("#span_en_keyword_" + i).html();

						if (flag == "prp") {
							if (subject == "" && zh_keyword == ""
									&& en_keyword == "")
								return true;
						}

						if (subject == "") {
							irisValaddMsg(messageTip.research_applicantCode
									.format(i));
						} else {
							validateSubject("subject" + i, "research_subject",
									"研究领域第" + i + "行");
						}
						if (zh_keyword == "" && en_keyword == "") {
							irisValaddMsg(messageTip.research_keywords
									.format(i));
						}
					}
				});
	}
}

/**
 * 校验填写的依托单位是否存在，若存在则登记org_code
 * 
 * @param objId
 * @param title
 */
function validateOrg(objId, title) {
	var obj = $("#" + objId);
	var org_name = $.trim(obj.val());
	if (org_name == null || org_name == "") {
		clearOrgInfo(objId);
		return false;
	}

	var codeObj = obj.parents("td").find("[name$='" + objId + "_code']");

	$.ajax({
		url : ctx + "/proposal/getorgcode",
		async : false,
		data : {
			"orgName" : org_name
		},
		dataType : "text",
		type : "post",
		success : function(data) {
			if (data == "") {
				irisValaddMsg(title
						+ messageTip.validateOrg_notRegistered.format(obj
								.attr("label")));
				clearOrgInfo(objId);
			} else {
				var oldCode = codeObj.val();
				if (oldCode != data) {
					codeObj.val(data);
					changeOrg(objId, {
						"id" : data
					}, false);
				}
			}
		},
		error : function(data) {
			scmError(messageTip.validateOrg_operationFailed + data);
		}
	});

	if (codeObj.val() != "")
		validateDepart(codeObj.val(), "depart", title);
}

/**
 * 校验填写的院系所是否存在，若存在则登记depart_code
 * 
 * @param orgCode
 * @param objId
 * @param title
 */
function validateDepart(orgCode, objId, title) {
	var obj = $("#" + objId);
	var depart_name = $.trim(obj.val());
	if (depart_name == null || depart_name == "") {
		clearDepartInfo(false);
		return false;
	}

	$.ajax({
		url : ctx + "/proposal/getdepartcode",
		async : false,
		data : {
			"orgCode" : orgCode,
			"departName" : depart_name
		},
		dataType : "text",
		type : "post",
		success : function(data) {
			if (data == "") {
				clearDepartInfo(true);
			} else {
				var codeObj = obj.parents("td").find(
						"[name$='" + objId + "_code']");
				var oldCode = codeObj.val();
				if (oldCode != data) {
					codeObj.val(data);
					changeDepart(objId, {
						"id" : data
					});
				}
			}
		},
		error : function(data) {
			scmError(messageTip.validateOrg_operationFailed + data);
		}
	});
}

/** *验证身份证 start** */

var aCity = {
	11 : "北京",
	12 : "天津",
	13 : "河北",
	14 : "山西",
	15 : "内蒙古",
	21 : "辽宁",
	22 : "吉林",
	23 : "黑龙江",
	31 : "上海",
	32 : "江苏",
	33 : "浙江",
	34 : "安徽",
	35 : "福建",
	36 : "江西",
	37 : "山东",
	41 : "河南",
	42 : "湖北",
	43 : "湖南",
	44 : "广东",
	45 : "广西",
	46 : "海南",
	50 : "重庆",
	51 : "四川",
	52 : "贵州",
	53 : "云南",
	54 : "西藏",
	61 : "陕西",
	62 : "甘肃",
	63 : "青海",
	64 : "宁夏",
	65 : "新疆",
	71 : "台湾",
	81 : "香港",
	82 : "澳门",
	91 : "国外"
};
function cidInfo(sId) {
	var iSum = 0;
	if (!/^\d{17}(\d|x)$/i.test(sId))
		return false;
	sId = sId.replace(/x$/i, "a");
	if (aCity[parseInt(sId.substr(0, 2))] == null)
		return false;
	sBirthday = sId.substr(6, 4) + "-" + Number(sId.substr(10, 2)) + "-"
			+ Number(sId.substr(12, 2));
	var d = new Date(sBirthday.replace(/-/g, "/"));
	if (sBirthday != (d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d
			.getDate()))
		return false;
	for ( var i = 17; i >= 0; i--)
		iSum += (Math.pow(2, i) % 11) * parseInt(sId.charAt(17 - i), 11);
	if (iSum % 11 != 1)
		return false;
	return true;
}

// 身份证验证
function checkIdentityCard(cardno) {
	return cidInfo(cardno);
}

// 身份证验证
jQuery.validator.addMethod("identityCard", function(value, element) {
	if ($("#certificatType").val() == 1) {
		return this.optional(element) || cidInfo(value);
	} else {
		return true;
	}
}, "<font color='red'>" + messageTip.untrueidentityNo + "</font>");

jQuery.validator.addMethod("identityCardUq", function(value, element) {
	if ($("#certificatType").val() == 1) {
		return this.optional(element)
				|| checkCardCodeUQ($("#certificatType").val(), value);
	} else {
		return true;
	}
}, "<font color='red'>系统已存在证件信息</font>");

/** 判断身份证唯一 */
function checkCardCodeUQ(sType, sId) {
	var returnData = "";
	$.ajax({
		url : ctx + "/expactive/identity-cardcheck",
		async : false,
		type : "post",
		data : {
			"sid" : sId,
			'stype' : sType
		},
		success : function(data) {
			returnData = data;
		}
	});
	if (returnData == 'conflict') {
		return false;
	} else {
		return true;
	}
}
/** *验证身份证 end** */

/**
 * 申请书中校验申请代码
 * 
 * @param objId
 * @param key
 *            控件的key
 * @param title
 */
function validateSubject(objId, key, title) {
	var obj = $("#" + objId);
	var objVal = $.trim(obj.val());

	var codeObj = $($("#" + objId + "_code,[name$='" + objId + "_code']")[0]);
	var nameObj = $($("#" + objId + "_name,[name$='" + objId + "_name']")[0]);

	if (objVal == null || objVal == "") {
		codeObj.val("");
		nameObj.val("");
		return false;
	}
	var objCode = objVal.toUpperCase();
	try {
		if (objCode == codeObj.val().toUpperCase()
				|| objCode == (codeObj.val() + "." + nameObj.val())
						.toUpperCase()) {
			obj.val(codeObj.val() + "." + nameObj.val());
			return true;
		}
	} catch (e) {

	}

	if (objCode.indexOf(".") >= 0)
		objCode = objCode.substring(0, objCode.indexOf("."));

	// 获取输入的值能查询出来的申请代码
	var data = getDataForComplete(objCode, key, $("#" + objId + "_sqlParamVal")
			.val());
	var len = data.length;
	var code = "";
	var name = "";

	if (len > 0) {
		code = data[0].id;
		name = data[0].name;
	}
	if (len > 0 && code.length > 1 && objCode == code.toUpperCase()) {
		obj.val(name);
		codeObj.val(code);
		nameObj.val(name.substring(name.indexOf(".") + 1));
		return true;
	} else {
		if (title == null || title == "") {
			codeObj.val("");
			nameObj.val(objVal);
		} else {
			irisValaddMsg(title + "-->" + obj.attr("label") + "是不存在的");
			codeObj.val("");
			nameObj.val("");
		}
		return false;
	}
}

/**
 * 获取自动过滤控件查询出来的数据
 * 
 * @param q
 *            要查询的内容
 * @param key
 * @param sqlParamVal
 *            sql语句的的参数值
 */
function getDataForComplete(q, key, sqlParamVal) {
	var returnData = "";
	$.ajax({
		url : ctx + "/cpt/ajaxload-complete",
		async : false,
		type : "post",
		dataType : "json",
		data : {
			"q" : q,
			"locale" : "zh_CN",
			"key" : key,
			"cacheable" : "false",
			"sqlParamVal" : sqlParamVal
		},
		success : function(data) {
			returnData = data;
		}
	});
	return returnData;
}

function irisValYearByObj(obj) {
	var year = obj.val();
	if (year == "")
		return true;
	if (parseInt(year) < 1950 || parseInt(year) > 2050) {
		irisValaddMsg(strTitle + obj.attr("label") + "不是合法的年度");
		return false;
	}
	return true;
}

function irisValMobile(obj) {
	var mobile = obj.val();
	if (mobile == "")
		return true;
	var myreg = /^1\d{10}$/;
	if (!myreg.test(mobile)) {
		irisValaddMsg(strTitle + obj.attr("label") + "填写不正确")
		return false;
	}
	return true;
}

function irisValEnglish(obj) {
	var str = obj.val();
	if (str == "")
		return true;
	var myreg = /^[a-zA-Z]+$/;
	if (!myreg.test(str)) {
		irisValaddMsg(strTitle + obj.attr("label") + "只能输入英文")
		return false;
	}
	return true;
}

function irisValChinese(obj) {
	var str = obj.val();
	if (str == "")
		return true;
	var myreg = /^[\u2E80-\u9FFF]+$/;
	if (!myreg.test(str)) {
		irisValaddMsg(strTitle + obj.attr("label") + "只能输入中文")
		return false;
	}
	return true;
}

function irisCheckBoxNumCheck(id,maxNum) {
	if($("#"+id).val().split("，").length > maxNum){
	  var msg = $("#"+id).attr("label")+"选择不能超过"+maxNum+"项";
		irisValaddMsg(strTitle+msg);
		return false;
	}
	return true;
}

function irisCheckSumEqual(id1,id2,id3) {
	var val1 =parseFloat($("#"+id1).val());
	var val2 =parseFloat($("#"+id2).val());
	var val3 =parseFloat($("#"+id3).val());
	if (!$.isNumeric(val1)) {
		val1 = 0;
	}
	if (!$.isNumeric(val2)) {
		val2 = 0;
	}
	if (!$.isNumeric(val3)) {
		val3 = 0;
	}
	var sum = val1+val2;
	if(sum != val3){
	  var msg = $("#"+id1).attr("label")+"的值与"+$("#"+id2).attr("label")+"的值之和必须等于"+$("#"+id3).attr("label")+"的值";
		irisValaddMsg(strTitle+msg);
		return false;
	}
	return true;
}
function irisCheckSumEqual2(countId,subIds) {
	var subIdArr = subIds.split(",");
	var sum = parseFloat($("#"+countId).val());
	var sum2 = 0;
	var val = 0;
	var id = '';
	var msg = '';
	for (var i = 0;i<subIdArr.length;i++){
		id = subIdArr[i];
		val = parseFloat($("#"+id).val());
		if (!$.isNumeric(val)) {
			val = 0;
		}
		//解决js计算小数相加时的bug
		sum2=accAdd(sum2,val);
		//sum2 = sum2+val;
		if (i != subIdArr.length-1){
		msg =msg + $("#"+id).attr("label")+"、";
		} else {
			msg =msg + $("#"+id).attr("label");
		}
	}
	if(sum != sum2){
	   msg = msg + "之和必须等于"+$("#"+countId).attr("label")+"的值";
		irisValaddMsg(strTitle+msg);
		return false;
	}
	return true;
}


//加法函数，用来得到精确的加法结果 
//说明：javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的加法结果。 
//调用：accAdd(arg1,arg2) 
//返回值：arg1加上arg2的精确结果 
function accAdd(arg1,arg2){
	var r1,r2,m; 
	try {
		r1=arg1.toString().split(".")[1].length;
	}catch(e){
		r1=0;
	} 
	try {
		r2=arg2.toString().split(".")[1].length;
	}catch(e){
		r2=0;
	} 
	m=Math.pow(10,Math.max(r1,r2)+2); 
	return (Math.round((arg1*m+arg2*m)))/m; 
} 

