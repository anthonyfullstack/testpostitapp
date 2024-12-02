import user from "../Images/user.png";

import { useSelector } from "react-redux";

const User = () => {
  const email = useSelector((state) => state.users.user.email);
  const name = useSelector((state) => state.users.user.name);

  return (
    <div>
      <img src={user} className="userImage" />
      <p>
        {name}
        <br />
        {email}
      </p>
    </div>
  );
};

export default User;
