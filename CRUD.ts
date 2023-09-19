import http, { IncomingMessage, ServerResponse } from "http";
import event from "events";

const port: number = 4000;

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

const set08: iData[] = [
  {
    name: "Wisdom",
    id: 1,
    phone: 8132329868,
    stack: "full-stack",
  },
  {
    name: "Prince",
    id: 2,
    phone: 81088392868,
    stack: "full-stack",
  },
  {
    name: "Isaac",
    id: 3,
    phone: 8137088076,
    stack: "full-stack",
  },
  {
    name: "Daniel",
    id: 4,
    phone: 9045583738,
    stack: "full-stack",
  },
  {
    name: "Emmanuel",
    id: 5,
    phone: 8012384895,
    stack: "full-stack",
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
        if (url === "/" && method === "GET") {
          status = 200;
          response.message = "All set08 data gotten";
          response.success = true;
          response.data = set08;
          res.write(JSON.stringify({ response, status }));
          res.end();
        }

        //POST Mtho
        if (url === "/" && method === "POST") {
          status = 201;
          const Body = JSON.parse(container);
          set08.push(Body);
          response.message = "the set08 data was successfully added";
          response.success = true;
          response.data = set08;
          res.write(JSON.stringify({ response, status }));
          res.end();
        }
      });
  }
);

App.listen(port, () => {
  console.log(`Listening to port, ${port}`);
});
