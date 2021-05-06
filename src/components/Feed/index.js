import React from 'react';
import "./index.css";

const Title = ({ children }) => {
  return (
    <div className="Title">
      {children}
    </div>
  )
}

const Content = ({ children }) => {
  return (
    <div className="Content_Feed">
      {children}
    </div>
  )
}

export default function Feed({ title, children }) {
  return (
    <div className="Feed">
      <Title>
        Resultado da pesquisa "{title}"
      </Title>
      <Content>
        {children}
      </Content>
    </div>
  );
}