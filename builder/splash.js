import "./splash.css";

(function () {
  var root = document.getElementById("owl-splash");
  if (!root) return;
  var percent = root.querySelector(".percent");
  var message = root.querySelector(".subtitle");
  var phase = root.querySelector(".phase");
  var headline = root.querySelector("h1");
  var subline = root.querySelector(".subline");
  var elapsed = root.querySelector(".elapsed");
  var footerText = root.querySelector(".footer-text");
  var tipText = root.querySelector(".tip-text");
  var steps = root.querySelectorAll(".step");
  var beats = [
    { at: 0, phase: "连接", text: "正在建立安全连接" },
    { at: 12, phase: "资源", text: "正在载入页面资源" },
    { at: 80, phase: "环境", text: "正在准备运行环境" },
    { at: 90, phase: "数据", text: "正在读取基础数据" },
    { at: 96, phase: "进入", text: "马上进入系统" }
  ];
  var tips = [
    "正在加载的内容比较多，保持页面打开即可，无需重复刷新。",
    "复杂页面通常需要加载脚本、样式和业务数据，请给它一点时间。",
    "如果长时间没有响应，可以检查网络连接后再尝试刷新。",
    "小提示：下次访问时，部分资源可能会从浏览器缓存中快速读取。"
  ];
  var value = 0;
  var ceiling = 70;
  var failed = false;
  var finished = false;
  var started = 0;
  var tipIndex = 0;
  var openedAt = Date.now();

  function paintSteps(shown) {
    var current = -1;
    for (var i = 0; i < steps.length; i++) {
      var at = Number(steps[i].getAttribute("data-at") || 0);
      var on = shown >= at;
      steps[i].classList.toggle("active", on);
      if (on) current = i;
    }
    for (var j = 0; j < steps.length; j++) {
      steps[j].classList.toggle("current", j === current && shown < 100);
    }
  }

  function paint(next) {
    if (next < value) return;
    value = next > 100 ? 100 : next;
    var shown = Math.round(value);
    root.style.setProperty("--p", String(value));
    if (percent) percent.textContent = shown >= 100 ? "完成" : shown + "%";
    root.setAttribute("aria-valuenow", String(shown));
    paintSteps(shown);
    if (ceiling > 70) return;
    var current = beats[0];
    for (var i = 0; i < beats.length; i++) {
      if (shown >= beats[i].at) current = beats[i];
    }
    if (message) message.textContent = current.text;
    if (phase) phase.textContent = current.phase;
  }

  function tick(now) {
    if (failed || finished) return;
    if (!started) started = now;
    if (ceiling <= 70) {
      paint(70 * (1 - Math.exp(-(now - started) / 12000)));
    }
    window.requestAnimationFrame(tick);
  }

  function swapTip() {
    if (!tipText || failed || finished) return;
    tipIndex = (tipIndex + 1) % tips.length;
    tipText.textContent = tips[tipIndex];
    tipText.classList.remove("is-swap");
    void tipText.offsetWidth;
    tipText.classList.add("is-swap");
  }

  function paintElapsed() {
    if (!elapsed || finished) return;
    var seconds = Math.floor((Date.now() - openedAt) / 1000);
    elapsed.textContent = " · 已等待 " + seconds + " 秒";
  }

  function fail() {
    if (finished) return;
    failed = true;
    if (message) message.textContent = "加载失败";
    if (headline) headline.textContent = "暂时无法进入";
    if (subline) subline.textContent = "页面脚本没有跑起来，刷新后可以再试一次。";
    if (footerText) footerText.textContent = "加载中断 · 请刷新页面";
    root.classList.add("is-failed");
    root.setAttribute("aria-busy", "false");
  }

  window.requestAnimationFrame(tick);
  window.setInterval(paintElapsed, 1000);
  window.setInterval(swapTip, 8000);

  window.__owlSplash = {
    set: function (next, text, label) {
      if (failed || finished || !(next > value)) return;
      ceiling = next;
      if (text && message) message.textContent = text;
      if (label && phase) phase.textContent = label;
      paint(next);
    },
    done: function () {
      if (finished) return;
      finished = true;
      failed = false;
      ceiling = 100;
      if (headline) headline.textContent = "工作空间已准备就绪";
      if (message) message.textContent = "正在进入系统";
      if (subline) subline.textContent = "马上就好。";
      if (phase) phase.textContent = "进入";
      paint(100);
      root.classList.add("is-done");
      root.setAttribute("aria-busy", "false");
      window.setTimeout(function () {
        if (root.parentNode) root.parentNode.removeChild(root);
      }, 450);
    }
  };

  window.addEventListener("error", function (event) {
    if (event.target && event.target !== window) return;
    fail();
  });
  window.addEventListener("unhandledrejection", fail);

  var entry = document.querySelector("script[data-owl-app]");
  if (entry) entry.addEventListener("error", fail);
})();
