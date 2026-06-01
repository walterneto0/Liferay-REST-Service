const outputBox = document.getElementById("output-box");
const urlInput = document.getElementById("url");
const userInput = document.getElementById("user");
const passWordInput = document.getElementById("password");
const getBtn = document.getElementById("get-btn");
const getSingleBtn = document.getElementById("get-single-btn");
const postBtn = document.getElementById("post-btn");
const deleteBtn = document.getElementById("delete-btn");
const sendBtn = document.getElementById("send-btn");
const notice = document.getElementById("notice");
const noticeClose = document.getElementById("notice-close");

let method = null;
window.onload = () => {
  notice.style.display = "flex";
};

// POST function
async function post(url, user, passWord, basicAuth) {
  try {
    const value = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${basicAuth}`,
      },
      body: JSON.stringify({
        headline: "Test Blog Entry from REST Services",
        articleBody:
          "This article was posted by Walter via REST services provided by Liferay DXP.",
      }),
    });

    if (!value.ok) {
      throw new Error(`${value.status}`);
    }

    const data = await value.json();
    outputBox.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
  } catch (error) {
    console.error(error);
    window.alert(error);
  }
}

// GET function
async function get(url, user, passWord, basicAuth) {
  try {
    const value = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${basicAuth}`,
      },
    });

    if (!value.ok) {
      throw new Error(`${value.status}`);
    }

    const data = await value.json();
    outputBox.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
  } catch (error) {
    console.error(error);
    window.alert(error);
  }
}

// GET SINGLE function
async function getSingle(url, user, passWord, basicAuth) {
  try {
    const value = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${basicAuth}`,
      },
    });

    if (!value.ok) {
      throw new Error(`${value.status}`);
    }

    const data = await value.json();
    outputBox.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
  } catch (error) {
    console.error(error);
    window.alert(error);
  }
}

// DELETE function
async function deleteIt(url, user, passWord, basicAuth) {
  try {
    const value = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${basicAuth}`,
      },
    });

    if (!value.ok) {
      throw new Error(`${value.status}`);
    }

    if (value.status === 204) {
      outputBox.innerHTML = "<pre>Resource deleted successfully.</pre>";
      return;
    }

    const data = await value.json();
    outputBox.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
  } catch (error) {
    console.error(error);
    window.alert(error);
  }
}

// Change fetch method
function changeMethod(methodType) {
  method = methodType;
}

// Buttons area
let getBtnPressed = false;
getBtn.addEventListener("click", () => {
  if (!getBtnPressed) {
    urlInput.value =
      "http://localhost:8080/o/headless-delivery/v1.0/sites/20117/blog-postings";
    changeMethod(get);
    getSingleBtn.classList.remove("active-get");
    postBtn.classList.remove("active-post");
    deleteBtn.classList.remove("active-delete");
    getBtn.classList.add("active-get");
    getBtnPressed = true;
  } else {
    changeMethod(null);
    getBtn.classList.remove("active-get");
    getBtnPressed = false;
  }
});

let getSingleBtnPressed = false;
getSingleBtn.addEventListener("click", () => {
  if (!getSingleBtnPressed) {
    urlInput.value =
      "http://localhost:8080/o/headless-delivery/v1.0/blog-postings/35215";
    changeMethod(getSingle);
    getBtn.classList.remove("active-get");
    postBtn.classList.remove("active-post");
    deleteBtn.classList.remove("active-delete");
    getSingleBtn.classList.add("active-get");
    getSingleBtnPressed = true;
  } else {
    changeMethod(null);
    getSingleBtn.classList.remove("active-get");
    getSingleBtnPressed = false;
  }
});

let postBtnPressed = false;
postBtn.addEventListener("click", () => {
  if (!postBtnPressed) {
    urlInput.value =
      "http://localhost:8080/o/headless-delivery/v1.0/sites/20117/blog-postings";
    changeMethod(post);
    getBtn.classList.remove("active-get");
    getSingleBtn.classList.remove("active-get");
    deleteBtn.classList.remove("active-delete");
    postBtn.classList.add("active-post");
    postBtnPressed = true;
  } else {
    changeMethod(null);
    postBtn.classList.remove("active-post");
    postBtnPressed = false;
  }
});

let deleteBtnPressed = false;
deleteBtn.addEventListener("click", () => {
  if (!deleteBtnPressed) {
    urlInput.value =
      "http://localhost:8080/o/headless-delivery/v1.0/blog-postings/35215";
    changeMethod(deleteIt);
    getBtn.classList.remove("active-get");
    getSingleBtn.classList.remove("active-get");
    postBtn.classList.remove("active-post");
    deleteBtn.classList.add("active-delete");
    deleteBtnPressed = true;
  } else {
    changeMethod(null);
    deleteBtn.classList.remove("active-delete");
    deleteBtnPressed = false;
  }
});
sendBtn.addEventListener("click", () => {
  const url = urlInput.value;
  const user = userInput.value;
  const passWord = passWordInput.value;
  const basicAuth = btoa(`${user}@liferay.com:${passWord}`);
  const filled = url != 0 && user != 0 && passWord != 0 && method != null;
  if (filled) {
    method(url, user, passWord, basicAuth);
  } else {
    window.alert("Fill up all inputs!");
  }
});
noticeClose.addEventListener("click", () => {
  notice.style.display = "none";
});
