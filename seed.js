const { db, Task } = require('./server/models');
var testData = [
    {content : 'do the laundry', isComplete : true},
    {content : 'do more laundry'},
    {content : 'Love Thyself'},
    {content : 'hhhhh'}
]

function choice(list) {
    let toReturnIndex = Math.floor(Math.random() * list.length);
    let toReturn = list[ toReturnIndex ];
    return toReturn;
}

const verbs=['do','clean','wash','buy','teach','finish','begin','read','fix','throw out','sell','eat','defeat','call'];
const nouns=['the dishes','the laundry','a book','the dishes','the trash','my phone','the tv','the neighbor','a chair','lunch','the apocalypse','a bird','homework','the door','the school','myself'];
var i = 0;
while (i < 200) {
    testData.push({
        content : `${choice(verbs)} ${choice(nouns)}`
    });
    i++;
}

const seed = async () => {
    await db.sync({force: true})
    console.log('Seeding...')
    await Promise.all( testData.map(task => {
        Task.create(task)
    })).then( console.log('Seeded!') )
}

seed()