const bcrypt = require('bcrypt');
const mysql = require('mysql2/promise');

async function fixAllUserPasswords() {
    try {
        // Conectar a la base de datos
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'polo6969',
            database: 'gestion_documental'
        });
        
        // Obtener todos los usuarios
        const [users] = await connection.execute(
            'SELECT id, username FROM users'
        );
        
        console.log('Usuarios encontrados:', users);
        
        // Passwords conocidos para cada usuario
        const userPasswords = {
            'testadmin': 'admin123',
            'superadmin': 'admin123',
            'nuevousuario': 'test123'
        };
        
        for (const user of users) {
            const plainPassword = userPasswords[user.username];
            if (plainPassword) {
                // Generar nuevo hash
                const saltRounds = 10;
                const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
                
                // Actualizar la contraseña
                const [result] = await connection.execute(
                    'UPDATE users SET password = ? WHERE id = ?',
                    [hashedPassword, user.id]
                );
                
                console.log(`✅ Usuario ${user.username} actualizado con contraseña ${plainPassword}`);
                
                // Verificar el hash
                const isValid = await bcrypt.compare(plainPassword, hashedPassword);
                console.log(`   Verificación: ${isValid}`);
            } else {
                console.log(`⚠️  No se encontró contraseña conocida para ${user.username}`);
            }
        }
        
        await connection.end();
        console.log('🎉 Todas las contraseñas han sido actualizadas');
        
    } catch (error) {
        console.error('Error:', error);
    }
}

fixAllUserPasswords();
