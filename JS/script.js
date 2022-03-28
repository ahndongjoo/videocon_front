// 스크롤 탑
function GoTop() { 
	window.scrollTo({top:0, behavior:'smooth'});
}

// 인풋박스 포커스 기능 border효과
$(function(){
	$("input ,select , textarea , .search_common .search_bar input").on("focus" , function(){
		$(this).css("border-color" , "#56BF93");
		$(".search_common .search_bar").css("border-color" , "#56BF93");
		$(this).css("color","#000");
	});

	$("input ,select , textarea , .search_common .search_bar input").on("blur" , function(){
		$(this).css("border-color" , "#ddd");
		$(".search_common .search_bar").css("border-color" , "#ddd");
		$(this).css("color","#000");
	});
});

//슬릭 슬라이더 초기화
function unSlick() {
    if ($(".pro_slide ul").hasClass("slick-initialized")) {
        $(".pro_slide ul").slick("destroy");
    }
}

//스크롤 none
function ScrollActive() {
    document.documentElement.style.overflowY = "scroll";
};

// 콘테스트 공통 팝업 컨트롤
$(".popup_close").on("click" , function(){
	//모달창 닫기
	$(".read_popup").fadeOut(300);

	//닫기 애니메이션 제거
	$(".popup_box1 .popup_inner.active").removeClass("active");
	$(".popup_box2 .popup_inner.active").removeClass("active");
	$(".popup_box3 .popup_inner.active").removeClass("active");

	var sss = $(this).closest(".read_popup").find("video").attr("src" ,"#");
	ScrollActive()
	unSlick() //아트레이터 내작품 보기 초기화
});

//모바일 열기 & 닫기
$(function(){
	$(".m_hamber").on("click" , function(){
		$(".header_mobile").toggleClass("on");
		$(".mobile_bg").toggleClass("on");
		$("body").css('overflow','hidden').css('display','fixed');
	});
	$(".close_btn , .mobile_bg").on("click" , function(){
		$(".header_mobile").removeClass("on");
		$(".mobile_bg").removeClass("on");
		$("body").css('overflow','auto').css('display','fixed');
	});
});

//모바일 슬라이더
$(".m_miBox ul li").click(function(){
	$(this).find(".m_depth2").stop(true).slideToggle();
	$(this).find("a").toggleClass("on");	
});

//서브 탭 메뉴 슬라이더
$(".tab_menu").on("mouseenter" , function(){
	$(this).find("ul").stop(true).slideDown();
}).on('mouseleave' ,function(){
	$(this).find("ul").stop(true).slideUp();
});

//서브 탭 메뉴 텍스트 체인지
$(".tab_depth ul li").on("click",function(){
	var currenCate = $(this).children("a").text();
	var selectCate = $(this).parent("ul").parent(".tab_depth").siblings("a")
	selectCate.text(currenCate);
	selectCate.css("color" , "#ef4d4d");

});

//검색 효과
$(".search_form").on("click" , function(){
	
	$(".search_input").toggleClass("active");
	$(".search_form").toggleClass("active");
	$(".search_input").val("");
	$(".search_input").focus();
	// $(this).attr("src" , "/img/search_icon(red).png")
})

// 스크롤탑 버튼
$('.top_btn').click(function(){
	$('html , body').animate({scrollTop : 0}, 600);
});

//모달창 클릭 페이드 인 체크
function modal_Btn(target){
	var get = $(target).data('modal');
	
	$(get).fadeIn(200);
	$("body").css('overflow','hidden').css('display','fixed');

	$(".m_close").on("click" , function(){
		$(".modal_agree").fadeOut(200);
		$("body").css('overflow','auto').css('display','fixed');
	});
};

//기본 팝업 닫기
$(".m_close").on("click" , function(){
	$(".modal_agree").fadeOut(200);
	$("body").css('overflow','auto').css('display','fixed');
});

//모달창 획인 체크
function mCheck(target){
	var checkNumber = $(target).data('check');
	$(checkNumber).prop('checked' , true);
	$(".modal_agree").fadeOut(300);
};

//카테고리 탭 메뉴 효과
$(function(){
	$(".cate_box > ul li:nth-child(1)").addClass("on");
	
	var stabBtn = $(".cate_box > ul li");
		stabBtn.click(function(){
		stabBtn.removeClass("on");
		$(this).addClass("on");
	});
});

//마이페이지 찜 탭 메뉴
$(function(){
	$(".st_btn ul li:nth-of-type(1)").addClass("active");
	var stabBtn = $(".st_btn > ul li");
		stabBtn.click(function(){
		stabBtn.removeClass("active");
		$(this).addClass("active");
	});
});

// 페이지 active 폼 
$(function(){
	var path = window.location.href;
	$('.mycl_menu ul li a').each(function() {
		if (this.href === path) {
		$(this).addClass('active');
		}
	});
});

// 마이페이지 메뉴 active
$(document).ready(function(){
	var path = window.location.href;
	
	$(".mypage_menu ul li a").each(function(){
		if(this.href == path){
			$(this).addClass("active");

		} else{
			if(path.includes("user_info")){
				$(".mypage_menu ul li:nth-child(1) a").addClass("active");
			}else{

			}
		}
	});
});

// 엔터 치환
// $(".common_script").on("change" , function(){
//     var text = document.getElementsByClassName("common_script")
//     var result = text.value.replace(/(\n|\r\n)/g, '<br>');
//     text.value.replace(/(\n|\r\n)/g, '<br>');
// });

//참가하기 검증
$(".mparti_btn").on("click" ,function(){
    if(UD === undefined || UD == "null"){
		alert("로그인 후 이용해주세요");
	}else{
		location.href = "/sub/contest_list/contest_ing/parti.html";
	}
});

//프로모션 이탈율 확인
function proMoClick(){
	$.ajax({
        headers: { Authorization: "Basic " + UD },
        url: `${E}/api/v1/survey`,
        method: "POST",
        success: function (data) {
            
        },
        error: function (err) {
            console.log(err);
        },
    });
};

//자주묻는 질문 
$(".faq_box ul li a").on('click', function(){
	$(this).toggleClass("faq_on");
	$(this).closest('li').siblings().find('a').removeClass('faq_on');

	$(this).next().slideToggle(200);
	$(this).closest('li').siblings().find('.faq_depth').slideUp(200);
});

// 채널톡 
(function() {
	var w = window;
	if (w.ChannelIO) {
	return (window.console.error || window.console.log || function(){})('ChannelIO script included twice.');
	}
	var ch = function() {
	ch.c(arguments);
	};
	ch.q = [];
	ch.c = function(args) {
	ch.q.push(args);
	};
	w.ChannelIO = ch;
	function l() {
	if (w.ChannelIOInitialized) {
		return;
	}
	w.ChannelIOInitialized = true;
	var s = document.createElement('script');
	s.type = 'text/javascript';
	s.async = true;
	s.src = 'https://cdn.channel.io/plugin/ch-plugin-web.js';
	s.charset = 'UTF-8';
	var x = document.getElementsByTagName('script')[0];
	x.parentNode.insertBefore(s, x);
	}
	if (document.readyState === 'complete') {
	l();
	} else if (window.attachEvent) {
	window.attachEvent('onload', l);
	} else {
	window.addEventListener('DOMContentLoaded', l, false);
	window.addEventListener('load', l, false);
	}
})();
ChannelIO('boot', {
	"pluginKey": "21e6647c-6652-4037-b031-fe1ea8075ef1"
});

// Google Analytics
window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'UA-210532191-1');


$(document).ready(function(){
	$(".text_box").fadeIn(1000);
})





