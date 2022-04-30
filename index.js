const fs = require('node:fs'); 													//fs is Node's native file system module. 
const { Client, Collection, Intents, MessageButton } = require('discord.js'); 	//Collection is a class that extends JavaScript's native Map class, and includes more extensive, useful functionality.
const { token } = require('./config.json'); 									//authtoken stored in config.json
const now = new Date();															//get a timestamp (for debugging)


const client = new Client({ intents: [Intents.FLAGS.GUILDS] }); 				//create new client to  login

client.commands = new Collection(); 											//create collection to fill with commands
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js')); //read all the command files

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);								
	client.commands.set(command.data.name, command);							// Set a new item in the Collection // With the key as the command name and the value as the exported module
}

client.once('ready', () => { 													//Startup screen info
	
	console.log(now.toUTCString()); // convert date to a string in UTC timezone format
	console.log("\n\n                      o8o                                                .o8                              \r\n                      `\"\'                                               \"888                              \r\noo.ooooo.   .ooooo.  oooo  ooo. .oo.  .oo.    .oooo.   ooo. .oo.    .oooo888  oooo d8b  .ooooo.   .oooo.o \r\n 888\' `88b d88\' `88b `888  `888P\"Y88bP\"Y88b  `P  )88b  `888P\"Y88b  d88\' `888  `888\"\"8P d88\' `88b d88(  \"8 \r\n 888   888 888   888  888   888   888   888   .oP\"888   888   888  888   888   888     888ooo888 `\"Y88b.  \r\n 888   888 888   888  888   888   888   888  d8(  888   888   888  888   888   888     888    .o o.  )88b \r\n 888bod8P\' `Y8bod8P\' o888o o888o o888o o888o `Y888\"\"8o o888o o888o `Y8bod88P\" d888b    `Y8bod8P\' 8\"\"888P\' \r\n 888                                                                                                      \r\no888o                                                                                                     \r\n"); //start 'logo'
	console.log('... ... ... Online in ' + client.guilds.cache.size + ' Discord servers ... ... ...\n------------    ------------   ------------   ------------');
	client.guilds.cache.forEach(guild => {										//count & list the servers.
		console.log(`${guild.name} | Members: ${guild.memberCount}`);
	  })
	console.log('------------    ------------   ------------   ------------\n');

});

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

client.on('interactionCreate', async interaction => { 
	
	//Slash Commands=========================
	if  (interaction.isCommand()){
		

		const command = client.commands.get(interaction.commandName);

		if (!command) return;

		if (interaction.guild !== null){
			console.log(command.data.name + " request at " + interaction.guild.name + " by " + interaction.member.displayName);
		}else{
			console.log(command.data.name + " request in DM");
		}
		
		try {
			await command.execute(interaction);
		} catch (error) {
			console.error(error);
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	
	//Menu Interactions======================
	}else if (interaction.isSelectMenu()){
	
		//const selected = client.commands.get(interaction.values[0]);
		//if (!selected) return;

		//-----------------------------------------------
		if (interaction.customId === 'contentsSelect') {

			if (interaction.guild !== null){
				console.log(interaction.values[0] + " selected by " + interaction.member.displayName);
			}else{
				console.log(interaction.values[0] + " selected in DM");
			}

			const bookRef = require(`./commands/books/${interaction.values[0]}.json`);
			
			const contentsList = Object.keys(bookRef);
			let csvContents = contentsList.toString();
			csvContents = csvContents.replaceAll(',','` `')
			csvContents = csvContents.replaceAll('bookTitle','');
			csvContents = csvContents.replaceAll('translator','');

			let bodyText = '`/'+interaction.values[0]+'` + *one of the following:*\n`'+ csvContents + '`';
			if (bodyText.length > 950) {
				bodyText = bodyText.substring(0, 901) + ' ***... Discord message limit exceeded.***';
			}

			try {
					//await selected.execute(interaction);
					await interaction.reply({ content: bodyText, ephemeral: true});
			} catch (error) {
					console.log('error caught line 80');
					//console.error(error);
					await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
			}
		//---------------------------------------
		} else { 
			try {
				await interaction.reply({ content: "**UNDER DEVELOPMENT** *This menu doesn't lead to anywhere yet*", ephemeral: true });
			}catch (error) {
				console.log(error);
				await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
			}
		}
		
	//======================================
	}else{
		return;
	}

});


client.login(token);