formCheck 
==========
### 一个表单验证的jquery插件

  插件介绍：给表单元素指定一些自定义的属性，就可以轻松的完成表单验证。
  
  运用场景：表单
  
  引用文件： _jquery.formCheck.js

API
---
**参数**

<pre>
参数名称        默认值  描述
submitID        null    点击提交按钮的ID,如果用户没有赋值ID，会自动寻找表单的最后一个按钮对象。
errorMessID     null    错误提示信息显示区域ID,如果不写显示在input输入框后面
correctClass    null    单个表单元素验证成功时加载的样式
errorClass      null    单个表单元素验证失败时加载的样式
addRegularObj   {}      用户自定义一些验证规则，按照{name:value}的格式传入。如{"number": /^[0-9]$/}
sucCallback     fun     表单验证成功后回调函数
errCallback     fun     表单验证失败时回调函数
</pre>

**自定义HTML属性**

<pre>
参数名称   取值      描述
checkType  指定类型	 自带类型：chineseEnglish,english,chinese,number,email,mobile,phone,qq
isIgnore   0,1       是否可以忽略，加上这个属性的输入框，可以不做判断
errorMess  自定义    错误提示信息
placehoder 自定义    未输入提示信息
</pre>

代码示例
---------
 **Html**
 <pre>
&lt;div id="content"&gt;
  &lt;div id="errorMess" class="showmess"&gt;&lt;/div&gt;
  &lt;input type="text" checkType="email" errormess="邮箱不符合规范"  placeholder="请填写邮箱"/&gt;
  &lt;input type="password" checkType="password" errormess="密码格式不对，需要6-20位字符" placeholder="密码(6-20位字符)"/&gt;
  &lt;input type="button" id="submitForm" value="登录预订"&gt;
&lt;/div&gt;
 </pre>

 
**Javascript：**
<pre>
$("#content").formCheck({
    submitID: "#submitForm",
    addRegularObj: {"password": /^[a-zA-z0-9]{6,20}$/}, 
}); 
</pre>

版本历史
--------
v 0.0.1 beta  2014-7-31
