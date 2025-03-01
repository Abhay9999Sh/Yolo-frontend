export function validateLoginForm(data: {
  username: string;
  password: string;
}) {
  const errors: Record<string, string> = {};

  if (!data.username.trim()) {
    errors.username = "Username is required";
  }

  if (!data.password) {
    errors.password = "Password is required";
  } else if (data.password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }

  return errors;
}

export function validateSignupForm(data: {
  username: string;
  email: string;
  password: string;
  name: string;
  birthDate: string;
  gender: string;
  description?: string;
}) {
  const errors: Record<string, string> = {};

  // Username validation
  if (!data.username.trim()) {
    errors.username = "Username is required";
  } else if (data.username.length < 3) {
    errors.username = "Username must be at least 3 characters";
  }

  // Email validation
  if (!data.email.trim()) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(data.email)) {
    errors.email = "Email is invalid";
  }

  // Password validation
  if (!data.password) {
    errors.password = "Password is required";
  } else if (data.password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }

  // Name validation
  if (!data.name.trim()) {
    errors.name = "Name is required";
  }

  // Birth date validation
  if (!data.birthDate) {
    errors.birthDate = "Birth date is required";
  }

  // Gender validation
  if (!data.gender) {
    errors.gender = "Gender is required";
  }

  return errors;
}

export function validateProfileForm(data: {
  email: string;
  name: string;
  birthDate: string;
  gender: string;
  description?: string;
}) {
  const errors: Record<string, string> = {};

  // Email validation
  if (!data.email.trim()) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(data.email)) {
    errors.email = "Email is invalid";
  }

  // Name validation
  if (!data.name.trim()) {
    errors.name = "Name is required";
  }

  // Birth date validation
  if (!data.birthDate) {
    errors.birthDate = "Birth date is required";
  }

  // Gender validation
  if (!data.gender) {
    errors.gender = "Gender is required";
  }

  return errors;
}
