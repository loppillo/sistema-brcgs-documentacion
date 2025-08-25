const bcrypt = require('bcrypt');
const mysql = require('mysql2/promise');

async function updateTestAdminPassword() {
    try {
        // Generar hash para admin123
        const password = 'admin123';
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        
        console.log('Nuevo hash para admin123:', hashedPassword);
        
        // Conectar a la base de datos
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'polo6969',
            database: 'gestion_documental'
        });
        
        // Actualizar la contraseña del usuario testadmin
        const [result] = await connection.execute(
            'UPDATE users SET password = ? WHERE username = ?',
            [hashedPassword, 'testadmin']
        );
        
        console.log('Usuario actualizado:', result.affectedRows, 'filas afectadas');
        
        // Verificar la actualización
        const [rows] = await connection.execute(
            'SELECT id, username, password FROM users WHERE username = ?',
            ['testadmin']
        );
        
        console.log('Usuario verificado:', rows[0]);
        
        // Verificar que el hash funciona
        const isValid = await bcrypt.compare(password, hashedPassword);
        console.log('Verificación del hash:', isValid);
        
        await connection.end();
        
    } catch (error) {
        console.error('Error:', error);
    }
}

updateTestAdminPassword();
