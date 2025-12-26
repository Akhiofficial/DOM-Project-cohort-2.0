function openFetaures(){
    
let allElems = document.querySelectorAll('.elem')
let allFullPage = document.querySelectorAll('.fullElem')
let allFullElemsBackBtn = document.querySelectorAll('.back')

allElems.forEach((elem) => {
    elem.addEventListener('click', () => {
        console.log(elem.id);
        
        allFullPage[elem.id].style.display = 'block'
        
    })
})

allFullElemsBackBtn.forEach((backBtn) => {

    backBtn.addEventListener('click', () => {
        allFullPage[backBtn.id].style.display = 'none'
    })
})

}

openFetaures()

