(function () {
  var root = document.getElementById("owl-splash");
  if (!root) return;
  var dial = root.querySelector(".dial");
  var percent = root.querySelector(".percent");
  var message = root.querySelector(".subtitle");
  var phase = root.querySelector(".phase");
  var beats = [
    { at: 0, phase: "连接", text: "正在建立安全连接" },
    { at: 12, phase: "资源", text: "正在载入页面资源" },
    { at: 80, phase: "环境", text: "正在准备运行环境" },
    { at: 90, phase: "数据", text: "正在读取基础数据" },
    { at: 96, phase: "进入", text: "马上进入系统" }
  ];
  var value = 0;
  var ceiling = 70;
  var failed = false;
  var finished = false;
  var started = 0;

  function paint(next) {
    if (next < value) return;
    value = next > 100 ? 100 : next;
    var shown = Math.round(value);
    if (dial) dial.style.setProperty("--p", String(value));
    percent.textContent = shown >= 100 ? "完成" : shown + "%";
    root.setAttribute("aria-valuenow", String(shown));
    var current = beats[0];
    for (var i = 0; i < beats.length; i++) {
      if (shown >= beats[i].at) current = beats[i];
    }
    if (ceiling <= 70) {
      message.textContent = current.text;
      if (phase) phase.textContent = current.phase;
    }
  }

  // 入口脚本没有字节进度，这段只按时间缓缓靠近 70%。
  function tick(now) {
    if (failed || finished) return;
    if (!started) started = now;
    if (ceiling <= 70) {
      paint(70 * (1 - Math.exp(-(now - started) / 12000)));
    }
    window.requestAnimationFrame(tick);
  }

  function fail() {
    if (finished) return;
    failed = true;
    message.textContent = "加载失败";
    root.classList.add("is-failed");
    root.setAttribute("aria-busy", "false");
  }

  window.requestAnimationFrame(tick);

  window.__owlSplash = {
    set: function (next, text, label) {
      if (failed || finished || !(next > value)) return;
      ceiling = next;
      if (text) message.textContent = text;
      if (label && phase) phase.textContent = label;
      paint(next);
    },
    done: function () {
      if (finished) return;
      finished = true;
      failed = false;
      ceiling = 100;
      message.textContent = "正在进入系统";
      if (phase) phase.textContent = "进入";
      paint(100);
      root.classList.add("is-done");
      root.setAttribute("aria-busy", "false");
      window.setTimeout(function () {
        if (root.parentNode) root.parentNode.removeChild(root);
      }, 280);
    }
  };

  window.addEventListener("error", function (event) {
    if (event.target && event.target !== window) return;
    fail();
  });
  window.addEventListener("unhandledrejection", fail);

  var entry = document.querySelector('script[type="module"]');
  if (entry) entry.addEventListener("error", fail);
})();
