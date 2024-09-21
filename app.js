const webSocket = require("ws");
const { EmptyMessage, ClientExist, InvalidMessage, InvalidNamak } = require("./error");

//create server socket
const server = new webSocket.Server({ port: 4000 });

const all_clients = {};

server.on("connection", (client) => {
  console.log("connection monnection");
  client.send('Welcome to server!');

  client.on('message', msg => {
    let parsedMsg;

    try {
      parsedMsg = JSON.parse(msg?.toString());
    } catch (err) { 
      client.send('Invalid message format');
      // throw new InvalidMessage();
    }

    if(Object.keys(parsedMsg).length === 0) {
      client.send('Message is empty');
      // throw new EmptyMessage();
    };

    if('login' in parsedMsg) {      
      if(parsedMsg.login in all_clients) {
        client.send('Client already exist');
        // throw new ClientExist();
        
      };

      all_clients[parsedMsg.login] = client;
      client.send('Welocome ' + parsedMsg.login);
    }

    if('target' in parsedMsg) {
      if (!parsedMsg.namak) {
        client.send('Namak is required');
        // throw new InvalidNamak();
      };

      let targetClient = all_clients[parsedMsg.target];
      
      if(!targetClient) {
        client.send('User is offline');
      } else {
        targetClient.send(parsedMsg.namak);
      }
    };
  });

  client.on('close', () => {
    for (let login in all_clients) {
      if (all_clients[login] === client) {
        delete all_clients[login];
        console.log(`${login} disconnected`);
        break;
      }
    }
  });
});