const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(bodyParser.json());

const filePath = path.join(__dirname, './dataBase/users.json');
const users = JSON.parse(fs.readFileSync(filePath));
const updateUsers = () => {
    fs.writeFile(filePath, JSON.stringify(users, null, 2), (err) => {
        if (err) return;
    });
};

app.get('/users', (req, res) => res.json(users));

app.get('/users/:id', (req, res)=>{
    const found = users.find(p => p.id === req.params.id);
    if(found){
        return found
    } else {
        throw new Error('ID not found');
    }
})

app.post('/users', (req, res)=> {
    users.push(req.body);
    updateUsers();
    res.json(req.body);
});

app.put('/users/:id', (req, res)=> {
    const user = users.find(p => p.id === req.params.id);
    const userIndex = users.indexOf(user);
    const newUser = {...users, ...req.body};
    users[userIndex] = newUser;
    updateUsers();
    res.json();
});

app.listen(3000, ()=> console.log('Port on 3000...'));

