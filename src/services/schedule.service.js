const express = require('express');
const path = require('path');
const app = express();
const port = 3002;

app.use(express.static(path.join(__dirname, 'public')));

const availableSlots = [
  '08:00', '08:30', '09:00', '09:30',
  '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '13:00', '13:30',
  '14:00', '14:30', '15:00', '15:30',
  '16:00', '16:30', '17:00', '17:30',
  '18:00', '18:30', '19:00', '19:30',
];
// Dados do profissional
const professionalInfo = {
  name: "Larissa Mendes",
  profession: "PSICÓLOGA",
  location: "São Paulo",
  numStars: 4,
  numReviews: 20,
  price: 160,
  currency: "R$",
  minutes: 50,
  userText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  // Adicione os dados da foto conforme necessário
};

// Middleware para permitir CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Permitir requisições de qualquer origem
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Rota para obter informações do profissional
app.get('/api/professional', (req, res) => {
  res.json({
    name: professionalInfo.name,
    profession: professionalInfo.profession,
    description: professionalInfo.userText,
    price:professionalInfo.price,
    location:professionalInfo.location,
    numReviews:professionalInfo.numReviews,
    bio:professionalInfo.userText,
    time:professionalInfo.minutes,
    photo: "professional-image.jpg"
  });
});

app.get('/available-slots', (req, res) => {
  res.json(availableSlots);
});

app.get('/pessoa', (req, res) => {
  res.json(availableSlots);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
