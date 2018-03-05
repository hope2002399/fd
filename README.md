# egrant-form-design

  表单定制

1、数据源
	<Resource name="jdbc/egrant" 
            factory="org.apache.naming.factory.BeanFactory"  
            type="com.alibaba.druid.pool.DruidDataSource"  
            url="jdbc:mysql://192.168.15.13:3306/formdesign"
						driverClassName="com.mysql.jdbc.Driver"
						username="formdesign"
						password="formdesign"
						filters="stat"
						maxActive="20"
						initialSize="1"
						maxWait="60000"
						minIdle="10"
						maxIdle="15"
						timeBetweenEvictionRunsMillis="60000"
						minEvictableIdleTimeMillis="300000"
						validationQuery="SELECT 'x'"
						testWhileIdle="true"
						testOnBorrow="false"
						testOnReturn="false"
						maxOpenPreparedStatements="20"
						removeAbandoned="true"
						removeAbandonedTimeout="1800"
						logAbandoned="true"
            />
2、启动参数
	-Dspring.profiles.active=linuxdev -Xmx128m -Xms128m
