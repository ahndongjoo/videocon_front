//유효성 검사
var mSelect = $("#m_select option:selected");
var mName = $("#m_name");
var m_link = $("#m_link");
var m_file =$("#req_file");

var category = "";
var KeywordVal = "";
var sort = "0"

$(function(){
    MediaBaList()

    //무한 스크롤 페이징
    $(window).scroll(function(){
        
        var maxHeight = $(document).height();
        var currentScroll = $(window).scrollTop() + $(window).height();

        if(maxHeight <= currentScroll + 350 && temp == false && !isAJAX){
            CP ++;
            MediaBaList();
        }
    });
});

//기본 리스트 
var MediaBaList = function(){
    isAJAX = true;

    $.ajax({
        type : 'GET',
        url : `${E}/api/v1/board/mediabox?keyword=${KeywordVal}&page=${CP}&category=${category}&sort=${sort}`,
        dataType: 'JSON',
        success: function(data){
            setTimeout(function(){
                $(".main_loading").css("display" , "none");
                if(data.length >= 1){
                    data.map( x => {
                        var medialist = `
                        <li class='swiper-slide' onclick="MediaJoin(this)">
                            <input class="hold_index" type="text" value=${x.idx}>
                            <a href=${x.url}> 
                                <div class='sns_box'>
                                    <div class='sns_middle'>
                                        <div class='sns_thum'>
                                            <img src=${x.thumbnail}>
                                        </div>
                                    </div>
                                    <div class='sns_top'>
                                        <div class='top_left'>
                                            <p>#${x.category}</p>
                                        </div>
                                    </div>
                                    <div class='sns_bot'>
                                        <div class='bot_top'>
                                            <h4>${x.title}</h4>
                                        </div>
                                    <div class='bot_bottom'>
                                        <span>${x.views}</span>
                                    <div>
                                </div>
                            </a>
                        </li>`
                        
                        $(".news_box ul").append(medialist).children(':last').hide().fadeIn(700);       
                    });

                    isAJAX  = false;

                }else{
                    $(".main_loading").css("display" , "none");
                    temp = true;
                }

            },300)
        },
        error : function(err){
            console.log(err);
        }
    })
};

// 카테고리 리스트
var MediaGetList = function(target){
    CP = 1
    //리스트 초기화
    category = $(target).data("category");
    $(".news_box ul").html("");

    $.ajax({
        type : 'GET',
        url : `${E}/api/v1/board/mediabox?keyword=${KeywordVal}&page=${CP}&category=${category}&sort=${sort}`,
        dataType: 'JSON',
        success: function(data){
            setTimeout(function () {
                if(typeof data !== "undefined"){
                
                    data.map( x => {
                        var medialist = `
                        <li class='swiper-slide' onclick="MediaJoin(this)">
                            <input class="hold_index" type="text" value=${x.idx}>
                            <a href=${x.url}> 
                                <div class='sns_box'>
                                    <div class='sns_middle'>
                                        <div class='sns_thum'>
                                            <img src=${x.thumbnail}>
                                        </div>
                                    </div>
                                    <div class='sns_top'>
                                        <div class='top_left'>
                                            <p>#${x.category}</p>
                                        </div>
                                    </div>
                                    <div class='sns_bot'>
                                        <div class='bot_top'>
                                            <h4>${x.title}</h4>
                                        </div>
                                    <div class='bot_bottom'>
                                        <span>${x.views}</span>
                                    <div>
                                </div>
                            </a>
                        </li>`
                        
                        $(".news_box ul").append(medialist).children(':last').hide().fadeIn(700);       
                    });
                }
            },100)
        },
        error : function(err){
            console.log(err);
        },
        // complete: function(){
        //     $(".loading_list").css("display" , "none");
        // }
    })
};

// 서브 카테고리 리스트
var MediaDateList = function(target){
    CP = 1

    //리스트 초기화
    sort = $(target).data("sort");
    $(".news_box ul").html("");

    $.ajax({
        type : 'GET',
        url : `${E}/api/v1/board/mediabox?keyword=${KeywordVal}&page=${CP}&category=${category}&sort=${sort}`,
        dataType: 'JSON',
        success: function(data){
            setTimeout(function () {
                if(typeof data !== "undefined"){
                
                    data.map( x => {
                        var medialist = `
                        <li class='swiper-slide' onclick="MediaJoin(this)">
                            <input class="hold_index" type="text" value=${x.idx}>
                            <a href=${x.url}> 
                                <div class='sns_box'>
                                    <div class='sns_middle'>
                                        <div class='sns_thum'>
                                            <img src=${x.thumbnail}>
                                        </div>
                                    </div>
                                    <div class='sns_top'>
                                        <div class='top_left'>
                                            <p>#${x.category}</p>
                                        </div>
                                    </div>
                                    <div class='sns_bot'>
                                        <div class='bot_top'>
                                            <h4>${x.title}</h4>
                                        </div>
                                    <div class='bot_bottom'>
                                        <span>${x.views}</span>
                                    <div>
                                </div>
                            </a>
                        </li>`
                        
                        $(".news_box ul").append(medialist).children(':last').hide().fadeIn(700);       
                    });
                }

            },100)
        },
        error : function(err){
            console.log(err);
        },
        // complete: function(){
        //     $(".loading_list").css("display" , "none");
        // }
    })
};

//미디어 박스 검색
function MediaSearch(target){

    KeywordVal = $(target).val();

    $.ajax({
        url :`${E}/api/v1/board/mediabox?keyword=${KeywordVal}&page=${CP}&category=${category}&sort=${sort}`,
        method:'GET',
        success: function(data){

            if(data.length > 0 ){
                $(".news_box ul").html("");
                data.map( x => {
                        var medialist = `
                        <li class='swiper-slide' onclick="MediaJoin(this)">
                            <input class="hold_index" type="text" value=${x.idx}>
                            <a href=${x.url}> 
                                <div class='sns_box'>
                                    <div class='sns_middle'>
                                        <div class='sns_thum'>
                                            <img src=${x.thumbnail}>
                                        </div>
                                    </div>
                                    <div class='sns_top'>
                                        <div class='top_left'>
                                            <p>#${x.category}</p>
                                        </div>
                                    </div>
                                    <div class='sns_bot'>
                                        <div class='bot_top'>
                                            <h4>${x.title}</h4>
                                        </div>
                                    <div class='bot_bottom'>
                                        <span>${x.views}</span>
                                    <div>
                                </div>
                            </a>
                        </li>`
                        
                    $(".news_box ul").append(medialist).children(':last').hide().fadeIn(700);       
                });
            }

            //검색결과 없을떄 
            if(data.length == 0){

                $(".news_box ul").html("");

                var Nsearch =
                `<div class='not_search'>
                    <div class='img_box'>
                        <img src='/img/not_search_icon.png' alt='vicon_icon'>
                    </div>
                    <h2>'${KeywordVal}' 검색결과가 없습니다</h2>
                    <p>검색 결과를 찾지 못했습니다.<br>검색어를 확인하시고 다시 검색해주세요.</p>
                </div>
                `

                $(".news_box ul").append(Nsearch);
            }
            
        },error: function(err){
            console.log(err);
        }
    });
};
function MediaJoin(target){

    var index = Number($(target).children(".hold_index").val());

    $.ajax({
        headers : {"Authorization" : "Basic " + UD},
        url :`${E}/api/v1/board/mediabox/${index}`,
        type:'patch',
        success: function(data){
           
        },

        error : function(){

        }
    })
};



//미디어 박스(GET)
$(document).ready(function(){ 
    var fileTarget  = $(".file_box .file_hidden");
    fileTarget.on('change', function(){ 
        if(window.FileReader){
            var filename = $(this)[0].files[0].name;
    } else { 
        var filename = $(this).val().split('/').pop().split('\\').pop();
    }	
$(this).siblings(".thum_file").val(filename); 
    }); 
});

// 미디어박스(POST)
function editSubmit(){

    event.preventDefault();

    //폼데이터 생성
    var form = $('#media_Form')[0];      
    var formData = new FormData(form);
    
    $.ajax({
        headers : {"Authorization" : "Basic " + UD},
        url :`${E}/api/v1/board/mediabox`,
        type:'POST',
        enctype:'multipart/form-data',
        contentType : false,
        processData :false,
        data: formData,
        success: function(){
            alert("업로드를 성공하였습니다.");
            for(let key of formData.keys()){
                window.location.reload();
            }
            for(var value of formData.values()){
            }  
        },
        error : function(){
            alert("전송에 실패하였습니다.");
        }
    })
};