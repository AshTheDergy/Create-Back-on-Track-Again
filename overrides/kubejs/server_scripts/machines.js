// priority: 0

var seed
var log = []

// Mod shortcuts
let MOD = (domain, id, x) => (x ? `${x}x ` : "") + (id.startsWith('#') ? '#' : "") + domain + ":" + id.replace('#', '')
let AE2 = (id, x) =>MOD("ae2", id, x)
let TE = (id, x) => MOD("thermal", id, x)
let AP = (id, x) => MOD("architects_palette", id, x)
let CR = (id, x) => MOD("create", id, x)
let TC = (id, x) => MOD("tconstruct", id, x)
let MC = (id, x) => MOD("minecraft", id, x)
let KJ = (id, x) => MOD("kubejs", id, x)
let FD = (id, x) => MOD("farmersdelight", id, x)
let BOP = (id, x) =>MOD("biomesoplenty", id, x)
let SD = (id, x) => MOD("storagedrawers", id, x) 
let SP = (id, x) => MOD("supplementaries", id, x)
let F = (id, x) =>  MOD("forge", id, x)
let AC = (id, x) => MOD("aquaculture", id, x)
let PP = (id, x) => MOD("prettypipes", id, x)
let OC = (id, x) => MOD("occultism", id, x)
let BC = (id, x) => MOD("createbigcannons", id, x)
let CI = (id, x) => MOD("createindustry", id, x)
//

let colours = ['white', 'orange', 'magenta', 'light_blue', 'lime', 'pink', 'purple', 'light_gray', 'gray', 'cyan', 'brown', 'green', 'blue', 'red', 'black', 'yellow']
let native_metals = ['iron', 'zinc', 'lead', 'copper', 'nickel', 'gold']
let wood_types = [MC('oak'), MC('spruce'), MC('birch'), MC('jungle'), MC('acacia'), MC('dark_oak'), MC('crimson'), MC('warped'), BOP('fir'), BOP('redwood'), BOP('cherry'), BOP('mahogany'), BOP('jacaranda'), BOP('palm'), BOP('willow'), BOP('dead'), BOP('magic'), BOP('umbran'), BOP('hellbark'), AP('twisted')]

let donutCraft = (event, output, center, ring) => {
	event.shaped(output, [
		'SSS',
		'SCS',
		'SSS'
	], {
		C: center,
		S: ring
	})
}

function ifiniDeploying(output, input, tool) {
	return {
		"type": "create:deploying",
		"ingredients": [
			Ingredient.of(input),
			Ingredient.of(tool)
		],
		"results": [
			Item.of(output)
		],
		"keepHeldItem": true
	}
}

ServerEvents.recipes(event => {
    log.push('Registering Recipes')
	andesiteMachine(event)
	copperMachine(event)
	brassMachine(event)
	trainMachine(event)
	zincMachine(event)
	explosiveMachine(event)
	chocolate(event)
	invarMachine(event)
	enderMachine(event)
	fluixMachine(event)
	log.push('Recipes Updated')
})

function andesiteMachine(event) {

	event.replaceInput({ id: CR("crafting/kinetics/brass_hand") }, '#forge:plates/brass', CR('golden_sheet'))
	wood_types.forEach(wood => {
		event.recipes.createCutting('2x ' + wood + '_slab', wood + '_planks').processingTime(150)
	})

	let saw = (id, material) =>{ 
		event.shaped(id, [
			'SSS',
			'SMS',
			'   '
		], {
			S: MC('stick'),
			M: material,
		})
	}
	saw(KJ('stone_saw'), "#forge:cobblestone")
	saw(KJ('iron_saw'), MC("iron_ingot"))
	saw(KJ('diamond_saw'), MC("diamond"))

	event.recipes.createCutting(CR('shaft',2), CR('andesite_alloy'))


	event.shaped('beyond_earth:hammer', [
		'III',
		'III',
		' S '
	], {
		S: MC('stick'),
		I: MC('iron_ingot'),
	})

	let transitional = 'kubejs:incomplete_rotation_mechanism'
	event.recipes.createSequencedAssembly([
		'kubejs:rotation_mechanism',
	], '#minecraft:wooden_slabs', [
		event.recipes.createDeploying(transitional, [transitional, CR('cogwheel')]),
		event.recipes.createDeploying(transitional, [transitional, CR('large_cogwheel')]),
		event.recipes.createDeploying(transitional, [transitional, F('#saws')])
	]).transitionalItem(transitional)
		.loops(1)
		.id('kubejs:rotation_mechanism')

	event.shapeless(KJ('rotation_mechanism'), [F('#saws'), CR('cogwheel'), CR('andesite_alloy'), '#minecraft:logs']).id("kubejs:rotation_mechanism_manual_only")
		.damageIngredient(Item.of(KJ('stone_saw')))
		.damageIngredient(Item.of(KJ('iron_saw')))
		.damageIngredient(Item.of(KJ('diamond_saw')))

	// Andesite
	event.shaped(KJ('andesite_machine'), [
		'SSS',
		'SCS',
		'SSS'
	], {
		C: CR('andesite_casing'),
		S: KJ('rotation_mechanism')
	})
	transitional = 'kubejs:incomplete_rotation_machine'

	event.recipes.createSequencedAssembly([
		'kubejs:andesite_machine',
	], 'create:andesite_casing', [
		event.recipes.createDeploying(transitional, [transitional, KJ('rotation_mechanism')])
	])	.transitionalItem(transitional)
		.loops(8)
		.id('kubejs:rotation_machine_by_deployer')

	
	let andesite_machine = (id, amount, other_ingredient) => {
		event.remove({ output: id })
		if (other_ingredient) {
			event.smithing(`${amount}x ${id}`, 'kubejs:andesite_machine', other_ingredient)
			event.recipes.createMechanicalCrafting(`${amount}x ${id}`, "AB", { A: 'kubejs:andesite_machine', B: other_ingredient })
		}
		else
			event.stonecutting(`${amount}x ${id}`, 'kubejs:andesite_machine')
	}

	event.remove({ output: TE('drill_head') })
	event.shaped(TE('drill_head'), [
		'NN ',
		'NLP',
		' PL'
	], {
		N: MC('iron_nugget'),
		P: CR('iron_sheet'),
		L: TE('lead_ingot')
	})

	event.remove({ output: TE('saw_blade') })
	event.shaped(TE('saw_blade'), [
		'NPN',
		'PLP',
		'NPN'
	], {
		N: MC('iron_nugget'),
		P: CR('iron_sheet'),
		L: TE('lead_ingot')
	})

	event.remove({ output: CR('encased_fan') })
	event.remove({ output: CR('deployer') })
	event.remove({ output: 'sliceanddice:slicer' })
	event.remove({ output: 'thermal:device_tree_extractor' })
	event.remove({ output: 'waterstrainer:strainer_base' })
	event.remove({ output: CR('mechanical_drill') })
	event.remove({ output: CR('mechanical_mixer') })
	event.remove({ output: CR('mechanical_saw') })
	event.remove({ output: CR('mechanical_press') })
	event.remove({ output: 'thermal:dynamo_stirling'})

	event.shaped(CR('encased_fan'), [
		' IS',
		'AMA',
		' P '
	], {M: KJ('andesite_machine'), A: CR('andesite_alloy'), I: CR('shaft'), P: CR('propeller'), S: Item.of('beyond_earth:hammer')})  .damageIngredient(Item.of('beyond_earth:hammer'))

	event.shaped(CR('deployer'), [
		' IS',
		'AMA',
		' P '
	], {M: KJ('andesite_machine'), A: CR('andesite_alloy'), I: CR('piston_extension_pole'), P: CR('brass_hand'), S: Item.of('beyond_earth:hammer')})  .damageIngredient(Item.of('beyond_earth:hammer'))
	
	event.shaped(CR('mechanical_press'), [
		' IS',
		'AMA',
		' P '
	], {M: KJ('andesite_machine'), A: CR('andesite_alloy'), I: CR('piston_extension_pole'), P: MC('iron_block'), S: Item.of('beyond_earth:hammer')})  .damageIngredient(Item.of('beyond_earth:hammer'))
	
	event.shaped(CR('mechanical_mixer'), [
		' IS',
		'AMA',
		' P '
	], {M: KJ('andesite_machine'), A: CR('andesite_alloy'), I: CR('cogwheel'), P: CR('whisk'), S: Item.of('beyond_earth:hammer')})  .damageIngredient(Item.of('beyond_earth:hammer'))
	
	event.shaped('sliceanddice:slicer', [
		' IS',
		'AMA',
		' P '
	], {M: KJ('andesite_machine'), A: CR('andesite_alloy'), I: CR('cogwheel'), P: CR('turntable'), S: Item.of('beyond_earth:hammer')})  .damageIngredient(Item.of('beyond_earth:hammer'))
	
	event.shaped('thermal:device_tree_extractor', [
		' IS',
		'AMA',
		' P '
	], {M: KJ('andesite_machine'), A: CR('andesite_alloy'), I: MC('bucket'), P: CR('fluid_pipe'), S: Item.of('beyond_earth:hammer')})  .damageIngredient(Item.of('beyond_earth:hammer'))
	
	event.shaped('waterstrainer:strainer_base', [
		'  S',
		'III',
		'AMA'
	], {M: KJ('andesite_machine'), A: CR('andesite_alloy'), I: 'createaddition:iron_rod', S: Item.of('beyond_earth:hammer')})  .damageIngredient(Item.of('beyond_earth:hammer'))
	
	event.shaped(CR('mechanical_drill'), [
		' IS',
		'AMA',
		' P '
	], {M: KJ('andesite_machine'), A: CR('andesite_alloy'), I: CR('shaft'), P: TE('drill_head'), S: Item.of('beyond_earth:hammer')})  .damageIngredient(Item.of('beyond_earth:hammer'))
	
	event.shaped(CR('mechanical_saw'), [
		' IS',
		'AMA',
		' P '
	], {M: KJ('andesite_machine'), A: CR('andesite_alloy'), I: CR('shaft'), P: TE('saw_blade'), S: Item.of('beyond_earth:hammer')})  .damageIngredient(Item.of('beyond_earth:hammer'))
	
	event.shaped('thermal:dynamo_stirling', [
		' PS',
		'AMA',
		'AIA'
	], {M: KJ('andesite_machine'), A: CR('andesite_alloy'), I: MC('furnace'), S: Item.of('beyond_earth:hammer'), P:TE('rf_coil')})  .damageIngredient(Item.of('beyond_earth:hammer'))
	

	andesite_machine('create:portable_storage_interface', 2)
	andesite_machine('create:mechanical_harvester', 2)
	andesite_machine('create:mechanical_plough', 2)
	andesite_machine(AE2('meteorite_compass'), 1, AE2('charged_certus_quartz_crystal'))
	andesite_machine(AE2('charger'), 1, CR('copper_sheet'))
	andesite_machine('create:andesite_funnel', 4)
	andesite_machine('create:andesite_tunnel', 4)
	andesite_machine('kubejs:pipe_module_utility', 4)
	andesite_machine(CR('item_vault'), 3, CR('iron_sheet'))
	andesite_machine(CR('mechanical_roller'), 1, CR('crushing_wheel'))
	andesite_machine(CR('contraption_controls'), 1, MC('stone_button'))


	andesite_machine('toms_storage:ts.storage_terminal', 1, MC('diamond'))
	andesite_machine('toms_storage:ts.inventory_connector', 1, CR('andesite_funnel'))
	andesite_machine('toms_storage:ts.inventory_cable', 8)
	event.smithing('toms_storage:ts.crafting_terminal', 'toms_storage:ts.storage_terminal', MC('crafting_table'))

}

function copperMachine(event) {

	let t = KJ('incomplete_pressure_mechanism')
	event.recipes.createSequencedAssembly([
		KJ('pressure_mechanism'),
	], KJ('rotation_mechanism'), [
		event.recipes.createDeploying(t, [t, TE('cured_rubber')]),
		event.recipes.createDeploying(t, [t, TE('cured_rubber')]),
		event.recipes.createDeploying(t, [t, F('#super_glues')])
	]).transitionalItem(t)
		.loops(1)
		.id('kubejs:pressure_mechanism')

	event.shaped(KJ('pressure_mechanism'), [
		'SCS'
	], {
		C: KJ('rotation_mechanism'),
		S: TE('cured_rubber')
	})

	event.shaped(KJ('copper_machine'), [
		'SSS',
		'SCS',
		'SSS'
	], {
		C: CR('copper_casing'),
		S: KJ('pressure_mechanism')
	})

	event.remove({ id: TC("smeltery/casting/seared/smeltery_controller") })
	event.remove({ id: TC("smeltery/melting/copper/smeltery_controller") })
	donutCraft(event, TC('smeltery_controller'), TC('seared_bricks'), KJ('pressure_mechanism'))

	let copper_machine = (id, amount, other_ingredient) => {
		event.remove({ output: id })
		if (other_ingredient) {
			event.smithing(`${amount}x ${id}`, 'kubejs:copper_machine', other_ingredient)
			event.recipes.createMechanicalCrafting(`${amount}x ${id}`, "AB", { A: 'kubejs:copper_machine', B: other_ingredient })
		}
		else
			event.stonecutting(`${amount}x ${id}`, 'kubejs:copper_machine')
	}

	event.remove({ output: CR('steam_engine') })
	event.remove({ output: CR('spout') })
	event.remove({ output: CR('hose_pulley') })
	event.remove({ output: TE('dynamo_magmatic') })
	event.remove({ output: 'create_enchantment_industry:printer' })

	event.shaped(CR('steam_engine'), [
		' GS',
		'CMC',
		'CBC'
	], {M: KJ('copper_machine'), C: MC('copper_ingot'), G: CR('golden_sheet'), S: Item.of('create:super_glue'), B: MC('copper_block')})  .damageIngredient(CR('super_glue'))
	
	event.shaped(CR('spout'), [
		' MS',
		'RHR',
		' R '
	], {M: KJ('copper_machine'), H: MC('hopper'), R: TE('cured_rubber'), S: Item.of('create:super_glue')})  .damageIngredient(CR('super_glue'))
	
	event.shaped(CR('hose_pulley'), [
		'  G',
		'PMS',
		' R '
	], {M: KJ('copper_machine'), S: CR('shaft'), R: TE('cured_rubber_block'), G: Item.of('create:super_glue'), P: CR('fluid_pipe')})  .damageIngredient(CR('super_glue'))
	
	event.shaped(TE('dynamo_magmatic'), [
		' RS',
		'HMH',
		'HTH'
	], {M: KJ('copper_machine'), H: 'alloyed:steel_ingot', R: TE('rf_coil'), S: Item.of('create:super_glue'), T: TC('seared_fuel_tank')})  .damageIngredient(CR('super_glue'))
	
	event.shaped('create_enchantment_industry:printer', [
		' MS',
		'RHR',
		' I '
	], {M: KJ('copper_machine'), H: MC('hopper'), I: MC('iron_block'), R: 'create_enchantment_industry:experience_rotor', S: Item.of('create:super_glue')})  .damageIngredient(CR('super_glue'))
	
	copper_machine('create:copper_backtank', 1, MC("copper_block"))
	copper_machine('create:portable_fluid_interface', 2)
	copper_machine('create:fluid_tank', 3, "#forge:glass")
	copper_machine('thermal:upgrade_augment_1', 1, MC('redstone'))
	copper_machine('create:item_drain', 1, MC("iron_bars"))
	copper_machine('thermal:device_water_gen', 1, MC('bucket'))
	copper_machine('create:smart_fluid_pipe', 2)
	//copper_machine('create_enchantment_industry:disenchanter', 1, "#create:sandpaper")
}

function brassMachine(event) {

	let redstoneTransmute = (input, output) => {
		event.custom({
			"type": "tconstruct:casting_basin",
			"cast": { "item": input },
			"cast_consumed": true,
			"fluid": {
				"name": "thermal:redstone",
				"amount": 50
			},
			"result": output,
			"cooling_time": 30
		})
	}

	redstoneTransmute(MC("cobblestone"), MC("netherrack"))
	redstoneTransmute(MC("sand"), MC("red_sand"))

	event.recipes.createMilling([KJ('diorite_dust')], MC('diorite')).processingTime(75)

	
	event.smoking(SP('ash'), MC('charcoal'))

	event.recipes.createMixing(Fluid.of(KJ('ash_water'), 500), [Item.of(SP('ash'), 1), Fluid.of(MC('water'), 500)])
	

	event.recipes.createMilling([KJ('impure_sky_chunks')], AE2('sky_stone_block')).processingTime(75)

	event.recipes.createMixing([KJ('clean_sky_chunks'), Fluid.of(KJ('dirt_water'), 50)], [KJ('impure_sky_chunks'), Fluid.of(KJ("ash_water"), 250)])

	event.custom({

		"type": "farmersdelight:cutting",
		"ingredients": [
			{
			"item": "kubejs:clean_sky_chunks"
			}
		],
		"tool": {
			"tag": "forge:tools/knives"
		},
		"result": [
			{
			"item": "kubejs:cut_sky_chunks",
			"count": 1
			}
		]

	})

	event.recipes.createMixing([KJ('pure_sky_chunks')], [KJ('cut_sky_chunks'), Fluid.of(MC('water'), 250), KJ('diorite_dust')])
	event.recipes.createMilling([AE2('sky_dust')], KJ('pure_sky_chunks')).processingTime(75)
	

	event.remove({ id: CR("sequenced_assembly/precision_mechanism") })
	let t = CR('incomplete_precision_mechanism')
	event.recipes.createSequencedAssembly([
		CR('precision_mechanism'),
	], KJ('rotation_mechanism'), [
		event.recipes.createDeploying(t, [t, CR('electron_tube')]),
		event.recipes.createDeploying(t, [t, CR('electron_tube')]),
		event.recipes.createDeploying(t, [t, '#forge:screwdrivers'])
	]).transitionalItem(t)
		.loops(1)
		.id('kubejs:precision_mechanism')

	event.shaped(KJ('brass_machine'), [
		'SSS',
		'SCS',
		'SSS'
	], {
		C: CR('brass_casing'),
		S: CR('precision_mechanism')
	})

	let brass_machine = (id, amount, other_ingredient) => {
		event.remove({ output: id })
		if (other_ingredient) {
			event.smithing(`${amount}x ${id}`, 'kubejs:brass_machine', other_ingredient)
			event.recipes.createMechanicalCrafting(`${amount}x ${id}`, "AB", { A: 'kubejs:brass_machine', B: other_ingredient })
		}
		else
			event.stonecutting(`${amount}x ${id}`, 'kubejs:brass_machine')
	}
	event.remove({output: TE('dynamo_numismatic')})
	event.shaped(TE('dynamo_numismatic'), [
		' RS',
		'HMH',
		'HTH'
	], {M: KJ('brass_machine'), H: CR('brass_sheet'), R: TE('rf_coil'), S: Item.of('createindustry:screwdriver'), T: TE('silver_coin')})  .damageIngredient(CI('screwdriver'),10)

	event.remove({output: CR('mechanical_crafter')})
	event.shaped(CR('mechanical_crafter', 3), [
		' RS',
		'HTH',
		' M '
	], {M: KJ('brass_machine'), H: CR('brass_sheet'), R: CR('cogwheel'), S: Item.of('createindustry:screwdriver'), T: MC('crafting_table')})  .damageIngredient(CI('screwdriver'),10)

	event.remove({output: CR('mechanical_arm')})
	event.shaped(CR('mechanical_arm'), [
		'HHT',
		'H S',
		'HMR'
	], {M: KJ('brass_machine'), H: CR('brass_sheet'), R: CR('cogwheel'), S: Item.of('createindustry:screwdriver'), T: CR('brass_hand')})  .damageIngredient(CI('screwdriver'),10)

	

	// brass_machine('create:mechanical_crafter', 3, MC('crafting_table'))
	brass_machine('create:sequenced_gearshift', 2)
	// brass_machine('create:furnace_engine', 1)
	brass_machine('create:rotation_speed_controller', 1)
	// brass_machine('create:mechanical_arm', 1)
	brass_machine('create:stockpile_switch', 2)
	brass_machine('create:content_observer', 2)
	brass_machine('thermal:machine_press', 1, MC('dropper'))
	brass_machine('torchmaster:feral_flare_lantern', 1, MC('glowstone_dust'))
	event.remove({output: PP('item_terminal')})
	event.smithing(PP('item_terminal'),'toms_storage:ts.storage_terminal', KJ('brass_machine'))
	brass_machine(PP('pressurizer'), 1, CR('propeller'))
	brass_machine('create:brass_funnel', 4)
	brass_machine('create:brass_tunnel', 4)
	brass_machine('kubejs:pipe_module_tier_1', 4)
	brass_machine(CI('machine_input'), 1, CI('heavy_machinery_casing'))
	brass_machine(CR('elevator_pulley'), 1, CR('rope_pulley'))

	///  / \       / \
	/// / ! \ OIL / ! \
	/// =====     =====

	event.remove({output: CI('pumpjack_base')})
	event.shaped(CI('pumpjack_base'), [
		'PPP',
		'STS',
		'ITI'
	], {P:CI('heavy_plate'), S:'alloyed:steel_sheet', I: 'alloyed:steel_ingot', T: CI('industrial_pipe')})


	event.remove({output: CI('surface_scanner')})
	event.shaped(CI('surface_scanner'), [
		' HS',
		'HTH',
		'TMR'
	], {M: KJ('brass_machine'), H: 'alloyed:steel_sheet', R: CR('copper_sheet'), S: Item.of('createindustry:screwdriver'), T: KJ('diamond_tube')})  .damageIngredient(CI('screwdriver'),10)

	event.remove({output:  CI('steel_distillation_controller')})
	event.shaped( CI('steel_distillation_controller'), [
		'CPC',
		'CMC',
		'CAC'
	], {M: KJ('brass_machine'), C: BC('cast_iron_ingot'), P: CI('industrial_pipe'), A: CI('heavy_machinery_casing')})

	//event.smithing(CI('distillation_tower_controller'), CI('steel_distillation_controller'), CI('heavy_machinery_casing'))

}

function trainMachine(event){
	event.shaped(KJ('train_mechanism'), [
		' S ',
		'CBE',
		' S '
	], {
		C: KJ('pressure_mechanism'),
		S: CR('sturdy_sheet'),
		E: KJ('rotation_mechanism'),
		B: CR('brass_ingot')
	})

	event.blasting(MC('crying_obsidian'), MC('obsidian'))

	event.replaceInput({output: CR('powdered_obsidian')}, MC('obsidian'), MC('crying_obsidian'))
	// event.replaceOutput({output: CR('powdered_obsidian')}, MC('obsidian'), MC('crying_obsidian'))

	donutCraft(event, KJ('train_machine'), CR('railway_casing'), KJ('train_mechanism'))

	let train_machine = (id, amount, other_ingredient) => {
		event.remove({ output: id })
		if (other_ingredient) {
			event.smithing(`${amount}x ${id}`, 'kubejs:train_machine', other_ingredient)
			event.recipes.createMechanicalCrafting(`${amount}x ${id}`, "AB", { A: 'kubejs:train_machine', B: other_ingredient })
		}
		else
			event.stonecutting(`${amount}x ${id}`, 'kubejs:train_machine')
	}

	train_machine(CR('track_station'), 2, MC('compass'))
	train_machine(CR('track_signal'), 4, MC('redstone_torch'))
	train_machine(CR('track_observer'), 4, MC('observer'))
	train_machine(CR('controls'), 1, CR('analog_lever'))
	train_machine('railways:track_coupler', 1, CR('minecart_coupling'))
	train_machine('railways:semaphore', 4, CR('electron_tube'))

}

function zincMachine(event) {

	// event.custom({
	// 	"type": "tconstruct:casting_basin",
	// 	"cast": {
	// 		"item": "minecraft:basalt"
	// 	},
	// 	"cast_consumed": true,
	// 	"fluid": {
	// 		"name": "minecraft:lava",
	// 		"amount": 1000
	// 	},
	// 	"result": Item.of(TE("basalz_rod"), 2),
	// 	"cooling_time": 15
	// })

	//event.recipes.createFilling(TE("basalz_rod"), [MC('basalt'), Fluid.of(TC('blood'), 100)])
	//event.recipes.createFilling(MC("magma_cream"), [TC('blood_slime_ball'), Fluid.of(MC('lava'), 100)])

	// event.remove({ id: TE('basalz_powder') })
	// event.remove({ id: TC('smeltery/casting/scorched/stone_from_magma') })
	event.remove({ id: TC('smeltery/casting/scorched/foundry_controller') })
	// event.remove({ id: TC('smeltery/scorched/scorched_brick_kiln') })
	// event.remove({ id: TC('smeltery/scorched/scorched_brick') })
	// event.remove({ id: TC('smeltery/melting/scorched/grout') })
	event.remove({ id: TC('smeltery/melting/soul/sand') })
	// event.recipes.createMilling([Item.of(TE('basalz_powder'), 1)], TE("basalz_rod")).processingTime(300)

	donutCraft(event, TC('foundry_controller'), TC('scorched_bricks'), KJ('scorch_mechanism'))

	event.recipes.createMixing(Fluid.of(TC("blood"), 1000), [MC('twisting_vines',1), MC('weeping_vines',3)]).heated()
    event.recipes.createFilling(MC("magma_cream"),[Fluid.of(MC("lava"), 250), TC("blood_slime_ball")])
    
    
	//

	let t = KJ('incomplete_scorch_mechanism')
	event.recipes.createSequencedAssembly([
		KJ('scorch_mechanism'),
	], CR('precision_mechanism'), [
        event.recipes.createDeploying(t, [t, TC("scorched_brick")]),
        event.recipes.createDeploying(t, [t, TC("scorched_brick")]),
		event.recipes.createFilling(t, [t, Fluid.of(MC("lava"), 1000)]),
		event.recipes.createFilling(t, [t, Fluid.of(MC("lava"), 1000)]),
	]).transitionalItem(t)
		.loops(1)
		.id('kubejs:scorch_mechanism')

	event.shaped(KJ('zinc_machine'), [
		'SSS',
		'SCS',
		'SSS'
	], {
		C: KJ('zinc_casing'),
		S: KJ('scorch_mechanism')
	})

	let zinc_machine = (id, amount, other_ingredient) => {
		event.remove({ output: id })
		if (other_ingredient) {
			event.smithing(`${amount}x ${id}`, 'kubejs:zinc_machine', other_ingredient)
			event.recipes.createMechanicalCrafting(`${amount}x ${id}`, "AB", { A: 'kubejs:zinc_machine', B: other_ingredient })
		}
		else
			event.stonecutting(`${amount}x ${id}`, 'kubejs:zinc_machine')
	}

	zinc_machine(TE('device_rock_gen'), 1, MC('piston'))
	zinc_machine(TE('device_collector'), 1, MC('ender_pearl'))
	zinc_machine(TE('device_nullifier'), 1, MC('lava_bucket'))
	zinc_machine(TE('device_potion_diffuser'), 1, MC('glass_bottle'))
	zinc_machine('storagedrawers:controller', 1, MC('diamond'))
	zinc_machine('storagedrawers:controller_slave', 1, MC('gold_ingot'))
	zinc_machine('torchmaster:megatorch', 1, MC('torch'))
	zinc_machine('thermal:upgrade_augment_2', 1, MC('redstone'))
	zinc_machine(BC("cannon_builder"), 1, 'createbigcannons:cast_iron_block')
	zinc_machine('createbigcannons:cannon_drill', 1, TE('drill_head'))

}

function explosiveMachine(event){

	// event.recipes.createMixing([CR("powdered_obsidian").withChance(1), TE("sulfur").withChance(10)], [ Fluid.of(MC("lava"), 1000), Fluid.of(MC("water"), 1000)])
	event.remove({id: 'alloyed:mixing/steel_ingot'})

	event.remove({id: 'thermal:gunpowder_4'})
	event.remove({type:'createindustry:distillation'})
	event.remove({id: 'createindustry:mixing/coal_coke'})

	event.replaceInput({output: 'createindustry:coal_coke'}, 'minecraft:coal', 'minecraft:charcoal')
	// event.replaceOutput({}, 'createindustry:coal_coke', 'thermal:coal_coke')

	event.replaceOutput({}, 'createindustry:saltpeter', 'thermal:niter_dust')
	event.replaceOutput({}, 'createindustry:sulfur_powder', 'thermal:sulfur_dust')

	event.replaceInput({}, 'createindustry:coal_coke', 'thermal:coal_coke')
	event.replaceInput({}, 'createindustry:saltpeter', 'thermal:niter_dust')
	event.replaceInput({}, 'createindustry:sulfur_powder', 'thermal:sulfur_dust')

	event.custom({
		"type": "createindustry:distillation",
		"ingredients": [

			{
			"fluid": "createindustry:heavy_oil",
			"nbt": {},
			"amount": 90
			}
		],
		"results": [
			{
			"fluid": "createindustry:diesel",
			"amount": 30
			},
			{
			"fluid": "createindustry:lubrication_oil",
			"amount": 30
			},
			{
			"fluid": "createindustry:lubrication_oil",
			"amount": 30
			},
			{
			"item": "thermal:sulfur_dust"
			},
			{
			"item": "thermal:tar"

			}
		]
	})

	event.recipes.createMixing([MC('dirt')], [Fluid.of(MC('water')), MC('sand'), MC('clay_ball'), MC('gravel')])

	event.recipes.createMixing([TE('coal_coke')], [MC('charcoal')] ).heated().processingTime(150)
	event.recipes.createMixing([Fluid.of(BC('molten_steel'), 90)], ['thermal:coal_coke', Fluid.of(TC('molten_iron'), 90)]).heated()

	event.recipes.createFilling(KJ('lube_can'), [TC('copper_can'), Fluid.of(CI('lubrication_oil'))])


	var t = KJ('incomplete_explosive_mechanism')
	event.recipes.createSequencedAssembly([
		KJ('explosive_mechanism'),
	], CR('precision_mechanism'), [
		event.recipes.createDeploying(t, [t, KJ("steel_ring")]),
		event.recipes.createDeploying(t, [t, BC("packed_gunpowder")]),
		event.recipes.createFilling(t, [t, Fluid.of("createindustry:lubrication_oil", 175)]),
		event.recipes.createFilling(t, [t, Fluid.of("createindustry:diesel",  380)]),
		event.recipes.createFilling(t, [t, Fluid.of("createindustry:gasoline",329)]),
		event.recipes.createDeploying(t, [t, TE("iron_gear")]),
		event.recipes.createPressing(t, t)
	]).transitionalItem(t)
		.loops(1)



	event.custom({
		"type": "createbigcannons:melting",
		"ingredients": [
		  {
			"item": "create:crushed_raw_aluminum"
		  }
		],
		"results": [
		  {
			"fluid": "tconstruct:molten_aluminum",
			"amount": 60
		  },
		],
		"processingTime": 180,
		"heatRequirement": "heated"
	})
		//.id('kubejs:explosive_mechanism')
    /*
	let t = KJ('incomplete_explosive_mechanism')
	event.recipes.createSequencedAssembly([
		KJ('explosive_mechanism'),
	], CR('precision_mechanism'), [
		event.recipes.createFilling  (t, [t, Fluid.of('createbigcannons:molten_steel', 100)]),
		event.recipes.createPressing (t, t),
		event.recipes.createDeploying(t, [t, BC("packed_gunpowder")]),
		event.recipes.createDeploying(t, [t, BC("packed_gunpowder")]),
		event.recipes.createDeploying(t, [t, TE("iron_gear")])
	]).transitionalItem(t)
		.loops(1)
		.id('kubejs:explosive_mechanism')
*/
		
	event.shaped(KJ('explosive_machine'), [
			'SSS',
			'SCS',
			'SSS'
		], {
		C: 'alloyed:steel_casing',
		S: KJ('explosive_mechanism')
	})

	let explosive_machine = (id, amount, other_ingredient) => {
		event.remove({ output: id })
		if (other_ingredient) {
			event.smithing(`${amount}x ${id}`, 'kubejs:explosive_machine', other_ingredient)
			event.recipes.createMechanicalCrafting(`${amount}x ${id}`, "AB", { A: 'kubejs:explosive_machine', B: other_ingredient })
		}
		else
			event.stonecutting(`${amount}x ${id}`, 'kubejs:explosive_machine')
	}
	explosive_machine('kubejs:pipe_module_tier_2', 4)
	

	explosive_machine('createbigcannons:cannon_loader', 1, CR('piston_extension_pole'))
	explosive_machine(BC("impact_fuze"), 6)
	explosive_machine(BC("timed_fuze"), 6)
	explosive_machine(BC("proximity_fuze"), 6)
	explosive_machine(BC("cannon_mount"), 1, CR('mechanical_bearing'))
	explosive_machine(BC("yaw_controller"), 1, CR('turntable'))

	event.remove({output:CI('steel_fluid_tank')})
	event.smithing(CI('steel_fluid_tank'), CR('fluid_tank'), 'alloyed:steel_sheet')

	event.replaceInput({output:CI('engine_base')}, CI('heavy_machinery_casing'), KJ('explosive_machine'))
	event.replaceInput({output:CI('engine_base')}, 'alloyed:steel_ingot', KJ('explosive_machine'))


	event.remove({output:CI('quad_potato_cannon')})
	event.recipes.createMechanicalCrafting(CI('quad_potato_cannon'), [
		'SSSS',
		'PPCM',
		'  A '
	], {
		A: CR('andesite_alloy'),
		P: CI('industrial_pipe'),
		C: CR('potato_cannon'),
		M: KJ('explosive_machine'),
		S: 'alloyed:steel_sheet'
	})

	event.remove({output:CI('heavy_plate') })
	let e = CI('unprocessed_heavy_plate')
	event.recipes.createSequencedAssembly([
		CI('heavy_plate'),
	], TE('nickel_ingot'), [
		event.recipes.createDeploying(e, [e, 'alloyed:steel_sheet']),
		event.recipes.createPressing(e, e),
		event.recipes.createPressing(e, e),
	]).transitionalItem(e)
	  .loops(1)

}

function invarMachine(event) {
	event.remove({output:'createaddition:capacitor'})
    event.remove({})
	event.custom({
		"type":"createaddition:charging",
		"input": {
			"item": "createbigcannons:cast_iron_ingot",
			"count": 1
		},
		"result": {
			"item": "kubejs:inductor_core",
			"count": 1
		},
		"energy": 10000
	})

	event.custom({
		"type":"createaddition:charging",
		"input": {
			"item": "kubejs:soaked_sheet",
			"count": 1
		},
		"result": {
			"item": "kubejs:rough_sheet",
			"count": 1
		},
		"energy": 4000
	})

	event.replaceInput({output: "createaddition:copper_wire"}, '#forge:plates/copper', "createaddition:copper_rod")

	event.recipes.createMilling(KJ('ceramic_powder'), MC('brick')).processingTime(50)
	
	event.remove({id: 'create:milling/dripstone_block'})
	event.recipes.createCompacting(MC('dripstone_block'), MC('clay'));

	event.recipes.createCrushing([	Item.of(MC('clay_ball')).withChance(1),
									Item.of(CR('copper_nugget')).withChance(0.65),
									Item.of(CR('copper_nugget')).withChance(0.5)]
									, MC("dripstone_block"))

	event.recipes.createCutting(KJ('mica_sheet', 3), KJ('mica_block'))

	event.recipes.createMixing([Fluid.of(KJ('electrolyte'), 1000), 'beyond_earth:desh_ingot'], [TE('sulfur_dust'), "beyond_earth:desh_ingot", Fluid.of(MC('water'), 1000)])
	
	event.recipes.createMixing([Fluid.of(KJ('plastic'), 90), 'beyond_earth:desh_ingot'], ["beyond_earth:desh_ingot", Fluid.of(CI('heavy_oil'), 180)]).heated()

	

	event.recipes.createPressing(KJ('carbon_sheet'), MC('charcoal'))

	event.recipes.createFilling(KJ('soaked_sheet'), [CR('copper_sheet'), Fluid.of(KJ('electrolyte'), 100)])

	event.remove({ output: TE('machine_frame') })
	event.shapeless(KJ('power_machine'), TE('machine_frame'))

	var t = KJ('incomplete_inductor')
	event.recipes.createSequencedAssembly([
		KJ('dirt_inductor'),
	], KJ('inductor_core'), [
		event.recipes.createDeploying(t, [t, "createaddition:copper_wire"]),
		event.recipes.createDeploying(t, [t, KJ('plastic')]),
		event.recipes.createDeploying(t, [t, "createaddition:copper_wire"]),
		event.recipes.createDeploying(t, [t, KJ('plastic')]),
		event.recipes.createPressing(t, t)
	]).transitionalItem(t)
		.loops(1)
		.id('kubejs:inductor')

	t = KJ('incomplete_resistor')

	event.recipes.createSequencedAssembly([
		KJ('dirt_resistor'),
	], KJ('plastic'), [
		event.custom(ifiniDeploying(t, t, TE('drill_head'))),
		event.recipes.createDeploying(t, [t, KJ('carbon_sheet')]),
		event.recipes.createDeploying(t, [t, KJ('carbon_sheet')]),
		event.recipes.createDeploying(t, [t, MC('clay_ball')]),
		event.recipes.createDeploying(t, [t, "createaddition:copper_rod"]),
		event.recipes.createPressing(t, t)
	]).transitionalItem(t)
		.loops(1)
		.id('kubejs:resistor_assembly')
	t = KJ('incomplete_electrolytic_capacitor')

	event.recipes.createSequencedAssembly([
		KJ('dirt_electrolytic_capacitor'),
	], KJ('rough_sheet'), [
		event.recipes.createFilling  (t, [t, Fluid.of(MC('water'), 500)]),
		event.recipes.createFilling  (t, [t, Fluid.of(KJ('electrolyte'), 200)]),
		event.recipes.createDeploying(t, [t, CR('copper_sheet')]),
		event.recipes.createDeploying(t, [t, "createaddition:copper_rod"]),
		event.recipes.createDeploying(t, [t, KJ('plastic')]),
		event.recipes.createPressing (t, t)
	]).transitionalItem(t)
		.loops(1)
		.id('kubejs:electrolytic_capacitor_assembly')

	t = KJ('incomplete_ceramic_capacitor')
	event.recipes.createSequencedAssembly([
		KJ('dirt_ceramic_capacitor'),
	], KJ('ceramic_powder'), [
		event.recipes.createPressing(t, t),
		event.recipes.createDeploying(t, [t, CR('copper_sheet')]),
		event.recipes.createDeploying(t, [t, KJ('mica_sheet')]),
		event.recipes.createDeploying(t, [t, CR('copper_sheet')]),
		event.recipes.createDeploying(t, [t, KJ('ceramic_powder')]),
		event.recipes.createDeploying(t, [t, "createaddition:copper_rod"]),
		event.recipes.createPressing(t, t)
	]).transitionalItem(t)
		.loops(1)
		.id('kubejs:resistor')


	event.recipes.createMixing([KJ('resistor'), Fluid.of(KJ('dirt_water'), 110)], [KJ('dirt_resistor'), Fluid.of(MC('water'), 100)])
	event.recipes.createMixing([KJ('ceramic_capacitor'), Fluid.of(KJ('dirt_water'), 110)], [KJ('dirt_ceramic_capacitor'), Fluid.of(MC('water'), 100)])
	event.recipes.createMixing([KJ('electrolytic_capacitor'), Fluid.of(KJ('dirt_water'), 110)], [KJ('dirt_electrolytic_capacitor'), Fluid.of(MC('water'), 100)])
	event.recipes.createMixing([KJ('inductor'), Fluid.of(KJ('dirt_water'), 110)], [KJ('dirt_inductor'), Fluid.of(MC('water'), 100)])

	t = KJ('incomplete_power_mechanism')

	event.recipes.createSequencedAssembly([
		KJ('power_mechanism'),
	], KJ('explosive_mechanism'), [
		event.recipes.createFilling(t, [t, Fluid.of(KJ('plastic'), 30)]),
		event.recipes.createFilling(t, [t, Fluid.of("create_enchantment_industry:ink", 30)]),

		event.recipes.createDeploying(t, [t, KJ('electrolytic_capacitor')]),
		event.recipes.createDeploying(t, [t, KJ('ceramic_capacitor')]),
		event.recipes.createDeploying(t, [t, KJ('resistor')]),
		event.recipes.createDeploying(t, [t, KJ('inductor')]),

		event.recipes.createDeploying(t, [t, F('#soldering_irons')]),
	]).transitionalItem(t)
		.loops(1)
		.id('kubejs:power_mechanism')


	event.shaped(KJ('soldering_iron'), [
		' PW',
		' IP',
		'I  '
	], {
		P: KJ('plastic'),
		I: MC('iron_ingot'),
		W: "createaddition:copper_wire"
	})

	event.shaped(KJ('power_machine'), [
		'SSS',
		'SCS',
		'SSS'
	], {
		C: 'createdeco:copper_sheet_metal',
		S: KJ('power_mechanism')
	})

	event.shaped(AE2('controller'), [
		'SSS',
		'SCS',
		'SSS'
	], {
		C: KJ('fluix_casing'),
		S: KJ('power_mechanism')
	})

	let power_machine = (id, amount, other_ingredient) => {
		event.remove({ output: id })
		if (other_ingredient) {
			event.smithing(`${amount}x ${id}`, KJ('power_machine'), other_ingredient)
			event.recipes.createMechanicalCrafting(`${amount}x ${id}`, "AB", { A: KJ('power_machine'), B: other_ingredient })
		}
		else
			event.stonecutting(`${amount}x ${id}`, KJ('power_machine'))
	}

	power_machine(TE('dynamo_compression'), 1, TE('rf_coil'))

	event.replaceInput({ type: "minecraft:crafting_shaped", id: /ae2:.*/ }, F("#ingots/iron"), TE("lead_plate"))

	power_machine(TE('machine_crucible'), 1, 'createbigcannons:nethersteel_ingot')
	power_machine(TE('machine_furnace'), 1, 'alloyed:steel_ingot')
	power_machine(TE('machine_chiller'), 1, MC('blue_ice'))
	power_machine(TE('machine_pyrolyzer'), 1, MC('blaze_rod'))
	power_machine(TE('machine_bottler'), 1, CR('spout'))
	power_machine(TE('machine_centrifuge'), 1, MC('compass'))
	power_machine(TE('machine_refinery'), 1, '#forge:glass')
	power_machine(TE('machine_pulverizer'), 1, CR('millstone'))
	power_machine(TE('machine_smelter'), 1, MC('blast_furnace'))
	power_machine(TE('machine_sawmill'), 1, TE('saw_blade'))
	power_machine(TE('machine_brewer'), 1, MC('brewing_stand'))
	power_machine(TE('machine_insolator'), 1, FD('rich_soil'))
	power_machine(TE('machine_crystallizer'), 1, KJ('purified_certus_quartz_crystal'))
	power_machine(TE('machine_crafter'), 1, MC('crafting_table'))

	event.remove({output: "createaddition:electric_motor"})
	event.remove({output: "createaddition:alternator"})
	event.replaceInput({id: "createaddition:crafting/modular_accumulator"}, "createaddition:capacitor", KJ('electrolytic_capacitor'))
	event.replaceInput({input: "createaddition:capacitor"}, "createaddition:capacitor", KJ('ceramic_capacitor') )

	event.recipes.createMechanicalCrafting("createaddition:electric_motor", [
		' BIB ',
		'BSPSB',
		' BSB '
	], {
		S:"createaddition:copper_spool",
		B:CR('brass_sheet'),
		P:KJ('power_machine'),
		I:"createaddition:iron_rod"
	})

	event.recipes.createMechanicalCrafting("createaddition:alternator", [
		' BIB ',
		'BSPSB',
		' BSB '
	], {
		S:"createaddition:copper_spool",
		B:BC('cast_iron_ingot'),
		P:KJ('power_machine'),
		I:"createaddition:iron_rod"
	})



}

function fluixMachine(event) {



	// event.remove({mod: "ae2"})
	

	let fluix_machine = (id, amount, other_ingredient) => {
		event.remove({ output: id })
		if (other_ingredient) {
			event.smithing(`${amount}x ${id}`, AE2('controller'), other_ingredient)
			event.recipes.createMechanicalCrafting(`${amount}x ${id}`, "AB", { A: AE2('controller'), B: other_ingredient })
		}
		else
			event.stonecutting(`${amount}x ${id}`, AE2('controller'))
	}

	fluix_machine(AE2('condenser'), 1, AE2("fluix_pearl"))
	fluix_machine(AE2('drive'), 1, AE2("engineering_processor"))
	fluix_machine(AE2('formation_core'), 4, AE2("logic_processor"))
	fluix_machine(AE2('annihilation_core'), 4, AE2("calculation_processor"))
	fluix_machine(AE2('chest'), 1, MC('chest'))


	event.replaceInput({ id: AE2("network/cells/storage_components_cell_1k_part") }, MC("redstone"), KJ('calculation_mechanism'))
	event.replaceInput({ id: AE2("network/cells/storage_components_cell_1k_part") }, AE2("logic_processor"), F('#dusts/redstone'))
	event.replaceInput({ id: AE2("network/cells/fluid_storage_components_cell_1k_part") }, MC("green_dye"), KJ('calculation_mechanism'))
	event.replaceInput({ id: AE2("network/cells/fluid_storage_components_cell_1k_part") }, AE2("logic_processor"), F('#dyes/green'))
	event.replaceInput({ id: AE2("network/cells/spatial_components") }, MC("glowstone_dust"), KJ('calculation_mechanism'))
	event.replaceInput({ id: AE2("network/cells/spatial_components") }, AE2("engineering_processor"), F('#dusts/glowstone'))
	event.replaceInput({ id: AE2("network/crafting/patterns_blank") }, MC("glowstone_dust"), KJ('calculation_mechanism'))
	event.recipes.thermal.smelter(AE2("fluix_crystal", 2), [MC("quartz"), AE2("charged_certus_quartz_crystal"), MC("redstone")]).energy(4000)

}

function chocolate(event){

	let t = KJ('incomplete_candy_mechanism')
	event.recipes.createSequencedAssembly([
		KJ('candy_mechanism'),
	], KJ('explosive_mechanism'), [
		event.recipes.createDeploying(t, [t, 'create_confectionery:gingerbread']),
		event.recipes.createFilling(t, [t, Fluid.of(CR('chocolate'), 500)]),
		event.recipes.createFilling(t, [t, Fluid.of("create_confectionery:ruby_chocolate",  50)]),
		event.recipes.createFilling(t, [t, Fluid.of("create_confectionery:black_chocolate",200)]),
		event.recipes.createPressing(t, t)
	]).transitionalItem(t)
		.loops(1)
	event.remove({id:"create_confectionery:ruby_chocolate_recipe"})
	event.recipes.createMixing(Fluid.of("create_confectionery:ruby_chocolate", 250), [Fluid.of(MC('milk'), 250), MC('sugar'), CR('polished_rose_quartz'), MC('cocoa_beans')])


}