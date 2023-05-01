// server.js

const express = require('express');
const app = express();
const port = 3000;

app.get('/bots', (req, res) => {
  // code to retrieve bots data
  const botsData = [
    // example data
    { id: 1, name: 'Bot1', class: 'Assault', damage: 100, health: 500 },
    { id: 2, name: 'Bot2', class: 'Support', damage: 50, health: 1000 },
    { id: 3, name: 'Bot3', class: 'Sniper', damage: 200, health: 300 },
    { id: 4, name: 'Bot4', class: 'Assault', damage: 150, health: 400 },
    { id: 5, name: 'Bot5', class: 'Support', damage: 75, health: 800 },
    { id: 6, name: 'Bot6', class: 'Sniper', damage: 250, health: 250 },
    { id: 7, name: 'Bot7', class: 'Assault', damage: 120, health: 450 },
    { id: 8, name: 'Bot8', class: 'Support', damage: 60, health: 900 },
    { id: 9, name: 'Bot9', class: 'Sniper', damage: 180, health: 350 }
  ];
  res.send(botsData);
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}.`);
});
