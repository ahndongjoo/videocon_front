var E = "https://api.videocon.io";

// 페이지네이션 기본(무한스크롤)
var CP = "1";
var category = "";
var KeywordVal = "";
var sort = "0";
var industry = "";

//SWIPER 슬라이더
$(".swiper-container").each(function (index, element) {
    var $this = $(this);
    $this.addClass("swiper" + index);

    var swiper = new Swiper(".swiper" + index, {
        slidesPerView: "7",
        spaceBetween: 10,
        loop: true,
        observer: true,
        observeParents: true,
        navigation: {
            nextEl: $(".swiper" + index).children(".swiper-button-next"),
            prevEl: $(".swiper" + index).children(".swiper-button-prev"),
        },
        watchOverflow: true,
    });
});

/*********** 진행중인 콘테스트 ***********/
$(function () {
    $.ajax({
        url: `${E}/api/v1/contest?keyword=${KeywordVal}&category=${category}&industry=${industry}&sort=${sort}&page=${CP}`,
        method: "GET",
        success: function (data) {
            if (typeof data !== "undefined") {
                for (i = 0; i < data.length; i++) {
                    var idx = data[i].idx;
                    var name = data[i].name;
                    var purpose = data[i].purpose;
                    var totalReward = data[i].totalReward;
                    var script = data[i].script;
                    var views = data[i].views;
                    var dDay = data[i].dDay;
                    var thumbnail = data[i].thumbnail;
                    var poster = data[i].thumbnail;
                    var bizName = data[i].bizName;

                    var holdList = 
                    `<li onclick="Mposter(${idx})"> 
                        <div class="mlist_img">
                            <img src=${thumbnail}>
                            <div class="ddays">
                                <span>D-<em>${dDay}</em></span>
                             </div>
                        </div>
                        <div class="mlist_text">
                            <div class="mtext1">
                                <p>[<em>${purpose}</em>]</p>
                                <h2>${name}</h2>
                                <span>${bizName}</span>
                            </div>
                            <div class="mtext2">
                                <span>총 상금: <em>${totalReward}</em></span>
                                <span><em>${views}</em></span>
                            </div>
                            <div class="mtext3"></div>
                        </div>
                     </li>`;

                    //개최 리스트 추가
                    $(".mobile_list ul").append(holdList).children(":last").hide().fadeIn(100);
                }
            }
        },
        error: function (err) {
            alert("로그인 후 이용할 수 있습니다.");
            console.log(err);
        },
    });
});

//진행중인 카테고리 분류
var IngCate = function (target) {
    CP = 1;
    var category = $(target).data("category");
    $(".mobile_list ul").html("");


    $.ajax({
        url: `${E}/api/v1/contest?keyword=${KeywordVal}&category=${category}&industry=${industry}&sort=${sort}&page=${CP}`,
        method: "GET",
        success: function (data) {
            if (typeof data !== "undefined") {
                for (i = 0; i < data.length; i++) {
                    var idx = data[i].idx;
                    var name = data[i].name;
                    var purpose = data[i].purpose;
                    var totalReward = data[i].totalReward;
                    var script = data[i].script;
                    var views = data[i].views;
                    var dDay = data[i].dDay;
                    var thumbnail = data[i].thumbnail;
                    var poster = data[i].thumbnail;
                    var bizName = data[i].bizName;

                    var holdList = 
                    `<li onclick="Mposter(${idx})">
                        <div class="mlist_img">
                            <img src=${thumbnail}>
                            <div class="ddays">
                                <span>D-<em>${dDay}</em></span>
                             </div>
                        </div>
                        <div class="mlist_text">
                            <div class="mtext1">
                                <p>[<em>${purpose}</em>]</p>
                                <h2>${name}</h2>
                                <span>${bizName}</span>
                            </div>
                            <div class="mtext2">
                                <span>총 상금: <em>${totalReward}</em></span>
                                <span><em>${views}</em></span>
                            </div>
                            <div class="mtext3"></div>
                        </div>
                     </li>`;

                    //개최 리스트 추가
                    $(".mobile_list ul").append(holdList).children(":last").hide().fadeIn(100);
                }
            }
        },
        error: function (err) {
            alert("로그인 후 이용할 수 있습니다.");
            console.log(err);
        },
    });
};

function Mposter(idx){
    $(".m_modal").css("display" , "block");
    ScrollNone()
    $.ajax({
        url: `${E}/api/v1/contest/detail/${idx}`,
        method: "GET",
        success: function (data) {
            $(".m_modal img").attr("src" ,"")
            $(".m_modal img").attr("src" ,data.poster)
        },
        error: function (error) {
            alert("로그인 후 이용할 수 있습니다.");
            console.log(error);
        },
    });
};

$(".mclose_btn").on("click" , function(){
    $(".m_modal").css("display" , "none");
    ScrollActive()
})
