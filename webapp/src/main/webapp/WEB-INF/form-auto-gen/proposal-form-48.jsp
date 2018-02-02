<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/common/common.jsp" %>
<c:set var='xml'  value='${xmlData }' />
<x:parse var='xmlData' xml='${xml }' scope='request' />
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	 <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	 <link href="/resfd/css/bootstrap/css/bootstrap.css?2023" rel="stylesheet" type="text/css" />
	 <link href="/resfd/app-css/wbox.css" rel="stylesheet" type="text/css" />
	 <title>表单</title>
</head>
<body> 
	
	<div align="center" style="margin-top: 20px;">
		<input type="button" class="btn btn-navbar" onclick="check();" id="check-btn" value="填写检查" />
		<input type="button"  class="btn btn-navbar" onclick="demoSave();" value="保存" />
	</div>
	<p>
		<br>
	</p>
	<p>
		<br>
	</p>
	<p>
		1、企业规模和管理团队<br>
	</p>
	<p>
		<textarea label="企业规模和管理团队" name="proposal/goal/summary1"
			id="goal_summary1" class="required maxlength:500" maxlength="500"
			style="width: 95%;" onchange="alert(&quot;change!&quot;);"><x:out
				select='$xmlData/data/proposal/goal/summary1' /></textarea>
		<input type="hidden" name="proposal/goal/summary1_hidden"
			id="goal_summary1_hidden"
			value="<x:out select='$xmlData/data/proposal/goal/summary1_hidden' />" />
	</p>
	<p>2、创新能力和创新成果（限500字）</p>
	<p>
		<br>
	</p>
	<p>
		请输入银行账户： &nbsp; &nbsp;<span label="银行账号"
			name="org_basic_info/bank_account" id="bank_account" class=""
			style=""><x:out
				select='$xmlData/data/org_basic_info/bank_account' /> </span>
	</p>
	<p>
		<strong>基本信息</strong>
	</p>
	<p>
		<strong><br></strong>
	</p>
	<table interlaced="disabled" data-sort="sortDisabled">
		<tbody>
			<tr class="firstRow">
				<td
					style="BORDER-BOTTOM: 1px solid; BORDER-LEFT: 1px solid; WORD-BREAK: break-all; BORDER-TOP: 1px solid; BORDER-RIGHT: 1px solid"
					align="right" valign="top" width="170">项目名称</td>
				<td
					style="BORDER-BOTTOM: 1px solid; BORDER-LEFT: 1px solid; WORD-BREAK: break-all; BORDER-TOP: 1px solid; BORDER-RIGHT: 1px solid"
					colspan="3" valign="top" width="534"><input type="text"
					label="项目名称" name="proposal/zh_title" id="zh_title"
					class="required maxlength:150"
					value="<x:out select='$xmlData/data/proposal/zh_title' />"
					onblur="alert(&quot;1&quot;);" maxlength="150" style="width: 95%;" /></td>
			</tr>
			<tr>
				<td
					style="BORDER-BOTTOM: 1px solid; BORDER-LEFT: 1px solid; WORD-BREAK: break-all; BORDER-TOP: 1px solid; BORDER-RIGHT: 1px solid"
					align="right" valign="top" width="170">实施地点</td>
				<td
					style="BORDER-BOTTOM: 1px solid; BORDER-LEFT: 1px solid; WORD-BREAK: break-all; BORDER-TOP: 1px solid; BORDER-RIGHT: 1px solid"
					colspan="3" valign="top" width="361"><div
						style="display: inline;" id="dyn_radio_div_address_03_2017">
						<label style="display: inline;"><input type="radio"
							onclick="javascript: publicjs.radioClick(this) ;" checked
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
				<td
					style="BORDER-BOTTOM: 1px solid; BORDER-LEFT: 1px solid; WORD-BREAK: break-all; BORDER-TOP: 1px solid; BORDER-RIGHT: 1px solid"
					align="right" valign="top">实施单位<br></td>
				<td
					style="BORDER-BOTTOM: 1px solid; BORDER-LEFT: 1px solid; BORDER-TOP: 1px solid; BORDER-RIGHT: 1px solid"
					colspan="3" valign="top"><span label="单位名称"
					name="organization/org_name" id="org_name" class="" style=""><x:out
							select='$xmlData/data/organization/org_name' /> </span></td>
			</tr>
			<tr>
				<td
					style="BORDER-BOTTOM: 1px solid; BORDER-LEFT: 1px solid; WORD-BREAK: break-all; BORDER-TOP: 1px solid; BORDER-RIGHT: 1px solid"
					align="right" valign="top">项目所属产业</td>
				<td
					style="BORDER-BOTTOM: 1px solid; BORDER-LEFT: 1px solid; WORD-BREAK: break-all; BORDER-TOP: 1px solid; BORDER-RIGHT: 1px solid"
					colspan="3" valign="top"><div style="display: inline;"
						id="dyn_checkbox_div_check_box_key_industry">
						<label style="display: inline;"><input type="checkbox"
							onclick="javascript: publicjs.checkboxClick(this) ;"
							checked="checked" id="proposal_industry_01"
							name="proposal/industry" label="物联网和云计算" value="01" style=""
							key="check_box_key_industry" />&nbsp;物联网和云计算</label>&nbsp;&nbsp;&nbsp;<label
							style="display: inline;"><input type="checkbox"
							onclick="javascript: publicjs.checkboxClick(this) ;"
							checked="checked" id="proposal_industry_02"
							name="proposal/industry" label="节能环保产业" value="02" style=""
							key="check_box_key_industry" />&nbsp;节能环保产业</label>&nbsp;&nbsp;&nbsp;<label
							style="display: inline;"><input type="checkbox"
							onclick="javascript: publicjs.checkboxClick(this) ;"
							id="proposal_industry_03" name="proposal/industry"
							label="软件和服务外包" value="03" style="" key="check_box_key_industry" />&nbsp;软件和服务外包</label>&nbsp;&nbsp;&nbsp;<label
							style="display: inline;"><input type="checkbox"
							onclick="javascript: publicjs.checkboxClick(this) ;"
							id="proposal_industry_04" name="proposal/industry" label="生物产业"
							value="04" style="" key="check_box_key_industry" />&nbsp;生物产业</label>&nbsp;&nbsp;&nbsp;<label
							style="display: inline;"><input type="checkbox"
							onclick="javascript: publicjs.checkboxClick(this) ;"
							id="proposal_industry_05" name="proposal/industry"
							label="新能源和新能源汽车" value="05" style=""
							key="check_box_key_industry" />&nbsp;新能源和新能源汽车</label>&nbsp;&nbsp;&nbsp;<label
							style="display: inline;"><input type="checkbox"
							onclick="javascript: publicjs.checkboxClick(this) ;"
							id="proposal_industry_06" name="proposal/industry" label="装备制造业"
							value="06" style="" key="check_box_key_industry" />&nbsp;装备制造业</label>&nbsp;&nbsp;&nbsp;<input
							type="hidden" id="proposal_industry_value"
							name="proposal/industry_value" class="required" label="项目所属产业"
							value="<x:out select='$xmlData/data/proposal/industry_value' />" /><input
							type="hidden" id="proposal_industry_name"
							name="proposal/industry_name"
							value="<x:out select='$xmlData/data/proposal/industry_name' />" />
					</div></td>
			</tr>
			<tr>
				<td
					style="BORDER-BOTTOM: 1px solid; BORDER-LEFT: 1px solid; WORD-BREAK: break-all; BORDER-TOP: 1px solid; BORDER-RIGHT: 1px solid"
					align="right" valign="top"><p>申请资金用途</p>
					<p>和使用计划</p>
					<p>简要说明</p>
					<p>（限500字）</p></td>
				<td
					style="BORDER-BOTTOM: 1px solid; BORDER-LEFT: 1px solid; WORD-BREAK: break-all; BORDER-TOP: 1px solid; BORDER-RIGHT: 1px solid"
					colspan="3" valign="top"><textarea label="申请资金用途和使用计划简要说明"
						name="proposal/fund_use_instruction" id="fund_use_instruction"
						class="required maxlength:500" maxlength="500" style=""
						stype="width:100%;" rows="6" cols="50"><x:out
							select='$xmlData/data/proposal/fund_use_instruction' /></textarea><input
					type="hidden" name="proposal/fund_use_instruction_hidden"
					id="fund_use_instruction_hidden"
					value="<x:out select='$xmlData/data/proposal/fund_use_instruction_hidden' />" /></td>
			</tr>
		</tbody>
	</table>
	<p>
		<br>
	</p>
	<p>
		<span label="银行账号" name="org_basic_info/bank_account"
			id="bank_account" class="" style=""><x:out
				select='$xmlData/data/org_basic_info/bank_account' /> </span><br>
	</p>
	<p>
		<span tagtype="span" taglabel="银行账号"
			tagname="org_basic_info/bank_account" tagid="bank_account"
			tagclass="" tagstyle="" tagotherattrs=""><span tagtype="radio"
			taglabel="项目所属地区" tagname="proposal/project_address_value"
			tagid="project_address_value" tagclass="" tagstyle=""
			tagkey="project_address_radio_key" tagotherattrs=""><br></span></span>
	</p>
	<p>
		<span tagtype="span" taglabel="银行账号"
			tagname="org_basic_info/bank_account" tagid="bank_account"
			tagclass="" tagstyle="" tagotherattrs=""><div
				style="display: inline;" id="dyn_radio_div_project_address_radio_key">
				<label style="display: inline;"><input type="radio"
					onclick="javascript: publicjs.radioClick(this) ;" checked
					id="project_address_value_01" name="proposal/project_address_value"
					label="南山区" value="01" style="" key="project_address_radio_key" />&nbsp;南山区</label>&nbsp;&nbsp;&nbsp;<label
					style="display: inline;"><input type="radio"
					onclick="javascript: publicjs.radioClick(this) ;"
					id="project_address_value_02" name="proposal/project_address_value"
					label="福田区" value="02" style="" key="project_address_radio_key" />&nbsp;福田区</label>&nbsp;&nbsp;&nbsp;<label
					style="display: inline;"><input type="radio"
					onclick="javascript: publicjs.radioClick(this) ;"
					id="project_address_value_03" name="proposal/project_address_value"
					label="宝安区" value="03" style="" key="project_address_radio_key" />&nbsp;宝安区</label>&nbsp;&nbsp;&nbsp;<label
					style="display: inline;"><input type="radio"
					onclick="javascript: publicjs.radioClick(this) ;"
					id="project_address_value_04" name="proposal/project_address_value"
					label="罗湖区" value="04" style="" key="project_address_radio_key" />&nbsp;罗湖区</label>&nbsp;&nbsp;&nbsp;<label
					style="display: inline;"><input type="radio"
					onclick="javascript: publicjs.radioClick(this) ;"
					id="project_address_value_05" name="proposal/project_address_value"
					label="龙华区" value="05" style="" key="project_address_radio_key" />&nbsp;龙华区</label>&nbsp;&nbsp;&nbsp;<label
					style="display: inline;"><input type="radio"
					onclick="javascript: publicjs.radioClick(this) ;"
					id="project_address_value_06" name="proposal/project_address_value"
					label="盐田区" value="06" style="" key="project_address_radio_key" />&nbsp;盐田区</label>&nbsp;&nbsp;&nbsp;<input
					type="hidden" id="project_address_value_value"
					name="proposal/project_address_value_value" class="" label="项目所属地区"
					value="<x:out select='$xmlData/data/proposal/project_address_value_value' />" /><input
					type="hidden" id="project_address_value_name"
					name="proposal/project_address_value_name"
					value="<x:out select='$xmlData/data/proposal/project_address_value_name' />" />
			</div></span>
	</p>
	<p>
		<span tagtype="span" taglabel="银行账号"
			tagname="org_basic_info/bank_account" tagid="bank_account"
			tagclass="" tagstyle="" tagotherattrs=""><div
				style="display: inline;" id="dyn_radio_div_project_address_radio_key">
				<label style="display: inline;"><input type="radio"
					onclick="javascript: publicjs.radioClick(this) ;" checked
					id="project_address_value_01" name="proposal/project_address_value"
					label="南山区" value="01" style="" key="project_address_radio_key" />&nbsp;南山区</label>&nbsp;&nbsp;&nbsp;<label
					style="display: inline;"><input type="radio"
					onclick="javascript: publicjs.radioClick(this) ;"
					id="project_address_value_02" name="proposal/project_address_value"
					label="福田区" value="02" style="" key="project_address_radio_key" />&nbsp;福田区</label>&nbsp;&nbsp;&nbsp;<label
					style="display: inline;"><input type="radio"
					onclick="javascript: publicjs.radioClick(this) ;"
					id="project_address_value_03" name="proposal/project_address_value"
					label="宝安区" value="03" style="" key="project_address_radio_key" />&nbsp;宝安区</label>&nbsp;&nbsp;&nbsp;<label
					style="display: inline;"><input type="radio"
					onclick="javascript: publicjs.radioClick(this) ;"
					id="project_address_value_04" name="proposal/project_address_value"
					label="罗湖区" value="04" style="" key="project_address_radio_key" />&nbsp;罗湖区</label>&nbsp;&nbsp;&nbsp;<label
					style="display: inline;"><input type="radio"
					onclick="javascript: publicjs.radioClick(this) ;"
					id="project_address_value_05" name="proposal/project_address_value"
					label="龙华区" value="05" style="" key="project_address_radio_key" />&nbsp;龙华区</label>&nbsp;&nbsp;&nbsp;<label
					style="display: inline;"><input type="radio"
					onclick="javascript: publicjs.radioClick(this) ;"
					id="project_address_value_06" name="proposal/project_address_value"
					label="盐田区" value="06" style="" key="project_address_radio_key" />&nbsp;盐田区</label>&nbsp;&nbsp;&nbsp;<input
					type="hidden" id="project_address_value_value"
					name="proposal/project_address_value_value" class="" label="项目所属地区"
					value="<x:out select='$xmlData/data/proposal/project_address_value_value' />" /><input
					type="hidden" id="project_address_value_name"
					name="proposal/project_address_value_name"
					value="<x:out select='$xmlData/data/proposal/project_address_value_name' />" />
			</div></span>
	</p>
	<p>
		<span tagtype="span" taglabel="银行账号"
			tagname="org_basic_info/bank_account" tagid="bank_account"
			tagclass="" tagstyle="" tagotherattrs=""><div
				style="display: inline;" id="dyn_radio_div_project_address_radio_key">
				<label style="display: inline;"><input type="radio"
					onclick="javascript: publicjs.radioClick(this) ;" checked
					id="project_address_value_01" name="proposal/project_address_value"
					label="南山区" value="01" style="" key="project_address_radio_key" />&nbsp;南山区</label>&nbsp;&nbsp;&nbsp;<label
					style="display: inline;"><input type="radio"
					onclick="javascript: publicjs.radioClick(this) ;"
					id="project_address_value_02" name="proposal/project_address_value"
					label="福田区" value="02" style="" key="project_address_radio_key" />&nbsp;福田区</label>&nbsp;&nbsp;&nbsp;<label
					style="display: inline;"><input type="radio"
					onclick="javascript: publicjs.radioClick(this) ;"
					id="project_address_value_03" name="proposal/project_address_value"
					label="宝安区" value="03" style="" key="project_address_radio_key" />&nbsp;宝安区</label>&nbsp;&nbsp;&nbsp;<label
					style="display: inline;"><input type="radio"
					onclick="javascript: publicjs.radioClick(this) ;"
					id="project_address_value_04" name="proposal/project_address_value"
					label="罗湖区" value="04" style="" key="project_address_radio_key" />&nbsp;罗湖区</label>&nbsp;&nbsp;&nbsp;<label
					style="display: inline;"><input type="radio"
					onclick="javascript: publicjs.radioClick(this) ;"
					id="project_address_value_05" name="proposal/project_address_value"
					label="龙华区" value="05" style="" key="project_address_radio_key" />&nbsp;龙华区</label>&nbsp;&nbsp;&nbsp;<label
					style="display: inline;"><input type="radio"
					onclick="javascript: publicjs.radioClick(this) ;"
					id="project_address_value_06" name="proposal/project_address_value"
					label="盐田区" value="06" style="" key="project_address_radio_key" />&nbsp;盐田区</label>&nbsp;&nbsp;&nbsp;<input
					type="hidden" id="project_address_value_value"
					name="proposal/project_address_value_value" class="" label="项目所属地区"
					value="<x:out select='$xmlData/data/proposal/project_address_value_value' />" /><input
					type="hidden" id="project_address_value_name"
					name="proposal/project_address_value_name"
					value="<x:out select='$xmlData/data/proposal/project_address_value_name' />" />
			</div></span>
	</p>
	<p>
		<span tagtype="span" taglabel="银行账号"
			tagname="org_basic_info/bank_account" tagid="bank_account"
			tagclass="" tagstyle="" tagotherattrs=""><div
				style="display: inline;" id="dyn_checkbox_div_industry_checkbox_key">
				<label style="display: inline;"><input type="checkbox"
					onclick="javascript: publicjs.checkboxClick(this) ;"
					checked="checked" id="industry_value_01"
					name="proposal/industry_value" label="物联网和云计算" value="01" style=""
					key="industry_checkbox_key" />&nbsp;物联网和云计算</label>&nbsp;&nbsp;&nbsp;<label
					style="display: inline;"><input type="checkbox"
					onclick="javascript: publicjs.checkboxClick(this) ;"
					checked="checked" id="industry_value_02"
					name="proposal/industry_value" label="节能环保产业" value="02" style=""
					key="industry_checkbox_key" />&nbsp;节能环保产业</label>&nbsp;&nbsp;&nbsp;<label
					style="display: inline;"><input type="checkbox"
					onclick="javascript: publicjs.checkboxClick(this) ;"
					id="industry_value_03" name="proposal/industry_value"
					label="软件和服务外包" value="03" style="" key="industry_checkbox_key" />&nbsp;软件和服务外包</label>&nbsp;&nbsp;&nbsp;<label
					style="display: inline;"><input type="checkbox"
					onclick="javascript: publicjs.checkboxClick(this) ;"
					id="industry_value_04" name="proposal/industry_value" label="生物产业"
					value="04" style="" key="industry_checkbox_key" />&nbsp;生物产业</label>&nbsp;&nbsp;&nbsp;<label
					style="display: inline;"><input type="checkbox"
					onclick="javascript: publicjs.checkboxClick(this) ;"
					id="industry_value_05" name="proposal/industry_value"
					label="新能源和新能源汽车" value="05" style="" key="industry_checkbox_key" />&nbsp;新能源和新能源汽车</label>&nbsp;&nbsp;&nbsp;<label
					style="display: inline;"><input type="checkbox"
					onclick="javascript: publicjs.checkboxClick(this) ;"
					id="industry_value_06" name="proposal/industry_value" label="装备制造业"
					value="06" style="" key="industry_checkbox_key" />&nbsp;装备制造业</label>&nbsp;&nbsp;&nbsp;<input
					type="hidden" id="industry_value_value"
					name="proposal/industry_value_value" class="" label="项目所属产业"
					value="<x:out select='$xmlData/data/proposal/industry_value_value' />" /><input
					type="hidden" id="industry_value_name"
					name="proposal/industry_value_name"
					value="<x:out select='$xmlData/data/proposal/industry_value_name' />" />
			</div></span>
	</p>
	<p>
		<br>
	</p>
	<script type="text/javascript" charset="utf-8" src="/resfd/js/jquery-1.7.2.min.js"></script>
	<script type="text/javascript" charset="utf-8" src="/resfd/app-js/message.tips-zh_CN.js"></script>
	<script type="text/javascript" charset="utf-8" src="/resfd/app-js/wbox.js"></script>
	<script type="text/javascript" charset="utf-8" src="/resfd/app-js/jquery.validate.js"></script>
	<script type="text/javascript" charset="utf-8" src="/resfd/app-js/public.js"></script>
	<script type="text/javascript" charset="utf-8" src="/resfd/app-js/irisvalidator.js"></script>
	<script type="text/javascript" charset="utf-8" src="/resfd/app-js/irisPrpPrepare.js"></script>
	<script type="text/javascript" charset="utf-8" src="/resfd/app-js/viewForm.js"></script>
	<script type="text/javascript" type="text/javascript" >
		// 脚本定义
    
	</script>
	<script type="text/javascript">
			$(document).ready(function(){
			     
			});
	</script>
	<script type="text/javascript">
		function check(){
	     
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