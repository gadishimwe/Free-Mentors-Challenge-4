const signUp = async (e) => {
  e.preventDefault();
  const firstName = document.getElementById('firstName').value;
  const lastName = document.getElementById('lastName').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const passwordConfirm = document.getElementById('passwordConfirm').value;
  const spinner = document.querySelector('.spinner');
  document.getElementById('errors').innerHTML = '';
  spinner.classList.remove('hide');

  const response = await fetch('https://gad-free-mentors-v2.herokuapp.com/api/v2/auth/signup', {
    method: 'POST',
    headers: {
      'Accept': 'application/json, text/plain',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      firstName,
      lastName,
      email,
      password,
      passwordConfirm,
    }),
  });
  const json = await response.json();
  spinner.classList.add('hide');
  if (json.status !== 201 || json.status === 422) {
    const fields = document.getElementsByClassName('fields');
    const input = document.getElementById(`${json.path}`);
    [...fields].forEach((field) => {
      field.style.borderBottom = '0.1px solid #0067fc';
    });
    input.style.borderBottom = '2px solid red';
    document.getElementById('errors').innerHTML = json.error;
  }
  if (json.status === 201) {
    window.location.href = 'user-homepage.html';
  }
};
document.getElementById('sign-up').addEventListener('submit', signUp);
