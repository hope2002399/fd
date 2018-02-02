package com.iris.egrant.formdesign.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;


@Entity
@Table(name="TEMPLATE_ITEM_DETAIL")
public class FormItemDetail  implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -2275794929062087935L;
	
	/**
	 * 自增主键，PK
	 */
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID")
	private Long id ;
	
	@Column(name = "TEMPLATE_ID")
	private Long templateId ;
	
	@Column(name = "TAG_TYPE")
	private String tagType ;
	
	@Column(name = "TAG_LABEL")
	private String tagLabel ;
	
	@Column(name = "TAG_NAME")
	private String tagName ;
	
	@Column(name = "TAG_ID")
	private String tagId ;
	
	@Column(name = "TAG_CLASS")
	private String tagClass ;
	
	@Column(name = "TAG_OTHER_ATTRS")
	private String tagOtherAttrs ;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getTemplateId() {
		return templateId;
	}

	public void setTemplateId(Long templateId) {
		this.templateId = templateId;
	}

	public String getTagType() {
		return tagType;
	}

	public void setTagType(String tagType) {
		this.tagType = tagType;
	}

	public String getTagLabel() {
		return tagLabel;
	}

	public void setTagLabel(String tagLabel) {
		this.tagLabel = tagLabel;
	}

	public String getTagName() {
		return tagName;
	}

	public void setTagName(String tagName) {
		this.tagName = tagName;
	}

	public String getTagId() {
		return tagId;
	}

	public void setTagId(String tagId) {
		this.tagId = tagId;
	}

	public String getTagClass() {
		return tagClass;
	}

	public void setTagClass(String tagClass) {
		this.tagClass = tagClass;
	}

	public String getTagOtherAttrs() {
		return tagOtherAttrs;
	}

	public void setTagOtherAttrs(String tagOtherAttrs) {
		this.tagOtherAttrs = tagOtherAttrs;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	
}
