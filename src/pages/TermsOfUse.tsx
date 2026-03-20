import NewsletterSection from "@/components/NewsletterSection";
import useSEO from "@/hooks/useSEO";

const TermsOfUse = () => {
  useSEO({
    title: "Terms of Use – Aarvak Diagnostics",
    description: "Review the terms and conditions for using Aarvak Diagnostics website and services. Understand your rights and responsibilities as a user.",
    canonical: "/terms-of-use",
  });
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Terms of Use</h1>

        <div className="prose prose-gray max-w-none space-y-6 text-gray-700 text-sm leading-relaxed">
          <p>Welcome to <strong>Aarvak Diagnostics</strong> ("Company", "we", "our", "us").</p>
          <p>
            By accessing or using our website{" "}
            <a href="http://www.aarvakdiagnostics.com" className="text-blue-600 hover:underline">www.aarvakdiagnostics.com</a> ("Website"), mobile application, or any services offered by Aarvak Diagnostics ("Services"), you agree to comply with these <strong>Terms of Use</strong>.
          </p>
          <p>If you do not agree, please discontinue using our Website and Services.</p>

          <h2 className="text-xl font-bold text-gray-900 mt-8">1. Eligibility</h2>
          <p>By using our Website/Services, you confirm that:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>You are at least <strong>18 years old</strong>, and</li>
            <li>You can enter into a legally binding agreement.</li>
          </ul>
          <p>If you are booking tests for a minor or another person, you confirm you are legally authorized to do so.</p>

          <h2 className="text-xl font-bold text-gray-900 mt-8">2. Services We Offer</h2>
          <p>Through our Website and App, you can:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>View diagnostic tests and health packages</li>
            <li>Book appointments</li>
            <li>Schedule home sample collection (if available in your area)</li>
            <li>Access test reports online</li>
            <li>Receive SMS/WhatsApp/email updates</li>
            <li>Contact support for queries</li>
          </ul>
          <p>All bookings are non-transferable and available only to the registered user.</p>

          <h2 className="text-xl font-bold text-gray-900 mt-8">3. User Account & Responsibilities</h2>
          <p>To use certain features, you may need to create an account and provide accurate personal and medical information.</p>
          <p>You are responsible for:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Keeping login details confidential</li>
            <li>Ensuring your information is accurate and updated</li>
            <li>All activity happening under your account</li>
          </ul>
          <p>We may suspend accounts that provide false information or misuse the platform.</p>

          <h2 className="text-xl font-bold text-gray-900 mt-8">4. Information & Medical Data</h2>
          <p>By booking a test, you authorize Aarvak Diagnostics to:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Collect your personal and medical information</li>
            <li>Share reports with authorized healthcare providers</li>
            <li>Contact you with test updates, reminders, or service alerts</li>
          </ul>
          <p>We follow strict privacy and confidentiality standards as per our <strong>Privacy Policy</strong>.</p>

          <h2 className="text-xl font-bold text-gray-900 mt-8">5. Payments</h2>
          <p>Payments for services can be made through online gateways or other methods displayed on the Website.</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Services begin only after successful payment.</li>
            <li>Prices may change without prior notice.</li>
            <li>In case of a pricing error, we may cancel your order and issue a refund.</li>
            <li>Taxes and transaction charges may apply.</li>
          </ul>
          <p>We are not responsible for technical failures in third-party payment systems.</p>

          <h2 className="text-xl font-bold text-gray-900 mt-8">6. Cancellations, Refunds & Validity</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>Test bookings are normally <strong>valid for 7 days</strong> from the invoice date.</li>
            <li>Cancellation requests must be submitted <strong>within 72 hours</strong> of booking.</li>
            <li>Refunds (if approved) will be processed to the original payment method only.</li>
          </ul>
          <p>No refunds are issued once sample collection or service fulfillment has begun.</p>

          <h2 className="text-xl font-bold text-gray-900 mt-8">7. Test Reports</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>Reports are provided within the standard turnaround time.</li>
            <li>Timelines may change based on sample type, holidays, logistics, or technical delays.</li>
            <li>Reports can be downloaded from the Website/App or collected from the center.</li>
          </ul>
          <p>We do not deliver reports on public holidays or Sundays.</p>
          <p><strong>Important:</strong> All reports must be interpreted by qualified medical professionals. Aarvak Diagnostics does not provide medical diagnosis or treatment.</p>

          <h2 className="text-xl font-bold text-gray-900 mt-8">8. Acceptable Use Policy</h2>
          <p>You agree not to:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Use the Website for illegal or harmful activities</li>
            <li>Upload misleading, defamatory, or unauthorized content</li>
            <li>Try to hack, disrupt, or damage Website/App systems</li>
            <li>Copy or misuse content, reports, or software</li>
            <li>Make fraudulent bookings or impersonate someone else</li>
          </ul>
          <p>Any misuse can result in account suspension and legal action.</p>

          <h2 className="text-xl font-bold text-gray-900 mt-8">9. Intellectual Property</h2>
          <p>All Website/App content, including text, design, reports, images, graphics, and software belongs to <strong>Aarvak Diagnostics</strong>. You may not copy, reproduce, or use content without written permission.</p>

          <h2 className="text-xl font-bold text-gray-900 mt-8">10. Disclaimer</h2>
          <p>Our Website, App, and Services are provided <strong>"as is"</strong>.</p>
          <p>We do not guarantee:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Error-free operation</li>
            <li>Uninterrupted access</li>
            <li>Accuracy of third-party information</li>
            <li>Freedom from viruses or harmful components</li>
          </ul>
          <p><strong>Medical Disclaimer:</strong></p>
          <p>Website content is for <strong>information only</strong> and must not replace professional medical advice or doctor consultation.</p>

          <h2 className="text-xl font-bold text-gray-900 mt-8">11. Limitation of Liability</h2>
          <p>Aarvak Diagnostics is not responsible for:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Any loss, damage, or inconvenience caused by using our Website/Services</li>
            <li>Delays in reports due to technical or operational issues</li>
            <li>Unauthorized access to your account</li>
            <li>Third-party service failures (payment gateways, courier delays, etc.)</li>
          </ul>
          <p>Your use of the Website is entirely at your own risk.</p>

          <h2 className="text-xl font-bold text-gray-900 mt-8">12. Indemnification</h2>
          <p>You agree to protect and indemnify Aarvak Diagnostics against any claims, losses, or legal actions arising from:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Misuse of our Website</li>
            <li>Violation of these Terms</li>
            <li>Incorrect information provided by you</li>
          </ul>

          <h2 className="text-xl font-bold text-gray-900 mt-8">13. Privacy Policy</h2>
          <p>Use of our Website/Services is subject to our <strong>Privacy Policy</strong>, which explains how we collect and use personal information.</p>

          <h2 className="text-xl font-bold text-gray-900 mt-8">14. Changes to Terms</h2>
          <p>Aarvak Diagnostics may update these Terms at any time.</p>
          <p>Continued use of our Website means you accept the revised Terms.</p>

          <h2 className="text-xl font-bold text-gray-900 mt-8">15. Contact Us</h2>
          <p>For queries or concerns regarding these Terms, contact:</p>
          <p><strong>Aarvak Diagnostics</strong></p>
          <p>India</p>
          <p><a href="mailto:marketing@aarvakdiagnostics.com" className="text-blue-600 hover:underline">marketing@aarvakdiagnostics.com</a></p>
        </div>
      </div>

      <NewsletterSection />
    </div>
  );
};

export default TermsOfUse;