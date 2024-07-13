// If anyone knows how to fix. Please help :3 @AshTheDergy on discord thankies!

/*WorldgenEvents.remove(event => {
    event.removeFeatureById('underground_ores' , [
        "minecraft:redstone_ore",
        // "minecraft:ancient_debris",
        // "minecraft:tuff",
        // "minecraft:soul_sand",
        // "minecraft:nether_quartz_ore",
        // "minecraft:nether_gold_ore",
        // "minecraft:lapis_ore",
        // "minecraft:iron_ore",
        // "minecraft:infested_stone",
        // "minecraft:gravel",
        // "minecraft:granite",
        // "minecraft:gold_ore",
        // "minecraft:dirt",
        // "minecraft:diorite",
        // "minecraft:diamond_ore",
        "minecraft:deepslate_redstone_ore",
        // "minecraft:copper_ore",
        // "minecraft:coal_ore",
        // "minecraft:clay",
        // "minecraft:blackstone",
        // "minecraft:andesite",
        "occultism:silver_ore",
        "occultism:deepslate_silver_ore",
        "createindustry:lead_ore",
        "createindustry:deepslate_lead_ore"
    ])
})*/

WorldgenEvents.remove(event => {
    event.removeOres(props => {
        props.blocks = [
            "minecraft:redstone_ore",
            "minecraft:deepslate_redstone_ore",
            "occultism:silver_ore",
            "occultism:deepslate_silver_ore",
            "createindustry:lead_ore",
            "createindustry:deepslate_lead_ore",
            "thermal:tin_ore",
            "thermal:deepslate_tin_ore",
        ]
    })
})
/*
event.addOre((ore) => {
    ore.id = "kubejs:mining_poor_uraninite"
    ore.biomes = ['allthemodium:mining']
    ore.addTarget('minecraft:stone', 'powah:uraninite_ore_poor')
    ore.addTarget('minecraft:deepslate', 'powah:deepslate_uraninite_ore_poor')
    ore.size(5)
    ore.count(8)
    ore.squared()
    ore.uniformHeight(64, 254)
  })
*/
/*WorldgenEvents.add(event => {
    event.addOre((ore) => {
        ore.id = "minecraft:ancient_debris";
        ore.biomes = ['minecraft:nether'];
        ore.addTarget('minecraft:netherrack', 'minecraft:netherrack');
        ore.size(3);
        ore.count(1);
        ore.squared();
        ore.uniformHeight(8, 24);
    });
    event.addOre((ore) => {
        ore.id = "minecraft:ancient_debris";
        ore.biomes = ['minecraft:nether'];
        ore.addTarget('minecraft:netherrack', 'minecraft:netherrack');
        ore.size(2);
        ore.count(1);
        ore.squared();
        ore.uniformHeight(8, 118);
    });
    event.addOre((ore) => {
        ore.id = "minecraft:tuff";
        ore.biomes = ['minecraft:plains', 'minecraft:forest'];
        ore.addTarget('minecraft:stone', 'minecraft:deepslate');
        ore.size(32);
        ore.count(2);
        ore.squared();
        ore.uniformHeight(-64, 0);
    });
    event.addOre((ore) => {
        ore.id = "minecraft:soul_sand";
        ore.biomes = ['minecraft:nether'];
        ore.addTarget('minecraft:netherrack', 'minecraft:netherrack');
        ore.size(12);
        ore.count(12);
        ore.squared();
        ore.uniformHeight(0, 31);
    });
    event.addOre((ore) => {
        ore.id = "minecraft:nether_quartz_ore";
        ore.biomes = ['minecraft:nether'];
        ore.addTarget('minecraft:netherrack', 'minecraft:netherrack');
        ore.size(14);
        ore.count(16);
        ore.squared();
        ore.uniformHeight(10, 116);
    });
    event.addOre((ore) => {
        ore.id = "minecraft:nether_quartz_ore";
        ore.biomes = ['minecraft:nether'];
        ore.addTarget('minecraft:netherrack', 'minecraft:netherrack');
        ore.size(14);
        ore.count(32);
        ore.squared();
        ore.uniformHeight(10, 116);
    });
    event.addOre((ore) => {
        ore.id = "minecraft:nether_gold_ore";
        ore.biomes = ['minecraft:nether'];
        ore.addTarget('minecraft:netherrack', 'minecraft:netherrack');
        ore.size(10);
        ore.count(10);
        ore.squared();
        ore.uniformHeight(10, 116);
    });
    event.addOre((ore) => {
        ore.id = "minecraft:nether_gold_ore";
        ore.biomes = ['minecraft:nether'];
        ore.addTarget('minecraft:netherrack', 'minecraft:netherrack');
        ore.size(10);
        ore.count(20);
        ore.squared();
        ore.uniformHeight(10, 116);
    });
    event.addOre((ore) => {
        ore.id = "minecraft:magma_id";
        ore.biomes = ['minecraft:nether'];
        ore.addTarget('minecraft:netherrack', 'minecraft:netherrack');
        ore.size(33);
        ore.count(4);
        ore.squared();
        ore.uniformHeight(27, 36);
    });
    event.addOre((ore) => {
        ore.id = "minecraft:lapis_ore";
        ore.biomes = ['minecraft:overworld'];
        ore.addTarget('minecraft:stone', 'minecraft:deepslate');
        ore.size(7);
        ore.count(4);
        ore.squared();
        ore.uniformHeight(-32, 32);
    });
    event.addOre((ore) => {
        ore.id = "minecraft:lapis_ore";
        ore.biomes = ['minecraft:overworld'];
        ore.addTarget('minecraft:stone', 'minecraft:deepslate');
        ore.size(7);
        ore.count(2);
        ore.squared();
        ore.uniformHeight(-64, 64);
    });
    event.addOre((ore) => {
        ore.id = "minecraft:iron_ore";
        ore.biomes = ['minecraft:overworld'];
        ore.addTarget('minecraft:stone', 'minecraft:deepslate');
        ore.size(9);
        ore.count(90);
        ore.squared();
        ore.uniformHeight(80, 384);
    });
    event.addOre((ore) => {
        ore.id = "minecraft:iron_ore";
        ore.biomes = ['minecraft:overworld'];
        ore.addTarget('minecraft:stone', 'minecraft:deepslate');
        ore.size(9);
        ore.count(20);
        ore.squared();
        ore.uniformHeight(-24, 56);
    });
    event.addOre((ore) => {
        ore.id = "minecraft:iron_ore";
        ore.biomes = ['minecraft:overworld'];
        ore.addTarget('minecraft:stone', 'minecraft:deepslate');
        ore.size(4);
        ore.count(25);
        ore.squared();
        ore.uniformHeight(-64, 72);
    });
    event.addOre((ore) => {
        ore.id = "minecraft:infested_stone";
        ore.biomes = ['minecraft:mountain'];
        ore.addTarget('minecraft:stone', 'minecraft:deepslate');
        ore.size(9);
        ore.count(7);
        ore.squared();
        ore.uniformHeight(-64, 63);
    });
    event.addOre((ore) => {
        ore.id = "minecraft:infested_deepslate";
        ore.biomes = ['minecraft:mountain'];
        ore.addTarget('minecraft:deepslate', 'minecraft:deepslate');
        ore.size(9);
        ore.count(7);
        ore.squared();
        ore.uniformHeight(-64, 63);
    });
    event.addOre((ore) => {
        ore.id = "minecraft:gravel";
        ore.biomes = ['minecraft:overworld'];
        ore.addTarget('minecraft:stone', 'minecraft:deepslate');
        ore.size(33);
        ore.count(14);
        ore.squared();
        ore.uniformHeight(-64, 256);
    });
    event.addOre((ore) => {
        ore.id = "minecraft:gravel";
        ore.biomes = ['minecraft:nether'];
        ore.addTarget('minecraft:netherrack', 'minecraft:netherrack');
        ore.size(33);
        ore.count(2);
        ore.squared();
        ore.uniformHeight(5, 41);
    });
    event.addOre((ore) => {
        ore.id = "minecraft:granite";
        ore.biomes = ['minecraft:overworld'];
        ore.addTarget('minecraft:stone', 'minecraft:deepslate');
        ore.size(64);
        ore.count(0.16666667);
        ore.squared();
        ore.uniformHeight(64, 128);
    });
    event.addOre((ore) => {
        ore.id = "minecraft:granite";
        ore.biomes = ['minecraft:overworld'];
        ore.addTarget('minecraft:stone', 'minecraft:deepslate');
        ore.size(64);
        ore.count(2.0);
        ore.squared();
        ore.uniformHeight(0, 60);
    });
    event.addOre((ore) => {
        ore.id = "minecraft:gold_ore";
        ore.biomes = [
            'minecraft:badlands',
            'minecraft:eroded_badlands',
            'minecraft:wooded_badlands'
        ];
        ore.addTarget('minecraft:stone', 'minecraft:deepslate');
        ore.size(9);
        ore.count(50.0);
        ore.squared();
        ore.uniformHeight(32, 256);
    });
    event.addOre((ore) => {
        ore.id = "minecraft:gold_ore";
        ore.biomes = ['minecraft:overworld'];
        ore.addTarget('minecraft:stone', 'minecraft:deepslate');
        ore.size(9);
        ore.count(4.0);
        ore.squared();
        ore.uniformHeight(-64, 32);
    });
    event.addOre((ore) => {
        ore.id = "minecraft:gold_ore";
        ore.biomes = ['minecraft:overworld'];
        ore.addTarget('minecraft:stone', 'minecraft:deepslate');
        ore.size(9);
        ore.count(0.5);
        ore.squared();
        ore.uniformHeight(-64, -48);
    });
    event.addOre((ore) => {
        ore.id = "minecraft:dirt";
        ore.biomes = ['minecraft:overworld'];
        ore.addTarget('minecraft:stone', 'minecraft:deepslate');
        ore.size(33);
        ore.count(0.0);
        ore.squared();
        ore.uniformHeight(0, 160);
    });
    event.addOre((ore) => {
        ore.id = "minecraft:diorite";
        ore.biomes = ['minecraft:overworld'];
        ore.addTarget('minecraft:stone', 'minecraft:deepslate');
        ore.size(64);
        ore.count(0.16666667);
        ore.squared();
        ore.uniformHeight(64, 128);
    });
    event.addOre((ore) => {
        ore.id = "minecraft:diorite";
        ore.biomes = ['minecraft:overworld'];
        ore.addTarget('minecraft:stone', 'minecraft:deepslate');
        ore.size(64);
        ore.count(2.0);
        ore.squared();
        ore.uniformHeight(0, 60);
    });
    event.addOre((ore) => {
        ore.id = "minecraft:diamond_ore";
        ore.biomes = ['minecraft:overworld'];
        ore.addTarget('minecraft:stone', 'minecraft:deepslate');
        ore.size(8);
        ore.count(7);
        ore.squared();
        ore.triangleHeight(-80, 80);
    });
    event.addOre((ore) => {
        ore.id = "minecraft:coal_ore";
        ore.biomes = ['minecraft:overworld'];
        ore.addTarget('minecraft:stone', 'minecraft:deepslate');
        ore.size(17);
        ore.count(20);
        ore.squared();
        ore.uniformHeight(0, 128);
    });
    event.addOre((ore) => {
        ore.id = "minecraft:coal_ore";
        ore.biomes = ['minecraft:overworld'];
        ore.addTarget('minecraft:stone', 'minecraft:deepslate');
        ore.size(17);
        ore.count(20);
        ore.squared();
        ore.uniformHeight(136, 256);
    });
    event.addOre((ore) => {
        ore.id = "minecraft:clay";
        ore.biomes = [
            'minecraft:swamp',
            'minecraft:mangrove_swamp'
        ];
        ore.addTarget('minecraft:clay', 'minecraft:clay');
        ore.size(33);
        ore.count(0);
        ore.squared();
        ore.uniformHeight(0, 256);
    });
    event.addOre((ore) => {
        ore.id = "minecraft:andesite";
        ore.biomes = ['minecraft:overworld'];
        ore.addTarget('minecraft:stone', 'minecraft:deepslate');
        ore.size(64);
        ore.count(0.16666667);
        ore.squared();
        ore.uniformHeight(64, 128);
    });
    event.addOre((ore) => {
        ore.id = "minecraft:andesite";
        ore.biomes = ['minecraft:overworld'];
        ore.addTarget('minecraft:stone', 'minecraft:deepslate');
        ore.size(64);
        ore.count(2.0);
        ore.squared();
        ore.uniformHeight(0, 60);
    });
    event.addOre((ore) => {
        ore.id = "minecraft:ancient_debris";
        ore.biomes = ['minecraft:nether'];
        ore.addTarget('minecraft:netherrack', 'minecraft:netherrack');
        ore.size(2);
        ore.count(1);
        ore.squared();
        ore.uniformHeight(8, 118);
    });
});
*/