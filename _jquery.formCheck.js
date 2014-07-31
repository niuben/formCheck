$.fn.formCheck = function(option){

    var defaults={          
        //提交按钮的ID, 默认为空。没有填写的话，会自动寻找表单最后一个按钮。
        submitID: null,
        //错误提示信息显示区域ID（主要用于只能在一个位置上显示错误时）
        errorMessID: null,
        //填写正确加载的样式，默认是空
        correctClass: null,
        //填写错误加载的样式，
        errorClass: null,
        //当自带检查不能满足要求时，增加类型判断。比如每个业务对密码判断都不一样。
        addRegularObj: {},
        //表单检查成功，触发回调函数
        sucCallback: function(){
            null;
        },
        errCallback: function(){
            null;
        }
    };

    this.isCorrect = 0;

    var regularObj = {
        "chinese": /^[\u0391-\uFFE5]{1,}$/,        
        "english": /^[a-zA-z\s]{1,}$/,
        "number": /^[0-9]{1,}$/, 
        "chineseEnglish": /^[\u0391-\uFFE5a-zA-z0-9\s]{1,}$/,
        "email": /\w+([-+.]\w+)*@\w+([-.]\w+)*.\w+([-.]\w+)*/,
        "phone": /^1[0-9]{10}$/,
        "qq": /^[0-9]{5,11}$/,
        "telphone": /^(0[0-9]{2,3})?(\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/
    };

    var self = this;

    $.extend(defaults, option);

    function init(){
    
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

        var submitObj;
        if(defaults.submitID != null){
            submitObj = $("#" + defaults.submitID);
        }else{
            submitObj = getFormLastButton();
        }

        $(submitObj).click(function(e){      
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
                defaults.sucCallback();
            }else{
                defaults.errCallback();
            }

        });

        addRegular(defaults.addRegularObj);
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
    };

    //判断是否需要检查账号的唯一性
    function checkIsOnly(obj){
        var isCheckOnly = $(obj).attr("isCheckOnly");
        return isCheckOnly ? true : false;
    };

    //检查一个表单对象
    function check(obj){
        var _type = $(obj).attr("checkType");
        var _value = $.trim($(obj).val());        

        var isIgnore = $(obj).attr("isIgnore");
        isIgnore = isIgnore == "1" ? 1 : 0;
        // 获取输入框前面标题对象
        
        var errorStr = null;
        if(_value.length != 0){
            if(!checkRegular(_value, _type)){
                errorStr = $(obj).attr("errormess");
            }
        }else{
            if(!isIgnore){
                errorStr = "不能为空";
            }
        }

        if(errorStr){
            self.isCorrect = 0;        
            // try{
            //     var titleObj = $(obj).prev();
            //     var titleStr = titleObj.text();
            //     titleStr = titleStr.substr(0,titleStr.length - 1);
            // }catch(e){
            //     var titleStr = "";                            
            // }
            
            // errorStr = titleStr + errorStr;
            showErrorMess(errorStr, obj);  
            return false;
        }else{            
            showCorrect(obj);
            return true;
        }

    };

    function addRegular(obj){
        $.extend(regularObj, obj);
    };

    function checkRegular(value, type){        
        value = $.trim(value);
        return regularObj[type].test(value);
    };

    function showErrorMess(errorStr, obj){
        var errorObj;
        if(!defaults.errorMess){
            nextObj = getNextDom(obj);
        }else{
            nextObj = $(defaults.errorMessId);
        }

        if(defaults.correctClass || defaults.errorClass){
            $(nextObj).removeClass(defaults.correctClass).addClass(defaults.errorClass);
        }else{
            $(nextObj).css("color", "#F00");
        }
        $(nextObj).html(errorStr);

        $(obj).css("border-color", "#F00");
    };

    function showCorrect(obj){
        var nextObj = getNextDom(obj);
        if(defaults.correctClass || defaults.errorClass){
            nextObj.removeClass(defaults.errorClass).addClass(defaults.correctClass)
        }else{
            $(nextObj).css("color", "initial");
        }
        $(nextObj).html("");
        $(obj).css("border-color", "initial");        
    };

    function getFormLastButton(){
        return self.find("input[type='button'], input[type='submit']").last();
    }

    function getNextDom(obj){
        var nextObj = $(obj).next();
        if(!nextObj.length){
            createNextDom(obj);
            nextObj = $(obj).next();
        }
        return nextObj;
    };

    function createNextDom(obj){
        $(obj).after('<span style="margin-left: 5px;"></span>');
    };

    init();
}    