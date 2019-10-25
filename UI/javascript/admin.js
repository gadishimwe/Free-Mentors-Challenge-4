const url = 'https://gad-free-mentors.herokuapp.com/api/v2';

const loadData = async () => {
  const getUsers = async () => {
    const response = await fetch(`${url}/users`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: `${localStorage.getItem('token')}`,
      },
    });
    const json = await response.json();
    return json;
  };

  let json = await getUsers();
  if (json.status === 401) {
    window.location.href = 'sign-in.html';
    return;
  }

  document.getElementById('list-of').innerHTML = 'all users';
  document.getElementById('all-users-sessions').style = 'background: #0067fc;';
  document.getElementById('all-users-sessions').childNodes[1].style = 'color: white';

  const showNumbers = async () => {
    json = await getUsers();
    const regularUsers = json.data.filter((user) => user.ismentor === false);
    const regularsNumber = regularUsers.length;
    document.getElementById('regulars-number').innerHTML = regularsNumber;

    const mentorUsers = json.data.filter((user) => user.ismentor === true);
    const mentorsNumber = mentorUsers.length;
    document.getElementById('mentors-number').innerHTML = mentorsNumber;

    document.getElementById('all-number').innerHTML = json.data.length;
  };
  showNumbers();

  const showList = (userType, buttonFunc) => {
    let listUsers = '';
    let users = json.data.filter((user) => user.ismentor === userType);
    if (userType === undefined) {
      users = json.data;
    }
    users.forEach((user) => {
      if (userType === undefined) {
        buttonFunc = (user.ismentor === true) ? 'Remove mentor' : 'Add mentor';
      }
      listUsers += `
    <div class="user">
      <a href="#" class="user-profile">
          <div class="profile-photo"></div>
          <div class="names">
              <p><b>${user.firstname} ${user.lastname}</b></p>
              <p class="email"><i>${user.email}</i></p>
          </div>
      </a>
      <div class="make-mentor">
          <div class="to-be-shown"></div>
          <button class="change">${buttonFunc}</buttom>
      </div> 
    </div>
    `;
    });
    document.querySelector('.list-container').innerHTML = listUsers;
    if (userType === undefined) {
      const button = document.querySelectorAll('.change');
      users.forEach((user, index) => {
        const color = (user.ismentor === true) ? 'orange;' : '#0067fc;';
        button[index].style = `background: ${color};`;
      });
    }

    const changed = (message, index) => {
      const hideThis = document.querySelectorAll('.change');
      const showThis = document.querySelectorAll('.to-be-shown');

      showThis[index].innerHTML = message;
      showThis[index].classList.add('show');
      hideThis[index].classList.add('hide');
      showNumbers();
    };

    const changeToMentor = async (userId, who, index) => {
      const response = await fetch(`${url}/${who}/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          authorization: `${localStorage.getItem('token')}`,
        },
      });
      const json = await response.json();

      if (json.status === 401) {
        window.location.href = 'sign-in.html';
        return;
      }
      changed(json.data.message, index);
    };

    const changeButtons = document.querySelectorAll('.change');
    let who;
    changeButtons.forEach((button, index) => {
      button.addEventListener('click', () => {
        if (users[index].ismentor) {
          who = 'mentors';
        } else {
          who = 'user';
        }
        changeToMentor(users[index].userid, who, index);
      });
    });
  };
  showList();

  const getRegulars = () => {
    document.getElementById('users-sessions').addEventListener('click', () => {
      showList(false, 'Add mentor');
      document.getElementById('list-of').innerHTML = 'regular users';
      document.querySelectorAll('.session-type').forEach((el) => {
        el.style = 'background: rgb(245, 245, 245);';
        el.childNodes[1].style = 'color: #0d0d0d;';
      });
      document.getElementById('users-sessions').style = 'background: green;';
      document.getElementById('users-sessions').childNodes[1].style = 'color: white;';
    });
  };
  getRegulars();

  const getMentors = () => {
    document.getElementById('mentors-sessions').addEventListener('click', () => {
      showList(true, 'Remove mentor');
      document.getElementById('list-of').innerHTML = 'all mentors';
      document.querySelectorAll('.session-type').forEach((el) => {
        el.style = 'background: rgb(245, 245, 245);';
        el.childNodes[1].style = 'color: #0d0d0d;';
      });
      document.getElementById('mentors-sessions').style = 'background: orange;';
      document.getElementById('mentors-sessions').childNodes[1].style = 'color: white;';
      document.querySelectorAll('.change').forEach((el) => {
        el.classList.add('remove-mentor');
      });
    });
  };
  getMentors();

  const getAll = () => {
    document.getElementById('all-users-sessions').addEventListener('click', () => {
      showList();

      document.getElementById('list-of').innerHTML = 'all users';
      document.querySelectorAll('.session-type').forEach((el) => {
        el.style = 'background: rgb(245, 245, 245);';
        el.childNodes[1].style = 'color: #0d0d0d;';
      });
      document.getElementById('all-users-sessions').style = 'background: #0067fc;';
      document.getElementById('all-users-sessions').childNodes[1].style = 'color: white;';
    });
  };
  getAll();
};
loadData();

const signOut = () => {
  localStorage.clear();
};

const signOutButtons = document.querySelectorAll('.sign-out');

signOutButtons.forEach((signOutButton) => {
  signOutButton.addEventListener('click', signOut);
});
