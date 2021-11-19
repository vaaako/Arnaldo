import discord
import random
from discord.ext import commands

color = 0xDA1354
respostas = ["Sim", "Claro", "Ainda tem dúvidas?", "Não", "De jeto nenhum", "Definitivamente não", "Talvez?", "Não sei dizer", "Ainda não está na hora de saber"]

jojo_quotes = [
	# Stand names
	"STAR PLATINUM",
	"HIEROPHANT GREEN",
	"SUTA PURATINA\n ZA WARUDO",
	"ZA WARUDO",
	"ZA WARUDO\n TOKI WA TOMARE",
	"ZA HANDO :b::b::b::b::b:",
	"HEAVEN'S DOOR",
	"KILLER QUEEN",
	"KIRA QUEEN DAISAN NO BAKUDAN BITES ZA DUSTO",
	"MADE IN HEAVEN",
	"KING CRIMSOM",
	"STONE FREEE!!",
	"Dirty Deeds Done Dirt Cheap",
	# Quotes
	"Wryyyyyyyyyyyyy",
	"NIGERUNDAYOOOOO!!",
	"CESAAAARRR",
	"Yare yare daze",
	"EMERALD SPLASH",
	"Lero lero lero lero lero lero lero lero lero lero lero",
	"OOOOOOH NOOOOOOO!!!",
	"Lali-ho",
	"MOHAMMED AVDOL?!?! \nYES, I AM!!",
	"SHINE KAKYOIN!!!",
	"DIO!!",
	"Hō… mukatte kuru no ka…… nigezu ni kono DIO ni chikadzuite kuru no ka……",
	"Chikadzukanakya \nteme o buchi nomesenainde na",
	"Yo angelo :moyai:",
	"Hayato",
	"Di molto!",
	"Korega... Requiem... Da",
	"Yare Yare Dawa",
	"Escada espiral, Besouro rinoceronte, Fila da desolação, Torta de figo, Besouro Rinoceronte Via dolorosa, Besouro rinoceronte, Ponto de singulariedade, Giotto, Anjo, Hortênsia, Besouro rinoceronte, Ponto de singulariedade, Imperador secreto",
	"Jhonny! O pé grande é real! \nE ele... Tentou chupar meu pau!",
	"Arigato... Gyro...",
	# Stands cry
	"MUDA MUDA MUDA MUDA MUDA MUDAAAAA!!!",
	"ORA ORA ORA ORA ORA ORA ORAAAAA!!!",
	"DORA DORA DORA DORA DORA DORA",
]


class text(commands.Cog):
	def __init__(self, bot):
		self.bot = bot

	@commands.command()
	async def oi(self, ctx):
			await ctx.reply('oi')
			await ctx.message.add_reaction('😀')

	@commands.command()
	async def sorteio(self, ctx):
			await ctx.reply("Sortei o pau no seu cu kkkkk")

	@commands.command()
	async def ask(self, ctx, *, pergunta):
		embedVar = discord.Embed(
			title="\n",
			description=random.choice(respostas),
			color=color)
		await ctx.reply(embed=embedVar)

	@commands.command()
	async def jojo(self, ctx):
		await ctx.message.delete()
		# embedVar = discord.Embed(
		# 	title="\n",
		# 	description=random.choice(jojo_quotes),
		# 	color=color)
		# await ctx.send(embed=embedVar)
		await ctx.send(random.choice(jojo_quotes))

	@commands.command()
	async def avatar(self, ctx, member : discord.Member=None):
		if member is not None:
			await ctx.send(member.avatar_url)
		else:
			return await ctx.send(ctx.message.author.avatar_url)
					

def setup(bot):
  bot.add_cog(text(bot))