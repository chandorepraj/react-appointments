import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleGoBack = () => {
    navigate(token ? "/dashboard" : "/login", { replace: true });
  };

  return (
    <div className="container-xxl container-p-y">
      <div className="misc-wrapper text-center">
        <h1 className="mb-2 mx-2">404</h1>

        <h4 className="mb-2">Page Not Found!</h4>

        <p className="mb-4 mx-2">
          Sorry, the page you are looking for doesn't exist or may have
          been moved.
        </p>

        <button
          type="button"
          className="btn btn-primary"
          onClick={handleGoBack}
        >
          Back to Home
        </button>

        <div className="mt-4">
          <img
            src="/assets/img/illustrations/page-misc-error-light.png"
            alt="Page not found"
            className="img-fluid"
            style={{ maxWidth: "400px" }}
          />
        </div>
      </div>
    </div>
  );
}

export default NotFound;