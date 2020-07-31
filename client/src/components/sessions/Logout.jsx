import React, { useState, useEffect } from "react";
import { Form, Container } from "react-bootstrap";
import Axios from "axios";
import { Redirect } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const Logout = ({ setUser }) => {
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const resp = await Axios.get("/api/logout");

        if (resp.status === 200) {
          setUser(false);
          toast("You have sucessfully logged out", {
            type: toast.TYPE.SUCCESS,
          });
          setRedirect(true);
        }
      } catch (error) {
        toast("There was an error while attempting to log you out", {
          type: toast.TYPE.ERROR,
        });
      }
    })();
  }, []);
  if (redirect) return <Redirect to="/datas" />;
  return null;
};

export default Logout;
