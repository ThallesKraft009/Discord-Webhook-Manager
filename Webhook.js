module.exports = class Webhook {
  constructer(token, tipo, {name: a, avatar: b, chat: d}){


    this.token = token;
    this.type = tipo;
    this.nome = a;
    this.avatar = b;
    this.chat = d;

    if (this.token === undefined)  throw new Error("O token não foi definido.")

    if (this.type === undefined) throw new Error("Não foi definido se é pra CRIAR ou executar um criado.")

    if (this.type === true) {
       
if (this.nome === undefined) throw new Error("O nome não foi definido.")

if (this.avatar === undefined) throw new Error("O avatar não foi definido")

if (this.chat === undefined) throw new Error("O ID do chat não foi definido")


let url = `channels/${this.chat}/webhooks`;
let webhook_estrutura = {
  name: this.nome,
  avatar: this.avatar
}
      
const criar = async() => {
  let a = await DiscordRequest(url, { method: 'POST', body: webhook_estrutura });

   return a.toJSON()
}


      const web = criar();

      
     const responder = async(msg) => {
       
          let url_responder = `webhooks/${web.id}/${web.token}`;

       await DiscordRequest(url_responder, { method: 'POST', body: msg });

     }

const deletar = async() => {

  let url_deletar = `webhooks/${web.id}/${web.token}`;

       await DiscordRequest(url_deletar, { method: 'DELETE' });
  
}

  const json = {
    webhook: web,
    responder: responder,
    deletar: deletar
  }


      return json;

    }

    async function DiscordRequest(endpoint, options) {

  if (options.body) options.body = JSON.stringify(options.body);

      const url_ = 'https://discord.com/api/v10/' + endpoint;


  const res = await fetch(url_, {
    headers: {
      Authorization: `Bot ${process.env.token}`,
      'Content-Type': 'application/json; charset=UTF-8',
      'User-Agent': 'DiscordBot (https://github.com/discord/discord-example-app, 1.0.0)',
    },
    ...options
  });

  if (!res.ok) {
    const data = await res.json();
    console.log(res.status);
    throw new Error(JSON.stringify(data));
  }
  return res;
}

  }
  }