// const loginPort = 'http://localhost:3000';
const loginPort = 'https://wildbody-server.shop';

const login = async () => {
  if (!$('#email').val()) {
    alert('계정(e-mail)을 입력해주세요.');
    return;
  }
  if (!$('#password').val()) {
    alert('비밀번호를 입력해주세요.');
    return;
  }

  await axios
    .post(`${loginPort}/auth/login`, {
      email: $('#email').val(),
      password: $('#password').val(),
    })
    .then((response) => {
      console.log('response', response.data.data);

      localStorage.setItem(
        `cookie`,
        `Bearer ${response.data.data.accessToken}`,
      );
      const expirationDate = new Date().getTime() + 7200 * 1000; // 2시간
      localStorage.setItem('tokenExpiration', expirationDate);

      if (response.data.data.status === 'admin') {
        location.href = 'admin.html';
      } else {
        alert('반갑습니다 회원님!');
        location.href = `main.html?id=${response.data.data.userId}`;
      }
    })
    .catch((error) => {
      alert(error.response.data.message);
    });
};
$('#login_button').click(login);
