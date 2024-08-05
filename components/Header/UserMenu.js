import Image from "next/image";
import Link from "next/link";

import avatar from "../../public/images/team/team-01sm.jpg";
import UserMenuItems from "./HeaderProps/UserMenuItem";
import { useRouter } from "next/navigation";

const UserMenu = ({userInfo}) => {
  const router=useRouter();

  const handleLogout = () => {
    localStorage.removeItem('isAuth');
    localStorage.removeItem('pgp_user');
    router.replace("/");
  };

  return (
    <>
      <div className="inner">
        <div className="rbt-admin-profile">
          <div className="admin-thumbnail">
            <Image src={avatar} width={31} height={31} alt="User Images" />
          </div>
          <div className="admin-info">
            <span className="name">{userInfo?.name}</span>
            <Link
              className="rbt-btn-link color-primary"
              href="#"
            >
              View Profile
            </Link>
          </div>
        </div>
        {/* <UserMenuItems parentClass="user-list-wrapper user-nav" /> */}
        <hr className="mt--10 mb--10" />
        <ul className="user-list-wrapper user-nav">
          {/* <li>
            <Link href="/privacy-policy">
              <i className="fa-solid fa-comments-question"></i>
              <span>Help Center</span>
            </Link>
          </li> */}
          <li>
            <Link href="/">
              <i className="fa-sharp fa-solid fa-gears"></i>
              <span>Settings</span>
            </Link>
          </li>
        </ul>
        <hr className="mt--10 mb--10" />
        <ul className="user-list-wrapper">
          <li>
            <span href="#" onClick={() => handleLogout()} prefetch={false}>
              <i className="fa-sharp fa-solid fa-right-to-bracket"></i>
              <span>Logout</span>
            </span>
          </li>
        </ul>
      </div>
    </>
  );
};

export default UserMenu;
