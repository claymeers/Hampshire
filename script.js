// Greetings
window.addEventListener('load', () => {
    // Day time
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
    
    // Username
    const userName = document.querySelector('.username')
    let yourName = localStorage.getItem("nom");
    if (!yourName) {
        yourName = prompt("What's your name?", '');
        localStorage.setItem("nom", yourName);
    }
    userName.textContent = yourName
})



// Book status caterory aka filters
const statusCategory = document.querySelectorAll('.tabs div')
const tabs = document.querySelector('.tabs')
statusCategory.forEach((div) => {
    div.addEventListener('click', () => {
        tabs.querySelector('div.active').classList.remove('active')
        div.classList.add('active')
        showShelf(div.id)
    })
})

// Let's real work start
// Get book informations
const bookShelf = document.querySelector('.bookShelf');
let state = 'Want to read'

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

    state = book.readingStatus
    // Add the new book to the library array
    if(!isEditedBook) {
        myLibrary.push(book)
        isEditedTask = false;
    } else {
        myLibrary[editId] = book
    }
    localStorage.setItem("bibliotheque", JSON.stringify(myLibrary));
    showShelf(state)
    fill()
    form.reset()
    file = {}
    fileName.textContent = ''
}

// Show book
function showShelf(filters) {
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
    myLibrary.forEach((book, id) => {
        if (book.readingStatus == filters) {
            livres += `
            <div class="book">
                <div class="cover">
                    <img src=${book.cover} alt="">
                </div>
                <div class="details">
                    <p class="category">${book.subject}</p>
                    <p class="title">${book.title}</p>
                    <p class="author">By <span class="author-name">${book.author}</span></p>
                    <div class="settings">
                        <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
                        <ul class="task-menu">
                            <li onclick="setAboutData(${id})"><i class="uil uil-info-circle"></i>Infos</li>
                            <li onclick="editBook(${id})"><i class="uil uil-pen"></i> Edit</li>
                            <li onclick="wantToDeleteBook(${id})"><i class="uil uil-trash"></i>Delete</li>
                        </ul>
                    </div>
                </div>
            </div>
            `  
        }        
    });
    bookShelf.innerHTML = livres || `<span>You don't have any task here</span>`;
}

showShelf(state)

let selectedBook;

// Delete book
function wantToDeleteBook(selectedBookId) {
    popUp() 
    selectedBook = selectedBookId
    state = myLibrary[selectedBook].readingStatus
}

// Really Delete book
function deleteBook() {
    myLibrary.splice(selectedBook, 1);
    localStorage.setItem("bibliotheque", JSON.stringify(myLibrary));
    showShelf(state)
    popUp() 
}

// Edit a book
let editId,
isEditedBook = false;

// update the form
const titleInput = document.getElementById('title')
const authorInput = document.getElementById('author')
const subjectInput = document.getElementById('genre')
const publicationInput = document.getElementById('published')
const pagesInput = document.getElementById('pages')
const statusInput = document.getElementById('status')
const summaryInput = document.getElementById('summary')

function editBook(id) {
    isEditedBook = true
    editId = id
    titleInput.value = myLibrary[id].title
    authorInput.value = myLibrary[id].author
    subjectInput.value = myLibrary[id].subject
    publicationInput.value = myLibrary[id].publication
    pagesInput.value = myLibrary[id].pages 
    statusInput.value = myLibrary[id].readingStatus
    summaryInput.value = myLibrary[id].resume
    fill()
}

// Show dots menu
function showMenu(selectedBookDots) {
    // getting book menu
    selectedBookDots.parentElement.classList.add('show')
    document.addEventListener('click', (e) => {
        if(e.target.tagName != 'I'|| e.target != selectedBookDots) {
            selectedBookDots.parentElement.classList.remove('show')
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
function setAboutData(id) {
    const bookCover = document.querySelector('.bookCover img')
    const bookTitle = document.querySelector('.bookTitle')
    const bookAuthor = document.querySelector('.bookAuthor')
    const bookPages = document.querySelector('.stats .pages .infos')
    const bookSubject = document.querySelector('.stats .subject .infos')
    const bookPublished = document.querySelector('.stats .published .infos')
    const bookSummary = document.querySelector('.plot .crech')

    bookCover.src = myLibrary[id].cover
    bookTitle.textContent =  myLibrary[id].title
    bookAuthor.textContent = myLibrary[id].author
    bookPages.textContent = myLibrary[id].pages
    bookSubject.textContent = myLibrary[id].subject.toLowerCase();
    bookPublished.textContent = myLibrary[id].publication
    // bookSummary.textContent = myLibrary[id].resume
    shrink(myLibrary[id].resume)

    showAbout()
}

function showAbout() {
    const about = document.querySelector('.about')
    about.classList.toggle('show')
}

// Plot read more
function shrink(text) {
    const bookSummary = document.querySelector('.plot .crech')
    if (text.length > 455) {
        bookSummary.innerHTML = `
            ${text.substring(0, 450)} <span class="dots more" onclick="more()">...more</span>
            <span class="moreTxt">${text.substring(450, text.length)}<span class="dots less" onclick="less()">...less</span></span>
        `
    } else {
        bookSummary.textContent = text
    }
}

function more() {
    const crech = document.querySelector('.crech')
    const plot = crech.querySelector('.moreTxt')
    const moreDot = crech.querySelector('.more')

    crech.style.overflow = 'auto';
    plot.style.display = 'block'
    moreDot.style.display = 'none'
}

function less() {
    const crech = document.querySelector('.crech')
    const plot = crech.querySelector('.moreTxt')
    const moreDot = crech.querySelector('.more')

    plot.style.display = 'none'
    moreDot.style.display = 'inline'
}