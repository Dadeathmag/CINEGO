import initDB from '../db/db.js';

export const signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const db = await initDB();

    await db.run(
      'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
      [name, email, password, role || 'user']
    );

    res.status(201).json({ message: 'User signup done successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const db = await initDB();
    const user = await db.get('SELECT * FROM users WHERE email = ?', [email]);

    if (!user) return res.status(404).json({ error: 'User not found' });
    if (user.password !== password) return res.status(401).json({ error: 'Invalid password' });

    
    res.json({
      message: 'Login successful',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const logout = async (req, res) => {
  try {
    // In a real application, you would invalidate the JWT token here
    // For now, we'll just send a success response
    res.json({ message: 'Logout successful' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};