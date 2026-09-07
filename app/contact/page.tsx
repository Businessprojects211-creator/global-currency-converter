export const metadata = { title: "Contact Global Currency Converter", description: "Contact Global Currency Converter with questions, corrections, or feedback." };
const email = "globalcurrencyconverter01020@gmail.com";

export default function Contact() {
  return <main className="legal"><a className="brand" href="/">↗ Global<span>Convert</span></a><article>
    <p className="eyebrow">CONTACT US</p><h1>Contact Global Currency Converter</h1>
    <p>We welcome questions, feedback, suggestions, and reports about Global Currency Converter.</p><h2>Email</h2><p>Contact us at <a href={`mailto:${email}`}>{email}</a>. Please include the page, currency pair, description of the issue, device or browser where relevant, and a screenshot if useful.</p>
    <h2>Common reasons to contact us</h2><ul><li>Technical problems or website errors.</li><li>Incorrect or outdated information.</li><li>Questions about conversion calculations.</li><li>Privacy, cookie, advertising, copyright, or intellectual-property concerns.</li><li>General feedback and suggestions.</li></ul>
    <h2>Response time</h2><p>We aim to review legitimate enquiries as reasonably as possible, but response times vary and submitting a message does not guarantee an immediate response.</p>
    <h2>Important notice</h2><p>Do not email bank account numbers, card numbers, passwords, PINs, government identification numbers, or other sensitive financial or security information. We do not provide banking, money-transfer, investment, or personalised financial advisory services through our contact channels.</p>
    <h2>Privacy</h2><p>Information submitted through our contact channels may be handled according to our <a href="/privacy-policy">Privacy Policy</a>.</p>
  </article></main>;
}
