// 공지사항 리스트 
$(document).ready(function(){
    $.ajax({
        url: `${E}/api/v1/notice?page=${1}`,
        method : 'GET',
        success: function(data){
            if(typeof data !== "undefined"){
                // $(".notice_box ul").html("");

                for(i = 0 ; i < data.length ; i++ ){
                    var idx = data[i].idx;
                    var title = data[i].title;
                    var date = data[i].date;
                    var content = data[i].content;

                    var notiList = 
                        `<li>
                            <input type='text' class='noti_index hold_index' name='index' value=${idx}>
                            <a href='javascript:;'>
                                <h2>${title}</h2>
                                <p>${date}</p>
                            </a>
                            <div class="notice_depth">
                                <p>${content}</p>
                            </div>
                        </li>`
                    
                    $(".notice_box ul").append(notiList).children(':last').hide().fadeIn(500);
                }

                //게시판 데이터 열림
                $(".notice_box ul li a").on('click', function(){
                    $(this).toggleClass("active");
                    $(this).closest('li').siblings().find('a').removeClass('active');
                
                    $(this).next().slideToggle(200);
                    $(this).closest('li').siblings().find('.notice_depth').slideUp(200);
                });

            }else{
                alert("실패");
            }

        },error:function(err){
            console.log(err)
            alert("렌더 실패")
        }
    });
});