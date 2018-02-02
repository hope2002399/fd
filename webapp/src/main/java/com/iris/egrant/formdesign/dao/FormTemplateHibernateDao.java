package com.iris.egrant.formdesign.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.iris.egrant.core.dao.hibernate.SimpleHibernateDao;
import com.iris.egrant.formdesign.model.FormTemplate;

@Repository
public class FormTemplateHibernateDao extends SimpleHibernateDao<FormTemplate, Long> {

	@SuppressWarnings("unchecked")
	public List<FormTemplate> getTemplateByType(String type) {
		return	super.createQuery("select ft from FormTemplate ft where ft.type = :type ").setParameter("type", type).list() ;
	}

	public int updateScript(Long templateId, String script, String initScript, 	String checkScript) {
		return	
					super.createQuery("update FormTemplate ft set ft.script = :script , ft.initScript = :initScript , ft.checkScript = :checkScript  where ft.id = :id")
			.setParameter("script", script)	
			.setParameter("initScript", initScript)
			.setParameter("checkScript", checkScript)
			.setParameter("id", templateId)
			.executeUpdate() ;
	}
}
