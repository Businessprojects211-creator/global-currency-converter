export const metadata = { title: "About Global Currency Converter", description: "Learn about Global Currency Converter and its exchange-rate tools." };
const email = "globalcurrencyconverter01020@gmail.com";

export default function About() {
  return <main className="legal"><a className="brand" href="/">↗ Global<span>Convert</span></a><article>
    <p className="eyebrow">ABOUT US</p><h1>About Global Currency Converter</h1>
    <p>Welcome to Global Currency Converter, an online currency conversion platform designed to help users quickly compare and convert currencies from around the world.</p>
    <h2>What we do</h2><p>Our tools provide currency conversion, exchange-rate information, currency names, codes and symbols, historical or reference rate information where available, educational currency information, and currency-related calculators.</p>
    <h2>Our mission</h2><p>We aim to make currency information simple to access and easy to understand for travel, education, business, online shopping, international payments, research, and general reference.</p>
    <h2>How our converter works</h2><p>We use exchange-rate data from the Frankfurter service and its upstream data sources. Update timing depends on the provider, market conditions, weekends, holidays, and technical availability. Our displayed rate may differ from the rate offered by a bank, card provider, payment processor, or other financial institution.</p><p>Read our <a href="/rate-methodology">Rate Methodology</a> for details.</p>
    <h2>Our commitment to accuracy</h2><p>We make reasonable efforts to provide useful information, but cannot guarantee that every rate is current, complete, or suitable for a particular transaction. Verify important rates directly with your financial institution before completing a transaction.</p>
    <h2>Independent website</h2><p>Global Currency Converter is an independent informational and utility website. Unless explicitly stated otherwise, we are not a bank, foreign exchange bureau, money transfer company, investment adviser, financial adviser, or government agency.</p>
    <h2>Advertising and support</h2><p>We may use advertising to support the operation and development of this website. Advertising partners may use cookies, web beacons, IP addresses, or other identifiers according to applicable laws and their own policies. Advertising does not influence our exchange-rate calculations.</p>
    <h2>Contact us</h2><p>Questions, feedback, corrections, or suggestions can be sent to <a href={`mailto:${email}`}>{email}</a> or through our <a href="/contact">Contact page</a>.</p>
  </article></main>;
}
