
// const yargs = require('yargs')
// const { addTask, listTask, deleteTask, updateTask} =  require('./todo')


// yargs.command({
//     command: 'add',
//     describe: 'Add Todo Task to file ...',
//     builder: {
//         title: {
//             describe: 'Title for todo task',
//             alias: 't',
//             demandOption: true,
//             type: 'string',

//         },
//         description: {
//             describe: 'Description for the task',
//             alias: 'd',
//             demandOption: true,
//             type: 'string',
//         }
//     },
//     handler: ({title,description}) => {
//         addTask(title,description)
//     }

// })


// yargs.command({
//     command: 'delete',
//     describe: 'Delete Todo Task to file ...',
//     builder: {
//         title: {
//             describe: 'Title for todo task',
//             alias: 't',
//             demandOption: true,
//             type: 'string',

//         },
//     },
//     handler: ({title}) => {
//         deleteTask(title)
//     }

// })



// yargs.command({
//     command: 'list',
//     describe: 'Add Todo Task to file ...',
   
//     handler: () => {
//         listTask()
//     }

// })

// yargs.command({
//     command:'update',
//     describe:'Update Todo Task to file ...',
//     builder: {
//         title: {
//             describe: 'Title for Update todo task',
//             alias: 't',
//             demandOption: true,
//             type: 'string',
//         },
//         description: {
//             describe: 'Description for Update todo task',
//             alias: 'd',
//             demandOption: true,
//             type: 'string',
//         },
//     },
//     handler:({title,description})=>{
//         updateTask(title,description)
//     }
// })



// yargs.parse()   


const express = require('express')
const path = require('path')
const app = express()
const hbs = require('hbs')
const request = require('request')

const viewsFolder = path.join(__dirname, '../templates/views')
app.set('views', viewsFolder)


const partialFolder = path.join(__dirname, '../templates/partials')
hbs.registerPartials(partialFolder)

app.set('view engine','hbs')

const newPathPuplicFolder = path.join(__dirname,'../public/')

app.use(express.static(newPathPuplicFolder))

//console.log(__dirname)
//console.log(__filename)

app.get('/',(req,res)=>{

    res.render('index',{
        title : "This is about page",
        createdBy : "Maaz Uddin"
    })
})
app.get('/about', (requ, res) => {
    res.render('about')
})

app.get('/', (requ, res) => {
    res.send('<h1>Welcom to Express world</h1>')
})


app.get('/helloworld', (requ, res) => {
    res.send({
        name: "Aamir",
        message: 'Hello world route',
        class: 'Node/Express/mongo'
    })
})


app.get('/search',(req,res)=>{
    const {word} = req.query
    if(!word){ return res.send({error:"word not provided!"})}
    const options =  {
        url:'https://od-api.oxforddictionaries.com:443/api/v2/entries/en-gb/'+word,
        headers: {
            "Accept": "application/json",
            "app_id": "a8e1104f",
            "app_key": "4a122c1abf684ec4447dad5c0f90c2ea"
        }, 
        json: true
    }
    const callback = (error,response) => {
        console.log("error :", error)
        console.log("Status Code: ",response && response.statusCode)
        const definition = (response) && (response.statusCode === 200)
            ? response.body.results[0].lexicalEntries[0].entries[0].senses[0].definitions.toString()
            :  "Sorry word not found in dicitionary"
        const data = {
            word,
            error,
            definition
        }

        return res.send({data,})

    }
    request(options,callback)   
})



app.get('*', (requ, res) => {
    res.send('no data')
})

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`listening to port ${port} done !!`)
})
