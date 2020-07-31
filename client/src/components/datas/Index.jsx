import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Index = function ({ user }) {
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    (async () => {
      await getDatas();
    })();
  }, []);

  const getDatas = async () => {
    const datasResp = await Axios.get("/api/datas");
    if (datasResp.status === 200) setDatas(datasResp.data);
  };

  const deleteData = async (data) => {
    try {
      const resp = await Axios.post("/api/datas/delete", {
        id: data._id,
      });

      if (resp.status === 200)
        toast("the data was deleted sucessfully", { type: toast.TYPE.SUCCESS });
      await getDatas();
    } catch (error) {
      toast("there was an error deleting the data", {
        type: toast.TYPE.ERROR,
      });
    }
  };

  return (
    <Container className="my-5">
      <header>
        <h1>Data Archive</h1>
      </header>
      <hr />
      <div className="content">
        {datas &&
          datas.map((data, i) => (
            <div key={i} className="card my-3">
              <div className="card-header clearfix">
                <div className="float-left">
                  <h5 className="card-title">{data.title}</h5>
                  {data.user ? <small>~{data.user.fullname} </small> : null}
                </div>
              </div>

              <div className="float-right">
                <small>{data.updatedAt}</small>
              </div>
              <div className="card-body">
                <p className="card-text">{data.synopsis}</p>
              </div>

              {user ? (
                <div className="card-footer">
                  <Link
                    to={{
                      pathname: "datas/edit",
                      state: {
                        id: data._id,
                      },
                    }}
                  >
                    <i className="fa fa-edit"></i>
                  </Link>

                  <button type="button" onClick={() => deleteData(data)}>
                    <i className="fa fa-trash"></i>
                  </button>
                </div>
              ) : null}
            </div>
          ))}
      </div>
    </Container>
  );
};

export default Index;
