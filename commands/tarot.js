const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const bookRef = require('./books/mead-ah.json');            //<----CHANGE THE BOOK REF

module.exports = {

    //-------------------------------------------------
	data: new SlashCommandBuilder()
		.setName('tarot')                                      //<----SET THE command name to be  the same as this file's name.js
		.setDescription('Pull a RWS Tarot Card') //this is how discord will describe the command to the user
        .addStringOption(option =>
            option.setName('card')
                .setDescription('(optional) number of card (0-77)')                   //<----SET THE DESCRIPTION (How is the book divided?)
                .setRequired(false)),
    
    //-------------------------------------------------
    //----------------------------------------------------------------------------------------------------------------------
	async execute(interaction) {

        const cardArr = [
            "https://www.sacred-texts.com/tarot/pkt/img/ar00.jpg",
            "https://www.sacred-texts.com/tarot/pkt/img/ar01.jpg",
            "https://www.sacred-texts.com/tarot/pkt/img/ar02.jpg",
            "https://www.sacred-texts.com/tarot/pkt/img/ar03.jpg",
            "https://www.sacred-texts.com/tarot/pkt/img/ar04.jpg",
            "https://www.sacred-texts.com/tarot/pkt/img/ar05.jpg",
            "https://www.sacred-texts.com/tarot/pkt/img/ar06.jpg",
            "https://www.sacred-texts.com/tarot/pkt/img/ar07.jpg",
            "https://www.sacred-texts.com/tarot/pkt/img/ar08.jpg",
            "https://www.sacred-texts.com/tarot/pkt/img/ar09.jpg",
            "https://www.sacred-texts.com/tarot/pkt/img/ar10.jpg",
            "https://www.sacred-texts.com/tarot/pkt/img/ar11.jpg",
            "https://www.sacred-texts.com/tarot/pkt/img/ar12.jpg",
            "https://www.sacred-texts.com/tarot/pkt/img/ar13.jpg",
            "https://www.sacred-texts.com/tarot/pkt/img/ar14.jpg",
            "https://www.sacred-texts.com/tarot/pkt/img/ar15.jpg",
            "https://www.sacred-texts.com/tarot/pkt/img/ar16.jpg",
            "https://www.sacred-texts.com/tarot/pkt/img/ar17.jpg",
            "https://www.sacred-texts.com/tarot/pkt/img/ar18.jpg",
            "https://www.sacred-texts.com/tarot/pkt/img/ar19.jpg",
            "https://www.sacred-texts.com/tarot/pkt/img/ar20.jpg",
            "https://www.sacred-texts.com/tarot/pkt/img/ar21.jpg",
            "https://www.sacred-texts.com/tarot/pkt/img/waki.jpg",
            "https://www.sacred-texts.com/tarot/pkt/img/waqu.jpg",
            "https://www.sacred-texts.com/tarot/pkt/img/wakn.jpg",
            "https://www.sacred-texts.com/tarot/pkt/img/wapa.jpg",
            "https://www.sacred-texts.com/tarot/pkt/img/wa10.jpg",
            "https://www.sacred-texts.com/tarot/pkt/img/wa09.jpg",
            "https://www.sacred-texts.com/tarot/pkt/img/wa08.jpg",
            "https://www.sacred-texts.com/tarot/pkt/img/wa07.jpg",
            "https://www.sacred-texts.com/tarot/pkt/img/wa06.jpg",
            "https://www.sacred-texts.com/tarot/pkt/img/wa05.jpg",
            "https://www.sacred-texts.com/tarot/pkt/img/wa04.jpg",
            "https://www.sacred-texts.com/tarot/pkt/img/wa03.jpg",
            "https://www.sacred-texts.com/tarot/pkt/img/wa02.jpg",
            "https://www.sacred-texts.com/tarot/pkt/img/waac.jpg",
            "https://www.sacred-texts.com/tarot/pkt/img/cuki.jpg",
            "https://www.sacred-texts.com/tarot/pkt/img/cuqu.jpg",
            "https://www.sacred-texts.com/tarot/pkt/img/cukn.jpg",
            "https://www.sacred-texts.com/tarot/pkt/img/cupa.jpg",
            "https://www.sacred-texts.com/tarot/pkt/img/cu10.jpg",
            "https://www.sacred-texts.com/tarot/pkt/img/cu09.jpg",
            "https://www.sacred-texts.com/tarot/pkt/img/cu08.jpg",
            "https://www.sacred-texts.com/tarot/pkt/img/cu07.jpg",
            "https://www.sacred-texts.com/tarot/pkt/img/cu06.jpg",
            "https://www.sacred-texts.com/tarot/pkt/img/cu05.jpg",
            "https://www.sacred-texts.com/tarot/pkt/img/cu04.jpg",
            "https://www.sacred-texts.com/tarot/pkt/img/cu03.jpg",
            "https://www.sacred-texts.com/tarot/pkt/img/cu02.jpg",
            "https://www.sacred-texts.com/tarot/pkt/img/cuac.jpg",
            "https://www.sacred-texts.com/tarot/pkt/img/swki.jpg",
            "https://www.sacred-texts.com/tarot/pkt/img/swqu.jpg",
            "https://www.sacred-texts.com/tarot/pkt/img/swkn.jpg",
            "https://www.sacred-texts.com/tarot/pkt/img/swpa.jpg",
            "https://www.sacred-texts.com/tarot/pkt/img/sw10.jpg",
            "https://www.sacred-texts.com/tarot/pkt/img/sw09.jpg",
            "https://www.sacred-texts.com/tarot/pkt/img/sw08.jpg",
            "https://www.sacred-texts.com/tarot/pkt/img/sw07.jpg",
            "https://www.sacred-texts.com/tarot/pkt/img/sw06.jpg",
            "https://www.sacred-texts.com/tarot/pkt/img/sw05.jpg",
            "https://www.sacred-texts.com/tarot/pkt/img/sw04.jpg",
            "https://www.sacred-texts.com/tarot/pkt/img/sw03.jpg",
            "https://www.sacred-texts.com/tarot/pkt/img/sw02.jpg",
            "https://www.sacred-texts.com/tarot/pkt/img/swac.jpg",
            "https://www.sacred-texts.com/tarot/pkt/img/peki.jpg",
            "https://www.sacred-texts.com/tarot/pkt/img/pequ.jpg",
            "https://www.sacred-texts.com/tarot/pkt/img/pekn.jpg",
            "https://www.sacred-texts.com/tarot/pkt/img/pepa.jpg",
            "https://www.sacred-texts.com/tarot/pkt/img/pe10.jpg",
            "https://www.sacred-texts.com/tarot/pkt/img/pe09.jpg",
            "https://www.sacred-texts.com/tarot/pkt/img/pe08.jpg",
            "https://www.sacred-texts.com/tarot/pkt/img/pe07.jpg",
            "https://www.sacred-texts.com/tarot/pkt/img/pe06.jpg",
            "https://www.sacred-texts.com/tarot/pkt/img/pe05.jpg",
            "https://www.sacred-texts.com/tarot/pkt/img/pe04.jpg",
            "https://www.sacred-texts.com/tarot/pkt/img/pe03.jpg",
            "https://www.sacred-texts.com/tarot/pkt/img/pe02.jpg",
            "https://www.sacred-texts.com/tarot/pkt/img/peac.jpg"
        ];
        
        let desiredCard = interaction.options.getString('card');
        let pulledCard = cardArr[Math.floor(Math.random() * cardArr.length)];

        if (desiredCard !== null) {
            pulledCard = cardArr[Number(desiredCard)];
        }else{
            pulledCard = cardArr[Math.floor(Math.random() * cardArr.length)];
        }

        console.log(desiredCard);
       
    //Add the requested lookup text
    const embed =  new MessageEmbed()
    .setColor('#f15b40')
    .setImage(pulledCard);
		return interaction.reply({ embeds: [embed]}); //return it all to index for passing
	},
};
