import { useRef } from "react";
import Card from "../../components/card/Card";
import styles from "./Contact.module.scss";
import { FaPhoneAlt, FaEnvelope, FaFacebook } from "react-icons/fa";
import { GoLocation } from "react-icons/go";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    console.log(form.current);

    emailjs
      .sendForm(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        "template_7xyhwen",
        form.current,
        "user_hKs2aRfLoozcqA28UpUyz"
      )
      .then(
        (result) => {
          toast.success("Message sent successfully");
        },
        (error) => {
          toast.error(error.text);
        }
      );
    e.target.reset();
  };

  return (
    <section>
      <div className={`container ${styles.contact}`}>
        <h2>Contact Us</h2>
        <div className={styles.section}>
          {/* <form ref={form} onSubmit={sendEmail}>
            <Card cardClass={styles.card}>
              <label>Name</label>
              <input
                type="text"
                name="user_name"
                placeholder="Full Name"
                required
              />
              <label>Email</label>
              <input
                type="email"
                name="user_email"
                placeholder="Your active email"
                required
              />
              <label>Subject</label>
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                required
              />
              <label>Message</label>
              <textarea name="message" cols="30" rows="10"></textarea>
              <button className="--btn --btn-primary">Send Message</button>
            </Card>
          </form> */}

          <div className={styles.details}>
            <Card cardClass={styles.card2}>
              <h3>Our Contact Information</h3>
              <p>Feel Free to Contact Us on the Details Below. Thank You</p>
              <div className={styles.icons}>
                <span>
                  <FaPhoneAlt />
                  <p>+256703787217</p>
                </span>
                <span>
                  <FaEnvelope />
                  <p>San@gmail.com</p>
                </span>
                <span>
                  <GoLocation />
                  <p>Kampala, uganda</p>
                </span>
                <span>
                  <FaFacebook />
                  <p>San Davi</p>
                </span>
              </div>
            </Card>
          </div>
        </div>
        <br/>
              <button className="--btn">
                <Link to="/#products">&larr; Back To Shop</Link>
              </button>
      </div>
      
    </section>
  );
};

export default Contact;