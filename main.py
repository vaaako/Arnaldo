import discord 
import asyncio, os, random
import requests, json
from chatterbot import ChatBot
from chatterbot.trainers import ListTrainer 
from replit import db # Bilioteca de Database da replit
from keep_alive import keep_alive
# from Classes.Commands import Commands

bot = discord.Client()

# ChatterBot
chatbot = ChatBot('Arnaldo')
chatbot.set_trainer(ListTrainer)

for _file in os.listdir('Contextos'):
    chats = open('Contextos/' + _file, 'r').readlines()

    chatbot.train(chats)

if "chat" not in db.keys(): # Database pra poder ativar e desaivar o chat
  db["chat"] = True
# ChatterBot


# db.keys # Acessando
# db[] # Criando

def get_USD():
  response = requests.get('https://economia.awesomeapi.com.br/USD/1') # Importando API
  json_data = json.loads(response.text) # Rodando
  USD = json_data[0]['high'] # Valor que esta dentro de json_data (code) e valor que esta dentro do json_data[0] (high)
  return(USD) 

def get_BTC():
  response = requests.get('https://economia.awesomeapi.com.br/BTC/1') # Importando API
  json_data = json.loads(response.text) # Rodando
  BTC = json_data[0]['high'] # Valor que esta dentro de json_data (code) e valor que esta dentro do json_data[0] (high)
  return(BTC) 

def get_EUR():
  response = requests.get('https://economia.awesomeapi.com.br/EUR/1') # Importando API
  json_data = json.loads(response.text) # Rodando
  EUR = json_data[0]['high'] # Valor que esta dentro de json_data (code) e valor que esta dentro do json_data[0] (high)
  return(EUR) 

async def status_task(): # Mudando atividade em tanto tempo
    while True:
      await bot.change_presence(activity=discord.Game(name="Sua tia do 4º andar"))
      await asyncio.sleep(10)

      await bot.change_presence(activity=discord.Streaming(name="Minha Stream :D", url="https://www.youtube.com/watch?v=dQw4w9WgXcQ"))
      await asyncio.sleep(15)

      await bot.change_presence(activity=discord.Activity(type=discord.ActivityType.listening, name="Orgia de Traveco"))
      await asyncio.sleep(10)

      await bot.change_presence(activity=discord.Activity(type=discord.ActivityType.watching, name="Seus movimentos"))
      await asyncio.sleep(10)


@bot.event # Pre evento
async def on_ready(): 
    print(f'{bot.user.name}. ')
    print('Minha TAG é {0.user}'.format(bot))
    print('--------------AR--------------')
    
    bot.loop.create_task(status_task()) # Trocando a Atividade

@bot.event
async def on_message(message):
    
    if message.author == bot.user: # Se o autor da mensagem é o bot 
        return # Fazer nada
    
    msg = message.content.lower()

    # if any(word.lower() in msg for word in funny_words):
  
    if msg.startswith(';oi'):
      await message.reply('oi')
      await message.add_reaction('😀')
      
    if msg.startswith(';coin'):
      coin = random.randint(1,2)
      if coin == 1:
        await message.reply("CARA")
        await message.add_reaction('😀')
      if coin == 2:
          await message.reply("COROA")
          await message.add_reaction('👑')

    if msg.startswith(";price"):
      denero = msg.split(";price ",1)[1]
      USD = get_USD()
      USD = float(USD)

      BTC = get_BTC()
      BTC = float(BTC)

      EUR = get_EUR()
      EUR = float(EUR)

      if denero.lower() == "usd":
        # if USD >= 5:
        await message.channel.send(f"**`RS$`**`{USD:.2f}` Meu deus o dólar ta muito caro")
        # else:
        #   await message.channel.send(f"`USD${USD:.2f}` Pelo menos o dólar ta num preço rázoavel") 
        
      elif denero.lower() == "btc":
          await message.channel.send(f"BTC atualmente está valendo: **`RS$`**`{BTC}`") 
        
      elif denero.lower() == "eur":
        await message.channel.send(f"EUR atualmente está valendo: **`RS$`**`{EUR:.2f}`") 

      
    # MODO CHAT 
    if db["chat"]: # Se chat ativado (= True)
      request = msg
      if msg.lower().startswith(";"):
        pass
      else:
        response = chatbot.get_response(request)
        await message.reply(str(response))

    if msg.lower().startswith(";chat"): 
      value = msg.split(";chat ",1)[1] 

      if value.lower() == "on":
        db["chat"] = True
        await message.channel.send("MODO CHAT ATIVADO")
      elif value.lower() == "off":
        db["chat"] = False
        await message.channel.send("MODO CHAT DESATIVADO")

    # MODO CHAT 
      

@bot.event
async def on_member_join(member, message): # Nao funiona nao sei pq
  await message.channel.send('hello')
  await member.create_dm()  # cria um chat privado
  await member.dm_channel.send(f'Salve{member.name}, bem vindo ao server!') # envia a mensagem para o chat privado


keep_alive()
bot.run(os.environ.get('TOKEN')) 
