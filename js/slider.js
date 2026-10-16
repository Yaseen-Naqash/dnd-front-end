// slider

    const track = document.getElementById('rightbarTrack');
    const options = document.querySelectorAll('.actionbar .options');

    // maps each actionbar button to its panel index
    // order MUST match your HTML panels
    // [0]=تاریخچه [1]=روایت [2]=نوبت [3]=بازیکنان
    // [4]=حماسه  [5]=رکوردها [6]=اتاق

    let currentIndex = 0;

    function goTo(index) {
        if (index < 0 || index >= options.length) return;
        currentIndex = index;

        // slide: move track left by (index * 100%)
        track.style.transform = `translateX(-${index * 100}%)`;

        // update active state
        options.forEach(o => o.classList.remove('active'));
        options[index].classList.add('active');

        // hide the grid overflow from the parent (prevents page x-scroll)
        // done via .rightbar { overflow: hidden } above
    }

    // attach click handlers
    options.forEach((opt, i) => {
        opt.addEventListener('click', () => goTo(i));
    });

    // default active = تاریخچه (index 0)
    goTo(0);

