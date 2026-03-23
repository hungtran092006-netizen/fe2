import { Button, Input, Form,  Select } from "antd";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
type movies={
 
  title:string,
  director:string,
  year:string,
  poster:string,
  description:string,
}

function AddPage() {
  const navigate=useNavigate();
  const [form] = Form.useForm();
  const mutation=useMutation({
    mutationFn:async(value:movies)=>{
      return await axios.post("http://localhost:3000/movies",value);
    },
    onSuccess:()=>{
      toast.success("them thanh cong");
      navigate("/list")
    },
    onError:()=>{
      toast.error("them that bai");
    },
  });
  const onFinish=(values:movies)=>{
    mutation.mutate({
      ...values,

    });
  };
  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Form.Item name="title" label="Tên phim"
      rules={[{ required: true, message: "Nhập ten phim" }]}
      >
        
        <Input />
      </Form.Item>

    <Form.Item label="director" name="director">
  <Select
    options={[
      { label: "marvel", value: "marvel" },
      { label: "hihi", value: "hihi" },
      { label: "hehe", value: "hehe" },
    ]}
  />
</Form.Item>

         <Form.Item label="year" name="year">
          <Input placeholder="nam" />
        </Form.Item>

         <Form.Item label="poster" name="poster">
          <Input placeholder="anh" />
        </Form.Item>

         <Form.Item label="description" name="description">
          <Input placeholder="mo ta"/>
        </Form.Item>

      <Button type="primary" htmlType="submit" loading={mutation.isPending}>
        Cập nhật
      </Button>
    </Form>
  );
}

export default AddPage;
