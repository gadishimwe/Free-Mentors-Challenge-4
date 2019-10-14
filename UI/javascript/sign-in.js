const signIn = async (e) => {
  e.preventDefault();
  const email = document.querySelector('.email').value;
  const password = document.querySelector('.password').value;
  const spinner = document.querySelector('.spinner');
  spinner.classList.remove('hide');

  const response = await fetch('http://localhost:3000/api/v2/auth/signin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });
  const json = await response.json();
  spinner.classList.add('hide');
  if (json.status !== 200) {
    document.getElementById('errors').innerHTML = json.error;
  }
  if (json.status === 200 && json.data.ismentor) {
    window.location.href = 'mentor-homepage.html';
    return;
  }
  if (json.status === 200 && json.data.isadmin) {
    window.location.href = 'admin.html';
    return;
  }
  if (json.status === 200) {
    window.location.href = 'user-homepage.html';
  }
};
document.getElementById('sign-in').addEventListener('submit', signIn);
