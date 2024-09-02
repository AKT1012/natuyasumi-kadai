// script.js

let threads = []; // スレッドを保存する配列

// スレッドを表示
function displayThreads() {
    const threadsContainer = document.getElementById('threads-container');
    threadsContainer.innerHTML = '';

    threads.forEach((thread, index) => {
        const threadElement = document.createElement('div');
        threadElement.className = 'thread';
        threadElement.textContent = thread.title;
        threadElement.addEventListener('click', () => openChat(index));
        threadsContainer.appendChild(threadElement);
    });
}

// スレッドを作成
document.getElementById('create-thread-button').addEventListener('click', () => {
    const threadTitleInput = document.getElementById('thread-title-input');
    const title = threadTitleInput.value.trim();
    if (title) {
        threads.push({ title, messages: [] });
        threadTitleInput.value = '';
        displayThreads();
    }
});

// スレッド検索機能
document.getElementById('search-button').addEventListener('click', () => {
    const searchInput = document.getElementById('search-input').value.trim().toLowerCase();
    if (searchInput) {
        const filteredThreads = threads.filter(thread => thread.title.toLowerCase().includes(searchInput));
        displayFilteredThreads(filteredThreads);
    } else {
        displayThreads();
    }
});

function displayFilteredThreads(filteredThreads) {
    const threadsContainer = document.getElementById('threads-container');
    threadsContainer.innerHTML = '';

    filteredThreads.forEach((thread, index) => {
        const threadElement = document.createElement('div');
        threadElement.className = 'thread';
        threadElement.textContent = thread.title;
        threadElement.addEventListener('click', () => openChat(index));
        threadsContainer.appendChild(threadElement);
    });
}

// チャットウィンドウを開く
function openChat(threadIndex) {
    const chatModal = document.getElementById('chat-modal');
    const chatThreadTitle = document.getElementById('chat-thread-title');
    const chatMessages = document.getElementById('chat-messages');

    chatThreadTitle.textContent = threads[threadIndex].title;
    chatMessages.innerHTML = '';

    threads[threadIndex].messages.forEach(message => {
        const messageElement = document.createElement('div');
        messageElement.textContent = message;
        chatMessages.appendChild(messageElement);
    });

    chatModal.style.display = 'flex';

    document.getElementById('send-message-button').onclick = function() {
        const chatInput = document.getElementById('chat-input');
        const message = chatInput.value.trim();
        if (message) {
            threads[threadIndex].messages.push(message);
            const messageElement = document.createElement('div');
            messageElement.textContent = message;
            chatMessages.appendChild(messageElement);
            chatInput.value = '';
        }
    };
}

document.getElementById('login-button').addEventListener('click', async () => {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.ok) {
        localStorage.setItem('token', data.token);
        document.getElementById('login-container').style.display = 'none';
        document.querySelector('.container').style.display = 'block';
    } else {
        alert(data.message);
    }
});

document.getElementById('register-button').addEventListener('click', async () => {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.ok) {
        localStorage.setItem('token', data.token);
        document.getElementById('login-container').style.display = 'none';
        document.querySelector('.container').style.display = 'block';
    } else {
        alert(data.message);
    }
});

// チャットウィンドウを閉じる
document.querySelector('.close-button').addEventListener('click', () => {
    document.getElementById('chat-modal').style.display = 'none';
});

// スレッド一覧を最初に表示
displayThreads();
