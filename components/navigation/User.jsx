import Link from 'next/link';

/* Components */
// import DarkModeToggle from "../DarkModeToggle";

const User = ({ props }) => {
  const { user } = props;

  return (
    <p className="account">
      {(user && (
        <p>
          Giriş yaptın, dilersen
          <Link href={{ pathname: '/user/logout' }}>
            <a>buraya</a>
          </Link>
          tıklayarak çıkış yapabilirsin
        </p>
      )) || (
          <>
            Hesabın var mı?
            <Link href={{ pathname: '/user/login' }}>
              <a>Giriş Yap</a>
            </Link>
          ya da
            <Link href={{ pathname: '/user/register' }}>
              <a>Kayıt ol</a>
            </Link>
          </>
        )}
    </p>
  );
};

export default User;
