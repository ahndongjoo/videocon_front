var payCateVal; //변화 카테고리 값

$(function(){
    payData()
});

function payData(target){
    isAJAX = true;

    var payCate = $(target).data("ps");
    ((isNaN(payCate)) ? payCate = 0 : payCateVal);
  
    var payCateArr = []
    var payCateList = $(".pay_box1 ul li")
    payCateArr.forEach.call((payCateList) , (item , idx) => {
        if($(item).attr("data-cate") != payCate){
            $(item).remove();
            CP = 1;
        }
    });

    payCateAttr(payCate);

    $.ajax({
        headers: { Authorization: "Basic " + UD },
        url: `${E}/api/v1/user/payment?type=${(payCate == 0) ? payCate : payCateVal}&page=${CP}`,
        type:"GET",
        success: function(data){
            
            //결제 상태표시
            $(".pay_state li:nth-child(1) em").text(data.totalCount.all)
            $(".pay_state li:nth-child(2) em").text(data.totalCount.screen)
            $(".pay_state li:nth-child(3) em").text(data.totalCount.complete)

            //결제 리스트
            if(data.payList.length >= 1){
                data.payList.map(x => {
                    var payId = x.payId;
                    var regex = /[^0-9]/g;
                    var payResult = payId.replace(regex, "");
                    var payList =
                        `
                        <li data-cate=${payCate} data-payid=${x.payId} data-paynum=${payResult} onclick="payDetail(this)">
                            <div class="pay_top">
                                <p>주문번호 <span>${payResult}</span></p>
                            </div>
                            <h3><b>${x.payState}</b><span>${x.date}</span></h3>
                            <p>${x.contestName}</p>
                            <p class="pay_payment">${x.totalPayment}<b></b></p>
                            <div class="pay_bottom">
                                <a href="javascript:;">
                                    <span>자세히 보기</span>
                                    <img src="/img/right_arr3.png">
                                </a>
                            </div>
                        </li>
                        `
                        
                    $(".pay_box1 ul").append(payList).children(':last').hide().fadeIn(300);
                });
                isAJAX = false;

            }else{
                temp = true;
            }
        },
        error:function(err){
            console.log(err);
        },                
    })
};

// 무한 스크롤 페이징(결제내역)
$(window).scroll(function(){
    temp = false;
    var maxHeight = $(document).height();
    var currentScroll = $(window).scrollTop() + $(window).height();
   
    if(maxHeight <= currentScroll && temp == false && !isAJAX){
        CP ++;
        $.ajax({
            headers: { Authorization: "Basic " + UD },
            url: `${E}/api/v1/user/payment?type=${payCateVal}&page=${CP}`,
            type:"GET",
            success: function(data){
                data.payList.map(x => {
                    var payId = x.payId;
                    var regex = /[^0-9]/g;
                    var payResult = payId.replace(regex, "");
                    var payList =
                        `
                        <li data-cate=${payCateVal} data-payid=${x.payId} data-paynum=${payResult} onclick="payDetail(this)">
                            <div class="pay_top">
                                <p>주문번호 <span>${payResult}</span></p>
                            </div>
                            <h3><b>${x.payState}</b><span>${x.date}</span></h3>
                            <p>${x.contestName}</p>
                            <p class="pay_payment">${x.totalPayment}<b></b></p>
                            <div class="pay_bottom">
                                <a href="javascript:;">
                                    <span>자세히 보기</span>
                                    <img src="/img/right_arr3.png">
                                </a>
                            </div>
                        </li>
                        `
                    $(".pay_box1 ul").append(payList).children(':last').hide().fadeIn(300);
                });

            },error :function(err){
                temp = true;
                console.log(err);
            }
        })
    }
});

//카테고리 체인지 변경
function payCateAttr(pcv){
    ((isNaN(payCateVal)) ? payCateVal = pcv : payCateVal = pcv);
};

//마이페이지 결제 상세페이지
function payDetail(target){

    temp = true; // 상세페이지 무한 스크롤 비활성화

    var payInfo = $(target).data("payid"); //주문번호 아이디
    var payNum = $(target).data("paynum"); //주문번호 번호만

    $.ajax({
        headers: { Authorization: "Basic " + UD },
        url: `${E}/api/v1/user/payment/detail?impUid=${payInfo}`,
        type:"GET",
        success: function(data){

            //결제 상세보기 데이터
            $(".mp_1").css("display" , "none");
            $(".mp_2").fadeIn(300);

            $(".mp_2 .pay_plan").text(data.plan); 
            $(".mp_2 .pay_state").text(data.payStatus);
            $(".mp_2 .pay_order").text(payNum);
            $(".mp_2 .pay_orderdate").text(data.orderDate);
            $(".mp_2 .pay_holdfee").text(data.holdFee);
            $(".mp_2 .pay_reward").text(data.totalReward);
            $(".mp_2 .pay_commisson").text(data.commission);
            $(".mp_2 .pay_surtax").text(data.surtax);
            $(".mp_2 .pay_totalpayment").text(data.totalPayment);
            $(".mp_2 .pay_bank").text(data.vbankName);
            $(".mp_2 .pay_cate").text(data.payMethod);
            $(".mp_2 .pay_account").text(data.vbankNum);
            $(".mp_2 .pay_deadline").text(data.deadline);
            $(".mp_2 .pay_final").text(data.payDate);
        },
        error:function(){
            alert("실패하였습니다.")
        },                
    })
};

// 안내사항 toggle 및 리스트 버튼
$(".notice_top").on("click" ,function(){
    $(".notice_middle").slideToggle(300);
    if($(this).hasClass("active")){
        $(this).removeClass("active");
    }else{
        $(this).addClass("active")
    }
});

$(".pay_box ul li").on("click" , function(){
    $(".mp_1").css("display" , "none")
    $(".mp_2").fadeIn(300);
});

$(".mp_prev").on("click" , function(){
    temp = false; // 상세페이지 무한 스크롤 활성화
    $(".mp_2").css("display" , "none")
    $(".mp_1").fadeIn(300);

});

$(".pay_receipt").on("click" , function(){
    temp = false; // 상세페이지 무한 스크롤 활성화
    $(".mp_2").css("display" , "none")
    $(".mp_1").fadeIn(300);
});


