import React from "react";
import "./Contact.css"
function Contact() {
  const [result, setResult] = React.useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append("access_key", "7f8f7211-54c9-4175-8ab0-8a3af81317e0");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully");
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };

  return (
    <div class="container">
    <form class="wrapper" onSubmit={onSubmit}>
      <h1 class="title">Contact</h1>
      <p class="desc">
        Feel free to reach out to me for any questions or opportunities!
      </p>
      <div class="contact-form">
        <h2 class="contact-title">Email Me 🚀</h2>
        <input class="contact-input" type="text" name="name" placeholder="Your Name" required />
        <input class="contact-input" type="email" name="email" placeholder="Your Email" required />
        <textarea class="contact-input-message" name="message" placeholder="Message" rows="4" required></textarea>
        <button class="contact-button" type="submit">Submit Form</button>
      </div>
      <span>{result}</span>
    </form>
  </div>
  

  );
}

export default Contact;
