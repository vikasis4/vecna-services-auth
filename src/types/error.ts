declare global {
  interface Error {
    winner?: string;
    data?: any;
  }
}

export default {};
