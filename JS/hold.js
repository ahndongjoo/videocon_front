var visibleDiv = 0;
var stepA = $(".step_container ul li a");
var stepBar = $(".step_bar");


//개최 플랜 슬라이드
$(".plan_top").on("click" ,function(){
    $(this).toggleClass('active')
    $(".plan_bottom").slideToggle(300);
});

//개최시 타입여부 확인 후 사업자 && 주민 등록여부
function holdAdd(st , pz) {

    $(".plan_box").css("display" , "none");

    //상금 선택 기본 설정
    (st == "1" || st == "2") ? $(".prize_info").css("display" , "none") : $(".prize_info").css("display" , "block") 
    
    if (UT == "1") {

        $(`.plan_box${st}`).fadeIn(300);
        $(".bar_box").css("display" , "block");
        $(".plan_container").attr("data-planNum" , `${st}`);

        //개최 다음단계 실행
        holdNext();

        $.ajax({
            headers: { Authorization: "Basic " + UD },
            url: `${E}/api/v1/contest/add`,
            method: "GET",
            success: function (data) {
                $(".bizName").val(data.bizName);
                $(".bizNum").val(data.bizNum);
                $(".ceo").val(data.ceo);
            },
            error: function (err) {
                console.log(err);
            },
        });
    } else if (UT == "2") {
        alert("마이페이지에서 [클라이언트]로 전환 후 이용해 주시길 바랍니다.");
    } else if (UD === undefined || UD == "null") {
        alert("로그인 후 이용 부탁 드립니다.");
    }
};

//개최하기 기본상태
$(stepBar).css("width", "25%");
$(stepA[0]).addClass("on");

//개최하기 스텝표시 및 버튼상태
function stepOn() {
    $(stepA).removeClass("on");
    $(stepA[visibleDiv]).addClass("on");
};

function DeleholdBtn() {
    $(".common_btn").css("display" , "none")
};

function showholdBtn() {
    $(".hold_prev").css("display", "block");
    $(".hold_next").css("display", "block");
};

function showSubBtn() {
    $(".hold_prev").css("display", "block");
    $(".hold_submit").css("display", "block");
};

//개최하기 폼FADE
function showHoldForm() {

    //개최 폼 기본 설정
    $(".holdmain_cont").hide();
    $(".hold_caution").hide();
    $(".holdmain_cont:eq(" + visibleDiv + ")").fadeIn(300);

    //버튼 지우기
    DeleholdBtn();

    switch(visibleDiv){
        case 0 : $(stepBar).css("width", "25%"); $(".hold_banner").html(""); $(".hold_caution").css("display" , "block"); $(".plan_box").css("display" , "none"); $(".bar_box").css("display" , "none"); break ;
        case 1 : $(stepBar).css("width", "25%"); showholdBtn(); break;
        case 2 : $(stepBar).css("width", "50%"); showholdBtn(); break;
        case 3 : $(stepBar).css("width", "75%"); DeleholdBtn(); showSubBtn(); break;
        case 4 : $(".plan_container").css("display", "none"); $(".step_container").css("display", "none"); $(".bar_box").css("display", "none"); break;
    }
}; 

//엔터 치환
$("#h_script").on("change", function () {
    var text = document.getElementById("h_script");
    var result = text.value.replace(/(\n|\r\n)/g, "<br>");
    text.value.replace(/(\n|\r\n)/g, "<br>");
});

$("#h_benefit").on("change", function () {
    var text = document.getElementById("h_benefit");
    var result = text.value.replace(/(\n|\r\n)/g, "<br>");
    text.value.replace(/(\n|\r\n)/g, "<br>");
});

//최대 글자수 제한
$('#h_script').keyup(function(){
    var thisVal = $(this).val();

    $(".text_count1 em").html(`${thisVal.length}`);
    
    if(thisVal.length > 300){
        alert("최대 300자까지 입력 가능합니다.");
        $(this).val(thisVal.substring(0, 300));
        $(".text_count1 em").html(`${300}`);
    }
});

$('#h_benefit').keyup(function(){
    var thisVal = $(this).val();

    $(".text_count2 em").html(`${thisVal.length}`);
    
    if(thisVal.length > 300){
        alert("최대 300자까지 입력 가능합니다.");
        $(this).val(thisVal.substring(0, 300));
        $(".text_count2 em").html(`${300}`);
    }
});

//개최하기 다음 및 유효성 검사
function holdNext(){
    if(visibleDiv == 1){
        if($(".recom_input").val() == "0"){
            alert("영상 제작 방식을 선택해주세요");
            return;
        }
        if($(".recom_input").val() == "2"){
            if($(".refurl_input").val() == "" && styleArr.length == 0){
                alert("원하는 제작 방식을 선택해주세요");
                return
            }
            if($("#recom_check").is(":checked") == true){
                if($(".refurl_input").val() == ""){
                    alert("참고 영상 URL을 입력해주세요")
                    return
                }else{
                    visibleDiv++;
                    stepOn();
                    showHoldForm();
                }
            }else{
                visibleDiv++;
                stepOn();
                showHoldForm();
            }
         }else{
            visibleDiv++;
            stepOn();
            showHoldForm();
         }
    }
    else if (visibleDiv == 2) {
        
        if($("#h_name").val() == ""){
            $("#h_name").css("border-color" , "#ef4d4d").addClass("hold_place")
            $("#h_name").attr("placeholder", "제목을 입력해주세요");
        }
        if($("#h_industry option:selected").val() == ""){   
            $("#h_industry").css("border-color" , "#ef4d4d").addClass("hold_place")
            $("#h_industry").val("").prop("선택해주세요" , true).css("color" , "#ef4d4d")
        }
        if($("#h_purpose option:selected").val() == ""){   
            $("#h_purpose").css("border-color" , "#ef4d4d").addClass("hold_place")
            $("#h_purpose").val("").prop("선택해주세요" , true).css("color" , "#ef4d4d")
            
        }
        if($("#h_videoLength option:selected").val() == ""){   
            $("#h_videoLength").css("border-color" , "#ef4d4d").addClass("hold_place")
            $("#h_videoLength").val("").prop("선택해주세요" , true).css("color" , "#ef4d4d")
            
        }
        if($("#h_videoRatio option:selected").val() == ""){   
            $("#h_videoRatio").css("border-color" , "#ef4d4d").addClass("hold_place")
            $("#h_videoRatio").val("").prop("선택해주세요" , true).css("color" , "#ef4d4d")
        }
        if($("#start_day").val() == ""){   
            $("#start_day").css("border-color" , "#ef4d4d").addClass("hold_place")
            $("#start_day").attr("placeholder", "시작일을 지정해 주세요.");
        } 
        if($("#end_day").val() == ""){   
            $("#end_day").css("border-color" , "#ef4d4d").addClass("hold_place")
            $("#end_day").attr("placeholder", "종료일을 지정해 주세요.");
        } 
        if($("#h_script").val() == ""){   
            $("#h_script").css("border-color" , "#ef4d4d").addClass("hold_place")
            $("#h_script").attr("placeholder", "작성 예시를 참고하여 입력해주세요.");
        }else{
            if(
                $("#h_script").val() == "" || 
                $("#end_day").val() == "" || 
                $("#h_videoRatio option:selected").val() == "" ||
                $("#h_videoLength option:selected").val() == ""||
                $("#h_purpose option:selected").val() == "" ||
                $("#h_industry option:selected").val() == "" ||
                $("#h_name").val() == ""
                ){
                return
            }else{
                visibleDiv++;
                stepOn();
                showHoldForm();
            }
        }
    }else {
        visibleDiv++;
        stepOn();
        showHoldForm();
    }
};

//개최하기 제출
function holdSubmit() {
    if(visibleDiv == 3){
        if($("#total_input").val() == ""){
            $("#total_input").css("border-color" , "#ef4d4d").addClass("hold_place")
            $("#total_input").attr("placeholder", "총 상금을 입력해주세요.");
        }
        if($("#h_payment option:selected").val() == ""){
            $("#h_payment").css("border-color" , "#ef4d4d").addClass("hold_place")
            $("#h_payment").val("").prop("선택해주세요", true).css("color" , "#ef4d4d")
        }
        if($("#check_agree").is(":checked") == false){
            alert("콘테스트 취소 및 환불 규정 약관을 체크해주세요.")
        }
        if($("#check_agree2").is(":checked") == false){
            alert("저작권 및 분쟁 관련 규정 약관을 체크해주세요.")
        }else{
            if(
                $("#total_input").val() == "" || 
                $("#h_payment option:selected").val() == "" || 
                $("#check_agree").is(":checked") == false ||
                $("#check_agree2").is(":checked") == false
            ){
                return
            }else{
                holdModal()
            }
        }
    }
};

function holdFinal() {

    //상금 데이터
    var rewardObj = [
        { reward: $("#prize_input").val(), rank: 1, rankName: "1등", rwdName: "대상", people: 1 },
        { reward: $("#prize_input2").val(), rank: 2, rankName: "2등", rwdName: "최우수상", people: 1 },
        { reward: $("#prize_input3").val(), rank: 3, rankName: "3등", rwdName: "우수상", people: 1 },
    ];

    var rewardObjArr = [];
    for (let i = 0; i < rewardObj.length; i++) {
        if (rewardObj[i].reward) {
            rewardObjArr[i] = rewardObj[i];
        } else break;
    }

    //홈페이지 URL
    var homeUrlArr = [];
    $(".ref_input").each(function (index, element) {
        homeUrlVal = $(this).val();
        if(homeUrlVal == "undefined")
        return homeUrlArr.push("")
    else 
        return homeUrlArr.push(homeUrlVal);
    });


    //모든 데이터
    var jsonData = {
        authJumin: $("#authJumin").val(),
        name: $("#h_name").val(),
        homeURL: homeUrlArr,
        reference : ($("#recom_check").is(":checked") == true) ? $(".refurl_input").val() : $(".refurl_input").val(),
        videoLength: $("#h_videoLength option:selected").val(),
        videoRatio: $("#h_videoRatio option:selected").val(),
        purpose: $("#h_purpose option:selected").val(),
        start: $("#start_day").val(),
        end: $("#end_day").val(),
        script: $("#h_script").val().replace(/(\n|\r\n)/g, "<br>"), 
        files: [$("#file_index").val()],
        totalReward: $("#total_input").val(),
        rewards: ($(".plan_container").attr("data-plan") == "스타터" || $(".plan_container").attr("data-plan") == "스탠다드") ? [{reward: Number($("#total_input").val()), rank: 1, rankName: "1등", rwdName: "대상", people: 1}] : rewardObjArr,
        industry: $("#h_industry option:selected").val(),
        fee: ($("#check_fee").is(":checked") == true) ? Number($('input[name="fee"]:checked').val()) : 0,
        manager:($("#respon").is(":checked") == true) ? {name: $("#respon_name").val(), contact: $("#respon_number").val()} : "",
        totalPayment: $("#total_hidden").val(),
        bizName: $(".bizName").val(),
        bizNum: $(".bizNum").val(),
        ceo: $(".ceo").val(),
        style : ($(".recom_input").val() == 1) ? ["free"] : styleArr,
        benefit : ($("#plus_prize").is(":checked") == true) ? $("#h_benefit").val().replace(/(\n|\r\n)/g, "<br>") : "없음",
        plan : $(".plan_container").attr("data-plan")
    };

    $.ajax({
        headers: { Authorization: "Basic " + UD },
        url: `${E}/api/v1/contest/add`,
        method: "POST",
        dataType: "JSON",
        data: jsonData,
        success: function (data) {
            $(".popup_receipt").css("display", "none");
            holdPayPop(data.idx , data.totalPayment, jsonData.name)
        },
        error: function (err) {
            console.log(err);
            alert("콘테스트 개최 중 오류가 발생하였습니다.");
        }
    });
};

//개최하기 결제 팝업
var payPopup

function holdPayPop(di , dt , dn){
    payPopup = window.open("/sub/contest_hold/hold/hold_pay.html" , "payPopup" , "top=10, left=10, width=700, height=700");
    $("#hold_final").attr("data-idx" , `${di}`);
    $("#hold_final").attr("data-totalpay" , `${dt}`);
    $("#hold_final").attr("data-title" , `${dn}`);
};


// 개최하기(제작방식 선택)
$(".select_bottom ul li").on("click" , function(){
    var rsc = $(this).data("rsc");
    (rsc == "1") ?  $(".recom_viedo").css("display" , "none"): $(".recom_viedo").fadeIn(300);
    $(".recom_input").val(rsc);
});

// 래퍼런스 비디오 리스트
$(document).ready(function(){
    recomVideo()
});

$("#recom_check").on("change" , function(){
    if($("#recom_check").prop("checked")){
		$(".middle_bottom").fadeIn(100);
	}else {
		$(".middle_bottom").fadeOut(200);
	}
});

var styleArr = []

function recomVideo(){
    $.ajax({
        headers: {Authorization: "Basic " + UD},
        url: `${E}/api/v1/contest/add/reference`,
        method: "GET",
        success: function (data) {
            
            for(i = 0; i < data.length; i++ ){
                var recomList =  
                `<li data-idx=${data[i].idx} data-recomcate=${data[i].category}>
                    <div class="video_thum ref_thum">
                        <div class="main_loading">
                            <img src="/img/Toploading(w).gif">
                        </div>
                        <div class="thum_inner">
                            <img src=${data[i].thumbnail}>
                        </div>
                        <div class="recom_video" data-video="${data[i].video}" data-idx=${data[i].idx}>
                            
                        </div>
                        <div class="recom_check"></div>
                    </div>
                    <div class="text_box">
                        <div class="c_cate">
                            <span>${data[i].category}</span>
                        </div>
                    </div>
                </li>`

                $(".recom_bottom ul").append(recomList);
            }

            var recomVideoArr = [];
            var recomVideoLength = 3;

            //영상 제작 추천
            $(".recom_bottom ul li").on("click" , function(){
                
                var recomCate = $(this).data("recomcate");
                
                if($(this).hasClass("active")){
                    $(this).removeClass("active");
                    $(this).find(".recom_check").removeClass("active");
                    
                    recomVideoArr = recomVideoArr.filter(function(item){
                        return item !== recomCate
                    });

                    styleArr = styleArr.filter(function(item){
                        return item !== recomCate
                    });

                }else{
                    if(recomVideoArr.length == recomVideoLength){
                        alert(`최대 ${recomVideoLength}개까지 선정이 가능합니다.`)
                        return false
                    } else {

                        //배열에 담기
                        recomVideoArr.push(recomCate);

                        //최종전달 배열
                        styleArr.push(recomCate);

                        //선택 애니메이션
                        $(this).addClass("active");
                        $(this).find(".recom_check").addClass("active");
                    }
                }

            });
            
            //영상 상세보기(호버시)
            $(".recom_bottom .video_thum").on("mouseenter" , function(){
                //영상 초기화
                $(this).find(".recom_video").html("");

                var videoSrc = $(this).find(".recom_video").data("video");
                var videoIdx = $(this).find(".recom_video").data("idx");
                var VideoTag = 
                `
                <video class="video-js vjs-big-play-centered vjs-default-skin vjs-fill video_common${videoIdx}" controls autoplay webkit-playsinline>
                    <source src="${videoSrc}" type="video/mp4">
                </video>
                `

                //영상 선택시 설정
                $(this).find(".thum_inner").css("display" ,"none")
                $(this).find(".recom_video").css("display" , "block")
                $(this).find(".recom_video").append(VideoTag)

                //비디오js 활성화
                videojs(document.querySelector(`.video_common${videoIdx}`));
            });

            //영상 상세보기(아웃호버)
            $(".recom_bottom .video_thum").on("mouseleave" , function(){
                var videoNum = $(this).find(".recom_video").data("idx");

                //영상 아웃시 설정
                $(this).find(".thum_inner").css("display" , "block")
                $(this).find(".recom_video").css("display" ,"none");

                //비디오js 비활성화
                $(this).find(".recom_video").find("video").attr("src" ,"#");
                $(this).find(".recom_video").find("video").removeClass(`.video_common${videoNum}`)
            });
        },
        error: function (err) {
            console.log(err);
        },
    });
};


//개최하기 이전
function holdPrev() {
    visibleDiv--;
    stepOn();
    showHoldForm();
};

function holdModal() {
    $(".popup_receipt").fadeIn(300);

    //콤마제거
    $("#prize_input").val(uncommas($("#prize_input").val()));
    $("#prize_input2").val(uncommas($("#prize_input2").val()));
    $("#prize_input3").val(uncommas($("#prize_input3").val()));
    $("#total_input").val(uncommas($("#total_input").val()));
};

$(".popup_btn").on("click", function () {
    $(".popup_receipt").fadeOut();
});

// 참여자 처리
$("input[name='holdType']").on("change", function () {
    if ($(this).is(":checked")) {
        if ($(this).attr("id") === "h_jumin") {
            $(".id_box").css("display", "block");
            $(".biz_box").css("display", "none");
            return false;
        } else {
            $(".id_box").css("display", "none");
            $(".biz_box").css("display", "block");
        }
    }
});

//사업자 번호 변경
$(".bizName").on("focusin", function () {
    $(".biz_search").fadeIn(300);
});

// 파일 이름 변경
$(document).ready(function () {
    var fileTarget = $(".file_box .file_hidden");
    fileTarget.on("change", function () {
        if (window.FileReader) {
            filename = $(this)[0].files[0].name;
            $(this).siblings(".hold_file").val(filename);
            fileSubmit();
        } else {
            filename = $(this).val("선택된 파일 없음.");
        }
    });
});

// 파일 업로드
function fileSubmit() {
    var form = $("#hold_File")[0];
    var formData = new FormData(form);

    $.ajax({
        headers: { Authorization: "Basic " + UD },
        url: `${E}/api/v1/temp`,
        method: "POST",
        enctype: "multipart/form-data",
        contentType: false,
        processData: false,
        data: formData,
        success: function (data) {
            alert("업로드 성공!");
            $("#file_index").val(data.idx);
        },
        error: function (err) {
            console.log(err);
            alert("업로드 중 오류가 발생했습니다. 이메일을 통해 제출해 주세요.");
        },
    });
}

// 담당자 선택여부 체크박스
$("#respon").on("change", function () {
    if ($("#respon").prop("checked")) {
        $("input[name=respon]").prop("checked", true);
        $(".hold_box2").fadeIn(300);
    } else {
        $("input[name=respon]").prop("checked", false);
        $(".hold_box2").fadeOut(300);
    }
});

//상금 버튼 추가
function plusBtn1() {
    var i_Length = $(".prize_input").length + 1;
    var innerMinus = "<div class='input_box'>" + "<input id='prize_input" + i_Length + "' name='reward' class='prize_input' onkeyup='commas(this)' type='text'  maxlength='50' placeholder=''>" + "<input class='minus_btn' type='button' onclick='minusBtn(this)'>" + "</div>";

    if (i_Length > 3) {
        alert("상금은 3등 까지 등록할 수 있습니다.");
        return false;
    } else {
        $(".prize_info").append(innerMinus);
        $("#prize_input" + i_Length).attr("placeholder", i_Length + "등 상금을 입력해 주세요!");
    }
}

//홈페이지 URL 버튼 추가
function plusBtn3() {
    var i_Length = $(".ho_input").length + 1;
    var innerMinus = "<div class='input_box'>" + "<input id='h_homeurl" + i_Length + "' class='ref_input ho_input' name='homeURL' type='text' maxlength='50' placeholder='홈페이지(서비스)를 나타내는 URL링크를 붙여 주세요.'>" + "<input class='minus_btn' type='button' onclick='minusBtn(this)'>" + "</div>";

    if (i_Length > 2) {
        alert("홈패아자 URL은 3개 까지 등록할 수 있습니다.");
        return false;
    } else {
        $(".holdmain_box2 ul li:nth-child(2) .ref_info").append(innerMinus);
    }
};

function minusBtn(e) {
    e.closest(".input_box").remove();
    i_Length--;
    $(".prize_info").val("");
};

//가격에 따른 플랜변경
$("#total_input").on("focusout" , function(){
    planTypeBind()
});

function planTypeBind() {

    // 플랜 넘버
    var planNum = $(".plan_container").attr("data-planNum");

    // 콤마 빼고
    var x = $("#total_input").val();
    x = x.replace(/,/gi, "");
    
    $(`.plan_box`).fadeOut(300);
    $(".prize_info").css("display" , "none")

    if(x >= 500000 && x < 1000000){
        plan = 1
        alert("스타터 플랜으로 최종 설정되었습니다.");
        $(`.plan_box${plan}`).fadeIn(300);
        $(".plan_container").attr("data-planNum" , `${plan}`);
        $(".plan_container").attr("data-plan" , "스타터");

    }else if(x >= 1000000 && x < 2000000){
        plan = 2
        alert("스탠다드 플랜으로 최종 설정되었습니다.");
        $(`.plan_box${plan}`).fadeIn(300);
        $(".plan_container").attr("data-planNum" , `${plan}`);
        $(".plan_container").attr("data-plan" , "스탠다드");

    }else if(x >= 2000000 && x < 5000000){
        plan = 3
        alert("프리미엄 플랜으로 최종 설정되었습니다.");
        $(`.plan_box${plan}`).fadeIn(300);
        $(".prize_info").css("display" , "block");
        $(".plan_container").attr("data-planNum" , `${plan}`);
        $(".plan_container").attr("data-plan" , "프리미엄");

    }else if(x >= 5000000){
        plan = 4
        alert("엔터프라이즈 플랜으로 최종 설정되었습니다.");
        $(`.plan_box${plan}`).fadeIn(300);
        $(".prize_info").css("display" , "block");
        $(".plan_container").attr("data-planNum" , `${plan}`);
        $(".plan_container").attr("data-plan" , "엔터프라이즈");

    } 
    else if(x < 500000){
        // plan = 1
        // alert("스타터 플랜으로 최종 설정되었습니다.");
        // $(`.plan_box${plan}`).fadeIn(300);
        // $(".plan_container").attr("data-planNum" , `${plan}`);
        // $(".plan_container").attr("data-plan" , "스타터");  
        // return false;
        alert("최소 상금은 50만원 이상입니다.");
        // $("#total_input").unbind("focusout")
        // .bind("focusout" , function(){
        //     planTypeBind()
        // })
        setTimeout(function(){
            $(this).focus();
        },300)
    }
};

//인풋박스 콤마 생성 및 제거
function commas(target) {
    // 콤마 빼고
    var x = target.value;
    x = x.replace(/,/gi, "");

    // 숫자 정규식 확인
    var regexp = /^[0-9]*$/;

    if(!regexp.test(x)) {
        $(target).val("");
    }else {
        x = x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        $(target).val(x);
    }
};

function uncommas(val) {
    var ret = 0;
    if (typeof val != "undefined" && val != null && val != "") {
        ret = parseInt(val.replace(/,/gi, ""));
    }
    return ret;
}

//콘테스트 가격표 & 완료창 //콘테스트 가격표 & 완료창
$(function () {
    var totalVal;
    var totalVal2;
    var NumTotal;

    var checkVal;
    var charge;
    var VatPer = Math.round(0.1 * 100) / 100;
    var TotalReset = parseInt(0);

    //콘테스트 기본 개최비
    var basicVal = $("#basic_price").val();
    var Numbasic = parseInt(basicVal);

    //페이지 로드 후 계산서 기본
    $('select[name="option"]').find('option[value="0"]').attr("selected", true);
    $(".h_basic").text(basicVal);

    basicVal2 = basicVal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); //계산서 개최비 금액

    $(".h_basic2").text(basicVal2);
    $("#check_fee").val(0);

    //콘테스트 가격 초기화
    $("#total_input").on("focus", function () {
        //모든 가격 초기화
        $(this).val("");
        $("#total_hidden").val("");
        $(".h_price").empty();
        $(".h_fee").empty();
        $(".h_total").empty();
        $("#check_fee").prop("checked", false);
        $("#check_fee").val(0);
        $(".h_fee").empty();
        $(".h_fee2").empty();
    });

    //총 상금
    $("#total_input").on("change keyup paste", function () {
        totalVal = $("#total_input").val();
        totalVal2 = totalVal.replace(/,/g, "");
        NumTotal = parseInt(totalVal2); // 최종금액

        totalVal3 = totalVal2.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); //계산서 총 상금

        $(".h_price").text(NumTotal);
        $(".h_price2").text(totalVal3);
        $(".h_pay").text(totalVal);
    });

    //수수료 자체 부담
    $("#check_fee").on("change", function () {
        var ag = "1";
        var dag = "0";

        checkVal = $("#check_fee");
        charge = NumTotal * 0.167;
        charge2 = charge.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); //계산서 수수료 금액

        if ($("#check_fee").prop("checked")) {
            $("input[name='fee']").prop("checked", true);
            $(checkVal).val(ag);
            $(".h_fee").text(charge);
            $(".h_fee2").text(charge2);
        } else {
            $("#check_fee").prop("checked", false);
            $(checkVal).val(dag);
            $(".h_fee").empty();
            $(".h_fee2").empty();
        }
    });

    //추가혜택
    $(".plus_prize").on("change" ,function(){
        if($(".plus_prize").prop("checked")){
            $(".prize_textarea").fadeIn(300);
        }else {
            $(".prize_textarea").fadeOut(100);
        }
    })

    //전체 계산(영수증 및 기타)
    $(".common_pay").on("change keyup paste", function () {
        if ($("#check_fee").val() == 1) {
            var Vat = (Numbasic + NumTotal + charge) * VatPer;
            var Htotal = Numbasic + NumTotal + charge + Vat;

            Vat2 = Vat.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); // 계산서 VAT
            Htotal2 = Htotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); // 계산서 수수료 포함 총 금액

            $(".h_vat2").text(Vat2);
            $(".h_total").text(Htotal2);
            $(".h_total2").text(Htotal2);
            $("#total_hidden").val(Htotal);
        } else {
            if ($("#check_fee").val() == 0) {
                var Vat = (Numbasic + NumTotal) * VatPer;
                var Htotal = Numbasic + NumTotal + Vat;

                Vat2 = Vat.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); // 계산서 VAT
                Htotal3 = Htotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); // 계산서 수수료 미포함 총 금액

                $(".h_vat2").text(Vat2);
                $(".h_total").text(Htotal3);
                $(".h_total2").text(Htotal3);
                $("#total_hidden").val(Htotal);
            }
        }
    });

    //완료창
    $("#h_name").on("change", function () {
        var HnameVal = $("#h_name").val();
        $(".h_name").text(HnameVal);
    });

    $("#h_payment").on("change", function () {
        var paymentVal = $("#h_payment option:selected").val();
        $(".h_payment").text(paymentVal);
    });

    $("#start_day").on("change", function () {
        var SDayeVal = $("#start_day").val();
        $(".s_day").text(SDayeVal);
    });

    $("#end_day").on("change", function () {
        var EDayeVal = $("#end_day").val();
        $(".e_day").text(EDayeVal);
    });

    
});
/*********** 개최하기 폼 END ***********/

// 페이지네이션 기본(무한스크롤)
var CP = 1
var category = "";
var KeywordVal = "";
var sort = "0";
var industry = "";

var isAJAX = false;

//페이지 없을때 기본
var temp = false;

/*********** 진행중인 콘테스트 ***********/
$(function () {
    IngBa();

    //무한 스크롤 페이징
    $(window).scroll(function () {
        if ($(window).scrollTop() == $(document).height() - $(window).height() && !temp) {
            CP++;
            IngBa();
        } else {
        }
    });
});

//진행중인 콘테스트 기본리스트
var IngBa = function () {
    $.ajax({
        url: `${E}/api/v1/contest?keyword=${KeywordVal}&category=${category}&industry=${industry}&sort=${sort}&page=${CP}`,
        method: "GET",
        success: function (data) {
            setTimeout(function () {
                if (data.length >= 1) {
                    $(".main_loading").css("display" , "none");
                    
                    for (i = 0; i < data.length; i++) {
                        var dDay = data[i].dDay;
                        var DayText = dDay > 7 ? "HOT" : "마감임박"

                        var holdList = `<li onclick='MainHpopup(${data[i].idx})' data-idx=${data[i].idx}>
                            <a href='javascript:;' class='popup_ing'>
                                <div class="list_container">
                                    <div class="list_poster">
                                        <div class="poster_box">
                                            <img src=${data[i].thumbnail}>
                                        </div>
                                    </div>
                                    <div class="list_subs">
                                        <div class="l_title">
                                            <span class="list_cate">[${data[i].purpose}]</span>
                                            <h2>${data[i].name}</h2>
                                            <span class="list_time">${DayText}</span>
                                        </div>
                                        <div class="l_company">
                                            <div class="l_name">
                                                <span>${data[i].bizName}</span>
                                            </div>
                                        </div>
                                        <div class="l_explain">
                                            <p>${data[i].script}</p>
                                        </div>
                                    </div>
                                    <div class="list_subs2">
                                        <div class="l_prize">
                                            <p>총 상금 : <span>${data[i].totalReward}</span></p>
                                        </div>
                                        <div class="l_days">
                                            <p>남은기간 : <span>${dDay}</span>일</p>
                                        </div>
                                        <div class="l_person">
                                            <p>조회수 : <span> ${data[i].views}명</span></p>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </li>`;

                        //개최 리스트 추가
                        $(".ing_list ul").append(holdList).children(":last").hide().fadeIn(100);
                    }
                    isAJAX = false;

                } else {
                    $(".main_loading").css("display" , "none");
                    temp = true;
                }
            }, 300);
        },
        error: function (err) {
            alert("로그인 후 이용할 수 있습니다.");
            console.log(err);
        },
    });
};

//진행중인 카테고리 분류
var IngCate = function (target) {
    CP = 1;
    var category = $(target).data("category");

    var DataVal = $(target).html();
    $(".sub_title_box h3 em b").html(DataVal);

    $.ajax({
        url: `${E}/api/v1/contest?keyword=${KeywordVal}&category=${category}&industry=${industry}&sort=${sort}&page=${CP}`,
        method: "GET",
        success: function (data) {
            if (typeof data !== "undefined") {
                $(".ing_list ul").html(""); //리스트 비우기

                for (i = 0; i < data.length; i++) {

                    var dDay = data[i].dDay;
                    var DayText = dDay > 7 ? "HOT" : "마감임박"

                    var holdList = `<li onclick='MainHpopup(${data[i].idx})'>
                        <a href='javascript:;' class='popup_ing'>
                            <div class="list_container">
                                <div class="list_poster">
                                    <div class="poster_box">
                                        <img src=${data[i].thumbnail}>
                                    </div>
                                </div>
                                <div class="list_subs">
                                    <div class="l_title">
                                        <span class="list_cate">[${data[i].purpose}]</span>
                                        <h2>${data[i].name}</h2>
                                        <span class="list_time">${DayText}</span>
                                    </div>
                                    <div class="l_company">
                                        <div class="l_name">
                                            <span>${data[i].bizName}</span>
                                        </div>
                                    </div>
                                    <div class="l_explain">
                                        <p>${data[i].script}</p>
                                    </div>
                                </div>
                                <div class="list_subs2">
                                    <div class="l_prize">
                                        <p>총 상금 : <span>${data[i].totalReward}</span></p>
                                    </div>
                                    <div class="l_days">
                                        <p>남은기간 : <span>${dDay}</span>일</p>
                                    </div>
                                    <div class="l_person">
                                        <p>조회수 : <span> ${data[i].views}명</span></p>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </li>`;

                    //개최 리스트 추가
                    $(".ing_list ul").append(holdList).children(":last").hide().fadeIn(700);
                }
            }
        },
        error: function (err) {
            alert("로그인 후 이용할 수 있습니다.");
            console.log(err);
        },
    });
};

//진행중인 SORT 카테고리 분류
var IngDate = function (target) {
    CP = 1;
    var sort = $(target).data("sort");

    $.ajax({
        url: `${E}/api/v1/contest?keyword=${KeywordVal}&category=${category}&industry=${industry}&sort=${sort}&page=${CP}`,
        method: "GET",
        success: function (data) {
            if (typeof data !== "undefined") {
                $(".ing_list ul").html(""); //리스트 비우기

                for (i = 0; i < data.length; i++) {

                    var dDay = data[i].dDay;
                    var DayText = dDay > 7 ? "HOT" : "마감임박"

                    var holdList = `<li onclick='MainHpopup(${data[i].idx})'>
                        <a href='javascript:;' class='popup_ing'>
                            <div class="list_container">
                                <div class="list_poster">
                                    <div class="poster_box">
                                        <img src=${data[i].thumbnail}>
                                    </div>
                                </div>
                                <div class="list_subs">
                                    <div class="l_title">
                                        <span class="list_cate">[${data[i].purpose}]</span>
                                        <h2>${data[i].name}</h2>
                                        <span class="list_time">${DayText}</span>
                                    </div>
                                    <div class="l_company">
                                        <div class="l_name">
                                            <span>${data[i].bizName}</span>
                                        </div>
                                    </div>
                                    <div class="l_explain">
                                        <p>${data[i].script}</p>
                                    </div>
                                </div>
                                <div class="list_subs2">
                                    <div class="l_prize">
                                        <p>총 상금 : <span>${data[i].totalReward}</span></p>
                                    </div>
                                    <div class="l_days">
                                        <p>남은기간 : <span>${dDay}</span>일</p>
                                    </div>
                                    <div class="l_person">
                                        <p>조회수 : <span> ${data[i].views}명</span></p>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </li>`;

                    //개최 리스트 추가
                    $(".ing_list ul").append(holdList).children(":last").hide().fadeIn(700);
                }

            } else {

            }
        },
        error: function (err) {
            alert("로그인 후 이용할 수 있습니다.");
            console.log(err);
        },
    });
};

//진행중인 SORT 카테고리 분류
var IngIndus = function (target) {
    CP = 1;
    var industry = $(target).data("industry");

    $.ajax({
        url: `${E}/api/v1/contest?keyword=${KeywordVal}&category=${category}&industry=${industry}&sort=${sort}&page=${CP}`,
        method: "GET",
        success: function (data) {
            if (typeof data !== "undefined") {
                $(".ing_list ul").html(""); //리스트 비우기

                for (i = 0; i < data.length; i++) {

                    var dDay = data[i].dDay;
                    var DayText = dDay > 7 ? "HOT" : "마감임박"

                    var holdList = `<li onclick='MainHpopup(${data[i].idx})'>
                        <a href='javascript:;' class='popup_ing'>
                            <div class="list_container">
                                <div class="list_poster">
                                    <div class="poster_box">
                                        <img src=${data[i].thumbnail}>
                                    </div>
                                </div>
                                <div class="list_subs">
                                    <div class="l_title">
                                        <span class="list_cate">[${data[i].purpose}]</span>
                                        <h2>${data[i].name}</h2>
                                        <span class="list_time">${DayText}</span>
                                    </div>
                                    <div class="l_company">
                                        <div class="l_name">
                                            <span>${data[i].bizName}</span>
                                        </div>
                                    </div>
                                    <div class="l_explain">
                                        <p>${data[i].script}</p>
                                    </div>
                                </div>
                                <div class="list_subs2">
                                    <div class="l_prize">
                                        <p>총 상금 : <span>${data[i].totalReward}</span></p>
                                    </div>
                                    <div class="l_days">
                                        <p>남은기간 : <span>${dDay}</span>일</p>
                                    </div>
                                    <div class="l_person">
                                        <p>조회수 : <span> ${data[i].views}명</span></p>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </li>`;

                    //개최 리스트 추가
                    $(".ing_list ul").append(holdList).children(":last").hide().fadeIn(200);
                }

            } else {

            }
        },
        error: function (err) {
            alert("로그인 후 이용할 수 있습니다.");
            console.log(err);
        },
    });
};

//진행중인 콘테스트 검색
function IngSearch(target) {
    var KeywordVal = $(target).val();

    $.ajax({
        url: `${E}/api/v1/contest?keyword=${KeywordVal}&category=${category}&industry=${industry}&sort=${sort}&page=${CP}`,
        method: "GET",
        success: function (data) {
            if (typeof data !== "undefined") {
                $(".news_box ul").html("");

                if (typeof data !== "undefined") {
                    $(".ing_list ul").html(""); //리스트 비우기

                    for (i = 0; i < data.length; i++) {

                        var dDay = data[i].dDay;
                        var DayText = dDay > 7 ? "HOT" : "마감임박"

                        var holdList = `<li onclick='MainHpopup(${data[i].idx})'>
                            <a href='javascript:;' class='popup_ing'>
                                <div class="list_container">
                                    <div class="list_poster">
                                        <div class="poster_box">
                                            <img src=${data[i].thumbnail}>
                                        </div>
                                    </div>
                                    <div class="list_subs">
                                        <div class="l_title">
                                            <span class="list_cate">[${data[i].purpose}]</span>
                                            <h2>${data[i].name}</h2>
                                            <span class="list_time">${DayText}</span>
                                        </div>
                                        <div class="l_company">
                                            <div class="l_name">
                                                <span>${data[i].bizName}</span>
                                            </div>
                                        </div>
                                        <div class="l_explain">
                                            <p>${data[i].script}</p>
                                        </div>
                                    </div>
                                    <div class="list_subs2">
                                        <div class="l_prize">
                                            <p>총 상금 : <span>${data[i].totalReward}</span></p>
                                        </div>
                                        <div class="l_days">
                                            <p>남은기간 : <span>${dDay}</span>일</p>
                                        </div>
                                        <div class="l_person">
                                            <p>조회수 : <span> ${data[i].views}명</span></p>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </li>`;

                        //개최 리스트 추가
                        $(".ing_list ul").append(holdList).children(":last").hide().fadeIn(300);
                    }
                }
            }
            
            //검색결과 없을떄
            if (data.length == 0) {
                var Nsearch = `<div class='not_search'>
                    <div class='img_box'>
                        <img src='/img/not_search_icon.png' alt='vicon_icon'>
                    </div>
                    <h2>'${KeywordVal}' 검색결과가 없습니다</h2>
                    <p>검색 결과를 찾지 못했습니다.<br>검색어를 확인해 주세요.</p>
                </div>
                `;

                $(".ing_list ul").append(Nsearch);
            }
        },
        error: function (err) {
            console.log(err);
        },
    });
}

