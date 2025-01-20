export default function LegalNotice() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-24">
      <div className="flex flex-col items-start">
        <h1 className="text-3xl font-bold text-white mb-8">Legal Notice (Impressum)</h1>
        
        <section className="space-y-8 text-gray-300 w-full">
          <div>
            <h2 className="text-xl font-semibold text-white mb-3">Information according to § 5 TMG</h2>
            <div className="space-y-1">
              <p className="font-medium text-white">Website Owner:</p>
              <p>Killian Fischer</p>
              <p>Weststraße 126D</p>
              <p>52134 Herzogenrath</p>
              <p>Germany</p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-3">Contact Information</h2>
            <div className="space-y-1">
              <p>Email: killian.fischer2@gmail.com</p>
              <p>Phone: 015785509030</p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-3">Responsible for Content</h2>
            <div className="space-y-1">
              <p>Killian Fischer</p>
              <p className="text-sm text-gray-400">(According to § 55 Abs. 2 RStV)</p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-3">VAT ID</h2>
            <p>Not applicable (as this is a personal project without a registered company).</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-3">Dispute Resolution</h2>
            <div className="space-y-3">
              <p>
                The European Commission provides a platform for online dispute resolution (ODR):{' '}
                <a 
                  href="https://ec.europa.eu/consumers/odr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cherry-500 hover:text-cherry-400 transition-colors"
                >
                  https://ec.europa.eu/consumers/odr/
                </a>
              </p>
              <p>
                I am not obligated to participate in dispute resolution procedures before a 
                consumer arbitration board and do not voluntarily agree to do so.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-3">Copyright</h2>
            <p>
              All content published on this website is protected by copyright. 
              Reproduction, modification, distribution, or any other use requires 
              prior written permission.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
} 