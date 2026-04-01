import { Link } from "react-router-dom";
import { Button } from "antd";
import {useAuthStore} from "../stores/useAuthStore";

export default function Navbar() {
  const { user, logout } = useAuthStore();

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

        {/* User */}
        <div className="hidden md:flex items-center space-x-4">
          
          {/* Nếu chưa login */}
          {!user && (
            <>
            <Link to="/register" className="hover:text-gray-200">
                Đăng ký
              </Link>
              <Link to="/login" className="hover:text-gray-200">
                Đăng nhập
              </Link>
              
              <span>Chua dang nhap</span>
            </>
          )}

          {/* Nếu đã login */}
          {user && (
            <>
              <span className="text-green-200">Đã đăng nhập</span>
              {user && <span>{user.email}</span>}
              <span>{user.name}</span>

              <Button danger onClick={logout}>
                Logout
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}