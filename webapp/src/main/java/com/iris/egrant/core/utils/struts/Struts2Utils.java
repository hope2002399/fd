package com.iris.egrant.core.utils.struts;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import javax.servlet.ServletContext;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.apache.commons.lang.StringUtils;
import org.apache.struts2.ServletActionContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.util.Assert; 

import com.alibaba.fastjson.JSON;
/**
 * Struts2Utils工具类
 */
public class Struts2Utils {


	// header 常量定义
	private static final String ENCODING_PREFIX = "encoding";
	private static final String NOCACHE_PREFIX = "no-cache";
	private static final String ENCODING_DEFAULT = "UTF-8";
	private static final boolean NOCACHE_DEFAULT = true;

	private static Logger logger = LoggerFactory.getLogger(Struts2Utils.class);

	// 取得Request/Response/Session的简化函数 //

	/**
	 * 取得HttpSession的简化方法.
	 */
	public static HttpSession getSession() {
		return ServletActionContext.getRequest().getSession();
	}

	/**
	 * 取得HttpRequest的简化方法.
	 */
	public static HttpServletRequest getRequest() {
		return ServletActionContext.getRequest();
	}
	
	/**
	 * 取得HttpRequest的真实远程ip
	 * 兼容反向代理
	 * 因反向代理，会导致getRequest().getRemoteAddr()的ip为代理服务器地址
	 * 
	 *  */
	public static String getRemoteAddrIp(){
		String remoteAddIp=getRequest().getHeader("X-Real-IP");
		if(StringUtils.isBlank(remoteAddIp)){
			remoteAddIp=getRequest().getRemoteAddr();
		}
		return remoteAddIp;
	}

	/**
	 * 取得HttpResponse的简化方法.
	 */
	public static HttpServletResponse getResponse() {
		return ServletActionContext.getResponse();
	}

	/**
	 * 取得Request Parameter的简化方法.
	 */
	public static String getParameter(String name) {
		return getRequest().getParameter(name);
	}

	// 绕过jsp/freemaker直接输出文本的函数 //

	/**
	 * 直接输出内容的简便函数.
	 * 
	 * eg. render("text/plain", "hello", "encoding:GBK"); render("text/plain", "hello", "no-cache:false");
	 * render("text/plain", "hello", "encoding:GBK", "no-cache:false");
	 * 
	 * @param headers
	 *            可变的header数组，目前接受的值为"encoding:"或"no-cache:",默认值分别为UTF-8和true.
	 */
	public static void render(final String contentType, final String content, final String... headers) {
		try {
			// 分析headers参数
			String encoding = ENCODING_DEFAULT;
			boolean noCache = NOCACHE_DEFAULT;
			for (String header : headers) {
				String headerName = StringUtils.substringBefore(header, ":");
				String headerValue = StringUtils.substringAfter(header, ":");

				if (StringUtils.equalsIgnoreCase(headerName, ENCODING_PREFIX)) {
					encoding = headerValue;
				} else if (StringUtils.equalsIgnoreCase(headerName, NOCACHE_PREFIX)) {
					noCache = Boolean.parseBoolean(headerValue);
				} else
					throw new IllegalArgumentException(headerName + "不是一个合法的header类型");
			}

			HttpServletResponse response = ServletActionContext.getResponse();

			// 设置headers参数
			String fullContentType = contentType + ";charset=" + encoding;
			response.setContentType(fullContentType);
			if (noCache) {
				response.setHeader("Pragma", "No-cache");
				response.setHeader("Cache-Control", "no-cache");
				response.setDateHeader("Expires", 0);
			}

			response.getWriter().write(content);
			response.getWriter().flush();

		} catch (IOException e) {
			logger.error(e.getMessage(), e);
		}
	}

	/**
	 * 直接输出文本.
	 * 
	 * @see #render(String, String, String...)
	 */
	public static void renderText(final String text, final String... headers) {
		render("text/plain", text, headers);
	}

	/**
	 * 直接输出HTML.
	 * 
	 * @see #render(String, String, String...)
	 */
	public static void renderHtml(final String html, final String... headers) {
		render("text/html", html, headers);
	}

	/**
	 * 直接输出XML.
	 * 
	 * @see #render(String, String, String...)
	 */
	public static void renderXml(final String xml, final String... headers) {
		render("text/xml", xml, headers);
	}

	/**
	 * 直接输出JSON.
	 * 
	 * @param string
	 *            json字符串.
	 * @see #render(String, String, String...)
	 */
	public static void renderJson(final String string, final String... headers) {

		render("application/json", string, headers);
	}

	/**
	 * 直接输出JSON.
	 * 
	 * @param map
	 *            Map对象,将被转化为json字符串.
	 * @see #render(String, String, String...)
	 */
	@SuppressWarnings("rawtypes")
	public static void renderJson(final Map map, final String... headers) {
		String jsonString = JSON.toJSONString(map);
		renderJson(jsonString, headers);
	}

	/**
	 * 直接输出JSON.
	 * 
	 * @param object
	 *            Java对象,将被转化为json字符串.
	 * @see #render(String, String, String...)
	 */
	public static void renderJson(final Object object, final String... headers) {
		String jsonString = JSON.toJSONString(object);
		renderJson(jsonString, headers);
	}

	/**
	 * 直接输出JSON.
	 * 
	 * @param list
	 *            Java对象list,将被转化为json字符串.
	 * @see #render(String, String, String...)
	 */
	public static void renderJson(final List<Object> list, final String... headers) {
		String jsonString =  JSON.toJSONString(list);
		renderJson(jsonString, headers);
	}

	/**
	 * 直接输出JSON.
	 * 
	 * @param list
	 *            Java对象list,将被转化为json字符串.
	 * @see #render(String, String, String...)
	 */
	@SuppressWarnings("rawtypes")
	public static void renderJsonList(final List list, final String... headers) {
		String jsonString = JSON.toJSONString(list);
		render("application/json", jsonString, headers);
	}
	
	/**
	 * 输出EXCEL.
	 * 
	 * @param html
	 */
	public static void renderExcel(final String html) {
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setCharacterEncoding("utf-8");
		response.setHeader("Content-Type", "application/msexcel");
		response.setHeader("Content-Disposition", "attachment;filename=excel.xls");
		try {
			response.getWriter().write(html);
			response.getWriter().flush();
		} catch (IOException e) {
			logger.error(e.getMessage(), e);
		}
	}

	/**
	 * 
	 * @param request
	 * @return
	 */
	public static String getAppServerPath(HttpServletRequest request) {

		String scheme = request.getScheme();
		String server = request.getServerName();
		int port = request.getServerPort();
		String context = request.getContextPath();

		if (port == 80) {
			return String.format("%s://%s%s", scheme, server, context);
		}
		return String.format("%s://%s:%s%s", scheme, server, port, context);
	}

	public static ServletContext getServletContext() {
		return ServletActionContext.getServletContext();
	}
	
	/**
	 * 获取指定名称的cookie
	 * @param request
	 * @param name
	 * @return
	 */
	public static Cookie getCookie(HttpServletRequest request, String name){
		Assert.notNull(request, "Request must not be null");
		Cookie cookies[] = request.getCookies();
		if (cookies != null) {
			for (Cookie cookie : cookies) {
				if (name.equals(cookie.getName())) {
					return cookie;
				}
			}
		}
		return null;
	}
	
}
