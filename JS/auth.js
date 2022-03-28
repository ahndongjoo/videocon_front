//엔터 로그인
$('#login_pw').on('keypress', function(e){
	if(e.keyCode == '13'){
	LoginBtn();
	}
});

function LoginBtn(){
	var PlatVal = parseInt(1);
	var idSl =  $("#login_account").val();
	var pwSl =  $("#login_pw").val();

	$.ajax({
		url: `${E}/api/v1/login`,
		method: 'POST',
        dateType: 'JSON',
		data: {
			account : idSl,
			pw : pwSl,
			platform : PlatVal
		},
		success: function(data){
			
			//로그인 유지시
			$.cookie('UD' , null,{ path : '/' });
			$.cookie('UT' , null,{ path : '/' });
			$.cookie('UD' , data.token,{ path : '/' });
			$.cookie('UT' , data.state,{ path : '/' });

			location.href = "/index.html";

		},error:function(request, status, error){

			alert("아이디와 비밀번호를 확인해주세요");
		}
	})
};

//휴대폰 인증
$(".import_btn").on("click" , function(){
	var sArt = $("input:checked[name='s_art']").is(":checked");
	var sCil = $("input:checked[name='s_cli']").is(":checked");
	var sInfo = $("input:checked[name='s_info']").is(":checked");

	if(sArt && sCil && sInfo){
		Auth(); // 아임포트 휴대폰인증
	}else{
		alert("(필수) 약관동의를 체크해주세요.");
	}
});

// 아임포트 휴대폰 본인인증
function Auth(){
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

							//아이디 중복확인 
							if(data.success == false){
								alert("이미 가입된 정보입니다.");
								location.href = "/sub/member/login/index.html";
							}
							
							// 회원가입 정보 입력
							$("#name").val(data.name);
							$("#imp_uid").val(rsp.imp_uid);

							// 페이지 이동 css
							$(".join_signform").css("display" , "none");
							$(".join_infoform").fadeIn(800);

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

// input ID
var userID = $("#uid");
var userPwd = $("#pwd");
var userPwdCheck = $("#pwdCheck");
var userName = $("#name");
var userNick = $("#unick");
var userEmail = $("#mail");
var comName = $("#com_name");

// 정규식
var id_reg = /^[a-zA-z0-9]{4,15}$/;
var pwd_reg = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,30}$/
var pwd_reg2 = /^(?=.*[a-zA-Z])(?=.*[0-9]).{10,12}$/

var nick_reg = /^[가-힣a-zA-Z0-9]{2,15}$/;
var mail_reg = /^[a-zA-Z0-9._+-]+@[a-zA-Z0-9._+-]+\.[a-zA-Z0-9.]/;

// 아이디 유효성 검사
$(userID).on("focusout" , function(){
    var account= $("#uid").val();
    $.ajax({
        url:`${E}/api/v1/find/exist?account=${account}`,
        method:'GET',
        success: function(data){
            
            if(userID.val() == ""){
                $(".alert_id").fadeIn(300);
                $(".alert_id").children("span").html("아이디를 입력해주세요.");
                $(".alert_id2").fadeOut(300);
                $(".uid").removeClass("active");
                userID.focus()
                return false;
            }
            if(!id_reg.test(userID.val())){
                $(".alert_id").fadeIn(300);
                $(".alert_id").children("span").html("아이디는 영문 4~15자로 입력해주세요.");
                $(".alert_id2").fadeOut(300);
                $(".uid").removeClass("active");
                userID.focus()
                return false;
            }
            if(data == true){
                $(".uid").addClass("active");
                $(".alert_id").fadeOut(300);
                $(".alert_id2").fadeIn(300);
                $(".alert_id2").children("span").html("사용가능한 아이디입니다.");
            } else {
                $(".alert_id2").fadeOut(300);
                $(".uid").removeClass("active");
                $(".alert_id").fadeIn(300);
                $(".alert_id").children("span").html("사용이 불가능한 아이디 입니다.");
                userID.focus()
            }
        },error: function(){
            alert("실패");
        }
    });
});

// 비밀번호 유효성 검사
$(".pwd_common").on("keyup" , function(){
    
    if(!pwd_reg.test(userPwd.val())){
        $(".alert_pwd1").fadeIn(300);
        $(".alert_pwd1").children("span").html("비밀번호는 영문, 숫자 ,특수문자를 포함하여 8자이상 입력해주세요")
        $(".alert_pwd3").fadeOut(300);
        $(".pwd_common").removeClass("active");
        return false;
    }

    if(userPwd.val()!= userPwdCheck.val()){
        $(".alert_pwd2").fadeIn(300);
        $(".alert_pwd2").children("span").html("비밀번호가 일치하지 않습니다.")
        $(".alert_pwd1").fadeOut(300);
        $(".alert_pwd3").fadeOut(300);
        $(".pwd_common").removeClass("active");
        return false;
   
    }else {
        if(userPwd.val() == userPwdCheck.val()){
            $(".alert_pwd3").children("span").html("비밀번호가 일치합니다.")
            $(".alert_pwd3").fadeIn(300);
            $(".alert_pwd1").fadeOut(300);
            $(".alert_pwd2").fadeOut(300);
            $(".pwd_common").addClass("active");
            return false;
        }
    }
});

// 이름 유효성 검사
$(document).ready(function(){
    if(userName.val() !== ""){
        $(".uname").addClass("active");
    } else {
        $(".uname").removeClass("active");
        userName.focus()
    }
});


// 닉네임 유효성  검사
$(userNick).on("keyup" , function(){
    if(userNick.val() == ""){
        $(".alert_nick").fadeIn(300);
        $(".alert_nick2").fadeOut(300);
        $(".alert_nick").children("span").html("닉네임을 입력해주세요.");
        $(".unick").removeClass("active");
        return false;

    }
    if(!nick_reg.test(userNick.val())){
        $(".alert_nick").fadeIn(300);
        $(".alert_nick2").fadeOut(300);
        $(".alert_nick").children("span").html("올바른 닉네임 형식이 아닙니다.");
        $(".unick").removeClass("active");
        return false;

    } else {
        $(".alert_nick2").children("span").html("사용가능한 닉네임 입니다.");
        $(".alert_nick2").fadeIn(300);
        $(".alert_nick").fadeOut(300);
        $(".unick").addClass("active");
        return true;
    }

});

// 이메일 유효성 검사
$(userEmail).on("keyup" , function(){
    if(userEmail.val() == ""){
        $(".alert_mail").fadeIn(300);
        $(".alert_mail2").fadeOut(300);
        $(".alert_mail").children("span").html("이메일을 입력해주세요.");
        $(".mail").removeClass("active");
        return false;
    }
    if(!mail_reg.test(userEmail.val())){
        $(".alert_mail").fadeIn(300);
        $(".alert_mail2").fadeOut(300);
        $(".alert_mail").children("span").html("올바른 이메일 형식이 아닙니다.");
        $(".mail").removeClass("active");
        return false;

    } else {
        $(".alert_mail").fadeOut(300);
        $(".alert_mail2").fadeIn(300);
        $(".alert_mail2").children("span").html("올바른 이메일 형식입니다.");
        $(".mail").addClass("active");
        return true;
    }
    
});

function joinBtn(){
	var CCheck = $("input:checked[name='c_check']").is(":checked");

	var ArtData = {
		platform: 1,
		type: $('input[name="type"]:checked').val(),
		ads: $('input[name="ads"]').val(),
		account: $("#uid").val(),
		pw: $("#pwd").val(),
		nickname: $("#unick").val(),
		imp_uid: $("#imp_uid").val(),
		email: $("#mail").val(),
	};

	var CliData = {
		platform: 1,
		type: $('input[name="type"]:checked').val(),
		ads: $('input[name="ads"]').val(),
		account: $("#uid").val(),
		pw: $("#pwd").val(),
		nickname: $("#unick").val(),
		imp_uid: $("#imp_uid").val(),
		email: $("#mail").val(),
		biz: {
			ceo: $(".ceo").val(), 
			name: $(".bizName").val(), 
			number: $(".bizNum").val()
		}
	};

	$.ajax({
        url: `${E}/api/v1/register`,
        method: 'POST',
        dateType: "json",
        data: (CCheck) ? CliData : ArtData,
        success: function(data){
			location.href = 'success.html'
        },error: function(){
            alert("다시 한번 확인해주세요.")
        }
    })
};

// 회원가입 단계 css
$("input[name='type']").on("change" , function(){
	var jt = $("#art_type").val();
	var ct = $("#cli_type").val();
	if($(this).is(':checked')){
		$(".join_typeform").css("display" , "none");
		$(".join_signform").fadeIn(800);

	} else {
		
	}
});

// 전체동의 체크박스
$("#s_all").on("change" , function(){
	var length = $(".sign_middle input[type=checkbox]");

	if($("#s_all").prop("checked")){
		$(".sign_middle input[type=checkbox]").not(this).prop("checked" , true).trigger('change');
	}else {
		$(".sign_middle input[type=checkbox]").not(this).prop("checked" , false).trigger('change');
	}
});

//SNS 수신동의 선택
$("#ads").on("change" , function(){
	var ag = "1"
	var dag = "0"
	if($("#ads").prop("checked")){
		$("#ads").prop("checked" , true)
		$("#ads").val(ag);
	}else{
		$("#ads").prop("checked" , false);
		$("#ads").val(dag);
	}
});

// 사업자명 체크박스 체크여부(fade)
$("#c_check").on("change" , function(){
if($("#c_check").prop("checked")){
	$("input[type=checkbox]").prop("checked" , true)
	$(".com_info").fadeIn(500);       
}else{
	$("input[type=checkbox]").prop("checked" , false)
	$(".com_info").fadeOut(500);
}
}); 

var rStr = "";

// 사업자 검색 팝업
$(".bizmodal").on("click" ,function(){
	$(".biz_search").fadeIn(300);
	$("#searchBiz").val('');
	resetBiz();
});

// 사업자명 닫기 버튼 
	$(".search_close").on("click" , function(){
	$(".biz_search").fadeOut(300);
	$("#searchBiz").val('');
});

// 사업자 데이터 리셋 메시지 표시
function resetBiz (){
	var rStr = '';
	rStr += '<tr>';
	rStr += '<td colspan="4" class="item_one">';
	rStr += '사업자명을 검색해주세요';
	rStr += '</td>';
	rStr += '</tr>';
	$(".coper_bodydata").html(rStr);
};

// 사업자 검색결과 0 일때
function noResultBiz (){
	var rStr = '';
	rStr += '<tr>';
	rStr += '<td colspan="4" class="item_one">검색결과가 0건입니다<br>';
	rStr += '회사정보를 직접 입력하여 회원가입을 진행해주세요!<br>';
	rStr += '</td>';
	rStr += '</tr>';
	$(".coper_bodydata").html(rStr);
};


var Currentpage = 1;
var sn;
var dataTotal;
var dataGroup;
var dataLength = 10 ;
var dataGroup2 
var pn;

// 사업자 조회 & 검색
function searchBiz(){
	var searchName = $("#searchBiz").val();
	sn = searchName;
	
	//초기화 
	event.preventDefault();
	$(".coper_bodydata").html("");
	$(".search_bot table").fadeIn(200);

	if(searchName === ""){
		alert("검색어를 입력해주세요.")
		$(".bizname").focus();
		return;
	}

	$.ajax({
		url: `${E}/api/v1/find/biz?keyword=${searchName}&page=${(typeof Currentpage == "undefined" ?  1 : 1)}`,
		method:'GET',
		dataType: 'JSON',
		beforeSend: function(){
			$(".main_loading").css("display" , "block");
		},
		success: function(data){

			$(".main_loading").css("display" , "none");
			
			dataToal = data.total ;
			dataGroup = Math.ceil(Currentpage/10)

			//사업자 리스트
			if(typeof data !== "undefined" && data.list.length > 0){
				data.list.map( x => {
					var bizList =
					`
					<tr onclick="selectBizInfo('${x.bizName}' , '${x.bizNum}' , '${x.ceo}', '${x.address}'); editBiz('${x.bizName}' , '${x.bizNum}' , '${x.ceo}')">
						<td>${x.bizName}</td>
						<td>${x.bizNum}</td>
						<td>${x.ceo}</td>
						<td>${x.address}</td>
					</tr>
					`
					$(".coper_bodydata").append(bizList);
				});

				pageRander(dataToal , dataGroup , Currentpage)

			} else {
				noResultBiz();
			}

		},error: function(xhr){
			$(".main_loading").css("display" , "none");
			alert("검색결과가 존재하지 않습니다.")
		}
	})
};

function pageRander(dataTotal , dataGroup , Currentpage){

	//페이지 수
	// if(dataGroup > 0){
	// 	$(".pagination ul").html("");
	// 		for(let i=1; i < 10; i++){
	// 			var pageList = 
	// 				`
	// 			<li data-pagenum="${i}">
	// 				<a class="page_num" href="javascript:;">${i}</a>
	// 			</li>
	// 			`
	// 		$(".pagination ul").append(pageList)
	// 	}
	// }
	
	$(".pagination ul li").click(function(){
		var searchName = $("#searchBiz").val();
		sn = searchName;
		
		var pn = $(this).data("pagenum");
		pn == Currentpage;

		$.ajax({
			url: `${E}/api/v1/find/biz?keyword=${searchName}&page=${pn}`,
			method:'GET',
			dataType: 'JSON',
			beforeSend: function(){
				$(".coper_bodydata").html("");
				$(".main_loading").css("display" , "block");
			},
			success: function(data){
	
				$(".main_loading").css("display" , "none");
				
				dataToal = data.total ;
				dataGroup = Math.ceil(Currentpage/10)
				console.log(dataGroup);
	
				//사업자 리스트
				if(typeof data !== "undefined" && data.list.length > 0){
					$(".coper_bodydata").html("");
					
					data.list.map( x => {
						var bizList =
						`
						<tr onclick="selectBizInfo('${x.bizName}' , '${x.bizNum}' , '${x.ceo}', '${x.address}'); editBiz('${x.bizName}' , '${x.bizNum}' , '${x.ceo}')">
							<td>${x.bizName}</td>
							<td>${x.bizNum}</td>
							<td>${x.ceo}</td>
							<td>${x.address}</td>
						</tr>
						`
						$(".coper_bodydata").append(bizList);
					});
	
					pageRander(dataToal , dataGroup , pn)
	
				} else {
					noResultBiz();
				}
	
			},error: function(xhr){
				$(".main_loading").css("display" , "none");
				alert("검색결과가 존재하지 않습니다.")
			}
		})
	});
};


// 사업자 리스트 정보 전달 
function selectBizInfo (bn , bn2 , cn , adr){
	$(".biz_search").fadeOut(300);
	$(".bizName").val(bn);
	$(".ceo").val(cn);
	$(".bizNum").val(bn2);
	$(".address").val(adr);
	$(".bizName").css("border-color" , "#49ec09")
};

// 사업자 등록 직접입력
function selfBtn() {
	$("#address").val("");
	var selfName = $("#self_bname").val();
	var selfNumber = $("#self_bnumber").val();
	var selfCeo = $("#self_bceo").val();

	if(selfName === ""){
		alert("사업자명이 없습니다");
		$("#self_bname").focus();
		return;
	}
	if(selfNumber === ""){
		alert("사업자번호가 없습니다");
		$("#self_bnumber").focus();
	}else if (selfNumber.length != 10) {
		alert("사업자번호를 재확인 해주세요");
		$("#self_bnumber").focus();
		return;
	}
	if(selfCeo === ""){
		alert("대표자명을 입력해주세요");
		$("#self_bceo").focus();
	}

	$(".bizName").val(selfName);
	$(".ceo").val(selfCeo);
	$(".bizNum").val(selfNumber);
	$(".biz_search").fadeOut(300);
	$(".bizName").css("border-color" , "#49ec09")
};

// 주민번호 인증
function juminBtn(){
	$.ajax({
		url: `${E}/api/v1/auth/jumin`,
		method: 'POST',
        dateType: 'json',
		data: {
			birth : $("#h_birth").val(),
			backNum : $("#h_backnum").val(),
			name : $("#authName").val(),
		},
		success: function(data){
			if(data.authJumin != "undefiend"){

				alert("확인되었습니다");
				$("#authJumin").val(data.authJumin);

			}else{
				alert("인증에 실패하였습니다.")
			}

		},error: function(){
			alert("인증이 실패하였습니다.")
		}
	})
};

// 아이디 찾기
$(".id_search").on("click" , function(){
	IMP.init("imp86919051");
	IMP.certification(
	//파라미터 생략시 빈 object는 입력해줘야한것 같음. 제거 시 모듈 동작 안함.
			{},
			function (rsp) {
				//본인인증 성공 프로세스
				if (rsp.success) {
					$.ajax({
						url: `${E}/api/v1/find/cert`,
						type:"POST",
						dataType: 'json',
						data:{"imp_uid" :rsp.imp_uid},
						success: function(data){
							if(data.success == false){
								// 아이디 확인
								$(".m_top").css("display" , "none");
								$(".m_middle").css("display" , "none");
								$(".m_data").css("display" , "block");
								$(".m_data h2 em").text(data.account);
							}else{
								alert("가입된 정보가 없습니다.")
							}
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
});

// 비밀번호 찾기
$(".pw_search").on("click" , function(){
	IMP.init("imp86919051");
	IMP.certification(
	//파라미터 생략시 빈 object는 입력해줘야한것 같음. 제거 시 모듈 동작 안함.
			{},
			function (rsp) {
				//본인인증 성공 프로세스
				if (rsp.success) {
					$.ajax({
						url: `${E}/api/v1/find/cert`,
						type:"POST",
						dataType: 'json',
						data:{"imp_uid" :rsp.imp_uid},
						success: function(data){
							// 아이디 확인
							$(".m_top h3").text("비디오콘 비밀번호 변경")
							$(".m_top p").text("변경하고자 하는 비밀번호를 입력해주세요")
							$(".m_middle").css("display" , "none");
							$(".m_data").css("display" , "block");
							$(".authkey").val(data.authKey);
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
});

//인증 후 비밀번호 변경
$(".pw_change").on("click" , function(){
	$.ajax({
		url: `${E}/api/v1/find/pw`,
		type: 'PUT',
		dataType: 'json',
		data:{
			authKey : $(".authkey").val(),
			pw : $(".m_pw").val()
		},
		success: function(){
			//변경 후
			$(".m_data").css("display" , "none");
			$(".m_top h3").text("비밀번호 변경 완료")
			$(".m_top p").text("비밀번호 변경이 되었습니다")
			$(".m_middle").css("display" , "block");
			$(".m_middle dl:nth-child(1)").css("display" , "none");
			$(".m_middle .pw_logbox").css("display" , "block");

		},error:function(error){
		}
	})
});