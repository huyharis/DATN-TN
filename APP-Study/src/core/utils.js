export const emailValidator = email => {
  const re = /\S+@\S+\.\S+/;

  if (!email || email.length <= 0) return 'Email cannot be empty.';
  if (!re.test(email)) return 'Ooops! We need a valid email address.';

  return '';
};

export const passwordValidator = password => {
  if (!password || password.length <= 0) return 'Password cannot be empty.';
  if (password.length < 6) return 'Password must be at least 6 characters.';

  return '';
};

export const nameValidator = name => {
  if (!name || name.length <= 0) return 'Name cannot be empty.';

  return '';
};

export const usernameValidator = username => {
  if (!username || username.length <= 0) return 'Username cannot be empty.';

  return '';
}

export const phoneValidator = phone => {
  const re = /^\d{10}$/

  if (!phone || phone.length <= 0) return 'Phone cannot be empty.';
  if (!re.test(phone)) return 'Ooops! We need a valid phone.';

  return '';
};
