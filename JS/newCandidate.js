$(".cho_btn").on("click" , function(){
    var CaN = $(this).children("a").attr("data-ct");
    var sort = 0

    //선정 페이지
    $(".final_show").fadeIn(500);
    $(".final_show .popup_inner").addClass("active");
    
    $.ajax({
        headers : {"Authorization" : "Basic " + UD},
        url: `${E}/api/v1/contest/join/${CaN}?page=${1}&sort=${sort}`,
        method : 'GET',
        success: function(data){

            $(".final_show .right_middle .right_sub ul").html("");
            var listCount = data.rewardCount["COUNT(*)"];

            for(i=0; i < listCount; i++){
                var candList = 
                `<li>
                    <a href="javascript:;" class="candi_video${i}" data-videoAr="">
                        <input type="text" id="${i}_index" class="rank_index rank_index${i}" name="join">
                        <input type="text" id="${i}_uid" class="user_uid user_uid${i}" name="userid">
                        <div class="title_video link_video">
                            <video class="video-js vjs-big-play-centered vjs-default-skin vjs-fill candi_link${i}" data-setup='{}' controls preload="auto" webkit-playsinline>
                                <source src="#" type="video/mp4">
                            </video>
                        </div>
                    </a>
                </li>`
                $(".final_show .right_middle ul").append(candList);
            }

            //비디오js 활성화
            $(".final_show .right_middle ul li .title_video video").each(function (idx, item) {
                videojs(item);
            });
            
            //선정 페이지
            $(".final_show").fadeIn(500);
            $(".final_show .popup_inner").addClass("active");
            ScrollNone();

            if(typeof data !== "undefined"){

                //후보작 데이터 변경
                $(".final_show .top_title h2").text(data.name); // 후보작 선정 제목
                $(".final_show .top_cate p span").text(data.period); // 후보작 선정 기간

                //후보작 리스트 비우기
                $(".final_show .left_middle ul").html("");

                for(i = 0; i < data.list.length; i++){

                    var index = data.list[i].idx
                    var userId = data.list[i].userId
                    var nickname = data.list[i].nickname
                    var nominee = data.list[i].nominee
                    var thumbnail = data.list[i].thumbnail
                    var video = data.list[i].video
                    var profile = data.list[i].userProfile
                    var nominee = data.list[i].nominee
                    
                    //후보작 리스트 생성
                    var proList = 
                    `<li>
                        <div class="video_thum">
                            <div class="thum_inner">
                                <img src=${thumbnail}>
                            </div>
                            <div class="detail_btn choice_btn">
                                <a href="javascript:;" data-video=${video} data-at=${index} data-uid=${userId}><span>선정하기</span></a>
                            </div>
                            <div class="select_btn" data-ct=${CaN} data-at=${index} data-nominee=${nominee}>
                                
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
                    $(".final_show .left_middle ul").append(proList);
                
                }ProselectData(CaN)

                //후보등록 상태표시
                $(".select_btn").each(function(){
                    if($(this).data("nominee") == "1"){
                        $(this).addClass("active");
                    }else{
                        $(this).removeClass("active");
                    }
                });
            }
        },error:function(error){

            console.log(error);
        }
    })
});

// 수상작 선정
function ProselectData(CaN){
    
    //수상작 갯수
    var VideoLength = $(".final_show .right_middle ul li .title_video video").length;

    //src 배열 담기
    var selectVideoArray = [];
    var selectIndexArray = [];
    var selectUidArray = [];
    var i = 0;

    $(".choice_btn").on("click" , function(){

        var proSrc = $(this).children("a").data("video");
        var proIndex = $(this).children("a").data("at");
        var proUid = $(this).children("a").data("uid");
        
        if($(this).closest("li").hasClass("active")){
            alert('이미 등록한 영상입니다.');
        
        }else {

            // 배열 3개까지 담기
            if(selectVideoArray.length == VideoLength){
                alert(`순위는 ${VideoLength}위까지 등록 가능합니다`);
                return false

            } else {

                // 배열에 담기
                selectVideoArray.push(proSrc);
                selectIndexArray.push(proIndex);
                selectUidArray.push(proUid);

                $(this).closest("li").addClass("active videoAr_0"+selectVideoArray.length);
                
                $(`.candi_video${i}`).find('video').attr('src' , selectVideoArray[i]);
                $(`.candi_video${i}`).find(`.rank_index${i}`).val(selectIndexArray[i]);
                $(`.candi_video${i}`).find(`.user_uid${i}`).val(selectUidArray[i]);
                i++
            }
        }
    });
    
    // 수상작 초기화
    $(".submit_btn a:nth-child(1)").on("click" , function(){
        
        if(confirm("수상자 선정을 초기화 하시겠습니까?")){

            //수상작 갯수
            var VideoLength = $(".final_show .right_middle ul .title_video video").length;

            // 수상작 모든 정보 초기화
            for(i=0; i < VideoLength+1; i++){
                $(`.candi_video${i}`).find("video").attr('src' , "");
                $(`.rank_index${i}`).val("");
                $(`.user_uid${i}`).val("");
                $(".detail_btn").closest("li").removeClass(`active videoAr_0${i}`);
            }

            // 배열 전체삭제
            selectVideoArray = [];
            selectIndexArray = [];
            selectUidArray = [];
            $(".popup_left2 ul li").removeClass("active");
            i = 0;

            console.log(selectIndexArray)
            console.log(selectUidArray)
            console.log(selectVideoArray)
        }
    });

    // 수장작 제출하기 
    $(".submit_btn a:nth-child(2)").on("click" , function(){
        var result = []
        var joinKey = "joinId";
        var rankKey = "rank";
        var userId = "userId";

        if(selectVideoArray.length){

            for(i=0; i < selectVideoArray.length; i ++) {
                var tempJson = {}
                
                tempJson[joinKey] = selectIndexArray[i]
                tempJson[userId] = selectUidArray[i]
                tempJson[rankKey] = i+1
                
                result[i] = tempJson
            }
            
            console.log(result);

            var Smessage =  confirm("제출하시겠습니까??");
            if(Smessage == true){
                $.ajax({
                    headers : {"Authorization" : "Basic " + UD},
                    url: `${E}/api/v1/contest/${CaN}/winner`,
                    method : 'POST',
                    data : {
                        ranks : result
                    },
                    success:function(data){            
                       
                        location.href = "/sub/contest_list/contest_client/success(candi).html";

                    },error:function(error){
                        alert("제출 중 오류가 발생했습니다. 문제가 지속될 시 채널톡으로 문의 바랍니다.");
                        // location.href = "/sub/mypage/user_common/user_project/cli_project/cli_project.html";
                        console.log(error);
                    }
                })
            }

        } else{
            alert("최종 작품 선정 후 제출하기를 클릭해 주세요.")
            console.log("오류가 발생했습니다.")
        }
    });
};