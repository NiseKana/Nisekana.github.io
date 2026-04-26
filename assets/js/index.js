(function() {
        var html = document.documentElement;
        var toggle = document.getElementById('themeToggle');
        var icon = document.getElementById('themeIcon');

        function setTheme(t) {
            html.setAttribute('data-theme', t);
            icon.className = t === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
            localStorage.setItem('theme', t);
        }
        var saved = localStorage.getItem('theme');
        setTheme(saved || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));
        toggle.addEventListener('click', function() {
            toggle.classList.add('anim');
            setTimeout(function() {
                var isDark = html.getAttribute('data-theme') === 'dark';
                setTheme(isDark ? 'light' : 'dark');
            }, 300);
            setTimeout(function() {
                toggle.classList.remove('anim');
            }, 600);
        });

        // ===== Button Glow =====
        function addBtnGlow(el) {
            el.addEventListener('mousemove', function(e) {
                var rect = el.getBoundingClientRect();
                el.style.setProperty('--mx', (e.clientX - rect.left) + 'px');
                el.style.setProperty('--my', (e.clientY - rect.top) + 'px');
                el.style.setProperty('--glow', '1');
            });
            el.addEventListener('mouseleave', function() {
                el.style.setProperty('--glow', '0');
            });
        }
        addBtnGlow(toggle);
        document.querySelectorAll('.social-btn, .nav-item').forEach(addBtnGlow);

        // ===== Year =====
        document.getElementById('currentYear').textContent = new Date().getFullYear();

        // ===== Hitokoto =====
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                try {
                    var data = JSON.parse(this.responseText);
                    if (data && data.length) {
                        var item = data[Math.floor(Math.random() * data.length)];
                        var el = document.getElementById('hitokoto');
                        el.innerHTML = item.text + '<br><span class="hitokoto-author">—— ' + item.by + '</span>' + (item.from ? '「' + item.from + '」' : '');
                        el.addEventListener('click', function() {
                            navigator.clipboard.writeText(item.text + '\n- ' + item.by + (item.from ? ' 「' + item.from + '」' : '')).then(function() {
                                var t = document.getElementById('toast'); t.textContent = '已复制'; t.classList.add('show');
                                setTimeout(function() { t.classList.remove('show'); }, 1500);
                            });
                        });
                    }
                } catch(e) { document.getElementById('hitokoto').textContent = '—'; }
            }
        };
        xhr.open('GET', '/assets/hitokoto.json', true);
        xhr.send();

        window.decryptEmail = function(e) { window.location.href = 'mailto:' + atob(e); };
    })();