import { router, sockets } from "../router.ts";

router.get("/refresh", (ctx) => {
  const socket = ctx.upgrade();
  sockets.add(socket);
  socket.onclose = () => {
    sockets.delete(socket);
  };
});
