function Myinfo(target){
    var foNum = $(target).data("fo");
    $(".info_cont").css("display" , "none");

    if(foNum == "0"){
        $(".info_cont1").fadeIn(300);
    }
    else if(foNum == "1"){
        $(".info_cont2").fadeIn(300);
    }
    else if(foNum == "2"){
        $(".info_cont3").fadeIn(300);
    }
}


//개인정보 변경
$(".info_submit").on("click" , function(){
    $.ajax({
        headers :{"Authorization" : "Basic " + UD},
        url :`${E}/api/v1/user/profile/set-profile`,
        method:'PUT',
        data: {
            nickname : $(".info_nick").val(), 
            email : $(".info_email").val(),
            ads : Number($(".sns_check").val())

        },
        success: function(data){
            window.location.reload();
            alert("변경되었습니다")

        },error: function(err){
            console.log(err);
            alert("실패")
        }
    })
});

//개인정보 수신동의 변경
$(".sns_check").on("change" , function(){
    var ag = 1
    var dag = 0

    if($(".sns_check").prop("checked")){
        $(".sns_checke").prop("checked" , true)
        $(".sns_check").val(ag);

    }else{
        $(".sns_check").prop("checked" , false);
        $(".sns_check").val(dag);
    }
});

//번호 변경
$(".change_num").on("click", function(){
    $.ajax({
        headers : {"Authorization" : "Basic " + UD},
        url :`${E}/api/v1/user/profile/set-phone`,
        method:'PUT',
        dataType: 'JSON',
        data: {
            phone : $(".info_number").val()
        },
        success: function(data){
            alert("변경되었습니다")
        
        },error :function(err){
            console.log(err);
        }
    })
});

$(".info_bizbtn").on("click" , function(){
    $(".biz_search").fadeIn(300);
});

function editBiz(bn , bn1 , cn){
    $.ajax({
        headers : {"Authorization" : "Basic " + UD},
        url :`${E}/api/v1/user/profile/set-biz`,
        method:'PUT',
        dataType: 'JSON',
        data: {
            bizName : bn,
            bizNum : bn1,
            ceo : cn

        },success: function(data){
            alert("변경되었습니다");
            $(".info_bizname").val(bn);

        },error :function(err){
            console.log(err);
            alert("실패");
        }
    })
};

// 아임포트 휴대폰 본인인증 후 전송
function selfPhone(){
	IMP.init("imp86919051");
	IMP.certification(
	//파라미터 생략시 빈 object는 입력해줘야한것 같음. 제거 시 모듈 동작 안함.
			{},
			function (rsp) {
				//본인인증 성공 프로세스
				if (rsp.success) {
					jQuery.ajax({
						url: `${E}/api/v1/find/cert`,
						type:"POST",
						dataType: 'json',
						data:{"imp_uid" :rsp.imp_uid},
						success: function(data){
                            selfPhoneChe(data.phone)
						},
						error:function(){
							alert("실패하였습니다.")
						},
					})	
				}
				//본인인증 실패 프로세스
				else{
					alert("인증에 실패하였습니다. 에러 내용: " +  rsp.error_msg);
				}
			}
		);
};

// 휴대폰 번호 변경
function selfPhoneChe(pn){
    $.ajax({
        headers : {"Authorization" : "Basic " + UD},
        url: `${E}/api/v1/user/profile/set-phone`,
        type:"PUT",
        dataType: 'json',
        data: {
            phone : pn
        },
        success: function(data){
            alert("휴대폰 번호가 변경되었습니다.")
        },
        error:function(err){
            console.log(err)
            alert("실패하였습니다.")
        },
    })	
};


//비밀번호 변경
$(".cpw_btn").on("click" , function(){
    var prePw = $(".info_currentpw").val();

    $.ajax({
        headers : {"Authorization" : "Basic " + UD},
        url :`${E}/api/v1/user/pw-check`,
        method:'POST',
        dataType: 'JSON',
        data: {
            currentPw : prePw
        },
        success: function(data){
            $(".pw_cont1").css("display" , "none");
            $(".pw_cont2").fadeIn(300);
            
        },error : function(err){
            alert("비밀번호가 올바르지 않습니다.")
            
        }
    })
});

// 엔터 비밀번호 변경
$('.info_currentpw').on('keypress', function(e){
	if(e.keyCode == '13'){
        var prePw = $(".info_currentpw").val();

        $.ajax({
            headers : {"Authorization" : "Basic " + UD},
            url :`${E}/api/v1/user/pw-check`,
            method:'POST',
            dataType: 'JSON',
            data: {
                currentPw : prePw
            },
            success: function(data){
                $(".pw_cont1").css("display" , "none");
                $(".pw_cont2").fadeIn(300);
                
            },error : function(err){
                alert("비밀번호가 일치하지 않습니다.")
                
            }
        })
	}
});

//비밀번호 최종 변경
$(".cpw_btn2").on("click" , function(){
    if($(".info_currentpw1").val() == $(".info_currentpw2").val()){
        $.ajax({
            headers : {"Authorization" : "Basic " + UD},
            url: `${E}/api/v1/user/pw-change`,
            type: 'PUT',
            dataType: 'JSON',
            data:{
                pw : $(".info_currentpw2").val()
            },
            success: function(data){
                alert("비밀번호가 변경되었습니다.");
                window.location.reload();
    
            },error:function(error){
                console.log(error);
                alert("비밀번호가 일치하지 않습니다.");
            }
        });
    }else{
        alert("비밀번호가 일치하지 않습니다.");
    }
});

// 엔터 비밀번호 변경
$('.info_currentpw2').on('keypress', function(e){
	if(e.keyCode == '13'){
        if($(".info_currentpw1").val() == $(".info_currentpw2").val()){
            $.ajax({
                headers : {"Authorization" : "Basic " + UD},
                url: `${E}/api/v1/user/pw-change`,
                type: 'PUT',
                dataType: 'JSON',
                data:{
                    pw : $(".info_currentpw2").val()
                },
                success: function(data){
                    alert("비밀번호가 변경되었습니다.")
                    window.location.reload();
        
                },error:function(error){
                    console.log(error);
                    alert("비밀번호가 일치하지 않습니다.")
                }
            });
        } else{
            alert("비밀번호가 일치하지 않습니다.")
        }
	}
});


