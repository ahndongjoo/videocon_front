$(function(){

    //콘테스트 상태 리스트 갯수
    contestNumber();

    //유저 타입별 콘테스트 버튼 추가 
    if(UT == "2"){
        $(".my_c_list").css("display" , "none");
        $(".my_a_list").css("display" , "inline-block");

    }else{
        $(".my_c_list").css("display" , "inline-block");
        $(".my_a_list").css("display" , "none");
    }
})

//콘테스트 상태 리스트 갯수
function contestNumber(){
    $.ajax({
        headers : {"Authorization" : "Basic " + UD},
        url: `${E}/api/v1/user/project-count`,
        method: 'GET',
        dataType: 'JSON',
        success: function(data){
            $(".m_pro ul li:nth-child(1) a em").text(data.jsonProj.projAll);
            $(".m_pro ul li:nth-child(2) a em").text(data.jsonProj.projIng);
            $(".m_pro ul li:nth-child(3) a em").text(data.jsonProj.projScreen);
            $(".m_pro ul li:nth-child(4) a em").text(data.jsonProj.projEnd);
            $(".m_pro ul li:nth-child(5) a em").text(data.jsonProj.projRes);

        },error: function(err){

        }   
    })
};

// 페이지네이션 기본(무한스크롤)
var sort = "0";

$(document).ready(function(){

    //기본 콘테스트 호출
    MyBalist()

    //무한 스크롤 페이징
    // $(window).scroll(function(){
    //     if($(window).scrollTop() == $(document).height() - $(window).height() && !temp){
    //         CP ++;
    //         MyBalist()
    //     }else{
    //     } 
    // });
});

// 마이페이지 콘테스트 기본 리스트
var MyBalist = function(){

    $(".el_box ul").html(""); //리스트 비우기

    if (UT == "1") {
        $.ajax({
            headers: { Authorization: "Basic " + UD},
            url: `${E}/api/v1/user/project?sort=${sort}&page=${CP}`,
            method: "GET",
            success: function (data) {
                if (typeof data !== "undefined") {
                    for (i = 0; i < data.length; i++) {
                        var idx = data[i].idx;
                        var name = data[i].name;
                        var purpose = data[i].purpose;
                        var script = data[i].script;
                        var thumbnail = data[i].thumbnail;
                        var host = data[i].host;

                        var ProList = 
                        `<li onclick="MainHpopup(${idx});">
                            <input class='hold_index' type="number" value=${idx}>
                            <div class="pj_left">
                                <div class="img_box">
                                    <img src=${thumbnail}> 
                                </div>
                            </div>
                            <div class="pj_right">
                                <div class="pj_top">
                                    <h2>[<em>${purpose}</em>]</h2>
                                    <p>${name}</p>
                                    <span>개최자 : <em>${host}</em></span>
                                </div>
                                <div class="pj_bot">
                                    <p>${script}</p>
                                </div>
                                <div class="pj_btn">
                                    <a onclick="MyCandiList(${idx})" class="allow_btn allow_btn1" href="javascript:;"><span>참여작 보기</span></a>
                                    <a onclick="MyLastiList()" class="allow_btn allow_btn2" href="javascript:;"><span>최종 작품 확인</span></a>
                                </div>
                            </div>
                        </li>`;
                    
                    //개최 리스트 추가
                    $(".el_box ul").append(ProList);
                    $(".allow_btn1").css("display" , "inline-block")

                    }
                } else {

                }
            },
            error: function (error) {
                console.log(error);
            },
        });

    } else {

        // 참여한 리스트 호출
        if (UT == "2") {
            $.ajax({
                headers: { Authorization: "Basic " + UD },
                url: `${E}/api/v1/user/project?sort=${sort}&page=${CP}`,
                method: "GET",
                success: function (data) {
                    
                    if (typeof data !== "undefined") {
                        for (i = 0; i < data.length; i++) {
                            var idx = data[i].idx;
                            var name = data[i].name;
                            var purpose = data[i].purpose;
                            var script = data[i].script;
                            var thumbnail = data[i].thumbnail;
                            var host = data[i].host;
                            var name = data[i].name;
                            var del = data[i].delete;

                            var ProList = 
                            `<li onclick="MainHpopup(${idx});">
                                <input class='hold_index' type="number" value=${idx}>
                                <div class="pj_left">
                                    <div class="img_box">
                                        <img src=${thumbnail}> 
                                    </div>
                                </div>
                                <div class="pj_right">
                                    <div class="pj_top">
                                        <h2>[<em>${purpose}</em>]</h2>
                                        <p>${name}</p>
                                        <span>개최자 : <em>${host}</em></span>
                                    </div>
                                    <div class="pj_bot">
                                        <p>${script}</p>
                                    </div>
                                    <div class="pj_btn">
                                        <a onclick="MyProList(${idx} , ${del})" class="allow_btn allow_btn1" href="javascript:;"><span>내 작품보기</span></a>
                                    </div>
                                </div>
                            </li>`;

                            //개최 리스트 추가
                            $(".el_box ul").append(ProList);
                            $(".allow_btn1").css("display" , "inline-block")

                        }
                    } else {

                    }
                },
                error: function (error) {
                    console.log(error);
                },
            });
        }
    }
};

// 마이페이지 진행과정 리스트 호출(Category)
var MyCateList = function(target) {
    
    sort = $(target).data("sort");
    CP = 1;

    // 리스트 비우기
    $(".el_box ul").html(""); 

    //참여작 초기화
    $(".candidate_box").css("display" , "none");

    //기본 상태 텍스트 처리
    $(".end_text").css("display" , "none");

    if (UT == "1") {
        $.ajax({
            headers: { Authorization: "Basic " + UD },
            url: `${E}/api/v1/user/project?sort=${sort}&page=${CP}`,
            method: "GET",
            success: function (data) {
                if (typeof data !== "undefined") {

                    for (i = 0; i < data.length; i++) {
                        var idx = data[i].idx;
                        var name = data[i].name;;
                        var purpose = data[i].purpose;
                        var script = data[i].script;
                        var thumbnail = data[i].thumbnail;
                        var host = data[i].host;

                        var ProList = 
                        `<li onclick="MainHpopup(${idx});">
                            <input class='hold_index' type="number" value=${idx}>
                            <div class="pj_left">
                                <div class="img_box">
                                    <img src=${thumbnail}> 
                                </div>
                            </div>
                            <div class="pj_right">
                                <div class="pj_top">
                                    <h2>[<em>${purpose}</em>]</h2>
                                    <p>${name}</p>
                                    <span>개최자 : <em>${host}</em></span>
                                </div>
                                <div class="pj_bot">
                                    <p>${script}</p>
                                </div>
                                <div class="pj_btn">
                                    <a id="triCl" onclick="MyCandiList(${idx} , ${sort})" class="allow_btn allow_btn1" href="javascript:;"><span>참여작 보기</span></a>
                                    <a onclick="MyLastiList(${idx}, ${sort})" class="allow_btn allow_btn2" href="javascript:;"><span>최종 작품 확인</span></a>
                                </div>
                            </div>
                        </li>`;
                    
                    //개최 리스트 추가
                    $(".el_box ul").append(ProList);

                    }
                    switch(sort){
                        case 0 : $(".allow_btn1").css("display" , "inline-block"); break; 
                        case 1 : $(".allow_btn1").css("display" , "inline-block"); break;
                        case 2 : $(".allow_btn2").css("display" , "inline-block"); break;
                        case 3 : $(".allow_btn1").css("display" , "inline-block"); break;
                    }

                } else {

                }
            },
            error: function (error) {
                console.log(error);
            },
        });

    } else {
        
        // 참여한 리스트 호출
        if (UT == "2") {
            $.ajax({
                headers: { Authorization: "Basic " + UD },
                url: `${E}/api/v1/user/project?sort=${sort}&page=${CP}`,
                method: "GET",
                success: function (data) {
                    $(".ud_btn2").css("display" , "block")
                    if (typeof data !== "undefined") {

                        for (i = 0; i < data.length; i++) {
                            var idx = data[i].idx;
                            var name = data[i].name;;
                            var purpose = data[i].purpose;
                            var script = data[i].script;
                            var thumbnail = data[i].thumbnail;
                            var host = data[i].host;
                            var rank = data[i].rank;
                            var del = data[i].delete;
                            
                            var ProList = 
                            `<li onclick="MainHpopup(${idx});">
                                <input class='hold_index' type="number" value=${idx}>
                                <div class="pj_left">
                                    <div class="img_box">
                                        <img src=${thumbnail}> 
                                    </div>
                                </div>
                                <div class="pj_right">
                                    <div class="pj_top">
                                        <h2>[<em>${purpose}</em>]</h2>
                                        <p>${name}</p>
                                        <span>개최자 : <em>${host}</em></span>
                                    </div>
                                    <div class="pj_bot">
                                        <p>${script}</p>
                                    </div>
                                    <div class="pj_btn">
                                        <a onclick="MyProList(${idx} , ${del});" class="allow_btn3" href="javascript:;"><span>내 작품보기</span></a>
                                        <a class="allow_btn4" href="/sub/mypage2/mypage(chat).html"><span>채팅하기</span></a>
                                    </div>
                                    <div class="rank_box" data-rank=${rank}>
                                        <img src="/img/${rank}medal_icon.png">
                                    </div>
                                </div>
                            </li>`;

                            //개최 리스트 추가
                            $(".el_box ul").append(ProList);

                        }

                        switch(sort){
                            case 0 : $(".allow_btn3").css("display" , "inline-block"), $(".ud_btn2 a").attr("href" , "javascript:;").text("내 작품보기"); break; 
                            case 1 : $(".allow_btn3").css("display" , "inline-block"), $(".ud_btn2 a").attr("href" , "/sub/contest_list/contest_ing/parti.html").text("추가 참여하기"); break;
                            case 2 : $(".allow_btn3").css("display" , "inline-block"), $(".ud_btn2 a").attr("href" , "javascript:;").text("종료된 콘테스트"); break;
                            case 3 : $(".allow_btn3").css("display" , "inline-block"), $(".ud_btn2 a").attr("href" , "javascript:;").text("심사중인 콘테스트"); break;
                            case 4 : $(".allow_btn4").css("display" , "inline-block"); $(".rank_box").css("display" , "block") ,$(".ud_btn2 a").attr("href" , "javascript:;").text("종료된 콘테스트"); break;
                            default : "";
                        }
                        
                        var arr = []
                        var RankBox = $(".rank_box");
                        arr.forEach.call((RankBox), (item, index) => {
                            var rankNum = $(item).data("rank");
                            switch(rankNum){
                                case 1 : $(this).find("img").attr("src" , "/img/first_icon.png"); break;
                                case 2 : $(this).find("img").attr("src" , "/img/second_icon.png"); break;
                                case 3 : $(this).find("img").attr("src" , "/img/thrid_icon.png"); break;
                            }
                        });

                    } else {

                    }
                },
                error: function (error) {
                    console.log(error);
                },
            });
        }
    }
};

//클라이언트 참여작 리스트
function MyCandiList(CaN , Sr){
    
    event.stopPropagation(); //부모 클릭 전파 막기
    $(".el_box ul").html(""); // 리스트 비우기
    $(".candidate_box ul").html(""); // 리스트 비우기
    $(".candidate_box .box_bot p").fadeIn(300);

    $.ajax({
        headers : {"Authorization" : "Basic " + UD},
        url: `${E}/api/v1/contest/join/${CaN}?page=${1}&sort=${0}`,
        method : 'GET',
        success: function(data){
        
            $(".candidate_box").fadeIn();

            //참여작 기본 홏출 정보
            $(".candtitle").text(data.name);
            $(".canddate").text(data.period);
            
            if(typeof data !== "undefined"){

                for(i = 0; i < data.list.length; i++ ){

                    var index = data.list[i].idx
                    var nickname = data.list[i].nickname
                    var nominee = data.list[i].nominee
                    var thumbnail = data.list[i].thumbnail
                    var video = data.list[i].video
                    var profile = data.list[i].userProfile
                    var nominee = data.list[i].nominee
                    
                    var proList = 
                    `<li onclick="MyCandDetail(${CaN},${index})">
                        <div class="video_thum">
                            <div class="thum_inner">
                                <img src="${thumbnail}">
                            </div>
                            <div class="detail_btn">
                                <a href="javascript:;"><span>자세히 보기</span></a>
                            </div>
                            <div onclick="selectBtn(this);" class="select_btn" data-ct=${CaN} data-at=${index} data-nominee=${nominee}>

                            </div>
                        </div>
                        <div class="text_box">
                            <div class="c_img">
                                <img src="${profile}">
                            </div>
                            <div class="c_nick">
                                <span>${nickname}</span>
                            </div>
                        </div>
                    </li>`;

                    //개최 리스트 추가
                    $(".candidate_box ul").append(proList);
                }
                
                //후보등록 상태표시
                $(".select_btn").each(function(){
                    if($(this).data("nominee") == "1"){
                        $(this).addClass("active");
                    }else{
                        $(this).removeClass("active");
                    }
                });

                //후보작 갯수 
                $(".candinum").text(data.list.length);

                //심사중 후보작 리스트 버튼
                if(Sr == "3"){
                    $(".cho_btn").fadeIn(300);
                    $(".get_btn").css("display" , "none");
                    $(".cho_btn").find("a").attr("data-ct" , `${CaN}`);

                }else{
                    $(".cho_btn").css("display" , "none");
                    $(".get_btn").css("display" , "none");
                }

            }else{

            }

        },error:function(error){
            
        }
    })
};

//콘테스트 후보등록
function selectBtn(target){

    event.stopPropagation(); //부모 클릭 전파 막기

    var SCT = $(target).data("ct");
    var SAT = $(target).data("at");

    if ($(target).hasClass("active")){

        alert("후보등록이 취소되었습니다.");
        $(target).removeClass("active");
        //후보등록 활성화
        $.ajax({
                
            headers : {"Authorization" : "Basic " + UD},
            url: `${E}/api/v1/contest/join/${SCT}/${SAT}`,
            method : 'DELETE',
            success: function(data){
                $(target).data("nominee" ,"0");

            },error:function(error){
                console.log(error);
            }
        })
        
    } else {

        alert("후보등록이 완료되었습니다.");
        $(target).addClass("active");

        //후보등록 비활성화
        $.ajax({
        
            headers : {"Authorization" : "Basic " + UD},
            url: `${E}/api/v1/contest//join/${SCT}/${SAT}`,
            method : 'POST',
            success: function(data){
                $(target).data("nominee" ,"1");
            },error:function(error){

                console.log(error);
            }
        })
        
    }
};

// 슬릭슬라이더 기능
function slickSl() {
    $(".pro_slide ul").slick({
        infinite: true,
        arrows: true,
        fade: true,
        infinite: true,
        autoplay: false,
        lidesToShow: 1,
        // dots: true,
    });
    ScrollNone()
}