fetch("http://localhost:3000/src/App.tsx").then(res => { console.log(res.status); return res.text(); }).then(t => console.log(t.substring(0,300))).catch(console.error);
