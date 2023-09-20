import http, { IncomingMessage, ServerResponse } from "http";
import event from "events";

const port: number = 3006;

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
    name: "victor",
    id: 1,
    phone: 708402890056,
    stack: "full-stack",
  },
  {
    name: "habib",
    id: 2,
    phone: 7081111101,
    stack: "ful-stack",
  },
  {
    name: "dennis",
    id: 3,
    phone: 708402856,
    stack: "full-stack",
  },
  {
    name: "samuel",
    id: 4,
    phone: 7912345634,
    stack: "ful-stack",
  },
];

const server = http.createServer(
  (req: IncomingMessage, res: ServerResponse<IncomingMessage>) => {
    res.setHeader("Content-Type", "Apllication/JSon ");
    const { method, url } = req;
    let status: Number = 404;
    let response: iMessage = {
      message: "failed",
      success: false,
      data: null,
    };
    const container: any = [];
    req
      .on("data", (Chunk: any) => {
        container.push(Chunk);
      })
      .on("end", () => {
        //GET Method
        if (url === "/" && method === "GET") {
          status = 200;
          response.message = "Successful";
          (response.success = true),
            (response.data = MyTeam),
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

server.listen(port, () => {
  console.log(`the port is listening to port:${port}`);
});
