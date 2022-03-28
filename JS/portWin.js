// 페이지네이션 기본(무한스크롤)
var category = "";
var KeywordVal = "";
var sort = "0";
var industry = "";

$(function(){
    WinBaList()

    //무한 스크롤 페이징
    $(window).scroll(function(){
        var maxHeight = $(document).height();
        var currentScroll = $(window).scrollTop() + $(window).height();

        if(maxHeight <= currentScroll + 350 && temp == false && !isAJAX){
            CP ++;    
            WinBaList()
        }
    });
});

/********** 우승자 포트폴리오(메인) ***********/
var WinBaList = function(){
    isAJAX = true;

    $.ajax({
        url :`${E}/api/v1/portfolio/award-list?keyword=${KeywordVal}&category=${category}&industry=${industry}&sort=${sort}&page=${CP}`,
        method:'GET',
        success: function(data){
            setTimeout(function(){
                if(data.length >= 1){
                    $(".main_loading").css("display" , "none");
                    
                    for(i = 0; i < data.length; i++ ){
                        var idx = data[i].idx
                        var name = data[i].name
                        var thumbnail = data[i].thumbnail
                        var industry = data[i].industry
                        var style = data[i].style
                        var nickname = data[i].nickname
                        var userProfile = data[i].userProfile
                        var joinDate = data[i].joinDate
                        var views = data[i].views
    
                        var WList = 
                        `<li onclick='MainWpopup(${idx})'>
                            <input class='hold_index' type='number' value=${idx}>
                            <div class="middle_video">
                                <div class="video_thum">
                                    <div class="thum_inner">
                                        <a href="javascript:;">
                                            <img src=${thumbnail}>
                                        </a>
                                    </div>
                                </div>
                                <div class="middle_text">
                                    <a href="javascript:;">
                                        <div class="text_middle">
                                            <span><em>#${style}</em></span>
                                            <span><em>#${industry}</em></span>
                                            <h4>${name}</h4>
                                        </div>
                                        <div class="text_bot">
                                            <div class="a_img">
                                                <img src=${userProfile}>
                                            </div>
                                            <div class="a_nick">
                                                <span>${nickname}</span>
                                            </div>
                                        </div>
                                        <div class="text_view">
                                            <p class='c_date'><b>${views}</b></p>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </li>
                        `;
    
                        //포트폴리오 리스트 추가
                        $(".port_middle .middle_box ul").append(WList).children(':last').hide().fadeIn(300);
                    }
                    isAJAX  = false;

                }else{
                    $(".main_loading").css("display" , "none");
                    temp = true;
                }
            },300)

        },error: function(err){
            console.log(err);
        }
    });
};

//우승자 메인 카테고리 분류
var WinCate = function(target){

    CP = 1

    //리스트 초기화
    category = $(target).data("category");
    $(".port_middle .middle_box ul").html("");

    $.ajax({
        url :`${E}/api/v1/portfolio/award-list?keyword=${KeywordVal}&category=${category}&industry=${industry}&sort=${sort}&page=${CP}`,
        method:'GET',
        success: function(data){
            if(typeof data !== "undefined"){
                $(".port_middle .middle_box ul").html("");

                for(i = 0; i < data.length; i++ ){

                    var idx = data[i].idx
                    var name = data[i].name
                    var thumbnail = data[i].thumbnail
                    var industry = data[i].industry
                    var style = data[i].style
                    var nickname = data[i].nickname
                    var userProfile = data[i].userProfile
                    var joinDate = data[i].joinDate
                    var views = data[i].views

                    var WList = 
                    `<li onclick='MainWpopup(${idx})'>
                        <input class='hold_index' type='number' value=${idx}>
                        <div class="middle_video">
                            <div class="video_thum">
                                <div class="thum_inner">
                                    <a href="javascript:;">
                                        <img src=${thumbnail}>
                                    </a>
                                </div>
                            </div>
                            <div class="middle_text">
                                <a href="javascript:;">
                                    <div class="text_middle">
                                        <span><em>#${style}</em></span>
                                        <span><em>#${industry}</em></span>
                                        <h4>${name}</h4>
                                    </div>
                                    <div class="text_bot">
                                        <div class="a_img">
                                            <img src=${userProfile}>
                                        </div>
                                        <div class="a_nick">
                                            <span>${nickname}</span>
                                        </div>
                                    </div>
                                    <div class="text_view">
                                        <p class='c_date'><b>${views}</b></p>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </li>
                    `;

                    //포트폴리오 리스트 추가
                    $(".port_middle .middle_box ul").append(WList);
                }
                
            }else{

            }

        },error: function(err){
            console.log(err);
        }
    });
};

//우승자 SORT 카테고리 분류
var WinDate = function(target){

    CP = 1

    //리스트 초기화
    sort = $(target).data("sort");
    $(".port_middle .middle_box ul").html("");

    $.ajax({
        url :`${E}/api/v1/portfolio/award-list?keyword=${KeywordVal}&category=${category}&industry=${industry}&sort=${sort}&page=${CP}`,
        method:'GET',
        success: function(data){

            if(typeof data !== "undefined"){
                $(".port_middle .middle_box ul").html("");

                for(i = 0; i < data.length; i++ ){

                    var idx = data[i].idx
                    var name = data[i].name
                    var thumbnail = data[i].thumbnail
                    var industry = data[i].industry
                    var style = data[i].style
                    var nickname = data[i].nickname
                    var userProfile = data[i].userProfile
                    var joinDate = data[i].joinDate
                    var views = data[i].views

                    var WList = 
                    `<li onclick='MainWpopup(${idx})'>
                        <input class='hold_index' type='number' value=${idx}>
                        <div class="middle_video">
                            <div class="video_thum">
                                <div class="thum_inner">
                                    <a href="javascript:;">
                                        <img src=${thumbnail}>
                                    </a>
                                </div>
                            </div>
                            <div class="middle_text">
                                <a href="javascript:;">
                                    <div class="text_middle">
                                        <span><em>#${style}</em></span>
                                        <span><em>#${industry}</em></span>
                                        <h4>${name}</h4>
                                    </div>
                                    <div class="text_bot">
                                        <div class="a_img">
                                            <img src=${userProfile}>
                                        </div>
                                        <div class="a_nick">
                                            <span>${nickname}</span>
                                        </div>
                                    </div>
                                    <div class="text_view">
                                        <p class='c_date'><b>${views}</b></p>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </li>
                    `;

                    //포트폴리오 리스트 추가
                    $(".port_middle .middle_box ul").append(WList);
                }
                
            }else{

            }

        },error: function(err){
            console.log(err);
        }
    });
};

//우승자 INDUS 카테고리 분류
var WinIndus = function(target){

    CP = 1

    //리스트 초기화
    industry = $(target).data("industry");
    $(".port_middle .middle_box ul").html("");
    console.log(sort);

    $.ajax({
        url :`${E}/api/v1/portfolio/award-list?keyword=${KeywordVal}&category=${category}&industry=${industry}&sort=${sort}&page=${CP}`,
        method:'GET',
        success: function(data){

            if(typeof data !== "undefined"){
                $(".port_middle .middle_box ul").html("");

                for(i = 0; i < data.length; i++ ){

                    var idx = data[i].idx
                    var name = data[i].name
                    var thumbnail = data[i].thumbnail
                    var industry = data[i].industry
                    var style = data[i].style
                    var nickname = data[i].nickname
                    var userProfile = data[i].userProfile
                    var joinDate = data[i].joinDate
                    var views = data[i].views

                    var WList = 
                    `<li onclick='MainWpopup(${idx})'>
                        <input class='hold_index' type='number' value=${idx}>
                        <div class="middle_video">
                            <div class="video_thum">
                                <div class="thum_inner">
                                    <a href="javascript:;">
                                        <img src=${thumbnail}>
                                    </a>
                                </div>
                            </div>
                            <div class="middle_text">
                                <a href="javascript:;">
                                    <div class="text_middle">
                                        <span><em>#${style}</em></span>
                                        <span><em>#${industry}</em></span>
                                        <h4>${name}</h4>
                                    </div>
                                    <div class="text_bot">
                                        <div class="a_img">
                                            <img src=${userProfile}>
                                        </div>
                                        <div class="a_nick">
                                            <span>${nickname}</span>
                                        </div>
                                    </div>
                                    <div class="text_view">
                                        <p class='c_date'><b>${views}</b></p>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </li>
                    `;

                    //포트폴리오 리스트 추가
                    $(".port_middle .middle_box ul").append(WList);
                }
                
            }else{

            }

        },error: function(err){
            console.log(err);
        }
    });
};

//우승자 포트폴리오 검색
function WinSearch(target){
    
    KeywordVal = $(target).val();

    $.ajax({
        url :`${E}/api/v1/portfolio/award-list?keyword=${KeywordVal}&category=${category}&industry=${industry}&sort=${sort}&page=${1}`,
        method:'GET',
        success: function(data){
            if(typeof data !== "undefined"){
                $(".port_middle .middle_box ul").html("");

                for(i = 0; i < data.length; i++ ){

                    var idx = data[i].idx
                    var name = data[i].name
                    var thumbnail = data[i].thumbnail
                    var industry = data[i].industry
                    var style = data[i].style
                    var nickname = data[i].nickname
                    var userProfile = data[i].userProfile
                    var joinDate = data[i].joinDate
                    var views = data[i].views

                    var WList = 
                    `<li onclick='MainWpopup(${idx})'>
                        <input class='hold_index' type='number' value=${idx}>
                        <div class="middle_video">
                            <div class="video_thum">
                                <div class="thum_inner">
                                    <a href="javascript:;">
                                        <img src=${thumbnail}>
                                    </a>
                                </div>
                            </div>
                            <div class="middle_text">
                                <a href="javascript:;">
                                    <div class="text_middle">
                                        <span><em>#${style}</em></span>
                                        <span><em>#${industry}</em></span>
                                        <h4>${name}</h4>
                                    </div>
                                    <div class="text_bot">
                                        <div class="a_img">
                                            <img src=${userProfile}>
                                        </div>
                                        <div class="a_nick">
                                            <span>${nickname}</span>
                                        </div>
                                    </div>
                                    <div class="text_view">
                                        <p class='c_date'><b>${views}</b></p>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </li>
                    `;

                    //포트폴리오 리스트 추가
                    $(".port_middle .middle_box ul").append(WList);
                }
                
            }
            //검색결과 없을떄 
            if(data.length == 0){
               
                var Nsearch =
                `<div class='not_search'>
                    <div class='img_box'>
                        <img src='/img/not_search_icon.png' alt='vicon_icon'>
                    </div>
                    <h2>'${KeywordVal}' 검색결과가 없습니다</h2>
                    <p>검색 결과를 찾지 못했습니다.<br>검색어를 확인하시고 다시 검색해주세요.</p>
                </div>
                `

                $(".port_middle .middle_box ul").append(Nsearch);
            }
            
        },error: function(err){
            console.log(err);
        }
    });
};
