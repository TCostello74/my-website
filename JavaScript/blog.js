document.addEventListener("DOMContentLoaded", () => {
    const newTopicBtn = document.getElementById("new-topic-btn");
    const existingTopicBtn = document.getElementById("existing-topic-btn");
    const topicForm = document.getElementById("topic-form");
    const postForm = document.getElementById("post-form");
    const newTopicInput = document.getElementById("new-topic-input");
    const createTopicBtn = document.getElementById("create-topic-btn");
    const topicSelect = document.getElementById("topic-select");
    const postInput = document.getElementById("post-input");
    const createPostBtn = document.getElementById("create-post-btn");
    const topicsContainer = document.getElementById("topics-container");

    let topics = JSON.parse(localStorage.getItem("topics")) || [];

    newTopicBtn.addEventListener("click", () => {
        topicForm.style.display = "block";
        postForm.style.display = "none";
    });

    existingTopicBtn.addEventListener("click", () => {
        topicForm.style.display = "none";
        postForm.style.display = "block";
        updateTopicSelect();
    });

    createTopicBtn.addEventListener("click", () => {
        const topicName = newTopicInput.value.trim();
        if (topicName) {
            const newTopic = { name: topicName, posts: [] };
            topics.push(newTopic);
            localStorage.setItem("topics", JSON.stringify(topics));
            newTopicInput.value = "";
            renderTopics();
        }
    });

    createPostBtn.addEventListener("click", () => {
        const selectedTopicIndex = topicSelect.value;
        const postContent = postInput.value.trim();
        const postDate = new Date().toLocaleDateString();
        if (selectedTopicIndex >= 0 && postContent) {
            const newPost = { content: postContent, date: postDate };
            topics[selectedTopicIndex].posts.push(newPost);
            localStorage.setItem("topics", JSON.stringify(topics));
            postInput.value = "";
            renderTopics();
        }
    });

    function updateTopicSelect() {
        topicSelect.innerHTML = topics.map((topic, index) => `<option value="${index}">${topic.name}</option>`).join("");
    }

    function renderTopics() {
        topicsContainer.innerHTML = topics.map((topic, index) => `
            <div class="topic-card">
                <h3>${topic.name}</h3>
                ${topic.posts.map(post => `<div class="post"><strong>${post.date}:</strong> ${post.content}</div>`).join("")}
                <input type="text" class="form-control mb-2" placeholder="New post for ${topic.name}" onkeypress="handlePostInput(event, ${index})">
            </div>
        `).join("");
    }

    window.handlePostInput = function(event, topicIndex) {
        if (event.key === "Enter") {
            const postContent = event.target.value.trim();
            const postDate = new Date().toLocaleDateString();
            if (postContent) {
                const newPost = { content: postContent, date: postDate };
                topics[topicIndex].posts.push(newPost);
                localStorage.setItem("topics", JSON.stringify(topics));
                renderTopics();
            }
        }
    }

    renderTopics();
});
