import { Server } from "socket.io";


export const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      credentials: true,
    },
  });

  const userSocket = new Map(); //userid socketid
  const userActivities = new Map(); // userid:activity

  io.on("connection", (socket) => {
    socket.on("user_connected", (userId) => {
      userSocket.set(userId, socket.id);
      userActivities.set(userId, "Idle");
      io.emit("user_connected", userId);

      socket.emit("users_online", Array.from(userSocket.keys()));
      io.emit("activities", Array.from(userActivities.keys()));
    });

    socket.on("update_activity",(user_id,activity)=>{
        console.log("activity,",user_id,activity)
        userActivities.set(user_id,activity)
        io.emit("activity_updated",{user_id,activity})
    })

    socket.on("send_message",async (data)=>{

        try {
            const {senderId, receiverId, content} = data
            const message = await Message.create({
                senderId,
                receiverId,
                content
            })

            const receiverSocketId = userSocket.get(receiverId)
            if(receiverSocketId){
                io.to(receiverSocketId).emit("receive",message)
            }
            socket.emit("message_sent",message)

            socket.on("disconnect",()=>{
                let disconnectedUserId
                for(const [userId,socketId] of userSocket.entries()){
                    if(socketId === socket.id){
                        disconnectedUserId = socket.is
                        userSocket.delete(userId)
                        userActivities.delete(userId)
                        break
                    }
                }
                if(disconnectedUserId){
                    io.emit("user_disconnected",disconnectedUserId)
                }
            })
            
        } catch (error) {
            console.error("Message error",error)
            socket.emit("message_error",error.message)
            
        }
    })
  });
};
