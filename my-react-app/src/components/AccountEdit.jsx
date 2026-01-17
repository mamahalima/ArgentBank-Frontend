import React from 'react';

function AccountEdit({ title, amount, description }) {
  return (
    <section className="account-edit">
      <div className="account-content">
        <h3 className="account-title">{title}</h3>
        <p className="amount-edit">{amount}</p>
        <p className="description-edit">{description}</p>
      </div>
      <div className="account-content-wrapper cta">
        <img
          src="/assets/arrow-right.png"
          className="arrow"
          alt="arrow"
        />
      </div>
    </section>
  );
}

export default AccountEdit;
