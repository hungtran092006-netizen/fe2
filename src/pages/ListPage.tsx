import { Table,Image,Spin,Button,Popconfirm } from "antd";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

type movies={
  id:number,
  title:string,
  director:string,
  year:string,
  poster:string,
  dercription:string,
}
const ListPage=()=>{
 
  const {data,isLoading,isError}=useQuery<movies[]>({
    queryKey:["getAllmovies"],
    queryFn:async()=>{
      const res =await axios.get("http://localhost:3000/movies");
      return res.data;
    },
  });

  const qc=useQueryClient();
  const {mutate}=useMutation({
    mutationFn:async(id:number)=>{
      await axios.delete(`http://localhost:3000/movies/${id}`);
    },
  
  onSuccess:()=>{
    toast.success("xoa phim thanh cong");
    qc.invalidateQueries({queryKey:["getAllmovies"]});
  },
});
const columns=[
  {
    title:"ID",
    dataIndex:"id",
  },
  {
    title:"ten phim",
    dataIndex:"title"
  },
  {
    title:"the loai",
    dataIndex:"director"
  },
  {
    title:"nam",
    dataIndex:"year"
  },
  {
    title:"anh",
    dataIndex:"poster",
    render: (image: string) => <Image width={100} src={image} />
  },
  {
    title:"mo ta",
    dataIndex:"description"
  },
   {
      title: "Action",
     render: (_: any, record: any) => (
  <>
    <Popconfirm
      title="xoa truyen"
      description="xoa truyen khong?"
      okText="co"
      cancelText="khong"
      onConfirm={() => mutate(record.id)}
    >
      <Button danger>Delete</Button>
    </Popconfirm>

    <Button type="primary" style={{ marginLeft: 8 }}>
      <Link to={`/edit/${record.id}`}>Edit</Link>
    </Button>
  </>
),
    },
];
    if (isLoading) return <Spin />;
    if (isError) return <p>Lỗi khi tải dữ liệu</p>;


  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Danh sách</h1>

      <div className="overflow-x-auto">
        <Table columns={columns} dataSource={data ||[]} rowKey="id"  />
      </div>
    </div>
  );
}

export default ListPage;
