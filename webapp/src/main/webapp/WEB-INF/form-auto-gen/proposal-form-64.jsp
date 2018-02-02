<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/common/common.jsp" %>
<c:set var='xml'  value='${xmlData }' />
<x:parse var='xmlData' xml='${xml }' scope='request' />
<!-- css -->
 	 <link href="/resfd/css/bootstrap/css/bootstrap.css?2023" rel="stylesheet" type="text/css" />
 	 <link href="/resfd/app-css/wbox.css" rel="stylesheet" type="text/css" />
	 <link href="/resfd/app-css/datepick.css" rel="stylesheet" type="text/css" />
	 <link href="/resfd/app-css/datepick.css" rel="stylesheet" type="text/css" />
	 <!--  public -->
	 <link href="/resfd/app-css/public/public.css" rel="stylesheet" type="text/css" />
<!-- js -->	 
	<script type="text/javascript" charset="utf-8" src="/resfd/js/jquery-1.7.2.min.js"></script>
	<script type="text/javascript" charset="utf-8" src="/resfd/app-js/message.tips-zh_CN.js"></script>
	<script type="text/javascript" charset="utf-8" src="/resfd/app-js/wbox.js"></script>
	<script type="text/javascript" charset="utf-8" src="/resfd/app-js/jquery.validate.js"></script>
	<script type="text/javascript" charset="utf-8" src="/resfd/app-js/public.js"></script>
	<script type="text/javascript" charset="utf-8" src="/resfd/app-js/irisvalidator.js"></script>
	<script type="text/javascript" charset="utf-8" src="/resfd/app-js/irisPrpPrepare.js"></script>
	<script type="text/javascript" charset="utf-8" src="/resfd/app-js/jquery.datepick.js"></script>
	<script type="text/javascript" charset="utf-8" src="/resfd/app-js/jquery.datepick-zh_CN.js"></script>
	<script type="text/javascript" charset="utf-8" src="/resfd/app-js/viewForm.js"></script>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	 <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	 <title>表单</title>
</head>
<body  class="bdbg"> 
	
	<div align="center" style="margin-top: 20px;">
		<input type="button" class="btn btn-navbar" onclick="check();" id="check-btn" value="填写检查" />
		   
			<input type="button"  class="btn btn-navbar" onclick="demoSave();" value="保存" />
		
	</div>
	
	<input type="hidden" name="template_id" id="template_id" value="64" />
	 
	  <div  id="content" class="w990">	 
	  	<div class="w990 po_r"> 
				<div class="report_tx" style="border: 1px #e4e4e4 solid;background: #fff;padding: 0px 30px 30px 30px;margin-top: 5px;">	
					<!-- <h2><span class="cb"></span><span>项目信息</span></h2>
			 	  <div class="txt"> -->
		  	  <h3>项目基本信息</h3><p><input type="hidden" id="key_code" value="${keyCode}"><input type="hidden" id="grant_code"></p><table id="basicInfo" border="0" cellspacing="0" cellpadding="0" class="ret_lst1 mt10" data-sort="sortDisabled"><tbody><tr class="firstRow"><td width="91" valign="top" style="word-break: break-all;"><span class="note">*</span>项目名称</td><td valign="top" style="word-break: break-all;" rowspan="1" colspan="3" width="576"><input type="text"    label="项目名称" name="proposal/zh_title" id="zh_title" class="w470 input_css  required" value="<x:out select='$xmlData/data/proposal/zh_title' />" maxlength="200" style=""  /></td></tr><tr><td width="91" valign="top" style="word-break: break-all;"><span class="note">*</span>实施地点</td><td valign="top" rowspan="1" colspan="3" width="576"><div style="display:inline;" id="dyn_radio_div_project_address_value_key"><label style="display:inline;"   ><input type="radio" onclick="javascript: publicjs.radioClick(this) ;"  id="project_address_value_id_01" name="proposal/project_address_value" label="南山区" value="01" style="" key="project_address_value_key"  />&nbsp;南山区</label>&nbsp;&nbsp;&nbsp;<label style="display:inline;"   ><input type="radio" onclick="javascript: publicjs.radioClick(this) ;"  id="project_address_value_id_02" name="proposal/project_address_value" label="福田区" value="02" style="" key="project_address_value_key"  />&nbsp;福田区</label>&nbsp;&nbsp;&nbsp;<label style="display:inline;"   ><input type="radio" onclick="javascript: publicjs.radioClick(this) ;"  id="project_address_value_id_03" name="proposal/project_address_value" label="宝安区" value="03" style="" key="project_address_value_key"  />&nbsp;宝安区</label>&nbsp;&nbsp;&nbsp;<label style="display:inline;"   ><input type="radio" onclick="javascript: publicjs.radioClick(this) ;"  id="project_address_value_id_04" name="proposal/project_address_value" label="罗湖区" value="04" style="" key="project_address_value_key"  />&nbsp;罗湖区</label>&nbsp;&nbsp;&nbsp;<label style="display:inline;"   ><input type="radio" onclick="javascript: publicjs.radioClick(this) ;"  id="project_address_value_id_05" name="proposal/project_address_value" label="龙华区" value="05" style="" key="project_address_value_key"  />&nbsp;龙华区</label>&nbsp;&nbsp;&nbsp;<label style="display:inline;"   ><input type="radio" onclick="javascript: publicjs.radioClick(this) ;"  id="project_address_value_id_06" name="proposal/project_address_value" label="盐田区" value="06" style="" key="project_address_value_key"  />&nbsp;盐田区</label>&nbsp;&nbsp;&nbsp;<input type="hidden"  id="project_address_value_id_value" name="proposal/project_address_value_value" class="required" label="项目实施地点" value="<x:out select='$xmlData/data/proposal/project_address_value_value' />" /><input type="hidden"  id="project_address_value_id_name" name="proposal/project_address_value_name" value="<x:out select='$xmlData/data/proposal/project_address_value_name' />" /></div></td></tr><tr><td valign="top" colspan="1" rowspan="1" width="91" style="word-break: break-all;">实施单位</td><td valign="top" colspan="3" rowspan="1" width="576"><span  label="单位名称" name="organization/org_name" id="" class=""style="" ><x:out select='$xmlData/data/organization/org_name' /> </span></td></tr><tr><td valign="top" colspan="1" rowspan="1" width="91"><span class="note">*</span>所属产业<br></td><td valign="top" colspan="3" rowspan="1" width="576"><div style="display:inline;" id="dyn_checkbox_div_industry_key"><label style="display:inline;"   ><input type="checkbox" onclick="javascript: publicjs.checkboxClick(this) ;"  id="industry_01" name="proposal/industry" label="物联网和云计算" value="01" style="" key="industry_key"  />&nbsp;物联网和云计算</label>&nbsp;&nbsp;&nbsp;<label style="display:inline;"   ><input type="checkbox" onclick="javascript: publicjs.checkboxClick(this) ;"  id="industry_02" name="proposal/industry" label="节能环保产业" value="02" style="" key="industry_key"  />&nbsp;节能环保产业</label>&nbsp;&nbsp;&nbsp;<label style="display:inline;"   ><input type="checkbox" onclick="javascript: publicjs.checkboxClick(this) ;"  id="industry_03" name="proposal/industry" label="软件和服务外包" value="03" style="" key="industry_key"  />&nbsp;软件和服务外包</label>&nbsp;&nbsp;&nbsp;<label style="display:inline;"   ><input type="checkbox" onclick="javascript: publicjs.checkboxClick(this) ;"  id="industry_04" name="proposal/industry" label="生物产业" value="04" style="" key="industry_key"  />&nbsp;生物产业</label>&nbsp;&nbsp;&nbsp;<label style="display:inline;"   ><input type="checkbox" onclick="javascript: publicjs.checkboxClick(this) ;"  id="industry_05" name="proposal/industry" label="新能源和新能源汽车" value="05" style="" key="industry_key"  />&nbsp;新能源和新能源汽车</label>&nbsp;&nbsp;&nbsp;<label style="display:inline;"   ><input type="checkbox" onclick="javascript: publicjs.checkboxClick(this) ;"  id="industry_06" name="proposal/industry" label="装备制造业" value="06" style="" key="industry_key"  />&nbsp;装备制造业</label>&nbsp;&nbsp;&nbsp;<input type="hidden"  id="industry_value" name="proposal/industry_value" class="required" label="项目所属产业" value="<x:out select='$xmlData/data/proposal/industry_value' />" /><input type="hidden"  id="industry_name" name="proposal/industry_name" value="<x:out select='$xmlData/data/proposal/industry_name' />" /></div></td></tr><tr><td valign="top" colspan="1" rowspan="1" width="91" style="word-break: break-all;"><p><span class="note">*</span>申请资金用途</p><p>和使用计划</p><p>简要说明</p><p>（限500字）</p></td><td valign="top" colspan="3" rowspan="1" width="576"><textarea  label="申请资金用途和使用计划简要说明" name="proposal/fund_use_instruction" id="fund_use_instruction" class="w470 h82 maxlength:500"maxlength="500" style="" ><x:out select='$xmlData/data/proposal/fund_use_instruction' /></textarea><input type="hidden"     name="proposal/fund_use_instruction_hidden" id="fund_use_instruction_hidden" value="<x:out select='$xmlData/data/proposal/fund_use_instruction_hidden' />" /></td></tr><tr><td valign="top" colspan="1" rowspan="1" style="word-break: break-all;" width="91"><span class="note">*</span>开始日期</td><td valign="top" colspan="1" rowspan="1" width="214"><script type="text/javascript">
	$(document).ready(function(){	
	$('#start_date').datepick({showOnFocus: false,onSelect: startDateonSelected, showTrigger: '<img align="absmiddle" style="padding-left:3px; cursor:pointer;vertical-align:middle;" src="/resfd/app-images/ico_date.gif" />'});
	});
</script>
<input id="start_date" name="proposal/start_date"  value="<x:out select='$xmlData/data/proposal/start_date' />" onchange="startDateonChange();" class="required date dateCompare:end_date" label="开始日期" maxlength='20' style="vertical-align:middle;" /></td><td rowspan="1" valign="top" align="null" width="159" style="word-break: break-all;"><span class="note">*</span>结束日期</td><td rowspan="1" valign="top" align="null" width="159" style="word-break: break-all;"><script type="text/javascript">
	$(document).ready(function(){	
	$('#end_date').datepick({showOnFocus: false,onSelect: null, showTrigger: '<img align="absmiddle" style="padding-left:3px; cursor:pointer;vertical-align:middle;" src="/resfd/app-images/ico_date.gif" />'});
	});
</script>
<input id="end_date" name="proposal/end_date"  value="<x:out select='$xmlData/data/proposal/end_date' />" onchange="" class="required date" label="结束日期" maxlength='20' style="vertical-align:middle;" /></td></tr><tr><td rowspan="1" valign="top" align="null" colspan="1" style="word-break: break-all;" width="91">资金级次</td><td rowspan="1" valign="top" align="null" colspan="3" width="55"><div style="display:inline;" id="dyn_select_div_fund_level_key"><select   id="fund_level" name="proposal/fund_level" onchange="javascript: publicjs.selectChange(this) ;;" style="" key="fund_level_key"  ><option   selected = 'selected'  value="01" label="人才引育类" >人才引育类</option><option   value="02" label="科技创新类" >科技创新类</option><option   value="03" label="产业投资类" >产业投资类</option></select><input type="hidden"  id="fund_level_value" name="proposal/fund_level_value" class="required" label="资金级次" value="<x:out select='$xmlData/data/proposal/fund_level_value' />" /><input type="hidden"  id="fund_level_name" name="proposal/fund_level_name" value="<x:out select='$xmlData/data/proposal/fund_level_name' />" /></div></td></tr></tbody></table><h3>单位信息</h3><table id="orgInfo" border="0" cellspacing="0" cellpadding="0" class="ret_lst1 mt10"><tbody><tr class="firstRow"><td width="90" valign="top" style="word-break: break-all;"><span class="note">*</span>单位名称</td><td valign="top" style="word-break: break-all;" rowspan="1" colspan="3" width="605"><input type="text"    label="单位名称" name="proposal/org_name" id="proposal_org_name" class="w470 input_css  required" value="<x:out select='$xmlData/data/proposal/org_name' />" maxlength="300" style="width:95%;"  /></td></tr><tr><td width="90" valign="top" style="word-break: break-all;"><span class="note">*</span>单位地址</td><td valign="top" style="word-break: break-all;" rowspan="1" colspan="3" width="605"><input type="text"    label="单位地址" name="proposal/org_addr" id="proposal_org_addr" class="w470 input_css  required" value="<x:out select='$xmlData/data/proposal/org_addr' />" maxlength="300" style="width:95%;"  /></td></tr><tr><td valign="top" colspan="1" rowspan="1" style="word-break: break-all;" width="90"><span class="note">*</span>联系人</td><td valign="top" colspan="1" rowspan="1" width="263"><input type="text"    label="联系人" name="proposal/org_lxr_name" id="proposal_org_lxr_name" class="w470 input_css  required" value="<x:out select='$xmlData/data/proposal/org_lxr_name' />" maxlength="20" style="width:95%;"  /></td><td valign="top" colspan="1" rowspan="1" style="word-break: break-all;" width="78"><span class="note">*</span>联系电话</td><td valign="top" colspan="1" rowspan="1" width="222"><input type="text"    label="联系电话" name="proposal/contact_tel" id="proposal_contact_tel" class="w470 input_css  required" value="<x:out select='$xmlData/data/proposal/contact_tel' />" maxlength="15" style="width:88%;"  /></td></tr></tbody></table><p><br></p><p><br></p>
					<!-- </div> -->
				</div>
			</div>
		</div>
	
	<script id="script" type="text/javascript" type="text/javascript" >
	 var locale = "zh_CN" ;
		// 脚本定义
    function startDateonSelected(){ alert('我是startDateonSelected！'); } function startDateonChange(){ alert('startDateonChange！'); }
	</script>
	<script id="initScript" type="text/javascript">
			$(document).ready(function(){
			  alert('我是初始化函数！');   
			});
	</script>
	<script id="checkScript" type="text/javascript">
		function check(){
	   validate($("#basicInfo"),"基本信息");
validate($("#orgInfo"),"单位信息");  
	    // 
	   if(!valResult()){
			irisValShowMsg($("#wbox1"));
			return false;
		  }
		 showBox($("#wbox1"), "300px", "200px", "检查通过","1:所有检查全部合格");
		 return true;
		}
	</script>
</body>
</html><script type="text/javascript"> $(document).ready(function(){var formOpFlag = '${formOpFlag}' ; if (formOpFlag){ viewFormObj.processAllObj() ; } }); </script>