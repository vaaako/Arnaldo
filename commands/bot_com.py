import discord
import time, random, asyncio

from discord.ext import commands

color = 0xDA1354
pode_say = [703785252463837234, 602303260572778516, 876286395348561951]

class bot_com(commands.Cog):
	def __init__(self, bot):
		self.bot = bot


	@commands.command()
	async def dm(self, ctx, member : discord.Member=None, *, message=None):
		if not ctx.message.author.guild_permissions.manage_channels:
			await ctx.send("Você não possui a permissão necessária para usar esse comando.")

		if member is None: # se nao tiver mencionado ngm
			return await ctx.send("Mencione alguem para que eu possa mandari um oi")

		if message is None: # se a mensagem esta preenchida
			return await ctx.send("Mas oque que eu vou falar?")
		else:
			await ctx.message.delete()
			await member.send(message)

	@commands.command()
	async def say(self, ctx, *, arg):
		if ctx.message.author.id not in pode_say:
			await ctx.send(f"{ctx.message.author.mention} é viadasso e furry")
			await ctx.message.delete()
			return
		else:
			await ctx.message.delete()
			await ctx.send(arg)

	@commands.command()
	async def ping(self, ctx):
			start_time = time.time()
			# embedVar = discord.Embed(title="Pong :ping_pong:", color=color)
			message = await ctx.send("Pong :ping_pong:")
			# await ctx.send(embed=embedVar)
			end_time = time.time()

			embedVar = discord.Embed(title="Pong :ping_pong:", color=color)
			embedVar.add_field(name="Latência do Bot", value=f"{round(self.bot.latency * 1000)}ms", inline=False)
			embedVar.add_field(name="API", value=f"{round((end_time - start_time) * 1000)}ms", inline=False)

			await message.edit(embed=embedVar)

	@commands.command()
	async def clear(self, ctx, amount=0): # Set default value as None
		if not ctx.message.author.guild_permissions.administrator:
			embedVar = discord.Embed(title="\n", description="Você não possui a permissão necessária para usar esse comando.", color=color)
			return await ctx.send(embed=embedVar)
		if amount == 0:
			embedVar = discord.Embed(title="\n", description="Mas quantas mensagens vc vai apagar?", color=color)
			return await ctx.send(embed=embedVar)
			# await ctx.channel.purge(limit=1000000)
			# await ctx.channel.purge(limit=100)
			# await ctx.channel.purge(limit=10)		
		else:
			try:
				int(amount)
			except: # Error handler
				await ctx.send('Digite um número válido.')
			else:
				await ctx.channel.purge(limit=amount)


	@commands.command()
	async def sobre(self, ctx):
		embedVar = discord.Embed(title="\n", description="Bom oque posso dizer? Meu nome é Arnaldo eu nasci no dia 17 de abril de 2021, meu pai é o `[Vako]` e minha mãe é o `Shy Girl`.", color=color)
		await ctx.send(embed=embedVar)

	@commands.command()
	async def hel(self, ctx):
		return await ctx.send("Eu ainda estou em desenvolvimento")

	@commands.command()
	async def help(self, ctx):

		def check(reaction, user):
			return user == ctx.author and str(reaction.emoji) in ARROWS

		ARROWS = ['⬅️', '➡️']

		embedHelp = discord.Embed(title="Texto", color=color)
		embedHelp.add_field(name=f"`oi`", value="Um simples **oi** de mim.", inline=False)
		embedHelp.add_field(name="`sorteio`", value="Informações sobre o sorteio.", inline=False)
		embedHelp.add_field(name=f"`avatar [user]`", value="Veja a foto de algum usuário.", inline=False)
		embedHelp.add_field(name=f"`jojo`", value="Hō… mukatte kuru no ka……", inline=False)

		embedHelp2 = discord.Embed(title="FUN", color=color)
		embedHelp2.add_field(name=f"`link`", value="Um link de um hentai aleátorio. Vai tentar a sorte?", inline=False)
		embedHelp2.add_field(name=f"`gato`", value="Vai um gatinho?", inline=False)
		embedHelp2.add_field(name=f"`chorro`", value="Um cachorrinho?", inline=False)
		embedHelp2.add_field(name=f"`neko`", value="Ou que tal uma neko?", inline=False)
		embedHelp2.add_field(name=f"`loli`", value="Você não faria né?", inline=False)
		# embedHelp2.add_field(name=f"`Hentai`", value="Uma foto ecchi aleatória.", inline=False)
		embedHelp2.add_field(name=f"`gay`", value="Quantos porcento gay você é?", inline=False)
		embedHelp2.add_field(name=f"`gado`", value="Você é gado é? Vamos descobrir.", inline=False)
		embedHelp2.add_field(name=f"`ship [user] [user2 (opcional)]`", value="Calculadora do amor.", inline=False)
		embedHelp2.add_field(name=f"`ppt`", value="Vamos decidir isso no pedra, papel e tesoura.", inline=False)

		embedHelp3 = discord.Embed(title="RANDOM", color=color)
		embedHelp3.add_field(name=f"`coin`", value="Você quer cara ou coroa?", inline=False)
		embedHelp3.add_field(name=f"`roll [vezes]d[faces]`", value="Role um dado.", inline=False)
		embedHelp3.add_field(name=f"`numero`", value="Um número aleatório entre 1 e 99999", inline=False)

		embedHelp4 = discord.Embed(title="MUSIC", color=color)
		embedHelp4.add_field(name=f"`join`", value="Vou entrar no canal de voz que você está.", inline=False)
		embedHelp4.add_field(name=f"`leave`", value="Vou sair do canal de voz.", inline=False)
		embedHelp4.add_field(name=f"`play [nome da música]`", value="Tunts tunts :notes:", inline=False)
		embedHelp4.add_field(name=f"`pause`", value="Uma pausinha.", inline=False)
		embedHelp4.add_field(name=f"`resume`", value="Eu preciso explicar?", inline=False)
		embedHelp4.add_field(name=f"`stop`", value="Cansou dessa música?", inline=False)

		embedHelp5 = discord.Embed(title="BOT", color=color)
		embedHelp5.add_field(name=f"`dm [user] [mensagem]`", value="Vou mandar uma mensagem na DM dessa pessoa", inline=False)		
		embedHelp5.add_field(name="`ping`", value="Qual será o meu ping?", inline=False)
		embedHelp5.add_field(name=f"`sobre`", value="Um pouco sobre mim", inline=False)

		embedHelp6 = discord.Embed(title="CHAT", color=color)
		embedHelp6.add_field(name=f"`chat [estado (on, off)] `", value="Vamos bater um papo :)", inline=False)

		lista = [embedHelp2, embedHelp3, embedHelp4, embedHelp5, embedHelp6, embedHelp]

		help_msg = await ctx.send(embed=embedHelp)
		# help_msg == reaction.message.id
		"""
		This will ensure that when they click a reaction on an embed the correct handler receives it. You said you only wanted the latest to handle it... this would not quite do that. But any reactions on the latest would be handled for the latest, and any reactions on an earlier one would be handled by the earlier handlers. If that makes sense.
		"""

		await help_msg.add_reaction('➡️')


		while True:
			for embeds in lista:
				try:
					reaction, user = await self.bot.wait_for('reaction_add', timeout=30, check=check) # espera pela reação

					if str(reaction.emoji) == "➡️":
						await help_msg.edit(embed=embeds)

					else:
						await help_msg.remove_reaction(reaction, user)
				
				except asyncio.TimeoutError:
						break


def setup(bot):
  bot.add_cog(bot_com(bot))