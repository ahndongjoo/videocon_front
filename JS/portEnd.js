// 페이지네이션 기본(무한스크롤)
var category = "";
var KeywordVal = "";
var sort = "0";
var industry = "";

$(function(){
    EndBa()

    //무한 스크롤 페이징
    $(window).scroll(function(){
        var maxHeight = $(document).height();
        var currentScroll = $(window).scrollTop() + $(window).height();

        if(maxHeight <= currentScroll + 350 && temp == false && !isAJAX){
            CP ++;
            EndBa()
        }
    });
});

//종료된 기본 리스트
var EndBa = function(){
    isAJAX = true;

    $.ajax({
        url: `${E}/api/v1/contest/end?keyword=${KeywordVal}&category=${category}&industry=${industry}&sort=${sort}&page=${CP}`,
        method: "GET",
        success: function (data) {
            setTimeout(function(){
                if (data.length >= 1) {
                    $(".main_loading").css("display" , "none");
                    for (i = 0; i < data.length; i++) {

                        var EList = `<li onclick='MainEpopup(${data[i].idx})'>
                            <input class='hold_index' type='number' value=${data[i].idx}>
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
                                            <span class="list_time">종료</span>
                                        </div>
                                        <div class="l_company">
                                            <div class="l_name">
                                                <span>${data[i].bizName}</span>
                                            </div>
                                        </div>
                                        <div class="l_explain">
                                            <p class="host">개최자 : ${data[i].host}</p>
                                        </div>
                                    </div>
                                    <div class="list_subs2">
                                        <div class="l_prize">
                                            <p>총 상금 : <span>${data[i].totalReward}</span></p>
                                        </div>
                                        <div class="l_days">
                                            <p>참여 작품 : <span>${data[i].join_count}<em>개</em></span></p>
                                        </div>
                                        <div class="l_person">
                                            <p>조회수 : <span> ${data[i].views}명</span></p>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </li>`;
    
                        //메인 개최 리스트 추가
                        $(".end_list ul").append(EList).children(':last').hide().fadeIn(100);
                    }
                    isAJAX  = false;

                } else {
                    $(".main_loading").css("display" , "none");
                    temp = true;
                }
            },300)
        },
        error: function (err) {
            console.log(err);
        },
    });
};

//종료된 콘테스트 카테고리 분류
var EndCate = function(target) {

    CP = 1
    category = $(target).data("category");

    //서브 타이블 텍스트 
    var DataVal = $(target).html();
    $(".sub_title_box h3 em b").html(DataVal);

    $.ajax({
        url: `${E}/api/v1/contest/end?keyword=${KeywordVal}&category=${category}&industry=${industry}&sort=${sort}&page=${CP}`,
        method: "GET",
        success: function (data) {
            
            if (typeof data !== "undefined") {
                $(".end_list ul").html(""); //리스트 비우기
                for (i = 0; i < data.length; i++) {

                    var EList = `<li onclick='MainEpopup(${data[i].idx})'>
                        <input class='hold_index' type='number' value=${data[i].idx}>
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
                                        <span class="list_time">종료</span>
                                    </div>
                                    <div class="l_company">
                                        <div class="l_name">
                                            <span>${data[i].bizName}</span>
                                        </div>
                                    </div>
                                    <div class="l_explain">
                                        <p class="host">개최자 : ${data[i].host}</p>
                                    </div>
                                </div>
                                <div class="list_subs2">
                                    <div class="l_prize">
                                        <p>총 상금 : <span>${data[i].totalReward}</span></p>
                                    </div>
                                    <div class="l_days">
                                        <p>참여 작품 : <span>${data[i].join_count}<em>개</em></span></p>
                                    </div>
                                    <div class="l_person">
                                        <p>조회수 : <span> ${data[i].views}명</span></p>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </li>`;

                    //메인 개최 리스트 추가
                    $(".end_list ul").append(EList)
                }
            } else {

            }
        },
        error: function (err) {
            console.log(err);
        },
    });
};

//종료된 콘테스트 카테고리 분류
var EndDate = function(target) {

    CP = 1
    sort = $(target).data("sort");

    $.ajax({
        url: `${E}/api/v1/contest/end?keyword=${KeywordVal}&category=${category}&industry=${industry}&sort=${sort}&page=${CP}`,
        method: "GET",
        success: function (data) {
            
            if (typeof data !== "undefined") {
                $(".end_list ul").html(""); //리스트 비우기
                for (i = 0; i < data.length; i++) {

                    var EList = 
                    `<li onclick='MainEpopup(${data[i].idx})'>
                        <input class='hold_index' type='number' value=${data[i].idx}>
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
                                        <span class="list_time">종료</span>
                                    </div>
                                    <div class="l_company">
                                        <div class="l_name">
                                            <span>${data[i].bizName}</span>
                                        </div>
                                    </div>
                                    <div class="l_explain">
                                        <p class="host">개최자 : ${data[i].host}</p>
                                    </div>
                                </div>
                                <div class="list_subs2">
                                    <div class="l_prize">
                                        <p>총 상금 : <span>${data[i].totalReward}</span></p>
                                    </div>
                                    <div class="l_days">
                                        <p>참여 작품 : <span>${data[i].join_count}<em>개</em></span></p>
                                    </div>
                                    <div class="l_person">
                                        <p>조회수 : <span> ${data[i].views}명</span></p>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </li>`;

                    //메인 개최 리스트 추가
                    $(".end_list ul").append(EList)
                }
            } else {

            }
        },
        error: function (err) {
            console.log(err);
        },
    });
};

//종료된 콘테스트 카테고리 분류
var EndIndus= function(target) {

    CP = 1
    industry = $(target).data("industry");

    $.ajax({
        url: `${E}/api/v1/contest/end?keyword=${KeywordVal}&category=${category}&industry=${industry}&sort=${sort}&page=${CP}`,
        method: "GET",
        success: function (data) {
            
            if (typeof data !== "undefined") {
                $(".end_list ul").html(""); //리스트 비우기
                for (i = 0; i < data.length; i++) {

                    var EList = 
                    `<li onclick='MainEpopup(${data[i].idx})'>
                        <input class='hold_index' type='number' value=${data[i].idx}>
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
                                        <span class="list_time">종료</span>
                                    </div>
                                    <div class="l_company">
                                        <div class="l_name">
                                            <span>${data[i].bizName}</span>
                                        </div>
                                    </div>
                                    <div class="l_explain">
                                        <p class="host">개최자 : ${data[i].host}</p>
                                    </div>
                                </div>
                                <div class="list_subs2">
                                    <div class="l_prize">
                                        <p>총 상금 : <span>${data[i].totalReward}</span></p>
                                    </div>
                                    <div class="l_days">
                                        <p>참여 작품 : <span>${data[i].join_count}<em>개</em></span></p>
                                    </div>
                                    <div class="l_person">
                                        <p>조회수 : <span> ${data[i].views}명</span></p>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </li>`;

                    //메인 개최 리스트 추가
                    $(".end_list ul").append(EList)
                }
            } else {

            }
        },
        error: function (err) {
            console.log(err);
        },
    });
};

//종료된 콘테스트 검색
function EndSearch(target) {
    var sort = 0;
    var KeywordVal = $(target).val();

    $.ajax({
        url: `${E}/api/v1/contest/end?keyword=${KeywordVal}&category=${category}&industry=${industry}&sort=${sort}&page=${1}`,
        method: "GET",
        success: function (data) {
            if (typeof data !== "undefined") {
                $(".end_list ul").html(""); //리스트 비우기

                for (i = 0; i < data.length; i++) {

                    var EList = 
                    `<li onclick='MainEpopup(${data[i].idx})'>
                        <input class='hold_index' type='number' value=${data[i].idx}>
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
                                        <span class="list_time">종료</span>
                                    </div>
                                    <div class="l_company">
                                        <div class="l_name">
                                            <span>${data[i].bizName}</span>
                                        </div>
                                    </div>
                                    <div class="l_explain">
                                        <p class="host">개최자 : ${data[i].host}</p>
                                    </div>
                                </div>
                                <div class="list_subs2">
                                    <div class="l_prize">
                                        <p>총 상금 : <span>${data[i].totalReward}</span></p>
                                    </div>
                                    <div class="l_days">
                                        <p>참여 작품 : <span>${data[i].join_count}<em>개</em></span></p>
                                    </div>
                                    <div class="l_person">
                                        <p>조회수 : <span> ${data[i].views}명</span></p>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </li>`;

                    //메인 개최 리스트 추가
                    $(".end_list ul").append(EList)
                }
            }
            //검색결과 없을떄
            if (data.length == 0) {
                var Nsearch = `<div class='not_search'>
                    <div class='img_box'>
                        <img src='/img/not_search_icon.png' alt='vicon_icon'>
                    </div>
                    <h2>'${KeywordVal}' 검색결과가 없습니다</h2>
                    <p>검색 결과를 찾지 못했습니다.<br>검색어를 확인하시고 다시 검색해주세요.</p>
                </div>
                `;

                $(".end_list ul").append(Nsearch);
            }
        },
        error: function (err) {
            console.log(err);
        },
    });
};