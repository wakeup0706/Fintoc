import React from "react";

const PrivacypolicyPage = () => {
  return (
    <div className="p-5 font-sans">
      <h1 className="text-center text-2xl font-bold mb-5">Privacy Policy</h1>
      <section className="mb-5">
        <h2 className="text-xl font-semibold mb-2">Introduction</h2>
        <p>
          Welcome to our Privacy Policy page. Your privacy is critically important to us. This
          document explains how we collect, use, and protect your personal information.
        </p>
      </section>
      <section className="mb-5">
        <h2 className="text-xl font-semibold mb-2">Information We Collect</h2>
        <p>
          We collect various types of information, including but not limited to your name, email
          address, and usage data. This helps us improve our services and provide a better user
          experience.
        </p>
      </section>
      <section className="mb-5">
        <h2 className="text-xl font-semibold mb-2">How We Use Your Information</h2>
        <p>
          The information we collect is used to provide and improve our services, communicate with
          you, and ensure compliance with legal obligations.
        </p>
      </section>
      <section className="mb-5">
        <h2 className="text-xl font-semibold mb-2">Your Rights</h2>
        <p>
          You have the right to access, modify, or delete your personal information. If you have
          any concerns, please contact us at support@example.com.
        </p>
      </section>
      <footer className="text-center mt-5">
        <p>&copy; {new Date().getFullYear()} Management Banks. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default PrivacypolicyPage;