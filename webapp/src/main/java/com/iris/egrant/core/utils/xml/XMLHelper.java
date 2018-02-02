package com.iris.egrant.core.utils.xml;

import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.DocumentHelper;
import org.dom4j.Node;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * xml转换、解析工具类.
 * 
 * 
 * 
 */
public class XMLHelper {

	protected static final Logger LOGGER = LoggerFactory.getLogger(XMLHelper.class);
	 
	/**
	 * 
	 * @param xmlData
	 * @return
	 */
	public static Document parseDocument(String xmlData) {
		Document doc = null;
		if ("".equalsIgnoreCase(xmlData) || "null".equalsIgnoreCase(xmlData)) {
			return null;
		}

		try {
			/* System.out.println(xmlData); */
			doc = DocumentHelper.parseText(xmlData);
			// System.out.println(doc.asXML());
		} catch (DocumentException e) {
			LOGGER.error("文本转化为document错误", e);
		}
		return doc;
	}

	/**
	 * 从XML字符串中获取XML节点值.
	 * 
	 * @param xml
	 * @param nodePath
	 * @return
	 */
	public static String getNodeValueFromXML(String xml, String nodePath) {
		// 加载原XML
		Document doc = null;
		try {
			doc = DocumentHelper.parseText(xml);
		} catch (DocumentException e) {
			LOGGER.error("", e);
		}

		Node node = doc.selectSingleNode(nodePath);
		if (node == null) {
			return "";
		} else {
			return node.getText();
		}
	} 
}