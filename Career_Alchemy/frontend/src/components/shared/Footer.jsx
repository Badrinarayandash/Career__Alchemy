import React from "react";

const Footer = () => {
  return (
    <>
      {/* Separator */}
      <hr className="border-t border-gray-700 my-6" />

      <footer className="bg-black py-8 text-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left Section */}
            <div>
            <h2 className="text-2xl font-bold">
                        Career<span className="text-[#F83002]">Alchemy</span>
                    </h2>
              <p className="text-sm mt-2">
                1. Based on the average number of applications submitted by a candidate using Career Alchemy compared to manual submissions. Results may vary.
              </p>
              <p className="text-sm mt-2">
                2. The names and logos of the companies referred to above are trademarks of their respective holders. No affiliation is implied.
              </p>
              <p className="text-sm mt-4">© 2025, Bold Limited. All rights reserved.</p>
            </div>

            {/* Middle Section */}
            <div className="flex flex-col space-y-2">
              <h3 className="font-semibold">Product</h3>
              <p>How it works</p>
              <p>Fraud Awareness</p>
              <h3 className="font-semibold mt-4">Company</h3>
              <p>Terms & Conditions</p>
              <p>Privacy Policy</p>
              <p>CCPA/GDPR</p>
              <p>Do not sell or share my information</p>
            </div>

            {/* Right Section */}
            <div>
              <h3 className="font-semibold">Customer Support</h3>
              <p className="mt-2"><strong>📞</strong> 750-428-0843</p>
              <p className="mt-2"><strong>📅</strong> Mon-Fri 8 AM - 8 PM CST</p>
              <p>Sat 8 AM - 5 PM CST</p>
              <p>Sun 10 AM - 6 PM CST</p>
              <p className="mt-2"><strong>📧</strong> customersupport@CareerAlchemy</p>
              <p className="mt-2">Contact us</p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
