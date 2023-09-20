import http, { IncomingMessage, ServerResponse } from "http";
import event from "events";

const port: number = 3005;

interface iData {
  name: string;
  id: number;
  phone: number;
  stack: string;
}

interface iMessage {
  message: string;
  success: boolean;
  data: null | {} | {}[];
}

const shecode: iData[] = [
  {
    name: "jemima",
    id: 1,
    phone: 7087990056,
    stack: "full-stack",
  },
  {
    name: "Joan",
    id: 2,
    phone: 7087877777,
    stack: "ful-stack",
  },
];

const MyServer = http.createServer(
  (req: IncomingMessage, res: ServerResponse<IncomingMessage>) => {
    res.setHeader("Content-Type", "Application/Json");
    const { method, url } = req;
    let status: number = 404;
    let response: iMessage = {
      message: "failed",
      success: false,
      data: null,
    };
    const container: any = [];
    req
      .on("data", (chunk: any) => {
        container.push(chunk);
      })
      .on("end", () => {
        //GET Method
        if (url === "/" && method === "GET") {
          status = 200;
          response.message = "All set 08 data gotten";
          response.success = true;
          response.data = shecode;
          res.write(JSON.stringify({ response, status }));
          res.end();
        }
        // post method
        if (url === "/" && method === "POST") {
          status = 201;
          const Body = JSON.parse(container);
          shecode.push(Body);
          response.message = "SUCCESSFULLY ADDED";
          response.success = true;
          response.data = shecode;
          res.write(JSON.stringify({ response, status }));
          res.end();
        }
      });
  }
);

MyServer.listen(port, () => {
  console.log(`listening to port:${port}`);
});
