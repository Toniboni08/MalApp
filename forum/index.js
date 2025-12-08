let nameModifiable = document.querySelectorAll("#forumName");
const searchExtensions = new URLSearchParams(document.location.search);

for (let index = 0; index < nameModifiable.length; index++) {
    const element = nameModifiable[index];
    element.innerHTML = searchExtensions.get("forum") + element.innerHTML;
}