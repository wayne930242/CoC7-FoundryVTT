import { CoC7CharacterSheet } from './actor-sheet.js';

export class CoC7CharacterSheetV2 extends CoC7CharacterSheet {
	
	// constructor(...args) {
	// 	super(...args);
	// }

	async getData() {
		const data = await super.getData();

		data.skillList=[];

		let previousSpec = '';
		for (const skill of data.skills) {
			if( skill.data.properties.special){
				if( previousSpec != skill.data.specialization){
					previousSpec = skill.data.specialization;
					data.skillList.push({
						isSpecialization: true,
						name: skill.data.specialization
					});
				}
			}
			data.skillList.push(skill);
		}

		data.displayPlayerName = game.settings.get( 'CoC7', 'displayPlayerNameOnSheet' );
		if( data.displayPlayerName  && !data.data.infos.playername) {
			const user = this.actor.characterUser;
			if( user){
				data.data.infos.playername = user.name;
			}
		}

		return data;
	}

	/**
   	 * Extend and override the default options used by the 5e Actor Sheet
   	 * @returns {Object}
	*/
	static get defaultOptions() {
		return mergeObject(super.defaultOptions, {
			classes: ['coc7', 'sheetV2', 'actor', 'character'],
			template: 'systems/CoC7/templates/actors/character-sheet-v2.html',
			width: 687,
			height: 623,
			resizable: true,
			dragDrop: [{dragSelector: '.item', dropSelector: null}],
			tabs: [{navSelector: '.sheet-nav', contentSelector: '.sheet-body', initial: 'skills'}]
		});
	}

	// _onDragStart(event) {
	// 	super._onDragStart(event);
	// }

	static renderSheet( sheet){
		// html.css('--main-sheet-bg',  'url( \'./artwork/backgrounds/character-sheet.png\') 4 repeat');
		if( game.settings.get('CoC7', 'overrideSheetArtwork')){
			if( game.settings.get('CoC7', 'artWorkSheetBackground')){
				sheet.element.css('--main-sheet-bg',  game.settings.get('CoC7', 'artWorkSheetBackground'));
				// const borderImage = sheet.element.find('form').css('border-image');
				// sheet.element.find('form').css('border-image', '');
				if( 'slice' !=  game.settings.get('CoC7', 'artWorkSheetBackgroundType')){
					let styleSheet, cssRuleIndex;
					for (let i = 0; i < document.styleSheets.length; i++) {
						if( document.styleSheets[i].href.endsWith('coc7g.css')){
							styleSheet = document.styleSheets[i];
							break;
						}					
					}

					if( styleSheet){
						for (let i = 0; i < styleSheet.rules.length; i++) {
							if( '.sheetV2.character form' == styleSheet.rules[i].selectorText){
								cssRuleIndex = i;
								break;
							}
						}
					}
					if( cssRuleIndex){
						const CSSStyle = styleSheet.rules[cssRuleIndex].style;
						CSSStyle.removeProperty( 'border-image');
						CSSStyle.setProperty( 'background', game.settings.get('CoC7', 'artWorkSheetBackground'));
						switch (game.settings.get('CoC7', 'artWorkSheetBackgroundType')) {
						case 'auto':
							CSSStyle.setProperty( 'background-size', 'auto');
							break;
						case 'contain':
							CSSStyle.setProperty( 'background-size', 'contain');
							break;
						case 'cover':
							CSSStyle.setProperty( 'background-size', 'cover');
							break;
						default:
							CSSStyle.setProperty( 'background-size', 'auto');
							break;
						}
					}
				}
				
			}
			else if( 'null' == game.settings.get('CoC7', 'artWorkSheetBackground').toLowerCase())
				sheet.element.css('--main-sheet-bg',  'url( \'./artwork/backgrounds/void.png\')');

			if( game.settings.get('CoC7', 'artWorkOtherSheetBackground'))
				sheet.element.css('--other-sheet-bg',  game.settings.get('CoC7', 'artWorkOtherSheetBackground'));
			else if( 'null' == game.settings.get('CoC7', 'artWorkOtherSheetBackground').toLowerCase())
				sheet.element.css('--other-sheet-bg',  'url( \'./artwork/backgrounds/void.png\')');
				
			if(game.settings.get('CoC7', 'artworkSheetImage'))
				sheet.element.css('--main-sheet-image',  game.settings.get('CoC7', 'artworkSheetImage'));
			else if( 'null' == game.settings.get('CoC7', 'artworkSheetImage').toLowerCase())
				sheet.element.css('--main-sheet-image',  'url( \'./artwork/backgrounds/void.png\')');

			if(game.settings.get('CoC7', 'artworkFrontColor')) sheet.element.css('--main-sheet-front-color',  game.settings.get('CoC7', 'artworkFrontColor'));
			if(game.settings.get('CoC7', 'artworkBackgroundColor')) sheet.element.css('--main-sheet-back-color',  game.settings.get('CoC7', 'artworkBackgroundColor'));
			if(game.settings.get('CoC7', 'artworkInteractiveColor')) sheet.element.css('--main-sheet-interactie-color',  game.settings.get('CoC7', 'artworkInteractiveColor'));

			if(!game.settings.get('CoC7', 'artworkFixedSkillLength')){
				sheet.element.css('--skill-length',  'auto');
				sheet.element.css('--skill-specialization-length',  'auto');
			}
			
			if(game.settings.get('CoC7', 'artworkMainFont')){
				var customSheetFont  = new FontFace('customSheetFont', game.settings.get('CoC7', 'artworkMainFont'));
				customSheetFont.load().then(function(loaded_face) {
					document.fonts.add(loaded_face);
				}).catch(function(error) {
					ui.notifications.error( error);
				});
			}

			if(game.settings.get('CoC7', 'artworkMainFontBold')){
				var customSheetCursiveFont = new FontFace('customSheetFont', game.settings.get('CoC7', 'artworkMainFontBold'), {weight:'bold'});
				customSheetCursiveFont.load().then(function(loaded_face) {
					document.fonts.add(loaded_face);
				}).catch(function(error) {
					ui.notifications.error( error);
				});
			}

			if( game.settings.get('CoC7', 'artworkMainFontSize')){
				const size = `${game.settings.get('CoC7', 'artworkMainFontSize')}px`;
				if( size != $(':root').css('font-size'))
					$(':root').css('font-size', size);
			}
		}
	}
    
}