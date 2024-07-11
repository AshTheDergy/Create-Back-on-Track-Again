// priority: 0

StartupEvents.registry('item', event => {
    event.create('purified_certus_quartz_crystal').texture("kubejs:item/purified_certus_quartz_crystal").displayName("Pure Certus Quartz Crystal")
	event.create('purified_fluix_crystal').texture("kubejs:item/purified_fluix_crystal").displayName("Pure Fluix Crystal")

	event.create('rose_quartz_seed').texture("kubejs:item/rose_quartz_seed_0").displayName("Rose Quartz Seed")

	let types = [/*'Nether',*/ 'Certus', 'Fluix']
	types.forEach(e => {
		let id = e.toLowerCase()
		event.create('ae2:' + id + '_crystal_seed').texture("kubejs:item/crystal_seed_certus").displayName(+ e + ' Quartz Seed')
		//event.create('growing_' + id + '_seed', 'create:sequenced_assembly').texture("ae2:item/crystal_seed_" + id).displayName(e + ' Quartz Seed')
		event.create('tiny_' + id + '_crystal').texture("kunejs:item/crystal_seed_" + id + "2").displayName('Tiny ' + e + ' Quartz Crystal')
		//event.create('growing_tiny_' + id + '_crystal', 'create:sequenced_assembly').texture("ae2:item/crystal_seed_" + id + "2").displayName('Tiny ' + e + ' Quartz Crystal')
		event.create('small_' + id + '_crystal').texture("kubejs:item/crystal_seed_" + id + "3").displayName('Small ' + e + ' Quartz Crystal')		
		//event.create('growing_small_' + id + '_crystal', 'create:sequenced_assembly').texture("ae2:item/crystal_seed_" + id + "3").displayName('Small ' + e + ' Quartz Crystal')
	});

	event.create('growing_rose_seed', 'create:sequenced_assembly')			.texture("kubejs:item/rose_quartz_seed_0").displayName('Rose Quartz Seed')
	event.create('tiny_rose_crystal')										.texture("kubejs:item/rose_quartz_seed_1").displayName('Tiny Rose Quartz')
	event.create('growing_tiny_rose_crystal', 'create:sequenced_assembly')	.texture("kubejs:item/rose_quartz_seed_1").displayName('Tiny Rose Quartz')
	event.create('small_rose_crystal')										.texture("kubejs:item/rose_quartz_seed_2").displayName('Small Rose Quartz')
	event.create('growing_small_rose_crystal', 'create:sequenced_assembly')	.texture("kubejs:item/rose_quartz_seed_2").displayName('Small Rose Quartz')

	let processors = ["Calculation", "Logic", "Engineering"]
	processors.forEach(name => {
		let e = name.toLowerCase()
		event.create('incomplete_' + e + '_processor', 'create:sequenced_assembly').texture('kubejs:item/incomplete_' + e + '_processor').displayName('Incomplete ' + name + ' Processor')
	})

	let mechanism = (name, rarity) => {
		let id = name.toLowerCase()
		event.create(id + '_mechanism').texture("kubejs:item/" + id + "_mechanism").displayName(name + ' Mechanism').rarity(rarity ? rarity : 'common')
		event.create('incomplete_' + id + '_mechanism', 'create:sequenced_assembly').texture("kubejs:item/incomplete_" + id + "_mechanism").displayName('Incomplete ' + name + ' Mechanism')
	}

	mechanism('Rotation')
	mechanism('Pressure')
	mechanism('Train')
	mechanism('Scorch', 'uncommon')
	mechanism('Explosive', 'uncommon')
	mechanism('Power', 'uncommon')

	event.create('candy_mechanism').texture("kubejs:item/chocolate_bomb").displayName('Chocolate Bomb').rarity('epic').food(food => {
		food
    		.hunger(17)
    		.saturation(2)
      		.effect('speed', 5000, 0, 2)
      		.alwaysEdible()
	})



	event.create('incomplete_candy_mechanism', 'create:sequenced_assembly').texture("kubejs:item/incomplete_chocolate_bomb").displayName('Incomplete Chocolate Bomb')

	// Misc / Integration
	event.create('pipe_module_utility').texture("kubejs:item/pipe_module_utility").displayName('Utility Pipe Module')
	event.create('pipe_module_tier_1').texture("kubejs:item/pipe_module_tier_1").displayName('Brass Pipe Module')
	event.create('pipe_module_tier_2').texture("kubejs:item/pipe_module_tier_2").displayName('Invar Pipe Module')
	event.create('pipe_module_tier_3').texture("kubejs:item/pipe_module_tier_3").displayName('Enderium Pipe Module')
	
	event.create('incomplete_steel_engine', 'create:sequenced_assembly').texture("kubejs:item/incomplete_engine_t1").displayName('Incomplete Brass Engine')
	event.create('failed_steel_engine').texture("kubejs:item/failed_engine_t1").displayName('Failed Brass Engine')

	event.create('circuit_scrap').texture("kubejs:item/circuit_scrap").displayName('Circuit Scrap')
	event.create('zinc_dust').texture("kubejs:item/zinc_dust").displayName('Zinc Dust')

	event.create('asurine_bits').texture("kubejs:item/asurine_bits").displayName('Asurine Chunks')
	event.create('andesite_blend').texture("kubejs:item/andesite_blend").displayName('Andesitic Blend')
	event.create('andesite_dust').texture("kubejs:item/andesite_dust").displayName('Andesite Dust')

	
	event.create('impure_sky_chunks').texture("kubejs:item/impure_sky_chunks").displayName('Impure Sky Chunks')
	event.create('clean_sky_chunks').texture("kubejs:item/clean_sky_chunks").displayName('Clean Sky Chunks')
	event.create('cut_sky_chunks').texture("kubejs:item/clean_sky_pellet").displayName('Clean Sky Pellet')
	event.create('pure_sky_chunks').texture("kubejs:item/pure_sky_pellet").displayName('Pure Sky Pellet')

	event.create('diorite_dust').texture("kubejs:item/diorite_dust").displayName('Diorite Dust')
	
	event.create('steel_ring').texture("kubejs:item/oring").displayName('Steel Ring')


	event.create('soaked_sheet').texture("kubejs:item/soaked_sheet").displayName('Soaked Copper Sheet')
	event.create('rough_sheet').texture("kubejs:item/rough_sheet").displayName('Rough Copper Sheet')

	event.create('resistor').texture("kubejs:item/resistor").displayName('Resistor')
	event.create('inductor').texture("kubejs:item/inductor").displayName('Induction Coil')
	event.create('ceramic_capacitor').texture("kubejs:item/capacitor_ceramic").displayName('Ceramic Capacitor')
	event.create('electrolytic_capacitor').texture("kubejs:item/capacitor_electrolytic").displayName('Electrolytic Capacitor')

	event.create('dirt_resistor').texture("kubejs:item/resistor_dirt").displayName('Dirty Resistor')
	event.create('dirt_inductor').texture("kubejs:item/inductor_dirt").displayName('Dirty Induction Coil')
	event.create('dirt_ceramic_capacitor').texture("kubejs:item/capacitor_ceramic_dirt").displayName('Dirty Ceramic Capacitor')
	event.create('dirt_electrolytic_capacitor').texture("kubejs:item/capacitor_electrolytic_dirt").displayName('Dirty Electrolytic Capacitor')

	event.create('incomplete_resistor', 'create:sequenced_assembly').texture("kubejs:item/resistor_incomplete").displayName('Incomplete Resistor')
	event.create('incomplete_inductor', 'create:sequenced_assembly').texture("kubejs:item/inductor_incomplete").displayName('Incomplete Induction Coil')
	event.create('incomplete_ceramic_capacitor', 'create:sequenced_assembly').texture("kubejs:item/capacitor_ceramic_incomplete").displayName('Incomplete Ceramic Capacitor')
	event.create('incomplete_electrolytic_capacitor', 'create:sequenced_assembly').texture("kubejs:item/capacitor_electrolytic_incomplete").displayName('Incomplete Electrolytic Capacitor')

	event.create('inductor_core').texture("kubejs:item/inductor_core").displayName('Magnetic Core')

	event.create('carbon_sheet').texture("kubejs:item/carbon_sheet").displayName('Carbon Sheet')
	event.create('mica_sheet').texture("kubejs:item/mica_sheet").displayName('Mica Sheet')
	event.create('ceramic_powder').texture("kubejs:item/ceramic_powder").displayName('Ceramic Powder')

	event.create('plastic').texture("kubejs:item/plastic").displayName('Plastic')
	event.create('nickel_compound').texture("kubejs:item/nickel_compound").displayName('Nickel Compound')
	// event.create('invar_compound').texture("kubejs:item/invar_compound").type('create:sequenced_assembly').displayName('Unprocessed Invar Ingot')
	event.create('invar_compound', 'create:sequenced_assembly').texture("kubejs:item/invar_compound").displayName('Unprocessed Invar Ingot')
	// event.create('dye_entangled_singularity').texture("kubejs:item/dye_entangled_singularity").unstackable().displayName('Chromatic Singularity')

	event.create('stone_saw').texture("kubejs:item/stone_saw").displayName('Stone Saw').maxDamage(128)
	event.create('iron_saw').texture("kubejs:item/iron_saw").displayName('Iron Saw').maxDamage(256)
	event.create('diamond_saw').texture("kubejs:item/diamond_saw").displayName('Diamond Saw').maxDamage(1024)
	event.create('screwdriver').texture("kubejs:item/screwdriver").displayName('Screwdriver').maxDamage(512)
	event.create('lube_can').texture("kubejs:item/lube_can").displayName('Lubricant Can').maxDamage(256)
	event.create('soldering_iron').texture("kubejs:item/soldering_iron").displayName('Soldering Iron').maxDamage(1024)

	event.create('golden_tube').texture("kubejs:item/yellow_tube").displayName("Golden Tube")
	event.create('diamond_tube').texture("kubejs:item/blue_tube").displayName("Diamond Tube")
	event.create('empty_tube').texture("kubejs:item/empty_tube").displayName("Empty Tube")


	// event.create('alchemical_laser').parentModel("kubejs:block/ponder_laser_lamp_on").displayName('Alchemical Laser (Ponder Entry)').unstackable()
	event.create('thermal_cast').texture("kubejs:item/thermal_cast").displayName('Thermal Cast').unstackable()


	let atom = (name, color) => {
		event.create(name.toLowerCase()+'_atom')
		.displayName(name + ' Atom')
		.textureJson({
			layer0: "kubejs:item/atom_0",
			layer1: "kubejs:item/atom",
		})
		.color(0, color)
		.color(1, "#FFFFFF")
	}

	atom('Brass', 	"#FBCC68")
	atom('Copper', 	"#EA9162")
	atom('Zinc',	"#A5C0A0")
	atom('Gold',	"#FDF897")
	atom("Geld",	"#70F00F")

	// event
	// 	.create("geld_atom")
	// 	.textureJson({
	// 		layer0: "kubejs:item/atom_0",
	// 		layer1: "kubejs:item/atom",
	// 	})
	// 	.color(0, "#70F00F")
	// 	.color(1, "#FFFFFF");


	event.create('thing').texture("kubejs:images/thing")
	
	event.create('incomplete_rotation_machine', 'create:sequenced_assembly').parentModel("kubejs:block/incomplete_andesite_machine").displayName('Incomplete Rotation Machine')
})

StartupEvents.registry('block', event => {
    //event.create('enderium_casing').model('kubejs:block/enderium_casing').material('metal').hardness(4.0).displayName('Ender Casing')
	event.create('zinc_casing').material('metal').hardness(3.0).displayName('Zinc Casing')
	event.create('invar_casing').material('metal').hardness(3.0).displayName('Invar Casing')
	event.create('fluix_casing').material('metal').hardness(3.0).displayName('Fluix Casing')

	event.create('mica_block').material('metal').hardness(3.0).displayName('Mica Block')

	let machine = (name, display, layer) => {
		let id = name.toLowerCase()
		event.create(id + '_machine')
			.model('kubejs:block/' + id + '_machine')
			.material('lantern')
			.hardness(3.0)
			.displayName(display + ' Machine')
			.notSolid()
			.renderType(layer)
	}

	machine('Andesite', 'Rotation', "solid")
	machine('Brass', 'Precision',"translucent")
	machine('Copper', 'Pressure', "cutout")
	machine('Zinc', 'Scorch',"cutout")
	machine('Train', 'Track', "cutout")
	machine('Explosive', 'Explosive', "solid")
	//machine('Enderium', 'Abstruse',"cutout")
	machine('Power', 'Power', "translucent")
})

StartupEvents.registry('fluid', event => {
    // let colors = [0xCBE827, 0xAEE827, 0x68E827, 0x27E86E, 0x27E8B1, 0x27DEE8, 0x27B5E8, 0x2798E8, 0x2778E8, 0x2748E8]
	// event.create('raw_logic').displayName(`Liquified Logic (Unprocessed)`).stillTexture('kubejs:fluid/number_still').flowingTexture('kubejs:fluid/number_flow').color(0xE7FFCB)
	// for (let i = 0; i < 10; i++)
	// 	event.create('number_' + i).displayName(`Liquified Logic (${i})`).stillTexture('kubejs:fluid/number_still').flowingTexture('kubejs:fluid/number_flow').color(colors[i])
	// event.create('matrix').displayName(`Liquified Computation Matrix`).stillTexture('kubejs:fluid/matrix_still').flowingTexture('kubejs:fluid/matrix_flow').bucketColor(colors[0])
	// event.create('fine_sand').displayName(`Fine Sand`).stillTexture('kubejs:fluid/fine_sand_still').flowingTexture('kubejs:fluid/fine_sand_flow').bucketColor(0xE3DBB0)
	


	event.create('ash_water')
        .thickTexture(0xa5afaf)
        .bucketColor(0xa5afaf)
        .displayName('Alkaline Solution')

    event.create('dirt_water')
        .thinTexture(0xc18551)
        .bucketColor(0xc18551)
        .displayName('Dirty Water')

    event.create('sif4')
        .thinTexture(0xaec1c1)
        .displayName('Silicon Tetrafluoride')
        .noBucket()

    event.create('sif2')
        .thinTexture(0xaec1c1)
        .displayName('Silicon Diofluoride')
        .noBucket()



    event.create('electrolyte')
        .thinTexture(0xd6d842)
        .bucketColor(0xd6d842)
        .displayName('Sulfuric Acid')

    event.create('plastic')
        .thinTexture(0xd8d8d5)
        .bucketColor(0xd8d8d5)
        .displayName('Liquid Plastic')
})

ItemEvents.modification(event => {
    event.modify('beyond_earth:hammer', item => {item.maxDamage = 50})
	event.modify('waterstrainer:strainer_survivalist', item => {item.maxDamage = 250})
	
	let colors = ["red", "yellow", "green", "blue", "magenta", "black"]
	colors.forEach(element => {
		event.modify('ae2:' + element + '_paint_ball', item => {
			item.maxStackSize = 1
		})
	});
})