import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { useContext } from "react";
import { Avatar, Button } from "antd";

export default function Navbar() {
  const context = useContext(UserContext);
  if (!context) return null;

  const { user, setUser } = context;

  const handleLogin = () => {
    setUser({
      name: "hung09",
      avatar: "https://i.pravatar.cc/40",
    });
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <nav className="bg-blue-600 text-white shadow">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="text-xl font-semibold">
          <strong>WEB2091 App</strong>
        </Link>

        {/* Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="hover:text-gray-200">
            Trang chủ
          </Link>
          <Link to="/list" className="hover:text-gray-200">
            Danh sách
          </Link>
          <Link to="/add" className="hover:text-gray-200">
            Thêm mới
          </Link>
        </div>
        <div className="hidden md:flex items-center space-x-4">
            <Button>signup</Button>
          {user?.avatar && (
            <Avatar src={user.avatar}></Avatar>
          )}
          <span>{user?.name ?? "Guest"}</span>
          {!user ? (
            <Button onClick={handleLogin}>signin</Button>
          ) : (
            <Button danger onClick={handleLogout}>
              Logout
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}