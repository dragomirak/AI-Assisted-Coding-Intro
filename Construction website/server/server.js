const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'submissions.json');
const STATIC_DIR = path.join(__dirname, '..');

app.use(cors());
app.use(express.json());
app.use(express.static(STATIC_DIR));

async function appendSubmission(sub){
  try{
    const exists = await fs.stat(DATA_FILE).then(()=>true).catch(()=>false);
    if(!exists){
      await fs.writeFile(DATA_FILE, JSON.stringify([sub], null, 2));
      return;
    }
    const raw = await fs.readFile(DATA_FILE, 'utf8');
    const arr = JSON.parse(raw || '[]');
    arr.push(sub);
    await fs.writeFile(DATA_FILE, JSON.stringify(arr, null, 2));
  }catch(err){
    console.error('Failed to write submission', err);
    throw err;
  }
}

app.post('/api/contact', async (req, res) => {
  try{
    const {name, phone, email, message} = req.body || {};
    if(!name || (!phone && !email)){
      return res.status(400).json({success:false, error: 'Моля попълнете име и телефон или имейл.'});
    }
    const entry = {id: Date.now(), name, phone, email, message, receivedAt: (new Date()).toISOString()};
    await appendSubmission(entry);
    console.log('New contact submission:', entry);
    res.json({success:true});
  }catch(err){
    console.error(err);
    res.status(500).json({success:false, error:'Вътрешна грешка на сървъра.'});
  }
});

app.listen(PORT, ()=>{
  console.log(`Server started on http://localhost:${PORT}`);
  console.log(`Serving static site from ${STATIC_DIR}`);
});
