import discord
import youtube_dl
from discord.ext import commands

color = 0xDA1354
FFMPEG_OPTIONS = {'before_options': '-reconnect 1 -reconnect_streamed 1 -reconnect_delay_max 5', 'options': '-vn'}

# YDL_OPTIONS = {'format': 'bestaudio'}

YDL_OPTIONS = {
	'noplaylist': True,
	'default_search': 'auto'
}


class text(commands.Cog):
	def __init__(self, bot):
		self.bot = bot

	@commands.command()
	async def join(self, ctx):
		if ctx.message.author.voice is None:
			return await ctx.send("Você não está em um chat de voz")

		try:
			voice_channel = ctx.message.author.voice.channel
		except:
			return await ctx.send("Eu ja estou em um canal de voz")
			
		if ctx.voice_client is None:
			await voice_channel.connect()
		else:
			await ctx.voice_client.move_to(voice_channel)

	@commands.command()
	async def leave(self, ctx):
		await ctx.voice_client.disconnect()

	@commands.command()
	async def play(self, ctx, *, music_url):

		if ctx.message.author.voice is None:
			return await ctx.send("Você não está em um chat de voz")

		try:
			voice_channel = ctx.message.author.voice.channel
		except:
			return await ctx.send("Eu ja estou em um canal de voz")
			
		if ctx.voice_client is None:
			await voice_channel.connect()
		else:
			await ctx.voice_client.move_to(voice_channel)


		vc = ctx.voice_client
		# with youtube_dl.YoutubeDL(YDL_OPTIONS) as ydl:
		# 	info = ydl.extract_info(url, download=False)
		# 	url2 = info["formats"][0]["url"]
		# 	source = await discord.FFmpegOpusAudio.from_probe(url2, **FFMPEG_OPTIONS)
		# 	vc.play(source)

		

		ytdl = youtube_dl.YoutubeDL(YDL_OPTIONS)

		link = music_url

		info = ytdl.extract_info(link, download = False)

		if 'entries' in info:
				url2 = info['entries'][0]["formats"][0]
		elif 'formats' in info:
				url2 = info["formats"][0]

		url = info["webpage_url"]
		stream_url = url2["url"]



		# if vc.is_playing():
		# 	embedVar = discord.Embed(
		# 		title="\n", 
		# 		description="Já está tocando uma música", 
		# 		color=color)
			
		# 	return await ctx.send(embed=embedVar)

		source = await discord.FFmpegOpusAudio.from_probe(stream_url, **FFMPEG_OPTIONS)
		vc.play(source)

		embedVar = discord.Embed(
		title="\n", 
		description=f"Tocando agora `{link}`", 
		color=color)
		return await ctx.send(embed=embedVar)


	@commands.command()
	async def pause(self, ctx):
		ctx.voice_client.pause()
		embedVar = discord.Embed(
			title="\n", 
			description="Pausado  :pause_button:", 
			color=color)
		await ctx.send(embed=embedVar)

	@commands.command()
	async def resume(self, ctx):
		ctx.voice_client.resume()
		embedVar = discord.Embed(
			title="\n", 
			description="Continuando  :arrow_forward:", 
			color=color)
		await ctx.send(embed=embedVar)

	@commands.command()
	async def stop(self, ctx):
		ctx.voice_client.stop()
		embedVar = discord.Embed(
			title="\n", 
			description="As suas ordens meu princípe", 
			color=color)
		await ctx.send(embed=embedVar)


def setup(bot):
  bot.add_cog(text(bot))