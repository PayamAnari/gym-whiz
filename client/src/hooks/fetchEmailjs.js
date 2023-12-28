import emailjs from "emailjs-com";

export const sendEmail = (form) => {
  const emailjsUserId = process.env.REACT_APP_EMAILJS;

  return emailjs
    .sendForm("service_qjdu0j8", "template_4fi7b4q", form, emailjsUserId)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw error;
    });
};

export const sendMessage = (form) => {
  const emailjsUserId = process.env.REACT_APP_EMAILJS;
  return emailjs
    .sendForm("service_qjdu0j8", "template_6qro6tu", form, emailjsUserId)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw error;
    });
};

export default { sendEmail, sendMessage };
