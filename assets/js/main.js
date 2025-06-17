var iUp = (function () {
	var time = 0,
		duration = 150,
		clean = function () {
			time = 0;
		},
		up = function (element) {
			setTimeout(function () {
				element.classList.add("up");
			}, time);
			time += duration;
		},
		down = function (element) {
			element.classList.remove("up");
		},
		toggle = function (element) {
			setTimeout(function () {
				element.classList.toggle("up");
			}, time);
			time += duration;
		};
	return {
		clean: clean,
		up: up,
		down: down,
		toggle: toggle
	};
})();


function decryptEmail(encoded) {
	var address = atob(encoded);
	window.location.href = "mailto:" + address;
}

// document.addEventListener('DOMContentLoaded', function () {
// 	// 获取一言数据
// 	var xhr = new XMLHttpRequest();
// 	xhr.onreadystatechange = function () {
// 		if (this.readyState == 4 && this.status == 200) {
// 			var res = JSON.parse(this.responseText);
// 			document.getElementById('description').innerHTML = res.hitokoto + "<br/> -「<strong>" + res.from + "</strong>」";
// 		}
// 	};
// 	xhr.open("GET", "https://v1.hitokoto.cn", true);
// 	xhr.send();

// 	var iUpElements = document.querySelectorAll(".iUp");
// 	iUpElements.forEach(function (element) {
// 		iUp.up(element);
// 	});

// 	var avatarElement = document.querySelector(".js-avatar");
// 	avatarElement.addEventListener('load', function () {
// 		avatarElement.classList.add("show");
// 	});
// });
document.addEventListener('DOMContentLoaded', function () {
    // 获取自定义一言数据
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            try {
                var data = JSON.parse(this.responseText);
                if (data && data.length > 0) {
                    // 随机选择一条一言
                    var randomIndex = Math.floor(Math.random() * data.length);
                    var hitokotoData = data[randomIndex];

                    // 更新 HTML 显示一言
                    var hitokotoText = hitokotoData.text;
                    var hitokotoBy = hitokotoData.by;
                    var hitokotoFrom = hitokotoData.from;
                    var hitokotoUri = hitokotoData.uri;
                    var hitokotoTime = hitokotoData.time;

                    document.getElementById('description').innerHTML =
                        '<span id="hitokoto-text">' + hitokotoText + '</span><br/> - <strong id="hitokoto-by">' + hitokotoBy + '</strong> <span id="hitokoto-from">「' + hitokotoFrom + '」</span>';

                    // 点击文本复制一言
                    document.getElementById('hitokoto-text').addEventListener('click', function () {
                        var textToCopy = hitokotoText + '\n- ' + hitokotoBy + ' 「' + hitokotoFrom + '」 ' + hitokotoTime + ' Uri: ' + hitokotoUri;
                        navigator.clipboard.writeText(textToCopy).then(function() {
                            alert('一言已复制到剪贴板！');
                        }, function(err) {
                            console.error('复制失败: ', err);
                            alert('复制失败，请手动复制。');
                        });
                    });

                    // 点击作者跳转链接
                    document.getElementById('hitokoto-by').addEventListener('click', function () {
                        if (hitokotoUri) {
                            window.open(hitokotoUri, '_blank');
                        }
                    });

                    // 点击出处跳转链接
                    document.getElementById('hitokoto-from').addEventListener('click', function () {
                        if (hitokotoUri) {
                            window.open(hitokotoUri, '_blank');
                        }
                    });
                } else {
                    document.getElementById('description').innerHTML = "JSON 文件数据为空或格式不正确。";
                }
            } catch (e) {
                console.error("解析 JSON 失败: " + e);
                document.getElementById('description').innerHTML = "加载一言失败，请检查 JSON 文件格式。";
            }
        } else if (this.readyState == 4) {
            console.error("加载 JSON 文件失败，状态码: " + this.status);
            document.getElementById('description').innerHTML = "加载一言失败。";
        }
    };
    xhr.open("GET", "/assets/hitokoto.json", true); // 替换JSON 文件路径
    xhr.send();

    var iUpElements = document.querySelectorAll(".iUp");
    iUpElements.forEach(function (element) {
        if (typeof iUp !== 'undefined' && typeof iUp.up === 'function') {
            iUp.up(element);
        }
    });

    var avatarElement = document.querySelector(".js-avatar");
    avatarElement.addEventListener('load', function () {
        avatarElement.classList.add("show");
    });
});


var btnMobileMenu = document.querySelector('.btn-mobile-menu__icon');
var navigationWrapper = document.querySelector('.navigation-wrapper');

btnMobileMenu.addEventListener('click', function () {
	if (navigationWrapper.style.display == "block") {
		navigationWrapper.addEventListener('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
			navigationWrapper.classList.toggle('visible');
			navigationWrapper.classList.toggle('animated');
			navigationWrapper.classList.toggle('bounceOutUp');
			navigationWrapper.removeEventListener('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', arguments.callee);
		});
		navigationWrapper.classList.toggle('animated');
		navigationWrapper.classList.toggle('bounceInDown');
		navigationWrapper.classList.toggle('animated');
		navigationWrapper.classList.toggle('bounceOutUp');
	} else {
		navigationWrapper.classList.toggle('visible');
		navigationWrapper.classList.toggle('animated');
		navigationWrapper.classList.toggle('bounceInDown');
	}
	btnMobileMenu.classList.toggle('social');
	btnMobileMenu.classList.toggle('iconfont');
	btnMobileMenu.classList.toggle('icon-list');
	btnMobileMenu.classList.toggle('social');
	btnMobileMenu.classList.toggle('iconfont');
	btnMobileMenu.classList.toggle('icon-angleup');
	btnMobileMenu.classList.toggle('animated');
	btnMobileMenu.classList.toggle('fadeIn');
});
