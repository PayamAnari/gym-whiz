export const validateName = (name) => {
  if (!name.trim()) {
    return "Name cannot be empty.";
  }
  if (!/^[a-zA-Z]+$/.test(name)) {
    return "Name must contain only letters.";
  }
  return null;
};

export const validatePassword = (password) => {
  if (password.length < 8) {
    return "Password must be at least 8 characters long.";
  }
  if (!/[A-Z]/.test(password)) {
    return "Password must contain an uppercase letter.";
  }
  if (!/[a-z]/.test(password)) {
    return "Password must contain a lowercase letter.";
  }
  if (!/[0-9]/.test(password)) {
    return "Password must contain a number.";
  }
  if (!/[^A-Za-z0-9]/.test(password)) {
    return "Password must contain a special character.";
  }
  return null;
};
