/*
Створіть сайт з коментарями. Коментарі тут : https://jsonplaceholder.typicode.com/
Сайт має виглядати так : https://kondrashov.online/images/screens/120.png
На сторінку виводити по 10 коментарів, у низу сторінки зробити поле пагінації (перемикання сторінок) при перемиканні
сторінок показувати нові коментарі. 
з коментарів виводити : 
"id": 1,
"name"
"email"
"body":
<!--
*/

let flag = true
const url = 'https://jsonplaceholder.typicode.com/comments'




let counter = 0;
let count = 0

let currentComents = 10;



export async function getData() {

	
	const req =  await fetch(url)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
   
		mapComments(data)
		mapBtn(data)
		document.querySelector('.btn').classList.add('hide')
  })
	.catch((error)=>{
		console.error('Ошибка:', error);
	})

}




function mapComments(data) {

	counter = data.length

	let start = count * 10
	const end = start + 10

	const visiblecomment = data.slice(start, end)


	showComments(visiblecomment)


}

function showComments(obj) {

	const container = document.querySelector('.container__coments')
	container.innerHTML = ''
	obj.forEach(el => {
		const comment = document.createElement('div')
		comment.classList.add('card')

		comment.insertAdjacentHTML('beforeend',
			`
			<div class ="name">Name: ${el.name}<div>
			<div class ="id">Id: ${el.id}<div>
			<div class ="email">Email: ${el.email}<div>
			<div class ="comment">Comment: ${el.body}<div>
			`
		)
		container.appendChild(comment)
	});


}




function mapBtn(data) {

	const counterButton = counter / currentComents
	const containerBtn = document.querySelector('.btn_container')
	let activeBtn = null;

	if (containerBtn.childElementCount === 0) {
		for (let i = 1; i < counterButton; i++) {
			const btn = document.createElement('button')
			btn.classList.add('pagination__btn')
			btn.innerHTML = i
			containerBtn.appendChild(btn)

			btn.addEventListener('click', () => {

				if (btn.innerHTML !== count) {
					btn.classList.add('btn__active')

				}
				if (activeBtn && activeBtn !== btn) {

					activeBtn.classList.remove('btn__active');
				}
				activeBtn = btn;
				count = parseInt(btn.innerHTML)
				mapComments(data)
				
			})

		}
	}

	showBtn(counterButton)

}


function showBtn(counterButton) {

	const container = document.querySelector('.btn_container')
	const pagination = container.querySelectorAll('button')

	let currentPage = 1;
	const visiblePages = 7;

	const ellipsis = document.createElement('span');
	if (!document.querySelector('span')) {
		ellipsis.innerHTML = '...';
	}
	for (let i = visiblePages; i < counterButton - 2; i++) {

		pagination[i].classList.add('hide')
	}

	for (let i = 0; i < pagination.length; i++) {
		if (i < visiblePages || i == pagination.length - 1) {
			pagination[i].classList.remove('hide')
		} else if (i === visiblePages) {
			container.insertBefore(ellipsis, pagination[i])
		}

		pagination[i].addEventListener('click', (e) => {
			e.preventDefault();
			let page = parseInt(e.target.innerHTML)

			if (page != currentPage) {

				for (let i = 0; i < counterButton - 2; i++) {
					if (i < page - 4 || i > page + 2) {
						pagination[i].classList.add('hide')
					} else {
						pagination[i].classList.remove('hide')
					}
					if (i === page + 3) {
						pagination[i + 3].insertAdjacentElement('beforebegin', ellipsis);
					}
					if (page > 45) {
						ellipsis.classList.add('hide')
					} else {
						ellipsis.classList.remove('hide')
						pagination[i + 1].insertAdjacentElement('beforebegin', ellipsis);
					}
				}
			}
			currentPage = page;
		}
		)
	}
}