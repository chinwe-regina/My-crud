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

const MyTeam: iData[] = [
  {
    name: "samual",
    id: 1,
    phone: 708402890056,
    stack: "full-stack",
  },
  {
    name: "paul",
    id: 2,
    phone: 7081111101,
    stack: "ful-stack",
  },
  {
    name: "magret",
    id: 3,
    phone: 708402856,
    stack: "full-stack",
  },
  {
    name: "matthew",
    id: 4,
    phone: 7912345634,
    stack: "ful-stack",
  },
];

const MyApp = http.createServer(
  (req: IncomingMessage, res: ServerResponse<IncomingMessage>) => {
    res.setHeader("Content-type", "Application/Json");
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
          response.message = "All data successfully obtained";
          response.success = true;
          response.data = MyTeam;
          res.write(JSON.stringify({ response, status }));
          res.end();
        }
        //POST Method
        if (url === "/" && method === "POST") {
          status = 201;
          const Body = JSON.parse(container);
          MyTeam.push(Body);
          response.message = "Added";
          response.success = true;
          response.data = MyTeam;
          res.write(JSON.stringify({ response, status }));
          res.end();
        }
      });
  }
);

MyApp.listen(port, () => {
  console.log(`the port is listening to port:${port}`);
});
