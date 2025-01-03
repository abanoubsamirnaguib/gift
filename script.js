function animateMouth() {
    const mouth = document.querySelector('#santa-mouth');
    let scale = 1;
    
    function animate() {
        scale = scale === 1 ? 1.5 : 1;
        mouth.setAttribute('transform', `scale(1, ${scale})`);
        mouth.setAttribute('cy', scale === 1.5 ? '125' : '120');
    }

    // Animate every 200ms
    const mouthInterval = setInterval(animate, 200);
    
    // Stop animation after 3 seconds
    setTimeout(() => {
        clearInterval(mouthInterval);
        mouth.setAttribute('transform', 'scale(1, 1)');
        mouth.setAttribute('cy', '120');
    }, 3000);
}

function playSong() {
    const friendNameInput = document.getElementById('friendName');
    const friendNameDisplay = document.getElementById('friendNameDisplay');
    const heading = document.querySelector('h1');
    const friendName = friendNameInput.value.charAt(0).toUpperCase() + friendNameInput.value.slice(1);
    if (friendName.trim() === '') {
        alert('Please enter a name');
        return;
    }

    // Check if the name is in Arabic
    const arabicPattern = /[\u0600-\u06FF]/;
    let songText;
    if (arabicPattern.test(friendName)) {
        friendNameDisplay.style.direction = 'rtl';
        friendNameDisplay.style.fontFamily = 'Tahoma, sans-serif';
        heading.innerHTML = `نتمنى لكم عيد ميلاد مجيد<br>${friendName}`;
        songText =  `نتمنى لكم عيد ميلاد مجيد يا${friendName}`;
    } else {
        friendNameDisplay.style.direction = 'ltr';
        friendNameDisplay.style.fontFamily = "'Mountains of Christmas', cursive";
        heading.innerHTML = `We Wish You a Merry Christmas<br>${friendName}`;
        songText = `We Wish You a Merry Christmas ya ${friendName}`;
    }

    // Update Open Graph meta tags
    document.querySelector('meta[property="og:description"]').setAttribute('content', `We Wish You a Merry Christmas, ${friendName}`);


    // Disable the playSong button until the song ends
    const playSong = document.getElementById('playSong');
    playSong.disabled = true;
    playSong.style.backgroundColor = 'gray';
    function speakName() {
        const utterance = new SpeechSynthesisUtterance(songText);
        utterance.lang = arabicPattern.test(friendName) ? 'ar-SA' : 'en-US';
        window.speechSynthesis.speak(utterance);
    }

    // Display name after N seconds (after the melody)
    setTimeout(() => {
        // Display name
        friendNameDisplay.textContent = friendName;
        playSong.disabled = false;
        playSong.style.backgroundColor = '#28a745';
        speakName();
    }, 1000);

    // const speakTimes = [4, 8 , 12]; // times in seconds to speak the name
    // speakTimes.forEach(time => {
    //     setTimeout(speakName, time * 1000);
    // });


    // Open new page with greeting container
    window.open(`gift.html?name=${encodeURIComponent(friendName)}`, '_blank');
}

// Share on any social media
document.getElementById('shareAnyButton').addEventListener('click', () => {
    const friendNameInput = document.getElementById('friendName').value;
    document.querySelector('meta[property="og:description"]').setAttribute('content', `We Wish You a Merry Christmas, ${friendNameInput}`);
    const shareUrl = `${window.location.origin}${window.location.pathname}?name=${encodeURIComponent(friendNameInput)}`;
    const shareData = {
        title: 'Christmas Greeting',
        text: `We Wish You a Merry Christmas, ${friendNameInput}`,
        url: shareUrl
    };

    if (navigator.share) {
        navigator.share(shareData).then(() => {
            console.log('Thanks for sharing!');
        }).catch(console.error);
    } else {
        alert('Web Share API is not supported in your browser.');
    }
});
