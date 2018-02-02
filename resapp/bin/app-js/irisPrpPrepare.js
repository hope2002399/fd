/**
 * 申请书编辑方法
 * 
 * @param posCode
 * @param grantCode
 * @param subGrantCode
 * @param type
 */
function editAction(posCode, grantCode, subGrantCode, type) {
	//var subGrantCode = $("#subGrantCode").val();
	// var grantCode=$("#grantCode").val();
	if (type == "add") {

		if (subGrantCode == "undefined" || subGrantCode == null
				|| subGrantCode == "") {
			$("#subGrantCode").val("");// 清空值
			$("#mainForm").attr("action", ctx + "/grantsetting/selectgrant");
			var orgCode = $("#grantOrgCode").find("option:selected").val();
			if (null != orgCode && undefined != orgCode && orgCode.length > 0) {	//设置选中的单位在隐藏域中
				$("#orgCode").val(orgCode);	
			}
			var orgCode = $("#orgCode").val();
			if (orgCode && orgCode != null && $.trim(orgCode).length > 0) {
				$("#mainForm").submit();
			} else {
				scmWarn("申请书提交必须要有一个申报单位");
			}
		} else {
			$("#subGrantCode").val(subGrantCode);
			$("#mainForm").submit();
		}
	} else if (type == "del") {
		$("#posCode").val(posCode);
		$("#pwd").val("");
		//删除申报书中出现下拉框处理删除了"TB_iframe=true&"
		tb_show("密码验证", ctx + "/proposal/input-password?TB_iframe=true&height=185&width=400", false);
		/*if (confirm(messageTip.proposaldel)) {
			delAction();
		}*/

	} else {
		$("#grantCode").val(grantCode);
		$("#posCode").val(posCode);
		$("#subGrantCode").val(subGrantCode);
		$("#ActionType").val(type);
		$("#mainForm").attr("action", ctx + "/proposal/enter-prp");
		$("#mainForm").submit();
	}
}
function pwdOk(){
	var pwd = $("#pwd").val();
	if ($.trim(pwd).length > 0) {
		$.ajax({
			url : ctx + "/proposal/prp-check-pwd",
			async : false,
			data : {
				"password" : pwd
			},
			dataType : "json",
			type : "post",
			success : function(msg) {
				var result = eval(msg);
				if (result.result=='success') {
					parent.delAction();
					parent.tb_remove();
				} else {
					scmWarn("密码不正确");	
				}
				
			},
			error : function(msg) {
				var result = eval(msg);
				scmError("密码验证程序错误:"+result.result);
			}
		});
	}else {
		scmWarn("请输入密码");
	}
}
function psnInfoView(obj,tableId) {
	var subGrantCode = $("[name='proposal/sub_grant_code']").val();
	var url;
	if(subGrantCode == 476){
		url = ctx+"/proposal/view/dialog/psnInfoEdit?parentTab="+
				tableId+"&type=edit&needMeetingInfo=1&TB_iframe=true&height=460&width=910";
	}else{
		url = ctx+"/proposal/view/dialog/psnInfoEdit?parentTab="+tableId+"&type=edit&TB_iframe=true&height=460&width=910";
	}
	
	$(obj).parents("tr").find(":radio").attr("checked",true);
	
	if(!$("#"+tableId+" :radio:checked").length>0){
		scmWarn(irisNotes.pleaseSelectARow);
		return false;
	}
	if(url!=null&&url!=""){
		showThickBox(url,irisNotes.viewResearcherInformation);	
	}
}

function popPsnDetail(psnCode){
	tb_show(irisNotes.viewPersonalInformation,ctx+"/psn-manage/childlevel/personinfo?flag=view&psncode=" + psnCode
				+ "&TB_iframe=true&height=460&width=900", false);
};

/** 查看申报书详情 */
function viewAction(posCode, grantCode, subGrantCode) {
	var url = ctx + "/proposal/view-prp";
	url = url + "?posCodeStr="+posCode;
	url = url + "&grantCodeStr="+grantCode;
	url = url + "&subGrantCodeStr="+subGrantCode;
	url = url + "&TB_iframe=true&height=460&width=1080";
	tb_show(irisNotes.viewProjectDetails,url, false);
}

/** 查看申报书附件详情 */
function viewAttachAction(posCode, grantCode, subGrantCode) {
	var url = ctx + "/proposal/view-prp";
	url = url + "?posCodeStr="+posCode;
	url = url + "&grantCodeStr="+grantCode;
	url = url + "&subGrantCodeStr="+subGrantCode;
	url = url + "&viewAttach=true";
	url = url + "&TB_iframe=true&height=460&width=950";
	tb_show(irisNotes.viewProjectDetails,url, false);
}


/**
 * 申请书保存回调 给予实施项目自由扩展
 */
function beforeSave(){
	
}
function afterSave(){
	
	
	
}
function setTotalAmt(){
	
}

var myAction = "";	//用于标识当前操作：提交或暂存
var myArgs = null;
function noLoginRequest(func,args){
	//alert(func);
	myAction = func;
	myArgs = args;
	//var url="${ctx}/main?roleId=${requestScope.userRolData.roleId}";
	var url=ctx+"/main?roleId="+des3RoleId;
	$.ajax({
		url : url,
		type : 'post',
		dataType : 'json',
		data : '',
		success : function (data) {
			ajaxSessionTimeoutHandler(data, url);
		},
		error : function(){ 
	    	//eval(""+func+"()");
			myAction.call(myAction,myArgs);
			return false;
		}
	});
}


function ajaxSessionTimeoutHandler(data, url){
	var ajaxTimeOutFlag=data['ajaxSessionTimeOut'];
	if(ajaxTimeOutFlag!=null && typeof ajaxTimeOutFlag!="undefined" && ajaxTimeOutFlag=='yes'){
            alert("系统超时，请重新登录！");
            tb_show("请登录", ctx + "/index-login-window?f_page=logindlg&targetUrl="+encodeURIComponent(url)+"&TB_iframe=true&height=290&width=360", false);
            //return true;
    }
	return false;
}

//登录后调用继续操作
function actionOnAuthSuccess(){
	window.setTimeout("myAction.call(myAction,myArgs)",500);
}

function saveAction () {
	var args  = arguments;
	noLoginRequest(doSaveAction,args);
}
function submitAction () {
	noLoginRequest(doSubmitAction,null);
}


/**
 * 申请书保存方法
 */
function doSaveAction(calback) {
	if("disabled" != $("#bar_btn,#bar_btn02").find("input").attr("disabled")){
		$("#bar_btn,#bar_btn02").find("input").attr("disabled",true);
		// 校验申请代码
		//validateSubject("subject1","subject","");
		//validateSubject("subject2","subject","");
		prcWin.openWin();// 打开遮罩层 提前至此处
		setTotalAmt();//申请金额保存时也需要拆分
		beforeSave();
		var xmlData = prePareXmlData();
		
		var options = {
			beforeSubmit : function() {
				//prcWin.openWin();// 打开遮罩层 //收集数据需要时间 提前至验证通过后
				
			},
			success : function(data) {
				
				if (data == null || data == "") {	//保存失败
					afterSave();
					scmError(irisNotes.saveErrorNote1);
					
				}else if(data.indexOf("<html>")>=0){
					scmError(irisNotes.saveErrorNote3);	//报错：保存失败，请刷新您的页面或者重新登录帐号
					afterSave();
					
				} else {// 无返回值，保存成功
					// 刷新申请书code和版本号
					var obj = eval("(" + data + ")");
					
					if(obj.message=="isSessionError"){
						scmError(irisNotes.saveErrorNote6);	//会话互串，请打开另一个页面登录帐号后再保存申请书
						
					} else if(obj.message=="saveError"){
						scmError(irisNotes.saveErrorNote2);	//您已经退出系统，请打开另一个页面登录帐号后再保存申请书
						
					} else if(obj.message=="sbrSubmit"){
						scmError(irisNotes.saveErrorNote4);
					
					} else if(obj.message=="sbdwSubmit"){
						scmError(irisNotes.saveErrorNote5);
						
					} else if (obj.message=="saveSame") {
						if(calback && calback.length>0 && typeof calback[0] === 'function' )
							calback[0]();
						else
							scmSuccess(irisNotes.saveSuccessNote2);
						
					} else {
						$("#posCode").val(obj.pos_code);
						$("#keyCode").val(obj.keyCode);
						$("#prp_version").text(obj.prp_version);
						
						
						if(calback && calback.length>0 && typeof calback[0] === 'function' )
							calback[0]();
						else
							scmSuccess(irisNotes.saveSuccessNote1);
							
					}
				}
				afterSave();
				prcWin.closeWin();// 关闭遮罩层
				
			},// 表单成功提交后的回调函数
			error : function() {
				scmError(irisNotes.saveErrorNote3);	//保存失败，请刷新您的页面或者重新登录帐号
				afterSave();
				prcWin.closeWin();
				
			},
			url : ctx+"/proposal/save-prp",
			type : "post",// 提交方式 post,get
			complete : function(){
				$("#bar_btn,#bar_btn02").find("input").attr("disabled",false);
			},
			timeout:30000
		// dataType:"json"
		};
		$("#xmlData").val(xmlData);
		$("#mainForm").ajaxSubmit(options);
	}
	
	
}
/**
 * 收集页面XML
 *
 * @param scope：收集的范围
 * 若scope=null，则收集页面所有元素；
 * 若scope="prp"，则只收集name="prp:xx/xxx/xx"的页面元素
 */
function prePareXmlData(scope) {
	var xmlData = "<?xml version='1.0' encoding='UTF-8'?><data>"
			+ prePareXmlDataStand($(document),scope) + "</data>";
	//将&nbsp;转换成空格
	xmlData = xmlData.replace(/&nbsp;/g," "); 
    //将<br>转换成换行符"\r\n"
	xmlData = xmlData.replace(/&lt;br&gt;/g,"\r\n");
	// 节点名称转小写
	xmlData = xmlData.replace(/<([^\?][^<>]*?)?[A-Z][^<>]*?>/g, function(str){
		return str.toLowerCase();
	});	
	// 将转码过的换行符替换回来（打印PDF时使用）
	xmlData = xmlData.replace(/&amp;#xD;&amp;#xA;/g,"&#xD;&#xA;");
	
	return xmlData;
}
function beforeSubmit1(){
	if(confirm('本系统中与资金相关字段的金额单位均为万元，请确认申请书中填写正确')){
		return true;
	}else{
		return false;
	}
}

/**
 * 申请书提交方法
 */
function doSubmitAction() {
	/**
	 * 填写检查未通过
	 */
	if (!check())
		return false;
	if(!beforeSubmit1()){
		return false;
	}
	prcWin.openWin();// 打开遮罩层 提前至此处
	beforeSave();
	var xmlData = prePareXmlData();
	$("#xmlData").val(xmlData);
	var options = {
		beforeSubmit : function() {
			//prcWin.openWin();// 打开遮罩层 //收集数据需要时间 提前至验证通过后
		

		}, // 表单提交前的回调函数
		success : function(data) {
			if (data == null || data == "") {
				scmError(irisNotes.saveErrorNote1);
				
			}else if(data.indexOf("<html>")>=0){
				scmError(irisNotes.saveErrorNote3);
				
			} else{ 
				var obj = eval("(" + data + ")");
				
				if(obj.checkList!=null){
					$("#posCode").val(obj.pos_code);
					$("#prp_version").text(obj.prp_version);
					var list = obj.checkList ;
					for ( var i = 0; i < list.length; i++) {
						irisValaddMsg(list[i]);
					}
					irisValShowMsg($("#wbox1"));
					
				} else if(obj.message=="isSessionError"){
					scmError(irisNotes.saveErrorNote6);	//会话互串，请打开另一个页面登录帐号后再保存申请书
					
				} else if(obj.message=="saveError"){
					scmError(irisNotes.saveErrorNote2);
				} else if (obj.message=="notOrg") {
					scmError(irisNotes.notOrg);
				} else if(obj.message=="sbrSubmit"){
					scmError(irisNotes.saveErrorNote4);
				
				} else if(obj.message=="sbdwSubmit"){
					scmError(irisNotes.saveErrorNote5);
				} else {
					var subGrantCode = $("#subGrantCode").val();
					var grantCode = $("#grantCode").val();
					var menuId = $("#menuId").val();
					var prpType = $("#prpType").val();
					
					showThickBox(ctx + "/proposal/prpsubmitok?grantCode="
							+ grantCode + "&subGrantCode="+subGrantCode+"&menuId=" + menuId + "&prpType=" + prpType
							+ "&TB_iframe=true&height=250&width=500", irisNotes.submitSuccessNote1);
				}
			}
			prcWin.closeWin();// 关闭遮罩层
		},
		error : function() {
			prcWin.closeWin();// 关闭遮罩层
			scmError(irisNotes.submitErrorNote1);
		},
		url : "/egrantweb/proposal/submit", // 请求URL,可覆盖form的action
		type : "post",// 提交方式 post,get
		timeout:120000
	};
	$("#mainForm").ajaxSubmit(options);
}



/**
 * 检查申请书pdf生成状态
 */
function checkPdfStatus() {

	if ($("#pdfStatus").val() == "1") {
		updatePdfNotes();
	}
}

function resetTitle(){
	var prpName = $("#prpName").val();
	try{
		if($.trim(prpName)){
			var ind = parent.$("#TB_ajaxWindowTitle").html().indexOf("(");
			if(ind==-1){
				ind=parent.$("#TB_ajaxWindowTitle").html().length;
			}
			parent.$("#TB_ajaxWindowTitle").html(parent.$("#TB_ajaxWindowTitle").html().substring(0,ind)+"&nbsp;&nbsp;&nbsp;("+prpName+")");
		}
	}catch(e){
		
	}
}

/**
 * 更新申报书状态
 */
function updatePdfNotes() {
	var options = {
		success : function(msg) {
			var data = eval("(" + msg + ")");
			
			$("#pdfStatus").val(data.status);
			if (data.status == "4") {
				$("#pdf_notes").text(irisNotes.pdfStatus2);
				$("#pdf_notes").parent().removeAttr("style");
			} else if (data.status == "3") {

				var a = "<a href=\"" + downloadPath + data.pdffilecode 
				//+ "-"+ "ProposalPDF"
						+ "\" class=\"link_x ico_pdf\">"+irisNotes.pdfStatus3+"</a>";
				$("#pdf_notes").empty();
				$("#pdf_notes").html(a);
				$("#pdf_notes").parent().removeAttr("style");
			} else if (data.status == 1) {
				$("#pdf_notes").text(irisNotes.pdfStatus1);
				$("#pdf_notes")
						.parent()
						.attr(
								"style",
								"background:url(/egrantres/images/loading2.gif) no-repeat;line-height:32px;padding:0 0 0 40px;");
			}
			prcWin.closeWin();
		},// 表单成功提交后的回调函数

		error : function(msg) {
			if(msg.status!="403"){
				$("#pdf_notes").text(irisNotes.pdfStatus2);
				$("#pdf_notes").parent().removeAttr("style");
				prcWin.closeWin();
			}
		},
		url : ctx+"/proposal/checkpdf", // 请求URL,可覆盖form的action
		type : "post"// 提交方式 post,get
	};
	$("#mainForm").ajaxSubmit(options);
}

/**
 * 刷新pdf状态
 * 
 * @param obj
 *            点击的链接
 * @param posCode
 * @param status
 */
function refreshPdfStatus(obj, posCode, status) {
	var tdObj = $(obj).parents("td");
	var tdStr = tdObj.html();

	tdObj.html(irisNotes.pdfGenerationInProgress+"（<img src=\"" + res
			+ "/images/loading2.gif\" style=\"height:15px\"/>）");

	$.ajax({
		url : ctx + "/proposal/checkpdf",
		async : false,
		data : {
			"posCode" : posCode
		},
		dataType : "text",
		type : "post",
		success : function(msg) {
			var data = eval("(" + msg + ")");

			if (data.status == "3") {
				var a = "<a href=\"" + downloadPath + data.pdffilecode
						+ "\" class=\"yase ico_pdf\">";
				if (status !="04" && status!='05' && status!='06')
					a += irisNotes.draft;
				else
					a += irisNotes.official;
				a += "</a>";
				tdObj.html(a);
			} else
				tdObj.html(tdStr);
		},
		error : function(msg) {
			tdObj.html(tdStr);
		}
	});
}

/**
 * 申请书删除方法
 */
function delAction() {
	/**
	 * 填写检查未通过
	 */
	
	var options = {
		beforeSubmit : function() {

		}, // 表单提交前的回调函数
		success : function(msg) {//
		
			if (msg.result == "deleteSucceeded") {
				scmSuccess(irisNotes.deleteSucceeded);
				var posCode = $("#posCode").val();
				var tr = $("#proposal tr[id$='" + posCode + "']");
				tr.remove();
			} else {
				scmError(irisNotes.failedDelete);
			}

		},// 表单成功提交后的回调函数
		error : function() {
			scmError(irisNotes.failedDelete);
		},
		url : "/egrantweb/proposal/delete", // 请求URL,可覆盖form的action
		type : "post" // 提交方式 post,get
	};
	$("#mainForm").ajaxSubmit(options);
}

/**
 * 返回申报列表
 */
function backToList(grantCode, subGrantCode) {
	backFlag = true;
	// var grantCode=$("#menuGrant").val();
	// var menuId=$("#menuId").val();
	if (grantCode == null || grantCode == "")
		window.location.href = ctx + "/proposal/prp-edit-list";
	else {
		window.location.href = ctx + "/proposal/prp-edit-list?grantCode=" + grantCode
				+ "&subGrantCode=" + subGrantCode;
	}
}

		/**
		 * 根据不同申报类别返回至不同的编辑页面  prpType
		 */
		function backToListReWrite(prpType) {
			backFlag = true;
				window.location.href = ctx + "/proposal/prp-edit-list?prp_type="+ prpType;
		}


/**
 * 经费计算
 * 
 * @param idStart
 *            id起始
 * @param idEnd
 *            id结束
 * @param countStr
 *            子项行号，逗号分隔
 * @param totalStr
 *            总计项行号
 */
function countFund(idStart, countStr, totalStr) {

	var indexs = countStr.split(",");
	var count = 0;
	for ( var i = 0; i < indexs.length; i++) {
		var fund = $("#" + idStart + indexs[i]).val();
		if (!$.isNumeric(fund))
			fund = "0";
		count = ((parseFloat(count)*10000 + parseFloat(fund)*10000)/10000).toFixed(4);
	}

	count = formatNumber(count.toString(), 9, 4, 4);// 格式化金额
	$("#" + idStart + totalStr).val(count);
}

/**
 * 整数计算
 * 
 * @param idStart
 *            id起始
 * @param idEnd
 *            id结束
 * @param countStr
 *            子项行号，逗号分隔
 * @param totalStr
 *            总计项行号
 */
function countNum(idStart, countStr, totalStr) {

	var indexs = countStr.split(",");
	var count = 0;
	for ( var i = 0; i < indexs.length; i++) {
		var fund = $("#" + idStart + indexs[i]).val();
		if (!$.isNumeric(fund))
			fund = "0";
		count = count + parseInt(fund,10);
	}

	// count=formatNumber(count.toString(),9,4,4);//格式化金额
	$("#" + idStart + totalStr).val(count);
}

/**
 * 乘法计算
 * 
 * @param obj
 */
function countTotal(obj) {
	var price = obj.parents("td").find("[name$='price']").val();
	var psnnum = obj.parents("td").find("[name$='psnnum']").val();
	var days = obj.parents("td").find("[name$='days']").val();

	if (!$.isNumeric(price) || !$.isNumeric(psnnum) || !$.isNumeric(days)) {
		obj.parents("td").find("[name$='total_invest']").val("");
	} else {
		var count = Math.round(parseFloat(price)*10000 * parseInt(psnnum,10) * parseInt(days,10))/10000;
		count = formatNumber(count.toString(), 9, 4, 4);// 格式化金额
		obj.parents("td").find("[name$='total_invest']").val(count);
	}
	countFund('total_invest_', '6,7,8,9,10', '11');
}

/**
 * 两个数字相乘
 * 
 * @param obj1
 * @param obj2Name
 * @param resultObjName
 */
function countTotal2(obj1, obj2Name, resultObjName) {
	var val1 = obj1.val();
	var val2 = obj1.parents("tr").find("[name$='" + obj2Name + "']").val();
	var resultObj = obj1.parents("tr").find("[name$='" + resultObjName + "']");

	if (!$.isNumeric(val1) || !$.isNumeric(val2)) {
		resultObj.val("");
	} else {
		var count =  Math.round(parseFloat(val1)*10000 * parseFloat(val2)*10000)/(10000*10000);
		count = formatNumber(count.toString(), 9, 4, 4);// 格式化金额
		resultObj.val(count);
	}
}

/** 申报文件操作 * */
/**
 * 申报专用上传下载
 * 
 */

/**
 * 正文
 * 上传控件绑定方法
 * 
 * @param tableId
 *            动态表格Id
 * @param type
 * 			  限制上传文件类型，用逗号分割多个文件类型
 * @param width
 * 			  控件所占宽度
 * @param validateJson
 * 			  验证文件类型限制大小，单位为K，json格式字符串：如"{'jpg':'500'}"
 * @param pageValidateJson
 * 			  验证文件类型限制页数大小，json格式字符串：如"{'pdf':'50'}"
 */
function fileInit(tableId, type, width, validateJson, pageValidateJson) {
	var imgres="";
	
	if(locale=="en_US"){
	    imgres="Upload_EN.gif";
	    
	}else{
		imgres="Upload_2.gif";
		
	}
	$("#" + tableId).find(":file").filestyle({
		image : res + "/images/"+imgres,
		imageheight : 25,
		imagewidth : 60,
		width : width
	});
	$("#" + tableId).find(":file").css("margin-left",'0px');
	$("#" + tableId).find(":file").each(function(i) {
		$(this).change(function() {
			var fileType=$(this).attr("fileType");
			if(typeof(fileType)=="undefined"){
				showFileName($(this), tableId, type, validateJson, pageValidateJson);
			}else{
				showFileName($(this), tableId, fileType, validateJson, pageValidateJson);
			}
			
		});
	});
}


/**
 * 附件
 * 上传控件绑定方法
 * 
 * @param tableId
 *            动态表格Id
 * @param type
 * 			  限制上传文件类型，用逗号分割多个文件类型
 * @param width
 * 			  控件所占宽度
 * @param max
 *            允许上传的最大个数
 * @param validateJson
 * 			  验证文件类型限制大小，单位为K，json格式字符串：如"{'jpg':'500'}"
 */
function fileInitAttach(tableId, type, width, max, validateJson, pageValidateJson) {
	var imgres="";
	var imgwidth="";
	if(locale=="en_US"){
	    imgres="add_en.gif";
	    imgwidth="102";
	}else{
		imgres="add_cn.jpg";
		imgwidth="90";
	}
	$("#" + tableId + " :file").filestyle({
		image : res + "/images/"+imgres,
		imageheight : 26,
		imagewidth : imgwidth,
		width : width
	});
	$("#" + tableId + " :file").each(function(i) {
		$(this).change(function() {
			var fileType=$(this).attr("fileType");
			if(typeof(fileType)=="undefined"){
				showFileName($(this), tableId, type, max, validateJson, pageValidateJson);
			}else{
				showFileName($(this), tableId, fileType,max, validateJson, pageValidateJson);
			}
		});
	});
}

/** 上传下载公用接口* */
function ajaxFileUpload(type, tblId, filetype, max, validateJson, pageValidateJson) {
	irisAjaxFileUpload(type, tblId, filetype, max, validateJson);
}

/**
 * 带输入框的文件上传
 * 
 * @param type
 *            附件类型
 * @param funName
 *            回调函数名
 * @param tableId
 *            相应的表id
 * @param max
 *            允许上传的最大个数
* @param validateJson
 */
function irisAjaxFileUpload(type, tableId, fileType, max, validateJson, pageValidateJson) {

	if (type == null || type == '') {
		scmWarn(messageTip.pleaseEnterTypeOfAttachment);
		return;
	}

	prcWin.openWin();// 打开遮罩层
	$.ajaxFileUpload({
		url : ctx + '/file/ajax-fileupload',// 请求地址
		secureuri : false,// 一般设置为false
		fileElementId : 'filedata',// 文件的id属性
		limitSize : '10',// 允许上传的文件大小,单位M
		allowType : '',// 允许上传的文件类型.
		data : {
			'type' : type,
			'validateJson':validateJson,
			'pageValidateJson':pageValidateJson
		},
		tableId : tableId,// tableID
		dataType : 'json',// 返回值类型
		success : function(data, status) // 服务器成功响应处理函数
		{
			if (data.result == 'error') {
				scmWarn(data.msg);
			} else {
				uploadSuccess(data, tableId, fileType);
				// 回调方法
				// eval(funName+"(data,tableId)");
			}
			$("#" + tableId + " :file").each(function(i) {
				$(this).change(function() {
					var fileType1=$(this).attr("fileType");
					if(typeof(fileType1)=="undefined"){
						showFileName($(this), tableId, fileType, max, validateJson, pageValidateJson);
					}else{
						showFileName($(this), tableId, fileType1, max, validateJson, pageValidateJson);
					}
				});
			});
		},
		error : function(data, status, e)// 服务器响应失败处理函数
		{
			$('.file').each(function(j) {
				$(this).attr('value', '');
			});
			$("#" + tableId + " :file").each(function(i) {
				$(this).change(function() {
					var fileType1=$(this).attr("fileType");
					if(typeof(fileType1)=="undefined"){
						showFileName($(this), tableId, fileType, max, validateJson, pageValidateJson);
					}else{
						showFileName($(this), tableId, fileType1, max, validateJson, pageValidateJson);
					}
				});
			});
			scmError(status);
		}/*,
		complete:function()
		{
			prcWin.closeWin();// 关闭遮罩层
		}*/
	});
	prcWin.closeWin();// 关闭遮罩层

}
/**
 * 弹出上传窗口
 * 
 * @param tableId
 */
function uploadAttachs(tableId) {
	$("#" + tableId + " :file").click();
}

/**
 * @param obj
 * @param tableId
 * @param type
 * @param max
 *            允许上传的最大个数
 * @param validateJson
 */
function showFileName(obj, tableId, type, max, validateJson) {
	var fileTblId=null;// 文件列表的表格id
	if (tableId == "attachAdd") {
		fileTblId="prp_attachs";
	} else if (tableId == "proattachAdd") {
		fileTblId="product_attachs";
	}
	
	var filedata = obj.val();
	if (filedata == '')
		return;
	else if(max!=null && $.isNumeric(max) && fileTblId!=null && $("#"+fileTblId+" tr:gt(1)").length>=max){
		var label="";
		if($("#"+fileTblId).attr("label")!=null)
			label=$("#"+fileTblId).attr("label");
		
		scmWarn(label+messageTip.canNotUploadMoreThan+max+messageTip.files1);
		return;
	} else {
		var fileName = filedata.substring(filedata.replace(/\\/g, '/')
				.lastIndexOf('/') + 1);
		var end = fileName.substring(fileName.lastIndexOf(".") + 1,
				fileName.length).toUpperCase();
		if (type.indexOf(end) < 0) {
			scmWarn(messageTip.pleaseUpload + type + messageTip.files2, "100px");
			return;
		}
	}

	$("#" + tableId + " .file").val(fileName);
	ajaxFileUpload("prpattach", tableId, type, max, validateJson);
}

/**
 * 上传成功返回函数
 * 
 * @param data
 * @param tableId
 */
function uploadSuccess(data, tableId, filetype) {
	// var files=$("#"+tableId).find(":file");//获得table中file类型的输入框数量
	if (data.length == 0)
		scmWarn(messageTip.selectFileForUploading);
	if (tableId == "prpContent_upload" || tableId == "prpProduct_text"||tableId=="gg_prpProduct_text") {// 如果说返回值只有一个并且file类型输入框也只有一个

		$("#" + tableId).find("input[type='hidden'][name$='file_code']").val(
				data[0].fileCode);// 直接赋予隐藏域值

		var fileHref = $("#" + tableId).find("a[id*='downLoadFile']");// 获得链接
		// var filePath=$("#filePath").val();
		fileHref.attr("href", downloadPath + data[0].fileCode);// 直接赋予链接值并显示出来

		var fileDate = $("#" + tableId).find("span[name*='file_date']");// 上传时间对象
		var nowTime = showLocale(new Date());
		fileDate.text(nowTime);

		var fileName = $("#" + tableId).find("span[name$='file_name']");// 获得文件名
		var start = data[0].fileName
				.substring(0, data[0].fileName.indexOf("."));// 获得前缀
		var end = data[0].fileName.substring(data[0].fileName.indexOf(".") + 1,
				data[0].fileName.length);// 获得后缀
		var image = "";
		$("#contentImage").remove();
		if (end.toLowerCase() == "doc" || end.toLowerCase() == "docx") {
			image = "<img id=\"contentImage\" src=\"" + res
					+ "/images/ico_word.gif\">";
		} else if (end.toLowerCase() == "pdf") {
			image = "<img id=\"contentImage\" src=\"" + res
					+ "/images/ico_pdf.gif\">";
		} else if (end.toLowerCase() == "wps") {
			image = "<img id=\"contentImage\" src=\"" + res
					+ "/images/ico_wps.gif\">";
		}
		fileName.text(start+"."+end);
		fileName.before(image);
		var uploadsuccess = $("#" + tableId).find("tr[id^='uploadsuccess']");// 获得隐藏行
		uploadsuccess.show();

	} else {// 附件上传返回，存在多个的情况

		// var
		// flag_uploads=$("#"+tableId).find("[name='flag_upload']").filter("[value='1']");
		for ( var i = 0; i < data.length; i++) {
			var tr = null;
			if (tableId == "attachAdd") {
				addNewRow('prp_attachs');
				loadAttachType('prp_attachs', 'attach_type', '');// 加载附件类型
				tr = $("#prp_attachs tr:last-child");
			}

			else if (tableId == "proattachAdd") {
				addNewRow('product_attachs');
				tr = $("#product_attachs tr:last-child");
			}

			if (tr != null) {
				var fileCodeObj = tr.find("input[name$='file_code']");
				fileCodeObj.val(data[i].fileCode);
				var fileNameObj = tr.find("input[name$='entity_file_name']");
				fileNameObj.val(data[i].fileName);

				var ahref = "<a href=" + downloadPath + data[i].fileCode
						+ " ><span class=\"color_blue\" >"+irisNotes.downLoadNote+"("+data[i].fileName+")</span></a>";
				tr.find("td:last").empty();// 首先清空最后一个td中的内容
				tr.find("td:last").append(ahref);// 重新加上链接
				// 设置上传时间
				var nowTime = showLocale(new Date());
				tr.find("span[name$='file_date']").text(nowTime);
			}

		}
	}

}

function loadAttachType(tableId,key,value){
	 var selectid=$("#"+tableId+" tr:last-child select").attr("id");

	 selectid=changeString(selectid);
	 loadPrpAttachType(selectid,key,value);
}
// 把选中的select框值储存值到隐藏域
function myinitControlValue(objId) {

	objId = changeString(objId);
	var name = "";
	var obj = $("#" + objId);
	if (obj.is("select")) {
		name = changeString(obj.attr("id"));
		obj.parent().children("input[id$='" + name + "_value'][type='hidden']")
				.val($("#" + objId).find("option:selected").val());
		$("#" + objId).parent().children("input[id$='" + name + "_name']").val(
				$("#" + objId).find("option:selected").text());
	}
}

// 重载附件类型
function loadPrpAttachType(selectid, key, value) {
	var grant_code = $("input[name='proposal/grant_code']").val();
	var sub_grant_code = $("input[name='proposal/sub_grant_code']").val();
	var help_grant_code = $("input[name='proposal/help_grant_code']").val();
	
	 var params = {
		"key" : key,
		"cacheable" : "false",
		"locale":locale,
		"sqlParamVal":"{'grant_code':'"+grant_code+"','sub_grant_code':'"+sub_grant_code+"','help_grant_code':'"+help_grant_code+"'}"
	};
	loadAjaxSelect(selectid, ctx + "/cpt/ajaxload-select", params, value);
}

/**
 * 删除申报书正文
 */
function delContent(tableId) {
	if (confirm(messageTip.sureToDeleteApplicationBody)) {
		$("#" + tableId).find("span[name$='file_name']").html("");// 清空文件名
		$("#" + tableId).find("input[type='hidden'][name$='file_code']")
				.val("");// 清空文件code
		$("#uploadsuccess").hide();
	}
}
/** 申报文件操作 * */

/**
 * 合作国比较
 */
function compareCountry() {
	for ( var i = 1; i < 5; i++) {
		var countryi = $("#country" + i + "_value").val();
		for ( var j = i + 1; j < 6; j++) {
			var countryj = $("#country" + j + "_value").val();
			if (countryi != "" && countryj != "" && countryi == countryj)
				irisValaddMsg("项目信息的"
						+ $("#country" + i + "_value").attr("label") + "和"
						+ $("#country" + j + "_value").attr("label")
						+ "不能选择同一个国家");
		}
	}
}

/**
 * 单位比较
 */
function compareOrg() {
	var org1 = $("#org").val();
	var org2 = $("#org_2").val();
	var org3 = $("#org_3").val();

	if (org1 == "" && org2 == "" && org3 == "")
		return;
	else if ((org1 != "" && org1 == org2) || (org1 != "" && org1 == org3)
			|| (org2 != "" && org2 == org3))
		irisValaddMsg("单位信息-->依托单位、合作研究单位1和合作研究单位2三者不能两两相同");
}

/**
 * 允许修改依托单位
 */
function allowChangeOrg() {

	$("#org").removeAttr("disabled");

}


/**
 * 重载部门（智能过滤下拉框方法）
 * 
 * @param orgId
 * @param departId
 */
function initDepartForComplete(orgId) {
	var orgCode = $("#" + orgId).parents("td").find(
			"input[name$='" + orgId + "_code']").val();
	if (orgCode != null && orgCode != "") {
		irisAutocomplete("depart", ctx + "/cpt/ajaxload-complete", {
			"locale" : locale,
			"key" : "depratment",
			"cacheable" : "false",
			"sqlParamVal" : "{'new_org_code':" + orgCode + "}"
		}, {
			"onClick" : "changeDepart",
			"checkable" : "false",
			"topCheckbox" : "true"
		});

		$("#depart_img").unbind("click").removeAttr("onclick").click(
				function() {
					var id = "depart";
					var params = {
						"locale" : locale,
						"key" : "depratment",
						"cacheable" : "false",
						"sqlParamVal" : "{new_org_code:" + orgCode + "}"
					};
					$.ajax({
						url : '/egrantweb/cpt/ajaxload-tree',
						type : 'post',
						dataType : 'json',
						data : params,
						success : function(data) {

							loadTree(id, data, {
								"onClick" : "changeDepart",
								"checkable" : "false",
								"topCheckbox" : "true"
							}, "该单位下没有院系所");
						}
					});
				});
	}
}

/**
 * 修改依托单位
 * 
 * @param orgId
 * @param data
 * @param needInitDepart
 *            是否需要重新输入院系所
 */
function changeOrg(orgId, data, needInitDepart) {
	var tableObj = $("#" + orgId).parents("table");
	var orgCode = data.id;
	tableObj.find("input[name$='" + orgId + "_code']").val(orgCode);

	if (needInitDepart == null || needInitDepart) {
		// 清空院系所相关信息
		clearDepartInfo(false);

		// 初始化院系所智能过滤功能
		initDepartForComplete(orgId);
	}

	if (tableObj.find("[name$='/jjglname']").length == 0)
		return;

	var infoArray = [ "jjglname", "email", "tel_work", "zh_cn_address",
			"post_code", "http", "fax", "pno" ];

	$.ajax({
		url : ctx + "/proposal/getorginfo",
		async : false,
		data : {
			"orgCode" : orgCode
		},
		dataType : "json",
		type : "post",
		success : function(data) {
			if (data == null || data == "") {
				for ( var i = 0; i < infoArray.length; i++) {
					var obj = tableObj.find("[name$='/" + infoArray[i] + "']");
					if (obj.is("span"))
						obj.html("");
					else
						obj.val("");
				}
			} else {
				for ( var i = 0; i < infoArray.length; i++) {
					var value = eval("data." + infoArray[i]);
					if (value == null)
						value = "";

					var obj = tableObj.find("[name$='/" + infoArray[i] + "']");
					if (obj.is("span"))
						obj.html(value);
					else
						obj.val(value);
				}
			}
		},
		error : function(data) {
			scmError("操作失败！" + data);
		}
	});
}

/**
 * 修改院系所
 * 
 * @param departId
 * @param data
 */
function changeDepart(departId, data) {
	var tableObj = $("#" + departId).parents("table");
	var departCode = data.id;
	tableObj.find("input[name$='" + departId + "_code']").val(departCode);

	if (tableObj.find("[name$='/depart_contact']").length == 0)
		return;

	var infoArray = [ "depart_contact", "depart_email", "depart_tel" ];

	$.ajax({
		url : ctx + "/proposal/getdepartinfo",
		async : false,
		data : {
			"departCode" : departCode
		},
		dataType : "json",
		type : "post",
		success : function(data) {
			if (data == null || data == "") {
				for ( var i = 0; i < infoArray.length; i++) {
					var obj = tableObj.find("[name$='/" + infoArray[i] + "']");
					if (obj.is("span"))
						obj.html("");
					else
						obj.val("");
				}
			} else {
				for ( var i = 0; i < infoArray.length; i++) {
					var value = eval("data." + infoArray[i]);
					if (value == null)
						value = "";

					var obj = tableObj.find("[name$='/" + infoArray[i] + "']");
					if (obj.is("span"))
						obj.html(value);
					else
						obj.val(value);
				}
			}
		},
		error : function(data) {
			scmError("操作失败！" + data);
		}
	});
}

/**
 * 清空单位相关信息
 * 
 * @param orgId
 */
function clearOrgInfo(orgId) {
	var tableObj = $("#" + orgId).parents("table");
	var infoArray = [ "jjglname", "email", "tel_work", "zh_cn_address",
			"post_code", "http", "fax", "pno" ];

	tableObj.find("[name$='" + orgId + "_code']").val("");
	for ( var i = 0; i < infoArray.length; i++) {
		var obj = tableObj.find("[name$='/" + infoArray[i] + "']");
		if (obj.is("span"))
			obj.html("");
		else
			obj.val("");
	}

	clearDepartInfo(false);
}

/**
 * 清空院系所的所有相关信息
 * 
 * @param needName
 *            是否需要保留输入的名称
 */
function clearDepartInfo(needName) {
	var tableObj = $("#depart").parents("table");
	if (needName == null)
		needName = false;

	var str;
	if (needName)
		str = "[name*='depart_']:not([name$='depart_name'])";
	else
		str = "[name*='depart_']";

	tableObj.find(str).each(function() {
		if ($(this).is("span"))
			$(this).html("");
		else
			$(this).val("");
	});
}


/**
 * 打开添加实验室页面
 */
function showLabDialog(type) {
	showThickBox(ctx + "/proposal/edit/dialog/addlaboratory?type="+type+"&TB_iframe=true&height=460&width=900", type);
}

/**
 * 重写智能过滤下拉框方法,处理选择单位下部门的情况
 * 
 * @param inputId
 * @param url
 * @param params
 * @param jsParams
 */
function irisAutocompleteDept(inputId, param) {

	// var params=$("#"+inputId+"_params").val();
	// alert(params);
	var option = {
		url : ctx + "/cpt/ajaxload-complete",
		minChars : 1,// 最少输入几个字节
		// width: 280,//下拉框的宽度,默认为输入框的宽度
		highlight : function(value, term) {
			return value;
		},
		max : 10,// 最大显示多个选项
		cacheLength : 0,
		dataType : 'JSON',
		scroll : false,// 超过规定的height时是否有滚动条
		scrollHeight : 220,// 下拉框的高度
		extraParams : param,// 特别的参数.json格式的key-value.默认有个q参数，值为输入框的值，作为条件查询
		formatItem : function(row, i, max) {
			return row.name;
		},
		formatMatch : function(row, i, max) {
			return row.name;
		},
		formatResult : function(row) {
			return row.name;
		},
		parse : function(data) {// 转化数据
			var parsed = [];
			for ( var i = 0; i < data.length; i++) {
				var item = data[i];
				parsed.push({
					data : item,
					value : item.id.toString(),
					result : item.name
				});
			}
			var item = {
				id : '-1',
				name : '手动添加'
			};
			parsed.push({
				data : item,
				value : item.id.toString(),
				result : item.name
			});
			return parsed;
		},
		result : function(event, data, formatted) {// 返回result
			$("#" + hiddenId).val(data.id);
			if (jsParams.onClick != "" && jsParams.onClick != "undefined") {

				eval(jsParams.onClick);
			}

		}
	};
	$("#" + inputId).autocomplete(option);
}

/**
 * 锁定申报人行的按钮
 */
function setSubmitPsn() {
	if($("#zh_persons :radio:checked").length==0){
		scmWarn('请选择一行!');
		return false;
	}
	var tr = $("#zh_persons :radio:checked").parents("tr");
	if (tr.get(0).rowIndex - 1 == 1) {// 如果选择的是申报人
		$("#zh_psnPrev").attr("disabled", "true").css("color", "#808080");
		$("#zh_psnNext").attr("disabled", "true").css("color", "#808080");
		// $("#zh_psnEdit").attr("disabled","true").css("color","#808080");
		$("#zh_psnDel").attr("disabled", "true").css("color", "#808080");

	} else if (tr.get(0).rowIndex - 1 == 2) {// 如果是申报书的下一行
		$("#zh_psnPrev").attr("disabled", "true").css("color", "#808080");
		$("#zh_psnNext").removeAttr("disabled").css("color", "#003366");
		$("#zh_psnDel").removeAttr("disabled").css("color", "#003366");
	} else {
		$("#zh_psnPrev").removeAttr("disabled").css("color", "#003366");
		$("#zh_psnNext").removeAttr("disabled").css("color", "#003366");
		// $("#zh_psnEdit").removeAttr("disabled").css("color","#003366");
		$("#zh_psnDel").removeAttr("disabled").css("color", "#003366");
	}

}

/**
 * 设置单位资助金额是否必填
 */
function setFundRequired(objId) {
	var parentTable = $("#" + objId).parents("table");

	if ($("#" + objId).val() != null && $("#" + objId).val() != "") {
		parentTable.find("input[id$='_" + objId + "']").addClass("required");
		parentTable.find("span[id$='_" + objId + "']").show();
	} else {
		parentTable.find("input[id$='_" + objId + "']").removeClass("required");
		parentTable.find("span[id$='_" + objId + "']").hide();
	}
}

/**
 * 获取合作协议的值，并通过该值操作显示
 */
function selectAgreementValue(objId) {
	var obj = $("#" + objId);
	var value = obj.val();
	var needPrj = value.substring(value.length - 1, value.length);
	var code = value.substring(0, value.length - 1);
	if (needPrj == null || needPrj == "" || needPrj == "0") {// 不需要在研项目
		$("#" + objId + "_title").hide();
		obj.parents("tr").find("input[name$='prj_name']").removeClass(
				"required");
		obj.parents("tr").find("input[name$='prj_name']").hide();
		obj.parents("td").find("input[name$='needprj']").val("0");
	} else {// 需要在研项目
		$("#" + objId + "_title").show();
		obj.parents("tr").find("input[name$='prj_name']").addClass("required");
		obj.parents("tr").find("input[name$='prj_name']").show();
		obj.parents("td").find("input[name$='needprj']").val("1");
	}

	var name = obj.text();
	obj.parents("td").find("input[name$='" + objId + "_value']").val(code);
	obj.parents("td").find("input[name$='" + objId + "_name']").val(name);

}

/**
 * 查看在研项目列表
 */
function showPrjList() {
	parent.tb_remove();
	showThickBox(ctx
			+ "/proposal/searchprj?TB_iframe=true&height=240&width=650",
			"在研项目列表");
}


/**
 * 打开tooltips窗口
 * 
 * @param objId
 */
function showTips(objId){
	var note=$("#note_"+objId).val();
	// alert(note);
	
	if(note==null||note==""||note=="undefined")
		return false;
	var config={
			title:"<div class=\"Explanation_Box\"><div class=\"Cutting_head\"></div><div class=\"Explanation_contant\">"+note+"</div></div>"
	};
	$("#tips_"+objId).tooltip(config).show();
}

// 查看申请书的附件信息
function prpAttachView(posCode, grantCode) {
	tb_show("查看申请书的附件信息", ctx + "/proposal/view/prp-attach-view?posCode="
			+ posCode + "&grantCode=" + grantCode
			+ "&TB_iframe=true&height=460&width=900", false);
}

/**
 * 外青类申报书加中文标题
 */
function setZhTitle(obj) {
	$("#zh_title").val(obj.val());
}

/**
 * 弹出框查询申请人在研项目或者以往研发过项目的负责人
 * 
 * @param prjCode
 * @param grantCode
 */
function addNewPerson(prjCode, grantCode) {
	tb_show("在研项目参与人列表", ctx + "/proposal/sel-his-psn?prjCode=" + prjCode
			+ "&grantCode=" + grantCode
			+ "&TB_iframe=true&height=460&width=900", false);
}

var preCollectXmlData="";
var allCollectXmlScope="";
var preCollectFlag="0";
/** XML收集新方法，稳定后搬出去* */
/**
 * @param scope：收集的范围
 * 若scope=null，则收集页面所有元素；
 * 若scope="prp"，则只收集name="prp:xx/xxx/xx"的页面元素
 */
function prePareXmlDataStand(obj, scope,trimflag) {

	if(!preCollectXmlData || preCollectXmlData=="")
	{
		var xmlData = "<data></data>";
		var xmlObj = $(xmlData);
	}
	else{
		var xmlObj = preCollectXmlData;
	}
	//简化开始
	if(!scope || scope==""){
		if(!allCollectXmlScope || allCollectXmlScope=="")
		{
			try{
				var scopeObj = obj.find(":allXmlItem");
			}catch(e){
				var scopeObj = obj.find(":text,:hidden,:password,span,textarea").not("[name*='|']").filter("[name*='/']");
			}
		}
		else{
			var scopeObj = obj.find(":"+allCollectXmlScope);
		}
	}else{
		try{
			var scopeObj = obj.find(":"+scope+"Item");
		}catch(e){
			var scopeObj = obj.find(":text,:hidden,:password,span,textarea").not("[name*='|']").filter("[name*='/']").filter("[name^='"+$.trim(scope)+":']")
		}
	}
	scopeObj.each(function() {
		prePareXmlDataSub(xmlObj, $(this),trimflag);
	});
	//简化结束
	if(!preCollectFlag || preCollectFlag=="0")
	return xmlObj.html();
	else
		return xmlObj;
}
//add by lyj 20140420
$.extend($.expr[':'], {
	allXmlItem: function(el) {
		var name =$(el).attr("name");
		if(!name)return false;
		if(name.indexOf("/")>-1 && name.indexOf("|")==-1)
			return true;
		else
			return false;
	},
	proposalNoOrgItem: function(el) {
		var name =$(el).attr("name");
		if(!name)return false;
		if(name.indexOf("/")>-1 && name.indexOf("|")==-1&& name.indexOf("organization:")==-1)
			return true;
		else
			return false;
	},
	organizationItem: function(el) {
		var name =$(el).attr("name");
		if(!name)return false;
		if(name.indexOf("/")>-1 && name.indexOf("|")==-1 && name.indexOf("organization:")==0)
			return true;
		else
			return false;
	}
}); 


function prePareXmlDataSub(xmlObj, oTag,trimFlag) {
	
	var name = oTag.attr("name").toLowerCase().split(":");
	var isTextArea = false; //该变量 针对保存申请书时,textarea中不能保存换行符的问题
	if(oTag[0].tagName == 'TEXTAREA'){
	   	isTextArea = true;
	}
	var strNames;
	if(name.length==1)
		strNames= name[0].split("/");
	else
		strNames= name[1].split("/");

	var isXml = oTag.attr("label");
	
	var xmlValue = getTagValue(oTag);
	if (isXml == "xml"&& (xmlValue==null||xmlValue=="")){//排除收集的xml为空的情况
		return;
	}
	
	for ( var i = 0; i < strNames.length; i++) {
		var strName = strNames[i];

		var objName = "";
		var index = 0;
		var attrName = "";
		if (strName.indexOf("[") >= 0 && strName.indexOf("]") >= 0) {// 多重节点
			index = strName.substring(strName.indexOf("[") + 1, strName
					.indexOf("]"));
			if ($.isNumeric(index))
				index = parseInt(index,10);
			// alert(xmlObj.html());
			//alert(index);
			objName = strName.substring(0, strName.indexOf("["));
		}

		if (strName.indexOf("@") > 0) {
			attrName = strName.substring(strName.indexOf("@") + 1);
		}

		if (strName.indexOf("@") == -1 && strName.indexOf("[") == -1)
			objName = strName;
		var childs = xmlObj.children(objName);
		var childCnt = xmlObj.children(objName).length;
		if (childCnt == index + 1) {// 如果该节点存在
			xmlObj = childs.eq(index);
		} else {
			var  cnt=index + 1 - childCnt;
			for(var ii =0;ii<cnt;ii++){
				var newXmlObjStr = $("<" + objName + ">" + "</" + objName + ">");
				xmlObj.append(newXmlObjStr);
			}
			xmlObj = (xmlObj.children(objName)).eq(index);
		}

		if (attrName != "") {
			xmlValue = xmlscc(xmlValue);
			xmlObj.attr(attrName, xmlValue);
		}

		if (attrName == "" && i == (strNames.length - 1)) {
			if (isXml == "xml"){
				xmlValue = xmlValue.replace(/<!\[CDATA\[(.*?)\]\]>/ig, "$1");
				xmlValue = xmlValue.replace(/&nbsp;/g,"&amp;nbsp;");
				xmlObj.empty();				
				xmlObj.append($(xmlValue));
			}
			else{
					xmlObj.text(xmlValue);
			}
		}
	}

	xmlData = xmlObj.text();

}

/**
 * 查看项目审核意见
 * 
 * @param posCode
 *            已加密
 */
function auditCommentView(posCode) {
	tb_show(irisNotes.viewCommentDetails, ctx + "/proposal/view/audit-comment-view?posCode="
			+ posCode + "&TB_iframe=true&height=350&width=720", false);
}

/**
 * 将申请书xml中的研究领域xml字符串设置到每个人的对应隐藏域
 * 
 * @param tblId
 *            人员表格id
 * @param xmlId
 *            保存申请书xml的元素id
 * @param psnNodeName
 *            申请书xml中人员节点id，如中方人员为"zh_person"，境外人员为"en_person"
 */
function setPsnResearch(tblId, xmlId, psnNodeName){
	var xmlStr = $.trim($("#"+xmlId).val());
	if(xmlStr==null || xmlStr=="")
		return false;
	
	var regex=null;
	if(psnNodeName=="zh_person")
		regex = /<zh_person[^s](.\n?)+?<\/zh_person>/g;
	else if(psnNodeName=="en_person")
		regex = /<en_person[^s](.\n?)+?<\/en_person>/g;
	
	var person= xmlStr.match(regex);
	if(person!=null){
		
		$("#"+tblId+" tr:gt(1)").each(function(i,obj){
			if(person[i]!=null){
				var researches = person[i].match(/<researches(.\n?)+?<\/researches>/);
				if(researches!=null){
					var str = researches[0].replace(/<researches.*?>|<\/researches>/g,"");
					$(obj).find("[name$='/researches']").val(str);
				}
			}
			
		});
	}
}

/**
 * 申请书中申请代码的输入控制
 * 
 * @param obj
 */
function subjectControl(obj) 
{
	if(obj.value == null)
		obj.value="";
	var oldValue = obj.value;
	
	var forbid = function() {
		var keyCode = getEvent().keyCode;
		var regex = /^[\da-zA-Z]*$/;
		
		if(keyCode==8 && !obj.value.match(regex)){	// 按删除键并且不是由字母和数字组成则清空
			obj.value="";
			oldValue="";
		}
		else if(keyCode!=13 && keyCode!=38 && keyCode!=40){// 除了按上、下、回车，输入后如果文本框中不是字母和数字则保持原值
			if(!obj.value.match(regex))
				obj.value=oldValue;
		}
	};
	
	obj.onblur = function() {
		var regex = /^[\da-zA-Z]+(\..+)?$/;
		if(obj.value!="" && !obj.value.match(regex))
			obj.value=oldValue;
	};
	
	obj.onkeypress = function() {
		forbid();
	};
	obj.onkeyup = function() {
		forbid();
	};
}
function checkBz(obj){
	var val = '未标注';
	if(obj.attr("checked")){
		val = '已标注';
	}
	$(obj).next().first().val(val);
}

/** ===========成果导入begin=============* */

function openProductWin(poscode, productdivid){
	poscode = isBlankOrNull(poscode)?$("#posCode").val():poscode;
	if (isBlankOrNull(poscode)) {
		scmWarn("请保存项目名称后再收录成果！", null, 2000);
		return false;
	}
	$("#"+productdivid).attr('href',ctx+'/proposal/openproductdialog?poscode='+poscode+'&TB_iframe=true&height=120&width=360');
	$("#"+productdivid).attr('title', "进入基金委科研在线/成果在线");
	$("#"+productdivid).click();
	parent.$("#TB_closeWindowButton").hide();
}
function doSyn(poscode, noteid, importid, hrefid){
	poscode = isBlankOrNull(poscode)?$("#posCode").val():poscode;
	if (!isBlankOrNull(poscode)) {
		$.ajax({
			url : 'agreesyn',
			type : 'post',
			async : false,
			data : {
				"poscode" : poscode
			},
			dataType : 'text',
			success : function(data) {
				var newhref = "<a href=\""+ data+ "\" class=\"link_x\" target=\"_blank\">这里</a>";
				$("#"+noteid).hide();
				$("#"+importid).show();
				$("#"+hrefid).replaceWith(newhref);
			},
			error : function(data) {
				scmWarn("成果保存失败，"+data, null, 2000);
			}
		});
	}
}
function savesynproduct(poscode) {
	if (!isBlankOrNull(poscode)) {
		$.ajax({
			url : 'savesynproduct',
			type : 'post',
			async : false,
			data : {
				"poscode" : poscode
			},
			dataType : 'json',
			success : function(data) {
				if (data != undefined) {
					parent.$("#zh_products").val(data.zh_products);
					parent.$("#myproductxml").val(data.myproductxml);
					scmSuccess(data.msg, null, 2000);
				}
			},
			error : function(data) {
				scmWarn("成果保存失败，请重试！", null, 2000);
			}
		});
	} 
	parent.tb_remove2();
}
/**
 * 录入成果
 * 
 */
function isBlankOrNull(str) {
	if (str == null || str.length == 0) {
		return true;
	}
	return false;
}

/*******************************************************************************
 * 显示/隐藏成果导入方法
 * 
 * @param showid
 * @param hideid
 *//*
	 * function initImportType(sourceinfo, poscode, hrefid, radioname,
	 * productid1, productid2){ if(''!=sourceinfo&&''!=poscode){
	 * importproduct(poscode, hrefid); }else if(''==poscode){
	 * $(":radio[@name='"+radioname+"']").each(function(i,obj){ obj.checked =
	 * false; }); $("#"+productid1).hide(); $("#"+productid2).hide(); } }
	 * 
	 * function chooseImportType(showid, hideid) { $("#" + showid).show(); $("#" +
	 * hideid).hide(); }
	 *//***************************************************************************
	 * 切换成果导入方法
	 * 
	 * @param showid
	 * @param hideid
	 * @param oldselectedid
	 * @param producttabid
	 * @param msg
	 *//*
	 * function switchImportType(showid, hideid, oldselectedid, producttabid,
	 * msgtype) { var msg1 = "使用方法一将会删除使用方法二收录的成果，您确定吗？"; var msg2 =
	 * "使用方法二将会删除使用方法一收录的成果，您确定吗？"; var msg = msgtype == 1 ? msg1 : msg2; var
	 * poscode = $("#posCode").val(); if (isBlankOrNull(poscode)) {
	 * scmWarn("请保存项目信息后再收录成果！", null, 2000); return false; } else if
	 * (confirm(msg)) { $("#zh_products").attr('label', msgtype == 1 ? 'xml' :
	 * ''); $("#zh_products").val(''); $("#myproductxml").val('');
	 * $("#"+producttabid).find("tr").each(function(i) { if (i > 1 &&
	 * $(this).find("td").find(":radio").size()>0) { $(this).remove(); } });
	 * mydelContent(producttabid); chooseImportType(showid, hideid); } else {
	 * $("#" + oldselectedid).attr("checked", true); } }
	 *//***************************************************************************
	 * 空方法，在具体页面重构
	 * 
	 * @param tabid
	 *//*
	 * function mydelContent(tabid){
	 *  }
	 *//***************************************************************************
	 * 进入导入成果页面
	 * 
	 * @param poscode
	 * @param urladdrid
	 *//*
	 * function importproduct(poscode, urladdrid) { if ($("#"+urladdrid).length <=
	 * 0) { return; } poscode = isBlankOrNull(poscode) ? $("#posCode").val() :
	 * poscode; if (!isBlankOrNull(poscode)) { prcWin.openWin(); $.ajax({ url :
	 * ctx+'/proposal/get-guid', type : 'post', data : { "poscode" : poscode },
	 * dataType : 'json', success : function(data) { if (data != undefined) {
	 * $("#zh_products").attr('label', 'xml'); var newhrefstr = "<a href=\""+
	 * data.url+ "\" id=\""+urladdrid+"\" class=\"link_x\"
	 * onclick=\"javascript:editproductwin();\" target=\"_blank\">这里</a>";
	 * $("#"+urladdrid).replaceWith(newhrefstr); } } }); prcWin.closeWin(); }
	 * else { //scmWarn("请保存项目信息后再收录成果！", null, 2000); } } function
	 * editproductwin() { tb_show("编辑成果",
	 * "#TB_inline?height=120&width=180&inlineId=contentDlg",false);
	 * parent.$("#TB_closeWindowButton").hide();//隐藏默认关闭按钮 }
	 *//***************************************************************************
	 * 收集同步过来的成果
	 * 
	 * @param poscode
	 *//*
	 * function savesynproduct(poscode) { poscode = isBlankOrNull(poscode) ?
	 * $("#posCode").val() : poscode; if (!isBlankOrNull(poscode)) { $.ajax({
	 * url : 'savesynproduct', type : 'post', async : false, data : { "poscode" :
	 * poscode }, dataType : 'json', success : function(data) { if (data !=
	 * undefined) { $("#zh_products").val(data.zh_products);
	 * $("#myproductxml").val(data.myproductxml); } }, error:function(data){
	 * scmWarn("成果保存失败，请重试！", null, 2000); } }); } else {
	 * scmWarn("请保存项目信息后再收录成果！", null, 2000); } tb_remove(); }
	 */
/*******************************************************************************
 * 查看已收录成果信息
 * 
 * @param poscode
 */
function productview(poscode) {
	poscode = isBlankOrNull(poscode) ? $("#posCode").val() : poscode;
	if (!isBlankOrNull(poscode)||'-1'==$("#offprpCode").val()) {
		tb_show("查看已收录成果信息", ctx+"/proposal/prpproduct_view?poscode="
				+ poscode + "&TB_iframe=true&height=460&width=900", false);
	} else {
		scmWarn("您还未收录成果！", null, 2000);
	}
}
/** ===========成果导入end==============* */


/** 研究领域专有操作 start* */

/**
 * 限制研究领域行数
 * 
 * @param tableId
 *            表格id
 * @param max
 * @param message
 * @returns {Boolean}
 */
function checkResearchLimit(tableId,max,message)
{
	var maxLinNum=$("#"+tableId).children().children().length-2;
	
	if(maxLinNum>=max) {
		scmWarn(message);
		return false;
	}
	return true;
}

/**
 * 添加研究领域
 * 
 * @param tableId
 * @param isUsable
 *            是否可用
 */
function addResearch(tableId, isUsable){
	if(checkResearchLimit(tableId,5,messageTip.researchAreaLessThan5)){
		var table=$("#"+tableId);
		var trs = table.children().children();
		
		var index=trs.length-1;;// 获得当前的序号
		var addHtml=trs[1].innerHTML;// 获得隐藏行的html,查找第二行
		addHtml=addHtml.replace(/\[index\]/g,index);
		addHtml=addHtml.replace(/\[0\]/g,"["+(index-1)+"]");
		addHtml=addHtml.replace(/\|/g,"/");// 替换html中节点/的代替符"|"
		table.append("<tr>"+addHtml+"</tr>");// 将html增加到最后
		
		if(isUsable){
			$("#subject"+index).focus(function(){
				subjectControl(this);
			});
			irisAutocomplete("subject"+index,"/egrantweb/cpt/ajaxload-complete",{"locale":"zh_CN","key":"research_subject","cacheable":"true","sqlParamVal":""},{"onClick":"initSubjectTreeValue","checkable":"false","topCheckbox":"true"});
			
			ScholarAutoDisc.loadAutoDisc("div_zh_keyword_"+index, null, 50);
			ScholarAutoDisc.loadAutoDisc("div_en_keyword_"+index, null, 50);
		}
		$("#subject"+index).attr("disabled",false);
		$("#subject"+index).attr("readonly","readonly");
		try{top.resizeFrame();}catch(e){};
	}
}

/**
 * 删除研究领域
 * 
 * @param tableId
 * @param message
 * @param nummin
 * @param messagenum
 * @returns {Boolean}
 */
function deleteResearch(tableId,message,nummin,messagenum){
	var $delObj = $("#"+tableId+" :radio:checked");
	if($delObj.length == 0){
		scmWarn(messageTip.researchAreaSelectProjectFirst);
		return false;
	}
	
	if(!confirm(messageTip.deleteTip+message+"？"))
		  return false;
	  var tr=$delObj.parents("tr");
	  if(nummin==null)
		  nummin=0;
	 
	  if(tr.length==0)
		  tr=$("#"+tableId).children().children().filter(":last");
	  else if(tr.length>1)
		  tr=tr.first();
	  
	  if(tr.get(0).rowIndex-1==nummin){
		  scmWarn(messageTip.researchAreaNoContentDeleted);
		  return false;
	  }
	  tr.remove();
	  refreshResearchRow(tableId);
	  return true;
}


/**
 * 上移研究领域行
 * 
 * @param tblId
 * @returns {Boolean}
 */
function moveResearchPrev(tblId){
	
	if($("#"+tblId+" :radio:checked").length==0){
		scmWarn(messageTip.researchAreaSelectProjectFirst);
		return false;
	}
	if($("#"+tblId).children().children().length<=2)
		return false;
	var trChecked=$("#"+tblId+" :radio:checked").parents("tr").first();// 取得被选中的行
	var trPrev=trChecked.prev();// 取得上一行
	var index=trChecked.get(0).rowIndex;// 获得行号
	if(index<=2){// 如果是第一行
		scmWarn(messageTip.researchAreaAlreadyOneRow);
		return false;
	}
	trPrev.before(trChecked);
	trChecked.find(":radio").attr("checked",'true');
	refreshResearchRow(tblId);

}

/**
 * 下移研究领域行
 * 
 * @param tblId
 * @returns {Boolean}
 */
function moveResearchNext(tblId){
	if($("#"+tblId+" :radio:checked").length==0){
		scmWarn(messageTip.researchAreaSelectProjectFirst);
		return false;
	}
	if($("#"+tblId).children().children().length<=2){
		return false;
	}
	
	var trChecked=$("#"+tblId+" :radio:checked").parents("tr").first();// 取得被选中的行
	var trNext=trChecked.next();
	var index=trChecked.get(0).rowIndex;// 获得行号
	if(index==$("#"+tblId).children().children().length-1){// 如果是第一行
		scmWarn(messageTip.researchAreaAlreadyLastRow);
		return false;
	}
	trNext.after(trChecked);
	trChecked.find(":radio").attr("checked","true");
	refreshResearchRow(tblId);
}

/**
 * 重新计算研究领域行号
 * 
 * @param tblId
 */
function refreshResearchRow(tblId){
	var trs = $("#"+tblId).children().children(":gt(1)");
	trs.each(function(i){
		var index=i+1;// 获得行数
		$(this).find("[name$='seq_no']:not([name*='keyword'])").html(index);
		
		// 替换相应的id和name参数的index
		$(this).find("input,span,textarea,div,img").each(function(j,obj){
			var id=$(this).attr("id");
			var name=$(this).attr("name");
			
			if(id!=null&&id!=""){
				id=id.replace(/\d+/g, index);
				$(this).attr("id",id);
			}
			if(name!=null&&name!=""){
				name=name.replace(/\d+/g, index-1);
				$(this).attr("name",name);
			}
		});
		$(this).find("#subject"+index+"_img").unbind("click").removeAttr("onclick").click(function(){
			show_subject("subject"+index,{"locale":"zh_CN","key":"research_subject","cacheable":"true","sqlParamVal":""});
		}); 
		ScholarAutoDisc.reloadAutoDisc("div_zh_keyword_"+index);
		ScholarAutoDisc.reloadAutoDisc("div_en_keyword_"+index);
	});
}

/**
 * 将xml字符串转成jquery对象
 * 
 * @param str
 */
function xmlStrToObj(str){
	var xml;
	
	if($.browser.msie & parseInt($.browser.version) < 9){
		xml= new ActiveXObject("Microsoft.XMLDOM");
		xml.async = false;
		xml.loadXML(str);
		xml = $(xml);
	} else {
		str = str.replace(/<!\[CDATA\[(.*?)\]\]>/ig, "$1");
		xml= $(str);
	}
	return xml;
}


/**
 * 初始化研究领域中熟悉领域树和关键词的值
 * 
 * @param trObj
 *            数据来源
 * @param tblId
 *            操作的表格id
 * @param isUsable
 *            是否可用
 */
function initResearch(trObj,tblId,isUsable){
	var researches = trObj.find("[name$='researches']").val();
	if(researches==null)
		researches="";
	var researchesObj = xmlStrToObj("<researches>"+researches+"</researches>");
	
	if(researchesObj.find("research").length==0){
		return false;
	}
	
	var index = 0;
	researchesObj.find("research").each(function(i,obj){
		var researchObj = $(obj);
		
		var subject_code = researchObj.find("subject_code").text();
		var subject_name = researchObj.find("subject_name").text();
		if(subject_code!=null && subject_code!=""){
			addResearch(tblId,isUsable);
			
			index++;
			$("#subject"+index).val(subject_code+"."+subject_name);
			$("#subject"+index+"_name").val(subject_name);
			$("#subject"+index+"_code").val(subject_code);
			
			var zhStr = "";
			var enStr = "";
			researchObj.find("zh_keywords keyword").each(function(){
				zhStr += ",{value:\""+$(this).text()+"\"}";
			});
			researchObj.find("en_keywords keyword").each(function(){
				enStr += ",{value:\""+$(this).text()+"\"}";
			});
			if(zhStr!="")
				zhStr = zhStr.substring(1);
			if(enStr!="")
				enStr = enStr.substring(1);
			
			ScholarAutoDisc.init("div_zh_keyword_"+index, eval("["+zhStr+"]"));
			ScholarAutoDisc.init("div_en_keyword_"+index, eval("["+enStr+"]"));
		}
	});
	
}

/**
 * 生成研究领域中熟悉领域和关键词的值
 * 
 * @param tblId
 *            操作的表格id
 */
function saveResearch(tblId){
	var research_keyword = "";
	
	$("#"+tblId).children().children().each(function(){
			
		var i=$(this).get(0).rowIndex;// 获得行数
		if(i>1){// 如果有行 显示时display行不计入类，故只减1
			i=i-1;
			
			if($("#subject"+i).val()==""){
				$(this).find("#subject"+i+"_code,#subject"+i+"_name").val("");
			}
			
			var zhArr = ScholarAutoDisc.get_disckeys("div_zh_keyword_"+i);
			var enArr = ScholarAutoDisc.get_disckeys("div_en_keyword_"+i);
			
			var zh_keywords = "";
			var en_keywords = "";
			$.each(zhArr, function(j,obj){
				zh_keywords += "<input type=\"hidden\" name=\"researches/research["+(i-1)+"]/zh_keywords/keyword["+j+"]@seq_no\" value=\""+(j+1)+"\"/>";
				zh_keywords += "<input type=\"hidden\" name=\"researches/research["+(i-1)+"]/zh_keywords/keyword["+j+"]\" value=\""+obj.value+"\"/>";
				research_keyword += "，" + obj.value;
			});
			$.each(enArr, function(j,obj){
				en_keywords += "<input type=\"hidden\" name=\"researches/research["+(i-1)+"]/en_keywords/keyword["+j+"]@seq_no\" value=\""+(j+1)+"\"/>";
				en_keywords += "<input type=\"hidden\" name=\"researches/research["+(i-1)+"]/en_keywords/keyword["+j+"]\" value=\""+obj.value+"\"/>";
			});
			
			$("#span_zh_keyword_"+i).html(zh_keywords);
			$("#span_en_keyword_"+i).html(en_keywords);
		}
		
	});
	if(research_keyword!="")
		research_keyword = research_keyword.substring(1);
	$("#research_keyword").val(research_keyword);
}

/** 研究领域专有操作 end* */


/**
 * 压力测试专用方法
 */
function enterTest(){
	var href=ctx + "/proposal/enter-prp";
	$("#mainForm").attr("action",href);
	$("#mainForm").submit();
}
/**
 * 申请书文档下载转码
 * 
 * @param grantCode
 */
function downloadTopicOutline(grantCode){
	   
	   $.ajax( {
			url : ctx+'/prpdocument/get-file-name',
			type : 'post',
			dataType:'json',
			data : {'grantCode':grantCode,
					'fileType':'sampleWord'},
			success : function(data) {
				
				if(data!=null && data.fileName!= ""){
					
					location.href=res+data.fileName;	
				}
			}
		});
	   
}

/**
 * 清空文本框及隐藏域的值
 * @param id
 */
function clearValue(id){
	$("#"+id + ",[name$='/"+id+"_code']" + ",[name$='/"+id+"_name']").val("");
}

/**
 * 将xml中的相关大节点设置到对应的隐藏域
 * 
 * @param xmlId
 *            保存整个xml的元素id
 */
function setXmlStr(xmlId){
	var xmlStr = $.trim($("#"+xmlId).val());
	if(xmlStr==null || xmlStr=="")
		return false;
	
	var str = xmlStr.match(/<proposal>([\s\S]+?)<\/proposal>/);//申请书信息
	if(str!=null){
		$("#proposal_xml").val(str[1]);
	}
	
	str = xmlStr.match(/<organizations>([\s\S]+?)<\/organizations>/);//单位信息
	if(str!=null){
		$("#organizations_xml").val(str[1]);
	}
	
	str = xmlStr.match(/<zh_persons>([\s\S]+?)<\/zh_persons>/);//人员信息
	if(str!=null){
		$("#zh_persons_xml").val(str[1]);
	}
	
	str = xmlStr.match(/<en_persons>([\s\S]+?)<\/en_persons>/);//境外人员信息
	if(str!=null){
		$("#en_persons_xml").val(str[1]);
	}
	
	str = xmlStr.match(/<prp_content>([\s\S]+?)<\/prp_content>/);//申请书正文
	if(str!=null){
		$("#prp_content_xml").val(str[1]);
	}
}



/*
 * 金额转换大小写
 * */

function lw(str,str1){
var num=Math.round(parseFloat($("#"+str1).val())*10000 * parseFloat(10000)*10000)/(10000*10000);
var num1 = chineseNumber(num);
$("#"+str).val(num1);
}


function chineseNumber(num)
{
if (isNaN(num) || num > Math.pow(10, 12)) return "";
if(num==0){return "零";} 

var cn = "零壹贰叁肆伍陆柒捌玖";
var unit = new Array("拾佰千", "分角");
var unit1= new Array("万亿", "");
var numArray = num.toString().split(".");
var start = new Array(numArray[0].length-1, 2);

function toChinese(num, index)
{
var num = num.replace(/\d/g, function ($1)
{
return cn.charAt($1)+unit[index].charAt(start--%4 ? start%4 : -1);
});
return num;
}

for (var i=0; i<numArray.length; i++)
{
var tmp = "";
for (var j=0; j*4<numArray[i].length; j++)
{
var strIndex = numArray[i].length-(j+1)*4;
var str = numArray[i].substring(strIndex, strIndex+4);
var start = i ? 2 : str.length-1;
var tmp1 = toChinese(str, i);
tmp1 = tmp1.replace(/(零.)+/g, "零").replace(/零+$/, "");
tmp1 = tmp1.replace(/^壹拾/, "拾");
tmp = (tmp1+unit1[i].charAt(j-1)) + tmp;
}
numArray[i] = tmp;
}

numArray[1] = numArray[1] ? numArray[1] : "";
numArray[0] = numArray[0] ? numArray[0]+"元" : numArray[0], numArray[1] = numArray[1].replace(/^零+/, "");
numArray[1] = numArray[1].match(/分/) ? numArray[1] : numArray[1];
return numArray[0]+numArray[1];
}


function format_numberSpan(id, n){
	
	var award_amt= $("#" + id).text();
	
	if(isNaN(award_amt)||award_amt==""){
		$("#" + id).text("");
	}
	else{
	var count = ((parseFloat(award_amt)*10000)/10000).toFixed(4);
	count = formatNumberAuto(count.toString(), 9, 4, 2);// 格式化金额
	$("#" + id).text(count);
	}
}
function format_numberText(id, n){
	
	var award_amt= $("#" + id).val();
	// alert(award_amt);
	if(isNaN(award_amt)||award_amt==""){
		$("#" + id).val("");
	}else{
	var count = ((parseFloat(award_amt)*10000)/10000).toFixed(4);
	count = formatNumberAuto(count.toString(), 9, 4, 2);// 格式化金额
	$("#" + id).val(count);
	}
}

/**
 * 数字显示函数，适用于可输入四位小数或二位少数
 * number:值
 * maxIntLength:整数部分最大长度,
 * maxDecimalLength:小数部分最大长度,
 * displayDecimal:小数部分显示出的长度
 */
function formatNumberAuto(number,maxIntLength,maxDecimalLength,displayDecimal) {
	if(number.indexOf(".")>=0){//如果是输入值中带有小数点则检查小数部分长度是否达到了最低显示的长度，如果没有则补0
		var integral="";
		var decimal="";
		if (number.indexOf(".")==0&&number.length>1){
			integral="0";
			decimal=number.substring(1,number.length);
		}else if (number.indexOf(".")>0){
			integral=number.substring(0,number.indexOf("."));
			decimal=number.substring(number.indexOf(".")+1,number.length);
		}
		var f=decimal.substring(displayDecimal,maxDecimalLength);
	    //小数四位，如果后两位为00，就去掉
		if(f=="00"){
			decimal=decimal.substring(0, displayDecimal);
		}else{
			decimal=decimal.substring(0, maxDecimalLength);
		}
		number=integral+"."+decimal;
	}else if (number!=""&&displayDecimal>0){//输入的是整数则补上小数部分，全部为0
		number=number+".";
		for (var i=0;i<displayDecimal;i++){
			number=number+"0";
		}
	}
	return number;
};

//获取数据检查未通过数据
function getCheckNumberData(){
	$.ajax({
		url: "${ctx}/prpapprove/openprpapprovedialog",				
		async:true,
		type:'post',
		data:{
			"flag": "ajaxCheckData",
			"keyCode": $("#posCode").val(),
			"status" : "03"
		},
		dataType: "json",
		success : function(data) {
		 	var objs = eval(data);
		 	var keyCode;
		 	if(objs && objs.length>0){
		 		prcWin.openWin();// 打开遮罩层 提前至此
		 		numCheckMsg = '';
		 		$.each(objs,function(n,obj) {   
        			numCheckMsg += "<p>";  
        			numCheckMsg += (n+1)+"、"+obj.chkMsg;
        			numCheckMsg += "</p>";
                    });  
	        	showThickBox(ctx + "/proposal/toReturnMsg?TB_iframe=true&height=225&width=680", "退回修改意见");
	        	$("#TB_closeWindowButton").hide();
	        	prcWin.closeWin();// 关闭遮罩层
		 	}
		},
		error : function() {
			scmError("操作失败,请联系系统管理员");
		}
	});
}

$(function(){
	if($("#nc_proposal_status").val()=="10")
		getCheckNumberData();
});

/**
 * 申请书保存回调 给予实施项目自由扩展
 */
function beforeSave(){
	$("textarea").each(function(){
		var val=$(this).val();
		//alert(val.indexOf(" ")+"=="+val.lastIndexOf(" "));
		val = val.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\n/g,"<br/>").replace(/\s/g,"&nbsp;").replace(/"/g,"&quot;");
		//alert("input[nam*="+$(this).attr('name')+"_hidden]");
	
		$("input[name='"+$(this).attr('name')+"_hidden']").val(val);
			
		//$(this).html(val);
	});
}

function demoSave(){
	beforeSave();
	var xmlData = prePareXmlData();
	
	var options = {
			url : "/formdesign/formdemo/do-save",
			type : 'post',
			dataType : 'json',
			data : {
				'keyCode' :  $('#key_code').val() ,
				'xmlData' : xmlData 
			},
			success : function (data) {
				if ("success" == data.flag){
					 $('#key_code').val(data.keyCode) ; 
					 alert("操作成功！") ;
				 }else{
					 alert("后台错误！") ;
				 }
			},
			error : function(){ 
				alert("后台错误！") ;
			}
		} ;
	$.ajax(options) ;
}