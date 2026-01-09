document.querySelectorAll("div#forum").forEach(div => {
    div.onclick = () => {
        window.location.href = "forum/?forum=" + div.querySelector("p").innerHTML
    }
})