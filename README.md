formCheck
=========

This is a jquery plugins that check form 

formCheck—表单验证

插件介绍：检查输入框格式是否正确。
运用场景：表单。
引用文件：_jquery.formCheck.js。

属性：
参数名称	默认值	描述
submitId	“”	点击提交按钮的ID
errorMessId	“”	错误提示信息显示区域ID
success	“”	表单验证成功后回调函数

自定义属性：
参数名称	取值	描述
checkType	chineseEnglish,
name,password,
chinese,email
Mobile,email,
mobile,phone,qq	验证类型
isRequired	0,1	是否必须

代码示例：
 Html
<div id="content">
    <div id="errorMess" class="showmess"></div>
    <input maxlength="30" class="input" type="text" checkType="emailMobile" isRequired = "1" value="" placeholder="邮箱/手机号"/>
    <input class="input" maxlength="20" checkType="password" isRequired = "1" type="password" placeholder="密码(6-20位字符)"/>                
    <input type="button" id="submitForm" value="登录预订">
</div>
Javascript：
$("#content").formCheck({
    submitId: "#submitForm"
}); 

