import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useQuery,useMutation,useQueryClient } from "@tanstack/react-query";
import { Table,Image,Spin,Button,Popconfirm} from "antd";

type books={
    id :number,
    title:string,
    quantity:string,
    image:string,
    genre:string,
}
const ListPage=()=>{
    const {data}= useQuery<books[]>({
        queryKey:["getallbook"],
        queryFn:async()=>{
             const res=await axios.get("http://localhost:3000/books");
            return res.data;
        },
    });
    const qc=useQueryClient();
    const {mutate}=useMutation({
        mutationFn:async(id:number)=>{
            await axios.delete(`http://localhost:3000/books/${id}`);
        },
        onSuccess:()=>{
            toast.success("xoa thanh cong");
            qc.invalidateQueries({queryKey:["getallbook"]});
        },
    });
  const columns=[
    {
        title:"ID",
        dataIndex:"id",
    },
     {
        title:"ten",
        dataIndex:"title",
    },
     {
        title:"so luong",
        dataIndex:"quantity",
    },
     {
        title:"anh",
        dataIndex:"image",
        render:(image:string)=><Image width={100} src={image}/>
    },
     {
        title:"genre",
        dataIndex:"genre",
    },
    {
        title:"action",
        render:(_:any,record:any)=>(
            <>
         <Popconfirm
         title="xoa truyen"
         description="xoa truyen k"
         okText="ok"
         cancelText="ko"
         onConfirm={()=>mutate(record.id)}
         >
          <Button danger>delete</Button>
         </Popconfirm>
           <Button type="primary" style={{marginLeft:8}}>
          <Link to={`/edit/${record.id}`}>sua</Link>
         </Button>
            </>
        )
    }
  ];
  return(
    <div className="">
        <h1 className="">danh sach</h1>
        <div className="">
            <Table columns={columns} dataSource={data ||[]} rowKey="id"/>
        </div>
    </div>
  )
}
export default ListPage;