import discord
import random
from discord.ext import commands

color = 0xDA1354

class random_num(commands.Cog):
	def __init__(self, bot):
		self.bot = bot

	@commands.command()
	async def numero(self, ctx):
		embedVar = discord.Embed(
			title="\n",
			description=f"{ctx.message.author.mention} Você tirou: `{random.randint(1, 99999)}`", 
			color=color)
		await ctx.send(embed=embedVar)

	@commands.command()
	async def link(self, ctx):
			embedVar = discord.Embed(
				title="Divirta-se :smiley: (ou não)", 
				description=f"https://nhentai.net/g/{random.randint(1, 371990)}", 
				color=color)
			await ctx.send(embed=embedVar)

	@commands.command()
	async def coin(self, ctx):
		coin = random.randint(1, 2)
		if coin == 1:
			embedVar = discord.Embed(
				title="\n", 
				description=f"{ctx.message.author.mention} Você tirou `CARA`", 
				color=color)
			await ctx.send(embed=embedVar)
			await ctx.message.add_reaction('😀')

		elif coin == 2:
			embedVar = discord.Embed(title="\n", 
				description=f"{ctx.message.author.mention} Você tirou `COROA`", 
				color=color)
			await ctx.send(embed=embedVar)
			await ctx.message.add_reaction('👑')


def setup(bot):
  bot.add_cog(random_num(bot))