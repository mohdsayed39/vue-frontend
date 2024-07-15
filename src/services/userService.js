// src/services/userService.js
export async function fetchUsers() {
    const response = await fetch('http://localhost:3000/api/users');
    return await response.json();
}

export async function createUser(username, password) {
    const response = await fetch('http://localhost:3000/api/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    });
    return await response.json();
}

export async function updateUser(id, username, password) {
    const response = await fetch(`http://localhost:3000/api/users/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    });
    return await response.json();
}

export async function deleteUser(id) {
    const response = await fetch(`http://localhost:3000/api/users/${id}`, {
        method: 'DELETE'
    });
    return await response.json();
}
