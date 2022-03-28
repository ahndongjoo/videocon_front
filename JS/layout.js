$(document).ready(function(){

	//헤더 비동기
	layOutData()

	//헤더 스크롤 반응
	$(window).scroll(function(){ 
		var scrollValue = $(document).scrollTop(); 
		if(scrollValue >= 5 ){

			$("#header").css("position" , "fixed");
			$("#header").css("background-color" , "#fff");
			
		}else{
			$("#header").css("position" , "relative");
		}
	});
});

//헤더 , 푸터  비동기
function layOutData (){

	//헤더
	fetch("/include/header.html")
	  .then(response => {
		return response.text()
	})
	.then(data => {
		document.querySelector("header").innerHTML = data;
		LoginState()

	//헤더 메뉴 슬라이더
	$(".gnb_depth").on('mouseenter', function(){  
		$(this).find("ul").stop(true).slideDown();
	}).on('mouseleave' , function(){
		$(this).find('ul').stop(true).slideUp();
		});
	});

	//푸터
	fetch("/include/footer.html")
	  .then(response => {
		return response.text()
	  })
	  .then(data => {
		document.querySelector("footer").innerHTML = data;
	  });
};

function LoginState(){

	if(typeof UD === "undefined" || UD === "null"){
		$(".login_box").css("display" , "block")

	}else{
		$(".login_box").css("display" , "none")
		$(".user_box").css("display" , "block");
	}

	//로그인 상태 비동기 처리
	$.ajax({
		headers : {"Authorization" : "Basic " + UD},
		url:`${E}/api/v1/user/profile`,
		method: 'GET',
		dateType: 'JSON',
		success: function(data){

			var cli = "CLIENT";
			var art = "ARTRATOR";

			LogOutData ();

			//header Data change
			$(".user_nick em").text(data.nickname);
			$(".user_name").text(data.nickname);
			$(".user_img").attr("src" , data.thumbnail);
			$(".user_img2").attr("src" , data.thumbnail);

			//유저 상태에 따른 메뉴 변환
			if(UT == "1" || UD != "null"){
				$(".user_type em").text(cli);
				$(".user_box").fadeIn(100);

			} 
			if(UT == "2"){
				$(".user_type em").text(art);
			}

			//마이페이지 메뉴
			var link = document.location.href;
			if(link.includes("mypage2")){
				mypageMenu(data)
			}

			//알람메세지 상태 , 채팅
			// ((data.alarm == true) ? $(".other_box ul li .other_num1").css("display" , "block") : $(".other_box ul li .other_num1").css("display" , "none"))
			// ((data.notReadMsg == true) ? $(".other_box ul li .other_num2").css("display" , "block") : $(".other_box ul li .other_num2").css("display" , "none"))

		},error:function(error){

		}
	});;
}

//유저 데이터 슬라이드 및 로그아웃 이벤트
function LogOutData(){
	
	// 유저 간편 메뉴 슬라이드
	$(".user_box .img_box").on("click" , function(){
		$(".user_info2").css("display" , "none");
		$(".user_info1").slideToggle(300);
	});

	$(".logout_btn").on("click" , function(){
		var result = confirm('로그아웃 하시겠습니까?');

		if(result){
			$.cookie('UD' , null,{ path : '/' });
			$.cookie('UT' , null,{ path : '/' });
			$.cookie('CT' , null,{ path : '/' });
			location.href = '/index.html';
		}else{
		
		}
	});
};

// 마이페이지 메뉴 비동기 
function mypageMenu(data) {
	
	fetch("/include/menu.html")
	  .then(response => {
		return response.text()
	})
	.then(data => {
		$(".mp_common").append(data); 
		$(".mp_loading").fadeIn(100).delay(300).fadeOut(300); // 마이페이지 로딩바 
	});

	setTimeout(function(){
		$(".left_common").css("display" , "block");
	},500);

	setTimeout(function(){

		//기본 콘테스트 텝 활성화
		$(".m_pro ul li:nth-child(1) a").addClass("on");
		$(".m_info ul li:nth-child(1) a").addClass("on");

		// 사용자 타입 설정
		$(".type_state").val(UT);
		
		//클라이언트
		if(UT == 1){
			$(".type_box span").text("CLIENT");
			$(".ud_btn1").css("display" , "block");

		} else{
		// 아트레이트 
			$(".type_box span").text("ARTRATOR");
			$(".m_pro ul li:nth-child(1) span").text("참여한 콘테스트");
			$(".m_pro ul li:nth-child(5)").css("display" , "block");
			$(".ud_btn2").css("display" , "block");
		}
		
		//SMS 수신동의
		if(data.ads == "1"){
			$(".sns_check").prop("checked" , true);
			$(".sns_check").val("1");
		} else{
			$(".sns_check").prop("checked" , false);
			$(".sns_check").val("0");
		}

		// 마이페이지 정보
		$(".pro_box .img_box img").attr("src" , data.thumbnail); //유저 프로필 이미지
		$(".nickname").text(data.nickname); // 유저 닉네임 
		$(".join_date span em").text(data.createDate); // 가입날짜
		$(".info_name").val(data.name) //이름
		$(".info_id").val(data.account) // 아이디
		$(".info_nick").val(data.nickname) //닉네임
		$(".info_email").val(data.email) //이메일
		$(".sns_check").val(data.ads) //이메일
		$(".info_bizname").val(data.bizName) //사업자 정보
		$(".info_phone").val(data.phone) // 번호

	},200)

	//마이페이지 텝 활성화
	$(".common_state ul li").on("click" , function(){
		
		var idx = $(this).index();

		$(".common_state ul li").find("a").removeClass("on");
		$(".common_state ul li").eq(idx).find("a").addClass("on");
	});
};

//유저 타입 변경
function userTypeChange(){
	
    if($(".type_state").val() == "2"){
        alert("클라이언트로 전환이 되었습니다");
        $(".type_state").val("1")

    }else{
        if($(".type_state").val() == "1"){
            alert("아트레이터로 전환이 되었습니다");
            $(".type_state").val("2");
        }
    }
    
    $.ajax({
        headers :{"Authorization" : "Basic " + UD},
        url :`${E}/api/v1/user/convert`,
        method:'PUT',
        data: {
            state : $(".type_state").val()
        },
        success: function(data){
            $(".type_state").val(data.state);
            $.cookie('UD' , null,{ path : '/' });
            $.cookie('UD' , data.token,{ path : '/' });
            $.cookie('UT' , null,{ path : '/' });
            $.cookie('UT' , data.state,{ path : '/' });
            window.location.reload();

        },error:function(err){

            console.log(err)
        }
    })
};

// 프로필 이미지 변경
function proImg(input) {
    if (input.files && input.files[0]) {

        var reader = new FileReader();

        reader.onload = function (e) {
            $(".change_img").attr('src', e.target.result);
            $(".profile_img").removeClass("profile_ani");
            };
            reader.readAsDataURL(input.files[0]);

        var form = $('#profiie_form')[0];      
        var formData = new FormData(form);

        $.ajax({
            headers : {"Authorization" : "Basic " + UD},
            url:`${E}/api/v1/user/thumbnail`,
            method: 'POST',
            contentType : false,
            processData :false,
            data: formData,
            success: function(data){
                $(".pro_box .img_box img").attr("src" , data.fileURL); // 유저 프로필
                $(".header .user_box .img_box .user_img").attr("src" ,data.fileURL ); // 헤더 프로필

            },error: function(){
                alert("실패");
            }
        });
}};

function AlarmMenu(){

	// 유저 간편 메뉴 슬라이드
	$(".user_info1").css("display" , "none");
	$(".user_info2").slideToggle(300);

	$.ajax({
        headers: { Authorization: "Basic " + UD },
        url: `${E}/api/v1/mention`,
        method:"GET",
        success: function(data){

            if(data.length >= 1){

				//새로운 알림 리스트 초기화
				$(".user_info2 ul").html("");

                data.map(x => {
                    var alarmList = 
                        `
                        <li data-idx=${x.idx} data-read=${x.read}>
                            <div class="middle_box">
                                <span>${x.type}</span>
                                <h2>${x.content}</h2>
                                <p>${x.contestName}</p>
                            </div>
                            <div class="alarm_date">
                                <span>${x.date}</span>
                            </div>
                        </li>
                        `	
					$(".user_info2 ul").append(alarmList);
                });

				var idxArr = []
                var readlist = $(".user_info2 ul li");
                idxArr.forEach.call((readlist) , (item , idx) =>{
                    if($(item).attr("data-read") == 1){
						$(item).remove();
					}
                });

                // 새로운 알림 갯수
				var newReadNum = $(".user_info2 ul li").length;
				$(".alarm_num2").text(newReadNum);
				
				//새로운 알림 기본 값
				(($(".alarm_num2").text() == 0) ? $(".alarm_bg").css("display" ,"block") : $(".alarm_bg").css("display" ,"none"))
            }

        },error :function(err){
            console.log(err);
        }
    })
};

function AlarmMenuRead(){
	
	var idxArr = []
    var readlist = $(".user_info2 ul li");
    idxArr.forEach.call((readlist) , (item , idx) =>{
        $(item).remove();
		$(".alarm_num2").text(0);
    });

    $.ajax({
        headers: { Authorization: "Basic " + UD },
        url: `${E}/api/v1/mention/read-all`,
        method:"PATCH",
        success: function(data){
			$(".alarm_bg").css("display" ,"block");
        }
    });
};

