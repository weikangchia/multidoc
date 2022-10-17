declare global {
  interface Window {
    '_env_': {
      OPEN_APIS: any,
      PAGE_TITLE: string
    };
  }
}

export default global;