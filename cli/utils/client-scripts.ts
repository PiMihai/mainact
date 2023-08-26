export const wsClientScript = `
  (() => {
    let socket, reconnectionTimerId;
    const requestUrl = \`\${window.location.origin.replace("http", "ws")}/refresh\`
    const log = (message) => {
      console.info("[refresh] ", message);
    }
    const refresh = () => {
      window.location.reload();
    }
    const connect = (callback) => {
      if (socket) {
        socket.close();
      }
      socket = new WebSocket(requestUrl);
      socket.addEventListener("open", callback);
      socket.addEventListener("message", (event) => {
        if (event.data === "refresh") {
          log("refreshing...");
          refresh();
        }
      });
      socket.addEventListener("close", () => {
        log("connection lost - reconnecting...");

        clearTimeout(reconnectionTimerId);

        reconnectionTimerId = setTimeout(() => {
          connect(refresh);
        }, 1000);
      });
    }

    connect();
  })();
`;

export const createReactRenderScript = (data: unknown) => `
    import { createRoot } from "https://esm.sh/react-dom@18.2.0";
    (() => {
      const container = document.getElementById("root");
      const root = createRoot(container);
      root.render(
        <React.StrictMode>
          <Render {...JSON.parse('${JSON.stringify(data)}')} />
        </React.StrictMode>,
      );
    })();
`;
