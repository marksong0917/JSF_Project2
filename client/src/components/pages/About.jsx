import React from "react";
import { Container } from "react-bootstrap";

function About() {
  return (
    <Container class="my-5">
      <header className="jumbotron">
        <h1>About the Website</h1>
      </header>

      <div>
        <p>
          This website is a community data center, it provides a place where
          community users are able to post anything event like, for others to
          see.
        </p>
      </div>
    </Container>
  );
}

export default About;
