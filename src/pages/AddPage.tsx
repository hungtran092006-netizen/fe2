import {useMutation} from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import {  useNavigate } from "react-router-dom";
import { Button,Input,Form} from "antd";

type books={
    id:number,
    title:string,
    quantity:string,
    image:string,
    genre:string,
}
const AddPage=()=>{
    const navigate=useNavigate();
    const [form]=Form.useForm();
    const mutation=useMutation({
        mutationFn:async(value:books)=>{
           return await axios.post(`http://localhost:3000/books`,value);
        },
        onSuccess:()=>{
            toast.success("them thanh cong");
            navigate("/list")
        },
        onError:()=>{
            toast.error("them that bai")
        },
    });
    const onFinish=(values:books)=>{
        mutation.mutate({
            ...values,
        });
    };
    return(
        <Form form={form} layout="vertical" onFinish={onFinish}>
            <Form.Item name="title" label="ten phim"
            rules={[{required:true,message:"nhap ten"}]}
            >
              <Input/>
            </Form.Item>
            <Form.Item name="quantity" label="so luong"
            rules={[{required:true,message:"nhap ten"}]}
            >
              <Input/>
            </Form.Item>
            <Form.Item name="image" label="anh"
            rules={[{required:true,message:"nhap anh"}]}
            >
              <Input/>
            </Form.Item>
            <Form.Item name="genre" label="genre"
            rules={[{required:true,message:"nhap ten"}]}
            >
              <Input/>
            </Form.Item>
            <Button htmlType="submit">cap nhat</Button>
            </Form>
    )
}
export default AddPage;