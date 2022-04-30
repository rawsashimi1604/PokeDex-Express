const searchLink = document.querySelector("#search-link")
const searchInput = document.querySelector("#search-input")

searchLink.addEventListener("click", () => {
    searchLink.href = `/search/?q=${searchInput.value}`
})