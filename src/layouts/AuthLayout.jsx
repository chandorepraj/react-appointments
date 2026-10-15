import { useEffect } from "react";

function AuthLayout({ children }) {
  useEffect(() => {
    // Load Sneat authentication CSS
    const link = document.createElement("link");

    link.rel = "stylesheet";
    link.href = "/assets/vendor/css/pages/page-auth.css";
    link.id = "page-auth-css";

    document.head.appendChild(link);

    // Remove authentication CSS when leaving auth pages
    return () => {
      const existingLink = document.getElementById("page-auth-css");

      if (existingLink) {
        existingLink.remove();
      }
    };
  }, []);

  return <>{children}</>;
}

export default AuthLayout;
