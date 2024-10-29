import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './Footer.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';

export default function Footer() {
  return (
    <footer className="bg-qais text-center text-lg-start">
      <div className="container p-4">
        <div className="row">
          <div className="col-lg-4 col-md-12 mb-4">
            <h5 className="text-uppercase">About Us</h5>
            <p>
              We are committed to providing the best shopping experience with quality products and excellent service.
            </p>
          </div>
          <div className="col-lg-4 col-md-6 mb-4">
            <h5 className="text-uppercase">Navigation</h5>
            <ul className="list-unstyled">
              <li><a href="/" className="text-dark">Home</a></li>
              <li><a href="/products" className="text-dark">Products</a></li>
              <li><a href="/Cart" className="text-dark">Cart</a></li>
            </ul>
          </div>
          <div className="col-lg-4 col-md-6 mb-4">
            <h5 className="text-uppercase">Follow Us</h5>
            <div className='d-flex justify-content-space-between'>
              <a href="https://www.facebook.com/profile.php?id=100003778749090" className="me-4 text-dark">
                <FontAwesomeIcon icon={faFacebookF} size="2x" />
              </a>
              <a href="https://www.instagram.com/itsqais_/?hl=en" className="me-4 text-dark">
                <FontAwesomeIcon icon={faTwitter} size="2x" />
              </a>
              <a href="https://www.instagram.com/itsqais_/?hl=en" className="me-4 text-dark">
                <FontAwesomeIcon icon={faInstagram} size="2x" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center p-3 bg-light">
        © 2024 Your Company
      </div>
    </footer>
  );
}
