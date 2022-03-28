var likeListArr = []

$(function(){
    myLikeList()
});

function myLikeList(){
    $.ajax({
        headers : {"Authorization" : "Basic " + UD},
        url :`${E}/api/v1/dibs/contests`,
        type:'GET',
        success: function(data){

            if(data.length >= 1){
                data.map( x => {
                    
                    var likelist = `
                    <li onclick='MainHpopup(${x.contestIdx})' data-screening=${x.screening}>
                        <div class="video_thum contest_thum">
                            <div class="thum_inner">
                                <img src="${x.thumbnail}">
                            </div>
                            <div class="like_btn active" onclick="popupLike(this)" data-contlike="${x.contestIdx}">
                                
                            </div>
                        </div>
                        <div class="text_box">
                            <div class="box_top">
                                <span class="like_date">D-<b>${x.dDay}</b></span>
                                <span>#<b>${x.purpose}<b></span>
                            </div>
                            <div class="box_middle">
                                <h3>${x.contestName}</h3>
                            </div>
                            <div class="box_bottom">
                                <p>총상금 <b>${x.totalReward}</b></p>
                            </div>
                        </div>
                    </li>`
                    
                    $(".like_box ul").append(likelist).children(':last').hide().fadeIn(700);
                    
                });
                var idxArr = []
                var readlist = $(".like_box ul li");
                idxArr.forEach.call((readlist) , (item , idx) =>{
                    if($(item).attr("data-screening") == 1){
                        $(item).find(".like_date").text("심사중");
                        $(item).find(".like_date").addClass("active");
                    }
                    if($(item).attr("data-screening") == 99){
                        $(item).find(".like_date").text("종료");
                        $(item).find(".like_date").addClass("active");
                    }
                    
                    likeListArr.push(item)
                });
            }
            


        },error : function(){

        }
    })
};

function myLikeCheck(target){
    var checkState = $(target).prop('checked');
    
    if(checkState == true){
        var idxArr = []
        var readlist = $(".like_box ul li");
        idxArr.forEach.call((readlist) , (item , idx) =>{

            if($(item).attr("data-screening") == 1 || $(item).attr("data-screening") == 99){
                $(item).remove();
            }
        });

    }else{
        $(".like_box ul").html("");
        $(".like_box ul").append(likeListArr);
    }
}