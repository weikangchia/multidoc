import { Layout, Select } from "antd";
import { SetStateAction, useEffect, useState } from 'react';
import SwaggerUI from "swagger-ui-react";

import "./App.less";
import "swagger-ui-react/swagger-ui.css";

import { IOpenAPI } from "./model/openApi";
import { getOpenAPIs } from "./data/openApi";

const { Header, Content } = Layout;
const { Option } = Select;

const APP_NAME = 'Multidoc';

function App() {
  const openAPIs = getOpenAPIs();
  openAPIs.sort((a, b) => a.label.localeCompare(b.label));

  const [currentUrl, setCurrentUrl] = useState(openAPIs[0].url);
  const onChange = (value: SetStateAction<string>) => {
    setCurrentUrl(value);
  };

  const [pageTitle, setPageTitle] = useState(APP_NAME);
  useEffect(() => {
    if (window._env_.PAGE_TITLE) {
      setPageTitle(`${window._env_.PAGE_TITLE} - ${APP_NAME}`);
      document.title = pageTitle;
    }
  }, [pageTitle]);

  return (
    <Layout>
      <Header style={{ color: 'white' }}>{pageTitle}</Header>
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
