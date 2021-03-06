let activePage = "skills";

function hide(id) {
//document.getElementById(id).style.display= "none";
    const el = document.getElementById(id);
    console.info(id, el);

    if (el) {
        el.style.display= "none";
    } else {
        console.error("pagina nu exista", id);
    }
} 

function hidePreviousPage() {
    const link = document.querySelector(`#top-menu-bar a[data-page="${activePage}"]`)
    link.classList.add("active");
    hide(activePage);
}

function showPage(pageId){
    hidePreviousPage();
    document.getElementById(pageId).style.display = "";
    const link = document.querySelector(`#top-menu-bar a[data-page="${pageId}"]`)
    link.classList.add("active");
    activePage = pageId;
}

function initMenu(){
    document.addEventListener("click", e => {
        const link = e.target;
        if (link.matches("#top-menu-bar a")) {
          const id = link.getAttribute("data-page");
          showPage(id);
        }
    })
}
    
initMenu();
showPage(activePage);

function getHTMLSkills(skills) {
    return skills.map(skill =>
     `<li class= "${skill.endorsements > 9 ? "favorite": ""}"> 
       ${skill.name} <span>&middot; ${skill.endorsements} </span>
    </li>`
     ) .join("");
}
function showSkills(skills) {
    const ul = document.querySelector("#skills ul");
    ul.innerHTML = getHTMLSkills(skills);
}

fetch("data/skills.json")
.then(r => r.json())
.then((allskills) => {
    allskills.sort((s1, s2) =>  s2.endorsements - s1.endorsements);
    showSkills(allskills);
});