const users = [];

export const registerUser = (username, password) => {
  const userExists = users.some(user => user.username === username);
  if (userExists) {
    throw new Error('User already exists');
  }

  const newUser = { username, password };
  users.push(newUser);
  return { success: true, message: 'User registered successfully' };
};

export const loginUser = (username, password) => {
  const user = users.find(user => user.username === username && user.password === password);
  if (!user) {
    throw new Error('Invalid username or password');
  }

  // Simulate JWT token
  const token = 'fake-jwt-token';
  return { token, message: 'Login successful' };
};
