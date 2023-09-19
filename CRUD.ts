import http, { IncomingMessage, ServerResponse } from "http";
import event from "events";

const port: number = 2002;

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

const mySet: iData[] = [
  {
    name: "sean",
    id: 1,
    phone: 80236789239,
    stack: "full",
  },
  {
    name: "Price",
    id: 2,
    phone: 8078686869,
    stack: "full-stack",
  },
  {
    name: "Delight",
    id: 4,
    phone: 90776667789,
    stack: "ful-stack",
  },
];

const App = http.createServer(
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
          response.data = mySet;
          res.write(JSON.stringify({ response, status }));
          res.end();
        }
        // post method
        if (url === "/" && method === "POST") {
          status = 201;
          const Body = JSON.parse(container);
          mySet.push(Body);
          response.message = "SUCCESSFULLY ADDED";
          response.success = true;
          response.data = mySet;
          res.write(JSON.stringify({ response, status }));
          res.end();
        }
      });
  }
);

App.listen(port, () => {
  console.log(`listening to port:${port}`);
});
