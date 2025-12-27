export default function Cancel() {
  return (
    <div className="cancel-page">
      <div className="cancel-card">
        <div className="cancel-icon">!</div>

        <h1 className="cancel-title">Payment Not Completed</h1>

        <p className="cancel-text">
          Your payment was cancelled or not completed. No charges were made.
        </p>

        <div className="cancel-info">
          <p>• You can try again anytime</p>
          <p>• Check your payment details</p>
          <p>• Contact support if the issue persists</p>
        </div>

        <div className="cancel-actions">
          <button
            className="retry-button"
            onClick={() => (window.location.href = "/checkout")}
          >
            Try Again
          </button>

          <button
            className="home-button"
            onClick={() => (window.location.href = "/")}
          >
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
}
