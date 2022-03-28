//슬릭 슬라이더
$(".main_slider ul").slick({
    arrows: false, 
    fade : true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 600,
    slidesToShow: 1,
    dots: true,
    arrows : true,	
});

//SWIPER 슬라이더 
$(".swiper-container").each(function(index, element){
    
    var SwiperTarget = $(this);
    SwiperTarget.addClass('swiper' + index);

    var swiper = new Swiper('.swiper' + index, {
        slidesPerView: "4",
        spaceBetween : 20,
        loop: true,
        observer: true,
        observeParents: true,
        navigation: {
            nextEl: $('.swiper' + index).children('.swiper-button-next'),
            prevEl: $('.swiper' + index).children('.swiper-button-prev'),
        },
        watchOverflow: true
    });
});

/*********** 진행중인 콘테스트(메인) ***********/
$(function(){
    var sort = 0;
    $.ajax({
        url :`${E}/api/v1/contest?keyword=${""}&purpose=${""}&industry=${""}&sort=${sort}&page=${1}`,
        method:'GET',
        success: function(data){
            if(typeof data !== "undefined"){
                
                for(i = 0; i < data.length; i++ ){
                    var dDay = (data[i].dDay == 0) ? "Day" : data[i].dDay;

                    var MainHList = 
                    `<li class="swiper-slide" onclick='MainHpopup(${data[i].idx})'>
                        <div class="video_thum contest_thum">
                            <div class="thum_inner">
                                <a href="javascript:;">
                                    <img src=${data[i].thumbnail}>
                                </a>
                            </div>
                        </div>
                        <div class="swi_text">
                            <a href="javascript:;">
                                <span><em>#${data[i].purpose}</em></span>
                                <h3>${data[i].name}</h3>
                                <p class="c_script">${data[i].script}</p>
                                <div class="day_box">
                                    <p class="c_day"><span><em>D-</em>${dDay}</span></p>
                                </div>
                            </a>
                        </div>
                    </li>`;

                    //메인 개최 리스트 추가
                    $(".swiper2 ul").append(MainHList);
                }

                //진행중인 공모전 슬라이드 버튼
                if(data.length >= 4){
                    $(".swiper2 .swiper-button-prev").css("display" , "block");
                    $(".swiper2 .swiper-button-next").css("display" , "block");
                }else{
                    $(".swiper2 .swiper-button-prev").css("display" , "none");
                    $(".swiper2 .swiper-button-next").css("display" , "none");
                }
            }
        },error: function(err){
            console.log(err);
        }
    })
});

/********** 우승자 포트폴리오(메인) ***********/
$(function(){
    var sort = 0;

    $.ajax({
        url :`${E}/api/v1/portfolio/award-list?keyword=${""}&style=${""}&industry=${""}&sort=${sort}&page=${1}`,
        method:'GET',
        success: function(data){
            
            if(typeof data !== "undefined"){
                
                for(i = 0; i < 7; i++ ){
                    var MainWList = 
                    `<li class="swiper-slide" onclick='MainWpopup(${data[i].idx})'>
                        <input class='hold_index' type='number' value=${data[i].idx}>
                        <div class="video_thum">
                            <div class="thum_inner">
                                <a href="javascript:;">
                                    <img src=${data[i].thumbnail}>
                                </a>
                            </div>
                        </div>
                        <div class="swi_text">
                            <a href="javascript:;">
                                <span><em>#${data[i].style}</em></span>
                                <h3>${data[i].name}</h3>
                                <div class='text_middle'>
                                    <div class='middle_img'>
                                        <img src=${data[i].userProfile}>
                                    </div>
                                    <div class='middle_text'>
                                        <span>${data[i].nickname}</span>
                                    </div>
                                </div>
                                <p class='c_date'><b>${data[i].views}</b></p>
                            </a>
                        </div>
                    </li>`;

                    //메인 개최 리스트 추가
                    $(".swiper0 ul").append(MainWList);
                }
            }
        },error: function(err){
            console.log(err);
        }
    });
});

/********** 종료된 포트폴리오(메인) ***********/
$(function(){
    var sort = 0;

    $.ajax({
        url :`${E}/api/v1/contest/end?keyword=${""}&purpose=${""}&industry=${""}&sort=${sort}&page=${1}`,
        method:'GET',
        success: function(data){
            if(typeof data !== "undefined"){
                for(i = 0; i < 7; i++ ){

                    var MainEList = 
                    `<li class="swiper-slide" onclick='MainEpopup(${data[i].idx})'>
                        <input class='hold_index' type='number' value=${data[i].idx}>
                        <div class="video_thum contest_thum">
                            <div class="thum_inner">
                                <a href="javascript:;">
                                <img src=${data[i].thumbnail}>
                                </a>
                            </div>
                        </div>
                        <div class="swi_text">
                            <a href="javascript:;">
                                <span><em>#${data[i].purpose}</em></span>
                                <h3>${data[i].name}</h3>
                                <p class="host">개최자 : ${data[i].host}</p>
                                <p class="c_date"><b>${data[i].views}</b></p>
                            </a>
                        </div>
                    </li>`;

                    //메인 개최 리스트 추가
                    $(".swiper1 ul").append(MainEList);
                }
            }
        },error: function(err){
            console.log(err);
        }
    })
});

// 미디어 박스
$(function(){
    var sort = 0;

    $.ajax({
        type : 'GET',
        url : `${E}/api/v1/board/mediabox?keyword=${""}&page=${1}&sort=${sort}`,
        dataType: 'JSON',
        success: function(data){
            if(typeof data !== "undefined"){
                for(i = 0 ; i < 7; i++){
                    var medialist = `
                        <li class='swiper-slide'>
                            <a href=${data[i].url}> 
                                <div class='sns_box'>
                                    <div class='sns_middle'>
                                        <div class='sns_thum'>
                                            <img src=${data[i].thumbnail}>
                                        </div>
                                    </div>
                                    <div class='sns_top'>
                                        <div class='top_left'>
                                            <p>#${data[i].category}</p>
                                        </div>
                                    </div>
                                    <div class='sns_bot'>
                                        <div class='bot_top'>
                                            <h4>${data[i].title}</h4>
                                        </div>
                                    <div class='bot_bottom'>
                                        <span>${data[i].views}</span>
                                    <div>
                                </div>
                            </a>
                        </li>`

                    $(".swiper3 ul").append(medialist);
                }  
            }else{

            }
        },
        error : function(err){
            console.log(err);
        }
    })
});

