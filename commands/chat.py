import discord
from discord.ext import commands

# chatterbot
from chatterbot import ChatBot
from chatterbot.trainers import ChatterBotCorpusTrainer, ListTrainer


chat_channels = []
special_characters = '!@#$%^&*()-+_=,<>/"[]{}`´~:;,.|\/°ºª§¹²³£¢¬'

# Chatterbot
chatbot = ChatBot(
 'Arnaldo',
    preprocessors=['chatterbot.preprocessors.clean_whitespace'],
 # read_only=True # Faz com que o bot pare de aprender
)

confi_list = ["Não entendi oque você falou"]

trainer = ChatterBotCorpusTrainer(chatbot)
trainer.train('contextos/')

class text(commands.Cog):
	def __init__(self, bot):
		self.bot = bot

	@commands.command()
	async def chat(self, ctx, value=None):
		if value is None:
			return await ctx.send("Você precisa de digitar chat `on` ou chat `off`")

		elif value == "on" and ctx.message.channel.id not in chat_channels:
			chat_channels.append(ctx.message.channel.id)
			await ctx.send("MODO CHAT ATIVADO")
		elif value == "off":
			try:
				chat_channels.remove(ctx.message.channel.id)
			except:
				await ctx.send("Esse canal não está com o modo chat ativado")
				return

			await ctx.send("MODO CHAT DESATIVADO")


	@commands.Cog.listener()
	async def on_message(self, message):
		if message.author == self.bot.user:
			return

		if message.channel.id in chat_channels:
			request = message.content
			if any(i in special_characters for i in message.content):
				pass
			else:
				response = chatbot.get_response(request)
				await message.reply(str(response))



def setup(bot):
  bot.add_cog(text(bot))