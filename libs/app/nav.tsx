import React, { useContext } from "react";
import { useRouter } from "next/router";
import { GlobalContext } from "../../e2e/globalContext";

const nav: React.FC = () => {
  const router = useRouter();
  const { loginState, setLoginState, createNotification } =
    useContext(GlobalContext);

  return (
    <nav id="globalNav">
      <div id="LogoContainer" onClick={() => router.push("/")}>
        <svg
          id="CoveryLogo"
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="100" cy="100" r="100" fill="white" />
          <rect
            x="61.9306"
            y="136.487"
            width="34"
            height="86"
            rx="11"
            transform="rotate(180 61.9306 136.487)"
            fill="#5EB2B6"
          />
          <rect
            x="43.7464"
            y="86.2346"
            width="34"
            height="73.5531"
            rx="11"
            transform="rotate(-125.505 43.7464 86.2346)"
            fill="#5EB2B6"
          />
          <path
            d="M84.6711 129.208C87.651 131.261 89.4306 134.648 89.4306 138.266L89.4306 161.487V161.487C89.4306 165.585 84.8927 168.056 81.4498 165.833L34.5248 135.533C29.2853 132.15 27.9038 125.092 31.4811 119.983L38.1707 110.429C41.6365 105.479 48.446 104.252 53.4219 107.68L84.6711 129.208Z"
            fill="#5EB2B6"
          />
          <path
            d="M118.109 66.8311C121.355 68.5006 125.218 68.4512 128.42 66.6991L143.025 58.7083C143.295 58.5609 143.578 58.4398 143.871 58.3466V58.3466C147.866 57.0755 148.406 51.6442 144.741 49.6102L90.6298 19.5874C85.1445 16.5439 78.2286 18.6967 75.4398 24.3158L72.1277 30.9892C69.4543 36.3758 71.6021 42.9109 76.9498 45.6614L118.109 66.8311Z"
            fill="#5EB2B6"
          />
          <path
            d="M83.0555 78.1906C85.7218 75.8512 89.6102 75.5469 92.608 77.4431L139.659 107.204C143.397 109.568 144.508 114.517 142.138 118.251L134.224 130.721C131.854 134.456 126.903 135.559 123.172 133.183L79.0958 105.115C76.7999 103.653 75.4049 101.124 75.393 98.4021L75.3501 88.6099C75.34 86.2945 76.3335 84.0883 78.0739 82.5613L83.0555 78.1906Z"
            fill="#FFA336"
          />
          <path
            d="M120.391 181.615C116.993 180.595 114.673 177.46 114.69 173.913L114.963 118.24C114.985 113.817 118.591 110.251 123.014 110.28L137.783 110.374C142.206 110.402 145.767 114.015 145.732 118.438L145.316 170.69C145.294 173.412 143.89 175.936 141.589 177.39L133.31 182.62C131.353 183.857 128.956 184.185 126.738 183.519L120.391 181.615Z"
            fill="#FFA336"
          />
          <path
            d="M182.918 89.3034C184.226 92.6007 183.206 96.3654 180.413 98.5519L136.575 132.871C133.092 135.597 128.058 134.98 125.337 131.494L116.25 119.85C113.529 116.364 114.154 111.33 117.645 108.614L158.888 76.5288C161.037 74.8575 163.888 74.3932 166.455 75.2963L175.693 78.5456C177.877 79.3139 179.621 80.9908 180.475 83.1431L182.918 89.3034Z"
            fill="#FFA336"
          />
        </svg>
        <h5>Covery</h5>
      </div>
      <ul>
        <li>
          <h4>About</h4>
        </li>
        <li onClick={() => router.push("/searchEvents")}>
          <h4>Search</h4>
        </li>

        {loginState ? (
          <>
            <li onClick={() => router.push("/dashboard")}>
              <h4>Dashboard</h4>
            </li>
            <li
              onClick={() => {
                createNotification(
                  "info",
                  "Logging Out",
                  "Please wait a moment..."
                );
                setTimeout(() => {
                  setLoginState(false);
                  router.push("/");
                  createNotification(
                    "success",
                    "Logged Out",
                    "You have logged out of your account"
                  );
                }, 1500);
              }}
            >
              <h4>Log Out</h4>
            </li>
          </>
        ) : (
          <li onClick={() => router.push("/logRegister")}>
            <h4>Login / Register</h4>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default nav;
