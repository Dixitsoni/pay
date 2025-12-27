export default function Success() {
  return (
    <div className="success-page">
      <div className="success-card">
        <div className="success-icon">✓</div>

        <h1 className="success-title">Payment Successful</h1>

        <p className="success-text">
          Thank you! Your payment has been completed successfully.
        </p>

        <div className="success-info">
          <p>📧 A confirmation email has been sent to you.</p>
          <p>⏱️ Your order is being processed.</p>
        </div>

        <button
          className="success-button"
          onClick={() => (window.location.href = "/")}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
