$.fn.formCheck = function(option){

    var defaults={          
        
        //需要验证的样式名        
        className:'.check-form',
        //点击提交的样式名
        submitId: "#form-submit",
        //错误提示信息显示区域ID
        errorMessId: "#showMess",
        //正确的样式
        correctClass: "success",
        //错误的样式
        errorClass: "error"
        
    };

    this.isCorrect = 0;

    var self = this;

    $.extend(defaults, option);

    function init(){

        /*

        */
        
        $(self).find(defaults.className).blur(function(){            
            
            if(!checkIsChange($(this))){
                return true;
            }
            var isCorrect = startCheck(this);
            var isCheckOnly = checkIsOnly($(this));
            
            if(isCorrect && isCheckOnly){
                checkIsOnly($(this));
            }
        }).keydown(function(e){
            if(e.keyCode == 13){
                $(defaults.submitId).click();
            }
        });

        $(defaults.submitId).click(function(e){      
            e.preventDefault();
            self.isCorrect = 1;
          
            $(self).find(defaults.className).each(function(){
                
                if(!checkIsChange($(this))){
                    return true;
                }    
                var isCorrect = startCheck(this);
                var isCheckOnly = checkIsOnly($(this));                
                if(isCorrect && isCheckOnly){
                    checkIsOnly($(this));
                }
                if(!self.isCorrect){
                    window.scrollTo(0,0);
                    return false;
                }
            });

            if(self.isCorrect){
                defaults.success();
            }

    });

    };
    
    function checkIsChange(obj){
        //当有些值，已经填入输入框，在没有改变的情况下，就不做检查
        var oldValue = obj.attr("oldValue");
        var currentValue = obj.val();
        
        if(!oldValue){
            return true;
        }
        
        if(oldValue == currentValue){
            return false;
        }else{
            return true;
        }
    }

    function checkIsOnly(obj){
        //判断是否需要检查账号的唯一性
        var isCheckOnly = $(obj).attr("isCheckOnly");
        return isCheckOnly ? true : false;
    }

    function startCheck(obj){
        var _type = $(obj).attr("checkType");
        var _value = $(obj).val();        

        var isRequired = $(obj).attr("isRequired");
        isRequired = isRequired == "0" ? 0 : 1;
        // 获取输入框前面标题对象
        var errorStr =checkInputValue(_value, _type, isRequired);
        if(errorStr){
            
            self.isCorrect = 0;        
            //获得标题
            try{
                var titleObj = $(obj).prev();
                var titleStr = titleObj.text();
                titleStr = titleStr.substr(0,titleStr.length - 1);
            }catch(e){
                var titleStr = "";                            
            }
            
            errorStr = titleStr + errorStr;
            showErrorMess(errorStr);  

            return false;
        }else{            
            showErrorMess("");
            return true;
        }

    }
    
    /*
        设置输入框显示状态
        stauts :
    */


    // function setInputClass(obj, stauts){
    //     parent = obj.

    //     if(stauts == "success"){

    //     }


    // }

    function showErrorMess(errorStr){
       errorObj = $(defaults.errorMessId); 
       $(errorObj).addClass(defaults.errorClass).html("").html(errorStr);
    }

    function checkInputValue(value, type ,isRequired){        

        value=$.trim(value);
        var _strLength=value.length;
        if(type == "chineseEnglish"){
            if(_strLength==0 && isRequired == 0){
                return false;
            }

            if(_strLength==0 && isRequired == 1){
                return "不能为空";
            }

            if(!value.match(/^[\u0391-\uFFE5a-zA-z0-9\s]{1,}$/)){
                return "请填写中文、英文、数字";
            }
        }if(type == "name"){
            if(_strLength==0 && isRequired == 0){
                return false;
            }

            if(_strLength==0 && isRequired == 1){
                return "不能为空";
            }

            if(!value.match(/^[\u0391-\uFFE5a-zA-z\s]{1,}$/)){
                return "请填写中文、英文";
            }
        }else if(type == "password"){
            if(_strLength==0 && isRequired == 0){
                return false;
            }

            if(_strLength==0 && isRequired == 1){
                return "不能为空";
            }
            if(!value.match(/^[\u0391-\uFFE5a-zA-z0-9\s]{6,20}$/)){
                return "请填写中文、英文、数字";
            }
        }else if(type == "chinese"){
            if(_strLength==0 && isRequired == 0){
                return false;
            }

            if(_strLength==0 && isRequired == 1){
                return "不能为空";
            }
            if(!value.match(/^[\u0391-\uFFE5]{1,}$/)){
                return "只能填写中文";
            }  
        }else if(type == "emailMobile"){
            if(_strLength==0 && isRequired == 0){
                return false;
            }

            if(_strLength==0 && isRequired == 1){
                return "不能为空";
            }
            if(!value.match(/\w+([-+.]\w+)*@\w+([-.]\w+)*.\w+([-.]\w+)*/) && !value.match(/^1[0-9]{10}$/)){
                return "格式有误"
            }
        }else if(type == "email"){
            if(_strLength==0 && isRequired == 0){
                return false;
            }

            if(_strLength==0 && isRequired == 1){
                return "不能为空";
            }
            if(!value.match(/\w+([-+.]\w+)*@\w+([-.]\w+)*.\w+([-.]\w+)*/)){
                return "格式有误"
            }
        }else if(type == "mobile"){
            if(_strLength==0 && isRequired == 0){
                return false;
            }

            if(_strLength==0 && isRequired == 1){
                return "不能为空";                
            }
            if(!value.match(/^1[0-9]{10}$/)){
                return "格式有误"
            }
        }else if(type == "phone"){
            if(_strLength==0 && isRequired == 0){
                return false;
            }

            if(_strLength==0 && isRequired == 1){
                return "不能为空";                
            }
            if(!value.match(/^(0[0-9]{2,3})?(\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/)){
                return "格式有误"
            }
        }else if(type == "qq"){
            if(_strLength==0 && isRequired == 0){
                return false;
            }

            if(_strLength==0 && isRequired == 1){
                return "不能为空";                
            }
            if(!value.match(/^[0-9]{5,11}$/)){
                return "格式有误"
            }
        }else if(type == "file"){
            if(_strLength==0 && isRequired == 0){
                return false;
            }
            if(_strLength==0 && isRequired == 1){
              return "上传文件不能为空";
            }
            if(getFileType(value)!="zip"){
              return "必须为zip格式"
            }
        }else{
          null;
        }
        return false;
    }

    init();
}    