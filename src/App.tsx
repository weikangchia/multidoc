import { Layout, Select } from "antd";
import { SetStateAction, useEffect, useState } from 'react';
import SwaggerUI from "swagger-ui-react";

import "./App.less";
import "swagger-ui-react/swagger-ui.css";

import { IOpenAPI } from "./model/openApi";
import { getOpenAPIs } from "./data/openApi";

const { Header, Content } = Layout;
const { Option } = Select;

function App() {
  const openAPIs = getOpenAPIs();
  openAPIs.sort((a, b) => a.label.localeCompare(b.label));

  const [currentUrl, setCurrentUrl] = useState(openAPIs[0].url);
  const onChange = (value: SetStateAction<string>) => {
    setCurrentUrl(value);
  };

  useEffect(() => {
    if (window._env_.PAGE_TITLE) {
      document.title = window._env_.PAGE_TITLE;
    } else {
      document.title = 'Multidoc';
    }
  }, []);

  return (
    <Layout>
      <Header style={{ color: 'white' }}>MultiDoc</Header>
      <Content>
        <Select defaultValue={openAPIs[0].label} style={{ width: '100%' }} onChange={onChange}>
          {openAPIs.map((openapi: IOpenAPI) => (
            <Option key={openapi.service} value={openapi.url}>
              {openapi.label}
            </Option>
          ))}
        </Select>
        <SwaggerUI url={currentUrl} />
      </Content>
    </Layout>
  );
}

export default App;
