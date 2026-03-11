import NewsletterSection from "@/components/NewsletterSection";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy</h1>

        <div className="prose prose-gray max-w-none space-y-6 text-gray-700 text-sm leading-relaxed">
          <p>
            At Aarvak Diagnostics, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, store, and safeguard your personal information when you use our website{" "}
            <a href="http://www.aarvakdiagnostics.com" className="text-blue-600 hover:underline">www.aarvakdiagnostics.com</a> (the "Website") or our services.
          </p>
          <p>By accessing or using our Website, you agree to this Privacy Policy. If you do not agree, please do not use the Website.</p>

          <h2 className="text-xl font-bold text-gray-900 mt-8">1. Information We Collect</h2>
          <p>We may collect the following types of information:</p>

          <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
          <ul className="list-disc pl-6 space-y-1">
            <li>Name, contact details, age, gender</li>
            <li>Address</li>
            <li>Medical history, medical records, prescriptions</li>
            <li>Health parameters required for diagnostic tests</li>
            <li>Uploaded documents (e.g., prescriptions)</li>
          </ul>

          <h3 className="text-lg font-semibold text-gray-900">Technical Information</h3>
          <ul className="list-disc pl-6 space-y-1">
            <li>IP address, browser type, device details</li>
            <li>Cookies & usage data for improving website performance</li>
          </ul>

          <h3 className="text-lg font-semibold text-gray-900">Location Data</h3>
          <p>With your permission, we may collect your device location to assign service personnel or schedule home sample collection.</p>

          <h2 className="text-xl font-bold text-gray-900 mt-8">2. How We Use Your Information</h2>
          <p>We use your information to:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Provide diagnostic services and deliver reports</li>
            <li>Manage appointments and home sample collections</li>
            <li>Contact you for updates, service notifications, and offers</li>
            <li>Improve website performance, customer experience, and service quality</li>
            <li>Conduct internal research and analysis (anonymized data only)</li>
          </ul>

          <h2 className="text-xl font-bold text-gray-900 mt-8">3. Sharing of Information</h2>
          <p>We do <strong>not</strong> sell your information. We may share it only with:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Authorized healthcare professionals</li>
            <li>Insurance providers or hospitals (if needed for billing)</li>
            <li>Government authorities, when legally required</li>
            <li>Third-party service partners (secure & authorized only)</li>
            <li>Research partners, using anonymized data only</li>
          </ul>

          <h2 className="text-xl font-bold text-gray-900 mt-8">4. Data Security</h2>
          <p>We use strict security measures to protect your data from unauthorized access, alteration, or disclosure. Access is restricted to authorized personnel only.</p>

          <h2 className="text-xl font-bold text-gray-900 mt-8">5. Your Choices</h2>
          <p>You may review or update your personal information by contacting us.</p>
          <p>You may also opt out of promotional communication at any time.</p>

          <h2 className="text-xl font-bold text-gray-900 mt-8">6. External Links</h2>
          <p>Our Website may contain links to third-party websites. We are not responsible for their privacy practices. Please review their policies before sharing information.</p>

          <h2 className="text-xl font-bold text-gray-900 mt-8">7. Changes to This Policy</h2>
          <p>We may update this Privacy Policy from time to time. Changes will be posted on this page.</p>

          <h2 className="text-xl font-bold text-gray-900 mt-8">8. Contact Us</h2>
          <p>For any questions, concerns, or privacy-related requests, please contact our Grievance Officer:</p>
          <p>India</p>
          <p><a href="mailto:marketing@aarvakdiagnostics.com" className="text-blue-600 hover:underline">marketing@aarvakdiagnostics.com</a></p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;