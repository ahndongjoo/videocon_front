function MyLastiList(CaN , Sr){
    //상위 li 클릭 제거
    event.stopPropagation(); //부모 클릭 전파 막기

    // 리스트 비우기
    $(".el_box ul").html(""); 

    //종료된 정보 호출
    MyCandiInfo(CaN)

    //기본 상태 텍스트 처리
    $(".end_text").fadeIn(300);
    $(".candidate_box .box_bot p").css("display" , "none");

    if(UT == 1){
        
        $.ajax({
            headers : {"Authorization" : "Basic " + UD},
            url :`${E}/api/v1/contest/${CaN}/winner`,
            type:'GET',
            success: function(data){
                $(".candidate_box").fadeIn(500);

                //참여작 기본 홏출 정보 
                $(".candtitle").text(data.name);
                $(".canddate").text(data.period);

                if(data !== "undefined"){
                    // $(".video_cont .video_box ul").html(""); //리스트 비우기
    
                    for(i = 0; i < data.length; i++){

                        var index = data[i].idx
                        var nickname = data[i].nickname
                        var nominee = data[i].nominee
                        var thumbnail = data[i].thumbnail
                        var video = data[i].video
                        var profileImg = data[i].profileImg
                        
                        var proList = 
                        `<li onclick="MyChat(${CaN},${index})" class="active videoAr_0${i+1}">
                            <div class="video_thum">
                                <div class="thum_inner">
                                    <img src="${thumbnail}">
                                </div>
                            </div>
                            <div class="text_box">
                                <div class="c_img">
                                    <img src="${profileImg}">
                                </div>
                                <div class="c_nick">
                                    <span>${nickname}</span>
                                </div>
                            </div>
                        </li>`;
    
                        //개최 리스트 추가
                        $(".candidate_box ul").append(proList);

                    }
                    //심사중 후보작 리스트 버튼
                    if(Sr != "3"){
                        $(".final_btn").css("display" , "none");
                        $(".get_btn").css("display" , "block");
                        $(".get_btn").find("a").attr("data-clt" , `${CaN}`);
                    }else{

                    }
    
                }else{
                    
                }
    
            },
            error : function(err){
                console.log(err);
            }
        })
    }else{
        $.ajax({
            headers : {"Authorization" : "Basic " + UD},
            url :`${E}/api/v1/artrator/${CaN}/winner`,
            type:'GET',
            success: function(data){
                if(typeof data !== "undefined"){

                    // $(".video_cont .video_box ul").html(""); //리스트 비우기
    
                    for(i = 0; i < data.length; i++ ){

                        var index = data.list[i].idx
                        var nickname = data.list[i].nickname
                        var nominee = data.list[i].nominee
                        var thumbnail = data.list[i].thumbnail
                        var video = data.list[i].video
                        var profile = data.list[i].userProfile
                        
                        var proList = 
                        `<li onclick="MyCandDetail(${CaN},${index})">
                            <div class="video_thum">
                                <div class="thum_inner">
                                    <img src="${thumbnail}">
                                </div>
                                <div class="detail_btn">
                                    <a href="javascript:;"><span>자세히 보기</span></a>
                                </div>
                                <div class="select_btn" data-ct=${CaN} data-at=${index}>
    
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
    
                }else{
                    
                }
    
            },
            error : function(err){
                console.log(err);
            }
        })
    }
};

//클라이언트 후보작 텍스트
function MyCandiInfo(CaN){
    
    $(".pj_box > ul").html(""); // 리스트 비우기
    $(".candidate_box ul").html(""); // 리스트 비우기

    $.ajax({
        headers : {"Authorization" : "Basic " + UD},
        url: `${E}/api/v1/contest/join/${CaN}?page=${1}&sort=${0}`,
        method : 'GET',
        async: false,
        success: function(data){
            
            $(".candidate_box").fadeIn(500);

            //참여작 기본 홏출 정보
            $(".candtitle").text(data.name);
            $(".canddate").text(data.period);
            
        },error:function(error){
            
        }
    })
};


$(".get_btn").on("click" , function(){
    var CT = $(this).children("a").attr("data-clt");

    $.cookie('CT' , null,{ path : '/' });
	$.cookie('CT' , CT,{ path : '/' });

    location.href = "/sub/mypage2/mypage(chat).html";
});
