import discord
import random, math
import requests, json # api
from discord.ext import commands

color = 0xDA1354
vako_shy = [703785252463837234, 602303260572778516, 876286395348561951]

def get_neko():
	response = requests.get('https://api.neko.airforce/api/neko')  # Importando API
	json_data = json.loads(response.text)  # Rodando
	NEKO = json_data['url']  # Valor que esta dentro de json_data (code) e valor que esta dentro do json_data[0] (high)
	return NEKO

def get_gato():
	response = requests.get('https://api.neko.airforce/api/cat')  # Importando API
	json_data = json.loads(response.text)  # Rodando
	GATO = json_data['url']  # Valor que esta dentro de json_data (code) e valor que esta dentro do json_data[0] (high)
	return GATO

def get_ecchi():
	response = requests.get('https://api.neko.airforce/api/ecchi')  # Importando API
	json_data = json.loads(response.text)  # Rodando
	ECCHI = json_data['url']  # Valor que esta dentro de json_data (code) e valor que esta dentro do json_data[0] (high)
	return ECCHI

def get_chorro():
	response = requests.get('https://dog.ceo/api/breeds/image/random')  # Importando API
	json_data = json.loads(response.text)  # Rodando
	DOG = json_data['message']  # Valor que esta dentro de json_data (code) e valor que esta dentro do json_data[0] (high)
	return DOG

class fun(commands.Cog):
	def __init__(self, bot):
		self.bot = bot

	@commands.command()
	async def search(self, ctx, *, search=None):
		if search == None:
			return await ctx.send("Você precisa digitar algo para que eu possa fazer a pesquisa")

		link = f"https://duckduckgo.com/?q=!ducky+{search}%3Asiteurl".replace(" ", "+")
		embedVar = discord.Embed(
			title="Eu achei este resultado para sua pesquisa.", description=link,
			color=color)
		embedVar.set_footer(text="Lembre-se que esse link redicionará para um site.")

		await ctx.send(embed=embedVar)

	@commands.command()
	async def neko(self, ctx):
		embedVar = discord.Embed(
			title="Aqui está sua neko.", 
			color=color)
		embedVar.set_image(url=get_neko())
		await ctx.send(embed=embedVar)

	@commands.command()
	async def hentai(self, ctx):
		# if ctx.message.author.id != 703785252463837234:
		# 	return
		embedVar = discord.Embed(
			title="Aqui está seu ecchi", 
			color=color)
		embedVar.set_image(url=get_ecchi())
		await ctx.send(embed=embedVar)

	@commands.command()
	async def loli(self, ctx):
		# if ctx.message.author.id != 703785252463837234:
		# 	return
		embedVar = discord.Embed(
			title="Vou ligar pro 190 seu otário :telephone_receiver:", 
			color=color)
		embedVar.set_image(url='https://media.socastsrm.com/wordpress/wp-content/blogs.dir/1906/files/2021/06/fbi.jpg')
		await ctx.send(embed=embedVar)

	@commands.command()
	async def gato(self, ctx):
		embedVar = discord.Embed(
			title="Miau miau miau.", 
			color=color)
		embedVar.set_image(url=get_gato())
		await ctx.send(embed=embedVar)

	@commands.command()
	async def chorro(self, ctx):
		embedVar = discord.Embed(
			title="Au au au.", 
			color=color)
		embedVar.set_image(url=get_chorro())
		await ctx.send(embed=embedVar)

	@commands.command()
	async def gay(self, ctx, member: discord.Member=None):

		if member is None:
			embedVar = discord.Embed(
				title="Detector de gay",
				description=f"Você é `{random.randint(0, 100)}%` gay  :gay_pride_flag:", 
				color=color)
			await ctx.send(embed=embedVar)
		else:
			embedVar = discord.Embed(
				title="Detector de gay",
				description=f"<@{member.id}> é `{random.randint(0, 100)}%` gay  :gay_pride_flag:",
				color=color)
			await ctx.send(embed=embedVar)


	@commands.command()
	async def gado(self, ctx, member: discord.Member=None):
		
		if member is None:
			embedVar = discord.Embed(
				title="Detector de gado",
				description=f"Você é `{random.randint(0, 100)}%` gado  :ox:", 
				color=color)
			await ctx.send(embed=embedVar)
		else:
			embedVar = discord.Embed(
				title="Detector de gado",
				description=f"<@{member.id}> é `{random.randint(0, 100)}%` gado  :ox:", 
				color=color)
			await ctx.send(embed=embedVar)

		

	@commands.command()
	async def ship(self, ctx, member: discord.Member=None, member2: discord.Member=None):
		if member is None:
			return await ctx.send("Marque alguem  para eu poder calcular o amor entre vocês dois.")

		if member2 is None:
			membro2 = ctx.message.author.avatar_url
		else:
			membro2 = member2.avatar_url

		if ctx.message.author.id in vako_shy and member.id in vako_shy:
			love_int = 100
		else:
			love_int = random.randint(0, 100)

		love = int(math.ceil((love_int/4)-2))

		# || maximo - 23
		# '.' maximo - 23

		if love == 23:
			space = 0
		else:
			# space = 23
			# space = abs(int(math.ceil((love_int-23/4)-2)))
			space = abs(love-22)

		embedVar = discord.Embed(
			title="Calculadora de amor :two_hearts:", description=f"`{str(love_int)}%` de amor :smiling_face_with_3_hearts: \n" + "[`" + "█" * love + "." * space + "`]",
			color=color)
		embedVar.set_thumbnail(url=membro2)
		embedVar.set_image(url=member.avatar_url)

		await ctx.send(embed=embedVar)

	@commands.command()
	async def ppt(self, ctx):
		def check(reaction, user):
			return user == ctx.author and str(reaction.emoji) in PPT

		WIN = 'https://bizzybeepestcontrol.com/wp-content/uploads/2016/07/large-win-gif.gif'
		LOSE = 'https://previews.123rf.com/images/pockygallery/pockygallery1508/pockygallery150800259/43417431-you-lose-red-stamp-text-on-white.jpg'
		DRAW = 'https://miro.medium.com/max/1052/1*zUK8Slcqf_nvoq5TH5prAg.gif'

		PPT = ['🪨', '📄', '✂️']
		# PPT = [PEDRA, PAPEL, TESOURA]

		
		# PV_MSG = await ctx.message.author.send("Reaja com um desses")
		# await PV_MSG.add_reaction(PEDRA)
		# await PV_MSG.add_reaction(PAPEL)
		# await PV_MSG.add_reaction(TESOURA)

		# await channel.send("meucu")


		for emoji in PPT:
			await ctx.message.add_reaction(emoji)

		reaction, user = await self.bot.wait_for('reaction_add', timeout=10, check=check) # espera pela reação

		bot_choice = random.choice(PPT)


		title=f"{reaction.emoji} X {bot_choice}"

		embedWin = discord.Embed(title=title, description="Você `ganhou`! :partying_face:", color=color)
		embedWin.set_thumbnail(url=WIN)

		embedDraw = discord.Embed(title=title, description="Deu `Empate`!", color=color)
		embedDraw.set_thumbnail(url=DRAW)

		embedLose = discord.Embed(title=title, description="Você `perdeu`! :)", color=color)
		embedLose.set_thumbnail(url=LOSE)

		if str(reaction.emoji) == '🪨':
			if bot_choice == '📄':
				await ctx.send(embed=embedLose)

			elif str(reaction.emoji) == bot_choice:
				await ctx.send(embed=embedDraw)

			else:
				await ctx.send(embed=embedWin)

		elif str(reaction.emoji) == '📄':
			if bot_choice == '✂️':
				await ctx.send(embed=embedLose)

			elif str(reaction.emoji) == bot_choice:
				await ctx.send(embed=embedDraw)

			else:
				await ctx.send(embed=embedWin)
		
		elif str(reaction.emoji) == '✂️':
			if bot_choice == '🪨':
				await ctx.send(embed=embedLose)

			elif str(reaction.emoji) == bot_choice:
				await ctx.send(embed=embedDraw)

			else:
				await ctx.send(embed=embedWin)

def setup(bot):
  bot.add_cog(fun(bot))