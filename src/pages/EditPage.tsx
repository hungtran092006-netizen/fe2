import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Input, Form } from "antd";
import { useEffect } from "react";

type books = {
    id: number,
    title: string,
    quantity: string,
    image: string,
    genre: string,
}
const EditPage = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const { id } = useParams();
    const queryClient = useQueryClient();
    const { data } = useQuery({
        queryKey: ["books", id],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:3000/books/${id}`)
            return res.data;
        },
    });
    useEffect(() => {
        if (data) {
            form.setFieldsValue(data);
        }
    }, [data, form]);

    const mutation = useMutation({
        mutationFn: async (values: any) => {
            return await axios.put(`http://localhost:3000/books/${id}`,values);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["getallbook"] });
            toast.success("sua thanh cong");
            navigate("/list")
        },
        onError: () => {
            toast.error("them that bai")
        },
    });
    const onFinish = (values: any) => {
        mutation.mutate({
            ...values,
        });
    };
    return (
        <Form form={form} layout="vertical" onFinish={onFinish}>
            <Form.Item name="title" label="ten phim"
                rules={[{ required: true, message: "nhap ten" }]}
            >

                <Input />
            </Form.Item>
            <Form.Item name="quantity" label="so luong"
                rules={[{ required: true, message: "nhap so luong" }]}>
                <Input />
            </Form.Item>
            <Form.Item name="image" label="anh"
                rules={[{ required: true, message: "nhap anh" }]}>
                <Input />
            </Form.Item>
            <Form.Item name="genre" label="genre"
                rules={[{ required: true, message: "nhap the loai" }]}
            >
                <Input />
            </Form.Item>
            <Button htmlType="submit">cap nhat</Button>
        </Form>
    )
}
export default EditPage;