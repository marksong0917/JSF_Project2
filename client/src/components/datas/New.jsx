import React, { useState } from "react";
import { Form, Container } from "react-bootstrap";
import Axios from "axios";
import { Redirect } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const New = function () {
  const [inputs, setInputs] = useState({
    title: "",
    content: "",
    status: "Ongoing",
  });

  const [redirect, setRedirect] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const resp = await Axios.post("/api/datas", inputs);

      if (resp.status === 200) {
        toast("You have login in successfully", {
          type: toast.TYPE.SUCCESS,
        });
        setRedirect(true);
      } else {
        toast("There was an issue creating the data post.", {
          type: toast.TYPE.ERROR,
        });
      }
    } catch (error) {
      toast("There was an issue creating the data post.", {
        type: toast.TYPE.ERROR,
      });
    }
  };

  const handleInputChange = async (event) => {
    event.persist();

    const { name, value } = event.target;

    setInputs((inputs) => ({
      ...inputs,
      [name]: value,
    }));
  };

  if (redirect) return <Redirect to="/datas" />;

  return (
    <Container className="my-5">
      <header>
        <h1>New Data Post</h1>
      </header>

      <hr />

      <div>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>
              Title:
              <Form.Control
                name="title"
                onChange={handleInputChange}
                value={inputs.title}
              />
            </Form.Label>
          </Form.Group>

          <Form.Group>
            <Form.Label>
              Title:
              <Form.Control
                as="textarea"
                name="content"
                onChange={handleInputChange}
                value={inputs.content}
              />
            </Form.Label>
          </Form.Group>

          <Form.Group>
            <Form.Label>
              Status:
              <Form.Control
                as="select"
                name="status"
                onChange={handleInputChange}
                defaultValue={inputs.status || "Ongoing"}
              >
                <option value="Ongoing">Ongoing</option>
                <option value="Finish">Finish</option>
              </Form.Control>
            </Form.Label>
          </Form.Group>

          <Form.Group>
            <button type="submit" className="btn-primary">
              Create
            </button>
          </Form.Group>
        </Form>
      </div>
    </Container>
  );
};

export default New;
