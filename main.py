# discord
import discord, asyncio, os
from discord.ext import commands 

# server
from keep_alive import keep_alive

# others
import random

# commands
from commands import bot_com
from commands import chat
from commands import fun
from commands import music
from commands import random_num
from commands import text

prefix = "]"
rolls = []
servers = [720756261808898059, 809236518526517318]
color = 0xDA1354
parabens = ["parabens", "parabeins", "parabenx", "parabeinx", "parabéns"]
onichan = ["onichan", "oniichan", "oni chan", "onii chan", "oni-chan", "onii-chan", "oneechan", "aniki"]
bom_dia = ["bom dia linda", "bom dia meu amor", "bom dia gostosa", "bom dia meu principe", "bom dia meu rei", "bom dia meu patrão"]

cogs = [bot_com, chat, fun, music, random_num, text]

bot = commands.Bot(command_prefix=']', case_insensitive=True)

bot.remove_command('help')

for i in range(len(cogs)):
	cogs[i].setup(bot)


"""
REFAZER O COMANDO ROLL NO OUTRO SISTEMA
MODO ESQUIZOFRENICO
"""


async def status_task():  # Mudando atividade em tanto tempo
	while True:
		await bot.change_presence(activity=discord.Game(
			name="Sua tia do 4º andar"))
		await asyncio.sleep(10)

		await bot.change_presence(activity=discord.Streaming(
			name="Moendo o alfredo na porrada até ele desmaiar",
			url="https://www.youtube.com/watch?v=dQw4w9WgXcQ"))
		await asyncio.sleep(20)

		await bot.change_presence(activity=discord.Activity(
			type=discord.ActivityType.listening, name="Orgia de Travecos"))
		await asyncio.sleep(10)

		await bot.change_presence(activity=discord.Activity(
			type=discord.ActivityType.watching, name="Seus movimentos"))
		await asyncio.sleep(10)


@bot.event  # Pre evento
async def on_ready():
	print(f'{bot.user.name}. ')
	print(f"Minha ID - {bot.user.id}")
	print('Minha TAG é {0.user}'.format(bot))
	print('--------------AR--------------')

	bot.loop.create_task(status_task())  # Trocando a Atividade


@bot.event
async def on_message(message):
	if message.author == bot.user:  # Se o autor da mensagem é o bot
		return  # Fazer nada

	msg = message.content.lower()
	mcs = message.channel.send

	# id = message.guild.id

	# if id != 720756261808898059 and msg.startswith(f"{prefix}"):
	# if id != 720756261808898059:
	# # if id not in servers and msg.startswith(f"{prefix}"):
		# return await mcs("Estou sendo manutenciado")
	# 	return



	if any(i in msg for i in parabens):
		await mcs("Parabéns :partying_face: :birthday:")

	if any(i in msg for i in onichan):
			await message.reply("avapacasadocaraio")

	#elif "69" in msg:
		#await message.add_reaction('😳')

	if "sex" in msg:
		await message.add_reaction('😏')
	
	if "nazi" in msg:
		await message.add_reaction('✋')

	if "832998059334959134" in msg:
		if message.author.id == '602303260572778516' or '703785252463837234' or '876286395348561951':
			await message.reply("Sim senhor(a)?")
		else:
			await message.reply("Que foi porra?")

	#elif "bom dia" in msg:
		#await message.reply(random.choice(bom_dia))




	# --- ROLL --- #
	elif msg.startswith(f"{prefix}roll"):
		try:
			vezes = msg.split('d', 2)[0].replace("]roll ", "")
			if vezes == "" or vezes == " ":
					vezes = 1
			vezes = int(vezes)
			pass
		except:
			embedVar = discord.Embed(title=f"Não entendi", description="Escreva um número de preferencia por favor", color=color)
			await message.reply(embed=embedVar)
			return

		try:
			dado = msg.split('d', 2)[1]
			pass
		except:
			embedVar = discord.Embed(title="Irmão que número que você quer rodar?", description="Você precisa escrever `[vezes]d[faces]`", color=color)
			await message.reply(embed=embedVar)
			return

		try:
			roll = int(dado)
			pass
		except:
			embedVar = discord.Embed(title="Ta na disney irmão?", description=f"Você precisa escrever um número", color=color)
			await message.reply(embed=embedVar)
			return

		for i in range(vezes):
			try:
				rolls.append(random.randint(1, roll)) # colocando numa lista pra poder fazer multiplos rolls
			except:
				await message.reply("Algo deu errado tente de novo por favor")

		embedVar = discord.Embed(title=f"Você tirou `{sum(rolls)}`", color=color)
		embedVar.add_field(name=f"Rolls", value=f"{rolls}", inline=False)
		embedVar.set_thumbnail(url="https://s3.amazonaws.com/images.ecwid.com/images/7771588/946830785.jpg")

		try:
			await message.reply(embed=embedVar)
		except:
			embedVar = discord.Embed(title="Esse número é muito grande pra eu poder rolar em um dado", color=color)
			await message.reply(embed=embedVar)

		rolls.clear() # resetando a lista


	await bot.process_commands(message)

keep_alive()
bot.run(os.environ.get('TOKEN'))
