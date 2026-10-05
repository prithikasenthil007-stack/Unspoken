/* =====================================================
   UNSPOKEN — FULL INTERACTIVE + CINEMATIC ANIMATIONS
===================================================== */

let currentExperience = "";
let timerInterval = null;
let timeLeft = 120;

let letterText = "";
let selectedEnvelope = "midnight";
let selectedSeal = "✦";
let unlockDate = null;


/* =====================================================
   CINEMATIC ANIMATION STYLES
===================================================== */

const animationCSS = document.createElement("style");

animationCSS.textContent = `

/* ---------- GLOBAL ---------- */

.cinematic-overlay {
    position: fixed;
    inset: 0;
    z-index: 9999;
    pointer-events: none;
    overflow: hidden;
}


/* ---------- BURN ---------- */

.burn-word {
    position: fixed;
    z-index: 10000;
    color: #f4d4a0;
    font-family: Georgia, serif;
    font-size: 22px;
    pointer-events: none;
    text-shadow:
        0 0 8px #ffb347,
        0 0 25px #ff6b35;
    animation: burnRise 2.8s ease-out forwards;
}

.burn-flame {
    position: fixed;
    z-index: 9998;
    width: 180px;
    height: 180px;
    border-radius: 50%;
    background:
        radial-gradient(
            circle,
            rgba(255,210,100,.9) 0%,
            rgba(255,100,30,.5) 35%,
            rgba(255,50,10,0) 70%
        );
    filter: blur(12px);
    animation: flamePulse 1.8s ease-in-out infinite;
}

.burn-ash {
    position: fixed;
    z-index: 10001;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: #777;
    pointer-events: none;
    animation: ashRise 2.8s ease-out forwards;
}

@keyframes burnRise {

    0% {
        opacity: 1;
        transform:
            translate(0, 0)
            rotate(0deg)
            scale(1);
        filter: blur(0);
    }

    30% {
        color: #ffb347;
        transform:
            translate(var(--x), -30px)
            rotate(var(--r))
            scale(1.05);
    }

    65% {
        opacity: .65;
        transform:
            translate(calc(var(--x) * 1.4), -110px)
            rotate(calc(var(--r) * 2))
            scale(.75);
        filter: blur(2px);
    }

    100% {
        opacity: 0;
        transform:
            translate(calc(var(--x) * 2), -230px)
            rotate(calc(var(--r) * 4))
            scale(.15);
        filter: blur(10px);
    }
}

@keyframes flamePulse {

    0%,100% {
        transform: scale(.75);
        opacity: .35;
    }

    50% {
        transform: scale(1.15);
        opacity: .8;
    }
}

@keyframes ashRise {

    0% {
        opacity: .9;
        transform: translate(0,0) scale(1);
    }

    100% {
        opacity: 0;
        transform:
            translate(var(--ax), -180px)
            scale(.2);
    }
}


/* ---------- DUMP ---------- */

.dump-piece {
    position: fixed;
    z-index: 10000;
    pointer-events: none;
    color: #aaa;
    font-family: Georgia, serif;
    animation: dumpFly 1.8s cubic-bezier(.2,.8,.2,1) forwards;
}

.dump-bin {
    position: fixed;
    z-index: 9998;
    left: 50%;
    bottom: 12%;
    transform: translateX(-50%);
    font-size: 70px;
    opacity: 0;
    animation: binAppear 2s ease forwards;
}

@keyframes dumpFly {

    0% {
        opacity: 1;
        transform:
            translate(0,0)
            rotate(0deg)
            scale(1);
    }

    35% {
        transform:
            translate(var(--dx), var(--dy))
            rotate(var(--rot))
            scale(1.1);
    }

    100% {
        opacity: 0;
        transform:
            translate(
                calc(var(--dx) * 2),
                calc(var(--dy) * 2 + 180px)
            )
            rotate(calc(var(--rot) * 2))
            scale(.2);
    }
}

@keyframes binAppear {

    0% {
        opacity: 0;
        transform: translateX(-50%) translateY(30px) scale(.7);
    }

    40% {
        opacity: 1;
        transform: translateX(-50%) translateY(0) scale(1);
    }

    80% {
        opacity: 1;
    }

    100% {
        opacity: 0;
    }
}


/* ---------- FLOAT ---------- */

.float-water {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    height: 42%;
    z-index: 9997;
    background:
        linear-gradient(
            to top,
            rgba(45,75,90,.35),
            rgba(45,75,90,0)
        );
    pointer-events: none;
    animation: waterAppear 1.2s ease forwards;
}

.float-ripple {
    position: fixed;
    width: 80px;
    height: 25px;
    border: 1px solid rgba(180,220,230,.35);
    border-radius: 50%;
    z-index: 9999;
    pointer-events: none;
    animation: ripple 2.5s ease-out forwards;
}

.float-message {
    position: fixed;
    z-index: 10000;
    max-width: 300px;
    padding: 20px 28px;
    border-radius: 50%;
    color: #d8e5e8;
    background: rgba(60,90,100,.2);
    border: 1px solid rgba(200,230,240,.18);
    backdrop-filter: blur(5px);
    text-align: center;
    pointer-events: none;
    animation: floatSky 6s ease-in-out forwards;
}

@keyframes floatSky {

    0% {
        opacity: 0;
        transform:
            translate(-50%, 100px)
            scale(.8);
    }

    15% {
        opacity: 1;
    }

    50% {
        transform:
            translate(-50%, -30px)
            scale(1);
    }

    100% {
        opacity: 0;
        transform:
            translate(-50%, -260px)
            scale(.65);
        filter: blur(5px);
    }
}

@keyframes ripple {

    0% {
        opacity: .7;
        transform: translate(-50%,-50%) scale(.3);
    }

    100% {
        opacity: 0;
        transform: translate(-50%,-50%) scale(5);
    }
}

@keyframes waterAppear {

    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}


/* ---------- LOOP ---------- */

.loop-orbit {
    position: fixed;
    left: 50%;
    top: 48%;
    width: 230px;
    height: 230px;
    margin-left: -115px;
    margin-top: -115px;
    border: 1px solid rgba(180,170,200,.3);
    border-radius: 50%;
    z-index: 9997;
    pointer-events: none;
    animation: orbitSpin 4s linear infinite;
}

.loop-orbit::before {
    content: "WHAT IF?";
    position: absolute;
    left: 50%;
    top: -12px;
    transform: translateX(-50%);
    padding: 5px 12px;
    background: #090909;
    color: #aaa;
    font-family: Arial, sans-serif;
    font-size: 10px;
    letter-spacing: 2px;
}

.loop-cut {
    position: fixed;
    z-index: 10001;
    left: 50%;
    top: 48%;
    width: 320px;
    height: 3px;
    background: white;
    transform: translate(-50%,-50%) rotate(-18deg) scaleX(0);
    box-shadow: 0 0 20px white;
    pointer-events: none;
    animation: cutLoop 1s ease forwards;
}

@keyframes orbitSpin {

    to {
        transform: rotate(360deg);
    }
}

@keyframes cutLoop {

    0% {
        transform:
            translate(-50%,-50%)
            rotate(-18deg)
            scaleX(0);
    }

    50% {
        transform:
            translate(-50%,-50%)
            rotate(-18deg)
            scaleX(1);
    }

    100% {
        opacity: 0;
        transform:
            translate(-50%,-50%)
            rotate(-18deg)
            scaleX(1.2);
    }
}


/* ---------- COLOR ---------- */

.color-wave {
    position: fixed;
    left: 50%;
    top: 50%;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    z-index: 9998;
    pointer-events: none;
    transform: translate(-50%,-50%);
    animation: colorExpand 2.5s ease-out forwards;
}

@keyframes colorExpand {

    0% {
        width: 20px;
        height: 20px;
        opacity: .7;
    }

    100% {
        width: 160vmax;
        height: 160vmax;
        opacity: 0;
    }
}


/* ---------- EXIST ---------- */

.exist-stars {
    position: fixed;
    inset: 0;
    z-index: 9996;
    pointer-events: none;
}

.exist-star {
    position: absolute;
    width: 2px;
    height: 2px;
    border-radius: 50%;
    background: white;
    box-shadow: 0 0 8px white;
    animation: starTwinkle var(--duration) ease-in-out infinite;
}

.exist-breathe {
    position: fixed;
    left: 50%;
    top: 50%;
    width: 220px;
    height: 220px;
    transform: translate(-50%,-50%);
    border-radius: 50%;
    background: rgba(130,120,180,.08);
    box-shadow: 0 0 100px rgba(130,120,180,.12);
    z-index: 9995;
    pointer-events: none;
    animation: breathe 5s ease-in-out infinite;
}

@keyframes starTwinkle {

    0%,100% {
        opacity: .15;
        transform: scale(.6);
    }

    50% {
        opacity: 1;
        transform: scale(1.5);
    }
}

@keyframes breathe {

    0%,100% {
        transform: translate(-50%,-50%) scale(.75);
    }

    50% {
        transform: translate(-50%,-50%) scale(1.25);
    }
}


/* ---------- ENVELOPE ---------- */

.envelope-sealing {
    animation: sealEnvelope 1.5s cubic-bezier(.2,.8,.2,1) forwards !important;
}

@keyframes sealEnvelope {

    0% {
        transform: scale(1) rotate(0);
    }

    30% {
        transform: scale(1.08) rotate(-2deg);
    }

    60% {
        transform: scale(.96) rotate(2deg);
    }

    100% {
        transform: scale(1) rotate(0);
    }
}

.seal-pulse {
    animation: sealPulse 1.5s ease-in-out infinite;
}

@keyframes sealPulse {

    0%,100% {
        box-shadow: 0 0 0 rgba(255,255,255,0);
    }

    50% {
        box-shadow:
            0 0 30px rgba(255,255,255,.25),
            0 0 70px rgba(180,160,200,.15);
    }
}

`;

document.head.appendChild(animationCSS);


/* =====================================================
   SCREEN CONTROL
===================================================== */

function showScreen(id) {

    document.querySelectorAll(".screen").forEach(screen => {
        screen.classList.remove("active");
    });

    const screen = document.getElementById(id);

    if (screen) {
        screen.classList.add("active");
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


function goHome() {
    stopTimer();
    removeCinematicElements();
    showScreen("home");
}


/* =====================================================
   DEAR ME
===================================================== */

function openDearMe() {

    showScreen("dearMe");

    const saved =
        localStorage.getItem("unspokenLetter");

    if (saved) {
        document.getElementById("letterText").value = saved;
    }
}


function continueLetter() {

    const text =
        document.getElementById("letterText").value.trim();

    if (!text) {

        alert(
            "Write something first. It doesn't have to be perfect."
        );

        return;
    }

    letterText = text;

    localStorage.setItem(
        "unspokenLetter",
        text
    );

    showScreen("decorate");
}


/* =====================================================
   ENVELOPE
===================================================== */

function chooseEnvelope(type, button) {

    selectedEnvelope = type;

    document
        .querySelectorAll(".envelope-choice")
        .forEach(btn => {
            btn.classList.remove("selected");
        });

    button.classList.add("selected");
}


function chooseSeal(seal, button) {

    selectedSeal = seal;

    document
        .querySelectorAll(".seal-options button")
        .forEach(btn => {
            btn.classList.remove("selected");
        });

    button.classList.add("selected");
}


function setUnlock(days, button) {

    const date = new Date();

    date.setDate(
        date.getDate() + days
    );

    unlockDate = date.toISOString();

    document
        .querySelectorAll(".unlock-options button")
        .forEach(btn => {
            btn.classList.remove("selected");
        });

    button.classList.add("selected");

    document.getElementById("customDate").value = "";
}


function sealLetter() {

    const customDate =
        document.getElementById("customDate").value;

    if (customDate) {

        const selectedDate =
            new Date(customDate + "T00:00:00");

        if (selectedDate <= new Date()) {

            alert("Choose a future date.");

            return;
        }

        unlockDate =
            selectedDate.toISOString();
    }

    if (!unlockDate) {

        const date = new Date();

        date.setDate(
            date.getDate() + 7
        );

        unlockDate =
            date.toISOString();
    }

    localStorage.setItem(
        "unspokenLetter",
        letterText
    );

    localStorage.setItem(
        "unspokenEnvelope",
        selectedEnvelope
    );

    localStorage.setItem(
        "unspokenSeal",
        selectedSeal
    );

    localStorage.setItem(
        "unspokenUnlock",
        unlockDate
    );

    showScreen("sealed");

    updateSealedScreen();

    const envelope =
        document.getElementById("envelope");

    envelope.classList.add(
        "envelope-sealing"
    );

    document
        .getElementById("sealDisplay")
        .classList.add("seal-pulse");
}


/* =====================================================
   SEALED SCREEN
===================================================== */

function updateSealedScreen() {

    const savedLetter =
        localStorage.getItem("unspokenLetter") || "";

    const savedEnvelope =
        localStorage.getItem("unspokenEnvelope")
        || "midnight";

    const savedSeal =
        localStorage.getItem("unspokenSeal")
        || "✦";

    const savedUnlock =
        localStorage.getItem("unspokenUnlock");

    letterText = savedLetter;

    selectedEnvelope =
        savedEnvelope;

    selectedSeal =
        savedSeal;

    unlockDate =
        savedUnlock;

    const envelope =
        document.getElementById("envelope");

    envelope.className =
        "envelope " + savedEnvelope;

    document.getElementById(
        "sealDisplay"
    ).textContent = savedSeal;

    const unlockText =
        document.getElementById("unlockText");

    const openButton =
        document.getElementById(
            "openLetterButton"
        );

    if (!savedUnlock) {

        unlockText.textContent = "";

        openButton.classList.add(
            "hidden"
        );

        return;
    }

    const unlock =
        new Date(savedUnlock);

    const now =
        new Date();

    const formattedDate =
        unlock.toLocaleDateString(
            undefined,
            {
                day: "numeric",
                month: "long",
                year: "numeric"
            }
        );

    if (now >= unlock) {

        unlockText.textContent =
            "It's time.";

        openButton.classList.remove(
            "hidden"
        );

    } else {

        unlockText.textContent =
            "Opens on " + formattedDate;

        openButton.classList.add(
            "hidden"
        );
    }
}


function openLetter() {

    const saved =
        localStorage.getItem(
            "unspokenLetter"
        );

    if (!saved) {

        alert(
            "There isn't a letter saved yet."
        );

        return;
    }

    document.getElementById(
        "savedLetter"
    ).textContent = saved;

    showScreen("openedLetter");
}


/* =====================================================
   RESET MENU
===================================================== */

function openReset() {

    stopTimer();

    removeCinematicElements();

    showScreen("resetMenu");
}


function startExperience(type) {

    currentExperience = type;

    removeCinematicElements();

    document
        .querySelectorAll(".experience-content")
        .forEach(section => {
            section.classList.add("hidden");
        });

    const selected =
        document.getElementById(
            type + "Experience"
        );

    if (selected) {
        selected.classList.remove("hidden");
    }

    resetExperienceUI(type);

    showScreen("experience");

    startTimer();

    /* Special intro animation */

    if (type === "exist") {
        createExistScene();
    }

    if (type === "color") {
        createColorIntro();
    }

    if (type === "loop") {
        createLoopIntro();
    }
}


/* =====================================================
   TIMER
===================================================== */

function startTimer() {

    stopTimer();

    timeLeft = 120;

    updateTimer();

    timerInterval =
        setInterval(() => {

            timeLeft--;

            updateTimer();

            if (timeLeft <= 0) {

                stopTimer();

                document.getElementById(
                    "timer"
                ).textContent = "DONE";
            }

        }, 1000);
}


function updateTimer() {

    const minutes =
        Math.floor(timeLeft / 60);

    const seconds =
        timeLeft % 60;

    document.getElementById(
        "timer"
    ).textContent =
        String(minutes).padStart(2, "0") +
        ":" +
        String(seconds).padStart(2, "0");
}


function stopTimer() {

    if (timerInterval) {

        clearInterval(timerInterval);

        timerInterval = null;
    }
}


/* =====================================================
   RESET UI
===================================================== */

function resetExperienceUI(type) {

    if (type === "burn") {

        document.getElementById(
            "burnText"
        ).value = "";

        document.getElementById(
            "burnResult"
        ).textContent = "";
    }

    if (type === "dump") {

        document.getElementById(
            "dumpText"
        ).value = "";

        document.getElementById(
            "dumpResult"
        ).textContent = "";
    }

    if (type === "float") {

        document.getElementById(
            "floatText"
        ).value = "";

        document.getElementById(
            "floatScene"
        ).innerHTML = "";
    }

    if (type === "loop") {

        document.getElementById(
            "loopText"
        ).value = "";

        document.getElementById(
            "loopResult"
        ).textContent = "";
    }

    if (type === "color") {

        document.getElementById(
            "feelingColor"
        ).value = "#777777";

        changeFeelingColor();
    }
}


/* =====================================================
   🔥 BURN IT — REAL ANIMATION
===================================================== */

function burnThought() {

    const text =
        document.getElementById(
            "burnText"
        );

    const result =
        document.getElementById(
            "burnResult"
        );

    const value =
        text.value.trim();

    if (!value) {

        result.textContent =
            "Give it a name first.";

        return;
    }

    removeCinematicElements();

    const overlay =
        createOverlay();

    /* Flame */

    const flame =
        document.createElement("div");

    flame.className =
        "burn-flame";

    flame.style.left =
        "50%";

    flame.style.top =
        "55%";

    flame.style.transform =
        "translate(-50%,-50%)";

    overlay.appendChild(flame);

    /* Break sentence into words */

    const words =
        value.split(/\s+/);

    words.forEach((word, index) => {

        const element =
            document.createElement("div");

        element.className =
            "burn-word";

        element.textContent =
            word;

        element.style.left =
            `${35 + Math.random() * 30}%`;

        element.style.top =
            `${45 + Math.random() * 15}%`;

        element.style.setProperty(
            "--x",
            `${(Math.random() - .5) * 180}px`
        );

        element.style.setProperty(
            "--r",
            `${(Math.random() - .5) * 90}deg`
        );

        element.style.animationDelay =
            `${index * 0.08}s`;

        overlay.appendChild(element);
    });

    /* Ash particles */

    for (let i = 0; i < 45; i++) {

        const ash =
            document.createElement("div");

        ash.className =
            "burn-ash";

        ash.style.left =
            `${45 + Math.random() * 10}%`;

        ash.style.top =
            `${50 + Math.random() * 10}%`;

        ash.style.setProperty(
            "--ax",
            `${(Math.random() - .5) * 250}px`
        );

        ash.style.animationDelay =
            `${Math.random() * 1.5}s`;

        overlay.appendChild(ash);
    }

    text.value = "";

    result.textContent =
        "Letting it go...";

    setTimeout(() => {

        removeCinematicElements();

        result.textContent =
            "It's gone. You don't have to carry it for these two minutes.";

    }, 3500);
}


/* =====================================================
   🗑️ DUMP IT — REAL ANIMATION
===================================================== */

function dumpThought() {

    const text =
        document.getElementById(
            "dumpText"
        );

    const result =
        document.getElementById(
            "dumpResult"
        );

    const value =
        text.value.trim();

    if (!value) {

        result.textContent =
            "There is nothing you need to organize.";

        return;
    }

    removeCinematicElements();

    const overlay =
        createOverlay();

    const words =
        value.split(/\s+/);

    words.forEach((word, index) => {

        const piece =
            document.createElement("div");

        piece.className =
            "dump-piece";

        piece.textContent =
            word;

        piece.style.left =
            `${25 + Math.random() * 50}%`;

        piece.style.top =
            `${30 + Math.random() * 30}%`;

        piece.style.setProperty(
            "--dx",
            `${(Math.random() - .5) * 300}px`
        );

        piece.style.setProperty(
            "--dy",
            `${(Math.random() - .5) * 180}px`
        );

        piece.style.setProperty(
            "--rot",
            `${(Math.random() - .5) * 100}deg`
        );

        piece.style.animationDelay =
            `${index * .05}s`;

        overlay.appendChild(piece);
    });

    const bin =
        document.createElement("div");

    bin.className =
        "dump-bin";

    bin.textContent =
        "🗑️";

    overlay.appendChild(bin);

    text.value = "";

    result.textContent =
        "Clearing the space...";

    setTimeout(() => {

        removeCinematicElements();

        result.textContent =
            "Empty space. That's enough.";

    }, 2500);
}


/* =====================================================
   🌊 LET IT FLOAT — REAL ANIMATION
===================================================== */

function floatThought() {

    const input =
        document.getElementById(
            "floatText"
        );

    const scene =
        document.getElementById(
            "floatScene"
        );

    const value =
        input.value.trim();

    if (!value) {
        return;
    }

    removeCinematicElements();

    const overlay =
        createOverlay();

    /* Water */

    const water =
        document.createElement("div");

    water.className =
        "float-water";

    overlay.appendChild(water);

    /* Message */

    const message =
        document.createElement("div");

    message.className =
        "float-message";

    message.textContent =
        value;

    message.style.left =
        "50%";

    message.style.top =
        "55%";

    overlay.appendChild(message);

    /* Ripple */

    const ripple =
        document.createElement("div");

    ripple.className =
        "float-ripple";

    ripple.style.left =
        "50%";

    ripple.style.top =
        "65%";

    overlay.appendChild(ripple);

    input.value = "";

    setTimeout(() => {

        removeCinematicElements();

    }, 6500);
}


/* =====================================================
   ✂️ CUT THE LOOP
===================================================== */

function createLoopIntro() {

    const overlay =
        createOverlay();

    const orbit =
        document.createElement("div");

    orbit.className =
        "loop-orbit";

    overlay.appendChild(orbit);

    setTimeout(() => {

        if (currentExperience === "loop") {

            orbit.remove();
        }

    }, 5000);
}


function loopAnswer(answer) {

    removeCinematicElements();

    const overlay =
        createOverlay();

    const cut =
        document.createElement("div");

    cut.className =
        "loop-cut";

    overlay.appendChild(cut);

    const result =
        document.getElementById(
            "loopResult"
        );

    setTimeout(() => {

        if (answer === "yes") {

            result.innerHTML =
                "Then forget the whole future for a moment.<br><br>" +
                "Choose one tiny thing you can control right now.";

        } else {

            result.innerHTML =
                "Then you don't need to solve it right now.<br><br>" +
                "Some things can stay unanswered.";
        }

    }, 700);

    setTimeout(() => {

        removeCinematicElements();

    }, 1800);
}


/* =====================================================
   🎨 COLOR YOUR FEELING
===================================================== */

function createColorIntro() {

    const wave =
        document.createElement("div");

    wave.className =
        "color-wave";

    wave.style.background =
        "#777777";

    document.body.appendChild(wave);

    setTimeout(() => {

        wave.remove();

    }, 2700);
}


function changeFeelingColor() {

    const color =
        document.getElementById(
            "feelingColor"
        ).value;

    const display =
        document.getElementById(
            "colorDisplay"
        );

    display.style.background =
        color;

    display.style.boxShadow =
        `0 0 90px ${color}`;

    /* Full-screen color wave */

    const wave =
        document.createElement("div");

    wave.className =
        "color-wave";

    wave.style.background =
        color;

    document.body.appendChild(wave);

    setTimeout(() => {

        wave.remove();

    }, 2700);
}


/* =====================================================
   🌙 JUST EXIST
===================================================== */

function createExistScene() {

    const overlay =
        createOverlay();

    const stars =
        document.createElement("div");

    stars.className =
        "exist-stars";

    overlay.appendChild(stars);

    for (let i = 0; i < 80; i++) {

        const star =
            document.createElement("div");

        star.className =
            "exist-star";

        star.style.left =
            `${Math.random() * 100}%`;

        star.style.top =
            `${Math.random() * 100}%`;

        star.style.setProperty(
            "--duration",
            `${2 + Math.random() * 5}s`
        );

        star.style.animationDelay =
            `${Math.random() * 4}s`;

        stars.appendChild(star);
    }

    const breathe =
        document.createElement("div");

    breathe.className =
        "exist-breathe";

    overlay.appendChild(breathe);
}


/* =====================================================
   CINEMATIC HELPERS
===================================================== */

function createOverlay() {

    const existing =
        document.querySelector(
            ".cinematic-overlay"
        );

    if (existing) {
        existing.remove();
    }

    const overlay =
        document.createElement("div");

    overlay.className =
        "cinematic-overlay";

    document.body.appendChild(overlay);

    return overlay;
}


function removeCinematicElements() {

    document
        .querySelectorAll(
            ".cinematic-overlay"
        )
        .forEach(element => {
            element.remove();
        });

    document
        .querySelectorAll(
            ".color-wave"
        )
        .forEach(element => {
            element.remove();
        });
}


/* =====================================================
   LOAD SAVED DATA
===================================================== */

function loadSavedData() {

    const savedLetter =
        localStorage.getItem(
            "unspokenLetter"
        );

    const savedEnvelope =
        localStorage.getItem(
            "unspokenEnvelope"
        );

    const savedSeal =
        localStorage.getItem(
            "unspokenSeal"
        );

    const savedUnlock =
        localStorage.getItem(
            "unspokenUnlock"
        );

    if (savedLetter) {
        letterText = savedLetter;
    }

    if (savedEnvelope) {
        selectedEnvelope =
            savedEnvelope;
    }

    if (savedSeal) {
        selectedSeal =
            savedSeal;
    }

    if (savedUnlock) {
        unlockDate =
            savedUnlock;
    }
}


/* =====================================================
   START
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        loadSavedData();

        changeFeelingColor();

    }
);

// =========================
// UNSPOKEN MUSIC CONTROL
// =========================

const bgMusic = document.getElementById("bgMusic");
const musicToggle = document.getElementById("musicToggle");

let musicPlaying = false;
let fadeInterval;

bgMusic.volume = 0;

function fadeMusicIn() {
  clearInterval(fadeInterval);

  bgMusic.play().then(() => {
    musicPlaying = true;
    musicToggle.textContent = "♫";
    musicToggle.classList.add("playing");

    let volume = bgMusic.volume;

    fadeInterval = setInterval(() => {
      volume += 0.02;

      if (volume >= 0.22) {
        volume = 0.22;
        clearInterval(fadeInterval);
      }

      bgMusic.volume = volume;
    }, 100);
  }).catch(() => {
    console.log("Music needs a user interaction.");
  });
}

function fadeMusicOut() {
  clearInterval(fadeInterval);

  let volume = bgMusic.volume;

  fadeInterval = setInterval(() => {
    volume -= 0.02;

    if (volume <= 0) {
      volume = 0;
      bgMusic.pause();
      clearInterval(fadeInterval);
    }

    bgMusic.volume = volume;
  }, 100);

  musicPlaying = false;
  musicToggle.classList.remove("playing");
  musicToggle.textContent = "♫";
}

musicToggle.addEventListener("click", () => {
  if (musicPlaying) {
    fadeMusicOut();
  } else {
    fadeMusicIn();
  }
});