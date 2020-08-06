// 메뉴 탭
var menuBtn = $(".open");
var menuBtnList = $(".menu-btn-list");

menuBtn.on("click", function() {
    var content  = $(this).attr("data-target");
    if (!$(this).hasClass("active")) {
        menuBtn.removeClass("active");
        menuBtnList.removeClass("active");
        $(this).addClass("active");
        $(content).addClass("active");
    } else {
        $(this).removeClass("active");
        $(content).removeClass("active");
    }
});

// 메뉴 클릭시 이벤트
var menuListClickEvent = $(".menu-btn-list li");

menuListClickEvent.click(function(){
    menuListClickEvent.removeClass("active");
    $(this).addClass("active");
});

// 알람이 있을때 이벤트
let noticeBtn = document.querySelector('#notice');
let noticeList = document.querySelector('.notice-list');
let onNotice = document.querySelector('.on-notice');

noticeBtn.addEventListener("click", function () {
    if (!noticeBtn.classList.contains('active')) {
        noticeBtn.classList.add('active');
        noticeList.classList.add('active');
        onNotice.classList.add('active');
    } else {
        noticeBtn.classList.remove('active');
        noticeList.classList.remove('active');
        onNotice.classList.remove('active');
    }
});