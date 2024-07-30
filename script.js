// script.js
document.getElementById('tweet-button').addEventListener('click', function() {
    const tweetInput = document.getElementById('tweet-input');
    const tweetText = tweetInput.value;

    if (tweetText.trim() !== '') {
        const tweetContainer = document.createElement('div');
        tweetContainer.className = 'tweet';
        tweetContainer.textContent = tweetText;

        const tweetsContainer = document.getElementById('tweets-container');
        tweetsContainer.prepend(tweetContainer);

        tweetInput.value = '';
    }
});
