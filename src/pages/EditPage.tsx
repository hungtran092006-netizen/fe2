import { Button, Form, Input, message, Spin ,Select} from "antd";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditPage() {
  const [form] = Form.useForm();
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["movies", id],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:3000/movies/${id}`);
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
      return axios.put(`http://localhost:3000/movies/${id}`, values);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllmovies"] });
      message.success("sua thành công");
      navigate("/list");
    },
  });

  const onFinish = (values: any) => {
    mutation.mutate(values);
  };

  if (isLoading) return <Spin />;

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