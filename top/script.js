const serverButton = document.querySelector("div#serverButton")
const serverText = document.querySelector("p#serverText")
const usernameButton = document.querySelector("div#usernameButton")
const usernameText = document.querySelector("p#usernameText")
const title = document.querySelector("h1#title")
const home = document.querySelector("div#home")

usernameText.innerHTML += localStorage.getItem("name")
serverText.innerHTML += localStorage.getItem("serverURL")

serverButton.onclick = () => {
    parent.location.href = "../serverSelection"
}

usernameButton.onclick = () => {
    parent.location.href = "../register"
}

home.onclick = () => {
    parent.location.href = ".."
}

title.innerHTML = new  URLSearchParams(document.location.search).get("title")