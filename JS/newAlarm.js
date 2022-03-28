$(function(){
    alarmList()
})

function alarmList(){
    $.ajax({
        headers: { Authorization: "Basic " + UD },
        url: `${E}/api/v1/mention`,
        method:"GET",
        success: function(data){
            if(data.length >= 1){
                data.map(x => {
                    var alarmList = 
                        `
                        <li onclick="alarmRead(this)" data-idx=${x.idx} data-read=${x.read}>
                            <a href="javascript:;">
                                <div class="bot_left">
                                    <div class="img_box">
                                        <img src="${x.img}">
                                    </div>
                                </div>
                                <div class="bot_right">
                                    <span>${x.type}</span>
                                    <h2>${x.content}</h2>
                                    <p>${x.contestName} | <b>${x.destination}</b></p>
                                </div>
                                <div class="alerm_date">
                                    <span>${x.date}</span>
                                </div>
                            </a>
                        </li>
                        `
                    $(".mp_3 ul").append(alarmList).children(':last').hide().fadeIn(300);
                });

                var idxArr = []
                var readlist = $(".mp_3 ul li");
                idxArr.forEach.call((readlist) , (item , idx) =>{
                    ($(item).attr("data-read") == 0) ? $(item).removeClass("active") : $(item).addClass("active")
                });

                // 안 읽음 메세지 갯수
                var readNum = $(".mp_3 ul li.active").length
                var notReadNum = $(".mp_3 ul li").length
                var resultReadNum = notReadNum - readNum;
                $(".alarm_num").text(resultReadNum);
                
            }else{

            }

        },error :function(err){
            console.log(err);
        }
    })
};

function alarmRead(target){
    var readState = $(target).attr("data-read");
    var readIdx = $(target).attr("data-idx");

    if(readState == 0){

        var changeReadNum = $(".alarm_num").text()-1;

        $(target).attr("data-read" , "1");
        $(target).addClass("active");
        $(".alarm_num").text(changeReadNum);

        $.ajax({
            headers: { Authorization: "Basic " + UD },
            url: `${E}/api/v1/mention/read/${readIdx}`,
            method:"PATCH",
            success: function(data){
                
            }
        });

    }else{
        alert("이미 읽은 메세지입니다.")
    }
};

function alarmAllRead(){
    var idxArr = []
    var readlist = $(".mp_3 ul li");
    idxArr.forEach.call((readlist) , (item , idx) =>{
        $(item).addClass("active");
        $(".alarm_num").text("0");
    });

    $.ajax({
        headers: { Authorization: "Basic " + UD },
        url: `${E}/api/v1/mention/read-all`,
        method:"PATCH",
        success: function(data){
            console.log(data);
        }
    });
};

function alarmDelete(){

    var idxArr = []
    var readlist = $(".mp_3 ul li");
    var result = confirm('삭제하시겠습니까? 삭제된 내용은 복원할 수 없습니다.');

    if(result){
        idxArr.forEach.call((readlist) , (item , idx) =>{
            if($(item).attr("data-read") == 1){
                $(item).remove();
            }
        });

        $.ajax({
            headers: { Authorization: "Basic " + UD },
            url: `${E}/api/v1/mention/read-all`,
            method:"DELETE",
            success: function(data){
                console.log(data);
            }
        });
    }
};