package com.iris.egrant.formdesign.service.template;

import java.util.Map;

import org.apache.commons.collections.map.CaseInsensitiveMap;
import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;

import com.iris.egrant.formdesign.service.templateitem.TemplateItemByTagTypeService;

/**
 *  TagType与对应业务beanId映射关系配置
 *  @author cg
 */
public class TagTypeServiceCacheBean implements ApplicationContextAware {
	
	  private ApplicationContext applicationContext ;
		
	  private	CaseInsensitiveMap cim ;
	
	 	private Map<String ,String> cacheMap ;
	 	
		public Map<String, String> getCacheMap() {
			return cacheMap;
		}

		public void setCacheMap(Map<String, String> cacheMap) {
			this.cacheMap = cacheMap;
			cim = new CaseInsensitiveMap(cacheMap) ;
		}

		private String getBeanIdByTagType(String tagType){
			//  tagType转小写
			return (String) cim.get(tagType.toLowerCase());
		}
		
		public TemplateItemByTagTypeService getBeanByTagType(String tagType){
			 String beanId = getBeanIdByTagType(tagType) ;
			return (TemplateItemByTagTypeService)applicationContext.getBean(beanId);
		}

		@Override
		public void setApplicationContext(ApplicationContext applicationContext) 	throws BeansException {
			this.applicationContext = applicationContext ;
		}
}