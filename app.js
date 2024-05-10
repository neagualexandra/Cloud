document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('createForm');
    const userList = document.getElementById('userList');

    // Function to fetch all users
    const fetchUsers = async () => {
        try {
            const response = await fetch('/api/users');
            const users = await response.json();
            
            // Clear previous user list
            userList.innerHTML = '';

            // Display each user
            users.forEach(user => {
                const userItem = document.createElement('li');
                userItem.classList.add('userItem');
                userItem.innerHTML = `
                    <strong>Name:</strong> ${user.name} <br>
                    <strong>Email:</strong> ${user.mail} <br>
                    <strong>Age:</strong> ${user.age} <br>
                    <strong>Department:</strong> ${user.department} <br>
                    <strong>Created At:</strong> ${new Date(user.createdAt).toLocaleString()} <br>
                    <strong>Updated At:</strong> ${new Date(user.updatedAt).toLocaleString()} <br>
                    <button onclick="deleteUser('${user._id}')">Delete</button>
                `;
                userList.appendChild(userItem);
            });
        } catch (error) {
            console.error('Error fetching users:', error.message);
        }
    };

    // Function to create a new user
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(form);
        const newUser = {
            name: formData.get('name'),
            mail: formData.get('mail'),
            age: formData.get('age'),
            department: formData.get('department')
        };

        try {
            const response = await fetch('/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newUser)
            });
            if (response.ok) {
                form.reset();
                fetchUsers();
            } else {
                const data = await response.json();
                console.error('Error creating user:', data.message);
            }
        } catch (error) {
            console.error('Error creating user:', error.message);
        }
    });

    // Function to delete a user
    window.deleteUser = async (userId) => {
        if (confirm('Are you sure you want to delete this user?')) {
            try {
                const response = await fetch(`/api/users/${userId}`, {
                    method: 'DELETE'
                });
                if (response.ok) {
                    fetchUsers();
                } else {
                    const data = await response.json();
                    console.error('Error deleting user:', data.message);
                }
            } catch (error) {
                console.error('Error deleting user:', error.message);
            }
        }
    };

    // Fetch all users when the page loads
    fetchUsers();
});
