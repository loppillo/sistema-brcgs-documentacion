const bcrypt = require('bcrypt');

async function testHash() {
  const password = 'admin123';
  const hash1 = '$2b$10$p//Ac4nwKhVLyXwXbZiQHOyt7/214.RTk.foZSW2y.EuQn/0VN7B.';
  const hash2 = '$2b$10$OhVEp7ui1ARgSg78k8XwnuiF/iQ7yhgn8.FBylLE./qD.TqYlGVv6';
  
  console.log('Contraseña:', password);
  console.log('Hash 1:', hash1);
  console.log('Hash 2:', hash2);
  
  const result1 = await bcrypt.compare(password, hash1);
  const result2 = await bcrypt.compare(password, hash2);
  
  console.log('Comparación con hash 1:', result1);
  console.log('Comparación con hash 2:', result2);
  
  // Crear un hash nuevo para confirmar
  const newHash = await bcrypt.hash(password, 10);
  console.log('Nuevo hash:', newHash);
  const newResult = await bcrypt.compare(password, newHash);
  console.log('Comparación con nuevo hash:', newResult);
}

testHash().catch(console.error);
