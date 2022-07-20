// Greetings
window.addEventListener('load', () => {
    const dayTime = document.querySelector('.day-time')
    const currentTime = new Date()
    const currentHours = currentTime.getHours()
    if (currentHours >= 5 && currentHours < 12) {
        dayTime.textContent = 'Morning'
    } else if(currentHours >= 12 && currentHours < 18) {
        dayTime.textContent = 'Afternoon'
    } else if(currentHours >= 18 && currentHours < 22) {
        dayTime.textContent = 'Evening'
    } else {
        dayTime.textContent = 'Night'
    }
})

// Book status caterory
const statusCategory = document.querySelectorAll('.tabs div')
function activeCategory() {
    statusCategory.forEach((div) => {
        div.classList.remove('active')
        this.classList.add('active')
    })
}
statusCategory.forEach((div) => {
    div.addEventListener('click', activeCategory)
})

// Let's real work start
// Get book informations
const bookShelf = document.querySelector('.bookShelf');

// getting localStorage library
let myLibrary = JSON.parse(localStorage.getItem("bibliotheque"));
if (!myLibrary) { //if library isn't exist, pass empty array to myLibrary
    myLibrary = []
}

function Book(title, author, subject, cover, 
    publication, pages, readingStatus, resume) {
    this.title = title
    this.author = author
    this.subject = subject
    this.cover = cover
    this.publication = publication
    this.pages = pages
    this.readingStatus = readingStatus
    this.resume = resume
}

const form = document.querySelector('.fill form');

const uploadInput = document.querySelector('.uploadcover');
const fileName = document.querySelector('.file-name');
let file, coverUrl;
uploadInput.addEventListener('change', function() {
    file = this.files[0];

    let fileType = file.type; //getting selected file type
    let validExtensions = ["image/jpeg", "image/jpg", "image/png"]; //adding some valid image extensions in array

    if(validExtensions.includes(fileType)) { //if user selected file is an image file
        fileName.textContent = file.name
        let fileReader = new FileReader();
        fileReader.onload = () => {
            let fileURL = fileReader.result;
            coverUrl = fileURL // Get the image link
        }
        fileReader.readAsDataURL(file)
    } else {
        fileName.textContent = 'This is not an Image File!'
        file = {}
    }
})

form.addEventListener('submit', addBookToLibrary);

function addBookToLibrary(event) {
    event.preventDefault()
    // Collect infos from form inputs
    const myFormData = new FormData(event.target)
    // An object which contains form infos
    const formDataObj = {}
    myFormData.forEach((value, key) => (formDataObj[key] = value))

    // create a book object form constructor
    const book = new Book(formDataObj.title, 
        formDataObj.author, formDataObj.genre, 
        coverUrl, formDataObj.published, 
        formDataObj.pages, formDataObj.status, 
        formDataObj.summary)
    // Add the new book to the library array
    if (!myLibrary) { //if library isn't exist, pass empty array to myLibrary
        myLibrary = []
    }
    myLibrary.push(book)
    // console.log(myLibrary)
    localStorage.setItem("bibliotheque", JSON.stringify(myLibrary));
    showShelf()
    fill()
    form.reset()
    file = {}
    fileName.textContent = ''
}

// let collapse = JSON.parse(localStorage.getItem('bibliotheque'));

// Save into the local storage

// Show books regarding his reading status
// Show book
function showShelf() {
    // console.log(collapse)
    let livres = `
        <div class="book sapiens">
            <div class="cover">
                <img src="Img/cover/sapiens.jpg" alt="">
            </div>
            <div class="details">
                <p class="category">History</p>
                <p class="title">Sapiens: A Brief History of Humankind</p>
                <!-- <span class="pages">&#8226; 443 pages</span>  -->
                <p class="author">By <span class="author-name">Yuval Noah Harari</span></p>
                <div class="settings">
                    <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
                    <ul class="task-menu">
                        <li onclick="showAbout()"><i class="uil uil-info-circle"></i>Infos</li>
                        <li><i class="uil uil-pen"></i> Edit</li>
                        <li onclick="popUp()"><i class="uil uil-trash"></i>Delete</li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="book ego">
            <div class="cover">
                <img src="Img/cover/ego.jpg" alt="">
            </div>
            <div class="details">
                <p class="category">Psychology</p>
                <p class="title">Ego is the enemy</p>
                <!-- <span class="pages">&#8226; 443 pages</span>  -->
                <p class="author">By <span class="author-name">Ryan Holiday</span></p>
                <div class="settings">
                    <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
                    <ul class="task-menu">
                        <li onclick="showAbout()"><i class="uil uil-info-circle"></i>Infos</li>
                        <li><i class="uil uil-pen"></i> Edit</li>
                        <li onclick="popUp()"><i class="uil uil-trash"></i>Delete</li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="book code">
            <div class="cover">
                <img src="Img/cover/thinklikeaprogrammer.jpg" alt="">
            </div>
            <div class="details">
                <p class="category">Programming</p>
                <p class="title">Think Like a Programmer</p>
                <!-- <span class="pages">&#8226; 443 pages</span>  -->
                <p class="author">By <span class="author-name">V. Anton Spraul</span></p>
                <div class="settings">
                    <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
                    <ul class="task-menu">
                        <li onclick="showAbout()"><i class="uil uil-info-circle"></i>Infos</li>
                        <li><i class="uil uil-pen"></i> Edit</li>
                        <li onclick="popUp()"><i class="uil uil-trash"></i>Delete</li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="book hurt">
            <div class="cover">
                <img src="Img/cover/canthurtme.jpg" alt="">
            </div>
            <div class="details">
                <p class="category">Biography</p>
                <p class="title">Can't hurt me</p>
                <!-- <span class="pages">&#8226; 443 pages</span>  -->
                <p class="author">By <span class="author-name">David Goggins</span></p>
                <div class="settings">
                    <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
                    <ul class="task-menu">
                        <li onclick="showAbout()"><i class="uil uil-info-circle"></i>Infos</li>
                        <li><i class="uil uil-pen"></i> Edit</li>
                        <li onclick="popUp()"><i class="uil uil-trash"></i>Delete</li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="book sleep">
            <div class="cover">
                <img src="Img/cover/sleep.jpg" alt="">
            </div>
            <div class="details">
                <p class="category">Science</p>
                <p class="title">Why We Sleep</p>
                <!-- <span class="pages">&#8226; 443 pages</span>  -->
                <p class="author">By <span class="author-name">Matthew Walker</span></p>
                <div class="settings">
                    <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
                    <ul class="task-menu">
                        <li onclick="showAbout()"><i class="uil uil-info-circle"></i>Infos</li>
                        <li><i class="uil uil-pen"></i> Edit</li>
                        <li onclick="popUp()"><i class="uil uil-trash"></i>Delete</li>
                    </ul>
                </div>
            </div>
        </div>
    `
    for (const item of myLibrary) {
        livres += `
        <div class="book">
            <div class="cover">
                <img src=${item.cover} alt="">
            </div>
            <div class="details">
                <p class="category">${item.subject}</p>
                <p class="title">${item.title}</p>
                <p class="author">By <span class="author-name">${item.author}</span></p>
                <div class="settings">
                    <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
                    <ul class="task-menu">
                        <li onclick="showAbout()"><i class="uil uil-info-circle"></i>Infos</li>
                        <li><i class="uil uil-pen"></i> Edit</li>
                        <li onclick="popUp()"><i class="uil uil-trash"></i>Delete</li>
                    </ul>
                </div>
            </div>
        </div>
        `
    }
    bookShelf.innerHTML = livres
}

showShelf()

// Show dots menu
function showMenu(selectedBook) {
    // getting book menu
    selectedBook.parentElement.classList.add('show')
    document.addEventListener('click', (e) => {
        if(e.target.tagName != 'I'|| e.target != selectedBook) {
            selectedBook.parentElement.classList.remove('show')
        }
    })
}

// dots.forEach((dot) => {
//     dot.addEventListener('click', showMenu)
// })

// Show delete pop up
function popUp() {
    const popup = document.querySelector('.pop-container')
    popup.classList.toggle('active');
    document.addEventListener('click', (e) => {
        if (e.target == popup) {
            popup.classList.remove('active');
        }
    })
}

// Show fill form
function fill() {
    const fillForm = document.querySelector('.fill-container')
    fillForm.classList.toggle('active')
}

// Show infos - about section
function showAbout() {
    const about = document.querySelector('.about')
    about.classList.toggle('show')
}

// Plot read more
const plot = document.querySelector('.moreTxt')
const moreDot = document.querySelector('.more')
const crech = document.querySelector('.crech')
function more() {
    plot.style.display = 'block'
    moreDot.style.display = 'none'
    crech.style.overflow = 'auto';
    crech.classList.add = 'plus';
}

function less() {
    plot.style.display = 'none'
    moreDot.style.display = 'inline'
    crech.classList.remove = 'plus';
}