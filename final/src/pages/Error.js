import { Link } from "react-router-dom";

export default function Error() {
  return (
    <h1>
      Oops, something went wrong. Check the link again or try logging in again?
      <Link to="../logout" title="Login" />
    </h1>
  );
}
