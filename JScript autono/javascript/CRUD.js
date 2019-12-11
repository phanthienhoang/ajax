document.addEventListener('DOMContentLoaded', function () {
    // everything else we type will go inside this!!  
    const bookContainer = document.querySelector('#tattoo-container');
    const bookForm = document.querySelector('#tattoo-form');
    const URL = `http://localhost:3000/tattoo`;
    fetch(`${URL}`)
        .then(response => response.json())
        .then(bookData => bookData.forEach(function (tattoo) {
            allBooks = bookData
            bookContainer.innerHTML += `
    <tr>
    <th scope="row" id=${tattoo.id}>${tattoo.id}</</th>
    <td>${tattoo.name}</td>
    <td>${tattoo.price}</td>
    <td>${tattoo.description}</td>
    <td><img src="${tattoo.image}" width="100" height="130"></td>
    <td><button data-id="${tattoo.id}" id="edit-${tattoo.id}" data-action="edit">Edit</button>
        <button data-id="${tattoo.id}" id="delete-${tattoo.id}" data-action="delete">Delete</button>
        </td>
    </tr> `
        }))
    bookForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const nameInput = bookForm.querySelector('#name').value;
        const priceInput = bookForm.querySelector('#price').value;
        const imageInput = bookForm.querySelector('#image').value;
        const descInput = bookForm.querySelector('#description').value;
        fetch(`${URL}`, {
            method: 'POST',
            body: JSON.stringify({
                name: nameInput,
                price: priceInput,
                image: imageInput,
                description: descInput
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(tattoo => {
                bookContainer.innerHTML += `
                <tr>
                <th scope="row" id=${tattoo.id}>${tattoo.id}</</th>
                <td>${tattoo.name}</td>
                <td>${tattoo.price}</td>
                <td>${tattoo.description}</td>
                <td><img src="${tattoo.image}" width="100" height="130"></td>
                <td><button data-id="${tattoo.id}" id="edit-${tattoo.id}" data-action="edit">Edit</button>
                    <button data-id="${tattoo.id}" id="delete-${tattoo.id}" data-action="delete">Delete</button>
                    </td>
                </tr> `
            })
    })
    let allBooks = [];
    bookContainer.addEventListener('click', (e) => {
        if (e.target.dataset.action === 'edit') {
            const editButton = document.querySelector(`#edit-${e.target.dataset.id}`)
            editButton.disabled = true

            const bookData = allBooks.find((tattoo) => {
                return tattoo.id == e.target.dataset.id
            })
            e.target.parentElement.innerHTML += `
                <div id='edit-book'>
                    <form id="edit-form">
                    <input required id="edit-name" value="${bookData.name}">
                    <input required id="edit-price" value="${bookData.price}">
                    <input required id="edit-image" value="${bookData.image}">
                    <input required id="edit-description" value="${bookData.description}">
                    <input type="submit" value="Edit Book">
                </div>`
            const editForm = document.querySelector('#edit-form');
            editForm.addEventListener("submit", (e) => {
                e.preventDefault();
                const nameInput = editForm.querySelector("#edit-name").value
                const priceInput = editForm.querySelector("#edit-price").value
                const imageInput = editForm.querySelector("#edit-image").value
                const descInput = editForm.querySelector("#edit-description").value
                fetch(`${URL}/${bookData.id}`, {
                    method: 'PATCH',
                    body: JSON.stringify({
                        name: nameInput,
                        price: priceInput,
                        image: imageInput,
                        description: descInput
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(response => response.json())
                    .then(tattoo => {
                        editedBook.innerHTML = `
                      <tr>
                      <th scope="row" id=${tattoo.id}>${tattoo.id}</</th>
                      <td>${tattoo.name}</td>
                      <td>${tattoo.price}</td>
                      <td>${tattoo.description}</td>
                      <td><img src="${tattoo.image}" width="100" height="130"></td>
                      <td><button data-id="${tattoo.id}" id="edit-${tattoo.id}" data-action="edit">Edit</button>
                          <button data-id="${tattoo.id}" id="delete-${tattoo.id}" data-action="delete">Delete</button>
                          </td>
                      </tr> `
                        editForm.innerHTML = ""
                    })
            }) // end of this event Listener for edit submit
        } else if (e.target.dataset.action === 'delete') {
            const bookData = allBooks.find((tattoo) => {
                return tattoo.id == e.target.dataset.id
            })
            fetch(`${URL}/${bookData.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(response => response.json())
        }
    })
});