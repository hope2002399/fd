<script type="text/javascript">
	$(document).ready(function(){	
	$('#${id}').datepick({showOnFocus: false,onSelect: ${onselected}, showTrigger: '<img align="absmiddle" style="padding-left:3px; cursor:pointer;vertical-align:middle;" src="/resfd/app-images/ico_date.gif" />'});
	});
</script>
<input id="${id}" name="${name}"  value="${value}" onchange="${onchange}" class="${class}" label="${label}" maxlength='20' style="vertical-align:middle;${style}" />