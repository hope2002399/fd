<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/common/common.jsp" %>
<c:set var='xml'  value='${xmlData }' />
<x:parse var='xmlData' xml='${xml }' scope='request' />
<!-- css -->
 	 <link href="/resfd/css/bootstrap/css/bootstrap.css?2023" rel="stylesheet" type="text/css" />
 	 <link href="/resfd/app-css/wbox.css" rel="stylesheet" type="text/css" />
	 <link href="/resfd/app-css/datepick.css" rel="stylesheet" type="text/css" />
	 <!--  public -->
	 <link href="${res_fd }/app-css/public/public.css" rel="stylesheet" type="text/css" />
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
<body class="bdbg"> 
	
	<div align="center" style="margin-top: 20px;">
		  <input type="button" class="btn btn-navbar" onclick="check();" id="check-btn" value="填写检查" />
			<input type="button"  class="btn btn-navbar" onclick="demoSave();" value="保存" />
	</div>
	<input type="hidden" name="template_id" id="template_id" value="51" />
	 
<div  id="content" class="w990">	 
	<div class="w990 po_r"> 
		<div class="report_tx txt" style="border: 1px #e4e4e4 solid;background: #fff;padding: 0px 30px 30px 30px;margin-top: 5px;">
		  <p>
		   <h3>基本信息 </h3>
		   </p>
					<table id="basicInfo" width="0" border="0" cellspacing="0"
						cellpadding="0" class="ret_lst1 mt10">
						<tbody>
							<tr class="firstRow">
								<td style="" align="left" valign="top" width="67">项目名称</td>
								<td style="" colspan="3" valign="top" width="238"><input
									type="text" label="项目名称" name="proposal/zh_title" id="zh_title"
									class="w470 input_css  required maxlength:150"
									value="<x:out select='$xmlData/data/proposal/zh_title' />"
									onblur="" maxlength="150" style="width: 95%;" /></td>
							</tr>
							<tr>
								<td style="" align="left" valign="top" width="67">实施地点</td>
								<td style="" colspan="3" valign="top" width="238"><div
										style="display: inline;" id="dyn_radio_div_address_03_2017">
										<label style="display: inline;"><input type="radio"
											onclick="javascript: publicjs.radioClick(this) ;"
											id="project_address_value_01"
											name="proposal/project_address_value" label="南山区" value="01"
											style="" key="address_03_2017" />&nbsp;南山区</label>&nbsp;&nbsp;&nbsp;<label
											style="display: inline;"><input type="radio"
											onclick="javascript: publicjs.radioClick(this) ;"
											id="project_address_value_02"
											name="proposal/project_address_value" label="福田区" value="02"
											style="" key="address_03_2017" />&nbsp;福田区</label>&nbsp;&nbsp;&nbsp;<label
											style="display: inline;"><input type="radio"
											onclick="javascript: publicjs.radioClick(this) ;"
											id="project_address_value_03"
											name="proposal/project_address_value" label="宝安区" value="03"
											style="" key="address_03_2017" />&nbsp;宝安区</label>&nbsp;&nbsp;&nbsp;<label
											style="display: inline;"><input type="radio"
											onclick="javascript: publicjs.radioClick(this) ;"
											id="project_address_value_04"
											name="proposal/project_address_value" label="罗湖区" value="04"
											style="" key="address_03_2017" />&nbsp;罗湖区</label>&nbsp;&nbsp;&nbsp;<label
											style="display: inline;"><input type="radio"
											onclick="javascript: publicjs.radioClick(this) ;"
											id="project_address_value_05"
											name="proposal/project_address_value" label="龙华区" value="05"
											style="" key="address_03_2017" />&nbsp;龙华区</label>&nbsp;&nbsp;&nbsp;<label
											style="display: inline;"><input type="radio"
											onclick="javascript: publicjs.radioClick(this) ;"
											id="project_address_value_06"
											name="proposal/project_address_value" label="盐田区" value="06"
											style="" key="address_03_2017" />&nbsp;盐田区</label>&nbsp;&nbsp;&nbsp;<input
											type="hidden" id="project_address_value_value"
											name="proposal/project_address_value_value" class="required"
											label="实施地点"
											value="<x:out select='$xmlData/data/proposal/project_address_value_value' />" /><input
											type="hidden" id="project_address_value_name"
											name="proposal/project_address_value_name"
											value="<x:out select='$xmlData/data/proposal/project_address_value_name' />" />
									</div></td>
							</tr>
							<tr>
								<td style="" align="left" valign="top" width="67">实施单位<br></td>
								<td style="" colspan="3" valign="top" width="238"><span
									label="单位名称" name="organization/org_name" id="org_name"
									class="" style=""><x:out
											select='$xmlData/data/organization/org_name' /> </span></td>
							</tr>
							<tr>
								<td style="" align="left" valign="top" width="67">项目所属产业</td>
								<td style="" colspan="3" valign="top" width="238"><div
										style="display: inline;"
										id="dyn_checkbox_div_check_box_key_industry">
										<label style="display: inline;"><input
											type="checkbox"
											onclick="javascript: publicjs.checkboxClick(this) ;"
											id="proposal_industry_01" name="proposal/industry"
											label="物联网和云计算" value="01" style=""
											key="check_box_key_industry" />&nbsp;物联网和云计算</label>&nbsp;&nbsp;&nbsp;<label
											style="display: inline;"><input type="checkbox"
											onclick="javascript: publicjs.checkboxClick(this) ;"
											id="proposal_industry_02" name="proposal/industry"
											label="节能环保产业" value="02" style=""
											key="check_box_key_industry" />&nbsp;节能环保产业</label>&nbsp;&nbsp;&nbsp;<label
											style="display: inline;"><input type="checkbox"
											onclick="javascript: publicjs.checkboxClick(this) ;"
											id="proposal_industry_03" name="proposal/industry"
											label="软件和服务外包" value="03" style=""
											key="check_box_key_industry" />&nbsp;软件和服务外包</label>&nbsp;&nbsp;&nbsp;<label
											style="display: inline;"><input type="checkbox"
											onclick="javascript: publicjs.checkboxClick(this) ;"
											id="proposal_industry_04" name="proposal/industry"
											label="生物产业" value="04" style="" key="check_box_key_industry" />&nbsp;生物产业</label>&nbsp;&nbsp;&nbsp;<label
											style="display: inline;"><input type="checkbox"
											onclick="javascript: publicjs.checkboxClick(this) ;"
											id="proposal_industry_05" name="proposal/industry"
											label="新能源和新能源汽车" value="05" style=""
											key="check_box_key_industry" />&nbsp;新能源和新能源汽车</label>&nbsp;&nbsp;&nbsp;<label
											style="display: inline;"><input type="checkbox"
											onclick="javascript: publicjs.checkboxClick(this) ;"
											id="proposal_industry_06" name="proposal/industry"
											label="装备制造业" value="06" style=""
											key="check_box_key_industry" />&nbsp;装备制造业</label>&nbsp;&nbsp;&nbsp;<input
											type="hidden" id="proposal_industry_value"
											name="proposal/industry_value" class="required"
											label="项目所属产业"
											value="<x:out select='$xmlData/data/proposal/industry_value' />" /><input
											type="hidden" id="proposal_industry_name"
											name="proposal/industry_name"
											value="<x:out select='$xmlData/data/proposal/industry_name' />" />
									</div></td>
							</tr>
							<tr>
								<td style="" align="left" valign="top" width="67"><p>申请资金用途</p>
									<p>和使用计划</p>
									<p>简要说明</p>
									<p>（限500字）</p></td>
								<td style="" colspan="3" valign="top" width="238"><textarea
										label="申请资金用途和使用计划简要说明" name="proposal/fund_use_instruction"
										id="fund_use_instruction"
										class="w470 h82 required maxlength:500" maxlength="500"
										stype="width:100%;" style="" rows="6" cols="50"><x:out
											select='$xmlData/data/proposal/fund_use_instruction' /></textarea><input
									type="hidden" name="proposal/fund_use_instruction_hidden"
									id="fund_use_instruction_hidden"
									value="<x:out select='$xmlData/data/proposal/fund_use_instruction_hidden' />" /></td>
							</tr>
							<tr>
								<td style="" rowspan="1" colspan="1" align="left" valign="top"
									width="67">开始日期</td>
								<td style="" rowspan="1" colspan="1" valign="top" width="76">
									<script type="text/javascript">
										$(document)
												.ready(
														function() {
															$('#start_date')
																	.datepick(
																			{
																				showOnFocus : false,
																				onSelect : onDateSelected,
																				showTrigger : '<img align="absmiddle" style="padding-left:3px; cursor:pointer;vertical-align:middle;" src="/resfd/app-images/ico_date.gif" />'
																			});
														});
									</script>
									 <input id="start_date" name="proposal/start_date"
									value="<x:out select='$xmlData/data/proposal/start_date' />"
									onchange="alert('change');" class="required  date" label="开始时间"
									maxlength='20' style="vertical-align: middle; width: 80%;" />
								</td>
								<td style="" rowspan="1" colspan="1" valign="top" width="93">结束日期</td>
								<td style="" rowspan="1" colspan="1" valign="top" width="69"><script
										type="text/javascript">
									$(document)
											.ready(
													function() {
														$('#end_date')
																.datepick(
																		{
																			showOnFocus : false,
																			onSelect : null,
																			showTrigger : '<img align="absmiddle" style="padding-left:3px; cursor:pointer;vertical-align:middle;" src="/resfd/app-images/ico_date.gif" />'
																		});
													});
								</script> <input id="end_date" name="proposal/end_date"
									value="<x:out select='$xmlData/data/proposal/end_date' />"
									onchange="" class="required date" label="结束日期" maxlength='20'
									style="vertical-align: middle; width: 80%;" /></td>
							</tr>
							<tr>
								<td style="" rowspan="1" colspan="1" align="left" valign="top"
									width="67">资金级次</td>
								<td style="" rowspan="1" colspan="3" valign="top" width="238"><div
										style="display: inline;" id="dyn_select_div_select_key_test">
										<select id="fund_level" name="proposal/fund_level"
											onchange="javascript: publicjs.selectChange(this) ;alert('onchange');"
											style="" key="select_key_test"><option
												selected='selected' value="01" label="人才引育类">人才引育类</option>
											<option value="02" label="科技创新类">科技创新类</option>
											<option value="03" label="产业投资类">产业投资类</option></select><input
											type="hidden" id="fund_level_value"
											name="proposal/fund_level_value" class="required"
											label="资金级次"
											value="<x:out select='$xmlData/data/proposal/fund_level_value' />" /><input
											type="hidden" id="fund_level_name"
											name="proposal/fund_level_name"
											value="<x:out select='$xmlData/data/proposal/fund_level_name' />" />
									</div></td>
							</tr>
						</tbody>
					</table>
					<p><br></p>
		<p><br></p>
	 </div>
 </div>
</div>

	<script id="script" type="text/javascript" type="text/javascript" >
	 var locale = "zh_CN" ;
		// 脚本定义
    function onDateSelected(){
	alert('我是onDateSelected函数！');
}
	</script>
	<script id="initScript" type="text/javascript">
			$(document).ready(function(){
			//  alert('初始化逻辑12121212');   
			});
	</script>
	<script id="checkScript" type="text/javascript">
		function check(){
	   validate($("#basicInfo"),"基本222信息");  
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