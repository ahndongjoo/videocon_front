$(document).ready(function(){

    var holdIngModal = 
    `<div class="read_popup ing_popup">
                <div class="popup_bg popup_close"></div>
                <div class="popup_box1">
                    <div class="popup_inner">
                        <div class="popup_left">
                            <div class="left_top">
                                <div class="top_title">
                                    <h2></h2>
                                    <div class="top_cate">
                                        <p>회사 : <span class="company"></span></p>
                                    </div>
                                    <div class="top_cate">
                                        <p>일정 : <span class="days"></span></p>
                                    </div>
                                </div>
                            </div>
                            <div class="left_middle">
                                <div class="top_img">
                                    <div class="img_box">
                                        <img src="#" alt="콘테스트 포스터">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="popup_right">
                            <div class="popup_close">
                                <img src="/img/close_close.png">
                            </div>
                            <div class="popup_menu">
                                <ul>
                                    <li onclick="popupParti()">
                                        <a href="javascript:;">
                                            <div class="img_box">
                                                <img src="/img/pm_1.png" alt="">
                                            </div>
                                            <p>참가하기</p>
                                        </a>
                                    </li>
                                    <li onclick="readyAlert()" class="cont_share">
                                        <a href=javascript:;>
                                            <div class="img_box">
                                                <img src="/img/pm_3.png" alt="">
                                            </div>
                                            <p>공유하기</p>
                                        </a>
                                    </li>
                                    <li onclick="popupLike(this)" class="cont_like">
                                        <a href=javascript:;>
                                            <div class="img_box">
                                                <img src="/img/pm_4w.png" alt="">
                                            </div>
                                            <p>찜하기</p>
                                        </a>
                                    </li>
                                    <li>
                                        <a href=javascript:;>
                                            <div class="img_box">
                                                <img src="/img/pm_2.png" alt="">
                                            </div>
                                            <p>주의사항</p>
                                        </a>
                                        <div class="popup_caution">
                                            <p>· 파일은 MP4 형태로 제출해야 합니다.</p>
                                            <p>· 저작권 문제는 100% 본인 책임입니다.</p>
                                            <p>· 수상작품은 기업의 상업용 목적으로 사용됩니다.</p>
                                            <p>· 처음 수상과는 별도로 추가 시상이 이루어질 수 있습니다</p>
                                            <p> (기존 최저 상금의 80% 이상 금액)</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div class="right_top">
                                <div class="right_title">
                                    <h2>상세설명</h2>
                                </div>
                            </div>
                            <div class="right_middle">
                                <div class="right_sub ing_sub">
                                    <dl>
                                        <dt class="ing_line1">📌 먼저 확인해 주세요</dt>
                                        <dd>
                                            <p></p>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>영상 이용 목적</dt>
                                        <dd>
                                            <p></p>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>시상 내역</dt>
                                        <dd class="reward_box"></dd>
                                        <dd class="text_t1"></dd>
                                    </dl>
                                    <dl>
                                        <dt>우린 이런 곳이에요</dt>
                                        <dd></dd>
                                    </dl>
                                    <dl>
                                        <dt>이런 느낌을 원해요</dt>
                                        <dd class="ing_style"></dd>
                                        <dd class="ing_ref">
                                            <a target="_blank" href="">참고 영상 보기</a>
                                            <img src="/img/ref_btn.png">
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt class="ing_line2">👀 꼼꼼하게 확인해 주세요</dt>
                                        <dd>
                                            <p></p>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>참고해 주세요</dt>
                                        <dd>
                                            <p></p>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>양식을 지켜주세요.</dt>
                                        <dd>
                                            <p><b>영상 길이</b> <span class="Vlength"></span></p>
                                            <span> , </span>
                                            <p><b>영상 비율</b> <span class="Vratio"></span></p>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>참고 파일</dt>
                                        <dd>
                                            <a class="Hfile">
                                                <p class="Hname"></p>
                                                <img src="/img/ing_down.png" alt="download_icon">
                                            </a>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>추가 혜택</dt>
                                        <dd>
                                            <p></p>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;

    var winModal = 
    `<div class="read_popup win_popup">
        <div class="popup_bg popup_close"></div>
        <div class="popup_box2">
            <div class="popup_inner">
                <div class="popup_left">
                    <div class="left_top">
                        <div class="top_title">
                            <h2></h2>
                            <div class="top_cate">
                                <div class="profile_box">
                                    <img src="/img/profile.png" alt="프로필사진">
                                </div>
                                <div class="nickname_box">
                                    <p></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="left_middle">
                        <div class="video_box">
                            <video class="video-js vjs-big-play-centered vjs-default-skin vjs-fill" data-setup='{}' controls preload="auto" webkit-playsinline>
                                <source src="/img/videocon_test.mp4">
                            </video>
                        </div>
                    </div>
                </div>
                <div class="popup_right">
                    <div class="popup_close">
                        <img src="/img/close_close.png">
                    </div>
                    <div class="right_top">
                        <div class="right_title">
                            <h2>우승작</h2>
                        </div>
                    </div>
                    <div class="right_middle">
                        <div class="right_sub">
                            <dl>
                                <dt>영상을 통해 무엇을 전달하고 싶었나요?</dt>
                                <dd>
                                    <p></p>
                                </dd>
                            </dl>
                            <dl>
                                <dt>영상은 어떤 유형인가요?</dt>
                                <dd>
                                    <span></span>
                                </dd>
                            </dl>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>`;

    var endModal =
    `<div class="read_popup end_popup">
        <div class="popup_bg popup_close"></div>
        <div class="popup_box3">
            <div class="popup_inner">
                <div class="popup_left">
                    <div class="left_top">
                        <div class="top_title">
                            <h2></h2>
                            <div class="top_cate">
                                <p>회사 : <span class="company"></span></p>
                            </div>
                            <div class="top_cate">
                                <p>일정 : <span class="days"></span></p>
                            </div>
                        </div>
                    </div>
                    <div class="left_middle">
                        <div class="top_img">
                            <div class="img_box">
                                <img src="#" alt="콘테스트 포스터">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="popup_right">
                    <div class="popup_close">
                        <img src="/img/close_close.png">
                    </div>
                    <div class="right_top">
                        <div class="right_title">
                            <h2>수상작</h2>
                        </div>
                    </div>
                    <div class="right_middle">
                        <div class="right_sub">
                            
                        </div>
                        <div class="left_bot">
                            <div class="read_btn read_btn3">
                                <div class="right_btn">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>`;

    var artModal =
    `
    <div class="read_popup art_show">
        <div class="popup_bg popup_close"></div>
        <div class="popup_box2">
            <div class="popup_inner">
                <div class="popup_close popup_close2">
                    <img src="/img/close_close.png">
                </div>
                <div class="pro_slide">
                    <ul>
                        
                    </ul>
                </div>
            </div>
        </div>
    </div>
    `

    var proModal = 
    `
    <div class="read_popup pro_show">
        <div class="popup_bg popup_close"></div>
        <div class="popup_box2">
            <div class="popup_inner">
                <div class="popup_left">
                    <div class="left_top">
                        <div class="top_title">
                            <h2>올바보 영상 올바보 영상 콘테스트 올바보</h2>
                            <div class="top_cate">
                                <div class="profile_box">
                                    <img src="/img/profile.png" alt="프로필사진">
                                </div>
                                <div class="nickname_box">
                                    <p>슬레이트미디어</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="left_middle">
                        <div class="video_box">
                            <video class="video-js vjs-big-play-centered vjs-default-skin vjs-fill" data-setup='{}' controls preload="auto" webkit-playsinline>
                                <source src="/img/videocon_test.mp4">
                            </video>
                        </div>
                    </div>
                </div>
                <div class="popup_right">
                    <div class="popup_close">
                        <img src="/img/close_close.png">
                    </div>
                    <div class="right_top">
                        <div class="right_title">
                            <h2>상세설명</h2>
                        </div>
                    </div>
                    <div class="right_middle">
                        <div class="right_sub">
                            <dl>
                                <dt>영상을 통해 무엇을 전달하고 싶었나요?</dt>
                                <dd>
                                    <p></p>
                                </dd>
                            </dl>
                        </div>
                        <div class="left_bot">
                            <div class="read_btn read_btn3">
                                <div class="right_btn">
                                    <a href="javascript:;"><img src="/img/heart_em3.png" alt="찜하기"></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `
    var finalModal = 
    `
    <div class="read_popup final_show">
        <div class="popup_bg popup_close"></div>
        <div class="popup_box4">
            <div class="popup_inner">
                <div class="popup_left popup_left2">
                    <div class="left_top">
                        <div class="top_title">
                            <h2></h2>
                            <div class="top_cate">
                                <p>기간 : <span></span></p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="left_middle">
                        <div class="candi_text">
                            <h3><img src="/img/wa_icon.png"><span>최종 수상할 작품을 순위에 맞추어 차례대로 선택하세요.</span></h3>
                        </div>
                        <ul>

                        </ul>
                    </div>
                </div>
                <div class="popup_right popup_right2">
                    <div class="popup_close">
                        <img src="/img/close_close.png">
                    </div>
                    <div class="right_top">
                        <div class="right_title">
                            <h2>우승작 선정</h2>
                        </div>
                    </div>
                    <div class="right_middle">
                        <div class="right_sub">
                            <ul>
                                
                            </ul>
                        </div>
                        <div class="left_bot">
                            <div class="submit_btn">
                                <a href="javascript:;">초기화</a>
                                <a href="javascript:;">제출하기</a>
                            </div>
                            <div class="final_text">
                                <img src="/img/wa_icon.png">
                                <p>콘테스트 특성상 선정된 작품은<br>변경이 불가능합니다.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `
    var userModal = 
    `
    <div class="read_popup user_popup">
        <div class="popup_bg popup_close"></div>
        <div class="popup_box2">
            <div class="popup_inner user_inner">
                <div class="inner_top">
                    <div class="popup_close">
                        <img src="/img/close_close.png">
                    </div>
                    <div class="text_box">
                        <h2>사용자 전환이란</h2>
                        <p>콘테스트 개최자인 <b>클라이언트</b>와 콘테스트 참여자인 <b>아트레이터</b>를 오갈 수 있는 전환기능입니다.</p>
                    </div>
                </div>
                <div class="inner_bot">
                    <div class="bot_box">
                        <div class="img_box">
                            <img src="/img/img-client.png">
                        </div>
                        <div class="text_box">
                            <h2>클라이언트</h2>
                            <p>콘테스트를 개최하는 회원입니다. 비디오콘 홈페이지에서 개최하기 메뉴를 통하여 콘테스트를 개최하고 멋진 제작자분들도 만나보세요!</p>
                        </div>
                    </div>
                    <div class="bot_box">
                        <div class="img_box">
                            <img src="/img/img-artrator.png">
                        </div>
                        <div class="text_box">
                            <h2>아트레이터</h2>
                            <p>ART+CREATOR을 결합한 말로 영상 제작자를 뜻합니다. 비디오콘에서 나에게 꼭 맞는 콘테스트에 참여해 멋진 영상을 만들어 보세요!</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `

    //상태값에 따른 모달 추가
    var modalVal = $(".modal_val").val();

    switch(modalVal){
        case "1" : $(".wrap").append(holdIngModal , winModal , endModal); break; // 메인
        case "2" : $(".wrap").append(holdIngModal); break; // 진행중인 콘테스트
        case "3" : $(".wrap").append(endModal); break; // 종료된 콘테스트
        case "4" : $(".wrap").append(winModal); break; // 우승자 포트폴리오
        case "5" : $(".wrap").append(holdIngModal , artModal , proModal , finalModal , userModal); break; // 마이페이지 
        case "6" : $(".wrap").append(userModal); break; // 마이페이지 인포
    }

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

    /*********** 참고파일 다운 ***********/
    $(".Hfile").on("click", function () {
        var fileIdx = $(this).attr("data-fileidx");

        $.ajax({
            headers: { Authorization: "Basic " + UD },
            url: `${E}/api/v1/contest/source`,
            method: "POST",
            data: { file: fileIdx },
            xhrFields: { responseType: "blob" },
            beforeSend: function () {
                $(".right_sub dl:nth-child(9) dd").addClass("active");
            },
            success: function (data, status, xhr) {
                $(".right_sub dl:nth-child(9) dd").removeClass("active");

                // check for a filename
                var filename = $(".Hname").text();
                var disposition = xhr.getResponseHeader("Content-Disposition");
                if (disposition && disposition.indexOf("attachment") !== -1) {
                    var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
                    var matches = filenameRegex.exec(disposition);
                    if (matches != null && matches[1]) filename = matches[1].replace(/['"]/g, "");
                }

                var type = xhr.getResponseHeader("Content-Type");
                var blob = new Blob([data], { type: type });

                if (typeof window.navigator.msSaveBlob !== "undefined") {
                    // IE workaround for "HTML7007: One or more blob URLs were revoked by closing the blob for which they were created. These URLs will no longer resolve as the data backing the URL has been freed."
                    window.navigator.msSaveBlob(blob, filename);
                } else {
                    var URL = window.URL || window.webkitURL;
                    var downloadUrl = URL.createObjectURL(blob);

                    if (filename) {
                        // use HTML5 a[download] attribute to specify filename
                        var a = document.createElement("a");
                        // safari doesn't support this yet
                        if (typeof a.download === "undefined") {
                            window.location = downloadUrl;
                        } else {
                            a.href = downloadUrl;
                            a.download = filename;
                            document.body.appendChild(a);
                            a.click();
                            window.URL.revokeObjectURL(downloadUrl);
                        }
                    } else {
                        window.location = downloadUrl;
                    }
                }
            },
            error: function (err) {
                console.log(err);
                alert("파일 다운로드는 로그인 후 이용할 수 있습니다. 다운로드가 안될 시 채널톡을 통해 문의 주세요!");
                $(".right_sub dl:nth-child(9) dd").removeClass("active");
            },
        });
    });

    //주의사항 모달
    $(".popup_menu ul li:nth-child(4) .img_box").on("click" , function(){
        $(".popup_caution").toggleClass("active")
    });
});

// 진행중인 콘테스트 상세보기(메인)
function MainHpopup(CaN){

    $.ajax({
        // headers : {"Authorization" : "Basic " + UD},
        headers : {"Authorization" : `Basic ${(UD == "null") ? "no-auth" : UD}`},
        url :`${E}/api/v1/contest/detail/${CaN}`,
        method:'GET',
        success: function(data){
            console.log(data);
            //기본 팝업설정
            $(".ing_popup").fadeIn(500);
            $(".ing_popup .popup_inner").addClass("active");
            ScrollNone()

            //데이터 상세
            $(".ing_popup .top_title h2").text(`${data.name}`); // 제목
            $(".ing_popup .top_cate .days").text(`${data.period}`); // 날짜
            $(".ing_popup .top_cate .company").text(`${data.bizName}`); // 회사
            $(".ing_popup .top_img .img_box img").attr("src" , `${data.poster}`); 
            $(".ing_popup .right_sub dl:nth-child(2) dd p").text(`${data.purpose}`); //영상 이용 목적
            $(".ing_popup .right_sub dl:nth-child(7) dd p").html(`${data.script}`); //상세 설명
            $(".ing_popup .right_sub dl:nth-child(8) dd .Vlength").text(`${data.vLength}`); // 영상 길이
            $(".ing_popup .right_sub dl:nth-child(8) dd .Vratio").text(`${data.vRatio}`); // 영상 비율
            $(".ing_popup .right_sub dl:nth-child(10) dd p").html(`${(data.benefit == "nulacl") ? "추가 혜택이 없습니다." : data.benefit}`); // 영상 비율
            
            //인덱스 쿠키 생성
            $.cookie('CT' , null,{ path : '/' });
            $.cookie('CT' , CaN,{ path : '/' });
            $(".Hfile").attr("data-fileidx" , `${CaN}`)
            $(".cont_like").attr("data-contlike" , `${CaN}`);

            // 홈페이지 URL
            $(".ing_popup .right_sub dl:nth-child(4) dd").html("");
            if(data.homepage == ""){
                $(".ing_popup .right_sub dl:nth-child(4) dd").text("자유롭게 만들어주세요!")
                
            } else {
                for(let i=0; i< data.homepage.length; i++){
                    var link = 
                    `
                    <a target="_blank" href="${data.homepage[i]}">
                        <span>${data.homepage[i]}</span>
                    </a>
                    `
                    $(".ing_popup .right_sub dl:nth-child(4) dd").append(link)
                }
            };

            //래퍼런스 카테
            $(".ing_popup .right_sub dl:nth-child(5) .ing_style").html("");
            if(data.videoStyle == "free"){
                $(".ing_popup .right_sub dl:nth-child(5) .ing_style").text("자유롭게 제작해 주세요.");

            }else{
                data.videoStyle.map(x => {
                    var viedoRef =  `<span>${x}</span>`
                    $(".ing_popup .right_sub dl:nth-child(5) .ing_style").append(viedoRef);
                })
            }

            // 참고영상
            ((data.reference == null) ? $(".ing_ref").css("display" , "none") : $(".ing_ref").css("display" , "block"), $(".ing_ref a").attr("href" , `${data.reference}`) , $(".ing_style").css("display" , "none"));
            
            //상금 100%
            ((data.fee == 1) ? $(".text_t1").text("*상금 100% 콘테스트입니다.") : $(".text_t1").text("*비디오콘에서 진행되는 콘테스트는 수수료 20%를 제외한 상금이 제공됩니다."));

            //랭크 값 없을때 가공 후 처리
            if(data.ranks != "undefined"){
                $(".ing_popup .right_sub dl:nth-child(3) .reward_box").html("");

                for(var i = 0 ; i < data.ranks.length; i++ ){
                    var rewards = data.ranks[i].reward;
                    var rewardslist = `
                        <p><b class="prize_name">${i+1}등</b>  <span> : ${rewards}</span></p>
                    `
                    $(".ing_popup .right_sub dl:nth-child(3) .reward_box").append(rewardslist);
                }

                //수상작 네임
                var arr = [];
                var PrizeName = $(".prize_name");
                
                arr.forEach.call((PrizeName) , (item, idx) => {
                    var itxt = item.innerText;
                    switch(itxt){
                        case "1등" : $(item).text("대상"); break;
                        case "2등" : $(item).text("최우수상"); break;
                        case "3등" : $(item).text("우수상"); break;
                    }
                });
            };

            //파일 첨부 이름
            (!(data.files) ? $(".ing_popup .right_sub dl:nth-child(9) dd p").text("참고파일이 없습니다.") : $(".ing_popup .right_sub dl:nth-child(9) dd p").attr("href" , `${data.files[0].filename}`).text(`${data.files[0].filename}`));

            //찜하기 상태
            if(data.dibs == true){
                $(".cont_like").addClass("active")
                $(".cont_like img").attr("src" , "/img/pm_4r.png")
            } else{
                $(".cont_like").removeClass("active");
                $(".cont_like img").attr("src" , "/img/pm_4w.png")
            }

        },error: function(error){
            alert("로그인 후 이용이 가능합니다.")
            console.log(error);
            console.log(UD);
        }
    })
};

//우승자 포트폴리오 상세보기 (메인)
function MainWpopup(CaN){

    $.ajax({
        url :`${E}/api/v1/portfolio/award-list/${CaN}`,
        method:'GET',
        success: function(data){
            setTimeout(function(){

                //기본 팝업설정
                $(".win_popup").fadeIn(500);
                $(".win_popup .popup_inner").addClass("active");
                ScrollNone()

                //데이터 상세
                $(".win_popup .top_title h2").text(`${data.name}`); // 제목
                $(".win_popup .top_cate .profile_box img").attr("src" , `${data.userProfile}`); // 프로필사진
                $(".win_popup .top_cate .nickname_box p").text(`${data.nickname}`); // 닉네임
                $(".win_popup .left_middle .video_box video").attr("src" , `${data.video}`)//비디오
                $(".win_popup .right_middle dl:nth-child(1) dd p").html(`${data.content}`); // 상세설명
                $(".win_popup .right_middle dl:nth-child(2) dd span").text(`${data.style}`); // 스타일
            },100)
        },error: function(error){
            alert("로그인 후 이용이 가능합니다.")
            console.log(error);
        }

    })
};

//종료된 포트폴리오 상세보기 (메인)
function MainEpopup(CaN){

    $.ajax({
        headers : {"Authorization" : "Basic " + UD},
        url :`${E}/api/v1/contest/end/detail/${CaN}`,
        method:'GET',
        success: function(data){

            //기본 팝업설정
            $(".end_popup .right_middle .right_sub").html("");
            $(".end_popup").fadeIn(500);
            $(".end_popup .popup_inner").addClass("active");
            ScrollNone()
            
            //데이터 상세
            $(".end_popup .top_title h2").text(`${data.name}`); // 제목
            $(".end_popup .top_cate .days").text(`${data.period}`); // 날짜
            $(".end_popup .top_cate .company").text(`${data.bizName}`); // 회사
            $(".end_popup .top_img .img_box img").attr("src" , `${data.poster}`);
            
            //비디오 생성
            if(data.awardWork != "undefined"){
                
                for(var i = 0 ; i < data.awardWork.length; i++ ){
                    var awardWorkslist = 
                    `<dl>
                        <dt class="prize_name">${i+1}등</dt>
                        <dd>
                            <div class='video_box'>
                                <video id="video-js" class="video-js vjs-big-play-centered vjs-default-skin vjs-fill video_common${i}" data-setup='{}' controls preload="auto" webkit-playsinline>
                                    <source src=${data.awardWork[i].video}>
                                </video>
                            </div>
                        </dd>
                    </dl>`;
                    $(".end_popup .right_middle .right_sub").append(awardWorkslist);

                    //비디오js 활성화
                    videojs(document.querySelector(`.video_common${i}`));
                }

                //수상작 네임
                var arr = [];
                var PrizeName = $(".prize_name");
                
                arr.forEach.call((PrizeName) , (item, idx) => {
                    var itxt = item.innerText;
                    switch(itxt){
                        case "1등" : $(item).text("대상"); break;
                        case "2등" : $(item).text("최우수상"); break;
                        case "3등" : $(item).text("우수상"); break;
                    }
                });
            }

        },error: function(error){
            alert("로그인 후 이용이 가능합니다.")
            console.log(error);
        }

    })
};

//클라이언트 참여작 리스트 상세페이지
function MyCandDetail(CaN , CD){

    $.ajax({
        headers : {"Authorization" : "Basic " + UD},
        url: `${E}/api/v1/contest/join/${CaN}/${CD}`,
        method : 'GET',
        success: function(data){

            $(".pro_show").fadeIn(500);
            $(".pro_show .popup_inner").addClass("active");
            ScrollNone()

            //데이터 상세
            $(".read_popup .top_title h2").text(data.title); // 타이틀
            $(".read_popup .profile_box img").attr("src" , data.userProfile); // 유저프로필
            $(".read_popup .nickname_box p").text(data.nickname); // 닉네임
            $(".read_popup .right_sub dl dd p").html(`${data.content}`); // 상세내용
            $(".read_popup .video_box video").attr("src" , data.video); //비디오 링크

        },error:function(error){
            console.log(error)
        }
    });
};

// 아트레이터 내 작품 보기
function MyProList(CaN , delState) {

    event.stopPropagation(); //부모 클릭 전파 막기
    $(".art_show").fadeIn(300);
    $(".art_show .popup_inner").addClass("active");
    
    $.ajax({
        headers: { Authorization: "Basic " + UD },
        url: `${E}/api/v1/user/project/video-list/${CaN}`,
        method: "GET",
        beforeSend: "",
        success: function (data) {

            if (typeof data !== "undefined") {

                $(".pro_slide ul").html(""); //리스트 비우기

                for (i = 0; i < data.length; i++) {

                    var name = data[i].contestName;;
                    var date = data[i].date;
                    var style = data[i].style;
                    var idx = data[i].idx;
                    var content = data[i].content;
                    var shutter = data[i].shutter == 0 ? "미사용" : "사용";
                    var video = data[i].video;
                    var team = data[i].team ?? "개인";
                    team = String(team).replace(/,/g, ", ");

                    var Aprolist = `<li>
                        <div class="popup_left">
                            <div class="left_top">
                                <div class="top_title">
                                    <h2>${name}</h2>
                                </div>
                            </div>
                            <div class="left_middle">
                                <div class="video_box">
                                    <video class="video-js vjs-big-play-centered vjs-default-skin vjs-fill video_common${i}" data-setup='{}' controls preload="auto" webkit-playsinline>
                                        <source src=${video} type="video/mp4">
                                    </video>
                                </div>
                            </div>
                        </div>
                        <div class="popup_right">
                            <div class="right_top">
                                <div class="right_title">
                                    <h2>상세설명</h2>
                                </div>
                            </div>
                            <div class="right_middle">
                                <div class="right_sub">
                                    <dl>
                                        <dt>나의 영상은 어떤 스타일 인가요?</dt>
                                        <dd>
                                            <p>${content}</p>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>영상을 통해 무엇을 전달하고 싶었나요?</dt>
                                        <dd>
                                            <p>${style}</p>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>누구와 함께 진행했나요?</dt>
                                        <dd>
                                            <p class="teamtext">${team}</p>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>셔터스톡을 사용하였나요?</dt>
                                        <dd>
                                            <p class="shuttertext">${shutter}</p>
                                        </dd>
                                    </dl>
                                </div>
                                <div class="left_bot">
                                    <div class="read_btn read_btn3">
                                        <div class="right_btn">
                                            <a onclick='ProDelete(${CaN}, ${idx} , ${delState})' href="javascript:;">삭제하기</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>`;

                    // 아트레이터 출품작 리스트 추가
                    $(".pro_slide ul").append(Aprolist);
                }

                ((delState == 0) ? $(".read_btn3").css("display" ,"none") : $(".read_btn3").css("display" ,"block"))
                
                //슬릭 슬라이더 재실행
                slickSl();

                //비디오 JS 활성화
                for (var i = 0; i < $(".pro_slide ul li").length; i++){
                    videojs(document.querySelector(`.video_common${i}`));
                }

            } else {

            }
        },
        error: function (error) {
            console.log(error);
        },
    });
};

//사용자 전환 설명 팝업 호출
function MainUpopup(){
	$(".user_popup").fadeIn(300);
	$(".user_popup .user_inner").addClass("active");
	ScrollNone()
}; 

//모달 찜하기 
function popupLike(target){

    var contNum = $(target).attr("data-contlike");

    event.stopPropagation(); //부모 클릭 전파 막기
    if($(target).hasClass("active")){

        alert("찜하기가 취소되었습니다.")

        $.ajax({
            headers: { Authorization: "Basic " + UD },
            url: `${E}/api/v1/dibs/contests/${contNum}`,
            method: "DELETE",
            success: function (data) {
                $(target).find("img").attr("src" , "/img/pm_4w.png")
                $(target).removeClass("active");
            },
            error: function (err) {
                console.log(err);
                alert("실패");
            },
        });

    }else{
        
        alert("찜하기가 완료되었습니다.")

        $.ajax({
            headers: { Authorization: "Basic " + UD },
            url: `${E}/api/v1/dibs/contests/${contNum}`,
            method: "POST",
            success: function (data) {
                $(target).find("img").attr("src" , "/img/pm_4r.png")
                $(target).addClass("active");
            },
            error: function (err) {
                console.log(err);
                alert("실패");
            },
        });
    }
};

//아트레이터 출품작 삭제
function ProDelete(CaN , JI , delState) {

    if(delState == 0){
        alert("삭제하기 기능은 채널톡으로 문의 후 삭제가 가능합니다.")
    }else{
        $(".read_btn3").css("display" ,"block")

        var result = confirm("삭제 하시겠습니까?");

        if (result == true) {
            $.ajax({
                headers: { Authorization: "Basic " + UD },
                url: `${E}/api/v1/user/project/video-list/${CaN}`,
                method: "DELETE",
                data: { joinIdx: JI },
                success: function (data){
                    alert("삭제되었습니다");
                    location.href = '/sub/mypage2/mypage(contest).html';
                },
                error: function (err) {
                    console.log(err);
                },
            });
            
        } else {

        }
    }
};

function popupshare(){
    alert("준비 중입니다.")
}

//콘테스트 참여 하기 전 로그인 검증
function popupParti(){
    if(typeof UD === "undefined" || UD === "null"){
        alert("로그인 후 이용해 주세요.")
    }else{
        location.href = '/sub/contest_list/contest_ing/parti.html'
    }
}