window.onresize = () => {
    const container = document.querySelector("div.contentContainer")
    container.style.height = (window.innerHeight - container.clientTop - (container.clientHeight / 2)) + "px"
}

window.onresize()

if(localStorage.getItem("serverURL") == null) {
    window.location.replace("/serverSelection")
}

const registerButton = document.querySelector("button#registerButton")
const usernameInput = document.querySelector("input#usernameInput")
const successText = document.querySelector("h2#successText")

registerButton.onclick = () => {
    const ws = new WebSocket("ws://localhost:8080")

    ws.onopen = () => {
        const name = usernameInput.value
        ws.send(JSON.stringify({
            type: "REGISTER",
            name: name
        }))

        ws.onmessage = message => {
            const json = JSON.parse(message.data)
            if (json.success) {
                successText.style.color = "green"
                successText.innerHTML = "Success!"
                localStorage.setItem("name", name)
                localStorage.setItem("secret", json.secret)
            } else {
                successText.style.color = "red"
                successText.innerHTML = "This username has allready been taken!"
            }
        }
    }
}