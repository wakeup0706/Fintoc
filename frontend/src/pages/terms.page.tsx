import React from "react";

const TermsPage = () => {
  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Terms and Conditions</h1>
      <section style={{ marginBottom: "20px" }}>
        <h2>Introduction</h2>
        <p>
          Welcome to our Terms and Conditions page. These terms outline the rules and regulations
          for the use of our services. By accessing or using our services, you agree to comply with
          these terms.
        </p>
      </section>
      <section style={{ marginBottom: "20px" }}>
        <h2>Use of Services</h2>
        <p>
          You agree to use our services only for lawful purposes and in a way that does not infringe
          the rights of others. Unauthorized use of our services may result in termination of your
          access.
        </p>
      </section>
      <section style={{ marginBottom: "20px" }}>
        <h2>Intellectual Property</h2>
        <p>
          All content, trademarks, and intellectual property on this site are owned by Management
          Banks or its licensors. You may not use, reproduce, or distribute any content without
          prior written permission.
        </p>
      </section>
      <section style={{ marginBottom: "20px" }}>
        <h2>Limitation of Liability</h2>
        <p>
          We are not liable for any damages arising from the use or inability to use our services.
          This includes, but is not limited to, direct, indirect, incidental, or consequential
          damages.
        </p>
      </section>
      <section style={{ marginBottom: "20px" }}>
        <h2>Changes to Terms</h2>
        <p>
          We reserve the right to update or modify these terms at any time. Continued use of our
          services after changes are made constitutes your acceptance of the updated terms.
        </p>
      </section>
      <footer style={{ textAlign: "center", marginTop: "20px" }}>
        <p>&copy; {new Date().getFullYear()} Management Banks. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default TermsPage;