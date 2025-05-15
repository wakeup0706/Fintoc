import React from "react";

const PrivacypolicyPage = () => {
  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Privacy Policy</h1>
      <section style={{ marginBottom: "20px" }}>
        <h2>Introduction</h2>
        <p>
          Welcome to our Privacy Policy page. Your privacy is critically important to us. This
          document explains how we collect, use, and protect your personal information.
        </p>
      </section>
      <section style={{ marginBottom: "20px" }}>
        <h2>Information We Collect</h2>
        <p>
          We collect various types of information, including but not limited to your name, email
          address, and usage data. This helps us improve our services and provide a better user
          experience.
        </p>
      </section>
      <section style={{ marginBottom: "20px" }}>
        <h2>How We Use Your Information</h2>
        <p>
          The information we collect is used to provide and improve our services, communicate with
          you, and ensure compliance with legal obligations.
        </p>
      </section>
      <section style={{ marginBottom: "20px" }}>
        <h2>Your Rights</h2>
        <p>
          You have the right to access, modify, or delete your personal information. If you have
          any concerns, please contact us at support@example.com.
        </p>
      </section>
      <footer style={{ textAlign: "center", marginTop: "20px" }}>
        <p>&copy; {new Date().getFullYear()} Management Banks. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default PrivacypolicyPage;
