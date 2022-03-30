//전체 공통
var currentUrl = "videocon.io"
// var E = "http://3.34.190.242:8080";
var E = "https://api.videocon.io";
var UD = $.cookie('UD');
var UT = $.cookie('UT');
var CT = $.cookie('CT');

//페이징 기본
var isAJAX = false;
var temp = false;
var CP = 1;

//스크롤 none
function ScrollNone() {
    document.documentElement.style.overflowX = "hidden";
    document.documentElement.style.overflowY = "hidden";
}

//스크롤 Active
function ScrollActive() {
    document.documentElement.style.overflowY = "scroll";
};

function readyAlert(){
    alert("준비 중입니다.")
    return;
};

// beforeSend: function (xhr, set) {
        //     url = currentUrl + "?" + set.data;
        //     console.log(set.data);
        //     console.log(set.url);
        // },

// var httpReq = new XMLHttpRequest();
// function urlPara(){

//     console.log(httpReq);
//     // var link = window.location.host
//     // console.log(link)
//     // var path = window.location.pathname
//     // var pathLink = `${link}${path}`
//     // console.log(pathLink);
    
//     // var pathport = window.location.host
//     // console.log(pathport);

//     // var req = new XMLHttpRequest();
//     httpReq.onreadystatechange = function(){
//         if(httpReq.readyState == XMLHttpRequest.DONE && httpReq.status == 200){
//             var ss = document.getElementById("text").innerHTML = httpReq.responseText;
//             var sss = document.getElementById("header").innerHTML = httpReq.getAllResponseHeaders();
//             var ssss = document.getElementById("user").innerHTML = httpReq.getAllResponseHeaders("adjHeader");
            
//             console.log(httpReq.getAllResponseHeaders())

//         }else{
//             console.log(httpReq.getAllResponseHeaders())
//         }
//     }
// }


// $(document).ready(function(){
//     cacheBust()
// });
 
// function cacheBust(){

//     //cache bust 
//     // var cacheBust = [
//     //     'JS/store.js',
//     //     'JS/layout.js',
//     // ];
//     // for(i=0; i < cacheBust.length; i++){
//     //     var el = document.createElement('script');
//     //     el.src = cacheBust[i]+"?v=" + new Date().getTime();
//     //     document.getElementsByClassName('modalValue')[0].appendChild(el);
//     //     flag = false
//     // }

//     // front end cache bust
//     var cacheBust = ['JS/main.js', 'JS/layout.js', 'JS/main.js', 'bootstrap_ECP/js/init.js'];   
//     for (i=0; i < cacheBust.length; i++){
//         var el = document.createElement('script');
//         el.src = cacheBust[i]+"?version=" + new Date().getTime();
//         document.getElementsByClassName('modalValue')[0].appendChild(el);
//     }
// };

// $(document).ready(function(){
//     if(UD = ""){
//         animeEvent()
//     }else{
//         animeEvent()
//     }
// });

// function animeEvent(){
//     //폭죽 애니메이션
//     let particles = [];
//     const colors = ["#eb6383","#fa9191","#ffe9c5","#b4f2e1"];
//         function pop () {
//             for (let i = 0; i < 150; i++) {
//                 const p = document.createElement('particule');
//                 p.x = window.innerWidth * 0.5;
//                 p.y = window.innerHeight + (Math.random() * window.innerHeight * 0.3);
//                 p.vel = {
//                 x: (Math.random() - 0.5) * 10,
//                 y: Math.random() * -20 - 15
//                 };
//                 p.mass = Math.random() * 0.2 + 0.8;
//                 particles.push(p);
//                 p.style.transform = `translate(${p.x}px, ${p.y}px)`;
//                 const size = Math.random() * 15 + 5;
//                 p.style.width = size + 'px';
//                 p.style.height = size + 'px';
//                 p.style.background = colors[Math.floor(Math.random()*colors.length)];
//                 document.body.appendChild(p);
//                 }
//             }

//         function render () {
//             for (let i = particles.length - 1; i--; i > -1) {
//                 const p = particles[i];
//                 p.style.transform = `translate3d(${p.x}px, ${p.y}px, 1px)`;
                        
//                 p.x += p.vel.x;
//                 p.y += p.vel.y;
                        
//                 p.vel.y += (0.5 * p.mass);
//                 if (p.y > (window.innerHeight * 2)) {
//                 p.remove();
//                 particles.splice(i, 1);
//                 }
//             }
//             requestAnimationFrame(render);
//             }
//             pop();
//             window.setTimeout(render, 300);
// }