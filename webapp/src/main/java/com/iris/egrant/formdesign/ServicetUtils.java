package com.iris.egrant.formdesign;

import org.apache.commons.lang3.StringUtils;

public class ServicetUtils {
	
	public static void main(String[] args) {
		System.out.println(StringUtils.replace("Test-{template_item_1}", "{template_item_1}", "1206") ); 
		System.out.println(StringUtils.replaceEachRepeatedly("Test-{template_item_1}-{template_item_1},Test-{template_item_2}", new String[]{"{template_item_1}" ,"{template_item_2}" }, new String[]{"1206" , "1207"}) ); 
	}
}
