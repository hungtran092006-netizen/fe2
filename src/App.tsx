import { Toaster } from "react-hot-toast";
import { Routes, Route } from "react-router-dom";
import AddPage from "./pages/AddPage";
import EditPage from "./pages/EditPage";
import ListPage from "./pages/ListPage";
import Login from "./pages/Login";
import Navbar from "./compoments/Header";
import { Layout } from "antd";
import Register from "./pages/register";

const { Content } = Layout;

function App() {
  return (
    <>
      {/* Header */}
      <Navbar />

      {/* MAIN CONTENT */}
      <div className="max-w-6xl mx-auto mt-10 px-4">
        <h1 className="text-4xl font-bold mb-6 text-center">
          Chào mừng đến với WEB2091
        </h1>

        <Layout>
          <Content style={{ padding: 20 }}>
            <Routes>
              {/* Trang chủ */}
              <Route path="/" element={<h2>Trang chủ</h2>} />

              {/* CRUD */}
              <Route path="/list" element={<ListPage />} />
              <Route path="/add" element={<AddPage />} />
              <Route path="/edit/:id" element={<EditPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </Content>
        </Layout>
      </div>

      <Toaster />
    </>
  );
}

export default App;