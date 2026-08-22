/**
 * Seeds the three policies into Firestore with the full official legal text.
 * Run: npx tsx scripts/seed-policies.ts
 * Replaces any existing sections for each policy.
 */
import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore, FieldValue } from "firebase-admin/firestore";
import { readFileSync, existsSync } from "fs";

function getServiceAccount() {
  const keyFile = process.env.FIREBASE_ADMIN_KEY_FILE || "serviceAccountKey.json";
  if (existsSync(keyFile)) {
    return JSON.parse(readFileSync(keyFile, "utf8"));
  }
  return {
    projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
    clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
    privateKey: (process.env.FIREBASE_ADMIN_PRIVATE_KEY || "").replace(/\\n/g, "\n"),
  };
}

const app = initializeApp({ credential: cert(getServiceAccount()) });
const db = getFirestore(app);

const CONTACT = `
<p>ChitraTech<br/>Chitra Tap Product Support</p>
<p>Email: <a href="mailto:info@chitratech.com.np">info@chitratech.com.np</a></p>
<p>Phone: +977 971-2039906</p>
<p>Address: Budhanilakantha-12, Kapan Kharibot, Kathmandu, Nepal</p>`;

const ul = (...items: string[]) => `<ul>${items.map((i) => `<li>${i}</li>`).join("")}</ul>`;
const p = (...paras: string[]) => paras.map((t) => `<p>${t}</p>`).join("");

type SeedSection = { title: string; content?: string; children?: { title: string; content: string }[] };

const LAST_UPDATED = "2026-08-22";

const policies: {
  slug: string;
  title: string;
  sections: SeedSection[];
}[] = [
  {
    slug: "privacy-policy",
    title: "Privacy Policy",
    sections: [
      {
        title: "About Chitra Tap",
        content: p(
          `ChitraTech ("ChitraTech", "we", "us", or "our") respects your privacy and is committed to protecting the information you provide when using our websites, products, platforms, and services.`,
          `Chitra Tap is a product of ChitraTech. This Privacy Policy explains how ChitraTech collects, uses, stores, and protects information in connection with Chitra Tap and related services.`,
          `By accessing or using Chitra Tap, creating an account, purchasing a Chitra Tap product, or using any related service, you acknowledge this Privacy Policy.`,
          `Chitra Tap is a digital business product developed and operated by ChitraTech. It may provide businesses with NFC and QR-enabled physical products connected to digital business profiles.`,
          `Depending on the features available, Chitra Tap may allow businesses to display information such as:`
        ) + ul(
          "Business name", "Business description", "Contact information", "Business address", "Website",
          "Social media links", "Business hours", "Map/location", "Business reviews and ratings",
          "Images and logos", "Payment or booking links", "Other business information"
        ),
      },
      {
        title: "Information We Collect",
        content: `<p>Depending on how you use Chitra Tap, we may collect the following types of information.</p>`,
        children: [
          {
            title: "Account Information",
            content: p(`When you create an account, we may collect:`) + ul(
              "Full name", "Business or company name", "Email address", "Phone number",
              "Login credentials", "Account preferences", "Information you voluntarily provide"
            ),
          },
          {
            title: "Business Information",
            content: p(`If you create a Chitra Tap business profile, you may provide:`) + ul(
              "Business name", "Business category", "Business description", "Business address",
              "Phone number", "Email address", "Website", "Social media profiles", "Business hours",
              "Logo", "Images", "Map/location information", "Review or rating information",
              "Payment links", "Booking links", "Other information you choose to publish"
            ) + p(
              `You are responsible for ensuring that information you provide is accurate and that you have the right to use any content you upload.`
            ),
          },
          {
            title: "Payment Information",
            content: p(
              `When you purchase a product or service, payment information may be processed through third-party payment providers.`,
              `Depending on the payment method, ChitraTech may receive limited payment-related information necessary to confirm and manage your transaction.`,
              `We do not intentionally store complete card credentials when payment processing is handled by an external payment provider.`
            ),
          },
          {
            title: "Automatically Collected Information",
            content: p(`When you visit or use our services, certain technical information may be collected automatically, including:`) + ul(
              "IP address", "Browser type", "Device type", "Operating system",
              "Approximate location information", "Pages visited", "Date and time of access",
              "Referral information", "Device and browser information", "Service usage information",
              "Error and diagnostic information"
            ),
          },
          {
            title: "QR Scans and NFC Taps",
            content: p(
              `Chitra Tap uses QR codes and NFC technology to connect physical products with digital business profiles.`,
              `When someone scans a QR code or taps an NFC-enabled Chitra Tap product, we may collect limited technical information such as:`
            ) + ul(
              "Date and time of interaction", "Device or browser information",
              "Approximate geographic information where technically available",
              "The Chitra Tap profile accessed", "Basic usage and performance information"
            ) + p(
              `We do not intentionally use a QR scan or NFC tap to identify an individual person unless that person voluntarily provides identifying information.`
            ),
          },
        ],
      },
      {
        title: "How We Use Information",
        content: p(`ChitraTech may use collected information to:`) + ul(
          "Create and manage user accounts", "Create and operate digital business profiles",
          "Process orders and payments", "Provide Chitra Tap products", "Configure QR codes and NFC products",
          "Provide customer support", "Communicate with customers", "Maintain and improve our platform",
          "Monitor service performance", "Provide analytics", "Detect and prevent fraud or abuse",
          "Maintain platform security", "Improve products and features", "Troubleshoot technical issues",
          "Comply with applicable laws and legal requirements"
        ),
      },
      {
        title: "Public Business Information",
        content: p(
          `Chitra Tap allows businesses to publish information that may be publicly accessible.`,
          `Information intentionally published by a business owner may be visible to anyone who accesses that business's Chitra Tap profile.`,
          `This may include:`
        ) + ul(
          "Business name", "Business address", "Phone number", "Email address", "Website",
          "Social media links", "Business hours", "Images", "Business description", "Maps",
          "Reviews or ratings"
        ) + p(
          `Business owners should not publish sensitive personal information that they do not want publicly available.`
        ),
      },
      {
        title: "Third-Party Services",
        content: p(`Chitra Tap may integrate with or link to third-party services, including:`) + ul(
          "Google Maps", "Google Business services", "Social media platforms", "Payment providers",
          "Hosting providers", "Cloud infrastructure", "Analytics services", "Authentication services",
          "Other external platforms"
        ) + p(
          `Third-party services operate under their own terms and privacy policies.`,
          `ChitraTech does not control the privacy practices of third-party services.`
        ),
      },
      {
        title: "Google Maps, Reviews and Ratings",
        content: p(
          `Chitra Tap may display business information, maps, reviews, ratings, or other information obtained from third-party platforms where permitted.`,
          `Information obtained from Google or other third-party platforms remains subject to the applicable third party's terms and policies.`,
          `ChitraTech does not claim ownership of third-party reviews, ratings, trademarks, logos, or other third-party content.`,
          `ChitraTech does not intentionally create or fabricate third-party customer reviews or ratings.`
        ),
      },
      {
        title: "Cookies and Similar Technologies",
        content: p(`We may use cookies, local storage, sessions, analytics tools, and similar technologies to:`) + ul(
          "Keep users signed in", "Remember preferences", "Improve website performance",
          "Maintain security", "Understand service usage", "Improve user experience",
          "Analyze platform performance"
        ) + p(
          `You may be able to control cookies through your browser settings. Disabling certain technologies may affect some functionality.`
        ),
      },
      {
        title: "How We Share Information",
        content: p(
          `ChitraTech does not sell your personal information as a standalone product.`,
          `We may share information with trusted service providers where reasonably necessary to operate our business and services.`,
          `These providers may assist with:`
        ) + ul(
          "Hosting", "Databases", "Payments", "Authentication", "Analytics", "Email",
          "Customer support", "Security", "Delivery", "Infrastructure"
        ) + p(
          `We may also disclose information where required by applicable law, court order, regulation, or lawful government request.`
        ),
      },
      {
        title: "Business Owner Responsibility",
        content: p(
          `If you use Chitra Tap to collect, publish, or manage information about your customers, employees, clients, or other individuals, you are responsible for ensuring that your use of such information complies with applicable laws.`,
          `ChitraTech provides the technology platform but does not control what information a business owner chooses to publish.`
        ),
      },
      {
        title: "Data Security",
        content: p(
          `ChitraTech takes reasonable technical and organizational measures to protect information from unauthorized access, loss, misuse, alteration, or disclosure.`,
          `However, no internet service, website, server, database, or electronic transmission can be guaranteed to be completely secure.`,
          `You are responsible for maintaining the security of your account credentials and should notify us if you believe your account has been compromised.`
        ),
      },
      {
        title: "Data Retention",
        content: p(`We may retain information for as long as reasonably necessary to:`) + ul(
          "Provide our services", "Maintain accounts", "Process transactions", "Provide customer support",
          "Meet legal obligations", "Resolve disputes", "Prevent fraud and abuse",
          "Enforce our agreements", "Maintain legitimate business records"
        ) + p(
          `When information is no longer reasonably required, we may delete, anonymize, or securely dispose of it, subject to applicable legal requirements.`
        ),
      },
      {
        title: "Your Privacy Rights",
        content: p(`Subject to applicable law, you may have rights regarding your personal information, including the ability to:`) + ul(
          "Request information about personal data we hold", "Request correction of inaccurate information",
          "Request deletion where legally applicable", "Withdraw certain consents",
          "Ask how your information is being used", "Contact us regarding privacy concerns"
        ) + p(
          `Certain information may need to be retained where required by law or necessary for legitimate business purposes.`
        ),
      },
      {
        title: "Children's Privacy",
        content: p(
          `Chitra Tap is primarily intended for businesses and general users.`,
          `We do not knowingly collect children's personal information where such collection is prohibited by applicable law.`,
          `If you believe a child has provided personal information to ChitraTech improperly, please contact us.`
        ),
      },
      {
        title: "External Links",
        content: p(
          `Chitra Tap profiles may contain links to websites, social media platforms, maps, payment services, and other third-party websites.`,
          `ChitraTech is not responsible for the privacy practices, security, content, or policies of external services.`,
          `You should review the privacy policies of third-party services before using them.`
        ),
      },
      {
        title: "Changes to This Privacy Policy",
        content: p(
          `We may update this Privacy Policy from time to time to reflect changes in our services, technology, business practices, or applicable legal requirements.`,
          `When changes are made, we may update the "Last Updated" date and provide additional notice where appropriate.`,
          `Your continued use of Chitra Tap after an updated Privacy Policy becomes effective constitutes acceptance of the updated policy to the extent permitted by applicable law.`
        ),
      },
      {
        title: "Contact Us",
        content: p(`If you have questions, concerns, or requests regarding this Privacy Policy or your personal information, please contact us.`) + CONTACT,
      },
      {
        title: "Governing Law",
        content: p(
          `This Privacy Policy shall be interpreted in accordance with the applicable laws of Nepal.`,
          `Chitra Tap is a product of ChitraTech.`
        ),
      },
    ],
  },
  {
    slug: "terms-and-conditions",
    title: "Terms & Conditions",
    sections: [
      {
        title: "About Chitra Tap",
        content: p(
          `Welcome to Chitra Tap, a product of ChitraTech.`,
          `These Terms &amp; Conditions ("Terms") govern your access to and use of Chitra Tap, including our website, digital business profile platform, NFC/QR products, and related services.`,
          `By creating an account, purchasing a Chitra Tap product, creating a business profile, or using our services, you agree to these Terms.`,
          `If you do not agree with these Terms, please do not use Chitra Tap.`,
          `Chitra Tap is a product developed and operated by ChitraTech.`,
          `Chitra Tap provides businesses with tools and physical products that connect customers to digital business information through QR codes, NFC technology, and online business profiles.`,
          `Our services may include:`
        ) + ul(
          "NFC-enabled business stands", "QR-enabled business stands", "NFC tags and stickers",
          "QR stickers", "Digital business profiles", "Business contact information",
          "Social media links", "Website links", "Maps and locations", "Business reviews and ratings",
          "Analytics", "Other digital business services"
        ),
      },
      {
        title: "Eligibility",
        content: p(
          `You must provide accurate information when creating an account or purchasing our products and services.`,
          `If you create an account on behalf of a business or organization, you confirm that you have the authority to represent that business or organization.`,
          `You are responsible for maintaining the confidentiality of your account credentials.`
        ),
      },
      {
        title: "Account Responsibilities",
        content: p(`You agree to:`) + ul(
          "Provide accurate information", "Keep your account information updated",
          "Protect your login credentials", "Not share your account in an unauthorized manner",
          "Notify us of unauthorized account access", "Use Chitra Tap lawfully",
          "Not attempt to interfere with our platform", "Not attempt unauthorized access to our systems"
        ) + p(
          `You are responsible for activity conducted through your account unless the activity resulted from our failure to maintain reasonable security.`
        ),
      },
      {
        title: "Digital Business Profiles",
        content: p(`Chitra Tap may allow businesses to create digital profiles containing information such as:`) + ul(
          "Business name", "Business description", "Address", "Contact information", "Website",
          "Social media links", "Images", "Logo", "Business hours", "Maps", "Reviews", "Ratings",
          "Payment or booking links"
        ) + p(
          `You are responsible for ensuring that information you publish is accurate, lawful, and up to date.`,
          `ChitraTech reserves the right to remove, restrict, or disable content that violates these Terms, applicable laws, or the rights of others.`
        ),
      },
      {
        title: "User Content",
        content: p(
          `You retain ownership of content that you submit to Chitra Tap, including business descriptions, photographs, logos, and other materials.`,
          `By uploading content, you grant ChitraTech a non-exclusive, worldwide, royalty-free license to host, store, reproduce, display, format, and distribute that content as reasonably necessary to operate and provide the Chitra Tap services.`,
          `You represent that:`
        ) + ul(
          "You own the content or have permission to use it",
          "The content does not infringe another person's rights",
          "The content is not unlawful", "The content does not contain malicious code",
          "The content is not intentionally misleading"
        ),
      },
      {
        title: "Prohibited Activities",
        content: p(`You must not use Chitra Tap to:`) + ul(
          "Commit fraud", "Mislead customers", "Impersonate another person or business",
          "Publish unlawful content", "Upload malicious software", "Attempt unauthorized access",
          "Circumvent security measures", "Abuse QR or NFC functionality", "Harass or threaten others",
          "Infringe intellectual property rights", "Distribute spam", "Distribute malicious links",
          "Interfere with the operation of Chitra Tap", "Conduct any activity prohibited by applicable law"
        ) + p(
          `ChitraTech may suspend or terminate accounts involved in prohibited activities.`
        ),
      },
      {
        title: "Physical Chitra Tap Products",
        content: p(
          `ChitraTech may sell physical products including NFC stands, QR stands, NFC tags, QR stickers, printed products, and other related products.`,
          `Physical products may have minor variations in:`
        ) + ul("Color", "Printing", "Materials", "Dimensions", "Packaging", "Appearance") + p(
          `Such minor variations do not necessarily constitute a product defect.`
        ),
      },
      {
        title: "QR Codes and NFC Tags",
        content: p(
          `Chitra Tap products may contain QR codes or NFC tags that direct users to a digital business profile or other URL.`,
          `The business owner is responsible for the content associated with their QR code or NFC product.`,
          `You must not use a Chitra Tap product to direct customers to unlawful, fraudulent, harmful, deceptive, or malicious content.`,
          `If an account or digital profile is suspended, terminated, or deleted, the associated QR/NFC destination may no longer function as originally configured.`
        ),
      },
      {
        title: "Device Compatibility",
        content: p(
          `NFC functionality depends on the user's device, operating system, browser, NFC support, and other technical factors.`,
          `QR functionality may depend on the user's camera, QR scanner, browser, internet connection, and device.`,
          `ChitraTech cannot guarantee that every device will support every Chitra Tap feature.`
        ),
      },
      {
        title: "Payments",
        content: p(
          `Prices will be displayed at the time of purchase.`,
          `Unless otherwise stated:`
        ) + ul(
          "Prices are in Nepalese Rupees (NPR)", "Applicable delivery charges may apply",
          "Applicable taxes may apply", "Payment must be successfully completed before an order is processed"
        ) + p(
          `ChitraTech reserves the right to correct pricing or product information errors.`,
          `If an incorrect price is displayed because of a technical or human error, we may contact you before processing your order.`
        ),
      },
      {
        title: "Orders and Delivery",
        content: p(
          `After placing an order, ChitraTech may contact you to confirm your order and required information.`,
          `Delivery times are estimates and may be affected by:`
        ) + ul(
          "Delivery location", "Courier availability", "Weather", "Holidays",
          "Transportation delays", "Incorrect customer information", "Events beyond our reasonable control"
        ) + p(
          `You are responsible for providing accurate delivery and contact information.`
        ),
      },
      {
        title: "Refunds and Returns",
        content: p(
          `All refunds, returns, cancellations, and replacements are governed by the ChitraTech Refund &amp; Return Policy for Chitra Tap.`,
          `By purchasing a Chitra Tap product or service, you acknowledge and agree to the applicable Refund &amp; Return Policy.`
        ),
      },
      {
        title: "Third-Party Services",
        content: p(`Chitra Tap may integrate with third-party services including:`) + ul(
          "Google Maps", "Google Business services", "Social media platforms", "Payment providers",
          "Hosting providers", "Analytics providers", "Authentication services", "Other external services"
        ) + p(
          `Third-party services are independently operated.`,
          `ChitraTech does not guarantee the continued availability, functionality, accuracy, or policies of third-party services.`,
          `Changes to third-party APIs, policies, access permissions, or services may affect Chitra Tap functionality.`
        ),
      },
      {
        title: "Reviews and Ratings",
        content: p(
          `Chitra Tap may display reviews, ratings, or business information from third-party platforms or information provided by business owners.`,
          `ChitraTech does not guarantee the accuracy, completeness, authenticity, or continued availability of third-party reviews or ratings.`,
          `ChitraTech does not intentionally fabricate customer reviews or ratings.`
        ),
      },
      {
        title: "Intellectual Property",
        content: p(
          `The ChitraTech and Chitra Tap names, logos, website, software, platform, interface, graphics, designs, original content, and related intellectual property belong to ChitraTech or its respective licensors unless otherwise stated.`,
          `You may not copy, reproduce, modify, distribute, sell, reverse engineer, or commercially exploit ChitraTech's proprietary materials without prior permission.`,
          `Third-party trademarks and logos remain the property of their respective owners.`
        ),
      },
      {
        title: "Service Availability",
        content: p(
          `ChitraTech aims to keep Chitra Tap available and reliable but does not guarantee uninterrupted or error-free operation.`,
          `The service may occasionally be unavailable because of:`
        ) + ul(
          "Maintenance", "Updates", "Server problems", "Network failures", "Security incidents",
          "Third-party outages", "Technical problems", "Events beyond our reasonable control"
        ) + p(
          `ChitraTech may modify, suspend, or discontinue features when reasonably necessary.`
        ),
      },
      {
        title: "Account Suspension and Termination",
        content: p(`ChitraTech may suspend or terminate an account if:`) + ul(
          "You violate these Terms", "You engage in fraudulent activity", "You misuse Chitra Tap",
          "You provide materially false information", "Your activities create security or legal risks",
          "We are required to do so by law"
        ) + p(
          `You may also request closure of your account.`,
          `Account termination may result in the removal or disabling of your digital business profile and associated services.`
        ),
      },
      {
        title: "Disclaimer",
        content: p(
          `Chitra Tap is provided on an "as available" basis.`,
          `To the maximum extent permitted by applicable law, ChitraTech does not guarantee that:`
        ) + ul(
          "Chitra Tap will always be available", "Every feature will work on every device",
          "Third-party services will remain available", "Business information will always be accurate",
          "QR/NFC functionality will work in every environment",
          "The platform will always be completely error-free"
        ) + p(
          `Nothing in these Terms is intended to remove rights or protections that cannot legally be excluded.`
        ),
      },
      {
        title: "Limitation of Liability",
        content: p(
          `To the maximum extent permitted by applicable law, ChitraTech shall not be responsible for indirect, incidental, special, consequential, or unforeseeable losses arising from the use of Chitra Tap.`,
          `This may include losses resulting from:`
        ) + ul(
          "Third-party service failures", "Internet or network failures", "Loss of business information",
          "Unauthorized account access", "Business interruption", "Incorrect information provided by users",
          "Device incompatibility", "Failure of a customer's device to support NFC or QR functionality"
        ) + p(
          `Nothing in these Terms limits liability where such limitation is prohibited by applicable law.`
        ),
      },
      {
        title: "Indemnification",
        content: p(`To the extent permitted by law, you agree to be responsible for claims, losses, damages, or expenses arising from:`) + ul(
          "Your unlawful use of Chitra Tap", "Your violation of these Terms",
          "Your violation of applicable laws", "Your infringement of another person's rights",
          "Content you submit or publish through Chitra Tap"
        ),
      },
      {
        title: "Changes to These Terms",
        content: p(
          `ChitraTech may update these Terms from time to time.`,
          `Updated Terms will be published on our website with a revised "Last Updated" date.`,
          `Continued use of Chitra Tap after changes become effective constitutes acceptance of the updated Terms to the extent permitted by applicable law.`
        ),
      },
      {
        title: "Governing Law",
        content: p(
          `These Terms shall be governed by and interpreted in accordance with the applicable laws of Nepal.`,
          `Disputes shall be handled in accordance with applicable laws and the jurisdiction of the appropriate courts or authorities in Nepal.`
        ),
      },
      {
        title: "Contact Us",
        content: p(`For questions regarding these Terms:`) + CONTACT,
      },
    ],
  },
  {
    slug: "refund-policy",
    title: "Refund & Return Policy",
    sections: [
      {
        title: "Scope",
        content: p(
          `Thank you for choosing Chitra Tap, a product of ChitraTech.`,
          `This Refund &amp; Return Policy explains when customers may request a refund, return, replacement, cancellation, or other remedy for Chitra Tap products and services.`,
          `This policy applies together with the ChitraTech Terms &amp; Conditions.`,
          `This policy applies to purchases of Chitra Tap products and services, including:`
        ) + ul(
          "NFC business stands", "QR business stands", "NFC tags", "NFC stickers", "QR stickers",
          "Customized printed products", "Digital business profiles", "Digital services",
          "Subscription services, where offered", "Other Chitra Tap products and services"
        ),
      },
      {
        title: "General Refund Principle",
        content: p(
          `ChitraTech wants customers to receive products and services that match their order.`,
          `If a product is defective, damaged, incorrectly supplied, or otherwise eligible under applicable consumer protection laws, we will review the matter and provide an appropriate remedy where required.`,
          `Depending on the circumstances, the remedy may include:`
        ) + ul(
          "Repair", "Reconfiguration", "Replacement", "Store/service credit", "Refund",
          "Another appropriate solution"
        ) + p(
          `Nothing in this policy is intended to remove or restrict any mandatory consumer rights under applicable law.`
        ),
      },
      {
        title: "Physical Product Returns",
        content: p(`You may request a return or replacement if the physical Chitra Tap product is:`) + ul(
          "Damaged during delivery", "Defective", "Significantly different from what was ordered",
          "Missing essential components",
          "Non-functional due to a manufacturing defect attributable to ChitraTech"
        ) + p(
          `Please contact us as soon as reasonably possible after receiving the product.`
        ),
      },
      {
        title: "Damaged Products",
        content: p(`If your product arrives damaged, contact ChitraTech with:`) + ul(
          "Order number", "Name", "Contact information", "Photographs showing the damage",
          "Photographs of the packaging where relevant", "Video where necessary",
          "Description of the problem"
        ) + p(
          `We may request additional information to verify the claim.`,
          `If the damage is confirmed and the claim is eligible, ChitraTech may provide a replacement or refund as appropriate.`
        ),
      },
      {
        title: "Defective NFC or QR Products",
        content: p(`If an NFC tag, QR product, stand, or other physical product does not function because of a defect attributable to ChitraTech, we may provide:`) + ul(
          "Troubleshooting", "Reconfiguration", "Replacement", "Refund where appropriate"
        ) + p(
          `Before approving a refund or replacement, ChitraTech may test the product or verify the digital profile associated with it.`,
          `NFC functionality can depend on the customer's device. A phone that does not support NFC does not necessarily mean that the Chitra Tap NFC product is defective.`
        ),
      },
      {
        title: "Customized Products",
        content: p(
          `Some Chitra Tap products may be customized specifically for a customer.`,
          `Customization may include:`
        ) + ul(
          "Business name", "Logo", "QR code", "NFC configuration", "Custom text", "Custom colors",
          "Custom printing", "Business-specific information"
        ) + p(
          `Because customized products are prepared specifically for the customer, they generally cannot be returned simply because the customer changes their mind, provided the product was correctly produced according to the information approved or supplied by the customer.`,
          `If ChitraTech makes an error during production or customization, we will review the issue and may provide a correction, replacement, or other appropriate remedy.`
        ),
      },
      {
        title: "Customer-Provided Information",
        content: p(`Customers are responsible for checking information supplied to ChitraTech before production or publication.`) + ul(
          "Business name", "Phone number", "Email", "Address", "Website", "Social media links",
          "Logo", "Images", "QR destination", "Other submitted information"
        ) + p(
          `If a product was correctly produced using incorrect information supplied by the customer, the product may not qualify for a free refund or replacement.`,
          `A new customized product may require an additional payment.`
        ),
      },
      {
        title: "Digital Services",
        content: p(
          `Digital business profiles and other digital services may become non-refundable once substantial work has been completed or the service has been activated, subject to applicable consumer rights.`,
          `For example, a refund may generally not be available where:`
        ) + ul(
          "A digital business profile has already been created", "The profile has been activated",
          "A QR/NFC configuration has already been completed", "Custom work has already been performed",
          "The customer has substantially used the service", "The request is solely based on a change of mind"
        ) + p(
          `Where a digital service has not yet been started or delivered, ChitraTech may consider cancellation and refund requests on a case-by-case basis.`
        ),
      },
      {
        title: "Subscription Services",
        content: p(
          `If Chitra Tap introduces subscription-based services, cancellation will generally stop future renewals.`,
          `Unless otherwise stated or required by applicable law, cancelling a subscription does not automatically create a refund for a subscription period that has already been paid for.`,
          `Any refund for unused subscription time will depend on the subscription terms communicated to the customer at the time of purchase.`
        ),
      },
      {
        title: "Eligible Refund Situations",
        content: p(`A refund may be considered where:`) + ul(
          "ChitraTech cannot provide the purchased service", "A product is confirmed to be defective",
          "The wrong product was supplied", "An eligible order cannot reasonably be fulfilled",
          "A duplicate payment was made", "A refund is required under applicable law"
        ) + p(
          `Refund decisions may depend on the nature of the product, order status, customization, service status, and applicable laws.`
        ),
      },
      {
        title: "Situations Where Refunds May Not Apply",
        content: p(`Unless required by applicable law, refunds may generally not be available for:`) + ul(
          "Change of mind after customization", "Incorrect information supplied by the customer",
          "Incorrect delivery address supplied by the customer",
          "Failure to receive a package due to customer-provided information",
          "Damage caused by misuse", "Physical damage caused after delivery", "Normal wear and tear",
          "Device incompatibility", "Failure of a customer's device to support NFC",
          "Changes or failures of third-party services", "Loss or damage after successful delivery",
          "Digital services that have already been substantially provided"
        ),
      },
      {
        title: "Delivery Issues",
        content: p(
          `If an order is delayed, contact ChitraTech so we can investigate the delivery status.`,
          `If an order is returned to ChitraTech because the customer provided an incorrect address or was unavailable to receive the package, additional delivery or reshipping charges may apply.`
        ),
      },
      {
        title: "Refund Request Process",
        content: p(`To request a refund, return, or replacement, contact:`) + CONTACT +
          p(`Please provide:`) + ul(
          "Order number", "Name", "Contact details", "Product or service purchased",
          "Reason for the request", "Photographs or videos where applicable",
          "Any other information reasonably required to assess the claim"
        ),
      },
      {
        title: "Verification",
        content: p(
          `ChitraTech may need to verify the condition of a physical product before approving a refund or replacement.`,
          `We may ask customers to:`
        ) + ul(
          "Provide photographs", "Provide videos", "Return the product", "Provide order information",
          "Allow us to test the product", "Provide other reasonable evidence"
        ) + p(
          `This helps us distinguish genuine defects from damage or misuse.`
        ),
      },
      {
        title: "Refund Processing",
        content: p(
          `Once a refund is approved, ChitraTech will communicate the applicable refund method and expected processing timeframe.`,
          `Where possible, refunds will generally be made through the original payment method.`,
          `The time required for the refunded amount to appear in your account may depend on the payment provider, bank, wallet, or financial institution.`
        ),
      },
      {
        title: "Replacement",
        content: p(
          `Where appropriate, ChitraTech may offer a replacement instead of a monetary refund.`,
          `A replacement may be appropriate where:`
        ) + ul(
          "A product is defective", "A product was damaged during delivery",
          "The wrong product was supplied", "A QR/NFC configuration needs correction",
          "The issue can reasonably be resolved by replacing the product"
        ) + p(
          `The available remedy will depend on the circumstances and applicable law.`
        ),
      },
      {
        title: "Refund Abuse and Fraud",
        content: p(
          `ChitraTech reserves the right to investigate suspicious refund claims.`,
          `A refund may be refused or restricted where there is reasonable evidence of:`
        ) + ul(
          "Fraud", "False information", "Repeated abusive refund claims", "Intentional product damage",
          "Misuse", "Unauthorized payment activity"
        ) + p(
          `This does not affect any mandatory rights available to consumers under applicable law.`
        ),
      },
      {
        title: "Consumer Rights",
        content: p(
          `Nothing in this Refund &amp; Return Policy is intended to remove or restrict mandatory rights or remedies available to consumers under the applicable laws of Nepal.`,
          `Where applicable law provides a consumer with a right to a refund, replacement, repair, cancellation, or other remedy, that right continues to apply.`
        ),
      },
      {
        title: "Policy Changes",
        content: p(
          `ChitraTech may update this Refund &amp; Return Policy when our products, services, payment methods, business practices, or applicable legal requirements change.`,
          `The updated policy will be published on our website with a revised "Last Updated" date.`
        ),
      },
      {
        title: "Contact Us",
        content: p(`For refund, return, replacement, cancellation, or order-related questions:`) + CONTACT,
      },
    ],
  },
];

async function main() {
  for (const pol of policies) {
    const ref = db.collection("policies").doc(pol.slug);
    await ref.set({
      slug: pol.slug,
      title: pol.title,
      status: "published",
      version: "2.0",
      lastUpdated: new Date(LAST_UPDATED).toISOString(),
      publishedAt: FieldValue.serverTimestamp(),
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    }, { merge: true });

    // Replace existing sections
    const existing = await ref.collection("sections").get();
    const batch = db.batch();
    existing.docs.forEach((d) => batch.delete(d.ref));
    await batch.commit();

    let order = 0;
    for (const s of pol.sections) {
      const sid = `${order}-${s.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 30)}`;
      await ref.collection("sections").doc(sid).set({
        policyId: pol.slug,
        parentId: null,
        title: s.title,
        content: s.content || "",
        displayOrder: order,
      });
      order += 1;
      for (const c of s.children || []) {
        await ref.collection("sections").doc(`${sid}-sub-${order}`).set({
          policyId: pol.slug,
          parentId: sid,
          title: c.title,
          content: c.content || "",
          displayOrder: order - 1,
        });
        order += 1;
      }
    }
    console.log(`✔ seeded ${pol.slug} (${pol.sections.length} top-level sections)`);
  }
  process.exit(0);
}

main().catch((e) => { console.error(e); process.exit(1); });
