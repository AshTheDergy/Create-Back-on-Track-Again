ServerEvents.tags('block', event => {
    event.add('forge:ores', 'ae2:sky_stone_block')
	event.add('forge:ores', 'createindustry:lignite')
})

ServerEvents.tags('item', event => {
    colours.forEach(element => {
		event.get(F('glazed_terracotta')).add(MC(`${element}_glazed_terracotta`))
	});

	global.trades.forEach(element => {
		event.get('forge:trade_cards').add(`kubejs:trade_card_${element}`)
		event.get('thermal:crafting/dies').add(`kubejs:trade_card_${element}`)
	});
	
	global.professions.forEach(element => {
		event.get('forge:profession_cards').add(`kubejs:profession_card_${element}`)
		event.get('thermal:crafting/dies').add(`kubejs:profession_card_${element}`)
	});

	event.get("farmersdelight:offhand_equipment").add("forbidden_arcanus:obsidian_skull_shield")

	// event.get("forge:raw_chicken").add("exoticbirds:raw_birdmeat")
	event.get("forge:tools/axes").add(TC("hand_axe"))
	event.get("forge:vines").add(MC("vine")).add(BOP("willow_vine")).add(BOP("spanish_moss"))

	event.get("forge:circuit_press")
		.add(AE2("name_press"))
		.add(AE2("silicon_press"))
		.add(AE2("logic_processor_press"))
		.add(AE2("engineering_processor_press"))
		.add(AE2("calculation_processor_press"))

	event.get("forbidden_arcanus:indestructible_blacklisted")
		
		// .add(/advancedrocketry:.*/)
		// .add(/xreliquary:.*/)
		.add(/waterstrainer:.*/)
		.add(OC("#miners/ores"))

	event.get("minecraft:planks").add("forbidden_arcanus:mysterywood_planks").add("forbidden_arcanus:cherrywood_planks")
	event.get("minecraft:logs_that_burn").add("#forbidden_arcanus:mysterywood_logs").add("#forbidden_arcanus:cherrywood_logs")

	event.get('forge:saws').add(KJ('stone_saw')).add(KJ('iron_saw')).add(KJ('diamond_saw'))
	event.get('forge:screwdrivers').add('createindustry:screwdriver')
	// event.get('forge:chromatic_resonators').add(KJ('chromatic_resonator'))
	// event.get('forge:flash_drives').add(KJ('flash_drive'))
	// event.get('forge:ender_staffs').add(RQ('ender_staff'))
	// event.get('forge:cross_of_mercys').add(RQ('mercy_cross'))
	event.get('forge:super_glues').add(CR('super_glue'))
	event.get('forge:wrenches').add(CR('wrench'))
	event.get('forge:tools/wrench').add(CR('wrench'))
	event.get('forge:soldering_irons').add(KJ('soldering_iron'))
	event.get('forge:ingots/steel').add("alloyed:steel_ingot")
	event.get('forge:storage_blocks/steel').add("alloyed:steel_block")

	event.get('ae2:all_certus_quartz').add(KJ('purified_certus_quartz_crystal'))

	event.get('ae2:all_fluix').add(KJ('purified_fluix_crystal'))


	// event.get('thermal:crafting/casts').add(KJ("three_cast")).add(KJ("eight_cast")).add(KJ("plus_cast")).add(KJ("minus_cast")).add(KJ("multiply_cast")).add(KJ("divide_cast")).add(F("#circuit_press"))

	event.get('create:upright_on_belt')
		.add(AE2("red_paint_ball"))
		.add(AE2("yellow_paint_ball"))
		.add(AE2("green_paint_ball"))
		.add(AE2("blue_paint_ball"))
		.add(AE2("magenta_paint_ball"))
		.add(AE2("black_paint_ball"))

	event.get('tconstruct:anvil_metal').add(CR('zinc_block'))

	let remove_metal =(ingot, block, nugget, type, substitute)=>{
		event.remove('forge:ingots/' + type, ingot)
		event.remove('forge:ingots', ingot)
		event.remove('createbigcannons:ingot_'+type, ingot)

		event.remove('balm:ingots', ingot)

		event.remove('forge:nuggets/' + type, nugget)
		event.remove('forge:nuggets', nugget)

		event.remove('forge:storage_blocks/' + type, block)
		event.remove('forge:storage_blocks', block)
	}

	remove_metal(TE('steel_ingot'), 			TE('steel_block'), 				TE('steel_nugget'), 		'steel')
	remove_metal('davebuildingmod:steel_ingot', 'davebuildingmod:steel_block', 	'', 						'steel')
	remove_metal('beyond_earth:steel_ingot', 	'beyond_earth:steel_block', 	'beyond_earth:steel_nugget','steel')
	remove_metal('createindustry:steel_ingot', 	'',								'',							'steel')
	remove_metal('createdeco:cast_iron_ingot',  'createdeco:cast_iron_nugget',  'createdeco:cast_iron_block',	'cast_iron')
	remove_metal('createindustry:cast_iron_ingot',  '',  'createindustry:cast_iron_block',						'cast_iron')

	remove_metal(TE('bronze_ingot'), TE('bronze_block'), TE('bronze_nugget'), 'bronze')

	let remove_thermal_plate = (type) =>{
		event.remove("forge:plates", TE(type+'_plate'))
		event.remove("forge:plates/"+type, TE(type+'_plate'))
	}
	let remove_thermal_gear = (type) =>{
		event.remove("forge:gears", TE(type+'_gear'))
		event.remove("forge:gears/"+type, TE(type+'_gear'))
	}
	let remove_thermal_dust = (type) =>{
		event.remove("forge:dusts", TE(type+'_dust'))
		event.remove("forge:dusts/"+type, TE(type+'_dust'))
	}

	let remove_thermal_set = (dust, gear, plate, type)=>{
		event.remove('forge:dusts', dust)
		event.remove('forge:dusts/'+type, dust)

		event.remove('forge:gears', gear)
		event.remove('forge:gears/'+type, gear)

		event.remove('forge:plates', plate)
		event.remove('forge:plates/'+type, plate)
	}
	remove_thermal_set(TE('bronze_dust'), TE('bronze_gear'), TE('bronze_plate'), 'bronze')

	remove_thermal_plate('iron')
	remove_thermal_plate('gold')
	remove_thermal_plate('copper')
	remove_thermal_plate('netherite')

	event.add('forge:ingots/cast_iron', BC('cast_iron_ingot'))

	event.remove('forge:gems/rose_quartz', 'biomesoplenty:rose_quartz_shard')

	event.remove('forge:dusts/diamond', 'createaddition:diamond_grit')
	event.remove('forge:dusts', 'createaddition:diamond_grit')

	event.remove('forge:plates/zinc', 'createaddition:zinc_sheet')
	event.remove('forge:plates', 'createaddition:zinc_sheet')
})

ServerEvents.tags('fluid', event => {
    event.add('beyond_earth:vehicle_fuel', 'thermal:refined_fuel')
	event.remove('beyond_earth:vehicle_fuel', 'beyond_earth:fuel')
})