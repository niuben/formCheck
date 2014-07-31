formCheck 
==========
### 一个表单验证的jquery插件

插件介绍：检查输入框格式是否正确
运用场景：表单
引用文件： _jquery.formCheck.js

**API**

**参数**

<pre>
参数名称	默认值	描述
submitId	“”	点击提交按钮的ID
errorMessId	“”	错误提示信息显示区域ID,如果不写显示在input输入框后面
successCallback	“”	表单验证成功后回调函数
errorCallback "" 表单验证失败时回调函数
</pre>

**自定义属性**

<pre>参数名称	取值	描述
checkType	chineseEnglish,name,password,chinese,emailMobile,email,mobile,phone,qq	验证类型
isIgnore	0,1	是否可以忽略，加上这个属性的输入框，可以不做判断
errorMess "" 当输入框错误时，显示的信息。
</pre>

**代码示例 **

 **Html**
 <pre>
&lt;div id="content"&gt;
  &lt;div id="errorMess" class="showmess"&gt;&lt;/div&gt;
  &lt;input type="text" checkType="email" errormess="邮箱不符合规范"  placeholder="邮箱"/&gt;
  &lt;input type="password" checkType="password" errormess="密码格式不对，需要6-20位字符" placeholder="密码(6-20位字符)"/&gt;
  &lt;input type="button" id="submitForm" value="登录预订"&gt;
&lt;/div&gt;
 </pre>

 
**Javascript：**
<pre>
$("#content").formCheck({
    submitId: "#submitForm"
}); 
</pre>

