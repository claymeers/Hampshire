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

// Show dots menu
const dots = document.querySelectorAll('.settings .uil-ellipsis-h')

function showMenu() {
    dots.forEach((dot) => {
        dot.parentElement.classList.remove('show')
        this.parentElement.classList.add('show')
        document.addEventListener('click', (e) => {
            if(e.target.tagName != 'I') {
                dot.parentElement.classList.remove('show')
            }
        })
    })
}

dots.forEach((dot) => {
    dot.addEventListener('click', showMenu)
})

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

// Let's real work start
// Get book informations
const bookInfos = {
    id: 5,
    title: 'The Lean Startup',
    author: 'Eric Ries',
    subject: 'Entrepreneurship',
    cover: 'Img/cover/leanstartup.jpg',

    publication: '2011',
    pages: '336',
    readingStatus: 'Want to read',
    resume: `Most startups fail. But many of those failures are preventable. The Lean Startup is a new approach being adopted across the globe, changing the way companies are built and new products are launched. Eric Ries defines a startup as an organization dedicated to creating something new under conditions of extreme uncertainty. This is just as true for one person in a garage or a group of seasoned professionals in a Fortune 500 boardroom. What they have in common is a mission to penetrate that fog of uncertainty to discover a successful path to a sustainable business. The Lean Startup approach fosters companies that are both more capital efficient and that leverage human creativity more effectively. Inspired by lessons from lean manufacturing, it relies on "validated learning," rapid scientific experimentation, as well as a number of counter-intuitive practices that shorten product development cycles, measure actual progress without resorting to vanity metrics, and learn what customers really want. It enables a company to shift directions with agility, altering plans inch by inch, minute by minute. Rather than wasting time creating elaborate business plans, The Lean Startup offers entrepreneurs - in companies of all sizes - a way to test their vision continuously, to adapt and adjust before it's too late. Ries provides a scientific approach to creating and managing successful startups in a age when companies need to innovate more than ever.`
}

// a book template
`
<div class="book">
    <div class="cover">
        <img src=${bookInfos.cover} alt="">
    </div>
    <div class="details">
        <p class="category">=${bookInfos.subject}</p>
        <p class="title">=${bookInfos.title}</p>
        <p class="author">By <span class="author-name">=${bookInfos.author}</span></p>
        <div class="settings">
            <i class="uil uil-ellipsis-h"></i>
            <ul class="task-menu">
                <li onclick="showAbout()"><i class="uil uil-info-circle"></i>Infos</li>
                <li><i class="uil uil-pen"></i> Edit</li>
                <li onclick="popUp()"><i class="uil uil-trash"></i>Delete</li>
            </ul>
        </div>
    </div>
</div>
`

function Book(title, author, subject, cover, publication, pages, readingStatus, resume) {
    this.title = title
    this.author = author
    this.subject = subject
    this.cover = cover
    this.publication = publication
    this.pages = pages
    this.readingStatus = readingStatus
    this.resume = resume
}

const bokk = new Book('Sapiens', 'Yuval', 'sapiens.jpg', '2011', '143', 'finished', 'So good!')
console.log(bokk.title) //'Sapiens'

// Save into the local storage

// Show books regarding his reading status