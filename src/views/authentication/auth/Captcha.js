import ReCAPTCHA from "react-google-recaptcha";
import { useRef } from "react";

const Captcha = () =>{

  const recaptcha = useRef(null);
  const key = import.meta.env.VITE_SITE_KEY;
  console.log(key)

  return (
    <ReCAPTCHA sitekey={key} ref={recaptcha}/>
  )
}

export default Captcha;