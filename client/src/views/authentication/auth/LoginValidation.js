function LoginValidation(values){
  let errors = {};

  if(!values.userName){
    errors.userName = 'Username is required!';
  }

  if(!values.password){
    errors.password = 'Password is required!';
  }

  return errors;
}

export default LoginValidation;