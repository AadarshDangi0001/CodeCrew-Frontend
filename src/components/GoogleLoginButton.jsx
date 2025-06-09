import { getGoogleAuthUrl } from "../utils/api";

const GoogleLoginButton = ({ text = "Continue with Google" }) => (
  <a
    href={getGoogleAuthUrl()}
    className="mb-4 flex items-center justify-center"
    style={{ textDecoration: "none" }}
  >
    <button
      type="button"
      className="flex items-center gap-2 bg-white text-black font-bold py-2 px-4 rounded hover:bg-zinc-200 transition shadow"
      style={{ width: "100%", justifyContent: "center" }}
    >
      <img
        src="https://developers.google.com/identity/images/g-logo.png"
        alt="Google"
        style={{ width: 22, height: 22 }}
      />
      {text}
    </button>
  </a>
);

export default GoogleLoginButton;