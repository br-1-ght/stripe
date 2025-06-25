import '../styles/Companies.css';

const CompaniesSection = () => {
  const companies = [
    { name: "Amazon", icon:<h2>AMAZON</h2> },
    { name: "Google", icon: <h2>GOGGLE</h2> },
    { name: "Microsoft", icon:<h2>MICROSOFT</h2>},
    { name: "Shopify", icon: <h2>SHOPIFY</h2> },
    { name: "Slack", icon: <h2>SLACK</h2> },
    { name: "Uber", icon: <h2>UBER</h2> }
  ];

  return (
    <section className="companies-section">
      <div className="companies-container">
        <p className="companies-text">
          Trusted by companies of all sizes
        </p>
        <div className="companies-grid">
          {companies.map((company, index) => (
            <div 
              key={index} 
              className="company-item"
            >
              {company.icon}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CompaniesSection;