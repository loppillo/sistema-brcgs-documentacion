const bcrypt = require('bcrypt');
const mysql = require('mysql2/promise');

async function createTestUser() {
  try {
    // Hashear la contraseña
    const password = '123456';
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Contraseña hasheada:', hashedPassword);

    // Conectar a la base de datos
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'gestion_documental'
    });

    // Verificar si el usuario ya existe
    const [existingUsers] = await connection.execute(
      'SELECT id FROM users WHERE username = ? OR email = ?',
      ['testuser', 'testuser@test.com']
    );

    if (existingUsers.length > 0) {
      console.log('Usuario testuser ya existe, actualizando contraseña...');
      await connection.execute(
        'UPDATE users SET password = ? WHERE username = ?',
        [hashedPassword, 'testuser']
      );
    } else {
      console.log('Creando nuevo usuario testuser...');
      await connection.execute(
        'INSERT INTO users (username, email, password, first_name, last_name, role, is_active, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())',
        ['testuser', 'testuser@test.com', hashedPassword, 'Test', 'User', 'editor', 1]
      );
    }

    console.log('Usuario testuser creado/actualizado exitosamente');
    console.log('Username: testuser');
    console.log('Password: 123456');
    
    await connection.end();
  } catch (error) {
    console.error('Error:', error);
  }
}

createTestUser();
