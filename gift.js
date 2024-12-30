window.addEventListener('load', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const friendName = urlParams.get('name');
    const greetingHeading = document.getElementById('greetingHeading');
    // greetingHeading.innerHTML = `We Wish You a Merry Christmas<br>${friendName}`;

    const arabicPattern = /[\u0600-\u06FF]/;
    let songText;
    if (arabicPattern.test(friendName)) {
        greetingHeading.style.direction = 'rtl';
        greetingHeading.style.fontFamily = 'Tahoma, sans-serif';
        greetingHeading.innerHTML = `نتمنى لكم عيد ميلاد مجيد<br>${friendName}`;
        songText = `نتمنى لكم عيد ميلاد مجيد يا${friendName}`;
        document.getElementById('playGreeting').textContent = 'تشغيل التحية 🎵';
        document.getElementById('shareGreeting').textContent = ' مشاركة 📱';
        document.getElementById('instruction-text').textContent = '🎆 شاهد الألعاب النارية السحرية والرسالة الخاصة! 🎵';
    } else {
        greetingHeading.style.direction = 'ltr';
        greetingHeading.style.fontFamily = "'Mountains of Christmas', cursive";
        greetingHeading.innerHTML = `We Wish You a Merry Christmas<br>${friendName}`;
        songText = `We Wish You a Merry Christmas ya ${friendName}`;
        document.getElementById('playGreeting').textContent = 'Play Greeting 🎵';
        document.getElementById('shareGreeting').textContent = ' Share 📱';
        document.getElementById('instruction-text').textContent = '🎆 Experience magical fireworks and a special message! 🎵';
    }

    document.getElementById('playGreeting').addEventListener('click', () => {

        const utterance = new SpeechSynthesisUtterance(songText);
        utterance.lang = arabicPattern.test(friendName) ? 'ar-SA' : 'en-US';
        window.speechSynthesis.speak(utterance);

        utterance.onend = () => {
            const instagramLink = document.createElement('a');
            instagramLink.href = 'https://www.instagram.com/reel/CmjNwEXDu0L/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==';
            instagramLink.target = '_blank';
            instagramLink.click();
        };

        // Display fireworks
        displayFireworks();
    });

    document.getElementById('shareGreeting').addEventListener('click', () => {
        const shareData = {
            title: 'Christmas Greeting',
            text: `We Wish You a Merry Christmas, ${friendName}`,
            url: window.location.href
        };
        if (navigator.share) {
            navigator.share(shareData).then(() => {
                console.log('Thanks for sharing!');
            }).catch(console.error);
        } else {
            alert('Web Share API is not supported in your browser.');
        }
    });

    function displayFireworks() {
        const fireworksContainer = document.getElementById('fireworksContainer');
        fireworksContainer.innerHTML = ''; // Clear previous fireworks

        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/fireworks-js@2.x/dist/index.umd.js';
        script.onload = () => {
            const fireworks = new window.Fireworks.default(fireworksContainer, {
                speed: 2,
                acceleration: 1.05,
                friction: 0.97,
                gravity: 1.5,
                particles: 150,
                trace: 3,
                explosion: 5,
                boundaries: {
                    top: 50,
                    bottom: fireworksContainer.clientHeight,
                    left: 50,
                    right: fireworksContainer.clientWidth
                },
                sound: {
                    enabled: true,
                    files: [
                        'https://fireworks.js.org/sounds/explosion0.mp3',
                        'https://fireworks.js.org/sounds/explosion1.mp3',
                        'https://fireworks.js.org/sounds/explosion2.mp3'
                    ],
                    volume: {
                        min: 4,
                        max: 8
                    }
                }
            });
            fireworks.start();
            setTimeout(() => {
            fireworks.stop();
            }, 5000);
        };
        document.body.appendChild(script);
    }
});
