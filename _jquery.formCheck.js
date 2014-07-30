$.fn.formCheck = function(option){

    var defaults={          
        
        //需要验证的样式名        
        className:'.check-form',
        //点击提交的样式名
        submitId: "#form-submit",
        //错误提示信息显示区域ID
        errorMessId: null,
        //正确的样式
        correctClass: "success",
        //错误的样式
        errorClass: "error",
        //表单检查成功，触发回调函数
        successCallback: function(){
            null;
        },
        errorCallback: function(){
            null;
        }
    };

    this.isCorrect = 0;

    var self = this;

    $.extend(defaults, option);

    function init(){
        
        //
        $(self).find("input[type='text'], input[type='password'], textarea").blur(function(){            
            
            // if(!checkIsChange($(this))){
            //     return true;
            // }
            var isCorrect = check(this);
            var isCheckOnly = checkIsOnly($(this));
            
            //检查输入框值的唯一性
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
          
            $(self).find("input[type='text'],input[type='password'],textarea").each(function(){
                
                if(!checkIsChange($(this))){
                    return true;
                }    
                var isCorrect = check(this);
                var isCheckOnly = checkIsOnly($(this));                
                
                if(isCorrect && isCheckOnly){
                    checkIsOnly($(this));
                }
                if(!self.isCorrect){
                    window.scrollTo(0,0);
                    return true;
                }
            });

            if(self.isCorrect){
                defaults.successCallback();
            }else{
                defaults.errorCallback();
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

    function check(obj){
        var _type = $(obj).attr("checkType");
        var _value = $.trim($(obj).val());        

        var isIgnore = $(obj).attr("isIgnore");
        isIgnore = isIgnore == "1" ? 1 : 0;
        // 获取输入框前面标题对象
        
        var errorStr = null;
        if(_value.length != 0){
            if(!regular(_value, _type)){
                errorStr = $(obj).attr("errormess");
            }
        }else{
            if(!isIgnore){
                errorStr = "不能为空";
            }
        }

        if(errorStr){
            self.isCorrect = 0;        
            try{
                var titleObj = $(obj).prev();
                var titleStr = titleObj.text();
                titleStr = titleStr.substr(0,titleStr.length - 1);
            }catch(e){
                var titleStr = "";                            
            }
            
            errorStr = titleStr + errorStr;
            showErrorMess(errorStr, obj);  

            return false;
        }else{            
            showCorrect(obj);
            return true;
        }

    }

    function showErrorMess(errorStr, obj){
        var errorObj;
        if(!defaults.errorMess){
            errorObj = getNextDom(obj);
        }else{
            errorObj = $(defaults.errorMessId);
        }

        $(errorObj).removeClass(defaults.correctClass).addClass(defaults.errorClass).html(errorStr);
    }

    function showCorrect(obj){
        var nextObj = getNextDom(obj);        
        nextObj.removeClass(defaults.errorClass).addClass(defaults.correctClass).html("");
    }

    function getNextDom(obj){
        var nextObj = $(obj).next();
        if(!nextObj.length){
            createNextDom(obj);
            nextObj = $(obj).next();
        }
        return nextObj;

    }

    function createNextDom(obj){
        $(obj).after("<span></span>");
    }
    function regular(value, type){        
        value = $.trim(value);
        var regularObj = {
            "chineseEnglish": /^[\u0391-\uFFE5a-zA-z0-9\s]{1,}$/,
            "chinese": /^[\u0391-\uFFE5]{1,}$/,
            "email": /\w+([-+.]\w+)*@\w+([-.]\w+)*.\w+([-.]\w+)*/,
            "phone": /^1[0-9]{10}$/,
            "qq": /^[0-9]{5,11}$/,
            "password": /^[a-zA-z0-9]{6,20}$/,
            "telphone": /^(0[0-9]{2,3})?(\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/
        };

        return regularObj[type].test(value);
    }

    init();
}    