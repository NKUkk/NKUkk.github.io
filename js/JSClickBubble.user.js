// ==/UserScript==
onload = function() {
    var click_cnt = 0;
    var $html = document.getElementsByTagName("html")[0];
    var $body = document.getElementsByTagName("body")[0];
    $html.onclick = function(e) {
        var $elem = document.createElement("b");
        $elem.style.color = "#E94F06";
        $elem.style.zIndex = 9999;
        $elem.style.position = "absolute";
        $elem.style.select = "none";
        var x = e.pageX;
        var y = e.pageY;
        $elem.style.left = (x - 10) + "px";
        $elem.style.top = (y - 20) + "px";
        clearInterval(anim);
        switch (++click_cnt%12) {
            case 1:
                $elem.innerText = "富强";
                break;
            case 2:
                $elem.innerText = "民主";
                break;
            case 3:
                $elem.innerText = "文明";
                break;
            case 4:
                $elem.innerText = "和谐";
                break;
            case 5:
                $elem.innerText = "自由";
                break;
            case 6:
                $elem.innerText = "平等";
                break;
            case 7:
                $elem.innerText = "公正";
                break;
            case 8:
                $elem.innerText = "法治";
                break;
            case 9:
                $elem.innerText = "爱国";
                break;
            case 10:
		$elem.innerText = "敬业";
                break;
            case 11:
		$elem.innerText = "诚信";
                break;
            case 12:
		$elem.innerText = "友善";
                break;
            default:
		// 手动更换下面这行双引号里面的内容 如"😀
                break;
        }
        $elem.style.fontSize = Math.random() * 10 + 8 + "px";
        var increase = 0;
        var anim;
        setTimeout(function() {
        	anim = setInterval(function() {
	            if (++increase == 150) {
	                clearInterval(anim);
			$body.removeChild($elem);
	            }
	            $elem.style.top = y - 20 - increase + "px";
	            $elem.style.opacity = (150 - increase) / 120;
	        }, 8);
        }, 70);
        $body.appendChild($elem);
    };
};
