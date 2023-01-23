import axios from 'axios';

type Animal = {
  id: number;
  picture: string;
  name: string;
}

const allAnimalsWrapper = document.querySelector('.js-all-animals');

axios.get<Animal[]>('http://localhost:3004/animals').then(({ data }) => {
    const animals = data;
    animals.map((animal) => {
        const cardContainer = document.createElement('div');
        const cardImage = document.createElement('img');
        const cardInfo = document.createElement('div');
            const infoVisible = document.createElement('div');
            const infoInvisible = document.createElement('div');
            const infoInvisible2 = document.createElement('div');

        cardContainer.classList.add('card__container');
        cardContainer.appendChild(cardImage);
        cardContainer.appendChild(cardInfo);

        cardImage.classList.add('card__image');
        cardImage.src = animal.picture;

        cardInfo.classList.add('card__info');
        cardInfo.appendChild(infoVisible);
        cardInfo.appendChild(infoInvisible);
        cardInfo.appendChild(infoInvisible2);

        infoVisible.classList.add('info__visible');
        infoVisible.innerHTML = `
        <h3 class="animal__name">${animal.name}</h3>
        <div class ="buttons-visible">
            <button type="button" class="btn btn-secondary show__add">Add Animal</button>
            <button type="button" class="btn btn-secondary show__edit">Edit Animal</button>
            <button type="button" class="btn btn-secondary delete__btn">Delete Animal</button>
        </div>
        `
        infoInvisible.classList.add('info__invisible');
        infoInvisible.innerHTML = `
        <form class="form" name="inputAdd">
            <label class="addNewTitle">New Animal
                <input class="addNewAnimalName" type='text' placeholder='animal name' name="name" value>
            </label>
            <label class="addNewTitle">New Animal
                <input class="addNewAnimalPhoto" type='text' placeholder="link to animal's photo" name="name" value>
            </label>
            <button type="submit" class="btn btn-secondary add__btn">Add Animal</button>
        </form>
        `
        infoInvisible2.classList.add('info__invisible2');
        infoInvisible2.innerHTML = `
        <form class="form2" name="inputEdit">
            <label class="editTitle">Edit animal's name
                <input class="editAnimalName" type="text" placeholder="change animal's name" name="edit" value>
            </label>
            <button type="button" class="btn btn-secondary edit__btn">Edit Animal</button>
        </form>
        `
        allAnimalsWrapper.appendChild(cardContainer)


        const showAddButton = infoVisible.querySelector('.show__add');
        showAddButton.addEventListener('click', () => {
            infoInvisible.style.display = 'block';
        })

        const showEditButton = infoVisible.querySelector('.show__edit');
        showEditButton.addEventListener('click', () => {
            infoInvisible2.style.display = 'block';
        })


        const inputName = document.querySelector<HTMLInputElement>('.addNewAnimalName');
        const inputPhoto = document.querySelector<HTMLInputElement>('.addNewAnimalPhoto');
        const editName = document.querySelector<HTMLInputElement>('.editAnimalName');


        const addButton = infoInvisible.querySelector('.add__btn');
        addButton.addEventListener('click', () => {
            axios.post<Animal>(`http://localhost:3004/animals`, {
                picture: inputPhoto.value,
                name: inputName.value,
            }).then(({ data }) => {
                cardContainer.innerHTML = JSON.stringify(data);
            })
        }) 
        
        const editButton = infoInvisible2.querySelector('.edit__btn');
        editButton.addEventListener('click', () => {
            axios.patch<Animal>(`http://localhost:3004/animals/${animal.id}`, {
                name: editName.value,
            }).then(({ data }) => {
                cardContainer.innerHTML = JSON.stringify(data);
            })
        })

        const deleteButton = infoVisible.querySelector('.delete__btn');
        deleteButton.addEventListener('click', () => {
            axios.delete<Animal>(`http://localhost:3004/animals/${animal.id}`).then(({ data }) => {
                cardContainer.innerHTML = JSON.stringify(data);
            })
        })


    })
});





























// Bugs
// 1) "Add Animal" ar visām input vērtībām strādā tikai pirmajai kariņai (pārējām atgriež tukšas kartiņas)
// 2) "Edit Animal" tas pats - strādāt tikai uz pirmo kartiņu
// 3) Lai nostrādātu "add" vai "edit" jāpārlādē lapa (citādi rāda objektu) - risinājums:
//      Ar map jātaisa jaunas kartiņas pēc axios.put.. axios.patch... 

