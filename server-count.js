
/*****************************************************************************************						
This script runs an instance of Poimandres that counts how many guilds it is in.
******************************************************************************************/

const fs = require('node:fs'); //fs is Node's native file system module. 
const { Client, Collection, Intents, MessageButton } = require('discord.js'); //Collection is a class that extends JavaScript's native Map class, and includes more extensive, useful functionality.
const { token } = require('./config.json'); //authtoken stored in config.json
const { exit } = require('node:process');

const now = new Date();
let guildList = '';

const client = new Client({ intents: [Intents.FLAGS.GUILDS] }); //create new client to  login

	client.once('ready', () => { 													//Startup screen info
	
		console.log(now.toUTCString()); // convert date to a string in UTC timezone format
		console.log("\n\n                      o8o                                                .o8                              \r\n                      `\"\'                                               \"888                              \r\noo.ooooo.   .ooooo.  oooo  ooo. .oo.  .oo.    .oooo.   ooo. .oo.    .oooo888  oooo d8b  .ooooo.   .oooo.o \r\n 888\' `88b d88\' `88b `888  `888P\"Y88bP\"Y88b  `P  )88b  `888P\"Y88b  d88\' `888  `888\"\"8P d88\' `88b d88(  \"8 \r\n 888   888 888   888  888   888   888   888   .oP\"888   888   888  888   888   888     888ooo888 `\"Y88b.  \r\n 888   888 888   888  888   888   888   888  d8(  888   888   888  888   888   888     888    .o o.  )88b \r\n 888bod8P\' `Y8bod8P\' o888o o888o o888o o888o `Y888\"\"8o o888o o888o `Y8bod88P\" d888b    `Y8bod8P\' 8\"\"888P\' \r\n 888                                                                                                      \r\no888o                                                                                                     \r\n"); //start 'logo'
		console.log('... ... ... Online in ' + client.guilds.cache.size + ' Discord servers ... ... ...\n===========================================================');
		client.guilds.cache.forEach(guild => {										//count & list the servers.
			
			guildList += '\n';
			guildList += `${guild.name} | Members: ${guild.memberCount}`;
		  })
		
		console.log(guildList);
		console.log('\n===========================================================\n\n		~ END OF PROGRAM ~\n\n');

	

		});

client.login(token);

		

