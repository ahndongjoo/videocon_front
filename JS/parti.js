//참여하기 콘테스트 인덱스 호출
$(document).ready(function(){
    $("#contest_num").val(CT);
});

// 비디오 업로드 후 프리뷰
function changeVideo() {
    var chosenFile = document.getElementById("p_file").files[0];
    var viedoName = document.getElementById("filename_hidden");

    if(window.FileReader){
        $(".preview_bg").addClass("on")
        document.getElementById("video_player").setAttribute("src", URL.createObjectURL(chosenFile));
        viedoName.value = chosenFile.name;
        videoSubmit();

    }else{
        viedoName.value = "파일을 선택해주세요";
    }
};

// 참가하기 비디오 임시저장 후 썸네일 추출
function videoSubmit(){
    $(".loading_background").css("position" , "fixed");
    
    var form = $("#parti_Form")[0];
    var formData = new FormData(form);

    $.ajax({
        headers : {"Authorization" : "Basic " + UD},
        url: `${E}/api/v1/temp/video`,
        method: 'POST',
        enctype:'multipart/form-data',
        contentType : false,
        processData: false,
        data: formData,
        beforeSend:function(){
            $(".loading_background").fadeIn(300);
            $("body").css("overflow-y" , "hidden");
        },
        success: function (data){

            $(".loading_background").fadeOut(300);
            $("body").css("overflow-y" , "auto");
            
            $(".thum_box li").addClass("active");
            
            $(".thum_prev").css("display" , "none");
            $(".thum_next").fadeIn(300);

            if(data.thumbnail.length > 0){
                
                var thumbnail = data.thumbnail;
                var nthNum = Number("2");
                
                $(`.thum_box li:nth-child(2) img`).attr("src" , thumbnail[0][0]);
                $(`.thum_box li:nth-child(3) img`).attr("src" , thumbnail[1][0]);
                $(`.thum_box li:nth-child(4) img`).attr("src" , thumbnail[2][0]);
                $(`.thum_box li:nth-child(5) img`).attr("src" , thumbnail[3][0]);
                $(`.thum_box li:nth-child(6) img`).attr("src" , thumbnail[4][0]);

                $(`.thum_box li:nth-child(2) .Pimg_val`).attr("href" , thumbnail[0][1]);
                $(`.thum_box li:nth-child(3) .Pimg_val`).attr("href" , thumbnail[1][1]);
                $(`.thum_box li:nth-child(4) .Pimg_val`).attr("href" , thumbnail[2][1]);
                $(`.thum_box li:nth-child(5) .Pimg_val`).attr("href" , thumbnail[3][1]);
                $(`.thum_box li:nth-child(6) .Pimg_val`).attr("href" , thumbnail[4][1]);

                $("#video_link").val(data.video);

                // for(i = 0; i < thumbnail.length; i++){
                //     $(".thum_img img").attr("src" , "");
                //     $(`.thum_box li:nth-child(${nthNum+i}) img`).attr("src" , thumbnail[i]);
                //     // $(".thum_box li:nth-child("+i+") img").attr("src" , thumbnail[i])
                //     $("#video_link").val(data.video);
                // }

            }else{
                alert("동영상 업로드 실패");
            }
        },error: function (err){
            $(".loading_background").fadeOut(300);
            console.log(err)
            alert("실패")
        }
    })
};

// 썸네일 자동 업로드
$(function(){
    var thumImg = $(".thum_box");
    var thumLink = $("#thum_link").val();

    $(".thum_box li").each(function(index , item){
        $(this).on("click" , function(){
            var itemSrc =$(item).find(".thum_img").children("img").siblings("a").attr("href");

            $("#thum_link").val("");
            thumImg.find("li").removeClass("active");
            $(this).addClass("active");
            $("#thum_link").val(itemSrc);

            $(".thum_prev").fadeIn(300);
            $(".thum_next").css("display" , "none");
        });
    })
});

// 썸네일 직접 업로드
function uploadImg(input){

    if(input.files && input.files[0]){
        var thumImg = $(".thum_1")
        var reader = new FileReader();
        var thumLink = $("#thum_link").val();
        var thumName = document.getElementById("select_thum").files[0];

        reader.onload = function (e){
            input.value = ""; //초기화
            $(thumImg).attr("src" , e.target.result);
            $(".thum_box li:nth-child(1) span").addClass("active");
        };
        reader.readAsDataURL(input.files[0])
        thumSelect()
    } 
};

function thumSelect(){
    var form = $("#thum_select")[0];
    var formData = new FormData(form);

    $.ajax({
        headers : {"Authorization" : "Basic " + UD},
        url: `${E}/api/v1/temp`,
        method: 'POST',
        data: formData,
        enctype:'multipart/form-data',
        contentType : false,
        processData: false,
        success: function(data){

            //썸네일 url 데이터
            $("#thum_link").val("");
            $("#thum_link").val(data.fileURL);

        },error: function(err){
            console.log(err)
        }
    })
};

//셔터스톡 선택 유무
$('input:radio[name="shutter"]').on("change" , function(){
    var num0 = parseInt(0);
    var num1 = parseInt(1);

    if($('input:radio[name="shutter"]').prop("checked")){
        $('input:radio[name="shutter"][value="1"]').prop("checked" , true);
        $('input:radio[name="shutter"]').val(num1);

    }else{
        $('input:radio[name="shutter"][value="0"]').prop("checked" , false);
        $('input:radio[name="shutter"]').val(num0);
    }
});

// 참여자 처리
$("input[name='partiName']").on("change" , function(){
    if($(this).is(':checked')){
        if($(this).attr('id') === 's_indi'){
            $(".indi_info").css("display" , "block");
            $(".team_info").css("display" , "none");
            return false
        } else {
            $(".indi_info").css("display" , "none");
            $(".team_info").css("display" , "block");
        }
    }
});

//버튼 생성 제거;
function plusBtn(){
    const i_Length = $(".team_input").length+1;
    const innerMinus = "<div class='input_box'>" +
                        "<input id='team_input"+i_Length+"' class='team_input' type='text'  maxlength='10' name='team' placeholder='팀원의 이름을 입력해주세요 (ex : 홍길동)'>"+
                        "<input class='minus_btn' type='button' onclick='minusBtn(this)' value=''>"+
                        "</div>";

    $(".team_info").append(innerMinus);
}
function minusBtn(e){
    e.closest(".input_box").remove();
};


//참여하기 최종제출
$("#partiSubmit").on("click" , function(){
    var partiAgr1 = $("input:checked[name='partiAg']").is(":checked"); // 지적재산 동의
    var partiAgr2 = $("input:checked[name='partiAg2']").is(":checked"); // 비디오 수집 동의

    if(partiAgr1 && partiAgr2){
        partiSubmit()
    } else{
        alert("약관을 동의 해주세요")
    }
});

//작품설명 엔터치환
$("#parti_content").on("change", function () {
    var text = document.getElementById("parti_content");
    var result = text.value.replace(/(\n|\r\n)/g, "<br>");
    text.value.replace(/(\n|\r\n)/g, "<br>");
});

function partiSubmit(){
    
    //참여자 팀원
    var teamobjArr = [];
    $(".team_input").each(function(index, element){
        teamVal = $(this).val();
        teamobjArr.push(teamVal)
        return teamobjArr
    });

    var thumBasic =$(".thum_box li:nth-child(2) .Pimg_val").attr("href");

    var jsonData = {
        contest : $("#contest_num").val(),
        style : $("#parti_style option:selected").val(),
        video : $("#video_link").val(),
        thumbnail : (($("#thum_link").val() == "") ? thumBasic : $("#thum_link").val()),
        content : $("#parti_content").val().replace(/(\n|\r\n)/g, "<br>"),
        shutter : parseInt($('input:radio[name="shutter"]:checked').val()),
        team : teamobjArr,
    };
    
    $.ajax({
        headers : {"Authorization" : "Basic " + UD},
        url: `${E}/api/v1/artrator/video/join`,
        method:'POST',
        data: jsonData,
        dataType: 'JSON',
        success: function(data){
            location.href = '/sub/contest_list/contest_ing/success.html'

        },error : function(err){
            alert("제출 중 오류가 발생하였습니다. 다시 한번 확인해 주세요!");
            console.log(err);
        }
    })
};
