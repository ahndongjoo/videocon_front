var contestChat = io(`${E}/contestChat`,{path: "/socket.io", transports: ['websocket']});

//채팅 페이지 애니메이션
$(".chat_left ul li").on("click" , function(){
    if($(this).closest(".chat_left ul li").hasClass("active")){
        $(this).siblings("li").removeClass("active")
        $(this).addClass("active");
    }else{
        alert("준비중입니다")
    }
});

$(".chat_notice").on("click", function(){
    $(".chat_alert").fadeIn(200);
});

$(".alert_top").on("click", function(){
    $(".chat_alert").fadeOut(200);
});

$(".left_btn").on("click" , function(){
    if($(this).hasClass("on")){
        
        $(this).removeClass("on");
        $(".chat_left ").css("width" , "340px");
        $(".left_none").css("display" , "block");
        $(".chat_center").css("width",  "calc((100% - 680px))")

    }else{
        $(this).addClass("on");
        $(".chat_left ").css("width" , "40px");
        $(".left_none").css("display" , "none");
        $(".chat_center").css("width",  "calc((100% - 380px))")
    }
});

$(".chat_setting a:nth-child(1)").on("click" ,function(){
    $(".chat_setting a:nth-child(1)").css("display" , "none");
    $(".chat_setting a:nth-child(2)").css("display" , "inline-block")
    $(".exit_btn").css("opacity" , "100%")
    $(".chat_nick").addClass("on");
    $(".chat_number").css("display" ,"none");
    $(".chat_update").css("display" ,"none");
});

$(".chat_setting a:nth-child(2)").on("click" ,function(){
    $(".chat_setting a:nth-child(1)").css("display" , "inline-block");
    $(".chat_setting a:nth-child(2)").css("display" , "none");
    $(".exit_btn").css("display" ,"none")
    $(".chat_nick").removeClass("on");
    $(".chat_number").css("display" ,"block");
    $(".chat_update").css("display" ,"block");
});

$(document).ready(function(){
    
    $(".chat_left ul li:nth-child(1)").addClass("active");

    // 네임스페이스 입장
    contestChat.on('namespace' , function(data){});

    //채팅 리스트 호출
    ChatList()

    //접속 중 상태 표시
    contestChat.on("counter" ,function(data){
        $(".others_nick p:nth-child(2) em").removeClass("on");
        if(data.userCount == 2){
            $(".others_nick p:nth-child(2) em").addClass("on")
            $(".others_nick p:nth-child(2) em b").text("접속중")
            $(".chat_check").addClass("on").css("background-color" , "rgb(97, 189, 5)");
        }else{
            $(".others_nick p:nth-child(2) em b").text("비접속")
            $(".others_nick p:nth-child(2) em").addClass("active")
            $(".chat_check").addClass("on").css("background-color" , "#ef4d4d")
        }
    })

    //접속 메세지 표시
    contestChat.on("refresh" , function(data){
        var idxArr = []
        var chatRid = $(".chat_userlist");
        
        idxArr.forEach.call((chatRid) , (item , idx) => {
            if($(item).data("roomid") == data.roomId){

                // $(item).removeClass("001");
                // $(item).addClass("001");
                ChatList();
            
                //채팅 유저 리스트 상단 노출 애니메이션
                // var chatUParent = $(".chat_ulist ul")
                // $(item).hide().fadeIn(200).prependTo(chatUParent)  
            }
        });
    })
});

//채팅 유저 리스트 호출 
function ChatList(){
    $.ajax({
        headers : {"Authorization" : "Basic " + UD},
        url: `${E}/api/v1/chat/list-info`,
        type:'GET',
        async: false,
        success: function(data){
            if(data.length >= 1){
                $(".chat_ulist ul").html("");
                $(".icon_box p").text("왼쪽 목록에서 대화 상대를 선택해주세요.");
                for(i = 0; i < data.length; i++){

                    var contentType = !data[i].last_msg.content ? (!data[i].last_msg.file ? "": data[i].last_msg.file) : data[i].last_msg.content;
                    var uid = data[i].user_id;

                    var chatUserList = 
                    `<li class="chat_userlist" onclick="ChatUserInfo(this);" data-type= ${data[i].this_type} data-video=${data[i].video} data-contid=${data[i].contest_id} data-uid=${uid} data-roomid=${data[i].room_id} data-confirm=${data[i].confirm} data-receipt=${data[i].receipt}>
                        <a href="javascript:;">
                            <div class="chat_profile">
                                <img src=${data[i].profile_img}>
                                <div class="chat_rank">
                                    <img src=/img/chat_${data[i].rank}.png>
                                </div>
                            </div>
                            <div class="chat_utext">
                                <h2>${data[i].contest_name}</h2>
                                <p class="chat_nick">${data[i].nickname}</p>
                                <p class="chat_t">${contentType}</p>
                            </div>
                        </a>
                        <div class="chat_update">
                            <span>${data[i].updated}</span>
                        </div>
                        <div class="chat_number">
                            <span>${data[i].not_read}</span>
                        </div>
                        <div class="exit_btn" onclick="ExitRoom();">
                            <img src="/img/exit_btn.png">
                        </div>
                    </li>`;

                    $(".chat_ulist ul").append(chatUserList);
                }

                var numArr = []
                var chatNum = $(".chat_number span");
                numArr.forEach.call((chatNum) , (item , idx) => {
                    var chatText = item.innerText;

                    if(chatText == "0"){
                        $(item).css("display" , "none");
                    }else{
                        $(item).css("display" , "block");
                    }
                });

            } else {
                $(".icon_box p").text("채팅 내역이 없습니다");
            }
            
        },error:function(error){
            
        }
    });
}

//채팅 내용 조회 및 방 입장
function ChatUserInfo(target){

    //상대방 정보 , 영상 프리뷰 , 진행상태 표시
    var ContestName = $(target).find(".chat_utext").children("h2").text();
    var UserProImg = $(target).find(".chat_profile").children("img").attr("src");
    var UserNick = $(target).find(".chat_utext").children(".chat_nick").text();
    var VideoIdx = $(target).data("idx");
    var VideoSrc = $(target).data("video");
    var RoomId = String($(target).data("roomid"));
    var Contid = String($(target).data("contid"));
    var Uid = $(target).data("uid"); 
    var confirm = $(target).data("confirm");
    var receipt = String($(target).data("receipt"));
    var preVal = $(".change_data").val();
    var userType = $(target).data("type");

    //상금 버튼 초기화
    $(".common_chat_btn").css("display" , "none");
    $(".chat_common_btn").css("display" , "none");
    $(".basic_list").css("display" , "none");
    
    //목록 최상위
    $(target).siblings("li").removeClass("chat_prelist")
    $(target).addClass("chat_prelist").an;

    // 접속중 초기화
    $(".others_nick p:nth-child(2) em").removeClass("active");
    $(".others_nick p:nth-child(2) em").removeClass("on");

    //리스트 애니메이션
    $(target).addClass("on");
    $(target).siblings().removeClass("on")
    $(target).find(".chat_number").addClass("on");
    $(".chat_center_bg").css("display" , "none");
    $(".chat_right_bg").css("display" , "none");

    //타입별 버튼 
    if(userType == "holder"){
        $(".basic_list1").css("display" , "block");
        $(".chat_cli_btn").css("display" , "inline-block");
        $(".down_btn").css("display" , "block");
        $(".others_nick p:nth-child(1)").text("ARTRATOR");
        if(confirm == 1){
            $(".chat_cli_suc").css("display" , "inline-block");
            $(".chat_cli_btn").css("display" , "none");
        }
    }else{
        if(userType == "guest"){
            $(".basic_list2").css("display" , "block"); // 타입별 기본 알림
            $(".chat_art_pre").css("display" , "inline-block"); // 상금 승인 전 버튼
            $(".chat_art_btn").css("display" , "none"); // 상금 승인 후 버튼
            $(".update_btn").css("display" , "block");
            $(".others_nick p:nth-child(1)").text("CLIENT");
            if(confirm == 1){
                $(".chat_art_btn").css("display" , "inline-block");
                $(".chat_art_pre").css("display" , "none");
            }
        }
    }

    //상태별 버튼 후 애니메이션
    if(confirm == 0){
        $(".state_box ul li").removeClass("on");
        $(".state_box ul li:nth-child(1)").addClass("on");
    } else {
        $(".state_box ul li").removeClass("on");
        $(".state_box ul li:nth-child(1)").addClass("on");
        $(".state_box ul li:nth-child(2)").addClass("on");
        if(confirm == receipt){
            $(".state_box ul li").addClass("on");
        }
    };

    //룸 입장 && 룸 변경시
    preVal == 0 ? contestChat.emit('joinRoom' , `${RoomId}` , Uid) : ChangeRoom(`${RoomId}` , preVal, Uid)
    $(".change_data").val(RoomId);

    //채팅 정보 전달
    $(".change_rid").val(RoomId);
    $(".change_uid").val(Uid);
    $(".change_cid").val(Contid);
    
    //콘테스트 타이틀 및 상대방 유저 정보 확인
    $(".chat_title h2").text(ContestName)
    $(".others_nick p:nth-child(2) span").text(UserNick);
    $(".others_profile img").attr("src" , UserProImg);
    $(".chat_video").find(".down_btn").children("a").data("idx" , VideoIdx);
    $(".chat_preview .video_box video").attr("src" , VideoSrc);

    //방 입장
    contestChat.on('joinRoom' , function(data){});

    $.ajax({
        headers : {"Authorization" : "Basic " + UD},
        url: `${E}/api/v1/chat/list-info/messages/${RoomId}/${Contid}`,
        type:'GET',
        success: function(data){
            $(".chat_borad .borad_top ul").html("");
            var MsgLength = Object.entries(data).length;

            if(MsgLength >= 1){
                for(i = 0; i < MsgLength; i++){

                    var updated = Object.values(data)[i].updated;
                    var author = Object.values(data)[i].author;
                    var file = Object.values(data)[i].file;
                    var fileSize = Object.values(data)[i].file_size;
                    var fileKey = Object.values(data)[i].file_key;
                    var content = Object.values(data)[i].content;
                    var msg = (content) ? content : file;
                    var msgDate = Object.values(data)[i].dateLine;

                    var dateMsgLine =
                    `<div class="date_linebox">
                        <hr>
                            <span class="chat_date">${msgDate}</span>
                        <hr>
                    </div>`
                    
                    var textList = 
                    `<li class="chat_list" data-author=${author}>
                        <div class="list_box">
                            <div class="list_profile">
                                <img src="${UserProImg}" alt="비디오콘 아이콘">
                            </div>
                            <div class="list_chat">
                                <p data-roomid=${RoomId}>${msg}</p>
                                <div class="chat_date">
                                    <span>${updated}</span>
                                </div>
                            </div>
                        </div>
                    </li>`
                    ;

                    var fileChatList = 
                    `<li class="chat_list" data-author=${author}>
                        <div class="list_box">
                            <div class="list_profile">
                                <img src="${UserProImg}" alt="비디오콘 아이콘">
                            </div>
                            <div class="list_chat file_chat">
                                <div class="file_left">
                                    <div class="file_img">
                                        <div class="img_box">
                                            <img src="/img/file_file_icon.png">
                                        </div>
                                    </div>
                                    <div class="file_text">
                                        <p class="file_name">${msg}</p>
                                        <p class="file_size">${fileSize}</p>
                                    </div>
                                </div>
                                <div class="file_down" onclick="ChatFileDown(this);" data-roomid=${RoomId} data-filename=${msg} data-filekey=${fileKey}>
                                    <div class="img_box">
                                        <img src="/img/file_down_icon.png">
                                    </div>
                                </div>
                                <div class="chat_date">
                                    <span>${updated}</span>
                                </div>
                            </div>
                        </div>
                    </li>`;
                    ;
                    
                    var chatList = (Object.values(data)[i].content) ? textList : (Object.values(data)[i].file ? fileChatList : dateMsgLine);

                    //개최 리스트 추가
                    $(".chat_borad .borad_top ul").append(chatList);
                }

                $(".chat_list").each(function(){
                    var author = $(this).data("author");
                    var uidVal = $(".change_uid").val();

                    if(author == uidVal){
                        $(this).addClass("active");

                    }else{
                        $(this).removeClass("on");
                    }
                });
            }

        chatScrollBottom();

        },error:function(error){
            
        }
    });
};

// 방 변경
function ChangeRoom(currentVal , preVal, Uid){
    preVal != 0 ? contestChat.emit("changeRoom" , preVal , currentVal , Uid) : 0;
};

// 엔터 치환
$(".board_area .board_chat").on("change" , function(){
    var text = document.getElementsByClassName("board_chat");
    var result = text.value.replace(/(\n|\r\n)/g, '<br>');
    text.value.replace(/(\n|\r\n)/g, '<br>');
});

//채팅 보내기
$('.board_area .board_chat').on('keydown', function(e){
	if(e.keyCode == '13' && !e.shiftKey){
        e.preventDefault();
        ChatSend()
        $(".board_chat").val("");
	}
});


function ChatSend(){
    var chatData = {
        message: $(".board_chat").val().replace(/(\n|\r\n)/g, "<br>"),
        userId: $(".change_uid").val(),
        contestId: $(".change_cid").val(),
        roomId: $(".change_rid").val()
    };

    ($(".board_chat").val() == "") ? alert("내용을 입력해주세요") : contestChat.emit('message' , chatData);

    //채팅 유저 리스트 상단 노출 애니메이션
    upUserList()

    //보낸 유저 마지막 메세지 변환
    var lastMsg = $(".chat_borad ul li:last-child .list_chat p").text();
    var idxArr = []
    var chatRid = $(".chat_userlist");
    idxArr.forEach.call((chatRid) , (item , idx) => {
        if($(item).data("roomid") == chatData.roomId){
            $(item).find(".chat_t").html(lastMsg);
        }
    });

    //메세지 비움
    $(".board_chat").val("");
};

contestChat.on('message', function(data){
    var yourProfile = $(".others_profile img").attr("src");
    var chatList = 
    `<li class="chat_list" data-author=${data.author}>
        <div class="list_box">
            <div class="list_profile">
                <img src="${yourProfile}" alt="유저 프로필">
            </div>
            <div class="list_chat">
                <p>${data.content}</p>
                <div class="chat_date">
                    <span>${data.updated}</span>
                </div>
            </div>
        </div>
    </li>`;


    //개최 리스트 추가
    $(".chat_borad .borad_top ul").append(chatList);

    $(".chat_list").each(function(){
        var author = $(this).data("author");
        var uidVal = $(".change_uid").val();

        if(author == uidVal){
            $(this).addClass("active");

        }else{
            $(this).removeClass("on");
        }
    });
    chatScrollBottom()
    lastMsg()

});

// 채팅 스크롤 하단 이동
function chatScrollBottom(){
    $('.chat_borad .borad_top').scrollTop($('.chat_borad .borad_top')[0].scrollHeight);
}

// 채팅방 관리자 메세지 
contestChat.on("alarm" ,function(data){});

//채팅방 퇴장
contestChat.on("disconnect" , function(data){})

// 파일 이름 변경
var fileTarget = $(".chat_file .chat_filehidden");
    fileTarget.on("change", function () {
        if (window.FileReader) {
            filename = $(this)[0].files[0].name;
            var filesize = $(this)[0].files[0].size;
            $(this).siblings(".chat_file").val();
            chatFileSubmit(filename, filesize)

        } else {

            filename = $(this).val("선택된 파일 없음.");
        }
    }        
);

// 파일 업로드
function chatFileSubmit(filename, filesize) {
    var form = $("#chatfile")[0];
    var formData = new FormData(form);
    var roomid = $(".change_rid").val();
    formData.append("roomId", roomid)
 
    $.ajax({
        headers: { Authorization: "Basic " + UD },
        url: `${E}/api/v1/chat/files/upload/`,
        method: "POST",
        enctype: "multipart/form-data",
        contentType: false,
        processData: false,
        data: formData ,
        success: function (data){
            
            var fileData = {
                roomId : $(".change_rid").val(),
                file : filename,
                contestId : $(".change_cid").val(),
                userId : $(".change_uid").val(),
                fileSize : filesize,
                fileKey : data.fileKey
            };
            contestChat.emit("file", fileData);

            //채팅 유저 리스트 상단 노출 애니메이션
            upUserList()
            
        },
        error: function (err){
            console.log(err);
            alert("업로드 중 오류가 발생 했습니다.");
        },
    });
};

function fileValid(){
    if(data.targettypes.indexOf("Flies") < 0 ){
        return false;
    }
    if(data.files[0].type.indexOf('image') < 0){
        alert("이미지 파일만 업로드 가능합니다.")
        return false;
    }
    if(data.files.length < 1){
        alert("파일은 하나씩 전송이 가능합니다.");
        return false;
    }
    if(data.files[0].size >= 1024 * 1024 * 50){
        alert("50BMB 이상인 파일은 업로드할 수 없습니다");
        return false;
    }
    return true;
};

//메세지 파일 채팅
contestChat.on("file" , function(data){

    var roomId = $(".change_rid").val();
    var yourProfile = $(".others_profile img").attr("src");

    var chatList = 
    `<li class="chat_list" data-author=${data.author}>
        <div class="list_box">
            <div class="list_profile">
                <img src="${yourProfile}" alt="비디오콘 아이콘">
            </div>
            <div class="list_chat file_chat">
                <div class="file_left">
                    <div class="file_img">
                        <div class="img_box">
                            <img src="/img/file_file_icon.png">
                        </div>
                    </div>
                    <div class="file_text">
                        <p class="file_name">${data.file}</p>
                        <p class="file_size">${data.fileSize}</p>
                    </div>
                </div>
                <div class="file_down" onclick="ChatFileDown(this);" data-roomid=${roomId} data-filename=${data.file} data-filekey=${data.fileKey}>
                    <div class="img_box">
                        <img src="/img/file_down_icon.png">
                    </div>
                </div>
                <div class="chat_date">
                    <span>${data.updated}</span>
                </div>
            </div>
        </div>
    </li>`;
    ;

    //개최 리스트 추가
    $(".chat_date").addClass("on");
    $(".chat_borad .borad_top ul").append(chatList);

    $(".chat_list").each(function(){
        var author = $(this).data("author");
        var uidVal = $(".change_uid").val();

        if(author == uidVal){
            $(this).addClass("active");

        }else{
            $(this).removeClass("on");
        }
    });

    chatScrollBottom()
    lastMsg()
});

//채팅 유저 리스트 상단 노출 애니메이션
function upUserList(){
    var chatUParent = $(".chat_ulist ul")
    chatUParent.find('li.chat_prelist').hide().fadeIn(200).prependTo(chatUParent);
};

//채팅 마지막 메세지 표현
function lastMsg(){
    var lastMsg = $(".chat_borad ul li:last-child .list_chat p").text();
    var idxArr = []
    var chatRid = $(".chat_userlist");
    idxArr.forEach.call((chatRid) , (item , idx) => {
        if($(item).data("roomid") == $(".change_rid").val()){
            $(item).find(".chat_t").text(lastMsg);
        }
    });
};

// 채팅 파일 다운로드
function ChatFileDown(target){
    var roomNum = $(target).data("roomid");   
    var filekey = $(target).data("filekey");
    var fileName = $(target).data("filename")

    $.ajax({
        headers: { "Authorization": "Basic " + UD },
        url: `${E}/api/v1/chat/files/download`,
        method: 'POST',
        data: {fileKey: filekey , roomId : roomNum },
        xhrFields: {responseType: 'blob'},
        success: function (data, status, xhr) {
            // check for a filename
            var disposition = xhr.getResponseHeader('Content-Disposition');
            if (disposition && disposition.indexOf('attachment') !== -1) {
                var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
                var matches = filenameRegex.exec(disposition);
                if (matches != null && matches[1]) fileName = matches[1].replace(/['"]/g, '');
            }
 
            var type = xhr.getResponseHeader('Content-Type');
            var blob = new Blob([data], { type: type });

            if (typeof window.navigator.msSaveBlob !== 'undefined') {
                // IE workaround for "HTML7007: One or more blob URLs were revoked by closing the blob for which they were created. These URLs will no longer resolve as the data backing the URL has been freed."
                window.navigator.msSaveBlob(blob, fileName);
            } else {
                var URL = window.URL || window.webkitURL;
                var downloadUrl = URL.createObjectURL(blob);

                if (fileName) {
                    // use HTML5 a[download] attribute to specify filename
                    var a = document.createElement("a");
                    // safari doesn't support this yet
                    if (typeof a.download === 'undefined') {
                        window.location = downloadUrl;
                    } else {
                        a.href = downloadUrl;
                        a.download = fileName;
                        document.body.appendChild(a);
                        a.click();
                        window.URL.revokeObjectURL(downloadUrl);
                        
                    }
                } else {
                    window.location = downloadUrl;
                }
            }
        },error: function(err){
            console.log(err);
            alert("다운로드가 안될 시 채널톡을 통해 문의 주세요!");
        }
    })
};

//클라이언트 비디오 파일 다운로드 
function chatVideoDown(){
    var roomId = $(".change_rid").val();
    var contestTitle = $(".chat_title h2").text();
    var nickName = $(".others_nick p span").text();
    var fileName = `${contestTitle}_${nickName}` 

    $.ajax({
        headers: { "Authorization": "Basic " + UD },
        url: `${E}/api/v1/contest/video/download`,
        method: 'POST',
        data: {joinId : roomId},
        beforeSend: function () {
            $(".loading_box").addClass("on");
            $(".down_btn").fadeOut(300);
            $(".chat_preview .video_box").css("border-radius", "10px 10px 10px 10px")
        },
        xhrFields: {responseType: 'blob'},
        success: function (data, status, xhr){

            //로딩 초기화
            $(".loading_box").removeClass("on");
            $(".down_btn").fadeIn(200);
            $(".chat_preview .video_box").css("border-radius", "10px 10px 0 0")

            // check for a filename
            var disposition = xhr.getResponseHeader('Content-Disposition');
            if (disposition && disposition.indexOf('attachment') !== -1) {
                var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
                var matches = filenameRegex.exec(disposition);
                if (matches != null && matches[1]) fileName = matches[1].replace(/['"]/g, '');
            }
 
            var type = xhr.getResponseHeader('Content-Type');
            var blob = new Blob([data], { type: type });

            if (typeof window.navigator.msSaveBlob !== 'undefined'){
                // IE workaround for "HTML7007: One or more blob URLs were revoked by closing the blob for which they were created. These URLs will no longer resolve as the data backing the URL has been freed."
                window.navigator.msSaveBlob(blob, fileName);
            } else {
                var URL = window.URL || window.webkitURL;
                var downloadUrl = URL.createObjectURL(blob);

                if (fileName) {
                    // use HTML5 a[download] attribute to specify filename
                    var a = document.createElement("a");
                    // safari doesn't support this yet
                    if (typeof a.download === 'undefined') {
                        window.location = downloadUrl;
                    } else {
                        a.href = downloadUrl;
                        a.download = fileName;
                        document.body.appendChild(a);
                        a.click();
                        window.URL.revokeObjectURL(downloadUrl);
                        
                    }
                } else {
                    window.location = downloadUrl;
                }
            }

        },error: function(err){
            console.log(err);
            alert("다운로드가 안될 시 채널톡을 통해 문의 주세요!");
        }
    })
};

// 비디오 업로드 후 프리뷰
function chatChangeVideo(){
    var chosenFile = document.getElementById("update_filehidden").files[0];
    if(window.FileReader){
        chatChagngeUpload();
    }else{
        viedoName.value = "파일을 선택해주세요";
    }
};


function chatChagngeUpload(){
    //업로드 로딩
    $(".loading_box").addClass("on");
    $(".update_btn").fadeOut(300);
    $(".chat_preview .video_box").css("border-radius", "10px 10px 10px 10px")

    var form = $("#chatvideo")[0];
    var formData = new FormData(form);
    
    $.ajax({
        headers : {"Authorization" : "Basic " + UD},
        url: `${E}/api/v1/temp/video-only`,
        method: 'POST',
        enctype:'multipart/form-data',
        contentType : false,
        processData: false,
        data: formData,
        success: function (data){

            //로딩 초기화
            $(".loading_box").removeClass("on");
            $(".update_btn").fadeIn(200);
            $(".chat_preview .video_box").css("border-radius", "10px 10px 0 0")

            $(".chat_preview .video_box video").attr("src" , data.video);
            chatVideoFianl(data.video)

            alert("영상이 정상적으로 업로드 되었습니다!")

        },error: function (err){
            console.log(err)
            alert("실패")
        }
    })
}

function chatVideoFianl(DV) {
    var videoSrc = DV;
    var joinid = Number($(".change_rid").val());

    $.ajax({
        headers : {"Authorization" : "Basic " + UD},
        url: `${E}/api/v1/artrator/video/rejoin`,
        method: 'Patch',
        data: {
            video : videoSrc,
            joinId : joinid
        },
        success: function (data){
            
            //유저리스트 새로고침
            ChatList()

            //유저리스트 업로드시 애니메이션
            var idxArr = []
            var chatRid = $(".chat_userlist");
            idxArr.forEach.call((chatRid) , (item , idx) => {
                if($(item).data("roomid") == joinid){
                    $(item).addClass("on")
                }
            });
            
        },error: function (err){
            console.log(err)
            alert("실패") 
        }
    })
};



//상금 수령 승인
function prizeCil(){
    alert("상금 전달이 승인이 완료되었습니다.");

    var contestId = $(".change_cid").val()
    var roomId = $(".change_rid").val()

    $.ajax({
        headers : {"Authorization" : "Basic " + UD},
        url :`${E}/api/v1/contest/${contestId}/winner/${roomId}`,
        type:'POST',
        data:{
            contest : contestId,
            join : roomId
        },
        success: function(data){         

            //진행상태 변경
            $(".state_box ul li:nth-child(2)").addClass("on");

        },
        error : function(err){
            console.log(err);   
        }
    })
};

//상금 정보 등록
function prizeArt(){

    //팝업 초기화
    $(".bot_middle ul li:nth-child(2)").fadeIn(300);
    $(".bot_middle ul li:nth-child(1)").css("display" , "none");
    $(".a_info_btn1").fadeIn(300)
    $(".a_info_btn2").css("display" ,"none");
    $(".user_popup input").val("");

    //팝업 애니메이션
    $(".user_popup").fadeIn(500);
    $(".user_popup .user_inner").addClass("active");
    $(".a_info_btn1").fadeIn(100)
};

//주민 인증
function chatAuth(){

    $.ajax({
        headers : {"Authorization" : "Basic " + UD},
        url :`${E}/api/v1/auth/jumin`,
        type:'POST',
        data:{
            name : $("#chat_name").val(),
            birth : $("#chat_birth").val(),
            backNum: $("#chat_backNum").val(),
        },
        success: function(data){
            var authName = $("#chat_name").val()
            if(data.success == true){

                //인증 후 처리
                $(".bot_middle ul li:nth-child(1)").fadeIn(300);
                $(".bot_middle ul li:nth-child(2)").css("display" , "none");
                $(".a_info_btn1").css("display" , "none");
                $(".a_info_btn2").fadeIn(300);
                $(".e_name").val(authName);

                AuthJumin(data.authJumin)
            }
        },
        error : function(err){
            alert("전송 실패")
            console.log(err);   
        }
    })
};

//주민인증 키
function AuthJumin (Ejumin){
    $.ajax({
        headers : {"Authorization" : "Basic " + UD},
        url: `${E}/api/v1/user/profile/auth`,
        method: 'POST',
        data: {
            authJumin : Ejumin
        },
        success: function (data){

        },error: function (err){
            console.log(err)
        }
    })
};


function chatAccount(){

    $.ajax({
        headers : {"Authorization" : "Basic " + UD},
        url :`${E}/api/v1/user/profile/add-bank`,
        type:'POST',
        data:{
            holder : $(".e_name").val(),
            bankName : $(".e_bankname option:selected").val(),
            bankNum : $(".e_banknum").val(),
        },
        success: function(data){
            alert("상금 수령 정보 등록이 완료되었습니다.")
            $(".user_popup").fadeOut(400);
        },
        error : function(err){
            alert("전송 실패")
            console.log(err);   
        }
    })
};
