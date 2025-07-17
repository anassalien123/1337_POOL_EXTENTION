function waitForTargetDiv(callback) {
    const checkExist = setInterval(() => {
        const targetDiv = document.querySelector('div.flex.flex-col.justify-center.items-center.bg-gray-50.p-8.rounded-lg.border.border-gray-200');
        if (targetDiv) {
            clearInterval(checkExist);
            callback(targetDiv);
        }
    }, 500); 
}

waitForTargetDiv((targetDiv) => {
    const observer = new MutationObserver((mutationsList) => {
        for (const mutation of mutationsList) {
            if (
                mutation.type === 'childList' && 
                (mutation.addedNodes.length > 0 || mutation.removedNodes.length > 0)
            ) {
                showAlert();
                break;
            }
        }
    });

    observer.observe(targetDiv, { childList: true, subtree: true });
});

function showAlert() {
    const alert = document.createElement('div');
    alert.innerHTML = `
        <div style="
            background-color: #fef3c7;
            border: 1px solid #f59e0b;
            color: #92400e;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0,0,0,0.2);
            font-weight: bold;
            text-align: center;
            min-width: 300px;
        ">
            📢 تم إضافة أو حذف Pool!
            <br><br>
            <button id="close-alert" style="
                margin-top: 10px;
                padding: 8px 12px;
                background-color: #f59e0b;
                border: none;
                border-radius: 5px;
                color: white;
                cursor: pointer;
                font-weight: normal;
            ">إغلاق</button>
        </div>
    `;

    const wrapper = document.createElement('div');
    wrapper.style.position = 'fixed';
    wrapper.style.top = '50%';
    wrapper.style.left = '50%';
    wrapper.style.transform = 'translate(-50%, -50%)';
    wrapper.style.zIndex = '9999';
    wrapper.appendChild(alert);
    document.body.appendChild(wrapper);

    const audio = new Audio('https://www.soundjay.com/buttons/sounds/button-3.mp3');
    audio.loop = true;
    audio.play().catch(err => console.warn("⚠️ الصوت ما خدمش:", err));

    document.getElementById('close-alert').onclick = () => {
        audio.pause(); 
        audio.currentTime = 0; 
        wrapper.remove();
    };
}
